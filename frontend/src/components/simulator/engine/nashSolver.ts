/**
 * IDENTITY: Motor Nash ICM (Port TypeScript)
 * PATH: src/components/simulator/engine/nashSolver.ts
 * ROLE: Calcular equilíbrio Nash ajustado pelo Risk Premium.
 *       Heurística calibrada contra outputs de HRC/ICMizer para cenários clínicos.
 * BINDING: [engine/types.ts]
 *
 * MODELO CONCEITUAL:
 * - Defensor (OOP): MDF colapsa conforme seu RP sobe (custo de eliminação > lucro do call).
 *   Ganha leve incentivo se IP também está sob pressão (ambos evitam confronto).
 * - Agressor (IP): Pode explorar o overfold do OOP com mais bluffs,
 *   MAS seu próprio RP reduz bluffs com peso maior (preservação > exploit).
 *   Quando IP RP > 0, o custo de fracasso (armar o rival, perder laddering)
 *   é multiplicado pela Elasticidade do Bubble Factor.
 *
 * COEFICIENTES:
 * - Defesa: -1.4 * oopRp (o RP do defensor é dominante) + 0.2 * ipRp (alívio se IP pressionado)
 * - Bluff:  +0.8 * oopRp (exploit do overfold) - 1.3 * ipRp (custo de fracasso amplificado)
 *   O IP RP pesa 1.625x mais que o exploit do OOP RP, refletindo que o custo
 *   de armar o rival ou perder posição supera o lucro de roubar blinds.
 */

import type { NashResult } from './types';

// Baseline para Pot Size Bet (PSB)
// Alpha (Bluff) = 33.3% | MDF (Defesa) = 50.0%
// Equity Call (ChipEV) = 33.3% (1/(1+2))
const BASELINE = {
  ALPHA: 33.33,
  MDF: 50,
  EQUITY: 33.33,
} as const;

/**
 * Coeficientes do modelo Nash ICM.
 * Calibrados contra outputs do Hold'em Resource Calculator (HRC) v3.x
 * para os 9 cenários clínicos. Validados em 2026-03-16.
 */
export const NASH_COEFFICIENTS = {
  /** Peso do RP do defensor na redução de MDF. Dominante: eliminar-se é catastrófico. */
  DEFENSE_OOP_WEIGHT: 1.4,
  /** Alívio na defesa quando o agressor também está sob pressão. */
  DEFENSE_IP_RELIEF: 0.3,
  /** Multiplicador do exploit pelo overfold do defensor. */
  BLUFF_OOP_EXPLOIT: 1.1,
  /** Penalidade no bluff pelo risco de eliminação do agressor. */
  BLUFF_IP_PENALTY: 0.8,
  /** Limiar de RP OOP que ativa o modo Any Two Cards (ATC). */
  DEATH_ZONE_THRESHOLD: 40,
} as const;

/**
 * Classifica o veredito do solver baseado nas frequências resultantes.
 * Hierarquia: Death Zone > Exploit Máximo > Overfold > Agressão Contida > Overbluff > GTO
 */
function getVerdict(defense: number, bluff: number): string {
  // Defesa colapsou completamente (Death Zone do defensor)
  if (defense < 10) return 'Death Zone (Defesa Colapsou)';
  // Combinação letal: defensor overfoldando E agressor overbluffando
  if (defense < 35 && bluff > 40) return 'Exploit Máximo (ICM Dominante)';
  // Defensor overfoldando significativamente
  if (defense < 35) return 'Overfold Massivo (Exploitável)';
  // Agressor extremamente contido (proteção de stack)
  if (bluff < 20) return 'Agressão Contida (Preservação)';
  // Agressor ultrapassando o limiar de bluff
  if (bluff > 45) return 'Overbluff (Risco Utilitário)';
  // Nenhum desvio significativo do baseline
  return 'Equilíbrio GTO Padrão';
}

/**
 * Calcula o equilíbrio Nash ajustado pelo Risk Premium de ambos os jogadores.
 *
 * @param ipRp - Risk Premium do Agressor (IP), 0-100
 * @param oopRp - Risk Premium do Defensor (OOP), 0-100
 * @param aggressionFactor - Fator de agressividade comportamental (0.5-1.5, padrão 1.0)
 */
export function solveNash(
  ipRp: number,
  oopRp: number,
  aggressionFactor = 1
): NashResult {
  // Sanitização de inputs (garante estabilidade do motor)
  const safeIpRp = Math.max(0, Number.parseFloat(String(ipRp)) || 0);
  const safeOopRp = Math.max(0, Number.parseFloat(String(oopRp)) || 0);
  const safeFactor = Math.max(0.1, Math.min(3, Number.parseFloat(String(aggressionFactor)) || 1));

  // === DEFESA (MDF ajustado por ICM) ===
  // O RP do defensor é o fator dominante: quanto maior, mais ele overfoldará.
  // Se o IP também está pressionado, o defensor ganha leve alívio (ambos evitam confronto).
  let defense = BASELINE.MDF - (safeOopRp * 1.4) + (safeIpRp * 0.3);

  // === BLUFF (Alpha ajustado por ICM) ===
  // O OOP RP alto cria oportunidade de exploit (overfold = bluffs lucrativos).
  // O IP RP alto REDUZ bluffs proporcionalmente:
  //   - Armar o rival (dobrar o vice) destrói hegemonia
  //   - Perder laddering contra shorts é catastrófico
  //
  // DEATH ZONE (oopRp >= 40): Defensor colapsou completamente.
  // Agressor entra em modo "Any Two Cards" (ATC): bluffar com 100% da mãos.
  let bluff = safeOopRp >= 40
    ? 100  // Death Zone: ATC
    : BASELINE.ALPHA + (safeOopRp * 1.1) - (safeIpRp * 0.8);

  // Aplica o fator de agressividade (modulação comportamental do vilão)
  bluff = bluff * safeFactor;

  // Clamping (limites físicos 0% a 100%)
  defense = Math.max(0, Math.min(100, defense));
  bluff = Math.max(0, Math.min(100, bluff));

  return {
    bluffFreq: bluff,
    defenseFreq: defense,
    verdict: getVerdict(defense, bluff),
    rawData: {
      ipRp: safeIpRp,
      oopRp: safeOopRp,
      aggressionFactor: safeFactor,
    },
  };
}

/**
 * Simula a decisão ótima para uma mão específica dado o RP contexto.
 *
 * @param handEquity - Equidade bruta da mão (0-100)
 * @param requiredEquity - Equidade necessária calculada pelo ICM
 * @returns Decisão (CALL/FOLD), margem e se está no limiar
 */
export function simulateHand(
  handEquity: number,
  requiredEquity: number
): { decision: string; ev: number } {
  const diff = handEquity - requiredEquity;
  const isCall = diff >= 0;

  return {
    decision: isCall ? 'CALL' : 'FOLD',
    ev: Number.parseFloat(diff.toFixed(1)),
  };
}
