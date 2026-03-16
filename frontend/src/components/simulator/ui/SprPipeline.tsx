'use client';

/**
 * IDENTITY: Pipeline Visual de SPR (Stack-to-Pot Ratio)
 * PATH: src/components/simulator/ui/SprPipeline.tsx
 * ROLE: Renderizar 4 nós (PRE -> FLOP -> TURN -> RIVER) com decay visual do RP.
 *       Visualiza a diluição do Risk Premium ao longo das streets.
 * BINDING: [engine/types.ts, simulator.module.css]
 */

import React from 'react';
import type { SprStage } from '../engine/types';
import AnimatedNumber from './AnimatedNumber';
import styles from '../simulator.module.css';

interface SprPipelineProps {
  /** Estágios do pipeline SPR */
  stages: SprStage[];
  /** Índice do estágio ativo (padrão 0 = PRE) */
  activeStage?: number;
}

// Opacidade decrescente por posição (simula decay visual)
const OPACITY_LEVELS = [1.0, 0.7, 0.5, 0.3];

export default function SprPipeline({
  stages,
  activeStage = 0,
}: Readonly<SprPipelineProps>) {
  return (
    <div className={styles.sprContainer}>
      <h4 className={styles.sprTitle}>
        Vazamento de Risk Premium (Defensor)
      </h4>

      <div className={styles.sprPipeline}>
        {/* Linha conectora */}
        <div className={styles.sprLine} />

        {stages.map((stage, idx) => {
          const isActive = idx === activeStage;
          const opacity = OPACITY_LEVELS[idx] ?? 0.3;

          return (
            <div
              key={stage.name}
              className={`${styles.sprNode} ${isActive ? styles.sprNodeActive : ''}`}
              style={{ opacity: isActive ? 1 : opacity }}
            >
              <span className={styles.sprNodeLabel}>{stage.name}</span>
              <span className={styles.sprNodeValue}>
                <AnimatedNumber
                  value={stage.sprValue}
                  suffix=""
                  decimals={1}
                />
              </span>
              <span className={styles.sprNodePot}>
                Pot: {stage.potSize.toFixed(1)}bb
              </span>
            </div>
          );
        })}
      </div>

      <p className={styles.sprCaption}>
        &ldquo;Ao chegar no river com SPR menor que 1, a matemática força o
        jogador a reverter grande parte da sua decisão para ChipEV
        clássico.&rdquo;
      </p>
    </div>
  );
}
