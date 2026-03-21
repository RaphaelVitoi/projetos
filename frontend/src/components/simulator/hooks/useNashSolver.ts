import { useMemo } from 'react';
import { solveNash } from '../engine/nashSolver';
import type { NashResult } from '../engine/types';

export function useNashSolver(ipRp: number, oopRp: number, aggressionFactor: number = 1.0): NashResult {
  return useMemo(() => {
    return solveNash(ipRp, oopRp, aggressionFactor);
  }, [ipRp, oopRp, aggressionFactor]);
}
