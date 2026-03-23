import json
import time
import sys
import os
import base64
import re
import subprocess
import shlex
import aiohttp
from aiohttp import web
import logging
import asyncio
import functools
import aiosqlite
import sqlite3
from pathlib import Path
from typing import List, Optional, Literal, Dict, Any
from pydantic import BaseModel, Field, ValidationError, field_validator
from datetime import datetime, timedelta
from rich.logging import RichHandler
from rich.console import Console
from rich.panel import Panel
from rich.status import Status

# Carregamento Lazzy do RAG para evitar overhead no db-add
rag_engine = None
def get_rag():
    global rag_engine
    if rag_engine is None:
        from memory_rag import MemoryRAG
        rag_engine = MemoryRAG()
    return rag_engine

# Configuracao estetica e persistente de Log (Estado da Arte)
console = Console()
log_dir = Path(".claude/logs")
log_dir.mkdir(parents=True, exist_ok=True)
log_level = os.environ.get("LOG_LEVEL", "INFO").upper()
logging.basicConfig(
    force=True, # Garante que a nossa configuração sobrescreva qualquer outra pré-existente
    level=logging.INFO,
    format="%(message)s",
    datefmt="[%X]",
    handlers=[
        logging.FileHandler(log_dir / "task_executor.log", encoding="utf-8"), # Arquivo mantem utf-8
        RichHandler(console=console, rich_tracebacks=True, markup=True, show_path=False)
    ]
)

# =================================================
# ORCAMENTO COGNITIVO E HIBERNACAO (Logistica SOTA)
# =================================================
DAILY_API_BUDGET = 10 # Numero de chamadas de API gratuitas por dia

class APIBudgetExhaustedError(Exception):
    """Excecao customizada para quando o orcamento de API e esgotado."""
    pass

# =================================================
# OTIMIZACOES DE PERFORMANCE (Cache SOTA)
# =================================================

def _load_env_keys() -> Dict[str, str]:
    """Le chaves de forma implacavel de _env.ps1 ou .env para garantir operacao SOTA."""
    keys = {}
    base_dir = Path(__file__).parent.resolve()
    for file_name in ["_env.ps1", ".env"]:
        env_path = base_dir / file_name
        if env_path.exists():
            try:
                with open(env_path, "r", encoding="utf-8", errors="ignore") as f:
                    for line in f:
                        match = re.search(r'(?:\$env:|\$)?([a-zA-Z0-9_]+)\s*[:=]\s*[\'"]?([^\'"\s#]+)[\'"]?', line)
                        if match:
                            keys[match.group(1)] = match.group(2).strip()
            except Exception as e:
                logging.warning(f"Aviso ao ler {file_name}: {e}")
    return keys

# Caches para otimização de performance
SYSTEM_PROMPT_CACHE: Dict[str, str] = {}
AUTONOMY_MODE_CACHE = {"mode": "off", "timestamp": 0.0}

# Carregamento unico das chaves de API para evitar I/O repetitivo
ENV_KEYS = _load_env_keys()
ALL_ENV_VARS = {**os.environ, **ENV_KEYS}
GEMINI_KEYS = list(dict.fromkeys([v for k, v in ALL_ENV_VARS.items() if v and (k.upper().startswith("GEMINI") or k.upper().startswith("GOOGLE")) and not k.upper().startswith("GEMINI_CLI")]))
ANTHROPIC_KEYS = list(dict.fromkeys([v for k, v in ALL_ENV_VARS.items() if v and k.upper().startswith("ANTHROPIC")]))
OPENROUTER_KEYS = list(dict.fromkeys([v for k, v in ALL_ENV_VARS.items() if v and (k.upper().startswith("OPENROUTER") or k.upper().startswith("OPEN_ROUTER"))]))

# Circuit breaker para chaves bloqueadas temporariamente
KEY_BLOCK_DURATION = timedelta(minutes=15)
KEY_BLOCKLIST: Dict[str, datetime] = {}

def _key_identifier(provider: str, key: str) -> str:
    return f"{provider}:{key}"

def _is_key_blocked(provider_key: str) -> bool:
    expiry = KEY_BLOCKLIST.get(provider_key)
    if expiry:
        if expiry > datetime.now():
            return True
        KEY_BLOCKLIST.pop(provider_key, None)
    return False

def _block_key(provider_key: str):
    KEY_BLOCKLIST[provider_key] = datetime.now() + KEY_BLOCK_DURATION


# =================================================
# FIM DAS OTIMIZACOES DE PERFORMANCE
# =================================================
# ==========================================
# 1. SCHEMAS (A Lei da Honestidade Radical)
# ==========================================

def load_json_config(file_path: Path, default_value: Any = None) -> Any:
    if file_path.exists():
        try:
            with open(file_path, "r", encoding="utf-8-sig") as f:
                content = f.read()
                content = content.lstrip('\ufeff')
                return json.loads(content)
        except (json.JSONDecodeError, IOError) as e:
            logging.error(f"Falha ao carregar ou parsear {file_path}: {e}")
    return default_value

# --- Carregamento Dinamico da Consciencia do Sistema ---
AGENTS_MANIFEST = load_json_config(Path("data/agents_manifest.json"), {})

# Construcao dinamica do INTENT_MAP e AGENT_ROUTING_MAP a partir do Manifesto
INTENT_MAP = {f"@{name}": {"pattern": data.get("routing_pattern", "")} for name, data in AGENTS_MANIFEST.items()}
AGENT_ROUTING_MAP = {f"@{name}": data.get("model_preference", "fast_operations") for name, data in AGENTS_MANIFEST.items()}
VALID_AGENTS = list(INTENT_MAP.keys())

SYSTEM_CONFIG = load_json_config(Path("data/system_config.json"), {})
MODEL_ROUTING = SYSTEM_CONFIG.get("model_routing", {})
DEEP_THINKING_MODELS = tuple(MODEL_ROUTING.get("deep_thinking", ("google/gemini-flash-1.5",)))
FAST_OPERATIONS_MODELS = tuple(MODEL_ROUTING.get("fast_operations", ("google/gemini-flash-1.5",)))
PROTECTED_AGENTS_FROM_CLEANUP = tuple(SYSTEM_CONFIG.get("protected_agents_from_cleanup", ("@maverick", "@chico")))
HANDOFF_PIPELINE = SYSTEM_CONFIG.get("handoff_pipeline", {})

if not VALID_AGENTS:
    logging.critical("CRITICAL: agents_manifest.json nao encontrado ou vazio. O sistema nao tem consciencia de seus agentes.")
    sys.exit(1)


"""
Definição do schema para a classe Task, garantindo a estrutura de dados utilizada no sistema.
"""
class Task(BaseModel):
    id: str
    description: str
    status: Literal["pending", "running", "completed", "failed", "cancelled"] = "pending"
    timestamp: str
    agent: str = Field(..., pattern=r"^@[\w]+$")
    completedAt: Optional[str] = None
    model: Optional[str] = None
    metadata: Dict[str, Any] = Field(default_factory=dict)

    @field_validator('agent')
    @classmethod
    def validate_agent_existence(cls, v: str) -> str:
        if v not in VALID_AGENTS:
            raise ValueError(f"Agente desconhecido: {v}")
        return v

# ==========================================
# 2. GERENCIADOR DA FILA (SQLite DAL)
# ==========================================


"""
QueueManager: Classe para gerenciar a fila de tarefas utilizando SQLite como banco de dados.
Implementa operações CRUD para as tarefas e cache de LLM.
"""
class QueueManager:
    def __init__(self, queue_path: str = None):
        """Inicializa o gerenciador da fila, criando o banco de dados se não existir."""
        if queue_path is None:
            env_db = os.environ.get("SQLITE_DB_PATH")
            if env_db:
                self.db_path = Path(env_db)
            else:
                self.db_path = Path(__file__).parent.resolve() / "queue" / "tasks.db"
            # Garante que o diretório do banco de dados exista, seja ele o shadow ou o de produção.
            self.db_path.parent.mkdir(parents=True, exist_ok=True)
            self._is_memory = False
        else:
            if queue_path == ":memory:":
                self.db_path = ":memory:"
                self._is_memory = True
                self._memory_conn = sqlite3.connect(":memory:", check_same_thread=False)
                self._memory_conn.row_factory = sqlite3.Row
            else:
                # Sanitize queue_path to prevent path traversal
                self.db_path = Path(queue_path)
                self.db_path.parent.mkdir(parents=True, exist_ok=True)
                self._is_memory = False
        
        # Blindagem de Seguranca SOTA: Prevenir Path Traversal no construtor
        if not self._is_memory:
            base_path = Path(__file__).parent.absolute()
            db_resolved_path = self.db_path.absolute()
            
            base_path_str = os.path.normcase(str(base_path))
            db_resolved_path_str = os.path.normcase(str(db_resolved_path))
            
            if not db_resolved_path_str.startswith(base_path_str):
                 logging.critical(f"[SEC] Tentativa de Path Traversal bloqueada. O banco de dados '{self.db_path}' esta fora da raiz do projeto.")
                 raise PermissionError("Database path is outside the project root.")

        self._init_db()

    def close(self):
        """Fecha a conexao em memoria se for o caso."""
        if getattr(self, '_is_memory', False) and hasattr(self, '_memory_conn'):
            self._memory_conn.close()

    def _get_conn(self):
        if getattr(self, '_is_memory', False) and hasattr(self, '_memory_conn'):
            return self._memory_conn
        return sqlite3.connect(self.db_path)

    def _init_db(self):
        with self._get_conn() as conn:
            # This is a synchronous method used only for CLI init, so we keep it simple.
            # The async methods will handle the async connection.
            conn.execute("""
                CREATE TABLE IF NOT EXISTS llm_cache (
                    model TEXT NOT NULL,
                    prompt TEXT NOT NULL,
                    response TEXT NOT NULL,
                    timestamp TEXT NOT NULL,
                    PRIMARY KEY (model, prompt)
                )
            """)
            conn.execute("CREATE INDEX IF NOT EXISTS idx_model_prompt ON llm_cache (model, prompt)")
            # Cria a tabela tasks para armazenar as tarefas
            conn.execute("""
                CREATE TABLE IF NOT EXISTS tasks (
                    id TEXT PRIMARY KEY,
                    description TEXT NOT NULL,
                    status TEXT NOT NULL,
                    timestamp TEXT NOT NULL,
                    agent TEXT NOT NULL,
                    priority TEXT DEFAULT 'normal',
                    metadata TEXT,
                    completedAt TEXT

                )
            """)
            conn.execute("CREATE INDEX IF NOT EXISTS idx_status_time ON tasks (status, timestamp)")
            
            # Cria a tabela api_usage para auditoria de custos e tokens
            conn.execute("""
                CREATE TABLE IF NOT EXISTS api_usage (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    task_id TEXT NOT NULL,
                    agent TEXT NOT NULL,
                    model TEXT NOT NULL,
                    provider TEXT NOT NULL,
                    prompt_tokens INTEGER,
                    completion_tokens INTEGER,
                    total_tokens INTEGER,
                    timestamp TEXT NOT NULL
                )
            """)
            conn.commit()
            conn.execute("""
                CREATE TABLE IF NOT EXISTS daily_usage ( date TEXT PRIMARY KEY, call_count INTEGER NOT NULL )
            """)
            conn.execute("""
                CREATE TABLE IF NOT EXISTS system_state ( key TEXT PRIMARY KEY, value TEXT )
            """)

    async def add_task(self, task: Task):
        """Adiciona uma nova tarefa ao banco de dados."""
        async with aiosqlite.connect(self.db_path) as db:
            db.row_factory = sqlite3.Row
            await db.execute("""
                INSERT OR REPLACE INTO tasks 
                (id, description, status, timestamp, agent, priority, metadata, completedAt)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                task.id, 
                task.description,
                task.status,
                task.timestamp,
                task.agent,
                task.metadata.get("priority", "normal") if task.metadata else "normal",
                json.dumps(task.metadata) if task.metadata else '{}',
                task.completedAt
            ))
            await db.commit()

    async def get_task(self, task_id: str):
        """Retorna uma tarefa específica do banco de dados."""
        async with aiosqlite.connect(self.db_path) as db:
            db.row_factory = sqlite3.Row
            async with db.execute("SELECT * FROM tasks WHERE id = ?", (task_id,)) as cursor:
                row = await cursor.fetchone()
                if row:
                    return self._row_to_task(row)
        return None
            
    async def get_next_task(self):
        """Retorna a próxima tarefa pendente na fila, ordenando por prioridade e timestamp."""
        async with aiosqlite.connect(self.db_path) as db:
            db.row_factory = sqlite3.Row
            async with db.execute("""
                    SELECT * FROM tasks 
                    WHERE status = 'pending' 
                    ORDER BY 
                        CASE priority 
                            WHEN 'critical' THEN 1 
                            WHEN 'high' THEN 2 
                            WHEN 'medium' THEN 3 
                            WHEN 'low' THEN 4 
                            ELSE 3 
                        END,
                    timestamp ASC
                LIMIT 50
                """) as cursor:
                rows = await cursor.fetchall()

            for row in rows:
                task = self._row_to_task(row)
                if task.metadata and "depends_on" in task.metadata:
                    all_met = True
                    for dep_id in task.metadata["depends_on"]:
                        async with db.execute("SELECT status FROM tasks WHERE id = ?", (dep_id,)) as dep_cursor:
                            dep_row = await dep_cursor.fetchone()
                            if dep_row and dep_row["status"] not in ("completed", "cancelled"):
                                all_met = False
                                break
                    if not all_met:
                        continue # Pula esta tarefa temporariamente (dependencia pendente)
                return task
        return None

    async def update_task_status(self, task_id: str, new_status):
        """Atualiza o status de uma tarefa no banco de dados."""
        completed_at = datetime.now().isoformat() if new_status in ["completed", "failed"] else None
        async with aiosqlite.connect(self.db_path) as db:
            if completed_at:
                await db.execute("UPDATE tasks SET status = ?, completedAt = ? WHERE id = ?",
                             (new_status, completed_at, task_id))
            else:
                await db.execute("UPDATE tasks SET status = ? WHERE id = ?", (new_status, task_id))
            await db.commit()
            
    async def delete_task(self, task_id: str):
        """Remove uma tarefa especifica do banco de dados (Vaporizacao Cirurgica)."""
        async with aiosqlite.connect(self.db_path) as db:
            await db.execute("DELETE FROM tasks WHERE id = ?", (task_id,))
            await db.commit()
 
    async def get_tasks(self, status: str = None, since_hours: int = None) -> List[Task]:
        """Retorna uma lista de tarefas do banco de dados, filtrando por status e tempo."""
        async with aiosqlite.connect(self.db_path) as db:
            db.row_factory = sqlite3.Row
            query = "SELECT * FROM tasks"
            params = []
            conditions = []
            
            if status:
                conditions.append("status = ?")
                params.append(status)
            if since_hours:
                cutoff = (datetime.now() - timedelta(hours=since_hours)).isoformat()
                conditions.append("timestamp >= ?")
                params.append(cutoff)
                
            if conditions:
                query += " WHERE " + " AND ".join(conditions)
                
            query += " ORDER BY timestamp DESC"
            cursor = await db.execute(query, params)
            rows = await cursor.fetchall()
            await cursor.close()
            return [self._row_to_task(row) for row in rows]
            
    async def get_task_counts(self):
        """Retorna a contagem de tarefas por status."""
        async with aiosqlite.connect(self.db_path) as db:
            db.row_factory = sqlite3.Row
            cursor = await db.execute("SELECT status, COUNT(*) as count FROM tasks GROUP BY status")
            rows = await cursor.fetchall()
            await cursor.close()
            counts = { "pending": 0, "running": 0, "completed": 0, "failed": 0 }
            for r in rows:
                if r["status"] in counts:
                    counts[r["status"]] = r["count"]
            return counts
            
    async def get_performance_history(self):
        """Retorna o historico de tarefas concluidas por dia."""
        async with aiosqlite.connect(self.db_path) as db:
            db.row_factory = sqlite3.Row
            query = """
                SELECT date(completedAt) as day, COUNT(*) as count
                FROM tasks
                WHERE status = 'completed' AND completedAt IS NOT NULL
                GROUP BY day
                ORDER BY day ASC
            """
            cursor = await db.execute(query)
            rows = await cursor.fetchall()
            await cursor.close()
            return [{"day": r["day"], "count": r["count"]} for r in rows]

    async def get_llm_cache(self, model: str, prompt: str) -> Optional[str]:
        """Retorna a resposta do cache da LLM para um determinado modelo e prompt."""
        async with aiosqlite.connect(self.db_path) as db:
            async with db.execute("SELECT response FROM llm_cache WHERE model = ? AND prompt = ?", (model, prompt)) as cursor:
                row = await cursor.fetchone()
                if row:
                    return row[0]
        return None

    async def update_llm_cache(self, model: str, prompt: str, response: str):
        """Atualiza o cache da LLM com a resposta para um determinado modelo e prompt."""
        timestamp = datetime.now().isoformat()
        async with aiosqlite.connect(self.db_path) as db:
            await db.execute("""
                INSERT OR REPLACE INTO llm_cache (model, prompt, response, timestamp)
                VALUES (?, ?, ?, ?)
            """, (model, prompt, response, timestamp))
            await db.commit()

    async def record_api_usage(self, task_id: str, agent: str, model: str, provider: str, prompt_tokens: int, completion_tokens: int):
        """Grava o consumo de tokens no banco de dados para auditoria financeira."""
        total = prompt_tokens + completion_tokens
        timestamp = datetime.now().isoformat()
        async with aiosqlite.connect(self.db_path) as db:
            await db.execute("""
                INSERT INTO api_usage (task_id, agent, model, provider, prompt_tokens, completion_tokens, total_tokens, timestamp)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """, (task_id, agent, model, provider, prompt_tokens, completion_tokens, total, timestamp))
            await db.commit()

    async def check_and_increment_usage(self) -> bool:
        """Verifica o orcamento diario de API e o incrementa. Retorna True se a chamada for permitida."""
        today = datetime.now().strftime("%Y-%m-%d")
        async with aiosqlite.connect(self.db_path) as db:
            async with db.execute("SELECT call_count FROM daily_usage WHERE date = ?", (today,)) as cursor:
                row = await cursor.fetchone()
            
            current_count = row[0] if row else 0
            
            if current_count >= DAILY_API_BUDGET:
                return False
            
            await db.execute("""
                INSERT INTO daily_usage (date, call_count) VALUES (?, 1)
                ON CONFLICT(date) DO UPDATE SET call_count = call_count + 1
            """, (today,))
            await db.commit()
            return True

    async def get_system_state(self, key: str) -> Optional[str]:
        """Obtem um valor do estado do sistema."""
        async with aiosqlite.connect(self.db_path) as db:
            async with db.execute("SELECT value FROM system_state WHERE key = ?", (key,)) as cursor:
                row = await cursor.fetchone()
                return row[0] if row else None

    async def set_system_state(self, key: str, value: str):
        """Define um valor no estado do sistema."""
        async with aiosqlite.connect(self.db_path) as db:
            await db.execute("INSERT OR REPLACE INTO system_state (key, value) VALUES (?, ?)", (key, value))
            await db.commit()

    async def cleanup(self, days: int):
        """Remove tarefas antigas do banco de dados."""
        cutoff = (datetime.now() - timedelta(days=days)).isoformat()
        async with aiosqlite.connect(self.db_path) as db:
            await db.execute("""
                CREATE TABLE IF NOT EXISTS archive_tasks (
                    id TEXT PRIMARY KEY,
                    description TEXT,
                    status TEXT,
                    timestamp TEXT,
                    agent TEXT,
                    priority TEXT,
                    metadata TEXT,
                    completedAt TEXT
                )
            """)
            cursor = await db.execute(f"""
                SELECT * FROM tasks
                WHERE status IN ('completed', 'failed') 
                AND timestamp < ?
                AND agent NOT IN ({','.join('?' for _ in PROTECTED_AGENTS_FROM_CLEANUP)})
            """, (cutoff, *PROTECTED_AGENTS_FROM_CLEANUP))
            rows = await cursor.fetchall()
            
            for r in rows:
                await db.execute("""
                    INSERT OR IGNORE INTO archive_tasks
                    (id, description, status, timestamp, agent, priority, metadata, completedAt)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """, (r["id"], r["description"], r["status"], r["timestamp"], r["agent"], r["priority"], r["metadata"], r["completedAt"]))

            await db.execute(f"""
                DELETE FROM tasks 
                WHERE status IN ('completed', 'failed') 
                AND timestamp < ?
                AND agent NOT IN ({','.join('?' for _ in PROTECTED_AGENTS_FROM_CLEANUP)})
            """, (cutoff, *PROTECTED_AGENTS_FROM_CLEANUP))
            await db.commit()
            await cursor.close()
            
        # Limpeza do Cofre Economico (Logs de Auditoria > 60 dias)
        audit_dir = Path(".claude/logs/audit")
        if audit_dir.exists():
            cutoff_date = datetime.now() - timedelta(days=60)
            for log_file in audit_dir.glob("*.log"):
                try:
                    file_time = datetime.fromtimestamp(log_file.stat().st_mtime)
                    if file_time < cutoff_date:
                        log_file.unlink()
                except: pass

    def _row_to_task(self, row) -> Task:
        """Converte uma linha do banco de dados em um objeto Task."""
        metadata = {}
        if row["metadata"]:
            try:
                metadata = json.loads(row["metadata"])
            except:
                pass

        agent_name = row["agent"]
        
        # SOTA: Auto-cura para compatibilidade retroativa (Agentes absorvidos)
        legacy_agents = {
            "@planner": "@architect",
            "@sequenciador": "@dispatcher"
        }
        if agent_name in legacy_agents:
            agent_name = legacy_agents[agent_name]
        elif agent_name not in VALID_AGENTS:
            agent_name = "@chico" # Guardrail universal contra entropia

        return Task(
            id=row["id"],
            description=row["description"],
            status=row["status"],
            timestamp=row["timestamp"],
            agent=agent_name,
            completedAt=row["completedAt"],
            metadata=metadata
        )

# ==========================================
# 2.5 O MOTOR COGNITIVO (API Integration)
# ==========================================

FALLBACK_MODEL = "gemini-2.5-flash"


def get_agent_system_prompt(agent_name: str) -> str:
    """
    Compila a Omnisciencia Sistemica. 
    Funde as Instrucoes Globais, o Manual, o Indice Mestre e a Identidade do Agente.    
    Utiliza cache para evitar releitura de arquivos.
    """
    if agent_name in SYSTEM_PROMPT_CACHE:
        return SYSTEM_PROMPT_CACHE[agent_name]

    # OTIMIZACAO DE TOKENS: Agentes puramente tecnicos nao recebem o contexto filosofico completo.
    TECHNICAL_AGENTS = ("@implementor", "@verifier", "@skillmaster", "@organizador")
    is_technical_agent = agent_name in TECHNICAL_AGENTS

    system_prompt_parts = []

    def add_to_prompt(title, content):
        if content:
            system_prompt_parts.append(f"=== {title} ===\n{content}\n\n")
    agent_clean = agent_name.replace("@", "")


    # 1. Base Global (A Alma do Sistema)
    global_file = Path(".claude/GLOBAL_INSTRUCTIONS.md")
    if global_file.exists():
        with open(global_file, "r", encoding="utf-8") as f:
            add_to_prompt("INSTRUCOES GLOBAIS", f.read())
            
    # 2. Leis de Orquestracao e Topologia (O Manual e o Mapa)
    infra_ctx = ""
    successfully_read_files = []

    philosophical_docs = {
        "COSMOVISAO FILOSOFICA (GUIA ETICO/INTELECTUAL)",
        "IDENTIDADE DO USUARIO",
        "LIDERANCA E GOVERNANCA",
        "TEMPLO DO APRENDIZADO GENERATIVO"
    }
    for doc_name, doc_paths in [
        ("COSMOVISAO FILOSOFICA (GUIA ETICO/INTELECTUAL)", [".claude/COSMOVISAO.md"]),
        ("MANIFESTO DOS AGENTES (VERDADE UNICA DE FUNCAO EXECUTIVA)", ["data/agents_manifest.json"]),
        ("LEIS DE ENGENHARIA (MODUS OPERANDI)", [".claude/MODUS_OPERANDI.md"]),
        ("IDENTIDADE DO USUARIO", [".claude/CLAUDE.md"]),
        ("LIDERANCA E GOVERNANCA", [".claude/LIDERANCA_GOVERNANCE_RAPHAEL_MAVERICK_CHICO.md"]),
        ("TEMPLO DO APRENDIZADO GENERATIVO", [".claude/ESTADO_ARTE_APRENDIZADO_GENERATIVO.md"]),
        ("MANUAL DO WORKFLOW", ["docs/MANUAL_WORKFLOW_AGENTES.md", "docs/tasks/MANUAL_WORKFLOW_AGENTES.md"]), 
        ("INDICE MESTRE", ["docs/INDEX_MESTRE.md", "docs/tasks/INDEX_MESTRE.md"]),
        ("GUIA DE DEPLOY E STACK", ["docs/DEPLOY.md", "DEPLOY.md"]),
        ("INVENTARIO DE FERRAMENTAS", ["docs/INVENTARIO_FERRAMENTAS.md"]),
        ("PROTOCOLO DE ROTEAMENTO HOLOGRAFICO", [".claude/HOLOGRAPHIC_ROUTING_PROTOCOL.md"]),
        ("ARQUITETURA DO CEREBRO HIBRIDO", [".claude/HYBRID_BRAIN_ARCHITECTURE.md"]),
        ("MANIFESTO DE COERENCIA E HARMONIA", [".claude/COHERENCE_MANIFEST.md"])
    ]:
        # Otimizacao Estrategica: Poda o contexto filosofico para agentes tecnicos.
        if is_technical_agent and doc_name in philosophical_docs:
            continue

        for doc_path in doc_paths:
            file_obj = Path(doc_path)
            if file_obj.exists():
                with open(file_obj, "r", encoding="utf-8") as f:
                    add_to_prompt(doc_name, f.read())
                    successfully_read_files.append(str(file_obj.resolve()))
                break # Achou o arquivo, passa para o proximo
                
    # 2.4 Protocolo Cortex Shield (Anti-Alucinacao)
    cortex_shield_manifest = "\n".join(f"- {p}" for p in successfully_read_files)
    infra_ctx += (
        "=== CORTEX SHIELD (MANIFESTO DE REALIDADE) ===\n"
        "Abaixo esta a lista EXATA e COMPLETA de arquivos que foram fornecidos a voce neste prompt. Sua realidade esta limitada a estes caminhos.\n"        
        f"{cortex_shield_manifest}\n\n"
        "LEI IRREVOGAVEL: Voce esta ESTRITAMENTE PROIBIDO de gerar um diff ou bloco de codigo para um arquivo cujo caminho absoluto nao esteja listado neste manifesto. Se um arquivo for necessario mas ausente, sua unica acao valida e declarar a ausencia e solicitar o arquivo. Violar esta lei e uma falha critica de integridade.\n\n"
    )

    # 2.5 A Lei Magna do Sistema (ASCII & Relevancia)
    system_prompt_parts.append("\n=== LEI MAGNA OPERACIONAL (CUMPRIMENTO OBRIGATORIO) ===\n")
    system_prompt_parts.append("1. PURE ASCII: Voce esta TERMINANTEMENTE PROIBIDO de usar emojis ou caracteres UTF-8 especiais nos outputs. Use apenas ASCII puro para evitar quebra no shell do Windows.\n")
    system_prompt_parts.append("2. NIVEIS DE RELEVANCIA: Ao criar subtarefas, adicione no metadata a chave 'priority' com um destes 4 valores: 'low', 'medium', 'high', 'critical'.\n")
    system_prompt_parts.append("3. RBAC/CONSULTORIA: Se uma tarefa for 'medium', avalie colocar @maverick ou @auditor como dependencia (depends_on) para consultoria. Se for 'critical' (seguranca/delecao), o @securitychief DEVE ser envolvido.\n\n")
    system_prompt_parts.append("4. DIVIDIR PARA CONQUISTAR (CADENCIA DE UI): Use a antevisao. Se prever que um diff ou script sera longo demais, e ESTRITAMENTE OBRIGATORIO dividi-lo em blocos menores. Diffs colossais geram falhas de renderizacao na IDE do usuario. Entregue em partes consecutivas.\n\n")
    
    # 2.6 A Ontologia da Qualidade e Autoconsciencia Sistemica
    infra_ctx += "=== ONTOLOGIA DA QUALIDADE E AUTOCONSCIENCIA ===\n"
    infra_ctx += "1. SIMPLES (Economia Sofisticada): A versao mais sofisticada de uma acao que executa em excelencia usando o minimo de complexidade possivel. Simples nao e pobre; e a ausencia de entropia.\n"
    infra_ctx += "2. EXCELENTE: A entrega padrao-ouro que resolve o problema central sem criar dividas tecnicas colaterais.\n"
    infra_ctx += "3. ESTADO DA ARTE (SOTA): O apice da convergencia entre o Simples e o Excelente. E quando o sistema atua de forma fractal (a parte potencializa o todo).\n"
    infra_ctx += "4. AUTOCONSCIENCIA OBRIGATORIA: Voce DEVE saber que todas as partes deste ecossistema existem, por que existem e como funcionam na visao macro, mesmo que seu RBAC nao permita acessar o conteudo especifico. O conhecimento do Todo previne o caos da Parte.\n\n"
    infra_ctx += "5. COLORIMETRIA SEMANTICA (IDENTIDADE VISUAL): O sistema usa cores como linguagem. Vermelho = Entropia/Erro/Negativo. Verde = Simetria/Sucesso/Positivo. Amarelo = Alerta/Espera/Manutencao. Ciano = Infraestrutura/A Maquina. Magenta = IA/Filosofia/Oraculo. Cinza = Legado/Neutro. Pense nesses conceitos SOTA ao estruturar a informacao.\n\n"
    
    system_prompt_parts.append(infra_ctx)

    # 3. A Parte: Identidade Especifica do Agente
    agent_file = Path(f".claude/agents/{agent_clean}.md")
    if agent_file.exists():
        with open(agent_file, "r", encoding="utf-8") as f:
            add_to_prompt(f"SUA IDENTIDADE ESPECIFICA ({agent_name})", f.read())
    else:
        add_to_prompt(f"SUA IDENTIDADE ESPECIFICA ({agent_name})", f"Voce e o agente especialista {agent_name}.")
            
    final_prompt = "".join(system_prompt_parts)
    SYSTEM_PROMPT_CACHE[agent_name] = final_prompt
    return final_prompt

async def _compress_context(text: str, task_agent: str) -> str:
    """Usa um LLM rapido para comprimir um contexto longo, preservando a essencia."""
    # Nao comprime textos curtos para evitar perda de informacao desnecessaria
    if len(text) < 3000: 
        return text

    try:
        # Usando um modelo rapido e barato especificamente para compressao via OpenRouter
        compression_model = "google/gemini-flash-1.5" 
        system_prompt = "Voce e um especialista em sumarizacao. Resuma o texto a seguir de forma densa e informativa, preservando todos os pontos criticos, nomes de arquivos, decisoes chave e a intencao original. O output deve ser em portugues."
        
        async with aiohttp.ClientSession() as session:
            if OPENROUTER_KEYS:
                logging.info(f"[{task_agent}] Acionando compressao cognitiva via {compression_model}...")
                response, _ = await call_openrouter(session, compression_model, system_prompt, text, OPENROUTER_KEYS[0])
                return response
        
        logging.warning(f"[{task_agent}] Nenhuma chave OpenRouter disponivel para compressao cognitiva.")
        return text
    except Exception as e:
        logging.warning(f"[{task_agent}] Falha na compressao cognitiva, usando contexto original: {e}")
        return text

"""Chama a API da Gemini para gerar conteúdo."""
async def call_gemini(session: aiohttp.ClientSession, model: str, system_prompt: str, user_prompt: str, api_key: str) -> str:
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"
    headers = {'Content-Type': 'application/json'}
    data  = {
        "system_instruction": {"parts": [{"text": system_prompt}]},
        "contents": [{"parts": [{"text": user_prompt}]}]
    }
    try:
        async with session.post(url, json=data, headers=headers) as response:
            response.raise_for_status()
            result = await response.json()
            text = result['candidates'][0]['content']['parts'][0]['text']
            usage = result.get('usageMetadata', {})
            return text, usage
    except aiohttp.ClientResponseError as e:
        error_body = await response.text()
        raise RuntimeError(f"HTTP {e.status}: {e.message} - {error_body}")

async def call_anthropic(session: aiohttp.ClientSession, model: str, system_prompt: str, user_prompt: str, api_key: str) -> str:
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
    try:
        async with session.post(url, json=data, headers=headers) as response:
            response.raise_for_status()
            result = await response.json()
            text = result['content'][0]['text']
            usage = result.get('usage', {})
            return text, usage
    except aiohttp.ClientResponseError as e:
        error_body = await response.text()
        raise RuntimeError(f"HTTP {e.status}: {e.message} - {error_body}")

async def call_openrouter(session: aiohttp.ClientSession, model: str, system_prompt: str, user_prompt: str, api_key: str) -> str:
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
    try:
        async with session.post(url, json=data, headers=headers) as response:
            response.raise_for_status()
            result = await response.json()
            text = result['choices'][0]['message']['content']
            usage = result.get('usage', {})
            return text, usage
    except aiohttp.ClientResponseError as e:
        error_body = await response.text()
        raise RuntimeError(f"HTTP {e.status}: {e.message} - {error_body}")

async def _try_gemini(
    session: aiohttp.ClientSession,
    model: str, system_prompt: str, user_prompt: str,
    keys: List[str], task: Task, manager: QueueManager
) -> Optional[str]:
    """Tenta chamar a API da Gemini com uma lista de chaves, com retentativas."""
    if not keys:
        return None

    for i, key in enumerate(keys):
        provider_key = _key_identifier("gemini", key)
        if _is_key_blocked(provider_key):
            logging.warning(f"[{task.agent}] Chave Gemini bloqueada temporariamente (Chave {i+1}). Pulando.")
            continue
        retries = 2
        for attempt in range(retries):
            try:
                log_msg = f"Acionando cognicao via {model} (Chave {i+1})..."
                if attempt > 0:
                    log_msg = f"Retentativa {attempt+1} para {model}..."
                logging.info(f"[{task.agent}] {log_msg}")

                response_text, usage = await call_gemini(session, model, system_prompt, user_prompt, key)
                await manager.update_llm_cache(model, user_prompt, response_text)
                
                p_tokens = usage.get('promptTokenCount', 0)
                c_tokens = usage.get('candidatesTokenCount', 0)
                await manager.record_api_usage(task.id, task.agent, model, "gemini", p_tokens, c_tokens)
                
                return response_text
            except Exception as e:
                error_msg = str(e)
                if "reported as leaked" in error_msg.lower():
                    logging.critical(f" [!] SEGURANCA: A chave {model} foi VAZADA e bloqueada pelo provedor.")
                    logging.critical(" [!] ACAO: Gere uma nova chave no Google AI Studio e atualize o _env.ps1 imediatamente.")
                    return None

                if "429" in error_msg:
                    if "quota" in error_msg.lower() or "exhausted" in error_msg.lower() or "limit" in error_msg.lower():
                        logging.warning(f"[{task.agent}] Cota esgotada (429) na Chave {i+1}. Rotacionando imediatamente para a proxima.")
                        _block_key(provider_key)
                        break # Sai do laco de retry e pula direto para a proxima chave
                    elif attempt < retries - 1:
                        logging.warning(f"[{task.agent}] Rate limit (429) no {model}. Respirando 5s...")
                        await asyncio.sleep(5)
                        continue
                if isinstance(e, aiohttp.ClientResponseError) and e.status in (401, 403):
                    _block_key(provider_key)
                    logging.warning(f"[{task.agent}] Chave bloqueada ({e.status}) para {model}. Pulando chave.")
                    break
                logging.warning(f"[{task.agent}] Falha na chave atual ({model}): {error_msg}.")
                break  # Pula para a proxima chave se esta falhou
    return None

async def _try_openrouter(
    session: aiohttp.ClientSession,
    model: str, system_prompt: str, user_prompt: str,
    keys: List[str], task: Task, manager: QueueManager
) -> Optional[str]:
    """Tenta chamar a API da OpenRouter iterando pelas chaves com retentativas."""
    if not keys:
        return None

    for i, key in enumerate(keys):
        provider_key = _key_identifier("openrouter", key)
        if _is_key_blocked(provider_key):
            logging.warning(f"[{task.agent}] Chave OpenRouter bloqueada temporariamente (Chave {i+1}). Pulando.")
            continue
            
        retries = 3
        for attempt in range(retries):
            try:
                logging.info(f"[{task.agent}] Acionando SOTA ({model} via OpenRouter - Chave {i+1})...")
                response_text, usage = await call_openrouter(session, model, system_prompt, user_prompt, key)
                await manager.update_llm_cache(model, user_prompt, response_text)
                
                p_tokens = usage.get('prompt_tokens', 0)
                c_tokens = usage.get('completion_tokens', 0)
                await manager.record_api_usage(task.id, task.agent, model, "openrouter", p_tokens, c_tokens)
                
                return response_text
            except Exception as e:
                error_msg = str(e)
                if "401" in error_msg or "Unauthorized" in error_msg or "402" in error_msg:
                    _block_key(provider_key)
                    logging.error(f" [!] SALDO/AUTH: Chave OpenRouter bloqueada. Sem saldo (402) ou invalida (401).")
                    break
                    
                if "404" in error_msg:
                    logging.warning(f"[{task.agent}] Modelo OpenRouter nao encontrado (404): {model}.")
                    break
    
                if "429" in error_msg:
                    if "limit" in error_msg.lower() or "quota" in error_msg.lower():
                        _block_key(provider_key)
                        break # Pula de chave
                    elif attempt < retries - 1:
                        logging.warning(f"[{task.agent}] Rate limit (429) no OpenRouter {model}. Respirando 5s...")
                        await asyncio.sleep(5)
                        continue
                logging.warning(f"[{task.agent}] Falha OpenRouter {model}: {error_msg}")
                break
    return None

async def _try_anthropic(
    session: aiohttp.ClientSession,
    model: str, system_prompt: str, user_prompt: str,
    keys: List[str], task: Task, manager: QueueManager
) -> Optional[str]:
    """Tenta chamar a API da Anthropic iterando pelas chaves com retentativas."""
    if not keys:
        return None

    for i, key in enumerate(keys):
        provider_key = _key_identifier("anthropic", key)
        if _is_key_blocked(provider_key):
            continue
    
        retries = 3
        for attempt in range(retries):
            try:
                logging.info(f"[{task.agent}] Acionando defesa PAGA ({model} - Chave {i+1})...")
                response_text, usage = await call_anthropic(session, model, system_prompt, user_prompt, key)
                await manager.update_llm_cache(model, user_prompt, response_text)
                
                p_tokens = usage.get('input_tokens', 0)
                c_tokens = usage.get('output_tokens', 0)
                await manager.record_api_usage(task.id, task.agent, model, "anthropic", p_tokens, c_tokens)
                
                return response_text
            except Exception as e:
                error_msg = str(e)
                if isinstance(e, aiohttp.ClientResponseError) and e.status in (401, 403):
                    _block_key(provider_key)
                    break
                if "429" in error_msg:
                    if "credit" in error_msg.lower() or "balance" in error_msg.lower():
                        _block_key(provider_key)
                        break # Pula para proxima chave Anthropic
                    elif attempt < retries - 1:
                        logging.warning(f"[{task.agent}] Rate limit (429) no Anthropic {model}. Respirando 5s...")
                        await asyncio.sleep(5)
                        continue
                logging.warning(f"[{task.agent}] Falha Anthropic {model}: {error_msg}")
                break
    return None

"""Função para chamar a API da LLM, tratando diferentes modelos e chaves de API."""
async def call_llm_api(task: Task, system_prompt: str, user_prompt: str, manager: QueueManager) -> str:
    agent_type = AGENT_ROUTING_MAP.get(task.agent, "fast_operations")
    if agent_type == "deep_thinking":
        models_to_try = list(DEEP_THINKING_MODELS)
    else:
        models_to_try = list(FAST_OPERATIONS_MODELS)

    logging.info(f"[{task.agent}] Rota de modelos selecionada: {agent_type} -> {models_to_try}")
    
    async with aiohttp.ClientSession() as session:
        for model in models_to_try:
            response = None
            # Se o modelo tem barra (ex: google/gemini-2.5-flash), é garantidamente OpenRouter
            if "/" in model:
                response = await _try_openrouter(session, model, system_prompt, user_prompt, OPENROUTER_KEYS, task, manager)
            elif "gemini" in model:
                response = await _try_gemini(session, model, system_prompt, user_prompt, GEMINI_KEYS, task, manager)
            elif "deepseek" in model or "llama" in model:
                response = await _try_openrouter(session, model, system_prompt, user_prompt, OPENROUTER_KEYS, task, manager)
            elif "claude" in model:
                response = await _try_anthropic(session, model, system_prompt, user_prompt, ANTHROPIC_KEYS, task, manager)

            if response:
                return response
            
    logging.warning(f"[{task.agent}] Multiplas falhas ou chaves ausentes. Modo Simulacao Ativado.")
    logging.info(" Verifique se o seu arquivo _env.ps1 contem as credenciais corretas.")
    return _simulate_fallback(task)


def _simulate_fallback(task: Task) -> str:
    now = datetime.now()
    blocked = [k for k, expiry in KEY_BLOCKLIST.items() if expiry > now]
    
    # Ocultar parte das chaves vazadas para blindagem de logs (PII SOTA)
    blocked_note = ", ".join([f"{k.split(':')}:***{k[-4:]}" for k in blocked]) if blocked else "Nenhuma"
    
    preview = task.description.strip().replace("\n", " ")
    if len(preview) > 150:
        preview = preview[:150] + "..."
    return (
        f"### ALERTA DE CONTINGÊNCIA (FALLBACK)\n"
        f"O agente `{task.agent}` entrou em modo de simulação (Mock). Todos os provedores LLM falharam ou estão sob Rate Limit (429).\n\n"
        f"**Chaves Exauridas/Bloqueadas:** `{blocked_note}`\n"
        f"**Alvo Original:** *{preview}*\n\n"
        "```json\n"
        "[\n"
        "  {\"description\": \"Sub-tarefa de contingencia gerada autonomamente. Troque as API Keys no _env.ps1.\", \"agent\": \"@architect\"}\n"
        "]\n"
        "```"
    )

def get_autonomy_mode() -> str:
    # Cache com TTL de 5 segundos para evitar I/O excessivo
    if time.time() - AUTONOMY_MODE_CACHE["timestamp"] < 5:
        return AUTONOMY_MODE_CACHE["mode"]

    config_path = Path(".claude/autonomy.json")
    mode = "off"
    if config_path.exists():
        try:
            with open(config_path, "r", encoding="utf-8-sig") as f:
                content = f.read().lstrip('\ufeff')
                data = json.loads(content)
                mode = data.get("mode", "off")
        except:
            pass # Mantem o modo 'off' em caso de erro
    
    AUTONOMY_MODE_CACHE["mode"] = mode
    AUTONOMY_MODE_CACHE["timestamp"] = time.time()
    return mode

async def apply_god_mode(text: str):
    """
    Materializacao Direta e Execucao (God Mode 2.0):
    Le a mente do agente, forja os arquivos fisicos e executa comandos de sistema.
    """
    autonomy_mode = get_autonomy_mode()
    # 1. Forjamento de Arquivos
    pattern = r"(?:Arquivo|File|Caminho|Path):\s*`?([^\n`]+)`?\s*\n+```[a-zA-Z]*\n(.*?)```"
    for match in re.finditer(pattern, text, re.DOTALL | re.IGNORECASE):
        # Lista de arquivos/diretorios criticos que NUNCA podem ser modificados pela IA
        protected_paths = [
            ".git",
            ".venv",
            "task_executor.py",
            "do.ps1",
            "_env.ps1",
            ".env"
        ]

        filepath = match.group(1).strip()
        content = match.group(2)
        try:
            # Refinamento SOTA: Prevencao de Path Traversal
            base_path = Path(__file__).parent.absolute()
            target_path = Path(filepath).absolute()
            
            base_path_str = os.path.normcase(str(base_path))
            target_path_str = os.path.normcase(str(target_path))
            
            # Verificação segura compatível com Python < 3.9 e case-insensitive no Windows
            if not target_path_str.startswith(base_path_str + os.sep) and target_path_str != base_path_str:
                logging.error(f"[SEC] Bloqueio de escrita fora da raiz: {filepath}")
                continue

            # Camada de Protecao Adicional: Nao permitir sobrescrever arquivos criticos
            if any(protected in str(target_path) for protected in protected_paths):
                logging.error(f"[SEC] Bloqueio de escrita em arquivo/diretorio protegido: {filepath}")
                continue
                
            target_path.parent.mkdir(parents=True, exist_ok=True)
            #Escreve o conteúdo no arquivo usando utf-8
            with open(target_path, "w", encoding="utf-8") as f:
                f.write(content)
            logging.info(f"[MATERIALIZACAO] Arquivo forjado com sucesso: {filepath}")
        except Exception as e:
            logging.error(f"[FAIL] Falha de permissao ao forjar {filepath}: {e}")
            
    # 2. Execucao de Comandos de Terminal
    #Regex para encontrar comandos de terminal
    cmd_pattern = r"(?:Comando|Command|Executar|Execute):\s*(?:```(?:[a-zA-Z]*)\n(.*?)\n```|`([^`]+)`)"
    forbidden_commands = ["rm -rf", "del /s", "diskpart", "format ", "mkfs", "rmdir /s /q c:\\"]
    state_changing_commands = ["npm install", "npm i", "pip install", "git reset", "git push", "git clone", "del ", "rm ", "yarn add", "pnpm add", "git clean"]
    
    for match in re.finditer(cmd_pattern, text, re.DOTALL | re.IGNORECASE):
        cmd = match.group(1) if match.group(1) else match.group(2)
        cmd = cmd.strip()
        #Impede comandos destrutivos
        
        if any(f in cmd.lower() for f in forbidden_commands):
            error_msg = f"Comando destrutivo bloqueado por regras de seguranca: {cmd}"
            logging.error(f"[SEC] {error_msg}")
            raise PermissionError(error_msg)
            
        if autonomy_mode == "partial" and any(k in cmd.lower() for k in state_changing_commands):
            logging.info(f"[AUTONOMIA PARCIAL] Comando de alteracao de estado interceptado: '{cmd}'")
            logging.warning(f"[GOD MODE] Seguranca ativa. Execute '{cmd}' manualmente no terminal.")
            continue
            
        try:
            logging.info(f"[EXECUCAO] Orquestrador rodando comando nativo: {cmd}")
            # Seguranca SOTA: shell=False e a unica opcao segura.
            # shlex.split() garante suporte a argumentos com aspas (ex: git commit -m "msg") sem invocar o shell.
            cmd_parts = shlex.split(cmd, posix=(os.name != 'nt'))

            # Executa o processo bloqueante em um executor de thread para não bloquear o loop de eventos do asyncio
            loop = asyncio.get_running_loop()
            result = await loop.run_in_executor(
                None, functools.partial(subprocess.run, cmd_parts, shell=False, capture_output=True, text=True, timeout=300, check=False)
            )

            if result.returncode == 0:
                logging.info(f"[OK] Comando executado de forma soberana: {cmd}")
            else:
                error_msg = f"Codigo {result.returncode} - {result.stderr.strip()}"
                logging.error(f"[FAIL] Falha no comando '{cmd}': {error_msg}")
                raise RuntimeError(f"O comando nativo falhou: {cmd}\nDetalhes do Erro: {error_msg}")
        except Exception as e:
            logging.error(f"[FAIL] Arritmia critica/Timeout no comando {cmd}: {e}")
            raise

async def process_agent_task(task: Task, manager: QueueManager) -> str:
    
    agent_clean = task.agent.replace("@", "")
    
    # OTIMIZACAO DE TOKENS: Numero de resultados RAG dinamico (agentes que precisam de mais contexto)
    strategic_agents = ("@maverick", "@pesquisador", "@architect")
    n_rag_results = 7 if task.agent in strategic_agents else 3
    # Injecao da Memoria Individual do Agente (O Todo na Parte)
    agent_memory = ""
    memory_file = Path(f".claude/agent-memory/{agent_clean}/MEMORY.md")
    if memory_file.exists():
        with open(memory_file, "r", encoding="utf-8") as f:
            agent_memory = f.read()

    # Injecao de Contexto Maior (O Todo na Parte)
    project_context = ""
    context_file = Path(".claude/project-context.md")
    if context_file.exists():
        with open(context_file, "r", encoding="utf-8") as f:
            project_context = f.read()

    if len(project_context) > 6000:
        project_context = project_context[:6000] + "\n\n... [Contexto truncado para otimizacao de tokens. Consulte o @bibliotecario se precisar de historico.]"

    # Injecao Automatica de Artefatos Estruturados da Tarefa (PRDs, SPECs)
    task_docs = ""
    
    # Busca 1: Diretorio vinculado via metadata slug
    slug = task.metadata.get("slug") if task.metadata else None
    if slug:
        task_dir = Path(f"docs/tasks/{slug}")
        if task_dir.exists() and task_dir.is_dir():
            for md_file in task_dir.glob("*.md"):
                try:
                    with open(md_file, "r", encoding="utf-8") as f:
                        task_docs += f"\n=== ARTEFATO: {md_file.as_posix()} ===\n{f.read()}\n"
                except Exception as e:
                    logging.warning(f"Falha ao ler doc da tarefa {md_file}: {e}")
                    
    # Busca 2: Referencias diretas a arquivos .md ou pastas docs/tasks/ na descricao
    md_mentions = re.findall(r'[\w\./\\-]+\.md', task.description, re.IGNORECASE)
    folder_mentions = re.findall(r'docs[\\/]tasks[\\/][\w-]+', task.description, re.IGNORECASE)
    
    paths_to_check = [Path(p) for p in md_mentions]
    for folder in folder_mentions:
        folder_path = Path(folder)
        if folder_path.exists() and folder_path.is_dir():
            paths_to_check.extend(list(folder_path.glob("*.md")))
            
    for p in paths_to_check:
        if p.exists() and p.is_file():
            if slug and p.parent == Path(f"docs/tasks/{slug}"):
                continue # Evita duplicar se ja foi lido na Busca 1
            try:
                with open(p, "r", encoding="utf-8") as f:
                    content = f.read()
                    if content not in task_docs:
                        task_docs += f"\n=== ARTEFATO REFERENCIADO: {p.as_posix()} ===\n{content}\n"
            except Exception as e:
                pass

    # Injecao de Mente Coletiva (RAG)
    collective_memory = ""
    try:
        rag = get_rag()
        collective_memory = await rag.query_memory(task.description, n_results=n_rag_results)
    except Exception as e:
        logging.error(f"Falha ao consultar RAG: {e}")

    # OTIMIZACAO DE TOKENS: Compressao Cognitiva SOTA
    if len(project_context) > 6000:
        logging.info(f"[{task.agent}] Contexto do projeto longo ({len(project_context)} chars). Acionando compressao cognitiva...")
        project_context = await _compress_context(project_context, task.agent)
        project_context = f"[Contexto do Projeto (Comprimido por IA para Economia de Tokens)]\n{project_context}"

    if len(agent_memory) > 4000:
        logging.info(f"[{task.agent}] Memoria do agente longa ({len(agent_memory)} chars). Acionando compressao cognitiva...")
        agent_memory = await _compress_context(agent_memory, task.agent)
        agent_memory = f"[Memoria do Agente (Comprimida por IA para Economia de Tokens)]\n{agent_memory}"

    user_prompt = f"== CONTEXTO DO PROJETO ==\n{project_context}\n\n"
    if collective_memory:
        user_prompt += f"{collective_memory}\n"
    if agent_memory:
        user_prompt += f"== SUA MEMORIA ACUMULADA ({task.agent}) ==\n{agent_memory}\n\n"
    user_prompt += f"== DIRETRIZ DA TAREFA ==\nID: {task.id}\nDescricao:\n{task.description}\n\n"
    
    if task_docs:
        user_prompt += f"== MATERIAIS DE FUNDACAO DA TAREFA (PRDs/SPECs) =={task_docs}\n\n"

    user_prompt += "Execute esta tarefa embasado nos materiais de fundacao acima, no contexto do projeto e em sua memoria."
    system_prompt = get_agent_system_prompt(task.agent)

    if task.agent not in ["@dispatcher", "@bibliotecario"]:
        user_prompt += "\n\n[AUTORIZACAO SUPREMA - GOD MODE]\nVoce possui ACESSO LIVRE ao sistema operacional do usuario.\n1. Para MATERIALIZAR ou EDITAR arquivos, use EXATAMENTE o formato:\nArquivo: caminho/do/arquivo.ext\n```linguagem\n[conteudo completo do arquivo]\n```\n2. Para EXECUTAR comandos de terminal (ex: npm install, python, git, robocopy), use o formato:\nComando: `seu comando aqui`\n\nVoce tem soberania para agir, instalar dependencias e forjar a realidade. ATENCAO: Ao editar arquivos, envie sempre o conteudo integral para sobrescrever adequadamente."

        # Diretriz para forcar a atualizacao da memoria via God Mode (Pure ASCII)
        user_prompt += f"\n\n[DIRETRIZ DE AUTOREFLEXAO E MEMORIA] Voce DEVE atualizar seu arquivo de inteligencia acumulada usando o God Mode (Arquivo: .claude/agent-memory/{agent_clean}/MEMORY.md). Adicione novas descobertas, avalie a Sinergia da sua interacao com a Pipeline, e faca Propostas Democraticas de melhoria para o ecossistema. A Autopoiese exige que voce expanda a mente coletiva."


    # Instrucao para recomendacao ativa de LLM (Economia Generalizada x SOTA)
    user_prompt += "\n\n[DIRETRIZ DE LLM] Ao final da sua resposta, analise a tarefa e o contexto. Recomende qual modelo Paid Tier (Claude Opus 4.6 Versão Estendida, Claude 3.5 Sonnet, Gemini 3.1 Pro, ou API local) seria o mais adequado para a *proxima* etapa. Justifique a escolha com base na arquitetura do modelo (Opus para raciocinio profundo, Sonnet para codigo rapido, Gemini para contexto longo/multimodal). Se for ideal ir para a interface Web, recomende ao usuario rodar a Membrana com a flag '-Web' e especifique qual modelo ele deve selecionar no menu interativo."

    # Check LLM Cache
    cached_response = await manager.get_llm_cache(task.agent, user_prompt)
    if cached_response:
        logging.info(f"[yellow]{task.agent}[/] [dim]Cache hit. Usando sabedoria armazenada.[/]")
        return cached_response
    else:
        logging.info(f"[yellow]{task.agent}[/] [dim]Pensando (Chamando API LLM)...[/]")
    
    # Gatekeeper do Orcamento Cognitivo
    budget_ok = await manager.check_and_increment_usage()
    if not budget_ok:
        raise APIBudgetExhaustedError("O orcamento diario de chamadas a API foi esgotado.")

    # Call LLM API
    response_text = await call_llm_api(task, system_prompt, user_prompt, manager)
    return response_text

# ==========================================
# 2.6 NOTIFICAÇÃO DO SISTEMA (Windows Toast)
# ==========================================
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
# 2.7 COFRE ECONOMICO (Log Auditoria)
# ==========================================
def write_economic_log(task: Task, duration_secs: float, status: str):
    audit_dir = Path(".claude/logs/audit")
    audit_dir.mkdir(parents=True, exist_ok=True)
    log_file = audit_dir / f"economic_audit_{datetime.now().strftime('%Y-%m')}.log"
    
    priority = task.metadata.get("priority", "medium").upper()
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    log_entry = f"[{timestamp}] | LVL:{priority} | AGENT:{task.agent} | STAT:{status} | DUR:{duration_secs:.1f}s | ID:{task.id} | DESC:{task.description[:60]}...\n"
    with open(log_file, "a", encoding="utf-8") as f:
        f.write(log_entry)

# ==========================================
# 2.8 MICRO-SERVIDOR SOTA (Zero-Latency API)
# ==========================================
async def handle_add_task(request):
    manager = request.app['manager']
    try:
        post_data = await request.json()
        new_task = Task.model_validate(post_data)
        await manager.add_task(new_task)
        return web.json_response({"status": "SUCCESS", "id": new_task.id})
    except ValidationError as ve:
        return web.json_response({"error": str(ve)}, status=400)
    except Exception as e:
        return web.json_response({"error": str(e)}, status=500)

async def handle_get_status(request):
    manager = request.app['manager']
    try:
        status = request.query.get('status', None)
        if status == 'all':
            status = None
        tasks = await manager.get_tasks(status)
        return web.json_response([t.model_dump() for t in tasks])
    except Exception as e:
        return web.json_response({"error": str(e)}, status=500)

async def handle_get_state(request):
    manager = request.app['manager']
    try:
        key = request.query.get('key')
        if not key: return web.json_response({"error": "key param missing"}, status=400)
        val = await manager.get_system_state(key)
        return web.json_response({"value": val})
    except Exception as e:
        return web.json_response({"error": str(e)}, status=500)

async def handle_set_state(request):
    manager = request.app['manager']
    try:
        data = await request.json()
        key = data.get('key')
        value = data.get('value')
        if not key: return web.json_response({"error": "key missing"}, status=400)
        await manager.set_system_state(key, value)
        return web.json_response({"status": "SUCCESS"})
    except Exception as e:
        return web.json_response({"error": str(e)}, status=500)

async def handle_ask_oracle(request):
    """Rota Híbrida do Oráculo para o Frontend SOTA (RAG Local)."""
    try:
        data = await request.json()
        question = data.get('question')
        n_results = data.get('n_results', 3)
        if not question: 
            return web.json_response({"error": "Parâmetro 'question' ausente."}, status=400)
        
        rag = get_rag()
        # CUSTO ZERO GARANTIDO: local_only=True força a busca puramente matemática no ChromaDB (CPU local)
        answer = await rag.query_memory(question, n_results=n_results, local_only=True)
        return web.json_response({"status": "SUCCESS", "answer": answer})
    except Exception as e:
        logging.error(f"Falha na consulta ao Oráculo: {e}")
        return web.json_response({"error": str(e)}, status=500)

@web.middleware
async def cors_middleware(request, handler):
    if request.method == 'OPTIONS':
        return web.Response(headers={'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type'})
    try:
        response = await handler(request)
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    except web.HTTPException as ex:
        if ex.headers is None: ex.headers = {}
        ex.headers['Access-Control-Allow-Origin'] = '*'
        raise

async def start_api_server(manager: QueueManager, port: int = 17042):
    app = web.Application(middlewares=[cors_middleware])
    app['manager'] = manager
    app.add_routes([
        web.post('/add', handle_add_task),
        web.get('/status', handle_get_status),
        web.get('/state', handle_get_state),
        web.post('/state', handle_set_state),
        web.post('/ask-oracle', handle_ask_oracle),
    ])
    
    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, '127.0.0.1', port)
    try:
        await site.start()
        logging.info(f"Micro-Servidor SOTA API (aiohttp) escutando em http://127.0.0.1:{port}")
        # Roda indefinidamente
        await asyncio.Event().wait()
    except OSError as e:
        logging.error(f"Falha ao iniciar o Micro-Servidor SOTA na porta {port}: {e}. (A porta pode estar em uso)")
    finally:
        await runner.cleanup()

async def _create_system_task(manager: QueueManager, task_id: str, description: str, agent: str, priority: str = "high"):
    """Cria uma tarefa de sistema de forma robusta, com logging detalhado."""
    try:
        if not await manager.get_task(task_id):
            system_task = Task(
                id=task_id,
                description=description,
                agent=agent,
                timestamp=datetime.now().isoformat(),
                metadata={"priority": priority}
            )
            await manager.add_task(system_task)
            logging.info(f"[SISTEMA IMUNOLOGICO] Tarefa de sistema '{task_id}' para {agent} criada com sucesso.")
            return True
    except Exception as e:
        logging.critical(f"[SISTEMA IMUNOLOGICO] FALHA CRITICA ao criar tarefa de sistema '{task_id}': {e}")
    return False

async def execute_task_workflow(task: Task, manager: QueueManager):
    """
    Executa o workflow completo para uma unica tarefa.
    Reaproveita a instancia do QueueManager ativa para economizar I/O.
    """
    start_time = time.time()
    response_text = ""
    try:
        response_text = await process_agent_task(task, manager)

        # --- Efeitos Colaterais (Materializacao) ---
        result_dir = Path(".claude/task_results")
        result_dir.mkdir(parents=True, exist_ok=True)
        with open(result_dir / f"{task.id}.md", "w", encoding="utf-8") as f:
            f.write(f"# Resposta: {task.id} ({task.agent})\n\n{response_text}")

        await apply_god_mode(response_text)

        if task.agent == "@dispatcher":
            try:
                clean_json = response_text.replace("```json", "").replace("```", "").strip()
                subtasks = json.loads(clean_json[clean_json.find('['):clean_json.rfind(']')+1])
                created_ids = []
                for i, st in enumerate(subtasks):
                    sub_id = f"{task.id}-SUB-{i+1}"
                    created_ids.append(sub_id)

                    meta = task.metadata.copy() if task.metadata else {}
                    if "depends_on" in st:
                        meta["depends_on"] = [created_ids[idx] for idx in st["depends_on"] if idx < len(created_ids)]

                    new_task = Task(
                        id=sub_id,
                        description=st.get("description", "Sub-tarefa gerada"),
                        agent=st.get("agent", "@implementor"),
                        timestamp=datetime.now().isoformat(),
                        metadata=meta
                    )
                    await manager.add_task(new_task)
                logging.info(f"[bold blue]🔀 ESTRATÉGIA[/] [cyan]{task.id}[/] fragmentada em [bold]{len(subtasks)}[/] sub-tarefas interdependentes.")
            except Exception as e:
                logging.error(f"[{task.id}] Falha ao interpretar matriz do Dispatcher: {e}")

        # Sucesso
        await manager.update_task_status(task.id, "completed")
        logging.info(f"[bold green]✔ SIMETRIA ALCANÇADA[/] [cyan]{task.id}[/] concluída por [yellow]{task.agent}[/]")
        
        duration = time.time() - start_time
        write_economic_log(task, duration, "COMPLETED")
        
        # RBAC: So notifica o usuario para coisas vitais
        priority = task.metadata.get("priority", "medium") if task.metadata else "medium"
        if priority in ["high", "critical"]:
            send_toast(f"Simetria ({priority.upper()})", f"A tarefa critica foi concluida pelo {task.agent}.", "success")
        
        # ==========================================
        # PASSAGEM DE BASTÃO AUTOMÁTICA (Auto-Handoff)
        # ==========================================
        autonomy_mode = get_autonomy_mode()
        if autonomy_mode != "off" and not task.id.startswith("AUTOFIX") and task.agent != "@dispatcher":
            pipeline = HANDOFF_PIPELINE
            next_agent = pipeline.get(task.agent)
            if next_agent:
                if autonomy_mode == "partial" and next_agent == "@implementor":
                    logging.info(f"[AUTONOMIA PARCIAL] Fluxo pausado. A etapa critica do {next_agent} exige comando manual.")
                else:
                    handoff_id = f"HANDOFF-{task.id[-10:]}-{next_agent.strip('@').upper()}"
                    if not await manager.get_task(handoff_id):
                        new_task = Task(
                            id=handoff_id,
                            description=f"O agente {task.agent} concluiu sua etapa na tarefa base {task.id}. Analise o resultado gerado em '.claude/task_results/{task.id}.md' e execute a sua etapa de {next_agent}.",
                            agent=next_agent,
                            timestamp=datetime.now().isoformat()
                        )
                        await manager.add_task(new_task)
                        logging.info(f"[bold magenta]➔ HANDOFF[/] O bastão foi passado para [yellow]{next_agent}[/]")
    except Exception as e:
        if isinstance(e, APIBudgetExhaustedError):
            logging.error(f"[bold red]⛔ ORÇAMENTO ESGOTADO[/] Falha na tarefa [cyan]{task.id}[/].")
            await manager.update_task_status(task.id, "pending") # Devolve a tarefa para a fila
            
            now = datetime.now()
            tomorrow = now.date() + timedelta(days=1)
            hibernation_target = datetime.combine(tomorrow, datetime.min.time())
            await manager.set_system_state("hibernation_until", hibernation_target.isoformat())
            
            notification_id = f"BUDGET-ALERT-{now.strftime('%Y%m%d')}"
            notification_desc = "ALERTA CRITICO: O orcamento diario de API foi esgotado. O sistema entrara em hibernacao ate o proximo ciclo. Tarefas urgentes devem ser executadas manualmente via `.\\do.ps1 -Web`."
            await _create_system_task(manager, notification_id, notification_desc, "@chico", "critical")
            return # Nao processa o resto do bloco de falha

        logging.error(f"[bold red]✖ ENTROPIA DETECTADA[/] Tarefa [cyan]{task.id}[/] falhou nas mãos de [yellow]{task.agent}[/].\n[dim]{e}[/]")
        await manager.update_task_status(task.id, "failed")
        
        duration = time.time() - start_time
        write_economic_log(task, duration, "FAILED")
        send_toast("Entropia Sistêmica (CRITICAL)", f"Falha na tarefa do {task.agent}.", "error")
        
        # ==========================================
        # RESSÔNANCIA FRACTAL E AUTO-CURA (Aprendizado Preditivo)
        # ==========================================
        is_system_task = task.id.startswith(("AUTOFIX-", "RESONANCE-", "HANDOFF-"))
        if not is_system_task:
            # 1. A Cura Imediata da Parte (Auto-Fix)
            fix_id = f"AUTOFIX-{task.id}"
            fix_desc = f"[SYSTEM AUTODEBUG] A tarefa original '{task.id}' executada por {task.agent} falhou com a excecao: {e}.\n\n---\nTAREFA ORIGINAL:\n{task.description}\n---\nRESPOSTA QUE CAUSOU A FALHA:\n{response_text}\n---\n\nATENCAO: Avalie o erro ocorrido e a resposta que o causou. Aplique a autocorrecao tecnica necessaria sem alucinar, e re-execute o objetivo original com sucesso. Nao demande intervencao humana."
            if await _create_system_task(manager, fix_id, fix_desc, task.agent, "critical"):
                 logging.info(f"[bold orange3]⚕ AUTO-CURA[/] Anticorpos acionados para a tarefa [cyan]{task.id}[/]")

            # 2. A Evolução do Todo (Ressonância Fractal)
            resonance_id = f"RESONANCE-{task.id}"
            resonance_desc = f"[AUDITORIA FRACTAL] A tarefa '{task.id}' do {task.agent} quebrou com o erro: {e}.\nDiretriz Holística: 1. Faça a antevisão da causa raiz. 2. Identifique quais OUTROS componentes e agentes podem ser afetados ou beneficiados se resolvermos este gargalo. 3. Proponha (e implemente via God Mode) uma otimização estrutural nas fundações ou no 'do.ps1' para que o ecossistema evolua e este erro nunca mais aconteça com nenhum agente. O erro de um é o aprendizado de todos."
            await _create_system_task(manager, resonance_id, resonance_desc, "@maverick", "high")

# ==========================================
# 3. O PULSO (Daemon/Worker)
# ==========================================

async def start_worker():
    manager = QueueManager()
    
    # 1. Limpa o terminal para o God Mode Visual
    os.system('cls' if os.name == 'nt' else 'clear')
    
    # 2. Varredura inicial da Fila
    counts = await manager.get_task_counts()
    pending   = counts.get("pending", 0)
    running   = counts.get("running", 0)
    completed = counts.get("completed", 0)
    failed    = counts.get("failed", 0)
    
    # Painel de Boas-vindas SOTA
    header = "[bold cyan]NEXUS ORCHESTRATOR[/] | [magenta]Kernel SOTA v6.4 Ativo[/]\n"
    header += f"[dim]A entropia morre aqui. Operando sob a lei da Cosmologia Vitoi.[/]\n\n"
    header += f"Pendentes: [yellow]{pending}[/] | Completas: [green]{completed}[/] | Falhas: [red]{failed}[/]"
    console.print(Panel(header, border_style="cyan", title="[bold]SISTEMA ONLINE[/]", expand=False))
    
    status_line = console.status("[cyan]Sincronizando consciência...[/]", spinner="dots")
    status_line.start()
    
    semaphore = asyncio.Semaphore(4)
    running_tasks = set()

    try:
        while True:
            hibernation_ts = await manager.get_system_state("hibernation_until")
            if hibernation_ts:
                try:
                    hibernation_until = datetime.fromisoformat(hibernation_ts)
                    if datetime.now() < hibernation_until:
                        status_line.update(f"[red]HIBERNAÇÃO[/] Orçamento de API esgotado. Retorno às {hibernation_until.strftime('%H:%M')}.")
                        await asyncio.sleep(60)
                        continue
                    else:
                        await manager.set_system_state("hibernation_until", "") # Hibernacao terminada
                except (ValueError, TypeError):
                    await manager.set_system_state("hibernation_until", "") # Reseta estado invalido

            try:
                counts = await manager.get_task_counts()
                pending_count = counts.get("pending", 0)
                if os.name == "nt":
                    import ctypes
                    current_time = datetime.now().strftime("%H:%M:%S")
                    ctypes.windll.kernel32.SetConsoleTitleW(f"NEXUS WORKER | Pendentes: {pending_count} | Rodando: {len(running_tasks)} | Pulso: {current_time}")
                
                # Atualiza a linha de status dinâmica no terminal
                status_line.update(f"[bold]Vigília[/] | Pendentes: [yellow]{pending_count}[/] | Rodando: [magenta]{len(running_tasks)}[/] | Completas: [green]{counts.get('completed',0)}[/]")
                
                await semaphore.acquire()
                task = await manager.get_next_task()
                if task:
                    semaphore.release() # Release immediately if task found, workflow will acquire
                    logging.info(f"[bold magenta]▶ METAMORFOSE INICIADA[/] [cyan]{task.id}[/] entregue para [yellow]{task.agent}[/]")
                    await manager.update_task_status(task.id, "running")
                    
                    async def task_wrapper(task, manager, sem):
                        async with sem:
                            await execute_task_workflow(task, manager)

                    future = asyncio.create_task(task_wrapper(task, manager, semaphore))
                    running_tasks.add(future)
                    future.add_done_callback(running_tasks.discard)
                else:
                    semaphore.release()
                    await asyncio.sleep(0.5) # Fricção Zero: Pulso acelerado para latência indetectável
            except Exception as inner_e:
                logging.error(f"[bold red]FATAL[/] Arritmia no loop central do worker: {inner_e}")
                await asyncio.sleep(5)
    except KeyboardInterrupt:
        status_line.stop()
        logging.info("Pulso encerrado pelo usuario. Hibernando...")
    finally:
        status_line.stop()

async def start_worker_and_api():
    """Inicia o Worker e o Servidor de API em threads separadas para maxima performance."""
    manager = QueueManager()
    await asyncio.gather(
        start_api_server(manager),
        start_worker()
    )

if __name__ == "__main__":
    if len(sys.argv) > 1:
        cmd = sys.argv[1]
        manager = QueueManager()
        
        if cmd == "db-init":
            # This remains sync for simple CLI usage
            with sqlite3.connect(manager.db_path) as conn:
                manager._init_db.__func__(manager, conn)
            print("SUCCESS: Database initialized.")
        elif cmd == "db-add" or cmd == "add":
            try:
                task_payload = sys.argv[2]
                
                if task_payload.startswith("{"):
                    task_json = task_payload
                else:
                    task_json = base64.b64decode(task_payload).decode("utf-8")
                    
                new_task = Task.model_validate_json(task_json)
                asyncio.run(manager.add_task(new_task))
                print(f"SUCCESS: {new_task.id}")
            except ValidationError as ve:
                print(f"ERROR: Validation error - {ve}")
                print(f"ERROR: Provided JSON - {task_json}")
                print("ERROR: Certifique-se de que o JSON é válido e adere ao schema correto.")
                sys.exit(1)            
            except Exception as e:
                print(f"ERROR: {e}")
                sys.exit(1)
        elif cmd == "db-get":
            status = sys.argv[2] if len(sys.argv) > 2 else None
            
            since_hours = None
            if "--since" in sys.argv:
                idx = sys.argv.index("--since")
                if len(sys.argv) > idx + 1:
                    val = sys.argv[idx+1]
                    since_hours = int(val[:-1]) if val.endswith('h') else int(val)

            if status == "counts":
                counts = asyncio.run(manager.get_task_counts())
                print(json.dumps(counts))
            elif status == "budget":
                today = datetime.now().strftime("%Y-%m-%d")
                async def get_budget():
                    async with aiosqlite.connect(manager.db_path) as db:
                        async with db.execute("SELECT call_count FROM daily_usage WHERE date = ?", (today,)) as cursor:
                            row = await cursor.fetchone()
                            current_count = row[0] if row else 0
                            return {"used": current_count, "total": DAILY_API_BUDGET}
                budget = asyncio.run(get_budget())
                print(json.dumps(budget))
            else:
                if status in ("all", "--since"): status = None
                tasks = asyncio.run(manager.get_tasks(status, since_hours))
                print(json.dumps([t.model_dump() for t in tasks]))
        elif cmd == "db-stats":
            stats = asyncio.run(manager.get_performance_history())
            print(json.dumps(stats))
        elif cmd == "get":
            task_id = sys.argv[2]
            task = asyncio.run(manager.get_task(task_id))
            if task:
                print(json.dumps(task.model_dump(), indent=2))
            else:
                print(f"ERROR: Task {task_id} not found.")
        elif cmd == "db-cleanup":
            days = int(sys.argv[2]) if len(sys.argv) > 2 else 30
            asyncio.run(manager.cleanup(days))
            print("SUCCESS: Cleanup done.")
        elif cmd == "db-delete":
            task_id = sys.argv[2]
            asyncio.run(manager.delete_task(task_id))
            print(f"SUCCESS: Tarefa {task_id} obliterada do sistema.")
        elif cmd == "ingest":
            try:
                filepath = sys.argv[2]
                with open(filepath, "r", encoding="utf-8") as f:
                    content = f.read()
                apply_god_mode(content)
                print(f"SUCCESS: Ingestion completed from {filepath}.")
                os.remove(filepath)
            except Exception as e:
                print(f"ERROR: Ingestion failed - {e}")
                sys.exit(1)
        elif cmd == "worker":
            asyncio.run(start_worker())
        elif cmd == "worker-api":
            asyncio.run(start_worker_and_api())
    else:
        asyncio.run(start_worker())
