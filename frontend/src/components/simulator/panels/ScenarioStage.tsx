'use client';

/**
 * IDENTITY: Palco Principal do Cenário Ativo
 * PATH: src/components/simulator/panels/ScenarioStage.tsx
 * ROLE: Renderizar o confronto IP vs OOP com gauges, narrativa e feedback sonoro.
 * BINDING: [engine/types.ts, ui/RiskGauge.tsx, hooks/useAudioFeedback.ts, simulator.module.css]
 */

import React, { useEffect, useRef } from 'react';
import type { Scenario } from '../engine/types';
import RiskGauge from '../ui/RiskGauge';
import { useAudioFeedback } from '../hooks/useAudioFeedback';
import styles from '../simulator.module.css';

interface ScenarioStageProps {
  /** Cenário ativo */
  scenario: Scenario;
}

export default function ScenarioStage({
  scenario,
}: Readonly<ScenarioStageProps>) {
  const { playDeathZone, playPredatorZone } = useAudioFeedback();
  const prevScenarioRef = useRef<string>(scenario.id);

  // Feedback sonoro quando RP >= 40 (Death Zone / Predator Zone)
  useEffect(() => {
    if (prevScenarioRef.current !== scenario.id) {
      prevScenarioRef.current = scenario.id;

      if (scenario.oopRp >= 40) {
        playDeathZone(scenario.oopRp);
      }
      if (scenario.ipRp >= 40) {
        playDeathZone(scenario.ipRp);
      }
      // Se o oponente está na Death Zone, ativa Predator Mode
      if (scenario.oopRp >= 40 && scenario.ipRp < 40) {
        playPredatorZone(scenario.oopRp);
      }
      if (scenario.ipRp >= 40 && scenario.oopRp < 40) {
        playPredatorZone(scenario.ipRp);
      }
    }
  }, [scenario.id, scenario.ipRp, scenario.oopRp, playDeathZone, playPredatorZone]);

  return (
    <div className={`${styles.glassPanel} ${styles.animateFadeUp}`} style={{ padding: '1.75rem' }}>
      {/* Narrativa */}
      <div style={{ marginBottom: '1.25rem' }}>
        <h2
          className={styles.gradientText}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.3rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {scenario.narrativeTitle}
        </h2>
        <div
          className={styles.stageContextBadge}
          style={{ marginTop: '0.75rem' }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0.2rem 0.6rem',
              borderRadius: '6px',
              background: 'rgba(30, 41, 59, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              fontSize: '0.58rem',
              fontWeight: 700,
              color: '#64748b',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            {scenario.narrativeSubtitle}
          </span>
        </div>
      </div>

      {/* Grid de Gauges: IP vs OOP */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.5rem',
          marginBottom: '1.25rem',
        }}
      >
        {/* Gauge IP (Agressor) */}
        <div style={{ textAlign: 'center' }}>
          <RiskGauge
            value={scenario.ipRp}
            label="Agressor (IP)"
            color="indigo"
          />
          <p
            className={styles.dataMono}
            style={{
              fontSize: '0.7rem',
              color: '#64748b',
              marginTop: '0.5rem',
            }}
          >
            Stack: {scenario.stacks[0]}bb
          </p>
        </div>

        {/* Gauge OOP (Defensor) */}
        <div style={{ textAlign: 'center' }}>
          <RiskGauge
            value={scenario.oopRp}
            label="Defensor (OOP)"
            color="rose"
          />
          <p
            className={styles.dataMono}
            style={{
              fontSize: '0.7rem',
              color: '#64748b',
              marginTop: '0.5rem',
            }}
          >
            Stack: {scenario.stacks[1]}bb
          </p>
        </div>
      </div>
    </div>
  );
}
