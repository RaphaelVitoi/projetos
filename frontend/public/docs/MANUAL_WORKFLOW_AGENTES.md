Manual do Sistema de Agentes - Workflow Completo
================================================
Versao: v6.4 | Data: 2026-03-17
Foco: Operacao e uso do sistema

Resumo
------
Este manual explica COMO operar o sistema. Para contexto e decisoes, use:
.claude/project-context.md

Arquitetura da Fila (SQLite)
----------------------------
Arquivo principal: queue/tasks.db
Estados de tarefa:
pending, running, completed, failed, cancelled

Scripts de Operacao
------------------
1) Enfileirar tarefa (CLI inteligente)
   .\do.ps1 "Sua descricao de tarefa aqui"

2) Ver status geral
   .\scripts\cli\status.ps1
   .\scripts\cli\nexus_status.ps1

3) Painel de fila
   .\scripts\cli\dashboard.ps1
   .\scripts\cli\dashboard_queue.ps1

4) Hub resumido
   .\scripts\cli\nexus_hub.ps1

Pipeline de Agentes (padrao)
----------------------------
dispatcher -> pesquisador -> prompter -> planner -> auditor -> implementor
-> verifier -> validador -> organizador

Agentes
-------
@architect: Arquitetura e coerencia global.
@pesquisador: Pesquisa e evidencias.
@prompter: Prompts e criterios de sucesso.
@planner: Planejamento e escopo.
@auditor: Auditoria e riscos.
@implementor: Implementacao e mudancas.
@verifier: Testes e validacao.
@validador: Validacao final.
@organizador: Indice e manutencao.
@curator: Curadoria e narrativa.
@seo: Metadados e SEO.
@bibliotecario: Catalogacao.
@maverick: Criatividade e exploracao.
@sequenciador: Orquestracao de ordem.
@skillmaster: Skills e automacao.
@dispatcher: Roteamento de tarefas.
@securitychief: Seguranca e hardening.
@chico: Worker e execucao confiavel.

Alias
-----
@architecter -> @architect (alias de roteamento)

Observacoes
-----------
- Use ASCII puro em docs e scripts para compatibilidade.
- Evite editar arquivos legados sem necessidade.
