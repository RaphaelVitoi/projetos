'use client';

/**
 * IDENTITY: Painel de Frequências Nash Dinâmicas
 * PATH: src/components/simulator/panels/NashPanel.tsx
 * ROLE: Exibir bluff%, defense%, veredito + slider de agressividade.
 * BINDING: [hooks/useNashSolver.ts, ui/AnimatedNumber.tsx, simulator.module.css]
 */

import React, { useMemo } from 'react';
import type { NashResult } from '../engine/types';
import { solveNash } from '../engine/nashSolver';
import AnimatedNumber from '../ui/AnimatedNumber';
import styles from '../simulator.module.css';

interface NashPanelProps {
  nash: NashResult;
  aggressionFactor: number;
  onAggressionChange: (value: number) => void;
}

// Delta formatado com sinal (+/-)
function formatDelta(delta: number): string {
  const fixed = delta.toFixed(1);
  return delta >= 0 ? `+${fixed}%` : `${fixed}%`;
}

export default function NashPanel({
  nash,
  aggressionFactor,
  onAggressionChange,
}: Readonly<NashPanelProps>) {
  // Análise de sensibilidade: como os resultados mudariam com +10% em cada RP
  const sensitivity = useMemo(() => {
    const { ipRp, oopRp } = nash.rawData;
    const withOopPlus = solveNash(ipRp, oopRp + 10, aggressionFactor);
    const withIpPlus  = solveNash(ipRp + 10, oopRp, aggressionFactor);
    return {
      oopPlus:  { bluff: withOopPlus.bluffFreq - nash.bluffFreq, defense: withOopPlus.defenseFreq - nash.defenseFreq },
      ipPlus:   { bluff: withIpPlus.bluffFreq  - nash.bluffFreq, defense: withIpPlus.defenseFreq  - nash.defenseFreq },
    };
  }, [nash, aggressionFactor]);

  return (
    <div className={styles.glassPanel} style={{ padding: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <h3 style={{ margin: 0, fontSize: '0.65rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
          Motor Nash ICM
        </h3>
        <span style={{
          padding: '0.15rem 0.5rem',
          borderRadius: '4px',
          background: 'rgba(99, 102, 241, 0.1)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          fontSize: '0.55rem',
          fontWeight: 700,
          color: '#818cf8',
          letterSpacing: '0.04em',
        }}>
          {nash.verdict}
        </span>
      </div>

      {/* Barras de frequência */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Bluff (Agressor) */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Alpha (Bluff)
            </span>
            <span className={styles.dataMono} style={{ fontSize: '0.95rem', fontWeight: 800, color: '#818cf8', letterSpacing: '-0.02em' }}>
              <AnimatedNumber value={nash.bluffFreq} suffix="%" />
            </span>
          </div>
          <div style={{ height: '5px', borderRadius: '3px', background: 'rgba(30, 41, 59, 0.8)', overflow: 'hidden' }}>
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
          <p style={{ fontSize: '0.58rem', color: '#475569', margin: '0.25rem 0 0', fontStyle: 'italic' }}>
            Baseline: 33.3% (PSB)
          </p>
        </div>

        {/* Defense (Defensor) */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              MDF (Defesa)
            </span>
            <span className={styles.dataMono} style={{ fontSize: '0.95rem', fontWeight: 800, color: '#e11d48', letterSpacing: '-0.02em' }}>
              <AnimatedNumber value={nash.defenseFreq} suffix="%" />
            </span>
          </div>
          <div style={{ height: '5px', borderRadius: '3px', background: 'rgba(30, 41, 59, 0.8)', overflow: 'hidden' }}>
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
          <p style={{ fontSize: '0.58rem', color: '#475569', margin: '0.25rem 0 0', fontStyle: 'italic' }}>
            Baseline: 50% (PSB)
          </p>
        </div>
      </div>

      {/* Análise de Sensibilidade — inovação pedagógica */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.5)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '12px',
        padding: '0.9rem 1.1rem',
        marginBottom: '1rem',
      }}>
        <p style={{ margin: '0 0 0.75rem', fontSize: '0.58rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
          Sensibilidade (+10% RP)
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          {/* Se RP OOP subir 10% */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '0.55rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>RP OOP +10%</span>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: sensitivity.oopPlus.bluff >= 0 ? '#818cf8' : '#f43f5e', fontFamily: "'JetBrains Mono', monospace" }}>
              Alpha: {formatDelta(sensitivity.oopPlus.bluff)}
            </span>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: sensitivity.oopPlus.defense <= 0 ? '#f43f5e' : '#10b981', fontFamily: "'JetBrains Mono', monospace" }}>
              MDF: {formatDelta(sensitivity.oopPlus.defense)}
            </span>
          </div>
          {/* Se RP IP subir 10% */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '0.55rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>RP IP +10%</span>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: sensitivity.ipPlus.bluff >= 0 ? '#818cf8' : '#f43f5e', fontFamily: "'JetBrains Mono', monospace" }}>
              Alpha: {formatDelta(sensitivity.ipPlus.bluff)}
            </span>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: sensitivity.ipPlus.defense >= 0 ? '#10b981' : '#f43f5e', fontFamily: "'JetBrains Mono', monospace" }}>
              MDF: {formatDelta(sensitivity.ipPlus.defense)}
            </span>
          </div>
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
          <span className={styles.dataMono} style={{ fontSize: '0.85rem', fontWeight: 800, color: '#818cf8', letterSpacing: '-0.02em' }}>
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
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.3rem' }}>
          <span style={{ fontSize: '0.55rem', color: '#475569' }}>Passivo (0.5x)</span>
          <span style={{ fontSize: '0.55rem', color: '#475569' }}>GTO (1.0x)</span>
          <span style={{ fontSize: '0.55rem', color: '#475569' }}>Agressivo (1.5x)</span>
        </div>
      </div>
    </div>
  );
}
