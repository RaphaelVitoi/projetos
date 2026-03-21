# Script de Inicializacao de Feature - Simulador ICM
# Objetivo: Recuperar a intencao de adicionar controles de cenario de fundador e enfileirar para planejamento.

$ProjectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
$KernelPath = Join-Path $ProjectRoot "Agent-TaskManager.psm1"
Import-Module $KernelPath -Force

Write-Host "=== INICIANDO PROTOCOLO DE RECUPERACAO DE INTENCAO (CHICO) ===" -ForegroundColor Magenta

# A sessao anterior foi interrompida. Esta tarefa formaliza a intencao para garantir a execucao resiliente.
$taskId = "ICM-FEAT-FOUNDERS-$(Get-Date -Format 'yyyyMMddHHmm')"
$taskDescription = "Planejar a adicao de botoes/controles na UI do Simulador ICM para permitir a troca dinamica de cenarios de fundadores (ex: Fundador A vs. Fundador B). A especificacao (SPEC) deve detalhar: 1) As mudancas no estado do componente React. 2) A logica para atualizar o IcmCapTable e IcmCharts. 3) O design e posicionamento dos novos botoes. 4) Como o estado sera gerenciado (local ou global)."

$task = [ordered]@{
    id          = $taskId
    description = $taskDescription
    status      = "pending"
    timestamp   = (Get-Date -Format "o")
    agent       = "@planner"
    metadata    = @{
        origin  = "Recuperacao de sessao por @chico"
        feature = "ICM Founder Scenarios"
    }
}

Add-AgentTask -NewTask $task
Write-Host "[CHICO] Intencao recuperada e formalizada. Tarefa de planejamento ($taskId) enfileirada para o @planner." -ForegroundColor Cyan
Write-Host "[CHICO] O @planner ira agora realizar a analise forense e criar o PRD/SPEC. A partir dai, o processo seguira o fluxo padrao, garantindo a integridade do sistema."
