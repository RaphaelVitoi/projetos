# Script de Diagnostico Pos-Cirurgia (Kernel v3.0)
# 1. Verifica remocao de codigo obsoleto.
# 2. Testa injecao de tarefa no Kernel regenerado.

$DeadTissue = Join-Path $PSScriptRoot "validate-queue.ps1"

Write-Host "=== INICIANDO DIAGNOSTICO DO SISTEMA ===" -ForegroundColor Magenta

# 1. Verificacao de Limpeza
if (Test-Path $DeadTissue) {
    Write-Warning "[ALERT] Falha na cirurgia: 'validate-queue.ps1' ainda existe."
}
else {
    Write-Host "[PASS] Tecido morto removido com sucesso." -ForegroundColor Green
}

# 2. Teste de Vitalidade do Kernel
try {
    # [REMOVIDO] Agent-TaskManager.psm1 nao existe mais
    # Import-Module "$PSScriptRoot\Agent-TaskManager.psm1" -Force

    $taskId = "HEARTBEAT-$(Get-Random -Minimum 1000 -Maximum 9999)"
    $task = [ordered]@{ id = $taskId; description = "Verificacao de vitalidade do sistema"; status = "pending"; timestamp = (Get-Date -Format "o") }

    Write-Host "[TEST] Injetando $taskId via Kernel..." -ForegroundColor Yellow
    # Add-AgentTask -NewTask $task  # [REMOVIDO] Funcao do modulo deletado
    Write-Host "[AVISO] Agent-TaskManager.psm1 removido. Teste de injecao desativado." -ForegroundColor Yellow
}
catch {
    Write-Error "[FATAL] Falha sistemica: $_"
}
