/**
 * IDENTITY: Hook de Seleção de Cenário
 * PATH: src/components/simulator/hooks/useScenario.ts
 * ROLE: Gerenciar estado do cenário ativo com acesso à lista completa.
 * BINDING: [engine/scenarios.ts, engine/types.ts]
 */

import { useState, useCallback } from 'react';
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
 */
export function useScenario(): UseScenarioReturn {
  const [activeId, setActiveId] = useState<string>(() => {
    // Recupera último cenário visitado (SSR-safe)
    if (globalThis.window !== undefined) {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SCENARIOS.some(s => s.id === saved)) return saved;
    }
    return SCENARIOS[0].id;
  });

  const scenario = SCENARIOS.find(s => s.id === activeId) ?? SCENARIOS[0];

  const setScenario = useCallback((id: string) => {
    const exists = SCENARIOS.some(s => s.id === id);
    if (exists) {
      setActiveId(id);
      if (globalThis.window !== undefined) {
        localStorage.setItem(STORAGE_KEY, id);
      }
    }
  }, []);

  return {
    scenario,
    setScenario,
    scenarios: SCENARIOS,
  };
}
