/**
 * IDENTITY: Derivador de Risk Premium via Bubble Factor (Perspectiva)
 * PATH: src/lib/rpDeriver.ts
 * ROLE: Conectar o motor ICM (Perspectiva/M-H) ao motor pos-flop (nashSolver).
 *       Deriva RP para IP e OOP via Bubble Factor: a razao entre o que se PERDE
 *       em ICM equity ao perder um pot vs o que se GANHA ao ganhar.
 *
 * CONCEITO CENTRAL — Bubble Factor (BF):
 *   BF(i) = ICM_loss(i) / ICM_gain(i)
 *
 *   Quando BF > 1, o jogador precisa de mais equity que pot odds para justificar um call.
 *   RP e derivado de BF: RP = 100 * (BF - 1) / BF
 *   Equivalente: BF = 100 / (100 - RP)
 *
 *   Short stack:  BF alto  → RP alto  (perder = eliminacao/catastrofe)
 *   Big stack:    BF baixo → RP baixo (perder = dano absorvivel)
 *
 *   Ambos os jogadores tem RP > 0 (a direcao correta).
 *
 * BINDING:
 *   - [src/lib/perspectiva.ts] → calculatePerspectiva (motor de equities posicionais)
 *   - [src/components/simulator/engine/nashSolver.ts] → solveNash (consumidor dos RPs)
 *
 * LIMITACOES:
 *   - BF depende do tamanho do pot de referencia. Usamos effective stack (all-in)
 *     como caso base. Para pots menores, BF e ligeiramente menor.
 *   - Com apenas 2 jogadores e 2 premios, a distorcao ICM e minima (BF ≈ 1.0).
 *     Para cenarios HU, adicionar jogadores de fundo ou usar RP manual.
 *   - RP aqui e pre-flop (stacks iniciais). RP por street requer simulacao
 *     de investimento progressivo.
 */

import { calculatePerspectiva } from './perspectiva';

// Limites razoaveis de RP para contexto pos-flop (unidade: percentual)
const RP_MIN = 0;
const RP_MAX = 60;

/** Resultado da derivacao de Risk Premium para um spot */
export interface RpDerivationResult {
  /** RP do jogador In Position (0-60) */
  ipRp: number;
  /** RP do jogador Out Of Position (0-60) */
  oopRp: number;
  /** Risk Advantage: ipRp - oopRp. Positivo = IP sob maior pressao ICM */
  deltaRp: number;
  /** RP de todos os jogadores na mesa, na mesma ordem dos stacks recebidos */
  allRps: number[];
  /** Bubble Factor de cada jogador (para diagnostico) */
  allBfs: number[];
}

/** Converte Bubble Factor em Risk Premium percentual */
function bfToRp(bf: number): number {
  if (bf <= 1) return RP_MIN;
  const rp = 100 * (bf - 1) / bf;
  return Math.max(RP_MIN, Math.min(RP_MAX, rp));
}

/**
 * Deriva Risk Premium para IP e OOP via Bubble Factor.
 *
 * Para cada jogador i no spot (IP vs OOP), simula um all-in pelo effective stack:
 *   - Se i ganha: i.stack += effStack, oponente.stack -= effStack
 *   - Se i perde: i.stack -= effStack, oponente.stack += effStack
 *   - Calcula ICM equity em ambos os cenarios via Perspectiva (M-H)
 *   - BF(i) = |ICM_loss(i)| / ICM_gain(i)
 *   - RP(i) = 100 * (BF - 1) / BF
 *
 * @param stacks    Stacks de todos os jogadores na mesa
 * @param prizes    Array de premios (1o ao N-esimo)
 * @param ipIndex   Indice do jogador IP no array stacks
 * @param oopIndex  Indice do jogador OOP no array stacks
 *
 * @returns RpDerivationResult com ipRp, oopRp, deltaRp, allRps, allBfs
 *
 * @example
 * // 4-handed FT: BTN(50) vs BB(12), shorts 8 e 9
 * const result = deriveRps([50, 12, 8, 9], [237.34, 170.96, 135.17, 109.99], 0, 1);
 * // BB (12bb, risco de eliminacao) tera RP >> BTN (50bb, absorve o golpe)
 */
export function deriveRps(
  stacks: number[],
  prizes: number[],
  ipIndex: number,
  oopIndex: number,
): RpDerivationResult | null {
  if (stacks.length < 2) {
    throw new Error('deriveRps: necessario ao menos 2 jogadores.');
  }
  if (ipIndex < 0 || ipIndex >= stacks.length) {
    throw new Error(`deriveRps: ipIndex ${ipIndex} fora do range (${stacks.length} jogadores).`);
  }
  if (oopIndex < 0 || oopIndex >= stacks.length) {
    throw new Error(`deriveRps: oopIndex ${oopIndex} fora do range (${stacks.length} jogadores).`);
  }
  if (ipIndex === oopIndex) {
    throw new Error('deriveRps: ipIndex e oopIndex devem ser distintos.');
  }

  // Effective stack: maximo que pode ser disputado entre IP e OOP
  const effStack = Math.min(stacks[ipIndex], stacks[oopIndex]);
  if (effStack <= 0) {
    return {
      ipRp: 0, oopRp: 0, deltaRp: 0,
      allRps: stacks.map(() => 0),
      allBfs: stacks.map(() => 1),
    };
  }

  // Epsilon: stack minimo para evitar edge case de eliminacao no M-H
  // (stack=0 nao recebe premio na recursao, distorcendo o BF)
  const EPS = 0.001;

  // ICM equity baseline (estado atual)
  const baseline = calculatePerspectiva(stacks, prizes);

  // Cenario: IP ganha o all-in (IP +effStack, OOP -effStack)
  const stacksIpWin = stacks.map((s, i) => {
    if (i === ipIndex) return s + effStack;
    if (i === oopIndex) return Math.max(EPS, s - effStack);
    return s;
  });

  // Cenario: OOP ganha o all-in (OOP +effStack, IP -effStack)
  const stacksOopWin = stacks.map((s, i) => {
    if (i === oopIndex) return s + effStack;
    if (i === ipIndex) return Math.max(EPS, s - effStack);
    return s;
  });

  const perspIpWin = calculatePerspectiva(stacksIpWin, prizes);
  const perspOopWin = calculatePerspectiva(stacksOopWin, prizes);

  // BF para cada jogador: |ICM_loss| / ICM_gain
  // IP ganha: IP gain, OOP loss
  // OOP ganha: OOP gain, IP loss
  const allBfs: number[] = stacks.map((_, i) => {
    // IP: gain quando IP wins, loss quando OOP wins
    if (i === ipIndex) {
      const gain = perspIpWin.equities[i] - baseline.equities[i];
      const loss = baseline.equities[i] - perspOopWin.equities[i];
      return gain > 0 ? loss / gain : 1;
    }
    // OOP: gain quando OOP wins, loss quando IP wins
    if (i === oopIndex) {
      const gain = perspOopWin.equities[i] - baseline.equities[i];
      const loss = baseline.equities[i] - perspIpWin.equities[i];
      return gain > 0 ? loss / gain : 1;
    }
    // Bystander: BF = 1 (nao esta no pot)
    return 1;
  });

  const allRps = allBfs.map(bf => bfToRp(bf));

  const ipRp = allRps[ipIndex];
  const oopRp = allRps[oopIndex];
  const deltaRp = ipRp - oopRp;

  // Se ambos BFs sao ~1.0 (sem distorcao ICM detectavel),
  // retorna null para que o consumidor use RP manual como fallback.
  // Tipico em cenarios HU com apenas 2 premios.
  const BF_THRESHOLD = 1.01;
  const ipBf = allBfs[ipIndex];
  const oopBf = allBfs[oopIndex];
  if (ipBf < BF_THRESHOLD && oopBf < BF_THRESHOLD) {
    return null;
  }

  return { ipRp, oopRp, deltaRp, allRps, allBfs };
}
