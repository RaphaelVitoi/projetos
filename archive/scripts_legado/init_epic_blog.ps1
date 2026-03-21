<#
.SYNOPSIS
    Injeta o Epico do Sistema de Blog para o @dispatcher orquestrar.
#>

$KernelPath = Join-Path $PSScriptRoot "Agent-TaskManager.psm1"
Import-Module $KernelPath -Force

Write-Host "=== PROTOCOLO: EPIC BLOG SYSTEM ===" -ForegroundColor Magenta

$task = [ordered]@{
    id          = "EPIC-BLOG-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
    description = "Epico: Criar uma arquitetura de geracao automatica de artigos para o Blog (Temas: Poker e Psicologia). Precisamos estabelecer um fluxo em que o sistema pesquisa os temas em tendencia, estrutura o SEO e os intertitulos, redige o conteudo e gera um template HTML/Markdown para exibicao estetica no site. Analise este epico complexo e enfileire as tarefas tecnicas na ordem exata para os agentes da triade correta (@planner, @pesquisador, @curator, @implementor, etc)."
    status      = "pending"
    timestamp   = (Get-Date -Format "o")
    agent       = "@dispatcher"
}

Add-AgentTask -NewTask $task

Write-Host "[NEXUS] O Epico do Blog foi entregue ao @dispatcher." -ForegroundColor Green
