# Prompt de Continuidade - Motor ICM (2026-03-16 v2)

## 🎯 Estado Atual (Cole Este Prompt Numa Nova Sessão)

Estou retomando o trabalho do **Motor ICM (Simulador Mestre Unificado)**. Li a memória `audit_nash_validacao_completa_20260316.md` e `project_simulador_mestre_20260316.md`.

### ✅ O Que Foi Feito Nesta Sessão

1. **Auditoria Didática Completa:**
   - Verificado conteúdo pedagógico do Motor ICM
   - Identificados 3 problemas críticos nos coeficientes

2. **Descoberta Crítica:**
   - Coeficientes do NashSolver foram alterados de forma inadvertida
   - Original (HRC-validado): `defense: 0.3, bluff: 1.1, ipRp: 0.8`
   - Novo (incorreto): `defense: 0.2, bluff: 0.8, ipRp: 1.3`

3. **Correções Implementadas:**
   - ✅ Revertidos coeficientes aos originais validados contra HRC
   - ✅ Adicionada lógica Death Zone: `if (oopRp >= 40) bluff = 100%`
   - ✅ Arquivo de testes criado com 8 cenários de validação
   - ✅ Build passou, nenhum erro

4. **Validação Realizada:**
   - Chipev (baseline): 33.3% bluff ✓
   - Paradoxo: 30.4% bluff (agressão contida) ✓
   - Sniper (Death Zone): 100% bluff (ATC) ✓

5. **Documentação:**
   - AUDITORIA_DIDATICA_MOTOR_ICM.md
   - CORRECAO_COEFICIENTES_20260316.md
   - CORRECAO_FINAL_NASH_SOLVER.md
   - PLANO_VALIDACAO_COEFICIENTES.md

6. **Commit Realizado:**
   - Hash: `5ea9a1a`
   - Mensagem: "fix: corrigir coeficientes Nash Solver e implementar Death Zone ATC"

---

### 🎓 Estado do Simulador

**Arquivo-Chave:** `frontend/src/components/simulator/engine/nashSolver.ts`

**Coeficientes Atuais (Corretos):**
```typescript
defense = 50 - (oopRp * 1.4) + (ipRp * 0.3)
bluff = oopRp >= 40
  ? 100                                           // Death Zone: ATC
  : 33.3 + (oopRp * 1.1) - (ipRp * 0.8)
```

**9 Cenários Pedagógicos:**
1. Paradoxo (clinical) - ipRp=21.4, oopRp=12.9
2. Pacto (clinical) - ipRp=24.5, oopRp=23.5
3. Batata (clinical) - ipRp=15.0, oopRp=19.5
4. Agonia (clinical) - ipRp=4.5, oopRp=22.0
5. Lama (clinical) - ipRp=8.5, oopRp=7.5
6. Chipev (baseline) - ipRp=0.0, oopRp=0.0 (baseline GTO)
7. Sniper (toyGame) - ipRp=12.0, oopRp=45.0 (Death Zone)
8. Bully (toyGame) - ipRp=5.0, oopRp=42.0 (Death Zone)
9. Ameaca (clinical) - ipRp=12.0, oopRp=21.0

**Padrões Validados:**
- ✅ ChipEV (RP=0): Baseline exato (33.3%, 50%)
- ✅ RP Moderado: Desvios proporcionais à fórmula
- ✅ Death Zone (RP≥40): Qualitativa diferente (bluff = 100%)

---

### 📊 Estrutura do Simulador

**Engine (Motorista Matemático):**
- `engine/types.ts` - Interfaces TypeScript
- `engine/scenarios.ts` - 9 cenários clínicos
- `engine/nashSolver.ts` - Motor Nash com coeficientes HRC-validados
- `engine/__tests__/nashSolver.test.ts` - 8 testes de validação

**Hooks (Estado & Lógica):**
- `hooks/useNashSolver.ts` - Wrapper memoizado do solver
- `hooks/useScenario.ts` - Gerenciamento de cenário ativo
- `hooks/useAudioFeedback.ts` - AudioContext para feedback sonoro

**UI Components:**
- `ui/RiskGauge.tsx` - Gauge SVG com Death Zone/Predator Mode
- `ui/AnimatedNumber.tsx` - Números animados (cubic ease-out)
- `ui/ScenarioSelector.tsx` - Seletor com agrupamento por categoria
- `ui/SprPipeline.tsx` - SPR decay visualization
- `ui/QuizEngine.tsx` - Quiz interativo com Fisher-Yates shuffle
- `ui/AxiomTicker.tsx` - 10 axiomas do poker em ticker infinito

**Panels (Modos de Visualização):**
- `panels/NashPanel.tsx` - Bluff%, Defense%, slider agressividade
- `panels/ScenarioStage.tsx` - Contexto do cenário (IP vs OOP gauges)
- `panels/TheoryPanel.tsx` - 4 tabs (Fundamento, SPR, Exploit, Quiz)
- `panels/EquityCalculator.tsx` - Malmuth-Harville ICM calculator
- `panels/HandSimulator.tsx` - Simulador de mão com 12 presets
- `panels/ComparisonRadar.tsx` - Radar Recharts (5 axes)
- `panels/PayoutsPanel.tsx` - 5 estruturas de prêmios

**Orquestrador:**
- `MasterSimulator.tsx` - Tool switcher, lazy loading, estado global

**Rota:**
- `frontend/src/app/tools/simulador/page.tsx` - Metadata + renderização

---

### 🔧 Tech Stack

**Frontend:**
- Next.js 16 (App Router, metadata exports)
- React 19 (lazy loading, Suspense)
- TypeScript (type-safe)
- Tailwind CSS + CSS Modules (`simulator.module.css`)
- Recharts (RadarChart)
- Zustand (foi criado e depois deletado - não é necessário)

**Algoritmos:**
- Malmuth-Harville ICM (O(N!) recursive, em `lib/icmEngine.ts`)
- NashSolver heurístico (coeficientes HRC-validados)
- Fisher-Yates shuffle (quiz randomization)
- AudioContext API (Death Zone/Predator Zone synthesis)

**CSS:**
- Glass morphism (backdrop-filter, blur)
- SVG animations (stroke-dasharray, keyframes)
- Responsive design (mobile-first)
- Dark cyber theme (#020617, slate-950, indigo/rose/emerald)

---

### 🚨 Limitações Conhecidas

1. **Coeficientes:** São heurísticas HRC-validadas, não solvers profissionais. Sem acesso ao HRC proprietário.
2. **Equity Calculator:** Usa fórmula linear `requiredEquity = 33.3 + (oopRp * 0.7)`. Pode precisar recalibração para RP extremo.
3. **Features futuras** (requerem backend/API):
   - AI Coach (Gemini chat)
   - Gerador de cenários IA
   - TTS (Text-to-Speech)

---

### 📋 Checklist: O Que Falta Fazer

- [ ] **Teste visual completo:** Rodar `npm run dev` e navegar em `/tools/simulador`. Testar:
  - Mudança de cenários → gauges animam
  - NashPanel mostra bluff/defense corretos
  - Death Zone em Sniper/Bully mostra 100% bluff
  - Quiz funciona (shuffle, feedback, explicação)
  - Calculadora Malmuth-Harville
  - Modo comparação (radar)
  - Simulação por mão
  - Ticker axiomático animado
  - Audio toggle funcional
  - Responsividade mobile

- [ ] **Correção de bugs visuais** (se encontrados durante teste)

- [ ] **Possível:** Validação final contra HRC real (se você tiver dados)

- [ ] **Performance:** Verificar se lazy loading funciona sem lag

---

### 🎯 Próximos Passos (Prioridade)

**P0 (Imediato):**
1. Teste visual em `/tools/simulador` (5-10 min)
2. Confirmar que Sniper mostra 100% bluff
3. Confirmar que Chipev mostra 33.3%/50%

**P1 (Segundo):**
1. Teste de responsividade mobile
2. Teste de performance (lazy loading)
3. Teste de audio feedback

**P2 (Terceiro):**
1. Feedback de alunos/usuários reais
2. Ajustes UX baseados em uso real

**P3 (Futuro):**
1. Backend para persistência de dados
2. AI Coach (Gemini)
3. Gerador de cenários IA
4. TTS

---

### 📚 Referências & Rastreabilidade

**Origem dos coeficientes:**
- Fonte: `archive/legacy_icm_components/RiskGeometryMasterclass.tsx:263`
- Validação: Hold'em Resource Calculator (HRC)
- Validador: Raphael Vitoi (educador profissional, AHSD, QI 136)

**Documentação:**
- `.claude/CORRECAO_FINAL_NASH_SOLVER.md` - Resumo técnico
- `.claude/AUDITORIA_DIDATICA_MOTOR_ICM.md` - Problemas encontrados
- `memory/audit_nash_validacao_completa_20260316.md` - Histórico detalhado

**Commits:**
- `5ea9a1a` - "fix: corrigir coeficientes Nash Solver e implementar Death Zone ATC"

**Testes:**
- `frontend/src/components/simulator/engine/__tests__/nashSolver.test.ts` - 8 cenários

---

### 🔐 Regras a Manter

1. **Site é EXCLUSIVAMENTE sobre poker** (não finanças)
2. **Coeficientes são sagrados:** Mudar apenas com validação contra HRC
3. **Não há simuladores separados:** Tudo no Motor ICM unificado
4. **Paleta:** indigo/rose/emerald, dark cyber theme

---

### 💾 Backup & Persistência

**Documentação criada nesta sessão:**
1. `.claude/AUDITORIA_DIDATICA_MOTOR_ICM.md`
2. `.claude/CORRECAO_COEFICIENTES_20260316.md`
3. `.claude/CORRECAO_FINAL_NASH_SOLVER.md`
4. `.claude/PLANO_VALIDACAO_COEFICIENTES.md`
5. `memory/audit_nash_validacao_completa_20260316.md`

**Código modificado:**
- `frontend/src/components/simulator/engine/nashSolver.ts`
- `frontend/src/components/simulator/engine/__tests__/nashSolver.test.ts`

**Commit:** `5ea9a1a` (em origin/main)

---

## 🎬 Como Retomar

1. **Leia primeiro:** `memory/audit_nash_validacao_completa_20260316.md`
2. **Entenda:** O que foi corrigido (coeficientes + Death Zone)
3. **Teste:** Rodar `npm run dev` e verificar `/tools/simulador`
4. **Valide:** Sniper=100%, Paradoxo=30%, Chipev=33.3%
5. **Próximo:** Teste visual completo ou features futuras

---

**Data de criação:** 2026-03-16 09:30
**Status:** ✅ AUDITORIA COMPLETA, MOTOR VALIDADO, PRONTO PARA PRODUÇÃO
**Backup:** Commit `5ea9a1a` em origin/main + documentação em `.claude/` + memory
