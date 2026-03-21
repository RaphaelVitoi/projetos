<#
.SYNOPSIS
    Injeta a tarefa inicial de materializacao do site para o @implementor.
#>

$KernelPath = Join-Path $PSScriptRoot "Agent-TaskManager.psm1"
Import-Module $KernelPath -Force

Write-Host "=== PROTOCOLO: MATERIALIZACAO DO SITE (GREENFIELD) ===" -ForegroundColor Magenta

$task = [ordered]@{
    id          = "SITE-IMPL-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
    description = "Acesse e leia a especificacao em '.claude/SPEC_ROTEAMENTO_DB.md'. Em cenario Greenfield, execute rigorosamente o 'Plano de Execucao' descrito na secao 3: 1) Entrar no diretorio frontend e instalar dependencias do Prisma; 2) Inicializar o Prisma; 3) Materializar o schema.prisma com o modelo Post; 4) Criar a estrutura de pastas e rotas iniciais vazias do Next.js App Router e componentes. Use sua Autoridade Suprema para rodar comandos e forjar os arquivos."
    status      = "pending"
    timestamp   = (Get-Date -Format "o")
    agent       = "@implementor"
}

Add-AgentTask -NewTask $task
Write-Host "[NEXUS] Tarefa materializada e delegada ao @implementor." -ForegroundColor Green
