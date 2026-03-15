import json
import time
import sys
import os
import base64
import re
import urllib.request
import urllib.error
import logging
import threading
import concurrent.futures
from pathlib import Path
from typing import List, Optional, Literal, Dict, Any
from pydantic import BaseModel, Field, ValidationError
from datetime import datetime

# Configuracao estetica e persistente de Log (Estado da Arte)
log_dir = Path(".claude/logs")
log_dir.mkdir(parents=True, exist_ok=True)

logging.basicConfig(
    force=True, # Garante que a nossa configuração sobrescreva qualquer outra pré-existente
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[
        logging.FileHandler(log_dir / "task_executor.log", encoding="utf-8"), # Arquivo mantem utf-8
        logging.StreamHandler(sys.stdout)
    ]
)

# Substituicao do file_lock simples por um Mutex Global do Windows (Cross-Process)
class GlobalMutex:
    def __init__(self, name: str):
        self.name = name
        if os.name == 'nt':
            import ctypes
            from ctypes import wintypes
            ctypes.windll.kernel32.CreateMutexW.restype = wintypes.HANDLE
            ctypes.windll.kernel32.WaitForSingleObject.argtypes = [wintypes.HANDLE, wintypes.DWORD]
            ctypes.windll.kernel32.ReleaseMutex.argtypes = [wintypes.HANDLE]
            self.mutex = ctypes.windll.kernel32.CreateMutexW(None, False, self.name)
        else:
            self.mutex = threading.Lock()
            
    def __enter__(self):
        if os.name == 'nt':
            import ctypes
            ctypes.windll.kernel32.WaitForSingleObject(self.mutex, 30000)
        else:
            self.mutex.acquire()
            
    def __exit__(self, exc_type, exc_val, exc_tb):
        if os.name == 'nt':
            import ctypes
            ctypes.windll.kernel32.ReleaseMutex(self.mutex)
        else:
            self.mutex.release()

file_lock = GlobalMutex("Global\\AgentTaskQueue_Mutex_Master")

# ==========================================
# 1. SCHEMAS (A Lei da Honestidade Radical)
# ==========================================
class Task(BaseModel):
    id: str
    description: str
    status: Literal["pending", "running", "completed", "failed", "cancelled"] = "pending"
    timestamp: str
    agent: str
    completedAt: Optional[str] = None
    metadata: Dict[str, Any] = Field(default_factory=dict)

class TaskQueue(BaseModel):
    version: str = "1.0"
    tasks: List[Task] = Field(default_factory=list)

# ==========================================
# 2. GERENCIADOR DA FILA
# ==========================================
class QueueManager:
    def __init__(self, queue_path: str = None):
        if queue_path is None:
            # Garante o caminho absoluto a partir do local deste script
            self.queue_path = Path(__file__).parent.resolve() / "queue" / "tasks.json"
        else:
            self.queue_path = Path(queue_path)
        self.queue_path.parent.mkdir(parents=True, exist_ok=True)
        
    def load_queue(self) -> TaskQueue:
        with file_lock:
            for _ in range(5):
                try:
                    if not self.queue_path.exists():
                        return TaskQueue()
                    with open(self.queue_path, "r", encoding="utf-8") as f:
                        json_data = f.read()
                        return TaskQueue.model_validate_json(json_data)
                except PermissionError:
                    time.sleep(0.2)
                except json.JSONDecodeError:
                    logging.error("[FAIL] Corrupção no JSON detectada! Retornando fila vazia e fazendo backup.")
                    self.queue_path.rename(self.queue_path.with_suffix(f".json.corrupt_{int(time.time())}"))
                    return TaskQueue()
                except ValidationError as e:
                    logging.error(f"[FAIL] Erro de validacao de Schema: {e}")
                    return TaskQueue()
            return TaskQueue()
            
    def save_queue(self, queue: TaskQueue):
        with file_lock:
            for _ in range(5):
                try:
                    with open(self.queue_path, "w", encoding="utf-8") as f:
                        f.write(queue.model_dump_json(indent=4))
                    break
                except PermissionError:
                    time.sleep(0.2)

    def get_next_task(self) -> Optional[Task]:
        queue = self.load_queue()
        for task in queue.tasks:
            if task.status == "pending":
                return task
        return None

    def update_task_status(self, task_id: str, new_status: str):
        queue = self.load_queue()
        for task in queue.tasks:
            if task.id == task_id:
                task.status = new_status
                if new_status in ["completed", "failed"]:
                    task.completedAt = datetime.now().isoformat()
                break
        self.save_queue(queue)

# ==========================================
# 2.5 O MOTOR COGNITIVO (API Integration)
# ==========================================

# Tabela de Roteamento em Quartetos (Economia x SOTA)
# Formato: (Primario Free, Secundario Free, Terceira Via Free SOTA, Quarta Via Paga/Fallback)
AGENT_ROUTING = {
    # Deep Thinking: Prioriza Pro Free Tier, Flash backup, DeepSeek R1 (OpenRouter Free) como 3ª via, Claude 3.7 (Pago) como 4ª via
    "@maverick":      ("gemini-2.5-pro", "gemini-2.5-flash", "deepseek/deepseek-r1:free", "claude-3-7-sonnet-20250219"),
    "@planner":       ("gemini-2.5-pro", "gemini-2.5-flash", "deepseek/deepseek-r1:free", "claude-3-7-sonnet-20250219"),
    "@auditor":       ("gemini-2.5-pro", "gemini-2.5-flash", "deepseek/deepseek-r1:free", "claude-3-7-sonnet-20250219"),
    "@implementor":   ("gemini-2.5-pro", "gemini-2.5-flash", "deepseek/deepseek-r1:free", "claude-3-7-sonnet-20250219"),
    "@verifier":      ("gemini-2.5-pro", "gemini-2.5-flash", "deepseek/deepseek-r1:free", "claude-3-7-sonnet-20250219"),
    
    # Operacoes Rapidas: Prioriza Flash Free, Pro backup, Llama 3 (OpenRouter Free) como 3ª via, Haiku (Pago) como 4ª via
    "@skillmaster":   ("gemini-2.5-flash", "gemini-2.5-pro", "meta-llama/llama-3-8b-instruct:free", "claude-3-5-haiku-20241022"),
    "@dispatcher":    ("gemini-2.5-flash", "gemini-2.5-pro", "meta-llama/llama-3-8b-instruct:free", "claude-3-5-haiku-20241022"),
    "@sequenciador":  ("gemini-2.5-flash", "gemini-2.5-pro", "meta-llama/llama-3-8b-instruct:free", "claude-3-5-haiku-20241022"),
    "@pesquisador":   ("gemini-2.5-flash", "gemini-2.5-pro", "meta-llama/llama-3-8b-instruct:free", "claude-3-5-haiku-20241022"),
    "@organizador":   ("gemini-2.5-flash", "gemini-2.5-pro", "meta-llama/llama-3-8b-instruct:free", "claude-3-5-haiku-20241022"),
    "@securitychief": ("gemini-2.5-flash", "gemini-2.5-pro", "deepseek/deepseek-r1:free", "claude-3-7-sonnet-20250219"),
    "@curator":       ("gemini-2.5-flash", "gemini-2.5-pro", "deepseek/deepseek-r1:free", "claude-3-7-sonnet-20250219"),
    "@validador":     ("gemini-2.5-flash", "gemini-2.5-pro", "deepseek/deepseek-r1:free", "claude-3-7-sonnet-20250219"),
    "@seo":           ("gemini-2.5-flash", "gemini-2.5-pro", "meta-llama/llama-3-8b-instruct:free", "claude-3-5-haiku-20241022"),
    "@prompter":      ("gemini-2.5-flash", "gemini-2.5-pro", "meta-llama/llama-3-8b-instruct:free", "claude-3-5-haiku-20241022")
}
FALLBACK_MODEL = "gemini-2.5-flash"

def get_agent_system_prompt(agent_name: str) -> str:
    agent_clean = agent_name.replace("@", "")
    agent_file = Path(f".claude/agents/{agent_clean}.md")
    if agent_file.exists():
        with open(agent_file, "r", encoding="utf-8") as f:
            return f.read()
    return f"Voce e o agente especialista {agent_name}."

def call_gemini(model: str, system_prompt: str, user_prompt: str, api_key: str) -> str:
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"
    headers = {'Content-Type': 'application/json'}
    data = {
        "system_instruction": {"parts": [{"text": system_prompt}]},
        "contents": [{"parts": [{"text": user_prompt}]}]
    }
    
    req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'), headers=headers, method='POST')
    try:
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode('utf-8'))
            return result['candidates'][0]['content']['parts'][0]['text']
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        raise RuntimeError(f"HTTP {e.code}: {e.reason} - {error_body}")

def call_anthropic(model: str, system_prompt: str, user_prompt: str, api_key: str) -> str:
    url = "https://api.anthropic.com/v1/messages"
    headers = {
        'Content-Type': 'application/json',
        'x-api-key': api_key,
        'anthropic-version': '2023-06-01'
    }
    data = {
        "model": model,
        "max_tokens": 4096,
        "system": system_prompt,
        "messages": [{"role": "user", "content": user_prompt}]
    }
    req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'), headers=headers, method='POST')
    try:
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode('utf-8'))
            return result['content'][0]['text']
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        raise RuntimeError(f"HTTP {e.code}: {e.reason} - {error_body}")

def call_openrouter(model: str, system_prompt: str, user_prompt: str, api_key: str) -> str:
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {api_key}'
    }
    data = {
        "model": model,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ]
    }
    req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'), headers=headers, method='POST')
    try:
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode('utf-8'))
            return result['choices'][0]['message']['content']
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        raise RuntimeError(f"HTTP {e.code}: {e.reason} - {error_body}")

def call_llm_api(agent_name: str, system_prompt: str, user_prompt: str) -> str:
    quartet = AGENT_ROUTING.get(agent_name, (FALLBACK_MODEL, "gemini-2.5-pro", "deepseek/deepseek-r1:free", "claude-3-5-haiku-20241022"))
    models_to_try = list(quartet)
    
    gemini_key = os.environ.get("GEMINI_API_KEY")
    anthropic_key = os.environ.get("ANTHROPIC_API_KEY")
    openrouter_key = os.environ.get("OPENROUTER_API_KEY")

    for model in models_to_try:
        retries = 3
        for attempt in range(retries):
            try:
                if "gemini" in model and gemini_key:
                    if attempt == 0: logging.info(f"[{agent_name}] Acionando cognicao via {model} (Google Free Tier)...")
                    return call_gemini(model, system_prompt, user_prompt, gemini_key)
                elif ("deepseek" in model or "llama" in model) and openrouter_key:
                    if attempt == 0: logging.info(f"[{agent_name}] Acionando terceira via Free Tier ({model})...")
                    return call_openrouter(model, system_prompt, user_prompt, openrouter_key)
                elif "claude" in model and anthropic_key:
                    if attempt == 0: logging.info(f"[{agent_name}] Acionando ultima linha de defesa PAGA {model} (Anthropic)...")
                    return call_anthropic(model, system_prompt, user_prompt, anthropic_key)
                break # Sem chaves, pula o modelo
            except Exception as e:
                error_msg = str(e)
                if "429" in error_msg and attempt < retries - 1:
                    logging.warning(f"[{agent_name}] Rate limit (429) no {model}. Respirando 5s (Tentativa {attempt+2}/{retries})...")
                    time.sleep(5)
                    continue
                logging.warning(f"[{agent_name}] Falha transiente no modelo {model}: {error_msg}. Acionando contingencia...")
                break # Erro duro, pula para o proximo modelo
            
    logging.warning(f"[{agent_name}] Multiplas falhas ou chaves ausentes. Modo Simulacao Ativado.")
    time.sleep(2)
    return '[\n  {"description": "Sub-tarefa gerada via simulacao de contingencia.", "agent": "@planner"}\n]'

def apply_god_mode(text: str):
    """
    Materializacao Direta e Execucao (God Mode 2.0):
    Le a mente do agente, forja os arquivos fisicos e executa comandos de sistema.
    """
    # 1. Forjamento de Arquivos
    pattern = r"(?:Arquivo|File|Caminho|Path):\s*`?([^\n`]+)`?\s*\n+```[a-zA-Z]*\n(.*?)```"
    for match in re.finditer(pattern, text, re.DOTALL | re.IGNORECASE):
        filepath = match.group(1).strip()
        content = match.group(2)
        try:
            target_path = Path(filepath)
            target_path.parent.mkdir(parents=True, exist_ok=True)
            with open(target_path, "w", encoding="utf-8") as f:
                f.write(content)
            logging.info(f"[MATERIALIZACAO] Arquivo forjado com sucesso: {filepath}")
        except Exception as e:
            logging.error(f"[FAIL] Falha de permissao ao forjar {filepath}: {e}")
            
    # 2. Execucao de Comandos de Terminal
    cmd_pattern = r"(?:Comando|Command|Executar|Execute):\s*(?:```(?:[a-zA-Z]*)\n(.*?)\n```|`([^`]+)`)"
    import subprocess
    forbidden_commands = ["rm -rf", "del /s", "diskpart", "format ", "mkfs", "rmdir /s /q c:\\"]
    for match in re.finditer(cmd_pattern, text, re.DOTALL | re.IGNORECASE):
        cmd = match.group(1) if match.group(1) else match.group(2)
        cmd = cmd.strip()
        
        if any(f in cmd.lower() for f in forbidden_commands):
            error_msg = f"Comando destrutivo bloqueado por regras de seguranca: {cmd}"
            logging.error(f"[SEC] {error_msg}")
            raise PermissionError(error_msg)
            
        try:
            logging.info(f"[EXECUCAO] Orquestrador rodando comando nativo: {cmd}")
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True, timeout=300)
            if result.returncode == 0:
                logging.info(f"[OK] Comando executado de forma soberana: {cmd}")
            else:
                error_msg = f"Codigo {result.returncode} - {result.stderr.strip()}"
                logging.error(f"[FAIL] Falha no comando '{cmd}': {error_msg}")
                raise RuntimeError(f"O comando nativo falhou: {cmd}\nDetalhes do Erro: {error_msg}")
        except Exception as e:
            logging.error(f"[FAIL] Arritmia critica/Timeout no comando {cmd}: {e}")
            raise

def process_agent_task(task: Task, manager: QueueManager):
    system_prompt = get_agent_system_prompt(task.agent)
    
    # Injecao de Contexto Maior (O Todo na Parte)
    project_context = ""
    context_file = Path(".claude/project-context.md")
    if context_file.exists():
        with open(context_file, "r", encoding="utf-8") as f:
            project_context = f.read()
            
    if len(project_context) > 6000:
        project_context = project_context[:6000] + "\n\n... [Contexto truncado para otimizacao de tokens. Consulte o @bibliotecario se precisar de historico.]"
        
    user_prompt = f"== CONTEXTO DO PROJETO ==\n{project_context}\n\n== DIRETRIZ DA TAREFA ==\nID: {task.id}\nDescricao:\n{task.description}\n\nExecute esta tarefa embasado no contexto."
    
    if task.agent not in ["@dispatcher", "@bibliotecario"]:
        user_prompt += "\n\n[AUTORIZACAO SUPREMA - GOD MODE]\nVoce possui ACESSO LIVRE ao sistema operacional do usuario.\n1. Para MATERIALIZAR ou EDITAR arquivos, use EXATAMENTE o formato:\nArquivo: caminho/do/arquivo.ext\n```linguagem\n[conteudo completo do arquivo]\n```\n2. Para EXECUTAR comandos de terminal (ex: npm install, python, git, robocopy), use o formato:\nComando: `seu comando aqui`\n\nVoce tem soberania para agir, instalar dependencias e forjar a realidade. ATENCAO: Ao editar arquivos, envie sempre o conteudo integral para sobrescrever adequadamente."

    if task.agent == "@dispatcher":
        user_prompt += "\n\nVoce e o @dispatcher. Quebre este epico em tarefas menores sequenciais. Retorne EXCLUSIVAMENTE um array JSON contendo objetos com as chaves 'description' (string) e 'agent' (string com o nome do agente, ex: @planner). Sem texto markdown adicional."
        
    # Instrucao para recomendacao ativa de LLM (Economia Generalizada x SOTA)
    user_prompt += "\n\n[DIRETRIZ DE LLM] Ao final da sua resposta, analise a tarefa e o contexto. Recomende qual modelo (Claude Pro/Opus, Gemini Advanced/1.5 Pro, ou um modelo API especifico) seria o mais adequado para a *proxima* etapa ou para a *atual* tarefa, justificando a escolha com base na 'Economia Generalizada' (custo financeiro, latencia, janela de contexto, qualidade de output). Se a tarefa for melhor executada na interface Web (com suas assinaturas pagas), instrua o usuario a usar o Protocolo de Handoff (-Web)."

    response_text = call_llm_api(task.agent, system_prompt, user_prompt)
    
    result_dir = Path(".claude/task_results")
    result_dir.mkdir(parents=True, exist_ok=True)
    with open(result_dir / f"{task.id}.md", "w", encoding="utf-8") as f:
        f.write(f"# Resposta: {task.id} ({task.agent})\n\n{response_text}")
        
    # Transforma pensamento em realidade física e comandos (God Mode)
    apply_god_mode(response_text)
        
    if task.agent == "@dispatcher":
        try:
            clean_json = response_text.replace("```json", "").replace("```", "").strip()
            subtasks = json.loads(clean_json[clean_json.find('['):clean_json.rfind(']')+1])
            
            queue = manager.load_queue()
            for i, st in enumerate(subtasks):
                new_task = Task(
                    id=f"{task.id}-SUB-{i+1}",
                    description=st.get("description", "Sub-tarefa gerada"),
                    agent=st.get("agent", "@implementor"),
                    timestamp=datetime.now().isoformat()
                )
                queue.tasks.append(new_task)
            manager.save_queue(queue)
            logging.info(f"[{task.id}] Dispatcher gerou {len(subtasks)} novas tarefas na fila.")
        except Exception as e:
            logging.error(f"[{task.id}] Falha ao interpretar matriz do Dispatcher: {e}")

# ==========================================
# 2.6 NOTIFICAÇÃO DO SISTEMA (Windows Toast)
# ==========================================
def get_autonomy_mode() -> str:
    config_path = Path(".claude/autonomy.json")
    if config_path.exists():
        try:
            with open(config_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                return data.get("mode", "off")
        except:
            pass
    return "off"

def send_toast(title: str, message: str, status: str = "success"):
    try:
        # Utiliza integração nativa do PowerShell com o Windows Runtime, sem bibliotecas externas
        ps_code = f"""
        [Windows.UI.Notifications.ToastNotificationManager, Windows.UI.Notifications, ContentType = WindowsRuntime] | Out-Null
        [Windows.Data.Xml.Dom.XmlDocument, Windows.Data.Xml.Dom, ContentType = WindowsRuntime] | Out-Null
        $xml = New-Object Windows.Data.Xml.Dom.XmlDocument
        $xml.LoadXml("<toast><visual><binding template='ToastText02'><text id='1'>{title}</text><text id='2'>{message}</text></binding></visual></toast>")
        $toast = [Windows.UI.Notifications.ToastNotification]::new($xml)
        [Windows.UI.Notifications.ToastNotificationManager]::CreateToastNotifier("Nexus Worker").Show($toast)
        """
        import subprocess
        subprocess.Popen(["powershell", "-NoProfile", "-WindowStyle", "Hidden", "-Command", ps_code])
    except Exception as e:
        logging.error(f"Falha ao disparar Toast: {e}")

# ==========================================
# 3. O PULSO (Daemon/Worker)
# ==========================================
def execute_task_workflow(task: Task, manager: QueueManager):
    try:
        process_agent_task(task, manager)
        # Sucesso
        manager.update_task_status(task.id, "completed")
        logging.info(f"[OK]  Simetria: [{task.id}] -> COMPLETED")
        send_toast("Simetria Alcancada", f"A tarefa foi concluida pelo {task.agent}.", "success")
        
        # ==========================================
        # PASSAGEM DE BASTÃO AUTOMÁTICA (Auto-Handoff)
        # ==========================================
        autonomy_mode = get_autonomy_mode()
        if autonomy_mode != "off" and not task.id.startswith("AUTOFIX") and task.agent != "@dispatcher":
            pipeline = {
                "@pesquisador": "@prompter",
                "@prompter": "@planner",
                "@planner": "@auditor",
                "@auditor": "@implementor",
                "@implementor": "@verifier",
                "@verifier": "@curator",
                "@curator": "@seo"
            }
            next_agent = pipeline.get(task.agent)
            if next_agent:
                if autonomy_mode == "partial" and next_agent == "@implementor":
                    logging.info(f"[AUTONOMIA PARCIAL] Fluxo pausado. A etapa critica do {next_agent} exige comando manual.")
                else:
                    queue = manager.load_queue()
                    handoff_id = f"HANDOFF-{task.id[-10:]}-{next_agent.strip('@').upper()}"
                    if not any(t.id == handoff_id for t in queue.tasks):
                        new_task = Task(
                            id=handoff_id,
                            description=f"O agente {task.agent} concluiu sua etapa na tarefa base {task.id}. Analise o resultado gerado em '.claude/task_results/{task.id}.md' e execute a sua etapa de {next_agent}.",
                            agent=next_agent,
                            timestamp=datetime.now().isoformat()
                        )
                        queue.tasks.append(new_task)
                        manager.save_queue(queue)
                        logging.info(f"[AUTO-HANDOFF] O bastao foi passado para {next_agent}.")
    except Exception as e:
        logging.error(f"[FAIL] Falha: [{task.id}] -> FAILED ({e})")
        manager.update_task_status(task.id, "failed")
        send_toast("Entropia Detectada", f"Falha na tarefa do {task.agent}.", "error")
        
        # ==========================================
        # NÚCLEO DE AUTODEBUGGING (Auto-Cura 24/7)
        # ==========================================
        if not task.id.startswith("AUTOFIX-"):
            try:
                queue = manager.load_queue()
                fix_id = f"AUTOFIX-{task.id}"
                if not any(t.id == fix_id for t in queue.tasks):
                    fix_task = Task(
                        id=fix_id,
                        description=f"[SYSTEM AUTODEBUG] A tarefa original '{task.id}' executada por {task.agent} falhou com a excecao: {e}.\n\n---\nTarefa Original:\n{task.description}\n---\n\nATENCAO: Avalie o erro ocorrido, aplique a autocorrecao tecnica necessaria sem alucinar, e re-execute o objetivo original com sucesso. Nao demande intervencao humana.",
                        agent=task.agent,
                        timestamp=datetime.now().isoformat()
                    )
                    queue.tasks.append(fix_task)
                    manager.save_queue(queue)
                    logging.info(f"[AUTODEBUGGER] Auto-Cura acionada! Tarefa {fix_id} injetada na fila.")
                    send_toast("Auto-Cura Acionada", "Sistema intervindo autonomamente.", "warning")
            except Exception as debug_error:
                logging.error(f"[FAIL] Falha fatal no Nucleo de Autodebugging: {debug_error}")

def start_worker():
    manager = QueueManager()
    
    # 1. Limpa o terminal para o God Mode Visual
    os.system('cls' if os.name == 'nt' else 'clear')
    
    # 2. Varredura inicial da Fila
    queue = manager.load_queue()
    pending = sum(1 for t in queue.tasks if t.status == "pending")
    running = sum(1 for t in queue.tasks if t.status == "running")
    completed = sum(1 for t in queue.tasks if t.status == "completed")
    failed = sum(1 for t in queue.tasks if t.status == "failed")
    
    W = '\033[97m' # Código ANSI para Branco Brilhante
    R = '\033[0m'  # Código ANSI para Resetar a cor
    # 3. Força a impressão na tela (bypass de buffer)
    print(f"{W}==========================================================={R}", flush=True)
    print(f"{W}         CHICO SYSTEM - ORQUESTRADOR PYTHON SOTA           {R}", flush=True)
    print(f"{W}==========================================================={R}", flush=True)
    print(f"{W} PENDENTES: {pending} | RODANDO: {running} | COMPLETAS: {completed} | FALHAS: {failed}{R}", flush=True)
    print(f"{W}===========================================================\n{R}", flush=True)
    
    logging.info("=== ORQUESTRADOR PYTHON INICIADO [MULTITHREAD] ===")
    
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
        try:
            while True:
                try:
                    queue = manager.load_queue()
                    pending_count = sum(1 for t in queue.tasks if t.status == "pending")
                    if os.name == 'nt':
                        import ctypes
                        current_time = datetime.now().strftime("%H:%M:%S")
                        ctypes.windll.kernel32.SetConsoleTitleW(f"NEXUS WORKER | Pendentes: {pending_count} | Pulso: {current_time}")
                    
                    task = next((t for t in queue.tasks if t.status == "pending"), None)
                    if task:
                        logging.info(f"[>>>] Metamorfose: [{task.id}] -> RUNNING (Agente: {task.agent})")
                        manager.update_task_status(task.id, "running")
                        executor.submit(execute_task_workflow, task, manager)
                    else:
                        # Live Heartbeat (Raio-X em tempo real da fila)
                        p_c = sum(1 for t in queue.tasks if t.status == "pending")
                        r_c = sum(1 for t in queue.tasks if t.status == "running")
                        c_c = sum(1 for t in queue.tasks if t.status == "completed")
                        f_c = sum(1 for t in queue.tasks if t.status == "failed")
                        pulse_time = datetime.now().strftime("%H:%M:%S")
                        print(f"\r\033[K[{pulse_time}] [VIGILIA] Pendentes: {p_c} | Rodando: {r_c} | Concluidas: {c_c} | Falhas: {f_c} (Aguardando...)", end="", flush=True)
                        time.sleep(5)
                except Exception as inner_e:
                    logging.error(f"[FATAL] Erro interno no laco do worker: {inner_e}")
                    time.sleep(5)
        except KeyboardInterrupt:
            logging.info("Pulso encerrado pelo usuario. Hibernando...")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        cmd = sys.argv[1]
        manager = QueueManager()
        
        if cmd == "add":
            try:
                task_payload = sys.argv[2]
                
                if task_payload.startswith("{"):
                    task_json = task_payload
                else:
                    task_json = base64.b64decode(task_payload).decode("utf-8")
                    
                new_task = Task.model_validate_json(task_json)
                queue = manager.load_queue()
                
                existing_idx = next((i for i, t in enumerate(queue.tasks) if t.id == new_task.id), None)
                if existing_idx is not None:
                    queue.tasks[existing_idx] = new_task
                else:
                    queue.tasks.append(new_task)
                    
                manager.save_queue(queue)
                print(f"SUCCESS: {new_task.id}")
            except Exception as e:
                print(f"ERROR: {e}")
                sys.exit(1)
        elif cmd == "worker":
            start_worker()
    else:
        start_worker()