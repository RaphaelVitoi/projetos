/**
 * IDENTITY: Tipos do Simulador Mestre ICM
 * PATH: src/components/simulator/engine/types.ts
 * ROLE: Interfaces TypeScript para o ecossistema completo do simulador.
 */

// Estágio do pipeline de dissipação de Risk Premium por street
export interface SprStage {
  name: string;
  potSize: number;
  rpValue: number;
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

// Frequências ChipEV do spot — fornecidas pelo usuário via GTO Wizard ou equivalente.
// O motor aplica a distorção ICM sobre esses valores.
export interface ChipEvFreqs {
  ip_check: number;
  ip_bet_small: number;
  ip_bet_large: number;
  oop_call: number;
  oop_fold: number;
  oop_raise: number;
}

// Street pós-flop em que o cálculo de frequências ICM está sendo aplicado
export type Street = 'flop' | 'turn' | 'river';

// Frequências ChipEV segmentadas por street (flop/turn/river)
export interface StreetChipEvFreqs {
  flop: ChipEvFreqs;
  turn: ChipEvFreqs;
  river: ChipEvFreqs;
}

// Resultado de uma frequência individual: centro da distribuição + incerteza + delta
export interface FreqResult {
  /** Frequência ICM estimada — centro da distribuição */
  center: number;
  /** Spread de incerteza: cresce para configurações além da âncora empírica */
  spread: number;
  /** Distorção em relação ao ChipEV fornecido (positivo = ação aumentou) */
  delta: number;
}

// Resultado do motor ICM pós-flop
export interface NashResult {
  ip: {
    check: FreqResult;
    bet_small: FreqResult;
    bet_large: FreqResult;
  };
  oop: {
    call: FreqResult;
    fold: FreqResult;
    raise: FreqResult;
  };
  /** Risk Advantage: RP_ip - RP_oop. Positivo = IP sob maior pressão */
  deltaRp: number;
  /** Expoente b da curva côncava — transparência do modelo */
  bExponent: number;
  rawData: {
    ipRp: number;
    oopRp: number;
    chipEvFreqs: ChipEvFreqs;
  };
}

// Cenário completo do simulador
export interface Scenario {
  id: string;
  name: string;
  category: ScenarioCategory;
  stacks: number[];
  ipRp: number;
  oopRp: number;
  ipPos: string;
  ipMorph: string;
  oopPos: string;
  oopMorph: string;
  verdict: string;
  narrativeTitle: string;
  narrativeSubtitle: string;
  icon: string;
  color: ScenarioColor;
  theory: string;
  exploit: string[];
  sprData: SprStage[];
  /** Frequências ChipEV de referência por street — flop, turn, river (exemplo didático) */
  defaultStreetFreqs: StreetChipEvFreqs;
  quiz: Quiz;
}
