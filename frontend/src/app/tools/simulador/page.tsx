/**
 * IDENTITY: Motor ICM — Página de Entrada
 * PATH: src/app/tools/simulador/page.tsx
 * ROLE: Apresentação didática do simulador e ponto de entrada do MasterSimulator.
 * BINDING: [SimuladorICM.tsx → MasterSimulator.tsx]
 */

import SimuladorICM from '@/components/SimuladorICM';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Motor ICM | TrueICM',
  description: 'Visualize como o ICM distorce as frequências de equilíbrio GTO em cenários reais de torneio. Calcule Risk Premium, Bubble Factor e ajuste cada ação em tempo real.',
};

export default function SimuladorPage() {
  return (
    <main style={{ minHeight: '100vh', paddingBottom: '5rem' }}>
      <header className="page-header" style={{ paddingTop: '5rem', paddingBottom: '3rem' }}>
        <div className="container">
          <p className="page-label">
            <span className="fa-solid fa-flask" /> Motor ICM
          </p>
          <h1 style={{
            background: 'linear-gradient(135deg, #fff 0%, #fca5a5 50%, #a5b4fc 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Geometria do Risco
          </h1>

          {/* Síntese didática */}
          <div style={{
            maxWidth: '640px',
            margin: '2rem auto 0',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            textAlign: 'left',
          }}>
            {/* Dor central */}
            <div style={{
              background: 'rgba(99,102,241,0.08)',
              border: '1px solid rgba(99,102,241,0.2)',
              borderLeft: '3px solid #818cf8',
              borderRadius: '0 8px 8px 0',
              padding: '1rem 1.25rem',
            }}>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.7 }}>
                Você sabe as frequências de equilíbrio do solver para o spot. Chega no torneio — e percebe que elas não se aplicam diretamente, porque o ICM distorce tudo. Mas <strong style={{ color: '#e2e8f0' }}>não sabe quanto</strong>. Não sabe se deve cortar 5% ou 20% nos bluffs. Não sabe se o call vira fold ou apenas diminui. Não sabe se a ação relevante é a do IP ou do OOP.
              </p>
            </div>

            {/* O que resolve */}
            <div style={{
              background: 'rgba(15,23,42,0.6)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '8px',
              padding: '0.9rem 1.1rem',
            }}>
              <p style={{ margin: '0 0 0.6rem', fontSize: '0.58rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                O que este motor faz
              </p>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.65 }}>
                Dado um cenário pós-flop de torneio (stacks, posições), mostra o <strong style={{ color: '#e2e8f0' }}>delta concreto por ação</strong> — quanto cada frequência se desvia do equilíbrio ChipEV quando o ICM entra em cena. Não é um solver. É uma <strong style={{ color: '#e2e8f0' }}>lente sobre a distorção</strong>.
              </p>
            </div>

            {/* Como usar */}
            <div style={{
              background: 'rgba(15,23,42,0.6)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '8px',
              padding: '0.9rem 1.1rem',
            }}>
              <p style={{ margin: '0 0 0.6rem', fontSize: '0.58rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Como usar
              </p>
              <ol style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {[
                  'Escolha um cenário clínico — cada um representa uma dinâmica de stack real de MTT',
                  'Leia o Risk Premium de cada jogador: quanto maior, mais o ICM comprime a agressão',
                  'Insira as frequências do seu solver no painel de Frequências ICM',
                  'Leia a coluna Δ: um valor negativo significa que o ICM comprime essa ação — você deve executá-la menos do que o solver manda. Um valor positivo significa o oposto.',
                ].map((step, i) => (
                  <li key={i} style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.55 }}>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </header>

      <div className="container" style={{ marginTop: '1rem' }}>
        <SimuladorICM />
      </div>
    </main>
  );
}
