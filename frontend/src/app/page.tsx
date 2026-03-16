/**
 * IDENTITY: Landing Page Principal (Nexus Central)
 * PATH: src/app/page.tsx
 * ROLE: Página de alta conversão. Sales copy + Hub de Conteúdo + Autor + CTA.
 * BINDING: [layout.tsx, globals.css]
 */

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="container mx-auto px-4">

      {/* Hero Section */}
      <section id="hero" className="animate-fade-up">
        <p style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.9rem', color: 'var(--accent-primary)', marginBottom: '1rem', fontWeight: 700 }}>
          ICM e Risk Premium Pós-Flop
        </p>
        <h2>
          O Edge Mudou de Lugar.{' '}
          <span style={{ display: 'block', fontWeight: 300, color: '#fff', marginTop: '0.5rem' }}>
            Você Ainda Está Jogando o Jogo de 2020?
          </span>
        </h2>
        <p style={{ fontSize: '1.3rem', maxWidth: '800px', margin: '0 auto 2.5rem', color: '#94a3b8', fontWeight: 400 }}>
          Descubra por que jogar ChipEV em mesas finais está custando, em média,{' '}
          <strong>mais de 10% do seu ROI</strong> e como a elite do poker usa o
          &quot;Downward Drift&quot; para dominar o pós-flop em 2026.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
          <Link href="#metodo" className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '0.95rem' }}>
            Conhecer o Método &rarr;
          </Link>
          <Link href="/leitura-icm" className="btn-secondary" style={{ padding: '1rem 2.5rem', fontSize: '0.95rem' }}>
            Ler o Whitepaper
          </Link>
        </div>
      </section>

      <hr style={{ border: 0, borderTop: '1px solid rgba(255,255,255,0.05)', margin: '0 auto', maxWidth: '200px' }} />

      {/* O Método (Sales Copy) */}
      <section id="metodo">
        <article className="sales-article" style={{ background: 'transparent', border: 'none', backdropFilter: 'none' }}>
          <h3>A &quot;Mentira&quot; do ICM</h3>
          <p>Se você é como a maioria dos regulares de MTT, você aprendeu que o ICM é um interruptor que &quot;liga&quot; na bolha ou na mesa final.</p>
          <p>Você estudou tabelas de Push/Fold. Você domina o HRC e o ICMIZER. Você acha que seu jogo de ICM está em dia.</p>
          <p><strong>Tenho uma má notícia:</strong> O poker evoluiu, e o seu edge no pré-flop está desaparecendo. Hoje, solvers resolveram o pré-flop. O gap de habilidade entre você e o reg médio nessa área é mínimo.</p>
          <p>Mas existe uma <strong>Nova Fronteira</strong>. Um lugar onde o dinheiro real está sendo ganho e perdido silenciosamente, longe dos olhos dos solvers básicos.</p>
          <p style={{ fontSize: '1.4rem', color: '#fff', textAlign: 'center', margin: '2rem 0' }}><strong>O ICM Pós-Flop.</strong></p>

          <div className="callout" style={{ borderLeftColor: 'var(--accent-secondary)' }}>
            <h4 style={{ marginTop: 0, color: 'var(--accent-secondary)' }}>O Custo Invisível</h4>
            <p>Dados recentes do GTO Wizard (2025/2026) revelam uma verdade brutal:</p>
            <blockquote style={{ border: 'none', padding: 0, margin: '1rem 0', fontSize: '1.1rem', color: '#fff' }}>
              Jogar uma estratégia padrão de ChipEV (focada em acumular fichas) em spots de mesa final custa, em média, <strong>10% a 12% de todo o buy-in do torneio em $EV</strong>.
            </blockquote>
            <p>Em potes 3-bet? O erro custa mais de <strong>30% do valor da jogada</strong>.</p>
            <p style={{ marginBottom: 0 }}>Pense nisso. Você grindou 8 horas. Chegou na FT. E em duas decisões de c-bet mal calibradas, você devolveu todo o lucro esperado do torneio. Não porque jogou &quot;mal&quot;, mas porque jogou com a matemática errada.</p>
          </div>

          <h3>Apresentando: O Mapa do ICM Pós-Flop</h3>
          <p>Nesta aula inédita, não vamos falar de tabelas de push/fold. Vamos mergulhar na física do jogo pós-flop sob pressão. Você vai aprender a <strong>Antevisão</strong>: a habilidade de olhar para uma mesa e ver o &quot;campo de força&quot; do Risk Premium antes mesmo de receber suas cartas.</p>

          <h4 style={{ color: '#fff', fontSize: '1.2rem' }}>O Que Você Vai Dominar:</h4>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            <li><span style={{ color: 'var(--accent-emerald)' }}>&#10003;</span> <strong>O &quot;Downward Drift&quot;:</strong> A heurística simples que ajusta automaticamente seus sizings e frequências para a realidade do ICM (e por que seus sizings de cash game estão queimando dinheiro).</li>
            <li><span style={{ color: 'var(--accent-emerald)' }}>&#10003;</span> <strong>Toy-Games de Laboratório:</strong> Vamos dissecar 8 cenários puros para provar matematicamente conceitos contraintuitivos.</li>
            <li><span style={{ color: 'var(--accent-emerald)' }}>&#10003;</span> <strong>O Teto do Risk Premium:</strong> Por que overbluffar o Chip Leader é suicídio, e onde está o limite matemático da agressão.</li>
            <li><span style={{ color: 'var(--accent-emerald)' }}>&#10003;</span> <strong>A Mesa como Organismo:</strong> Como um all-in entre dois oponentes muda instantaneamente o valor das SUAS fichas e como explorar isso.</li>
          </ul>

          <h3>Para Quem É Isso?</h3>
          <p>Este material não é para iniciantes. É para jogadores profissionais e semiprofissionais (AVG $109-$530) que:</p>
          <ol style={{ marginLeft: '1.5rem', color: '#cbd5e1' }}>
            <li style={{ marginBottom: '0.5rem' }}>Já entendem o básico de ICM pré-flop.</li>
            <li style={{ marginBottom: '0.5rem' }}>Estão cansados de &quot;sentir&quot; que estão cometendo erros em FTs, mas não sabem onde.</li>
            <li style={{ marginBottom: '0.5rem' }}>Querem uma vantagem técnica real que o field ainda não estuda.</li>
          </ol>

          <h3>O Que Está Incluso</h3>
          <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', padding: '2rem', margin: '2rem 0', border: 'var(--glass-border)' }}>
            <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
              <li style={{ marginBottom: '1rem' }}><strong>Módulo 1: O Problema e o Mapa</strong><br /><span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Risk Premium, Bubble Factor, Valuations de Stack.</span></li>
              <li style={{ marginBottom: '1rem' }}><strong>Módulo 2: Toy-Games como Laboratório</strong><br /><span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>8 cenários progressivos (RP 0 -&gt; 24), Pacto Silencioso, Nash sob ICM.</span></li>
              <li style={{ marginBottom: '1rem' }}><strong>Módulo 3: ICM Pós-Flop: A Fronteira</strong><br /><span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Downward Drift, Covering Advantage, Check-Backs de Premium Hands.</span></li>
              <li style={{ marginBottom: '1rem' }}><strong>Módulo 4: Variáveis Contextuais</strong><br /><span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Payout Structures, FGS, KO/Bounty, Dinâmica de CL.</span></li>
              <li style={{ marginBottom: '1rem' }}><strong>Módulo 5: Aplicação Prática e Erros Comuns</strong><br /><span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Os 10 erros mais comuns e heurísticas de mesa.</span></li>
              <li style={{ marginTop: '1.5rem', color: 'var(--accent-primary)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}><strong>+ Bônus Exclusivo:</strong> Checklist de Bolso &quot;Antevisão&quot;.</li>
            </ul>
          </div>

          <h3>Elementos Diferenciadores</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.8rem' }}><strong>1. Metodologia de toy-games:</strong> isolamento de variáveis para construir intuição antes de aplicar a situações reais.</li>
            <li style={{ marginBottom: '0.8rem' }}><strong>2. Conceitos próprios nomeados:</strong> Teto do RP, RP de ida vs volta: nomenclatura clara e própria que o mercado não usa.</li>
            <li style={{ marginBottom: '0.8rem' }}><strong>3. ICM pós-flop como tese central:</strong> a maioria do conteúdo existente trata ICM como fenômeno pré-flop. Esta aula trata ICM pós-flop como o edge inexplorado real.</li>
            <li style={{ marginBottom: '0.8rem' }}><strong>4. Crítica fundamentada aos solvers:</strong> solvers como mapa, não como território.</li>
            <li style={{ marginBottom: '0.8rem' }}><strong>5. Conexões interdisciplinares reais:</strong> Prospect Theory, Teoria de Sistemas e Teoria dos Jogos usadas como lentes interpretativas.</li>
          </ul>
        </article>
      </section>

      {/* Autor */}
      <section id="autor">
        <div className="author-section">
          <div className="video-wrapper-inline">
            <video controls autoPlay muted playsInline loop preload="metadata">
              <source src="/0309.mp4" type="video/mp4" />
              Seu navegador não suporta a tag de vídeo.
            </video>
          </div>
          <div>
            <h3 style={{ textAlign: 'left', marginTop: 0, fontSize: '1.8rem' }}>Sobre o Autor</h3>
            <p style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1rem' }}><strong>Raphael Vitoi</strong></p>
            <p>Educador e Profissional de Poker há mais de dez anos, Raphael Vitoi é um especialista em <strong>Sistemas Complexos, ICM, Multiway Spots e Teoria dos Jogos</strong>.</p>
            <p>Sua abordagem transita entre a <strong>Análise Bayesiana, Preditiva e Recursiva</strong>, focando na adaptação estratégica e análise comportamental (GTO e desvio). Além das mesas, mergulha na <strong>Psicologia do Poker</strong>, dissecando os vieses cognitivos que custam dinheiro.</p>
            <p><em>&quot;Pois o que importa de verdade é pensar bem.&quot;</em></p>

            <div style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <span style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-primary)', padding: '0.2rem 0.8rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700, border: '1px solid var(--accent-primary)' }}>Embaixador Deepsolver</span>
              <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-emerald)', padding: '0.2rem 0.8rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700, border: '1px solid var(--accent-emerald)' }}>Afiliado GTO Wizard</span>
              <span style={{ background: 'rgba(225, 29, 72, 0.1)', color: 'var(--accent-secondary)', padding: '0.2rem 0.8rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700, border: '1px solid var(--accent-secondary)' }}>Criador trueICM.com</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section id="final-cta" style={{ textAlign: 'center', padding: '4rem 0' }}>
        <p style={{ fontSize: '1.5rem', fontStyle: 'italic', marginBottom: '2rem', color: '#fff' }}>
          &quot;O edge não está mais nas cartas que você recebe, mas na precisão com que você avalia o risco de jogá-las.&quot;
        </p>
        <h2 style={{ fontSize: '2.5rem' }}>Recupere seu ROI. Domine a fronteira final.</h2>

        <div style={{ marginTop: '3rem' }}>
          <Link href="/aula-icm" className="btn-primary" style={{ padding: '1.2rem 4rem', fontSize: '1.1rem', boxShadow: '0 0 30px var(--accent-glow)' }}>
            ACESSAR AULA MAGNA AGORA
          </Link>
        </div>
      </section>

      {/* Hub de Conteúdo */}
      <section id="biblioteca">
        <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Biblioteca de Conhecimento</h2>
        <div className="hub-grid">
          <Link href="/aula-icm" className="hub-card">
            <span className="hub-icon">&#128202;</span>
            <h3>ICM &amp; RP: A Aula</h3>
            <p>Aula Magna: O Edge mudou de lugar. Entenda a geometria do risco pós-flop.</p>
            <span className="card-cta">Acessar &rarr;</span>
          </Link>

          <Link href="/leitura-icm" className="hub-card">
            <span className="hub-icon">&#128209;</span>
            <h3>Entendendo o ICM</h3>
            <p>Whitepaper completo: Toy Games, Risk Premium, RP de ida/volta e o Teto do RP.</p>
            <span className="card-cta">Ler Whitepaper &rarr;</span>
          </Link>

          <Link href="/artigos/estado-da-arte" className="hub-card">
            <span className="hub-icon">&#128161;</span>
            <h3>Estado da Arte 2025</h3>
            <p>Donk Bet meta, Efeito de Irradiação, IA vs HRC Pro. Tendências High Stakes.</p>
            <span className="card-cta">Ler &rarr;</span>
          </Link>

          <Link href="/artigos/smart-sniper" className="hub-card">
            <span className="hub-icon">&#9878;</span>
            <h3>Protocolo Smart Sniper</h3>
            <p>Gestão de carreira, rotina semanal, estratégia de domingo e validação Monte Carlo.</p>
            <span className="card-cta">Ler &rarr;</span>
          </Link>

          <Link href="/tools/icm" className="hub-card">
            <span className="hub-icon">&#127918;</span>
            <h3>Simulador ICM</h3>
            <p>Calculadora Malmuth-Harville + Simulador de Cenários com Risk Premium.</p>
            <span className="card-cta">Abrir Laboratório &rarr;</span>
          </Link>

          <Link href="/tools/masterclass" className="hub-card">
            <span className="hub-icon">&#127891;</span>
            <h3>Masterclass: Geometria do Risco</h3>
            <p>6 cenários clínicos com NashSolver, quizzes interativos e diluição SPR.</p>
            <span className="card-cta">Iniciar Masterclass &rarr;</span>
          </Link>

          <Link href="/tools/toy-games" className="hub-card">
            <span className="hub-icon">&#127919;</span>
            <h3>Toy Games: Predator Mode</h3>
            <p>Cenários extremos de ICM. Sinta a impunidade de agredir quando o oponente está paralisado.</p>
            <span className="card-cta">Entrar no Lab &rarr;</span>
          </Link>

          <Link href="/psicologia-hs" className="hub-card">
            <span className="hub-icon">&#128300;</span>
            <h3>Psicologia High Stakes</h3>
            <p>A Fenomenologia da Incerteza: Exegese crítica das heurísticas de ICM.</p>
            <span className="card-cta">Ler &rarr;</span>
          </Link>

          <Link href="/biblioteca" className="hub-card">
            <span className="hub-icon">&#128218;</span>
            <h3>Biblioteca Epistêmica</h3>
            <p>Acervo de Filosofia, Psicologia e Existencialismo. A fundação teórica.</p>
            <span className="card-cta">Explorar &rarr;</span>
          </Link>

          <Link href="/quem-sou" className="hub-card">
            <span className="hub-icon">&#128100;</span>
            <h3>Quem Sou</h3>
            <p>O Manifesto. Educador, Estrategista e Especialista em Sistemas Complexos.</p>
            <span className="card-cta">Conhecer &rarr;</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
