/**
 * IDENTITY: Tipos do Simulador Mestre ICM
 * PATH: src/components/simulator/engine/types.ts
 * ROLE: Interfaces TypeScript para o ecossistema completo do simulador.
 */

// Estágio do pipeline de dissipação de Risk Premium por street
export interface SprStage {
  name: string;
  potSize: number;
  rpValue: number;  // RP residual nesta street (% do oopRp inicial)
}

// Opção individual de quiz
export interface QuizOption {
  id?: string;
  text: string;
  correct?: boolean;
  isCorrect?: boolean;
}

// Estrutura completa de quiz
export interface Quiz {
  question: string;
  options: QuizOption[];
  explanation: string;
}

// Tipos literais para segurança em tempo de compilação
export type ScenarioColor = 'indigo' | 'rose' | 'emerald' | 'sky' | 'amber' | 'fuchsia' | 'slate';
export type ScenarioCategory = 'clinical' | 'baseline' | 'toyGame';

// Cenário completo do simulador
export interface Scenario {
  id: string;
  name: string;
  category: ScenarioCategory;
  stacks: number[];
  ipRp: number;
  oopRp: number;
  /** Posição do jogador IP (ex: "BTN", "SB (CL)") */
  ipPos: string;
  /** Arquétipo de range do IP (ex: "Inelástico (Valor Estrito)") */
  ipMorph: string;
  /** Posição do jogador OOP (ex: "BB (CL)", "Vice") */
  oopPos: string;
  /** Arquétipo de range do OOP (ex: "Defensivo Condensado") */
  oopMorph: string;
  /** Rótulo narrativo do confronto (ex: "Agressão Estrangulada") */
  verdict: string;
  narrativeTitle: string;
  narrativeSubtitle: string;
  icon: string;
  color: ScenarioColor;
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
