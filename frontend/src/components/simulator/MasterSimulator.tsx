'use client';

/**
 * IDENTITY: Simulador Mestre ICM (Orquestrador)
 * PATH: src/components/simulator/MasterSimulator.tsx
 * ROLE: Componente raiz que compõe sidebar + main stage com todos os painéis.
 *       Unifica 4 simuladores redundantes num único estado da arte.
 * BINDING: [hooks/*, panels/*, ui/*, engine/*, simulator.module.css]
 */

import React, { useState, useCallback, useMemo, lazy, Suspense } from 'react';
import { useScenario } from './hooks/useScenario';
import { solveNash } from './engine/nashSolver';
import ScenarioSelector from './ui/ScenarioSelector';
import ScenarioStage from './panels/ScenarioStage';
import NashPanel from './panels/NashPanel';
import TheoryPanel from './panels/TheoryPanel';
import type { ChipEvFreqs, StreetChipEvFreqs } from './engine/types';
import styles from './simulator.module.css';

// Lazy load para painéis secundários (performance)
const EquityCalculator = lazy(() => import('./panels/EquityCalculator'));

// Standby: ComparisonRadar, MatchupSelector, PayoutsPanel, RangeMatrix
// Eliminados: AICoachPanel, HandSimulator, AxiomTicker, useAudioFeedback

type ActiveTool = 'scenario' | 'calculator';

const TOOL_BUTTONS: { id: ActiveTool; label: string; icon: string }[] = [
  { id: 'scenario',   label: 'Cenário',    icon: 'fa-microscope' },
  { id: 'calculator', label: 'Calculadora ICM', icon: 'fa-calculator' },
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
  const [aggressionFactor, setAggressionFactor] = useState(1);
  const [streetFreqs, setStreetFreqs] = useState<StreetChipEvFreqs>(scenario.defaultStreetFreqs);
  const [activeTool, setActiveTool] = useState<ActiveTool>('scenario');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Escalonamento de RP por street via sprData
  // A fórmula: rpStreet = rpBase * (sprData[street].rpValue / sprData['PRE'].rpValue)
  const sprPre   = scenario.sprData.find(s => s.name === 'PRE');
  const sprFlop  = scenario.sprData.find(s => s.name === 'FLOP');
  const sprTurn  = scenario.sprData.find(s => s.name === 'TURN');
  const sprRiver = scenario.sprData.find(s => s.name === 'RIVER');

  const preRp      = sprPre?.rpValue ?? 1;
  const flopScale  = preRp > 0 ? (sprFlop?.rpValue  ?? preRp)       / preRp : 1;
  const turnScale  = preRp > 0 ? (sprTurn?.rpValue  ?? preRp * 0.5) / preRp : 0.5;
  const riverScale = preRp > 0 ? (sprRiver?.rpValue ?? preRp * 0.2) / preRp : 0.2;

  const ipRpFlop   = scenario.ipRp  * flopScale;
  const oopRpFlop  = scenario.oopRp * flopScale;
  const ipRpTurn   = scenario.ipRp  * turnScale;
  const oopRpTurn  = scenario.oopRp * turnScale;
  const ipRpRiver  = scenario.ipRp  * riverScale;
  const oopRpRiver = scenario.oopRp * riverScale;

  // Calcula Nash para as três streets em paralelo; só recalcula quando dependências mudam
  const { nashFlop, nashTurn, nashRiver } = useMemo(() => ({
    nashFlop:  solveNash(ipRpFlop,  oopRpFlop,  streetFreqs.flop,  aggressionFactor),
    nashTurn:  solveNash(ipRpTurn,  oopRpTurn,  streetFreqs.turn,  aggressionFactor),
    nashRiver: solveNash(ipRpRiver, oopRpRiver, streetFreqs.river, aggressionFactor),
  }), [ipRpFlop, oopRpFlop, ipRpTurn, oopRpTurn, ipRpRiver, oopRpRiver, streetFreqs, aggressionFactor]);

  // Mapa de RPs por street — passado ao NashPanel para exibir nos tabs
  const streetRps = {
    flop:  { ip: ipRpFlop,  oop: oopRpFlop  },
    turn:  { ip: ipRpTurn,  oop: oopRpTurn  },
    river: { ip: ipRpRiver, oop: oopRpRiver },
  };

  const handleScenarioSelect = useCallback((id: string) => {
    setScenario(id);
    setActiveTool('scenario');
    // Resetar freqs por street para o padrão do novo cenário
    const next = scenarios.find(s => s.id === id);
    if (next) setStreetFreqs(next.defaultStreetFreqs);
  }, [setScenario, scenarios]);

  // Handler tipado que atualiza apenas a street modificada
  const handleStreetFreqChange = useCallback((street: keyof StreetChipEvFreqs, freqs: ChipEvFreqs) => {
    setStreetFreqs(prev => ({ ...prev, [street]: freqs }));
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#020617',
      color: '#e2e8f0',
      overflowX: 'hidden',
    }}>
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
            <p style={{
              margin: '0.3rem 0 0',
              fontSize: '0.62rem',
              color: '#64748b',
              lineHeight: 1.4,
              maxWidth: '480px',
            }}>
              Escolha um cenário de torneio e veja como o ICM distorce as frequências de equilíbrio GTO — editando os valores base para refletir o seu spot.
            </p>
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
                color: '#94a3b8',
                fontWeight: 700,
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                {scenario.name}
              </span>
              <span style={{
                fontSize: '0.55rem',
                color: '#475569',
                fontWeight: 600,
              }}>
                IP: {scenario.ipRp.toFixed(1)}% | OOP: {scenario.oopRp.toFixed(1)}%
              </span>
            </div>
          </div>

          {/* Controles */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden"
              title={sidebarOpen ? 'Fechar menu' : 'Abrir menu'}
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
              <i className={`fa-solid ${sidebarOpen ? 'fa-xmark' : 'fa-bars'}`} aria-hidden="true" />
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
          {TOOL_BUTTONS.map((tool) => {
            const isActive = activeTool === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: '8px',
                  border: isActive
                    ? '1px solid rgba(99, 102, 241, 0.4)'
                    : '1px solid rgba(255, 255, 255, 0.05)',
                  cursor: 'pointer',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  transition: 'all 0.25s ease',
                  background: isActive ? '#1e2245' : 'rgba(15, 23, 42, 0.5)',
                  color: isActive ? '#c7d2fe' : '#475569',
                  boxShadow: isActive ? '0 2px 10px rgba(99, 102, 241, 0.15)' : 'none',
                }}
              >
                <i className={`fa-solid ${tool.icon}`} style={{ fontSize: '0.65rem' }} />
                {tool.label}
              </button>
            );
          })}
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
                nashFlop={nashFlop}
                nashTurn={nashTurn}
                nashRiver={nashRiver}
                streetFreqs={streetFreqs}
                streetRps={streetRps}
                aggressionFactor={aggressionFactor}
                onStreetFreqChange={handleStreetFreqChange}
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
