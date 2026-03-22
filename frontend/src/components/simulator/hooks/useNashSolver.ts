import { useMemo } from 'react';
import { solveNash } from '../engine/nashSolver';
import type { NashResult, ChipEvFreqs } from '../engine/types';

export function useNashSolver(
  ipRp: number,
  oopRp: number,
  chipEvFreqs: ChipEvFreqs,
  aggressionFactor = 1,
): NashResult {
  return useMemo(
    () => solveNash(ipRp, oopRp, chipEvFreqs, aggressionFactor),
    [ipRp, oopRp, chipEvFreqs, aggressionFactor],
  );
}
