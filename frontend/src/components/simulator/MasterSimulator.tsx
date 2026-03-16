'use client';

/**
 * IDENTITY: Simulador Mestre ICM (Orquestrador)
 * PATH: src/components/simulator/MasterSimulator.tsx
 * ROLE: Componente raiz que compõe sidebar + main stage com todos os painéis.
 *       Unifica 4 simuladores redundantes num único estado da arte.
 * BINDING: [hooks/*, panels/*, ui/*, engine/*, simulator.module.css]
 */

import React, { useState, useCallback, lazy, Suspense } from 'react';
import { useScenario } from './hooks/useScenario';
import { useNashSolver } from './hooks/useNashSolver';
import { useAudioFeedback } from './hooks/useAudioFeedback';
import ScenarioSelector from './ui/ScenarioSelector';
import AxiomTicker from './ui/AxiomTicker';
import ScenarioStage from './panels/ScenarioStage';
import NashPanel from './panels/NashPanel';
import TheoryPanel from './panels/TheoryPanel';
import styles from './simulator.module.css';

// Lazy load para painéis secundários (performance)
const EquityCalculator = lazy(() => import('./panels/EquityCalculator'));
const HandSimulator = lazy(() => import('./panels/HandSimulator'));
const ComparisonRadar = lazy(() => import('./panels/ComparisonRadar'));
const PayoutsPanel = lazy(() => import('./panels/PayoutsPanel'));

type ActiveTool = 'scenario' | 'calculator' | 'comparison' | 'handSim' | 'payouts';

const TOOL_BUTTONS: { id: ActiveTool; label: string; icon: string }[] = [
  { id: 'scenario', label: 'Cenário', icon: 'fa-microscope' },
  { id: 'calculator', label: 'Calculadora', icon: 'fa-calculator' },
  { id: 'comparison', label: 'Comparação', icon: 'fa-chart-radar' },
  { id: 'handSim', label: 'Mão', icon: 'fa-hand' },
  { id: 'payouts', label: 'Payouts', icon: 'fa-trophy' },
];

function LoadingFallback() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem',
      color: '#475569',
      fontSize: '0.75rem',
    }}>
      Carregando...
    </div>
  );
}

export default function MasterSimulator() {
  const { scenario, setScenario, scenarios } = useScenario();
  const [aggressionFactor, setAggressionFactor] = useState(1.0);
  const [activeTool, setActiveTool] = useState<ActiveTool>('scenario');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { isMuted, toggleMute } = useAudioFeedback();

  const nash = useNashSolver(scenario.ipRp, scenario.oopRp, aggressionFactor);

  const handleScenarioSelect = useCallback((id: string) => {
    setScenario(id);
    setActiveTool('scenario');
  }, [setScenario]);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#020617',
      color: '#e2e8f0',
      overflowX: 'hidden',
    }}>
      {/* Ticker */}
      <AxiomTicker />

      {/* Header */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '1.5rem 1.5rem 0',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
        }}>
          <div>
            <h1 style={{
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              fontWeight: 900,
              margin: 0,
              letterSpacing: '-0.03em',
              background: 'linear-gradient(to right, #fff, #94a3b8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Motor ICM
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.4rem' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0.25rem 0.6rem',
                borderRadius: '6px',
                background: 'rgba(99, 102, 241, 0.15)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                fontSize: '0.55rem',
                fontWeight: 700,
                color: '#818cf8',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                Motor Ativo
              </span>
              <span style={{
                fontSize: '0.55rem',
                color: '#475569',
                fontWeight: 600,
              }}>
                {scenarios.length} cenários | Malmuth-Harville | Nash ICM
              </span>
            </div>
          </div>

          {/* Controles */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={toggleMute}
              style={{
                padding: '0.4rem 0.6rem',
                borderRadius: '8px',
                background: 'rgba(30, 41, 59, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                color: isMuted ? '#e11d48' : '#94a3b8',
                fontSize: '0.7rem',
                cursor: 'pointer',
              }}
              title={isMuted ? 'Ativar áudio' : 'Silenciar áudio'}
            >
              <i className={`fa-solid ${isMuted ? 'fa-volume-xmark' : 'fa-volume-high'}`} />
            </button>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden"
              style={{
                padding: '0.4rem 0.6rem',
                borderRadius: '8px',
                background: 'rgba(30, 41, 59, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                color: '#94a3b8',
                fontSize: '0.7rem',
                cursor: 'pointer',
              }}
            >
              <i className={`fa-solid ${sidebarOpen ? 'fa-xmark' : 'fa-bars'}`} />
            </button>
          </div>
        </div>

        {/* Tool switcher */}
        <div style={{
          display: 'flex',
          gap: '0.3rem',
          marginBottom: '1.5rem',
          overflowX: 'auto',
          paddingBottom: '4px',
        }}>
          {TOOL_BUTTONS.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              style={{
                padding: '0.5rem 0.8rem',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.6rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.3s ease',
                background: activeTool === tool.id
                  ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(99, 102, 241, 0.1))'
                  : 'rgba(30, 41, 59, 0.4)',
                color: activeTool === tool.id ? '#fff' : '#64748b',
                boxShadow: activeTool === tool.id
                  ? '0 2px 12px rgba(99, 102, 241, 0.2)'
                  : 'none',
              }}
            >
              <i className={`fa-solid ${tool.icon}`} style={{ fontSize: '0.55rem' }} />
              {tool.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main layout: Sidebar + Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.5rem 3rem',
        display: 'grid',
        gridTemplateColumns: sidebarOpen ? 'minmax(280px, 320px) 1fr' : '1fr',
        gap: '1.5rem',
        alignItems: 'start',
      }}>
        {/* Sidebar */}
        {sidebarOpen && (
          <aside style={{ position: 'sticky', top: '1rem' }}>
            <ScenarioSelector
              scenarios={scenarios}
              activeId={scenario.id}
              onSelect={handleScenarioSelect}
            />
          </aside>
        )}

        {/* Main content */}
        <main style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: 0 }}>
          {activeTool === 'scenario' && (
            <>
              <ScenarioStage scenario={scenario} />
              <NashPanel
                nash={nash}
                aggressionFactor={aggressionFactor}
                onAggressionChange={setAggressionFactor}
              />
              <TheoryPanel scenario={scenario} />
            </>
          )}

          {activeTool === 'calculator' && (
            <Suspense fallback={<LoadingFallback />}>
              <EquityCalculator />
            </Suspense>
          )}

          {activeTool === 'comparison' && (
            <Suspense fallback={<LoadingFallback />}>
              <ComparisonRadar scenarios={scenarios} currentId={scenario.id} />
            </Suspense>
          )}

          {activeTool === 'handSim' && (
            <Suspense fallback={<LoadingFallback />}>
              <HandSimulator oopRp={scenario.oopRp} />
            </Suspense>
          )}

          {activeTool === 'payouts' && (
            <Suspense fallback={<LoadingFallback />}>
              <PayoutsPanel />
            </Suspense>
          )}
        </main>
      </div>

      {/* Assinatura */}
      <footer style={{
        textAlign: 'center',
        padding: '2rem 0',
        borderTop: '1px solid rgba(255, 255, 255, 0.04)',
      }}>
        <p style={{
          fontSize: '0.6rem',
          color: '#334155',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
        }}>
          Motor ICM por Raphael Vitoi
        </p>
      </footer>
    </div>
  );
}
