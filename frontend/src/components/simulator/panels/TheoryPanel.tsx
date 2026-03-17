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
import styles from '../simulator.module.css';

interface TheoryPanelProps {
  scenario: Scenario;
}

type TabId = 'theory' | 'spr' | 'exploit' | 'quiz';

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'theory', label: 'Fundamento', icon: 'fa-brain' },
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

  return (
    <div className={styles.glassPanel} style={{ padding: '1.5rem' }}>
      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.25rem',
        marginBottom: '1.5rem',
        background: 'rgba(15, 23, 42, 0.6)',
        borderRadius: '12px',
        padding: '4px',
      }}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              padding: '0.6rem 0.5rem',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.6rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              background: activeTab === tab.id
                ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(99, 102, 241, 0.1))'
                : 'transparent',
              color: activeTab === tab.id ? '#fff' : '#64748b',
              boxShadow: activeTab === tab.id
                ? 'inset 0 0 20px rgba(99, 102, 241, 0.1), 0 2px 8px rgba(0, 0, 0, 0.2)'
                : 'none',
            }}
          >
            <i className={`fa-solid ${tab.icon}`} style={{ fontSize: '0.55rem' }} />
            <span className="hidden sm:inline">{tab.label}</span>
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
                  style={{
                    background: 'rgba(16, 185, 129, 0.08)',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    borderRadius: '12px',
                    padding: '1rem 1.25rem',
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'flex-start',
                  }}
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
