<#
.SYNOPSIS
    Interface direta com o Agente @bibliotecario (RAG Search).
#>
param(
    [Parameter(Position = 0)]
    [string]$Question
)

$ProjectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path

if ([string]::IsNullOrWhiteSpace($Question)) {
    Write-Host "=== 📚 BIBLIOTECÁRIO NEXUS ===" -ForegroundColor Green
    $Question = Read-Host "O que deseja buscar na Mente Coletiva?"
}

python (Join-Path $ProjectRoot "memory_rag.py") query "$Question"