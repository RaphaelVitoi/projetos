/**
 * IDENTITY: Tipos do Simulador Mestre ICM
 * PATH: src/components/simulator/engine/types.ts
 * ROLE: Interfaces TypeScript para todo o ecossistema do simulador.
 */

// Estágio do pipeline SPR (Stack-to-Pot Ratio)
export interface SprStage {
  name: string;
  potSize: number;
  sprValue: number;
}

// Opção individual de quiz
export interface QuizOption {
  text: string;
  correct: boolean;
}

// Estrutura completa de quiz
export interface Quiz {
  question: string;
  options: QuizOption[];
  explanation: string;
}

// Cenário completo do simulador
export interface Scenario {
  id: string;
  name: string;
  category: 'clinical' | 'baseline' | 'toyGame';
  stacks: number[];
  ipRp: number;
  oopRp: number;
  narrativeTitle: string;
  narrativeSubtitle: string;
  icon: string;
  color: string;
  theory: string;
  exploit: string[];
  sprData: SprStage[];
  quiz: Quiz;
}

// Resultado do solver Nash ajustado por ICM
export interface NashResult {
  bluffFreq: number;
  defenseFreq: number;
  verdict: string;
  rawData: {
    ipRp: number;
    oopRp: number;
    aggressionFactor: number;
  };
}
