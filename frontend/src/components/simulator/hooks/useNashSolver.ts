/**
 * IDENTITY: Hook do Motor Nash
 * PATH: src/components/simulator/hooks/useNashSolver.ts
 * ROLE: Encapsular o cálculo Nash em useMemo para eficiência reativa.
 * BINDING: [engine/nashSolver.ts, engine/types.ts]
 */

import { useMemo } from 'react';
import { solveNash } from '../engine/nashSolver';
import type { NashResult } from '../engine/types';

/**
 * Calcula o equilíbrio Nash ajustado por ICM de forma memoizada.
 * Recalcula apenas quando os inputs mudam.
 *
 * @param ipRp - Risk Premium do Agressor (IP)
 * @param oopRp - Risk Premium do Defensor (OOP)
 * @param aggressionFactor - Fator de agressividade (padrão 1.0)
 */
export function useNashSolver(
  ipRp: number,
  oopRp: number,
  aggressionFactor: number = 1.0
): NashResult {
  return useMemo(
    () => solveNash(ipRp, oopRp, aggressionFactor),
    [ipRp, oopRp, aggressionFactor]
  );
}
