# Arquivo de Configuracao Global do Ecossistema de Agentes
# Use `.` para carregar no escopo do seu script: . ./_env.ps1

if ($null -ne $Global:AgentPaths) { return }

# 1. Caminhos Criticos (Cerebro do Sistema)
$Global:AgentPaths = @{
    Root        = $PSScriptRoot
    Queue       = Join-Path $PSScriptRoot "queue\tasks.json"
    Archive     = Join-Path $PSScriptRoot "logs\tasks_archived.json"
    Log         = Join-Path $PSScriptRoot "logs\task_log.md"
    Kernel      = Join-Path $PSScriptRoot "Agent-TaskManager.psm1"
    Autopoiesis = Join-Path $PSScriptRoot "Agent-Autopoiesis.psm1"
    Memory      = Join-Path $PSScriptRoot ".claude\agent-memory"
    Docs        = Join-Path $PSScriptRoot "docs"
    Data        = Join-Path $PSScriptRoot "data"
    Scripts     = Join-Path $PSScriptRoot "scripts"
    Frontend    = Join-Path $PSScriptRoot "frontend"
}

# 2. Configuracao do Organismo Vivo (Autopoiese)
$Global:AutopoiesisConfig = @{
    # Lista de agentes que participam do pulso de vida principal (Simetria de nomenclatura).
    ActiveAgents     = @(
        "@maverick",
        "@planner",
        "@auditor"
    )
    # Frequencia do pulso em segundos
    HeartRateSeconds = 10
}

# 3. Configuracao do Gerenciador de Tarefas
$Global:TaskManagerConfig = @{
    # Nome do Mutex para garantir acesso exclusivo a fila
    MutexName = "Global\AgentTaskQueue_Mutex_Master"
}

# 4. Chaves de API (Cognicao)
# IMPORTANTE: Nunca commitar chaves reais. Use _env.example.ps1 como template.
# Carregue suas chaves de um arquivo local nao versionado ou variavel de ambiente do sistema.
$env:GEMINI_API_KEY = $env:GEMINI_API_KEY
$env:OPENROUTER_API_KEY = $env:OPENROUTER_API_KEY
$env:ANTHROPIC_API_KEY = $env:ANTHROPIC_API_KEY

Write-Host "[ENV] Ambiente e caminhos globais carregados." -ForegroundColor DarkGray