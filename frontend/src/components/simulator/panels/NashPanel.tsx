'use client';

/**
 * IDENTITY: Painel de Frequências Nash Dinâmicas
 * PATH: src/components/simulator/panels/NashPanel.tsx
 * ROLE: Exibir bluff%, defense%, veredito + slider de agressividade.
 * BINDING: [hooks/useNashSolver.ts, ui/AnimatedNumber.tsx, simulator.module.css]
 */

import React from 'react';
import type { NashResult } from '../engine/types';
import AnimatedNumber from '../ui/AnimatedNumber';
import styles from '../simulator.module.css';

interface NashPanelProps {
  nash: NashResult;
  aggressionFactor: number;
  onAggressionChange: (value: number) => void;
}

export default function NashPanel({
  nash,
  aggressionFactor,
  onAggressionChange,
}: Readonly<NashPanelProps>) {
  return (
    <div className={styles.glassPanel} style={{ padding: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <h3 style={{ margin: 0, fontSize: '0.65rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
          Motor Nash ICM
        </h3>
        <span style={{
          padding: '0.2rem 0.6rem',
          borderRadius: '6px',
          background: 'rgba(99, 102, 241, 0.15)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          fontSize: '0.6rem',
          fontWeight: 700,
          color: '#818cf8',
        }}>
          {nash.verdict}
        </span>
      </div>

      {/* Barras de frequência */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Bluff (Agressor) */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Alpha (Bluff)
            </span>
            <span className={styles.dataMono} style={{ fontSize: '0.85rem', fontWeight: 900, color: '#818cf8' }}>
              <AnimatedNumber value={nash.bluffFreq} suffix="%" />
            </span>
          </div>
          <div style={{ height: '6px', borderRadius: '3px', background: 'rgba(30, 41, 59, 0.8)', overflow: 'hidden' }}>
            <div
              className={styles.barTransition}
              style={{
                height: '100%',
                width: `${Math.min(100, nash.bluffFreq)}%`,
                background: 'linear-gradient(90deg, #6366f1, #818cf8)',
                borderRadius: '3px',
              }}
            />
          </div>
          <p style={{ fontSize: '0.55rem', color: '#475569', margin: '0.3rem 0 0', fontStyle: 'italic' }}>
            Baseline: 33.3% (PSB)
          </p>
        </div>

        {/* Defense (Defensor) */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              MDF (Defesa)
            </span>
            <span className={styles.dataMono} style={{ fontSize: '0.85rem', fontWeight: 900, color: '#e11d48' }}>
              <AnimatedNumber value={nash.defenseFreq} suffix="%" />
            </span>
          </div>
          <div style={{ height: '6px', borderRadius: '3px', background: 'rgba(30, 41, 59, 0.8)', overflow: 'hidden' }}>
            <div
              className={styles.barTransition}
              style={{
                height: '100%',
                width: `${Math.min(100, nash.defenseFreq)}%`,
                background: 'linear-gradient(90deg, #e11d48, #f43f5e)',
                borderRadius: '3px',
              }}
            />
          </div>
          <p style={{ fontSize: '0.55rem', color: '#475569', margin: '0.3rem 0 0', fontStyle: 'italic' }}>
            Baseline: 50.0% (PSB)
          </p>
        </div>
      </div>

      {/* Slider de agressividade */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.6)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        borderRadius: '12px',
        padding: '1rem 1.25rem',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.6rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Fator de Agressividade
          </span>
          <span className={styles.dataMono} style={{ fontSize: '0.8rem', fontWeight: 900, color: '#818cf8' }}>
            {aggressionFactor.toFixed(1)}x
          </span>
        </div>
        <input
          type="range"
          min="0.5"
          max="1.5"
          step="0.1"
          value={aggressionFactor}
          onChange={(e) => onAggressionChange(parseFloat(e.target.value))}
          style={{ width: '100%', accentColor: '#6366f1' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem' }}>
          <span style={{ fontSize: '0.5rem', color: '#475569' }}>Passivo (0.5x)</span>
          <span style={{ fontSize: '0.5rem', color: '#475569' }}>GTO (1.0x)</span>
          <span style={{ fontSize: '0.5rem', color: '#475569' }}>Agressivo (1.5x)</span>
        </div>
      </div>
    </div>
  );
}
