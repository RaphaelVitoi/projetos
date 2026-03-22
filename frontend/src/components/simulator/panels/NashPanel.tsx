'use client';

/**
 * IDENTITY: Painel de Frequências ICM Pós-Flop (Opção B)
 * PATH: src/components/simulator/panels/NashPanel.tsx
 * ROLE: Editar ChipEV freqs e visualizar distorção ICM por ação.
 *       6 ações: center% ± spread e delta vs ChipEV.
 * BINDING: [engine/types.ts, engine/nashSolver.ts, simulator.module.css]
 *
 * ESTILOS: todas as cores usam var(--sim-*) do simulator.module.css,
 * que por sua vez cascateiam de var(--global) do globals.css.
 * Mudanças de paleta no site propagam automaticamente.
 */

import React from 'react';
import type { NashResult, ChipEvFreqs, FreqResult } from '../engine/types';
import AnimatedNumber from '../ui/AnimatedNumber';
import styles from '../simulator.module.css';

interface NashPanelProps {
  nash: NashResult;
  chipEvFreqs: ChipEvFreqs;
  aggressionFactor: number;
  onChipEvChange: (freqs: ChipEvFreqs) => void;
  onAggressionChange: (value: number) => void;
}

// Formata delta em pontos percentuais com sinal
function fmt(delta: number): string {
  const v = delta.toFixed(0);
  return delta >= 0 ? `+${v}` : `${v}`;
}

// Cor do delta via CSS vars — propaga mudanças de paleta automaticamente
function deltaColor(delta: number): string {
  if (delta > 1)  return 'var(--sim-color-emerald)';
  if (delta < -1) return 'var(--sim-color-rose-light)';
  return 'var(--sim-text-faint)';
}

// Input numérico para frequência ChipEV
function FreqInput({
  value,
  field,
  freqs,
  onChange,
}: {
  value: number;
  field: keyof ChipEvFreqs;
  freqs: ChipEvFreqs;
  onChange: (freqs: ChipEvFreqs) => void;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
      <input
        type="number"
        min="0"
        max="100"
        step="1"
        value={value}
        aria-label={`ChipEV ${field.replaceAll('_', ' ')} (%)`}
        onChange={(e) => onChange({ ...freqs, [field]: Math.max(0, Math.min(100, Number(e.target.value) || 0)) })}
        style={{
          width: '56px',
          padding: '0.18rem 0.25rem',
          borderRadius: 'var(--radius-md, 4px)',
          background: 'var(--sim-bg-subpanel)',
          border: '1px solid var(--sim-border-light)',
          color: 'var(--sim-text-subtle)',
          fontSize: '0.68rem',
          fontFamily: 'var(--sim-font-mono)',
          fontWeight: 600,
          textAlign: 'right',
          outline: 'none',
        }}
      />
      <span style={{ fontSize: '0.52rem', color: 'var(--sim-text-dim)' }}>%</span>
    </div>
  );
}

// Linha de ação: label | chipEv input | → ICM (center ± spread) | delta
function ActionRow({
  label,
  chipEv,
  result,
  field,
  accent,
  freqs,
  onChange,
}: {
  label: string;
  chipEv: number;
  result: FreqResult;
  field: keyof ChipEvFreqs;
  accent: string;
  freqs: ChipEvFreqs;
  onChange: (freqs: ChipEvFreqs) => void;
}) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '60px 72px 24px 1fr 52px',
      alignItems: 'center',
      gap: '0.4rem',
      padding: '0.35rem 0',
      borderBottom: '1px solid rgba(255,255,255,0.03)',
    }}>
      {/* Label */}
      <span style={{
        fontSize: '0.55rem',
        fontWeight: 800,
        color: accent,
        textTransform: 'uppercase',
        letterSpacing: '0.07em',
      }}>
        {label}
      </span>

      {/* ChipEV editável */}
      <FreqInput value={chipEv} field={field} freqs={freqs} onChange={onChange} />

      {/* Seta separadora */}
      <span style={{ fontSize: '0.6rem', color: 'var(--sim-text-dim)', textAlign: 'center' }}>→</span>

      {/* ICM: center ± spread */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
        <span className={styles.dataMono} style={{
          fontSize: '0.9rem',
          fontWeight: 800,
          color: 'var(--sim-text-main)',
          letterSpacing: '-0.02em',
        }}>
          <AnimatedNumber value={result.center} suffix="%" />
        </span>
        <span style={{
          fontSize: '0.52rem',
          color: 'var(--sim-text-dim)',
          fontFamily: 'var(--sim-font-mono)',
        }}>
          ±{result.spread.toFixed(0)}
        </span>
      </div>

      {/* Delta */}
      <span style={{
        fontSize: '0.6rem',
        fontWeight: 700,
        color: deltaColor(result.delta),
        fontFamily: 'var(--sim-font-mono)',
        textAlign: 'right',
      }}>
        {fmt(result.delta)}
      </span>
    </div>
  );
}

export default function NashPanel({
  nash,
  chipEvFreqs,
  aggressionFactor,
  onChipEvChange,
  onAggressionChange,
}: Readonly<NashPanelProps>) {
  const { deltaRp, bExponent } = nash;

  const deltaSign = deltaRp >= 0 ? '+' : '';
  const deltaLabel = `${deltaSign}${deltaRp.toFixed(1)} p.p.`;
  const deltaLabelColor = deltaRp > 1
    ? 'var(--sim-color-amber)'
    : deltaRp < -1
      ? 'var(--sim-color-indigo-light)'
      : 'var(--sim-text-faint)';

  return (
    <div className={styles.glassPanel} style={{ padding: '1.25rem 1.5rem' }}>

      {/* Header: título + parâmetros do modelo */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '0.3rem',
        }}>
          <div>
            <h3 style={{
              margin: 0,
              fontSize: '0.65rem',
              fontWeight: 900,
              color: '#94a3b8',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
            }}>
              Frequências ICM
            </h3>
            <p style={{
              margin: '0.25rem 0 0',
              fontSize: '0.6rem',
              color: '#64748b',
              lineHeight: 1.45,
            }}>
              Como o ICM desloca cada ação em relação ao equilíbrio GTO base.
            </p>
          </div>

          {/* Parâmetros do modelo */}
          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', flexShrink: 0 }}>
            <span
              title="ΔRP = Vantagem de Risco (Risk Premium IP − OOP). Positivo = IP sob maior pressão ICM."
              style={{
                padding: '0.15rem 0.5rem',
                borderRadius: '4px',
                background: 'rgba(15,23,42,0.6)',
                border: '1px solid rgba(255,255,255,0.07)',
                fontSize: '0.55rem',
                fontWeight: 700,
                color: deltaLabelColor,
                fontFamily: 'var(--sim-font-mono)',
                cursor: 'help',
              }}>
              ΔRP {deltaLabel}
            </span>
            <span
              title="Expoente da curva côncava: mede como a pressão ICM amorte conforme o RP médio aumenta. Próximo de 1 = quase linear; próximo de 0 = muito côncavo."
              style={{
                padding: '0.15rem 0.5rem',
                borderRadius: '4px',
                background: 'rgba(15,23,42,0.6)',
                border: '1px solid rgba(255,255,255,0.07)',
                fontSize: '0.55rem',
                fontWeight: 700,
                color: '#475569',
                fontFamily: 'var(--sim-font-mono)',
                cursor: 'help',
              }}>
              Curv. {bExponent.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Cabeçalho das colunas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '60px 72px 24px 1fr 52px',
        gap: '0.4rem',
        marginBottom: '0.15rem',
        paddingBottom: '0.4rem',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <span style={{ fontSize: '0.5rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Ação</span>
        <span
          title="Frequência de equilíbrio do solver sem considerar o ICM (GTO puro). Edite para refletir os dados do seu spot."
          style={{ fontSize: '0.5rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'help' }}
        >
          GTO Base
        </span>
        <span />
        <span
          title="Estimativa de frequência após distorção ICM. ±margem = incerteza do modelo (cresce para spots além da âncora empírica)."
          style={{ fontSize: '0.5rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'help' }}
        >
          Com ICM  ±margem
        </span>
        <span
          title="Variação em pontos percentuais (p.p.) entre o GTO base e a estimativa ICM. Verde = ação aumentou; vermelho = ação diminuiu."
          style={{ fontSize: '0.5rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'right', cursor: 'help' }}
        >
          Δ p.p.
        </span>
      </div>

      {/* IP: ações */}
      <div style={{ marginBottom: '0.5rem' }}>
        <div style={{
          fontSize: '0.5rem',
          fontWeight: 700,
          color: '#818cf8',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          paddingTop: '0.5rem',
          paddingBottom: '0.1rem',
        }}>
          IP — Agressor (In Position)
        </div>
        <ActionRow
          label="Check"
          chipEv={chipEvFreqs.ip_check}
          result={nash.ip.check}
          field="ip_check"
          accent="var(--sim-color-indigo-light)"
          freqs={chipEvFreqs}
          onChange={onChipEvChange}
        />
        <ActionRow
          label="Bet /s"
          chipEv={chipEvFreqs.ip_bet_small}
          result={nash.ip.bet_small}
          field="ip_bet_small"
          accent="var(--sim-color-indigo-light)"
          freqs={chipEvFreqs}
          onChange={onChipEvChange}
        />
        <ActionRow
          label="Bet /l"
          chipEv={chipEvFreqs.ip_bet_large}
          result={nash.ip.bet_large}
          field="ip_bet_large"
          accent="var(--sim-color-indigo-light)"
          freqs={chipEvFreqs}
          onChange={onChipEvChange}
        />
      </div>

      {/* OOP: ações */}
      <div style={{ marginBottom: '1.1rem' }}>
        <div style={{
          fontSize: '0.5rem',
          fontWeight: 700,
          color: '#fb7185',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          paddingTop: '0.5rem',
          paddingBottom: '0.1rem',
        }}>
          OOP — Defensor (Out of Position)
        </div>
        <ActionRow
          label="Call"
          chipEv={chipEvFreqs.oop_call}
          result={nash.oop.call}
          field="oop_call"
          accent="var(--sim-color-rose-light)"
          freqs={chipEvFreqs}
          onChange={onChipEvChange}
        />
        <ActionRow
          label="Fold"
          chipEv={chipEvFreqs.oop_fold}
          result={nash.oop.fold}
          field="oop_fold"
          accent="var(--sim-color-rose-light)"
          freqs={chipEvFreqs}
          onChange={onChipEvChange}
        />
        <ActionRow
          label="Raise"
          chipEv={chipEvFreqs.oop_raise}
          result={nash.oop.raise}
          field="oop_raise"
          accent="var(--sim-color-rose-light)"
          freqs={chipEvFreqs}
          onChange={onChipEvChange}
        />
      </div>

      {/* Aggression Factor */}
      <div style={{
        background: 'var(--sim-bg-subpanel)',
        border: '1px solid var(--sim-border-light)',
        borderRadius: 'var(--sim-radius-md)',
        padding: '0.85rem 1.1rem',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
          <span style={{
            fontSize: '0.58rem',
            fontWeight: 700,
            color: 'var(--sim-text-subtle)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}>
            Fator de Agressividade
          </span>
          <span className={styles.dataMono} style={{
            fontSize: '0.8rem',
            fontWeight: 800,
            color: aggressionFactor < 0.9
              ? 'var(--sim-color-indigo-light)'
              : aggressionFactor > 1.1
                ? 'var(--sim-color-amber)'
                : 'var(--sim-color-emerald)',
            letterSpacing: '-0.02em',
          }}>
            {aggressionFactor.toFixed(1)}×
          </span>
        </div>
        <input
          type="range"
          min="0.5"
          max="1.5"
          step="0.1"
          value={aggressionFactor}
          onChange={(e) => onAggressionChange(parseFloat(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--sim-color-indigo)' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem' }}>
          <span style={{ fontSize: '0.52rem', color: 'var(--sim-text-dim)' }}>Passivo 0.5×</span>
          <span style={{ fontSize: '0.52rem', color: 'var(--sim-text-dim)' }}>GTO 1.0×</span>
          <span style={{ fontSize: '0.52rem', color: 'var(--sim-text-dim)' }}>Agressivo 1.5×</span>
        </div>
      </div>

    </div>
  );
}
