'use client';

/**
 * IDENTITY: Gauge Circular de Risk Premium (SVG Puro)
 * PATH: src/components/simulator/ui/RiskGauge.tsx
 * ROLE: Renderizar o indicador circular animado de RP com zonas visuais.
 *       Port React puro do Web Component risk-gauge.js.
 * BINDING: [simulator.module.css]
 */

import React, { useMemo } from 'react';
import styles from '../simulator.module.css';

interface RiskGaugeProps {
  /** Valor do Risk Premium (0-100) */
  value: number;
  /** Label descritivo (ex: "Agressor IP") */
  label: string;
  /** Cor base do gauge (classe tailwind ou hex) */
  color: string;
}

// Caminho SVG circular padrão (raio 15.9155, centro 18)
const CIRCLE_PATH = 'M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831';

// Mapa de cores tailwind para hex
const COLOR_MAP: Record<string, string> = {
  indigo: '#6366f1',
  rose: '#e11d48',
  emerald: '#10b981',
  sky: '#0ea5e9',
  amber: '#f59e0b',
  fuchsia: '#d946ef',
  slate: '#64748b',
};

export default function RiskGauge({ value, label, color }: Readonly<RiskGaugeProps>) {
  const safeValue = Math.max(0, Math.min(100, value));
  const isDeathZone = safeValue >= 40;
  const isHighRisk = safeValue >= 25;

  // Resolução de cor
  const resolvedColor = useMemo(() => {
    if (isDeathZone) return '#ff0055';
    return COLOR_MAP[color] ?? color;
  }, [color, isDeathZone]);

  // Escala visual (max RP ~50% para drama visual proporcional)
  const dashPercent = Math.min(100, (safeValue / 50) * 100);

  // Classe de animação condicional
  const gaugeClass = isDeathZone
    ? styles.gaugeDeathPulse
    : isHighRisk
      ? styles.gaugeHighRisk
      : '';

  return (
    <div className={styles.gaugeContainer}>
      <div className={styles.gaugeWrap}>
        <svg viewBox="0 0 36 36" className={styles.gaugeSvg}>
          {/* Trilha de fundo */}
          <path
            d={CIRCLE_PATH}
            fill="none"
            stroke="rgba(30, 41, 59, 0.5)"
            strokeWidth="2"
          />
          {/* Arco de valor */}
          <path
            d={CIRCLE_PATH}
            fill="none"
            stroke={resolvedColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={`${dashPercent}, 100`}
            className={`${styles.gaugeArc} ${gaugeClass}`}
            style={{
              filter: `drop-shadow(0 0 ${isDeathZone ? '15px' : '8px'} ${resolvedColor}${isDeathZone ? '' : '80'})`,
            }}
          />
        </svg>

        {/* Texto central */}
        <div className={styles.gaugeCenterText}>
          {isDeathZone ? (
            <>
              <span
                className={styles.gaugeIcon}
                style={{ color: resolvedColor }}
                aria-label="Death Zone"
              >
                &#x2622;
              </span>
              <span
                className={styles.gaugeLabel}
                style={{ color: resolvedColor }}
              >
                CRITICAL
              </span>
            </>
          ) : (
            <>
              <span
                className={styles.gaugeValue}
                style={isHighRisk ? { color: '#ef4444' } : undefined}
              >
                {safeValue.toFixed(1)}%
              </span>
              <span
                className={styles.gaugeLabel}
                style={{ color: resolvedColor }}
              >
                R. Premium
              </span>
            </>
          )}
        </div>
      </div>

      {/* Meta info */}
      <p className={styles.gaugeMeta}>{label}</p>
      {isDeathZone && (
        <span className={styles.gaugeDeathBadge}>Death Zone</span>
      )}
    </div>
  );
}
