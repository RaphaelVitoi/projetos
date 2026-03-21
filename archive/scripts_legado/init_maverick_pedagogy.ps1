<#
.SYNOPSIS
    Aciona o @maverick para um Relatorio Sentinela sobre Aprendizado Generativo no Poker.
#>

$KernelPath = Join-Path $PSScriptRoot "Agent-TaskManager.psm1"
Import-Module $KernelPath -Force

Write-Host "=== PROTOCOLO: SENTINELA PEDAGOGICO (@MAVERICK) ===" -ForegroundColor Magenta

$task = [ordered]@{
    id          = "SENTINELA-PEDAGOGIA-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
    description = "Elabore um 'Relatorio Sentinela' focado nos desafios e oportunidades pedagogicas do novo site. Como podemos transformar o consumo de conteudo de poker (teoria, ICM, mindset) em uma experiencia de 'Aprendizado Generativo' para o usuario final? Reflita sobre os 7 modos de aprendizado documentados na ESTADO_ARTE_APRENDIZADO_GENERATIVO.md e a etica da COSMOVISAO.md. Identifique riscos de cairmos no padrao de 'educacao passiva' e sugira inovacoes arquiteturais e de design."
    status      = "pending"
    timestamp   = (Get-Date -Format "o")
    agent       = "@maverick"
}

Add-AgentTask -NewTask $task
Write-Host "[NEXUS] Solicitacao do Relatorio Sentinela delegada ao @maverick." -ForegroundColor Cyan
