/**
 * IDENTITY: Página ICM Masterclass
 * PATH: src/app/aula-icm/page.tsx
 * ROLE: Aula principal de ICM e Risk Premium Pós-Flop.
 * BINDING: [layout.tsx, globals.css, SimuladorICM.tsx]
 */

import Link from 'next/link';
import SimuladorICM from '@/components/icm/SimuladorICM';

export const metadata = {
  title: 'ICM Pós-Flop | Raphael Vitoi',
  description: 'Aula Exclusiva: ICM e Risk Premium no Poker. A Geometria do Risco e a desconstrução do pós-flop.',
};

export default function AulaICMPage() {
  return (
    <main>
      {/* Hero */}
      <header className="page-header" style={{ paddingTop: '5rem', paddingBottom: '3rem' }}>
        <p className="page-label" style={{ color: 'var(--accent-secondary)' }}>
          <span className="fa-solid fa-bolt"></span> State of the Art
        </p>
        <h1 style={{ background: 'linear-gradient(135deg, #fff 0%, #fca5a5 50%, #a5b4fc 100%)' }}>
          O Edge Mudou de Lugar.
        </h1>
        <p className="page-subtitle" style={{ maxWidth: '700px', fontSize: '1.1rem' }}>
          Descubra por que jogar ChipEV em mesas finais está custando, em média, mais de{' '}
          <strong style={{ color: 'var(--accent-secondary)' }}>10% do seu ROI</strong> e como a elite do poker
          usa o &quot;Downward Drift&quot; para dominar o pós-flop em 2026.
        </p>
      </header>

      {/* Artigo Principal */}
      <div className="sim-container">
        <article style={{ maxWidth: '840px', margin: '0 auto 4rem' }}>
          <h2>A Geometria do Risco</h2>
          <p style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '-0.5rem', marginBottom: '2rem' }}>
            A Desconstrução do Pós-Flop sob a Ótica do ICM
          </p>

          <blockquote>
            &quot;O poker é uma ciência de informação incompleta jogada por humanos falhos. Acreditamos
            dominar a matemática, mas frequentemente somos traídos por aplicar a equação certa no
            universo errado.&quot;
          </blockquote>

          <h3>1. A Ilusão do Vácuo (ChipEV vs. ICM)</h3>
          <p>
            Hoje, a teoria do poker está democratizada. Solvers (PioSolver, GTO Wizard) e trackers
            mapearam as tendências da população. No entanto, uma cegueira coletiva ainda assombra o
            High Stakes: a aplicação robótica de conceitos de ChipEV em ambientes de alta pressão
            utilitária (ICM).
          </p>
          <p>
            Fora do Heads-Up, praticamente todas as fases de um torneio são distorcidas pelo ICM.
            Uma ficha ganha nunca terá o mesmo valor de uma ficha perdida. O erro do jogador mediano
            é tentar aplicar o clássico MDF (Minimum Defense Frequency) numa Mesa Final onde a sua
            sobrevivência financeira está em risco.
          </p>

          <h3>2. O Motor Invisível: Risk Premium (RP) e Bubble Factor (BF)</h3>
          <p>Para entender a mutação dos ranges, precisamos entender o peso das fichas:</p>
          <ul>
            <li>
              <strong>Bubble Factor (BF):</strong> É o multiplicador da dor.
              Se o seu BF é de 1.5, significa que perder a mão lhe custa 50% a mais do que o valor
              que você ganharia.
            </li>
            <li>
              <strong>Risk Premium (RP):</strong> É a tradução do BF em
              equidade. A &quot;taxa extra&quot; de certeza matemática que você precisa ter para
              colocar o seu torneio em risco.
            </li>
          </ul>

          <h3>3. Os 4 Arquétipos Clínicos do ICM</h3>
          <p>Ao analisarmos matrizes reais de Mesa Final, identificamos quatro comportamentos absolutos:</p>
        </article>

        {/* Cards dos Arquétipos */}
        <div className="hub-grid" style={{ maxWidth: '900px', margin: '0 auto 3rem', gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <div className="hub-card" style={{ cursor: 'default', borderLeftColor: 'var(--accent-primary)', borderLeftWidth: '3px' }}>
            <span className="hub-icon"><span className="fa-solid fa-shield-halved" style={{ color: 'var(--accent-primary)' }}></span></span>
            <h3>O Pacto Silencioso</h3>
            <p>Chip Leader vs Vice CL. O RP de ambos ultrapassa 20%. A Resolução de Nash cria um
            &quot;Pacto Silencioso&quot; de evitação de ruína mútua.</p>
          </div>
          <div className="hub-card" style={{ cursor: 'default', borderLeftColor: 'var(--accent-secondary)', borderLeftWidth: '3px' }}>
            <span className="hub-icon"><span className="fa-solid fa-scale-unbalanced" style={{ color: 'var(--accent-secondary)' }}></span></span>
            <h3>Paradoxo do Valuation</h3>
            <p>Mid Stack (IP) vs Big Blind (OOP). O Mid acha que pode pressionar, mas o BB
            sobrevive à colisão enquanto o Mid vira pó.</p>
          </div>
          <div className="hub-card" style={{ cursor: 'default', borderLeftColor: 'var(--accent-emerald)', borderLeftWidth: '3px' }}>
            <span className="hub-icon"><span className="fa-solid fa-skull" style={{ color: 'var(--accent-emerald)' }}></span></span>
            <h3>A Guerra na Lama</h3>
            <p>Dois shorts. Quem entra em overfold massivo rezando pelo ICM acaba morrendo para os
            blinds e sangrando EV.</p>
          </div>
          <div className="hub-card" style={{ cursor: 'default', borderLeftColor: 'var(--accent-amber)', borderLeftWidth: '3px' }}>
            <span className="hub-icon"><span className="fa-solid fa-crown" style={{ color: 'var(--accent-amber)' }}></span></span>
            <h3>A Ameaça Orgânica</h3>
            <p>Chip Leader ataca Vice. Se o CL perder, ele cria um monstro. O solver protege o seu
            &quot;God Mode&quot; limitando manobras arriscadas.</p>
          </div>
        </div>

        <article style={{ maxWidth: '840px', margin: '0 auto 4rem' }}>
          <h2>Conclusão: A Arte da Adaptação</h2>
          <p>
            Os Solvers são bússolas, não destinos. A vantagem competitiva moderna não está em
            decorar tabelas pré-flop. Está em compreender a Elasticidade do Risk Premium no pós-flop.
          </p>
        </article>

        {/* Arsenal Tático */}
        <section style={{ maxWidth: '900px', margin: '0 auto 4rem' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>O Arsenal Tático</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }} className="arsenal-grid">
            <Link href="/leitura-icm" className="hub-card" style={{ flexDirection: 'row', alignItems: 'center', gap: '1rem', padding: '1.25rem' }}>
              <span style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="fa-solid fa-file-lines" style={{ color: 'var(--accent-primary)', fontSize: '1.1rem' }}></span>
              </span>
              <div>
                <strong style={{ display: 'block', color: '#fff', fontSize: '0.9rem' }}>Ler Whitepaper</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Teoria Completa &rarr;</span>
              </div>
            </Link>
            <a href="#simulador-section" className="hub-card" style={{ flexDirection: 'row', alignItems: 'center', gap: '1rem', padding: '1.25rem', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
              <span style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="fa-solid fa-gamepad" style={{ color: 'var(--accent-emerald)', fontSize: '1.1rem' }}></span>
              </span>
              <div>
                <strong style={{ display: 'block', color: '#fff', fontSize: '0.9rem' }}>Usar Simulador</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)' }}>Laboratório Interativo &rarr;</span>
              </div>
            </a>
            <Link href="/aula-1-2" className="hub-card" style={{ flexDirection: 'row', alignItems: 'center', gap: '1rem', padding: '1.25rem' }}>
              <span style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(14, 165, 233, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="fa-solid fa-graduation-cap" style={{ color: 'var(--accent-sky)', fontSize: '1.1rem' }}></span>
              </span>
              <div>
                <strong style={{ display: 'block', color: '#fff', fontSize: '0.9rem' }}>Aula 1.2</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Material Complementar &rarr;</span>
              </div>
            </Link>
          </div>
        </section>

        {/* Simulador Integrado */}
        <section id="simulador-section" className="sim-section" style={{ scrollMarginTop: '6rem' }}>
          <div className="sim-section-header">
            <p className="page-label">
              <span className="fa-solid fa-chart-area"></span> Geometria do Risco Engine
            </p>
            <h2>Simulador de Cenários</h2>
            <p>Interaja com cenários reais de Mesa Final. Gauges de Risk Premium, modo comparação e exportação PDF.</p>
          </div>
          <SimuladorICM />
        </section>

        <nav className="article-nav" style={{ marginBottom: '4rem' }}>
          <Link href="/leitura-icm">&larr; Whitepaper ICM</Link>
          <Link href="/aula-1-2">Aula 1.2 &rarr;</Link>
        </nav>
      </div>
    </main>
  );
}
