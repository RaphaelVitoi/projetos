'use client';

/**
 * IDENTITY: Pipeline Visual de Dissipação do Risk Premium
 * PATH: src/components/simulator/ui/SprPipeline.tsx
 * ROLE: Renderizar 4 nós (PRE -> FLOP -> TURN -> RIVER) com o RP residual por street.
 *       rpValue = oopRp × (remaining_stack / eff_stack) — RP que resta se colidir aqui.
 * BINDING: [engine/types.ts, simulator.module.css]
 */

import React from 'react';
import type { SprStage } from '../engine/types';
import AnimatedNumber from './AnimatedNumber';
import styles from '../simulator.module.css';

interface SprPipelineProps {
  /** Estágios do pipeline de dissipação de RP */
  stages: SprStage[];
  /** Índice do estágio ativo (padrão 0 = PRE) */
  activeStage?: number;
}

// Opacidade decrescente por posição (simula decay visual)
const OPACITY_LEVELS = [1, 0.7, 0.5, 0.3];

export default function SprPipeline({
  stages,
  activeStage = 0,
}: Readonly<SprPipelineProps>) {
  return (
    <div className={styles.sprContainer}>
      <h4 className={styles.sprTitle}>
        Dissipação do RP por Street
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
                  value={stage.rpValue}
                  suffix="%"
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
        RP exibido = custo de colisão se a decisão ocorrer nesta street.
        À medida que fichas entram no pote, a stack restante diminui e o RP
        dissipa. No river, o defensor precisa pagar mais &mdash; a dor ICM já
        foi diluída entre as streets anteriores.
      </p>
    </div>
  );
}
