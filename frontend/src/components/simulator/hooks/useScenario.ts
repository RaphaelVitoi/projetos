/**
 * IDENTITY: Hook de Seleção de Cenário
 * PATH: src/components/simulator/hooks/useScenario.ts
 * ROLE: Gerenciar estado do cenário ativo com acesso à lista completa.
 * BINDING: [engine/scenarios.ts, engine/types.ts]
 */

import { useState, useCallback } from 'react';
import { SCENARIOS } from '../engine/scenarios';
import type { Scenario } from '../engine/types';

interface UseScenarioReturn {
  scenario: Scenario;
  setScenario: (id: string) => void;
  scenarios: Scenario[];
}

/**
 * Gerencia o cenário ativo do simulador.
 * Permite trocar por ID e fornece a lista completa para navegação.
 */
export function useScenario(): UseScenarioReturn {
  const [activeId, setActiveId] = useState<string>(SCENARIOS[0].id);

  const scenario = SCENARIOS.find(s => s.id === activeId) ?? SCENARIOS[0];

  const setScenario = useCallback((id: string) => {
    // Valida que o cenário existe antes de mudar
    const exists = SCENARIOS.some(s => s.id === id);
    if (exists) {
      setActiveId(id);
    }
  }, []);

  return {
    scenario,
    setScenario,
    scenarios: SCENARIOS,
  };
}
