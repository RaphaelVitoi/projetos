<#
.SYNOPSIS
    Cria um atalho no diretório 'Startup' do Windows para inicializar o Worker Pydantic automaticamente.
#>

$ProjectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
$TargetScript = Join-Path $ProjectRoot "scripts\ops\start_worker.ps1"
$StartupFolder = [Environment]::GetFolderPath('Startup')
$ShortcutPath = Join-Path $StartupFolder "NexusWorker.lnk"

$WshShell = New-Object -ComObject WScript.Shell
$Shortcut = $WshShell.CreateShortcut($ShortcutPath)

$Shortcut.TargetPath = "powershell.exe"
$Shortcut.Arguments = "-WindowStyle Hidden -ExecutionPolicy Bypass -File `"$TargetScript`""
$Shortcut.WorkingDirectory = $ProjectRoot
$Shortcut.Description = "Orquestrador Pydantic Background (Nexus)"
$Shortcut.Save()

Write-Host "[SYMMETRY] Atalho criado em: $ShortcutPath" -ForegroundColor Green