# Prompt de Continuidade — MasterSimulator Fase 2/2
**Data:** 2026-03-16 | **Versão:** V3 | **Sessão:** Refinamento + Inovação Simulator

---

## CONTEXTO DA SESSÃO

Esta sessão executou 3 trabalhos principais:

1. **Correção de testes** (`test_task_executor.py`): 6/6 passando
2. **Reorganização estrutural** do repositório: 147 arquivos, raiz limpa
3. **MasterSimulator Fase 1/2**: correções, refinamentos e análise de sensibilidade (inovação)

---

## ESTADO DO MASTERSIMULATOR

### Fase 1 — CONCLUÍDA (commit `9739185`)

| Arquivo | O que foi feito |
|---------|-----------------|
| `engine/types.ts` | `ScenarioColor` e `ScenarioCategory` como union types literais |
| `engine/nashSolver.ts` | Exporta `NASH_COEFFICIENTS` documentado; `Number.parseFloat`; sem zero fractions |
| `hooks/useScenario.ts` | Persistência localStorage (SSR-safe via `globalThis.window`) |
| `ui/AxiomTicker.tsx` | 15 axiomas (era 10); keys estáveis sem índice |
| `ui/ScenarioSelector.tsx` | Unicode direto em vez de `dangerouslySetInnerHTML` |
| `panels/NashPanel.tsx` | **INOVAÇÃO:** Análise de Sensibilidade — mostra delta de bluff%/defense% para +10% RP em cada lado |

### Fase 2 — PENDENTE

Implementar na próxima sessão:

#### 1. `panels/HandSimulator.tsx` — Mostrar fórmula + presets expandidos
```tsx
// Adicionar abaixo dos presets existentes:
// - Tooltip/linha com: "Equidade Req. = 33.3% + (RP × 0.7)"
// - Novos presets: ATo (58%), KJs (59%), A5s (54%), 77 (66%), 66 (63%)
// - Fonte de calibração: HRC outputs para stack médio (25-30bb)
```

#### 2. `panels/ComparisonRadar.tsx` — Botão "Limpar comparação"
```tsx
// Após o <select>, adicionar:
{compareId && (
  <button onClick={() => setCompareId('')} style={{...}}>
    Limpar
  </button>
)}
```

#### 3. `simulator.module.css` — Variáveis CSS + prefers-reduced-motion
```css
/* No topo do arquivo, antes de @keyframes: */
:root {
  --sim-color-indigo: #6366f1;
  --sim-color-rose: #e11d48;
  --sim-color-emerald: #10b981;
  --sim-bg-dark: #020617;
  --sim-bg-panel: rgba(15, 23, 42, 0.75);
  --sim-border: rgba(255, 255, 255, 0.06);
  --sim-radius-lg: 24px;
}

/* No final, após .stageContextBadge: */
@media (prefers-reduced-motion: reduce) {
  .tickerTrack { animation: none; }
  .gaugeDeathPulse { animation: none; }
  .gaugeHighRisk { animation: none; }
  .animateFadeUp { animation: none; opacity: 1; transform: none; }
}

/* Pausa no hover — acessibilidade */
.tickerWrap:hover .tickerTrack {
  animation-play-state: paused;
}
```

#### 4. `MasterSimulator.tsx` — Contexto do cenário ativo no header
```tsx
// Substituir o span "Motor Ativo" para mostrar:
// - Nome do cenário ativo
// - RP IP / RP OOP do cenário atual
// Posição: ao lado do badge verde, em linha
// Exemplo: "Paradoxo do Call | IP: 21.4% | OOP: 12.9%"
```

---

## ARQUITETURA ATUAL DO SIMULATOR

```
frontend/src/components/simulator/
├── MasterSimulator.tsx          ← Orquestrador (5 tools, lazy loading)
├── simulator.module.css         ← CSS unificado (596 linhas)
├── engine/
│   ├── types.ts                 ← ScenarioColor, ScenarioCategory (novos)
│   ├── nashSolver.ts            ← NASH_COEFFICIENTS exportado (novo)
│   └── scenarios.ts             ← 9 cenários clínicos
├── hooks/
│   ├── useScenario.ts           ← localStorage persistência (novo)
│   ├── useNashSolver.ts
│   └── useAudioFeedback.ts
├── panels/
│   ├── NashPanel.tsx            ← Análise de Sensibilidade (novo)
│   ├── EquityCalculator.tsx
│   ├── HandSimulator.tsx        ← PENDENTE Fase 2
│   ├── ComparisonRadar.tsx      ← PENDENTE Fase 2
│   ├── PayoutsPanel.tsx
│   ├── ScenarioStage.tsx
│   └── TheoryPanel.tsx
└── ui/
    ├── ScenarioSelector.tsx     ← Unicode direto (corrigido)
    ├── AxiomTicker.tsx          ← 15 axiomas (expandido)
    ├── AnimatedNumber.tsx
    ├── QuizEngine.tsx
    ├── RiskGauge.tsx
    └── SprPipeline.tsx
```

---

## OUTROS ESTADOS DO PROJETO

### Testes Python
- `test_task_executor.py`: **6/6 passando**
- Correções feitas: `import subprocess` no topo, `task_executor.Path`, `QueueManager` importado, texto sem indentação no teste de ponta a ponta

### Banco SQLite
- `queue/tasks.db`: 432 tarefas (431 completed, 1 failed) — saudável

### Raiz do Projeto
- Scripts: apenas `do.ps1`, `_env.ps1`, `_env.example.ps1` (Smart CLI + config)
- `scripts/` é fonte de verdade para todos os 55+ scripts organizados

---

## PROMPT PARA NOVA SESSÃO

Cole este texto numa nova sessão Claude Code:

---

> Estou retomando o trabalho no MasterSimulator ICM (site de poker trueICM.com).
>
> **LEIA PRIMEIRO:** `.claude/PROMPT_CONTINUIDADE_20260316_V3.md`
>
> **Estado:** Fase 1/2 do MasterSimulator está concluída (commit `9739185`).
> Preciso implementar a **Fase 2** conforme especificado no prompt de continuidade.
>
> Arquivos a modificar na Fase 2:
> 1. `frontend/src/components/simulator/panels/HandSimulator.tsx`
> 2. `frontend/src/components/simulator/panels/ComparisonRadar.tsx`
> 3. `frontend/src/components/simulator/simulator.module.css`
> 4. `frontend/src/components/simulator/MasterSimulator.tsx`
>
> Após a Fase 2, rodar `cd frontend && npm run build` para verificar que não há erros de TypeScript.
> Depois fazer commit e fechar.

---

## COMMITS DESTA SESSÃO

```
9739185  refine: MasterSimulator Fase 1/2
3880df1  cleanup: consolidar 0309.mp4 (3 cópias removidas ~57MB)
29db850  cleanup: reorganização estrutural completa do repositório
4af495e  docs: auditoria didática + prompt continuidade
5ea9a1a  fix: coeficientes Nash Solver + Death Zone ATC
```
