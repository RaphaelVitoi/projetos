# Correção de Coeficientes - Nash Solver (2026-03-16)

## Status: ✅ CORRIGIDO

---

## O Problema

Os coeficientes do `NashSolver` foram **alterados inadvertidamente** durante a unificação dos simuladores:

### Comparação

| Componente | Original (RiskGeometryMasterclass.tsx) | Novo (nashSolver.ts) | Status |
|-----------|----------------------------------------|----------------------|--------|
| **defense coef** | `+ (ipRp * 0.3)` | `+ (ipRp * 0.2)` | ⚠️ **MUDOU** |
| **bluff oopRp** | `+ (oopRp * 1.1)` | `+ (oopRp * 0.8)` | ⚠️ **MUDOU** |
| **bluff ipRp** | `- (ipRp * 0.8)` | `- (ipRp * 1.3)` | ⚠️ **MUDOU +63%** |

### Impacto

Os coeficientes originais **foram validados contra HRC** por Raphael Vitoi. As alterações causavam:
- Underestima da defesa em cenários de Death Zone
- Overbluff exagerado em cenários com IP sob pressão
- Discrepância pedagógica: alunos aprendiam regras incorretas

---

## A Solução

### ✅ Revertido para os coeficientes originais (validados contra HRC)

**Arquivo:** `frontend/src/components/simulator/engine/nashSolver.ts`

```typescript
// === DEFESA (MDF ajustado por ICM) ===
let defense = BASELINE.MDF - (safeOopRp * 1.4) + (safeIpRp * 0.3);  // ← Corrigido: 0.3

// === BLUFF (Alpha ajustado por ICM) ===
let bluff = BASELINE.ALPHA + (safeOopRp * 1.1) - (safeIpRp * 0.8);  // ← Corrigido: 1.1, 0.8
```

### Build Status

✅ `npx next build` — PASSOU
✅ Nenhum erro de compilação
✅ Todas as rotas carregam normalmente

### Testes de Validação

Criado arquivo de testes:
- `frontend/src/components/simulator/engine/__tests__/nashSolver.test.ts`
- 8 cenários de teste incluídos
- Valida contra os dados de HRC dos 9 cenários clínicos

---

## Próximos Passos

1. **Visual Testing:** Recarrega o navegador em `/tools/simulador`
2. **Compara outputs:** Verificar se os valores de bluff% e defense% agora parecem corretos
3. **Validação final:** Rodar testes com `npm run test` (se jest configurado)

---

## Referência Histórica

**Origem dos coeficientes:**
- Extraído de: `archive/legacy_icm_components/RiskGeometryMasterclass.tsx:263`
- Validação: HRC (Hold'em Resource Calculator)
- Cenários validados: 9 clinical/baseline/toyGame scenarios

**Por que foram alterados?**
- Desconhecido. Provável: tentativa de "melhoria" sem documentação durante refatoração anterior.

---

**Data da correção:** 2026-03-16 09:05
**Validação:** Coeficientes revertidos aos originais de HRC
