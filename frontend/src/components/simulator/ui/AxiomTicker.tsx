'use client';

/**
 * IDENTITY: Ticker Axiomático Rotativo
 * PATH: src/components/simulator/ui/AxiomTicker.tsx
 * ROLE: Exibir frases axiomáticas de poker/teoria dos jogos em scroll infinito.
 * BINDING: [simulator.module.css]
 */

import React from 'react';
import styles from '../simulator.module.css';

// Axiomas de teoria dos jogos e ICM
const AXIOMS: string[] = [
  'A responsabilidade na FT é realizar o EV monetário, não provar coragem.',
  'A diferença de RP entre jogadores é a sua Vantagem ou Desvantagem de Risco.',
  'O pós-flop no ICM foca-se em extração cirúrgica sem pulverizar alavancagem.',
  'Acumular fichas nunca é negativo. O problema é arriscá-las sem recompensa.',
  'Survival > Accumulation. A sobrevivência precede o acúmulo.',
  'O fold não é covardia; é darwinismo financeiro aplicado.',
  'Num torneio, cada decisão carrega o peso de todas as decisões futuras.',
  'A coragem sem matemática é apenas uma forma elaborada de suicídio financeiro.',
  'O ICM não pune a agressão. Pune a agressão sem fundamento utilitário.',
  'Blefar contra quem não pode pagar é imprimir dinheiro. Blefar contra quem não pode foldar é queimá-lo.',
];

export default function AxiomTicker() {
  return (
    <div className={styles.tickerWrap}>
      <div className={styles.tickerTrack}>
        {/* Duplicação para scroll infinito contínuo */}
        {[...AXIOMS, ...AXIOMS].map((axiom, idx) => (
          <span key={idx} className={styles.tickerItem}>
            <span className={styles.tickerBolt}>&#x26A1;</span>
            {axiom}
          </span>
        ))}
      </div>
    </div>
  );
}
