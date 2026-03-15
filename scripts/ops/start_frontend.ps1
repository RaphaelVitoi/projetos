<#
.SYNOPSIS
    Inicia o servidor de desenvolvimento do Next.js para visualização da nova arquitetura.
#>

$ProjectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path

Write-Host "=== LIGANDO MOTOR NEXT.JS (NOVO SITE) ===" -ForegroundColor Magenta
Write-Host "[NEXUS] O painel visual estará disponível em: http://localhost:3000" -ForegroundColor Cyan

cd "$ProjectRoot\frontend"
npm run dev