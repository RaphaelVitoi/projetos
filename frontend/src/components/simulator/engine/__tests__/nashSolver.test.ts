/**
 * TESTE DE VALIDAÇÃO: NashSolver contra HRC
 * PATH: src/components/simulator/engine/__tests__/nashSolver.test.ts
 *
 * Valida que os coeficientes originais (0.3, 1.1, 0.8) geram
 * resultados consistentes com os cenários clínicos.
 */

import { solveNash } from '../nashSolver';

describe('NashSolver - Validação contra HRC', () => {

  test('Baseline (ChipEV): RP=0,0 deve retornar 33.3% bluff, 50% defense', () => {
    const result = solveNash(0, 0, 1.0);
    expect(result.bluffFreq).toBeCloseTo(33.3, 1);
    expect(result.defenseFreq).toBeCloseTo(50.0, 1);
    expect(result.verdict).toBe('Equilíbrio GTO Padrão');
  });

  test('Paradoxo: ipRp=21.4, oopRp=12.9 deve ter bluff < 40%', () => {
    // BTN sofre muito (ipRp alto), deve blefar menos
    const result = solveNash(21.4, 12.9, 1.0);
    expect(result.bluffFreq).toBeLessThan(40);
    expect(result.defenseFreq).toBeGreaterThan(30);
    expect(result.verdict).toMatch(/Agressão Contida|GTO/);
  });

  test('Sniper (Death Zone): ipRp=12, oopRp=45 deve ter defense < 10% e bluff = 100%', () => {
    // OOP em Death Zone (oopRp >= 40), agressor entra em modo ATC (Any Two Cards)
    const result = solveNash(12.0, 45.0, 1.0);
    expect(result.defenseFreq).toBeLessThan(10);
    expect(result.bluffFreq).toEqual(100); // Death Zone: ATC
    expect(result.verdict).toMatch(/Death Zone/);
  });

  test('Pacto: ipRp=24.5, oopRp=23.5 deve ter ambos RP altos (evitação)', () => {
    // Ambos sofrem, ambos overfold
    const result = solveNash(24.5, 23.5, 1.0);
    expect(result.defenseFreq).toBeLessThan(40);
    expect(result.bluffFreq).toBeGreaterThan(30);
    expect(result.verdict).toMatch(/Overfold|Exploit/);
  });

  test('Batata: ipRp=15, oopRp=19.5 deve ter defense reduzido', () => {
    // OOP sofre mais (shove), deve defender menos
    const result = solveNash(15.0, 19.5, 1.0);
    expect(result.defenseFreq).toBeLessThan(45);
    expect(result.bluffFreq).toBeGreaterThan(25);
  });

  test('Agonia: ipRp=4.5, oopRp=22 - IP pode blefar mais contra condensado', () => {
    // IP tem RP baixo, OOP tem RP altíssimo (bluffcatcher)
    const result = solveNash(4.5, 22.0, 1.0);
    expect(result.bluffFreq).toBeGreaterThan(45);
    expect(result.defenseFreq).toBeLessThan(35);
    expect(result.verdict).toMatch(/Exploit Máximo|Overbluff/);
  });

  test('Agressividade: 1.5x deve aumentar bluff, 0.5x deve reduzir', () => {
    const base = solveNash(15, 20, 1.0);
    const agg = solveNash(15, 20, 1.5);
    const pass = solveNash(15, 20, 0.5);

    expect(agg.bluffFreq).toBeGreaterThan(base.bluffFreq);
    expect(pass.bluffFreq).toBeLessThan(base.bluffFreq);
    expect(agg.defenseFreq).toEqual(base.defenseFreq); // Defense não muda
  });

  test('Clamping: valores > 100 devem ser limitados', () => {
    const result = solveNash(100, 100, 1.0);
    expect(result.bluffFreq).toBeLessThanOrEqual(100);
    expect(result.defenseFreq).toBeLessThanOrEqual(100);
  });
});
