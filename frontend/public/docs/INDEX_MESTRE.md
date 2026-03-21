Indice Mestre do Ecossistema v6.4
=================================
Gerado pelo @organizador | Data: 2026-03-17

1. Agentes (Identidades)
------------------------
@architect, @pesquisador, @prompter, @planner, @auditor, @implementor,
@verifier, @validador, @curator, @seo, @bibliotecario, @maverick,
@sequenciador, @skillmaster, @dispatcher, @organizador, @securitychief, @chico.

Alias de roteamento: @architecter -> @architect.

2. Motor Central (Kernel)
-------------------------
do.ps1
  CLI inteligente para entrada de tarefas e roteamento.

Agent-TaskManager.psm1
  Kernel de enfileiramento e regras da fila.

task_executor.py
  Worker e operacoes SQLite (tasks.db).

3. Topologia de Diretorios
--------------------------
/docs/
  Documentacao principal do sistema.
/docs/reports/
  Relatorios e health checks.
/docs/tasks/
  Areas isoladas por tarefa.
/.claude/
  Memoria e configuracoes dos agentes.
/queue/tasks.db
  Banco SQLite da fila.

4. Documentos-Chave
-------------------
docs/AGENTS.md
docs/MANUAL_WORKFLOW_AGENTES.md
docs/PRD.md
docs/DEPLOY.md
docs/STRUCTURE_SRC.md
docs/INVENTARIO_FERRAMENTAS.md

5. Scripts CLI
--------------
do.ps1
scripts/cli/status.ps1
scripts/cli/nexus_status.ps1
scripts/cli/dashboard.ps1
scripts/cli/dashboard_queue.ps1
scripts/cli/nexus_hub.ps1
