/**
 * IDENTITY: Página ICM Masterclass
 * PATH: src/app/aula-icm/page.tsx
 * ROLE: Aula principal de ICM e Risk Premium Pós-Flop.
 * BINDING: [layout.tsx, globals.css, SimuladorICM.tsx]
 */

import Link from 'next/link';

export const metadata = {
  title: 'ICM Pós-Flop | Raphael Vitoi',
  description: 'Aula Exclusiva: ICM e Risk Premium no Poker. A Geometria do Risco e a desconstrução do pós-flop.',
};

export default function AulaICMPage() {
  return (
    <main style={{ minHeight: '100vh' }}>
      {/* Hero */}
      <header className="page-header" style={{ paddingTop: '5rem', paddingBottom: '3rem', maxWidth: '900px' }}>
        <p className="page-label" style={{ color: 'var(--accent-secondary)' }}>
          <span className="fa-solid fa-bolt"></span> State of the Art
        </p>
        <h1 style={{ background: 'linear-gradient(135deg, #fff 0%, #fca5a5 50%, #a5b4fc 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}>
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
        <div style={{ maxWidth: '900px', margin: '0 auto 5rem', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
          {[
            { n: '01', icon: 'fa-shield-halved', color: 'var(--accent-primary)', rgb: '99,102,241', title: 'O Pacto Silencioso', text: 'Chip Leader (70bb) vs Vice CL (65bb) com mesa cheia de micro-stacks. O RP de ambos ultrapassa 20%. A 3-bet linear desaparece, ranges de flat call inflam massivamente, e o foco vira caçar cooler absoluto pós-flop investindo o mínimo pré-flop. Traps e slowplays tornam-se armas de defesa.' },
            { n: '02', icon: 'fa-scale-unbalanced', color: 'var(--accent-secondary)', rgb: '225,29,72', title: 'Paradoxo do Valuation', text: 'BTN (40bb) abre, BB (54bb) defende. O Mid acha que pode imprimir overbluffs — mas o RP do BTN (~21%) é quase o dobro do BB (~12%). Se o BTN errar um hero-bluff e tomar call, derrete de 40bb para o pó absoluto. A agressão é estrangulada. A matemática corta brutalmente a frequência de blefe do IP.' },
            { n: '03', icon: 'fa-skull', color: 'var(--accent-emerald)', rgb: '16,185,129', title: 'A Guerra na Lama', text: 'Dois shorts (~10bb) numa mesa dominada por gigantes (80bb+). Parece que deveriam jogar sem restrições (RP 0%). Falso: a abundância de outros shorts eleva o EV do fold (laddering). O RP ancora entre 7% e 10%. Quem entra em overfold rezando pelo ICM sangra equity. Quem ignora o RP e jamba tudo perde payjumps passivos.' },
            { n: '04', icon: 'fa-crown', color: 'var(--accent-amber)', rgb: '245,158,11', title: 'A Ameaça Orgânica', text: 'Chip Leader (90bb) ataca Vice (25bb). O CL parece invulnerável — RP de 0%, blefaria 100%? Não. O HRC impõe RP substancial (~12%) ao CL: se o Vice dobrar após um shove descuidado, salta para 50bb e torna-se o único rival capaz de usurpar a coroa. O solver protege o God Mode exigindo seleção de mãos.' },
          ].map(({ n, icon, color, rgb, title, text }) => (
            <div key={n} style={{
              background: `linear-gradient(150deg, rgba(${rgb},0.07) 0%, var(--bg-card) 60%)`,
              backdropFilter: 'blur(12px)',
              border: 'var(--glass-border)',
              borderTop: `3px solid ${color}`,
              borderRadius: 'var(--radius-lg)',
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ width: '44px', height: '44px', borderRadius: '10px', background: `rgba(${rgb},0.15)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span className={`fa-solid ${icon}`} style={{ color, fontSize: '1rem' }}></span>
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 800, color: `rgba(${rgb},0.3)`, letterSpacing: '0.1em' }}>{n}</span>
              </div>
              <div>
                <h3 style={{ margin: '0 0 0.5rem', fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.2, letterSpacing: '-0.02em' }}>{title}</h3>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{text}</p>
              </div>
            </div>
          ))}
        </div>

        <article style={{ maxWidth: '840px', margin: '0 auto 4rem' }}>
          <h2>4. A Falsa Equivalência do MDF</h2>
          <p>
            O clássico MDF dita que, contra uma aposta do tamanho do pote, o defensor deve pagar 50% das
            vezes para tornar os blefes do agressor indiferentes. Essa matemática é válida em ChipEV.
            No ICM, ela quebra.
          </p>

          <div className="callout callout-secondary">
            <h4 style={{ marginTop: 0, color: 'var(--accent-secondary)' }}>A Equação do Desespero</h4>
            <p>Quando o OOP enfrenta uma aposta de um pote inteiro em Mesa Final, dois mecanismos operam simultaneamente:</p>
            <ul>
              <li>
                <strong>O OOP Atinge o Teto de Dor:</strong> Um range condensado (cheio de bluffcatchers)
                não suporta um RP alto. A realização de equidade despenca porque o agressor pode colocar o
                OOP em all-in no turn ou river. A defesa quebra de 50% para a faixa de{' '}
                <strong>30% a 38%</strong> — um overfold matemático forçado pela estrutura do ICM, não por
                fraqueza do jogador.
              </li>
              <li style={{ marginTop: '0.75rem' }}>
                <strong>O IP Oprime (Se Puder):</strong> Se o IP tiver RP baixo (Vantagem de Risco), seu
                Alpha de blefes aumenta para explorar o overfold do adversário. A agressão se torna
                matematicamente justificada.
              </li>
            </ul>
          </div>

          <div className="callout" style={{ marginTop: '1.5rem' }}>
            <h4 style={{ marginTop: 0 }}>O Freio Bayesiano</h4>
            <p style={{ marginBottom: 0 }}>
              Se o IP também tiver RP alto — o Paradoxo do Valuation — ele <em>não pode</em> explorar
              o overfold do vilão. Seu range de agressão condensa-se e a frequência de blefe cai abaixo dos
              33.3%. O solver simultaneamente força o defensor a foldar mais <em>e</em> proíbe o agressor
              de blefar mais. Ambos ficam presos num equilíbrio de alta pressão, baixa ação — o Pacto
              Silencioso em miniatura.
            </p>
          </div>

          <blockquote>
            &ldquo;Frases feitas como &apos;ele está shovando tudo, vou pagar light&apos; destroem
            profissionais em retas finais. A matemática exige extração cirúrgica de EV. Numa mesa final,
            a responsabilidade de cada jogador é realizar o EV monetário daquela stack específica, não
            provar coragem.&rdquo;
          </blockquote>
        </article>

        <article style={{ maxWidth: '840px', margin: '0 auto 4rem' }}>
          <h2>Conclusão: A Arte da Adaptação</h2>
          <p>
            Os Solvers são bússolas, não destinos. A vantagem competitiva moderna não está em
            decorar tabelas pré-flop. Está em compreender a Elasticidade do Risk Premium no pós-flop.
          </p>

          <div className="callout callout-secondary">
            <h4 style={{ marginTop: 0, color: 'var(--accent-secondary)' }}>O Downward Drift</h4>
            <p>
              Conceito formalizado por Dara O&apos;Kearney: o ICM força os solvers a comprimirem as
              ações. Bets grandes viram bets pequenos. Bets pequenos viram checks ou calls. Raises
              viram calls. <strong>A ação &ldquo;deriva para baixo&rdquo; em variância</strong> para
              proteger o valor financeiro da stack.
            </p>
            <p style={{ marginBottom: 0 }}>
              A exceção crítica: quando há vantagem clara, o solver não aposta médio — ele ou
              min-bets ou vai all-in. O meio-termo cria decisões difíceis e caras. O Drift convive
              com polarização extrema.
            </p>
          </div>

          <div className="callout callout-emerald" style={{ marginTop: '1.5rem' }}>
            <h4 style={{ marginTop: 0, color: 'var(--accent-emerald)' }}>Dissipação do RP por Street</h4>
            <p>
              O Drift não é constante ao longo da mão. Ele é proporcional ao RP residual: quanto
              maior o RP naquele momento, mais forte o Drift. Conforme fichas entram no pote e a
              stack restante diminui, o RP dissipa — e o Drift enfraquece.
            </p>
            <p>
              <strong>Pré-flop:</strong> RP no máximo → Drift máximo (evitar all-in, comprimir ação).
              <br />
              <strong>Flop/Turn:</strong> RP residual moderado → Drift moderado.
              <br />
              <strong>River:</strong> RP residual baixo → Drift enfraquece → o jogo se aproxima do
              ChipEV. O defensor <em>precisa</em> pagar mais do que intuitivamente esperaria.
            </p>
            <p style={{ marginBottom: 0 }}>
              Jogar o river como se o RP pré-flop ainda estivesse ativo é o erro mais comum e
              custoso no pós-flop de ICM. A stack já comprometeu o risco nas streets anteriores.
            </p>
          </div>
        </article>

        {/* Arsenal Tatico */}
        <section style={{ maxWidth: '900px', margin: '0 auto 4rem' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', textAlign: 'center', marginBottom: '0.75rem' }}>
            <span className="fa-solid fa-compass" style={{ marginRight: '0.5rem' }}></span> Navegação
          </p>
          <h3 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.6rem' }}>O Arsenal Tatico</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            <Link href="/leitura-icm" className="nav-card">
              <span className="nav-card-icon" style={{ background: 'rgba(99, 102, 241, 0.12)' }}>
                <span className="fa-solid fa-file-lines" style={{ color: 'var(--accent-primary)' }}></span>
              </span>
              <div>
                <strong>Ler Whitepaper</strong>
                <span>Teoria Completa &rarr;</span>
              </div>
            </Link>
            <a href="#simulador-section" className="nav-card" style={{ borderColor: 'rgba(16, 185, 129, 0.2)' }}>
              <span className="nav-card-icon" style={{ background: 'rgba(16, 185, 129, 0.12)' }}>
                <span className="fa-solid fa-gamepad" style={{ color: 'var(--accent-emerald)' }}></span>
              </span>
              <div>
                <strong>Usar Simulador</strong>
                <span style={{ color: 'var(--accent-emerald)' }}>Laboratório Interativo &rarr;</span>
              </div>
            </a>
            <Link href="/aula-1-2" className="nav-card">
              <span className="nav-card-icon" style={{ background: 'rgba(14, 165, 233, 0.12)' }}>
                <span className="fa-solid fa-graduation-cap" style={{ color: 'var(--accent-sky)' }}></span>
              </span>
              <div>
                <strong>Aula 1.2</strong>
                <span>Material Complementar &rarr;</span>
              </div>
            </Link>
          </div>
        </section>

        {/* Link para o Motor ICM */}
        <section id="simulador-section" style={{ scrollMarginTop: '6rem', maxWidth: '900px', margin: '4rem auto 0', padding: '3rem 0 0', textAlign: 'center' }}>
          <p className="page-label">
            <span className="fa-solid fa-chart-area"></span> Geometria do Risco Engine
          </p>
          <h2>Motor ICM</h2>
          <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
            9 cenários clínicos, calculadora Malmuth-Harville, NashSolver, quizzes interativos, modo comparação e simulação por mão.
          </p>
          <Link href="/tools/simulador" className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '0.95rem' }}>
            Abrir Motor ICM &rarr;
          </Link>
        </section>

        <nav className="article-nav" style={{ marginBottom: '4rem' }}>
          <Link href="/leitura-icm">&larr; Whitepaper ICM</Link>
          <Link href="/aula-1-2">Aula 1.2 &rarr;</Link>
        </nav>
      </div>
    </main>
  );
}
