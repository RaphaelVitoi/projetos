'use client';

/**
 * IDENTITY: Painel de Teoria com Tabs
 * PATH: src/components/simulator/panels/TheoryPanel.tsx
 * ROLE: Exibir Fundamento Teórico, Diluição SPR, Vetor de Exploit e Quiz por cenário.
 * BINDING: [engine/types.ts, ui/SprPipeline.tsx, ui/QuizEngine.tsx, simulator.module.css]
 */

import React, { useState, useEffect } from 'react';
import type { Scenario } from '../engine/types';
import SprPipeline from '../ui/SprPipeline';
import QuizEngine from '../ui/QuizEngine';
import RangeMatrix from './RangeMatrix';
import styles from '../simulator.module.css';

interface TheoryPanelProps {
  scenario: Scenario;
}

type TabId = 'theory' | 'ranges' | 'bubble' | 'spr' | 'exploit' | 'quiz';

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'theory', label: 'Fundamento', icon: 'fa-brain' },
  { id: 'ranges', label: 'Ranges (13x13)', icon: 'fa-table-cells' },
  { id: 'bubble', label: 'Bubble Factor', icon: 'fa-burst' },
  { id: 'spr', label: 'Dissipação RP', icon: 'fa-arrow-trend-down' },
  { id: 'exploit', label: 'Exploit', icon: 'fa-crosshairs' },
  { id: 'quiz', label: 'Quiz', icon: 'fa-circle-question' },
];

export default function TheoryPanel({ scenario }: Readonly<TheoryPanelProps>) {
  const [activeTab, setActiveTab] = useState<TabId>('theory');

  // Reset tab ao mudar cenário
  useEffect(() => {
    setActiveTab('theory');
  }, [scenario.id]);

  // Cálculos do Bubble Factor
  const calcBF = (rp: number) => {
    if (rp >= 100) return 999; // Evitar infinito que quebra UI
    return 100 / (100 - rp);
  };

  return (
    <div className={styles.glassPanel} style={{ padding: '1.5rem' }}>
      {/* Tabs */}
      <div className={styles.tabsContainer}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${styles.tabBtn} ${activeTab === tab.id ? styles.tabBtnActive : ''}`}
          >
            <i className={`fa-solid ${tab.icon}`} style={{ fontSize: '0.55rem' }} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Conteúdo por tab */}
      <div className={styles.animateFadeUp} key={`${scenario.id}-${activeTab}`}>
        {activeTab === 'theory' && (
          <div
            style={{ color: '#cbd5e1', lineHeight: 1.7, fontSize: '0.95rem' }}
            dangerouslySetInnerHTML={{ __html: scenario.theory }}
          />
        )}

        {activeTab === 'ranges' && (
          <RangeMatrix ipRp={scenario.ipRp} oopRp={scenario.oopRp} scenarioId={scenario.id} />
        )}

        {activeTab === 'bubble' && (() => {
          const ipBf = calcBF(scenario.ipRp);
          const oopBf = calcBF(scenario.oopRp);
          const deltaRp = scenario.ipRp - scenario.oopRp;
          // Equity para pot-sized call (delta vs ChipEV 33.3%)
          const ipEquity  = ipBf  / (ipBf  + 2);
          const oopEquity = oopBf / (oopBf + 2);
          const chipEvEquity = 1 / 3;
          const ipDelta   = ((ipEquity  - chipEvEquity) * 100).toFixed(1);
          const oopDelta  = ((oopEquity - chipEvEquity) * 100).toFixed(1);

          const hasIpAdvantage = deltaRp < 0;
          const deltaLabel = hasIpAdvantage
            ? `IP tem Vantagem de Risco (ΔRP ${Math.abs(deltaRp).toFixed(1)}%)`
            : deltaRp > 0
              ? `IP mais constrangido (ΔRP +${deltaRp.toFixed(1)}%)`
              : 'RP simétrico — pressão igual';

          return (
            <div>
              <h4 style={{ fontSize: '0.65rem', fontWeight: 900, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.15em', margin: '0 0 1rem 0' }}>
                Bubble Factor — Multiplicador de Risco ICM
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                {/* IP BF Card */}
                <div className={styles.bfCardIp}>
                  <p style={{ fontSize: '0.55rem', color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 0.25rem 0', fontWeight: 800 }}>Agressor (IP) · RP {scenario.ipRp.toFixed(1)}%</p>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#c7d2fe', fontFamily: "'JetBrains Mono', monospace", lineHeight: 1 }}>
                    {ipBf.toFixed(2)}x
                  </div>
                  <p style={{ fontSize: '0.6rem', color: '#94a3b8', margin: '0.5rem 0 0 0', lineHeight: 1.45 }}>
                    Pot-sized call:<br />
                    <span style={{ color: '#c7d2fe', fontWeight: 700 }}>{(ipEquity * 100).toFixed(1)}% equity</span>
                    <span style={{ color: '#475569' }}> vs 33.3% ChipEV</span><br />
                    <span style={{ color: '#f43f5e', fontSize: '0.55rem' }}>+{ipDelta}pp acima do MDF</span>
                  </p>
                </div>

                {/* OOP BF Card */}
                <div className={styles.bfCardOop}>
                  <p style={{ fontSize: '0.55rem', color: '#f43f5e', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 0.25rem 0', fontWeight: 800 }}>Defensor (OOP) · RP {scenario.oopRp.toFixed(1)}%</p>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fda4af', fontFamily: "'JetBrains Mono', monospace", lineHeight: 1 }}>
                    {oopBf.toFixed(2)}x
                  </div>
                  <p style={{ fontSize: '0.6rem', color: '#94a3b8', margin: '0.5rem 0 0 0', lineHeight: 1.45 }}>
                    Pot-sized call:<br />
                    <span style={{ color: '#fda4af', fontWeight: 700 }}>{(oopEquity * 100).toFixed(1)}% equity</span>
                    <span style={{ color: '#475569' }}> vs 33.3% ChipEV</span><br />
                    <span style={{ color: '#f43f5e', fontSize: '0.55rem' }}>+{oopDelta}pp acima do MDF</span>
                  </p>
                </div>
              </div>

              {/* ΔRP Badge */}
              <div style={{
                background: hasIpAdvantage ? 'rgba(16,185,129,0.08)' : deltaRp > 0 ? 'rgba(244,63,94,0.08)' : 'rgba(100,116,139,0.08)',
                border: `1px solid ${hasIpAdvantage ? 'rgba(16,185,129,0.25)' : deltaRp > 0 ? 'rgba(244,63,94,0.25)' : 'rgba(100,116,139,0.2)'}`,
                borderRadius: '6px',
                padding: '0.65rem 0.85rem',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
              }}>
                <span style={{ fontSize: '1rem', fontWeight: 900, color: hasIpAdvantage ? '#10b981' : deltaRp > 0 ? '#f43f5e' : '#64748b', fontFamily: "'JetBrains Mono', monospace" }}>
                  {deltaRp > 0 ? '+' : ''}{deltaRp.toFixed(1)}%
                </span>
                <span style={{ fontSize: '0.6rem', color: '#94a3b8', lineHeight: 1.4 }}>
                  <strong style={{ color: '#e2e8f0', display: 'block', fontSize: '0.62rem' }}>ΔRP (IP − OOP)</strong>
                  {deltaLabel}
                </span>
              </div>

              {/* Visual Bar Comparison */}
              <div className={styles.comparisonCard}>
                <p style={{ fontSize: '0.58rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 0.75rem 0', fontWeight: 800 }}>Assimetria de Pressão — Equity Necessária por Jogador</p>

                <div style={{ marginBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.58rem', color: '#818cf8', marginBottom: '0.2rem', fontWeight: 600 }}>
                    <span>IP · ICM {(ipEquity * 100).toFixed(1)}%</span>
                    <span style={{ color: '#475569' }}>ChipEV 33.3%</span>
                  </div>
                  <div style={{ display: 'flex', height: '7px', borderRadius: '4px', overflow: 'hidden', background: '#1e293b', position: 'relative' }}>
                    <div style={{ width: `${(ipEquity) * 100}%`, background: 'linear-gradient(90deg, #4f46e5, #6366f1)', transition: 'width 0.4s ease' }} />
                    {/* Marcador ChipEV */}
                    <div style={{ position: 'absolute', left: '33.3%', top: 0, bottom: 0, width: '1px', background: 'rgba(255,255,255,0.3)' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.58rem', color: '#f43f5e', marginBottom: '0.2rem', fontWeight: 600 }}>
                    <span>OOP · ICM {(oopEquity * 100).toFixed(1)}%</span>
                    <span style={{ color: '#475569' }}>ChipEV 33.3%</span>
                  </div>
                  <div style={{ display: 'flex', height: '7px', borderRadius: '4px', overflow: 'hidden', background: '#1e293b', position: 'relative' }}>
                    <div style={{ width: `${(oopEquity) * 100}%`, background: 'linear-gradient(90deg, #e11d48, #f43f5e)', transition: 'width 0.4s ease' }} />
                    <div style={{ position: 'absolute', left: '33.3%', top: 0, bottom: 0, width: '1px', background: 'rgba(255,255,255,0.3)' }} />
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '0.58rem', color: '#334155', fontStyle: 'italic', margin: '0.85rem 0 0 0', lineHeight: 1.55, textAlign: 'center' }}>
                BF = 1/(1−RP). A linha branca marca 33.3% (MDF ChipEV para pot-sized bet). Cada ponto percentual acima é equity que o ICM extorque antes do showdown.
              </p>
            </div>
          );
        })()}

        {activeTab === 'spr' && (
          <SprPipeline stages={scenario.sprData} activeStage={0} />
        )}

        {activeTab === 'exploit' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <h4 style={{ fontSize: '0.65rem', fontWeight: 900, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.15em', margin: 0 }}>
                Vetores de Exploit
              </h4>
              <span style={{ fontSize: '0.52rem', fontWeight: 700, color: '#475569', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '4px', padding: '2px 6px' }}>
                {scenario.exploit.length} vetor{scenario.exploit.length !== 1 ? 'es' : ''}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {scenario.exploit.map((item, idx) => (
                <div key={idx} className={styles.exploitItem} style={{ borderLeft: '2px solid rgba(16,185,129,0.4)', paddingLeft: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                    <span style={{ color: '#10b981', fontWeight: 900, fontSize: '0.65rem', flexShrink: 0, marginTop: '2px', background: 'rgba(16,185,129,0.12)', borderRadius: '4px', padding: '1px 6px', fontFamily: "'JetBrains Mono', monospace" }}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <p style={{ color: '#cbd5e1', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
                      {item}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'quiz' && (
          <QuizEngine quiz={scenario.quiz} />
        )}
      </div>
    </div>
  );
}
