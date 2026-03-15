<#
.SYNOPSIS
    Integra o Ecossistema Nexus ao terminal Windows permanentemente.
#>

Write-Host "=== ELEVANDO SISTEMA AO ESTADO DA ARTE (CLI GLOBAL) ===" -ForegroundColor Cyan

$ProfilePath = $PROFILE
$ProjectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
$NexusDir = $ProjectRoot

# Cria o arquivo de profile global do usuario se nao existir
if (-not (Test-Path $ProfilePath)) {
    New-Item -ItemType Directory -Path (Split-Path $ProfilePath) -Force | Out-Null
    New-Item -ItemType File -Path $ProfilePath -Force | Out-Null
}

$ProfileContent = Get-Content $ProfilePath -Raw -ErrorAction SilentlyContinue

# AUTO-UPDATE: Se o bloco ja existe, remove-o de forma limpa para injetar a versao atualizada
if ($ProfileContent -match "# NEXUS SYSTEM ENVIRONMENT") {
    $Pattern = "(?ms)`n# ==========================================.*?# NEXUS SYSTEM ENVIRONMENT.*?# =========================================="
    $ProfileContent = $ProfileContent -replace $Pattern, ""
    Set-Content -Path $ProfilePath -Value $ProfileContent -Encoding UTF8
}

$Injection = @"

# ==========================================
# NEXUS SYSTEM ENVIRONMENT (Auto-Generated)
# ==========================================
`$NexusDir = "$NexusDir"

# Atalhos Operacionais (Fim do uso de .\ e .ps1)
Set-Alias -Name dashboard -Value "`$NexusDir\scripts\cli\dashboard_queue.ps1" -Scope Global -ErrorAction SilentlyContinue
Set-Alias -Name start-worker -Value "`$NexusDir\scripts\ops\start_worker.ps1" -Scope Global -ErrorAction SilentlyContinue
Set-Alias -Name stop-worker -Value "`$NexusDir\scripts\ops\stop_worker.ps1" -Scope Global -ErrorAction SilentlyContinue
Set-Alias -Name monitor -Value "`$NexusDir\scripts\ops\monitor_worker.ps1" -Scope Global -ErrorAction SilentlyContinue
Set-Alias -Name ask -Value "`$NexusDir\scripts\cli\ask.ps1" -Scope Global -ErrorAction SilentlyContinue
Set-Alias -Name nexus-status -Value "`$NexusDir\scripts\cli\nexus_status.ps1" -Scope Global -ErrorAction SilentlyContinue
Set-Alias -Name nexus_status -Value "`$NexusDir\scripts\cli\nexus_status.ps1" -Scope Global -ErrorAction SilentlyContinue
Set-Alias -Name nexus-read -Value "`$NexusDir\scripts\cli\nexus_read.ps1" -Scope Global -ErrorAction SilentlyContinue
Set-Alias -Name nexus_read -Value "`$NexusDir\scripts\cli\nexus_read.ps1" -Scope Global -ErrorAction SilentlyContinue
Set-Alias -Name nexus-backup -Value "`$NexusDir\scripts\cli\nexus_backup.ps1" -Scope Global -ErrorAction SilentlyContinue
Set-Alias -Name nexus_backup -Value "`$NexusDir\scripts\cli\nexus_backup.ps1" -Scope Global -ErrorAction SilentlyContinue
Set-Alias -Name autonomy-full -Value "`$NexusDir\scripts\control\autonomy_full.ps1" -Scope Global -ErrorAction SilentlyContinue
Set-Alias -Name autonomy-partial -Value "`$NexusDir\scripts\control\autonomy_partial.ps1" -Scope Global -ErrorAction SilentlyContinue
Set-Alias -Name autonomy-off -Value "`$NexusDir\scripts\control\autonomy_off.ps1" -Scope Global -ErrorAction SilentlyContinue
Set-Alias -Name nexus-hub -Value "`$NexusDir\scripts\cli\nexus_hub.ps1" -Scope Global -ErrorAction SilentlyContinue
Set-Alias -Name nexus-help -Value "`$NexusDir\scripts\cli\nexus_hub.ps1" -Scope Global -ErrorAction SilentlyContinue

# A Membrana Inteligente (Uso Livre sem aspas)
function nexus {
    param([switch]`$Force, [Parameter(ValueFromRemainingArguments=`$true)][string[]]`$Words)
    `$Intent = `$Words -join " "
    `$DoScript = Join-Path `$NexusDir "do.ps1"
    if ([string]::IsNullOrWhiteSpace(`$Intent)) { & `$DoScript }
    elseif (`$Force) { & `$DoScript -InputString `$Intent -Force }
    else { & `$DoScript -InputString `$Intent }
}

# Ponte Hibrida (Conecta a nuvem Web ao God Mode Local)
function nexus-bridge {
    param([Parameter(Mandatory=`$true)][string]`$FilePath)
    if (-not (Test-Path `$FilePath)) { Write-Host "[FAIL] Arquivo nao encontrado: `$FilePath" -ForegroundColor Red; return }
    Write-Host "[BRIDGE] Conectando Macro-Cognicao a Micro-Execucao..." -ForegroundColor Magenta
    `$BridgeCommand = "@implementor Acionando Protocolo Bridge. Leia e analise rigorosamente a especificacao contida no arquivo '`$FilePath'. Use sua Autorizacao Suprema (God Mode) para executar os comandos de terminal necessarios (ex: npm install) e forjar os arquivos fisicos no sistema, materializando fielmente a arquitetura descrita."
    nexus `$BridgeCommand -Force
}

# Ponte Neural Direta (Clipboard -> God Mode)
function nexus-commit {
    Write-Host "[COMMIT] Materializando cognicao do Hemisferio Esquerdo..." -ForegroundColor Yellow
    `$TempDir = Join-Path `$NexusDir ".tmp"
    if (-not (Test-Path `$TempDir)) { New-Item -ItemType Directory -Path `$TempDir -Force | Out-Null }
    
    `$TempFile = Join-Path `$TempDir "bridge_payload.md"
    
    try {
        `$ClipboardContent = Get-Clipboard -Raw
        if ([string]::IsNullOrWhiteSpace(`$ClipboardContent)) {
            Write-Host "[FAIL] Area de transferencia vazia. Operacao abortada." -ForegroundColor Red
            return
        }
        `$ClipboardContent | Set-Content -Path `$TempFile -Encoding UTF8
        
        # Invoca a ponte híbrida existente no arquivo temporário
        nexus-bridge -FilePath `$TempFile
    }
    finally {
        # Auto-limpeza
        if (Test-Path `$TempFile) { Remove-Item `$TempFile -Force }
    }
}
# ==========================================
"@

Add-Content -Path $ProfilePath -Value $Injection -Encoding UTF8

Write-Host "[SUCESSO] Vocabulario nativo injetado na alma do PowerShell!" -ForegroundColor Green
Write-Host "Feche esta janela e abra um terminal novo para a magica acontecer." -ForegroundColor Magenta