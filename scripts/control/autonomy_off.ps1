<#
.SYNOPSIS
    Desativa a Autonomia Sistêmica. O handoff ocorre apenas sob comando manual.
#>
$ProjectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
$ConfigPath = Join-Path $ProjectRoot ".claude\autonomy.json"
$ConfigDir = Split-Path $ConfigPath
if (-not (Test-Path $ConfigDir)) { New-Item -ItemType Directory -Path $ConfigDir -Force | Out-Null }
'{"mode": "off"}' | Set-Content -Path $ConfigPath -Encoding UTF8
Write-Host "[OFF] AUTONOMIA DESATIVADA. O sistema aguarda seu comando para cada nova etapa." -ForegroundColor Red