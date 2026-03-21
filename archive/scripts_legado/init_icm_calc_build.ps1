<#
.SYNOPSIS
    Injeta a tarefa de implementacao da Calculadora ICM Universal para o @implementor.
#>

$KernelPath = Join-Path $PSScriptRoot "Agent-TaskManager.psm1"
Import-Module $KernelPath -Force

Write-Host "=== PROTOCOLO: MATERIALIZACAO DA CALCULADORA ICM (V2) ===" -ForegroundColor Magenta

$task = [ordered]@{
    id          = "ICM-CALC-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
    description = "Acesse e leia o PRD em 'docs/reports/PRD.md' e a SPEC em 'docs/reports/SPEC.md'. Implemente a Calculadora ICM Universal (V2) usando Next.js, React, Tailwind e Recharts. Lembre-se OBRIGATORIAMENTE de inspecionar 'components/interactive/icm_toy_game_simulator.html' para herdar a identidade visual (Cyber/Dark). Inicie pela logica core em 'frontend/src/lib/icm.ts' e evolua para a UI em 'frontend/src/components/icm/'."
    status      = "pending"
    timestamp   = (Get-Date -Format "o")
    agent       = "@implementor"
}

Add-AgentTask -NewTask $task
Write-Host "[NEXUS] Tarefa materializada e delegada ao @implementor." -ForegroundColor Green
