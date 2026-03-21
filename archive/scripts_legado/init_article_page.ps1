<#
.SYNOPSIS
    Injeta a tarefa de implementacao da Pagina de Artigo Individual para o @implementor.
#>

$KernelPath = Join-Path $PSScriptRoot "Agent-TaskManager.psm1"
Import-Module $KernelPath -Force

Write-Host "=== PROTOCOLO: MATERIALIZACAO DA PAGINA DE ARTIGO ===" -ForegroundColor Magenta

$task = [ordered]@{
    id          = "ARTICLE-PAGE-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
    description = "Acesse e leia o arquivo 'docs/tasks/blog-article/SPEC_ARTICLE_PAGE.md'. Implemente a rota dinamica de Artigo Individual em 'frontend/src/app/blog/[slug]/page.tsx' usando Next.js App Router. Configure o '@tailwindcss/typography' para o design focado em leitura (prose-invert). Crie a logica de fetch no Prisma e a injecao mista (Markdown parser) que permita embutir o '[SIMULADOR_V1]'."
    status      = "pending"
    timestamp   = (Get-Date -Format "o")
    agent       = "@implementor"
}

Add-AgentTask -NewTask $task
Write-Host "[NEXUS] Tarefa materializada e delegada ao @implementor." -ForegroundColor Green
