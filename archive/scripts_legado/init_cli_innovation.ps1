# Script de Inicializacao de Inovacao - Maverick -> Planner
# Objetivo: Materializar o conceito da CLI Inteligente e enfileirar para planejamento tecnico.

$KernelPath = Join-Path $PSScriptRoot "Agent-TaskManager.psm1"
Import-Module $KernelPath -Force

$TaskSlug = "cli-interativa"
$TaskDir = Join-Path $PSScriptRoot "docs\tasks\$TaskSlug"
$ConceptFile = Join-Path $TaskDir "CONCEPT_MAVERICK.md"

Write-Host "=== INICIANDO PROTOCOLO DE INOVACAO (MAVERICK) ===" -ForegroundColor Magenta

# 1. Criar Diretorio da Tarefa
if (-not (Test-Path $TaskDir)) { New-Item -ItemType Directory -Path $TaskDir -Force | Out-Null }

# 2. Maverick Elabora o Conceito (Elaboracao)
$conceptContent = @"
# Conceito: A Membrana Inteligente (Smart CLI)
> Autor: @maverick | Origem: Relatorio Sentinela 2026-03-12

## A Tese
Atualmente, o `do.ps1` e um canal passivo ('dumb pipe'). Ele aceita qualquer coisa e joga na fila. Isso transfere a carga cognitiva de roteamento para o sistema ou para o usuario (que precisa saber o que pedir).

Precisamos evoluir o `do.ps1` para uma **Membrana Semipermeavel Inteligente**.

## A Inovacao
O terminal nao deve apenas receber comandos; deve **negociar** intencoes.

### UX Proposta (O Dialogo)
1. **Usuario:** `.\do "quero melhorar a seguranca"`
2. **Sistema (Analise de Intent):** Detecta palavras-chave de seguranca.
3. **Sistema (Sugestao):** "Parece que voce quer uma auditoria. Deseja acionar o @securitychief diretamente? [S/N]"
4. **Resultado:** Roteamento preciso desde a entrada, reduzindo ruido na fila.

## Isomorfismo Biologico
Assim como uma membrana celular seleciona o que entra com base em receptores, a CLI deve selecionar inputs com base em padroes conhecidos (Regex/Keywords), rejeitando entropia (inputs vazios/confusos) na porta de entrada.

## Diretrizes para o @planner
- Nao use IA pesada na CLI (latencia). Use heuristicas rapidas (Regex).
- Mantenha a compatibilidade com o modo nao-interativo (flags `-Force`).
- O objetivo e velocidade e precisao de roteamento.
"@

[System.IO.File]::WriteAllText($ConceptFile, $conceptContent, [System.Text.Encoding]::UTF8)
Write-Host "[MAVERICK] Conceito elaborado em: $ConceptFile" -ForegroundColor Green

# 3. Enfileirar para o @planner (Execucao)
$taskId = "INOVACAO-CLI-$(Get-Date -Format 'yyyyMMdd')"
$task = [ordered]@{
    id          = $taskId
    description = "Planejar e especificar a 'CLI Inteligente' (Smart do.ps1) baseada no conceito do Maverick. O objetivo e criar um roteador interativo no terminal PowerShell."
    status      = "pending"
    timestamp   = (Get-Date -Format "o")
    agent       = "@planner"
    metadata    = @{
        slug = $TaskSlug
    }
}
Add-AgentTask -NewTask $task
Write-Host "[KERNEL] Tarefa de planejamento enfileirada: $taskId" -ForegroundColor Cyan
