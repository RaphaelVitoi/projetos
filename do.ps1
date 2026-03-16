<#
/**
 * IDENTITY: Membrana Inteligente (Smart CLI v2.0)
 * PATH: do.ps1
 * ROLE: Atuar como duto interativo de intencao, aplicando heuristica de Regex para rotear inputs humanos ao agente adequado.
 * BINDING: [Agent-TaskManager.psm1 (Kernel para enfileiramento), synonyms.json (Cortex de sinonimos)]
 * TELEOLOGY: Reduzir a carga cognitiva do usuario a zero na entrada de tarefas, filtrando a entropia antes que alcance o nucleo de processamento do ecossistema.
 */
.SYNOPSIS
    Smart CLI Wrapper (do.ps1) - A Membrana Inteligente v2.0
    Baseado na SPEC auditada e aprovada pelo @maverick.

.DESCRIPTION
    Roteador de intencoes que aceita input natural, sanitiza,
    identifica o agente correto via heuristica (Regex) e
    encaminha para o Agent-TaskManager com identidade visual "Cyber/Sintetica".
#>

param (
    [Parameter(Position = 0, ValueFromRemainingArguments = $true)]
    [string[]]$InputWords,
    [switch]$Force,
    [switch]$Web, # Roteamento direto para a IDE (Zero Custo API / Modelos Premium Web)
    [switch]$CheckCortex, # Validar a saude das regras (Cortex) silenciosamente antes de operar
    [switch]$Ingest, # Receptor Web: Materializa codigos do clipboard localmente
    [switch]$Wait, # Modo Sincrono: Trava o terminal e imprime a resposta assim que concluida
    [switch]$Last  # Imprime imediatamente a ultima resposta gerada
)

$InputString = $InputWords -join " "

# --- PROTECAO CONTRA ENTROPIA DE PASTE ---
# Se o terminal engolir as flags para dentro da string devido a quebras de linha, nos a resgatamos.
if ($InputString -match '(?i)\s-Web\b') {
    $Web = $true
    $InputString = $InputString -replace '(?i)\s-Web\b', ''
}
if ($InputString -match '(?i)\s-Wait\b') {
    $Wait = $true
    $InputString = $InputString -replace '(?i)\s-Wait\b', ''
}

# --- BOOTSTRAP ---
$EnvPath = Join-Path $PSScriptRoot "_env.ps1"
if (Test-Path $EnvPath) { . $EnvPath }
# Set a flag to indicate that the environment has been loaded
$Script:EnvLoaded = $true

# Fallback Estrutural: Garante que $Global:AgentPaths e suas chaves vitais existam
if ($null -eq $Global:AgentPaths) {
    $Global:AgentPaths = @{}
}
if (-not $Global:AgentPaths.Root) { $Global:AgentPaths.Root = $PSScriptRoot }
if (-not $Global:AgentPaths.Kernel) { $Global:AgentPaths.Kernel = Join-Path $PSScriptRoot "Agent-TaskManager.psm1" }
if (-not $Global:AgentPaths.Log) { $Global:AgentPaths.Log = Join-Path $PSScriptRoot ".claude\logs" }
if (-not $Global:AgentPaths.Docs) { $Global:AgentPaths.Docs = Join-Path $PSScriptRoot "docs" }
if (-not $Global:AgentPaths.Queue) { $Global:AgentPaths.Queue = Join-Path $PSScriptRoot "queue\tasks.db" }
if (-not $Global:AgentPaths.Archive) { $Global:AgentPaths.Archive = Join-Path $PSScriptRoot "queue\archive.db" }
if ($null -eq $Global:TaskManagerConfig) { $Global:TaskManagerConfig = @{ MutexName = "Global\ChicoTaskManagerMutex" } }

# Import Kernel
$KernelPath = if ($Global:AgentPaths.Kernel) { $Global:AgentPaths.Kernel } else { Join-Path $PSScriptRoot "Agent-TaskManager.psm1" }

if (Test-Path $KernelPath) {
    Import-Module $KernelPath -Force -DisableNameChecking
}
else {
    Write-Host "[KERNEL ERROR] Agent-TaskManager.psm1 not found." -ForegroundColor Red
    exit
}

# --- FUNCOES DE CARREGAMENTO JSON ---
function Import-ValidJson {
    param([string]$Path, [string]$FileName, [switch]$Critical)
    if (-not (Test-Path $Path)) {
        if ($Critical) { Write-Host "[ERROR] $FileName not found in $PSScriptRoot." -ForegroundColor Red; exit }
        return $null
    }
    try {
        return (Get-Content -Path $Path -Raw -Encoding UTF8 | ConvertFrom-Json -ErrorAction Stop)
    }
    catch {
        Write-Host "[ERROR] Malformed JSON in $FileName`nDetails: $($_.Exception.Message)" -ForegroundColor Red
        if ($Critical) { exit }
        return $null
    }
}

# --- CONFIGURACAO EXTERNA (Cortex JSON) ---

# 1. IntentMap (Mapeamento de Agentes)
$IntentMapPath = Join-Path $PSScriptRoot "data\intentmap.json"
$IntentMap = [ordered]@{}

$jsonIntentMap = Import-ValidJson -Path $IntentMapPath -FileName "intentmap.json" -Critical
if ($null -ne $jsonIntentMap) {
    foreach ($property in $jsonIntentMap.psobject.properties) {
        $IntentMap[$property.Name] = $property.Value
    }
}

# 2. Synonyms (Entropia Humana e Variacoes)
$SynonymsPath = Join-Path $PSScriptRoot "data\synonyms.json"
$Synonyms = @{}

$jsonSynonyms = Import-ValidJson -Path $SynonymsPath -FileName "synonyms.json"
if ($null -ne $jsonSynonyms) {
    foreach ($property in $jsonSynonyms.psobject.properties) {
        $Synonyms[$property.Name] = $property.Value
    }
}
else {
    if (-not (Test-Path $SynonymsPath)) {
        Write-Host "[WARNING] synonyms.json not found. Using exact matches only." -ForegroundColor DarkYellow
    }
}

# 3. Aphorisms (Easter Eggs do @maverick)
$AphorismsPath = Join-Path $PSScriptRoot "data\aphorisms.json"
$Aphorisms = @()
$jsonAphorisms = Import-ValidJson -Path $AphorismsPath -FileName "aphorisms.json"
if ($null -ne $jsonAphorisms) {
    $Aphorisms = @($jsonAphorisms)
}
else {
    if (-not (Test-Path $AphorismsPath)) {
        $Aphorisms = @("Silence is the loudest sound in the void.")
    }
}

# --- FUNCOES ---

function Invoke-CyberBeep {
    param([string]$Type)
    # Falha silenciosamente se o sistema não suportar beeps (ex: alguns terminais Linux/VS Code integrados silenciosos)
    try {
        switch ($Type) {
            'Boot' { [console]::Beep(800, 80); [console]::Beep(1200, 120) }
            'Scan' { [console]::Beep(600, 50); [console]::Beep(650, 50); [console]::Beep(700, 50) }
            'Match' { [console]::Beep(1046, 100); [console]::Beep(1318, 150) }
            'Success' { [console]::Beep(1567, 100); [console]::Beep(2093, 200) }
            'Error' { [console]::Beep(400, 200); [console]::Beep(300, 300) }
            'Select' { [console]::Beep(900, 100) }
        }
    }
    catch {}
}

function Resolve-Intent {
    param([string]$InputText)

    # 1. Override Absoluto: Se o comando contiver @agente explicitamente, ignora a heuristica.
    if ($InputText -match '(@[a-zA-Z0-9_]+)') {
        $explicitAgent = $matches[1].ToLower()
        if ($IntentMap.Contains($explicitAgent)) {
            return $explicitAgent
        }
    }

    # 2. Sistema de Pontuacao (Scoring)
    $bestAgent = $null
    $maxScore = 0

    foreach ($agent in $IntentMap.Keys) {
        $pattern = $IntentMap[$agent]
        if ($Synonyms -and $Synonyms[$agent]) {
            $synonymGroup = $Synonyms[$agent]
            $synonymPattern = ($synonymGroup | ForEach-Object { [regex]::Escape($_) }) -join "|"
            $pattern = "($pattern|$synonymPattern)"
        }
        
        $matchCount = [regex]::Matches($InputText, $pattern, "IgnoreCase").Count
        if ($matchCount -gt $maxScore) {
            $maxScore = $matchCount
            $bestAgent = $agent
        }
    }
    return $bestAgent
}

function Show-Header {
    Invoke-CyberBeep -Type 'Boot'
    Write-Host "=== CHICO SMART CLI v2.0 ===" -ForegroundColor Cyan
    
    # Easter Egg (10% chance)
    if ((Get-Random -Minimum 1 -Maximum 100) -le 10) {
        $msg = $Aphorisms | Get-Random
        Write-Host "`n> $msg" -ForegroundColor Magenta
    }
}

function Get-ValidatedAgent {
    <#
    .SYNOPSIS
        Prompts the user for a manual agent ID and validates it against the IntentMap.
    #>
    while ($true) {
        $manualAgent = Read-Host

        if ([string]::IsNullOrWhiteSpace($manualAgent)) {
            Write-Host "[ABORT] No agent selected." -ForegroundColor Red
            exit
        }

        # Normalize: add '@' if missing
        if (!$manualAgent.StartsWith('@')) { $manualAgent = "@$manualAgent" }

        if ($IntentMap.Contains($manualAgent)) {
            return $manualAgent
        }
        Write-Host "[ERROR] Invalid agent ID. Please try again." -ForegroundColor Red
        Write-Host "[MANUAL INPUT] Enter target agent > " -NoNewline -ForegroundColor Cyan
    }
}

# --- RECEPTOR WEB (INGESTION PIPELINE) ---
if ($Ingest) {
    Show-Header
    Write-Host "`n[INGEST PIPELINE] Lendo area de transferencia..." -ForegroundColor DarkGray
    
    $clipboard = Get-Clipboard -Raw
    if ([string]::IsNullOrWhiteSpace($clipboard)) {
        Invoke-CyberBeep -Type 'Error'
        Write-Host "[ABORT] Area de transferencia vazia. Copie a resposta da IA primeiro." -ForegroundColor Red
        exit 1
    }
    
    $dropzoneDir = Join-Path $PSScriptRoot ".claude"
    if (-not (Test-Path $dropzoneDir)) { New-Item -ItemType Directory -Path $dropzoneDir -Force | Out-Null }
    
    $dropzoneFile = Join-Path $dropzoneDir "dropzone.md"
    [System.IO.File]::WriteAllText($dropzoneFile, $clipboard, [System.Text.Encoding]::UTF8)
    
    Write-Host "[GOD MODE] Acionando motor Python de forja..." -ForegroundColor Yellow
    
    $pythonCmd = "python"
    $executorScript = Join-Path $PSScriptRoot "task_executor.py"
    & $pythonCmd $executorScript "ingest" $dropzoneFile
    
    Invoke-CyberBeep -Type 'Success'
    exit 0
}

# --- INTEGRITY CHECK SILENCIOSO ---
if ($CheckCortex) {
    Write-Host "`n[CORTEX] Analisando integridade do schema em background..." -ForegroundColor DarkGray
    $CheckScriptPath = Join-Path $PSScriptRoot "scripts\setup\check-cortex.ps1"
    
    if (Test-Path $CheckScriptPath) {
        # Absorve e funde todos os streams (*>&1) para suprimir poluição de Write-Host
        $checkOutput = & $CheckScriptPath *>&1
        $outputStr = $checkOutput -join " "
        
        if ($outputStr -match "\[SUCCESS\]") {
            Add-CortexValidationLog -Success $true -Details "Validacao invocada pela CLI"
            Write-Host "[CORTEX] Homeostase confirmada. Sistema integro." -ForegroundColor Green
        }
        else {
            Add-CortexValidationLog -Success $false -Details "Entropia detectada via CLI: $outputStr"
            Write-Host "[CRITICAL] Entropia no Cortex. Corrupcao ou violacao de Schema. Abortando execucao." -ForegroundColor Red
            exit
        }
    }
}

# --- MODO INTERATIVO ---
if ([string]::IsNullOrWhiteSpace($InputString)) {
    Show-Header
    if ($Force) {
        Write-Host "[ABORT] No input string provided and -Force is active." -ForegroundColor Red
        exit 1
    }
    Write-Host "[NEXUS] Awaiting Directive > " -NoNewline -ForegroundColor Cyan
    $InputString = Read-Host
}

# --- COMANDOS RAPIDOS (DYNAMIC READ) ---
$isReadCmd = $Last -or ($InputString.Length -lt 25 -and $InputString -match '(?i)\b(last|read|ver|resposta|resultado)\b')
if ($isReadCmd) {
    $ResultsDir = Join-Path $PSScriptRoot ".claude\task_results"
    if (Test-Path $ResultsDir) {
        $LastFile = Get-ChildItem -Path $ResultsDir -Filter "*.md" | Sort-Object LastWriteTime -Descending | Select-Object -First 1
        if ($LastFile) {
            Write-Host "`n=== ULTIMO DOSSIE GERADO: $($LastFile.Name) ===`n" -ForegroundColor Green
            Get-Content $LastFile.FullName -Encoding UTF8 | Write-Host
            exit 0
        }
    }
    Write-Host "`n[ERRO] Nenhuma resposta encontrada no Córtex." -ForegroundColor Red
    exit 1
}

# --- FLUXO DE INTENCAO ---
Invoke-CyberBeep -Type 'Scan'
$suggestedAgent = Resolve-Intent -InputText $InputString

# 3. Handshake
Write-Host "`n[KERNEL] Computing vectors..." -ForegroundColor DarkGray
Start-Sleep -Milliseconds 300

$agent = $null
if ($suggestedAgent) {
    Write-Host "[PATTERN MATCH] Intent detected: " -NoNewline -ForegroundColor Cyan
    Write-Host "'$suggestedAgent' [OK]" -NoNewline -ForegroundColor Yellow
    
    if ($Force) {
        Write-Host " (Auto-Confirmed by -Force)" -ForegroundColor DarkGray
        $agent = $suggestedAgent
    }
    else {
        Write-Host ". Confirm? [Y/n] " -NoNewline -ForegroundColor Cyan
        Invoke-CyberBeep -Type 'Match'
        $confirm = Read-Host
        
        if ($confirm -match '^(n|N|no|nao)$') {
            Write-Host "[MANUAL OVERRIDE] Enter agent ID > " -NoNewline -ForegroundColor Cyan
            Invoke-CyberBeep -Type 'Select'
            $agent = Get-ValidatedAgent
        }
        else {
            $agent = $suggestedAgent
        }
    }
}
else {
    Invoke-CyberBeep -Type 'Error'
    Write-Host "[WARNING] Signal ambiguous. Falling back to default agent: " -NoNewline -ForegroundColor Yellow
    Write-Host "'@maverick'" -ForegroundColor Cyan
    
    $agent = "@maverick"
    Invoke-CyberBeep -Type 'Match'
}

if ([string]::IsNullOrWhiteSpace($agent)) {
    Write-Host "[ABORT] No agent selected." -ForegroundColor Red
    exit
}

# --- ROTEAMENTO WEB/IDE (CUSTO ZERO API) ---
if ($Web) {
    Write-Host "`n[HYBRID BRAIN] Compilando pacote cognitivo massivo..." -ForegroundColor DarkGray
    $ContextPath = Join-Path $PSScriptRoot ".claude\project-context.md"
    $ContextContent = if (Test-Path $ContextPath) { Get-Content $ContextPath -Raw -Encoding UTF8 } else { "" }
    
    $AgentPath = Join-Path $PSScriptRoot ".claude\agents\$($agent.Replace('@','')).md"
    $AgentContent = if (Test-Path $AgentPath) { Get-Content $AgentPath -Raw -Encoding UTF8 } else { "Voce e o $agent." }
    
    $ClipboardText = "== IDENTIDADE ASSUMIDA ==`n$AgentContent`n`n== CONTEXTO DO PROJETO ==`n$ContextContent`n`n== SUA DIRETRIZ ==`n$InputString`n`n[DIRETRIZ DE LLM] Ao final da sua resposta, analise a tarefa e o contexto. Recomende qual modelo (Claude Pro/Opus, Gemini Advanced/1.5 Pro, ou um modelo API especifico) seria o mais adequado para a *proxima* etapa ou para a *atual* tarefa, justificando a escolha com base na 'Economia Generalizada' (custo financeiro, latencia, janela de contexto, qualidade de output). Se a tarefa for melhor executada na interface Web (com suas assinaturas pagas), instrua o usuario a usar o Protocolo de Handoff (-Web)."
    Set-Clipboard -Value $ClipboardText
    
    Invoke-CyberBeep -Type 'Success'
    Write-Host "[SOTA] Handoff completo para a Interface Web!" -ForegroundColor Magenta
    Write-Host "Aperte Ctrl+V no chat do VS Code (Opus/Gemini Advanced) para executar a tarefa com as assinaturas Premium." -ForegroundColor Cyan
    Write-Host "Isto garante o uso dos melhores modelos sem consumir limite da API e aproveitando suas assinaturas pagas." -ForegroundColor DarkGray
    exit
}

# --- ENFILEIRAMENTO DE TAREFA ---
$taskId = "TASK-$(Get-Date -Format 'yyyyMMdd-HHmmss')" 
$newTask = [ordered]@{
    id          = $taskId
    description = $InputString
    status      = "pending"
    timestamp   = (Get-Date -Format "o")
    agent       = $agent
}

try {
    Add-AgentTask -NewTask $newTask
    Invoke-CyberBeep -Type 'Success'
    Write-Host "`n[SYMMETRY] Integrity verified. Cycle complete." -ForegroundColor Green
    Write-Host "ID: $taskId" -ForegroundColor DarkGray
    
    if ($Wait) {
        Write-Host "`n[NEXUS SÍNCRONO] Aguardando o Orquestrador processar a resposta..." -ForegroundColor Yellow
        $ResultFile = Join-Path $PSScriptRoot ".claude\task_results\$taskId.md"
        $Waited = 0
        while ($Waited -lt 300) {
            # 5 minutos maximo
            if (Test-Path $ResultFile) {
                Write-Host "`n=== RESPOSTA MATERIALIZADA ===`n" -ForegroundColor Green
                Get-Content $ResultFile -Encoding UTF8 | Write-Host
                exit 0
            }
            Start-Sleep -Seconds 2
            $Waited += 2
            Write-Host "." -NoNewline -ForegroundColor DarkGray
        }
        Write-Host "`n`n[TIMEOUT] O agente está demorando além do normal. A tarefa continua rodando em background." -ForegroundColor Red
    }
}
catch {
    Write-Host "[CRITICAL] Task ingestion failed: $_" -ForegroundColor Red
}
