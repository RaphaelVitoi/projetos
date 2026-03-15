# Contexto do Projeto
>
> Atualizado em 2026-03-15 (auditoria integral .claude/)

## Governanca

**Triade:** Voce (CEO) + @maverick (Vice Intelectual) + CHICO (Administrador). Detalhes completos em `.claude/LIDERANCA_GOVERNANCE_RAPHAEL_MAVERICK_CHICO.md`.

## Dominio

Ecossistema de desenvolvimento pessoal e profissional (Poker, Psicologia, Tecnologia).

## Publico-alvo

Raphael Vitoi e seus alunos/clientes de Poker e Psicologia.

## Fontes Autorizadas

- DeepSolver
- GTOWizard
- Mathematics of Poker (Bill Chen)

## Terminologia Confirmada

- Workflow v5: Sistema de agentes com fila de tarefas (tasks.json), pipeline harmônica com 17 agentes.
- GitHub Copilot: Identidade técnica principal do sistema de IA.
- Chico: Codinome operacional de GitHub Copilot.
- Gemini 3 Pro Preview: Modelo prioritário utilizado, garantindo raciocínio avançado e qualidade superior.
- @curator: Novo agente de integridade do produto (ética, IP, pesquisa mercado, estética).
- @sequenciador: Orquestrador de tráfego/demanda, "número 2" operacional de alta qualidade.

## Decisoes Tomadas

- Inicializacao do Contexto do Projeto | Padronizacao para Workflow v5 | 2026-03-12 | @pesquisador
- Conclusao de manutencao estrutural | Tarefa 20260312-082951-160 finalizada | 2026-03-12 | @pesquisador
- Elevacao ao Estado da Arte | Reestruturacao harmonica com @curator | 2026-03-12 | @pesquisador
- Consolidacao do Cerebro Hibrido e God Mode 2.0 | Workflow v6.0 | 2026-03-14 | @maverick
- Instituicao das Regras Irrevogaveis: ASCII Back-end, Autonomia e Evolucao Perpetua (SOTA) | Workflow v6.2 | 2026-03-14 | CHICO
- Elevacao para Workflow v6.4: Quartetos de LLM (OpenRouter SOTA), Next.js 15 Promises e Handoff | 2026-03-14 | CHICO

## Pipeline de Agentes

**Sequencia, diagrama e integracao de cada agente:** Veja `GLOBAL_INSTRUCTIONS.md` secao "Pipeline Harmonica de Agentes" (fonte de verdade unica para operacao).

**Coerencia sistemica (matriz de validacao):** Veja `COHERENCE_MANIFEST.md` (fonte de verdade unica para integracao dos 17 agentes).

## Contexto Comportamental

**Hierarquia de leitura obrigatoria (todos os agentes):**

1. `.claude/COSMOVISAO.md` - Fundacao filosofica (ler primeiro)
2. `.claude/CLAUDE.md` - Identidade, epistemics, tom, vinculo
3. `.claude/GLOBAL_INSTRUCTIONS.md` - Regras operacionais, pipeline, principios
4. `.claude/project-context.md` (este) - Decisoes, estado, dominio
5. `.claude/DISTRIBUTION_MATRIX.md` - Autoridade entre documentos
6. `.claude/agent-memory/*/MEMORY.md` - Inteligencia acumulada individual

**Hierarquia de instrucoes:** USER (CLAUDE.md) > PROJECT (este) > AGENT (agents/*.md)

## Memoria de Agentes (Agent-Memory System)

**Localizacao:** `.claude/agent-memory/<agente-name>/MEMORY.md`

**Politica:**

- MEMORY.md criado APENAS quando agente executa tarefa real (nao vazio/placeholder)
- Conteudo obrigatorio: Acoes Realizadas, Padroes Observados, Referencias
- Cada agente atualiza sua propria memory com historico de descobertas

**Status Actual (2026-03-12):**

- ✅ **17 agentes completos** — pesquisador, prompter, curator, planner, organizador, auditor, implementor, verifier, validador, securitychief, maverick, sequenciador, skillmaster, dispatcher
- ✅ **14 MEMORY.md criados** — Cada agente tem inteligência acumulada pessoal simétrica
- ✅ **Matriz de Coerência Validada** — Todos 17 agentes refletidos em agents/, agent-memory/, project-context, GLOBAL_INSTRUCTIONS
- ✅ **Acesso Harmônico** — Cada agente absorve CLAUDE.md, GLOBAL_INSTRUCTIONS.md, project-context.md, e sua MEMORY.md
- ✅ **Sync Automático** — skillmaster sincroniza MEMORY entre agentes a cada hora (agent_sync)

## Estado Atual (2026-03-15)

- **Stack:** Next.js 16 (App Router) + React 19 + Prisma 5.22 (SQLite) + TypeScript
- **Build:** Passa com sucesso (8 rotas: 7 static, 1 dynamic)
- **Branch:** main (remote: github.com/RaphaelVitoi/projetos.git)
- **Estrutura canonica:**
  - `frontend/` - Next.js 16 (fonte de verdade do site)
  - `content/` - Material educacional futuro
  - `docs/` - Documentacao
  - `scripts/` - Scripts organizados (tests/, init/, utils/, maintenance/)
  - `queue/` - Fila de tarefas + archive/
  - Raiz: kernel operacional (do.ps1, Agent-TaskManager, nexus CLI)
- **Sistema de agentes:** 17 agentes definidos em `.claude/agents/`, 15 com agent-memory ativo
- **Linguagem principal:** Portugues (pt-BR)
- **Fila de tarefas:** `queue/tasks.json` (v1.0 schema)
- **Scripts de operacao:** `do.ps1` (enfileirar), `scripts/maintenance/cleanup.ps1` (arquivar)
- **Camada Automatica 24/7:** @skillmaster (operacoes agendadas), @sequenciador (orquestrador)
- **Backup automatico:** Configurado em `settings.local.json`

## Escalonamento de Decisoes

**Protocolo completo (cenarios, guardrails, deadlock):** Veja `LIDERANCA_GOVERNANCE_RAPHAEL_MAVERICK_CHICO.md` (fonte de verdade unica).

**Resumo:** Padrao = consultar Raphael. Escalacao e excecao rara em urgencia critica + Raphael inacessivel. Hierarquia: Agentes > CHICO > @maverick > Raphael (CEO).

## Handoff Log

> Historico detalhado de 2026-03-12 consolidado. Abaixo, apenas entradas ativas.

| Agente | Status | Data | Notas |
| ------ | ------ | ---- | ----- |
| Sistema de Agentes | OPERACIONAL | 2026-03-12 | 17 agentes definidos, 15 com agent-memory, pipeline harmonica v2.0 ativa. Triade Raphael + @maverick + CHICO formalizada. |
| Reorganizacao Projeto | COMPLETO | 2026-03-15 | Unificacao Next.js 16, limpeza git (17k para 234 arquivos tracked), branch main, build passando. |
| Auditoria .claude/ | COMPLETO | 2026-03-15 | Limpeza 420 para 55 arquivos. 9 correcoes aplicadas. Redundancia documental eliminada. |
| Redundancia documental | COMPLETO | 2026-03-15 | Pipeline, triade, escalonamento, identidade consolidados em fontes unicas (GLOBAL_INSTRUCTIONS, LIDERANCA_GOVERNANCE, CLAUDE.md). project-context.md reduzido de ~454 para ~100 linhas. |
