/**
 * IDENTITY: Hook de Seleção de Cenário
 * PATH: src/components/simulator/hooks/useScenario.ts
 * ROLE: Gerenciar estado do cenário ativo com acesso à lista completa.
 * BINDING: [engine/scenarios.ts, engine/types.ts]
 */

import { useState, useCallback, useEffect } from 'react';
import { SCENARIOS } from '../engine/scenarios';
import type { Scenario } from '../engine/types';

const STORAGE_KEY = 'icm_simulator_scenario';

interface UseScenarioReturn {
  scenario: Scenario;
  setScenario: (id: string) => void;
  scenarios: Scenario[];
}

/**
 * Gerencia o cenário ativo do simulador.
 * Persiste a seleção em localStorage para manter contexto entre sessões.
 * SSR-safe: servidor e cliente inicializam com SCENARIOS[0]; localStorage
 * é aplicado via useEffect após hidratação, evitando mismatch.
 */
export function useScenario(): UseScenarioReturn {
  const [activeId, setActiveId] = useState<string>(SCENARIOS[0].id);

  // Recupera último cenário após mount (pós-hidratação)
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SCENARIOS.some(s => s.id === saved)) {
      setActiveId(saved);
    }
  }, []);

  const scenario = SCENARIOS.find(s => s.id === activeId) ?? SCENARIOS[0];

  const setScenario = useCallback((id: string) => {
    const exists = SCENARIOS.some(s => s.id === id);
    if (exists) {
      setActiveId(id);
      localStorage.setItem(STORAGE_KEY, id);
    }
  }, []);

  return {
    scenario,
    setScenario,
    scenarios: SCENARIOS,
  };
}
