# Auditoria Didática - Motor ICM (2026-03-16)

## Status: 3 Problemas Críticos Identificados

---

## 🔴 PROBLEMA 1: NashSolver - Coeficientes Arbitrários Não Validados

**Localização:** `frontend/src/components/simulator/engine/nashSolver.ts:16-20`

**Coeficientes Atuais:**
```typescript
// Defesa: -1.4 * oopRp + 0.2 * ipRp
// Bluff: +0.8 * oopRp - 1.3 * ipRp
```

**Problema:**
- Comentário diz "calibrado contra HRC/ICMizer" MAS não existe validação
- Coeficientes foram escolhidos empiricamente sem documentação de origem
- Não há testes de acurácia contra dados reais de solvers profissionais
- O peso de 1.3 no ipRp (vs 0.8 no exploit) é maior, mas a justificativa pedagógica (1.625x) não corresponde à implementação

**Impacto Pedagógico:** CRÍTICO
- Um aluno segue a "matemática" do motor e aprende regras incorretas
- Os verdicts podem estar ERRADOS (ex: classificar como "GTO" algo que é "Overfold")

**Exemplos Suspeitos:**
| Cenário | ipRp | oopRp | Bluff Calculado | Veredito | Status |
|---------|------|-------|-----------------|----------|--------|
| paradoxo | 21.4 | 12.9 | 15.83% | "Agressão Contida" | ✓ Sensato |
| sniper | 12.0 | 45.0 | 53.73% | "Death Zone" | ✓ Sensato |
| chipev | 0.0 | 0.0 | 33.33% | "GTO Padrão" | ✓ Sensato |

**Recomendação:**
- [ ] Comparar outputs contra HRC/ICMizer reais em 5-10 cenários padrão
- [ ] Documentar a ORIGEM dos coeficientes (literatura? calibração manual? heurística?)
- [ ] Se não validado, adicionar disclaimer: "Heurística pedagógica, não resultado de solver"

---

## 🔴 PROBLEMA 2: HandSimulator - Fórmula de Equidade Necessária Arbitrária

**Localização:** `frontend/src/components/simulator/panels/HandSimulator.tsx:43-45`

```typescript
const requiredEquity = 33.3 + (oopRp * 0.7)
```

**Problema:**
- Coeficiente 0.7 também foi "calibrado" sem documentação
- A fórmula assume linear, mas ICM pode ser exponencial em certos ranges
- Não corresponde a nenhuma fórmula matemática padrão de ICM

**Validação Empírica (do comentário do código):**
```
RP = 40 (Death Zone): 33.3 + (40 * 0.7) = 61.3% ✓ "alinhado com 60-65%"
RP = 12 (Moderado): 33.3 + (12 * 0.7) = 41.7% ✓ "alinhado com 42%"
```

Mas: "alinhado com" não é "derivado de". Há documentação de onde vêm 60-65% e 42%?

**Impacto Pedagógico:** MODERADO-ALTO
- Um estudante COPIA a fórmula para seu study e a aplica fora do contexto
- Sem entender que é heurística, trata como "verdade absoluta"

**Recomendação:**
- [ ] Validar contra outputs reais de ICM calculators online
- [ ] Explicitar se é "aproximação linear" ou "fórmula exata"
- [ ] Adicionar nota: "Esta fórmula é válida para [range específico de RP]. Fora disso, use um calculator real"

---

## 🟡 PROBLEMA 3: Cenários - Dados de RP Não Referenciados

**Localização:** `frontend/src/components/simulator/engine/scenarios.ts`

**Dados Verificados:** ✓ Extraídos corretamente de `RiskGeometryMasterclass.tsx`

**Problema:**
- Os valores de RP (ex: paradoxo ipRp: 21.4, oopRp: 12.9) aparecem "mágicos"
- Não há explicação de COMO foram calculados
- Estudante não sabe se é resultado de HRC, simulação, ou estimativa

**Exemplos de Falta de Rastreabilidade:**
```typescript
{
  id: 'paradoxo',
  ipRp: 21.4,    // ← De onde veio exatamente esse número?
  oopRp: 12.9,   // ← Qual versão do HRC? Qual estrutura de prêmios?
}
```

**Impacto Pedagógico:** MODERADO
- Falta contexto historicamente importante
- Estudante não pode validar ou replicar

**Recomendação:**
- [ ] Adicionar footnotes aos cenários: "RP calculado via HRC v3.2, estrutura 100/60/40, stacks 40/55"
- [ ] Ou link a um arquivo externo com metodologia

---

## 🟢 OK - Validado

### icmEngine.ts (Malmuth-Harville)
✓ Algoritmo recursivo está correto
✓ Implementação padrão da literatura

### scenarios.ts (Conteúdo Didático)
✓ Narrativas são pedagogicamente sólidas
✓ Quiz estão bem estruturados
✓ Theory sections têm profundidade

### NashPanel, HandSimulator, RiskGauge
✓ Sem bugs de apresentação
✓ Animações funcionam
✓ Formatação correta

---

## Resumo de Ações Necessárias

| Problema | Impacto | Ação | Prioridade |
|----------|---------|------|-----------|
| NashSolver coefs não validados | 🔴 CRÍTICO | Validar contra HRC ou documentar como "heurística pedagógica" | P0 |
| HandSimulator fórmula não documentada | 🟡 MODERADO | Validar ou disclaimerar | P1 |
| Cenários RP sem rastreabilidade | 🟡 MODERADO | Adicionar footnotes de origem | P2 |

---

## Próximos Passos

1. **Imediato (você):** Defina qual o grau de precisão que o simulador deve ter:
   - Opção A: "Está bem, é pedagógico. Adicione disclaimers claros"
   - Opção B: "Precisa ser preciso. Valide contra HRC real"

2. **Se Opção A:** Adicione um painel "❓ Sobre a Precisão" que explique:
   - "Este motor usa heurísticas calibradas empiricamente"
   - "Não é um solver profissional (HRC/ICMizer)"
   - "Use para compreensão conceitual, não para decisões reais em torneios"

3. **Se Opção B:** Configure um teste comparativo com dados reais

---

**Auditoria concluída: 2026-03-16 08:45**
