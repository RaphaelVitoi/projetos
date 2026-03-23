/**
 * IDENTITY: Derivador de Risk Premium via Malmuth-Harville
 * PATH: src/lib/rpDeriver.ts
 * ROLE: Conectar o motor ICM (Malmuth-Harville) ao motor pós-flop (nashSolver).
 *       Deriva automaticamente os valores de Risk Premium (RP) para IP e OOP
 *       a partir da estrutura de stacks e prêmios do torneio, eliminando a
 *       necessidade de input manual por cenário.
 *
 * CONCEITO CENTRAL — O Paradoxo ICM:
 *   RP(i) = chip_percent(i) − icm_equity_percent(i)
 *
 *   Big stack:   chip% > ICM%  →  RP positivo (cada chip vale MENOS em ICM)
 *   Short stack: chip% < ICM%  →  RP negativo antes do clamp (ICM protege o short)
 *
 *   Após clamp [0, 60]:
 *   - Short stacks ficam em RP ≈ 0 (quase nenhuma pressão ICM)
 *   - Big stacks ficam em RP alto (grande custo de colisão em ICM)
 *
 *   Isso é o inverso intuitivo: o chip leader tem o MAIOR Risk Premium porque
 *   tem mais a perder proporcionalmente em ICM do que em chip EV.
 *
 * BINDING:
 *   - [src/lib/icmEngine.ts]  → calculateMalmuthHarville (motor base)
 *   - [src/components/simulator/engine/nashSolver.ts] → solveNash (consumidor dos RPs)
 *
 * LIMITAÇÕES:
 *   - RP aqui é pré-flop (stacks iniciais do spot). RP por street não é
 *     quantificável sem range atual, board e histórico de ação.
 *   - Clamp em 60 é estimativa conservadora; spots extremos (HU final, satélite)
 *     podem exigir reavaliação do teto.
 */

import { calculateMalmuthHarville } from './icmEngine';
import type { ICMPlayer } from './icmEngine';

// Limites razoáveis de RP para o contexto pós-flop (unidade: percentual)
const RP_MIN = 0;
const RP_MAX = 60;

/** Resultado da derivação de Risk Premium para um spot de dois jogadores */
export interface RpDerivationResult {
  /** RP do jogador In Position (0–60) */
  ipRp: number;
  /** RP do jogador Out Of Position (0–60) */
  oopRp: number;
  /** Risk Advantage: ipRp − oopRp. Positivo = IP sob maior pressão ICM */
  deltaRp: number;
  /** RP de todos os jogadores na mesa, na mesma ordem dos stacks recebidos */
  allRps: number[];
}

/**
 * Deriva Risk Premium para IP e OOP a partir de stacks e estrutura de prêmios.
 *
 * @param stacks    Stacks de todos os jogadores na mesa (em qualquer unidade — fichas ou BB)
 * @param prizes    Array de prêmios do torneio, do 1º ao N-ésimo (mesma unidade monetária)
 * @param ipIndex   Índice do jogador IP dentro do array stacks
 * @param oopIndex  Índice do jogador OOP dentro do array stacks
 * @param totalPool Prize pool total (opcional). Quando fornecido, equityPercent usa o
 *                  denominador correto (pool inteiro). Quando omitido, usa soma dos prizes.
 *
 * @returns RpDerivationResult com ipRp, oopRp, deltaRp e allRps
 *
 * @example
 * // Spot: BTN 40bb, BB 55bb, dois jogadores restantes
 * // Prêmios: [700, 300] (torneio com dois pagos)
 * const result = deriveRps([40, 55], [700, 300], 0, 1);
 * // BTN (CL ≈ 42%) tem RP alto; BB (mid ≈ 58%) ICM inverte — ver paradoxo
 */
export function deriveRps(
  stacks: number[],
  prizes: number[],
  ipIndex: number,
  oopIndex: number,
  totalPool?: number,
): RpDerivationResult {
  if (stacks.length < 2) {
    throw new Error('deriveRps: é necessário ao menos 2 jogadores para calcular ICM.');
  }
  if (ipIndex < 0 || ipIndex >= stacks.length) {
    throw new Error(`deriveRps: ipIndex ${ipIndex} fora do range de stacks (${stacks.length} jogadores).`);
  }
  if (oopIndex < 0 || oopIndex >= stacks.length) {
    throw new Error(`deriveRps: oopIndex ${oopIndex} fora do range de stacks (${stacks.length} jogadores).`);
  }
  if (ipIndex === oopIndex) {
    throw new Error('deriveRps: ipIndex e oopIndex devem ser jogadores distintos.');
  }

  const totalChips = stacks.reduce((sum, s) => sum + s, 0);
  if (totalChips <= 0) {
    throw new Error('deriveRps: soma dos stacks deve ser maior que zero.');
  }

  // Constrói o array de ICMPlayer para o motor Malmuth-Harville
  const players: ICMPlayer[] = stacks.map((stack, i) => ({
    id: String(i),
    name: `P${i}`,
    stack,
  }));

  // Executa o cálculo ICM
  const icmResults = calculateMalmuthHarville(players, prizes, totalPool);

  // Deriva RP para cada jogador:
  //   chip_percent(i) = stack(i) / totalChips * 100
  //   icm_equity_percent(i) = equityPercent do resultado ICM
  //   RP(i) = chip_percent(i) − icm_equity_percent(i), clampado em [RP_MIN, RP_MAX]
  const allRps: number[] = stacks.map((stack, i) => {
    const chipPercent = (stack / totalChips) * 100;
    const icmPercent  = icmResults[i].equityPercent;
    const raw         = chipPercent - icmPercent;
    return Math.max(RP_MIN, Math.min(RP_MAX, raw));
  });

  const ipRp    = allRps[ipIndex];
  const oopRp   = allRps[oopIndex];
  const deltaRp = ipRp - oopRp;

  return { ipRp, oopRp, deltaRp, allRps };
}
