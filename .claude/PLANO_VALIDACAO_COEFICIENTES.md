# Plano de Validação de Coeficientes - Motor ICM

## Objetivo
Validar rigorosamente os coeficientes do NashSolver e HandSimulator contra dados reais/confiáveis.

---

## Coeficientes a Validar

### NashSolver (nashSolver.ts:71-81)
```typescript
defense = 50 - (safeOopRp * 1.4) + (safeIpRp * 0.2)
bluff = 33.33 + (safeOopRp * 0.8) - (safeIpRp * 1.3)
```

**Questão:** Esses coeficientes (-1.4, +0.2, +0.8, -1.3) geram resultados corretos?

### HandSimulator (HandSimulator.tsx:44)
```typescript
requiredEquity = 33.3 + (oopRp * 0.7)
```

**Questão:** A fórmula linear é válida? Ou deveria ser quadrática/logarítmica?

---

## CAMINHO A: Validação com Dados Reais de Raphael

**Se você tem:**
- Planilha de outputs de HRC
- Screenshots de cálculos de ICMizer
- Dados históricos de mesas/turneys

**Processo:**
1. Compartilhe 5-10 cenários com RP conhecido
2. Rodo os coeficientes contra esses dados
3. Comparo os outputs do motor vs dados reais
4. Documento a margem de erro aceitável

**Tempo estimado:** 2-4 horas

---

## CAMINHO B: Validação com Fontes Públicas

**Ferramentas disponíveis online:**
1. **PokerStars ICMizer** (free, incluso)
2. **PokerCruncher** (Windows, demo/free trial)
3. **ICM+ Online** (website, pode ter restrições)
4. **Calculadoras manuais baseadas em Malmuth-Harville**

**Processo:**
1. Seleciono 6-8 cenários padrão (micro-stacks, Death Zone, chip leader, etc)
2. Calculo os RP manualmente via Malmuth-Harville (script Python)
3. Rodo contra a ferramenta online para validação cruzada
4. Aplico os coeficientes e comparo vs resultado "esperado"

**Problema:** Sem acesso ao HRC proprietário, não posso validar com 100% de certeza. Mas posso:
- Validar que os outputs são "razoáveis" (não absurdos)
- Comparar contra múltiplas fontes (PokerStars + calculadora manual)
- Documentar as limitações

**Tempo estimado:** 3-6 horas

---

## CAMINHO C: Abordagem Híbrida (Recomendada)

1. **Você fornece:** 2-3 cenários que já validou contra HRC
2. **Eu valido:** Os coeficientes contra esses dados (rápido, <1h)
3. **Se os coeficientes passam:** Considerar validados
4. **Se falham:** Executar Caminho B para recalibração

**Tempo estimado:** 1-2 horas

---

## Matriz de Decisão

| Caminho | Precisão | Tempo | Requer seu input | Recomendação |
|---------|----------|-------|------------------|--------------|
| A (Dados reais) | 🟢 100% | 2-4h | ✅ Sim | Se você tem dados |
| B (Fontes públicas) | 🟡 ~85% | 3-6h | ❌ Não | Fallback seguro |
| C (Híbrida) | 🟢 95%+ | 1-2h | ✅ Sim (2-3 cenários) | **MELHOR** |

---

## Próximo Passo

**Escolha uma opção e responda:**

**Opção A:**
- [ ] Compartilhe planilha/dados HRC (ou links)

**Opção B:**
- [ ] Autorizo você a validar usando PokerStars ICMizer + calculadora manual

**Opção C:**
- [ ] Dê-me 2-3 cenários que você já validou contra HRC real
- [ ] (Exemplo: "Cenário X: stacks [50, 30, 20], RP deveria ser [12.5, 22.0, 31.5]")

---

**Documento criado:** 2026-03-16 08:50
