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

        {activeTab === 'bubble' && (
          <div>
            <h4 style={{
              fontSize: '0.65rem',
              fontWeight: 900,
              color: '#f59e0b',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              margin: '0 0 1rem 0',
            }}>
              Dissecador de Bubble Factor (BF)
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              {/* IP BF Card */}
              <div className={styles.bfCardIp}>
                <p style={{ fontSize: '0.55rem', color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 0.5rem 0', fontWeight: 800 }}>Agressor (IP)</p>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#c7d2fe', fontFamily: "'JetBrains Mono', monospace", lineHeight: 1 }}>
                  {calcBF(scenario.ipRp).toFixed(2)}x
                </div>
                <p style={{ fontSize: '0.65rem', color: '#94a3b8', margin: '0.5rem 0 0 0', lineHeight: 1.4 }}>
                  Arrisca <strong>${calcBF(scenario.ipRp).toFixed(2)}</strong> para ganhar <strong>$1.00</strong>
                </p>
              </div>

              {/* OOP BF Card */}
              <div className={styles.bfCardOop}>
                <p style={{ fontSize: '0.55rem', color: '#f43f5e', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 0.5rem 0', fontWeight: 800 }}>Defensor (OOP)</p>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fda4af', fontFamily: "'JetBrains Mono', monospace", lineHeight: 1 }}>
                  {calcBF(scenario.oopRp).toFixed(2)}x
                </div>
                <p style={{ fontSize: '0.65rem', color: '#94a3b8', margin: '0.5rem 0 0 0', lineHeight: 1.4 }}>
                  Arrisca <strong>${calcBF(scenario.oopRp).toFixed(2)}</strong> para ganhar <strong>$1.00</strong>
                </p>
              </div>
            </div>

            {/* Visual Bar Comparison */}
            <div className={styles.comparisonCard}>
              <p style={{ fontSize: '0.58rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 0.75rem 0', fontWeight: 800 }}>Assimetria de Pressão (Custo vs $1 Ganho)</p>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', color: '#818cf8', marginBottom: '0.25rem', fontWeight: 600 }}>
                  <span>Custo Agressor</span>
                  <span style={{ color: '#10b981' }}>Recompensa ($1)</span>
                </div>
                <div style={{ display: 'flex', height: '8px', borderRadius: '4px', overflow: 'hidden', background: '#1e293b' }}>
                  <div style={{ width: `${Math.min(100, (calcBF(scenario.ipRp) / (calcBF(scenario.ipRp) + 1)) * 100)}%`, background: 'linear-gradient(90deg, #4f46e5, #6366f1)' }}></div>
                  <div style={{ width: `${Math.min(100, (1 / (calcBF(scenario.ipRp) + 1)) * 100)}%`, background: 'linear-gradient(90deg, #059669, #10b981)' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', color: '#f43f5e', marginBottom: '0.25rem', fontWeight: 600 }}>
                  <span>Custo Defensor</span>
                  <span style={{ color: '#10b981' }}>Recompensa ($1)</span>
                </div>
                <div style={{ display: 'flex', height: '8px', borderRadius: '4px', overflow: 'hidden', background: '#1e293b' }}>
                  <div style={{ width: `${Math.min(100, (calcBF(scenario.oopRp) / (calcBF(scenario.oopRp) + 1)) * 100)}%`, background: 'linear-gradient(90deg, #e11d48, #f43f5e)' }}></div>
                  <div style={{ width: `${Math.min(100, (1 / (calcBF(scenario.oopRp) + 1)) * 100)}%`, background: 'linear-gradient(90deg, #059669, #10b981)' }}></div>
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.6rem', color: '#475569', fontStyle: 'italic', margin: '1rem 0 0 0', lineHeight: 1.5, textAlign: 'center' }}>
              Em Cash Games (ChipEV), o Bubble Factor é sempre 1.0 (50/50). Em torneios, a assimetria visual acima dita exatamente quem é o predador e quem é a presa no pós-flop.
            </p>
          </div>
        )}

        {activeTab === 'spr' && (
          <SprPipeline stages={scenario.sprData} activeStage={0} />
        )}

        {activeTab === 'exploit' && (
          <div>
            <h4 style={{
              fontSize: '0.65rem',
              fontWeight: 900,
              color: '#10b981',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              margin: '0 0 1rem 0',
            }}>
              Vetores de Exploit
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {scenario.exploit.map((item, idx) => (
                <div
                  key={idx}
                  className={styles.exploitItem}
                >
                  <span style={{
                    color: '#10b981',
                    fontWeight: 900,
                    fontSize: '0.75rem',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}>
                    {idx + 1}.
                  </span>
                  <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                    {item}
                  </p>
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
