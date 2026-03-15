/**
 * IDENTITY: Landing Page Principal (Nexus Central)
 * PATH: src/app/page.tsx
 * ROLE: Pagina de alta conversao. Sales copy + Hub de Conteudo + Autor + CTA.
 * BINDING: [layout.tsx, globals.css]
 */

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="container mx-auto px-4">

      {/* Hero Section */}
      <section id="hero" className="animate-fade-up">
        <p style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.9rem', color: 'var(--accent-primary)', marginBottom: '1rem', fontWeight: 700 }}>
          ICM e Risk Premium Pos-Flop
        </p>
        <h2>
          O Edge Mudou de Lugar.{' '}
          <span style={{ display: 'block', fontWeight: 300, color: '#fff', marginTop: '0.5rem' }}>
            Voce Ainda Esta Jogando o Jogo de 2020?
          </span>
        </h2>
        <p style={{ fontSize: '1.3rem', maxWidth: '800px', margin: '0 auto 2.5rem', color: '#94a3b8', fontWeight: 400 }}>
          Descubra por que jogar ChipEV em mesas finais esta custando, em media,{' '}
          <strong>mais de 10% do seu ROI</strong> e como a elite do poker usa o
          &quot;Downward Drift&quot; para dominar o pos-flop em 2026.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
          <Link href="#metodo" className="card-cta" style={{ background: 'var(--accent-primary)', color: '#fff', padding: '1rem 2.5rem', borderRadius: '4px', border: 'none', fontSize: '1rem', marginTop: 0 }}>
            Conhecer o Metodo &rarr;
          </Link>
          <Link href="/leitura-icm" className="card-cta" style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-primary)', padding: '1rem 2.5rem', borderRadius: '4px', border: '1px solid var(--accent-primary)', fontSize: '1rem', fontWeight: 600, marginTop: 0 }}>
            Baixar Material PDF
          </Link>
        </div>
      </section>

      <hr style={{ border: 0, borderTop: '1px solid rgba(255,255,255,0.05)', margin: '0 auto', maxWidth: '200px' }} />

      {/* O Metodo (Sales Copy) */}
      <section id="metodo">
        <article className="sales-article" style={{ background: 'transparent', border: 'none', backdropFilter: 'none' }}>
          <h3>A &quot;Mentira&quot; do ICM</h3>
          <p>Se voce e como a maioria dos regulares de MTT, voce aprendeu que o ICM e um interruptor que &quot;liga&quot; na bolha ou na mesa final.</p>
          <p>Voce estudou tabelas de Push/Fold. Voce domina o HRC e o ICMIZER. Voce acha que seu jogo de ICM esta em dia.</p>
          <p><strong>Tenho uma ma noticia:</strong> O poker evoluiu, e o seu edge no pre-flop esta desaparecendo. Hoje, solvers resolveram o pre-flop. O gap de habilidade entre voce e o reg medio nessa area e minimo.</p>
          <p>Mas existe uma <strong>Nova Fronteira</strong>. Um lugar onde o dinheiro real esta sendo ganho e perdido silenciosamente, longe dos olhos dos solvers basicos.</p>
          <p style={{ fontSize: '1.4rem', color: '#fff', textAlign: 'center', margin: '2rem 0' }}><strong>O ICM Pos-Flop.</strong></p>

          <div className="callout" style={{ borderLeftColor: 'var(--accent-secondary)' }}>
            <h4 style={{ marginTop: 0, color: 'var(--accent-secondary)' }}>O Custo Invisivel</h4>
            <p>Dados recentes do GTO Wizard (2025/2026) revelam uma verdade brutal:</p>
            <blockquote style={{ border: 'none', padding: 0, margin: '1rem 0', fontSize: '1.1rem', color: '#fff' }}>
              Jogar uma estrategia padrao de ChipEV (focada em acumular fichas) em spots de mesa final custa, em media, <strong>10% a 12% de todo o buy-in do torneio em $EV</strong>.
            </blockquote>
            <p>Em potes 3-bet? O erro custa mais de <strong>30% do valor da jogada</strong>.</p>
            <p style={{ marginBottom: 0 }}>Pense nisso. Voce grindou 8 horas. Chegou na FT. E em duas decisoes de c-bet mal calibradas, voce devolveu todo o lucro esperado do torneio. Nao porque jogou &quot;mal&quot;, mas porque jogou com a matematica errada.</p>
          </div>

          <h3>Apresentando: O Mapa do ICM Pos-Flop</h3>
          <p>Nesta aula inedita, nao vamos falar de tabelas de push/fold. Vamos mergulhar na fisica do jogo pos-flop sob pressao. Voce vai aprender a <strong>Antevisao</strong>: a habilidade de olhar para uma mesa e ver o &quot;campo de forca&quot; do Risk Premium antes mesmo de receber suas cartas.</p>

          <h4 style={{ color: '#fff', fontSize: '1.2rem' }}>O Que Voce Vai Dominar:</h4>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            <li><span style={{ color: 'var(--accent-emerald)' }}>&#10003;</span> <strong>O &quot;Downward Drift&quot;:</strong> A heuristica simples que ajusta automaticamente seus sizings e frequencias para a realidade do ICM (e por que seus sizings de cash game estao queimando dinheiro).</li>
            <li><span style={{ color: 'var(--accent-emerald)' }}>&#10003;</span> <strong>Toy-Games de Laboratorio:</strong> Vamos dissecar 8 cenarios puros para provar matematicamente conceitos contra-intuitivos.</li>
            <li><span style={{ color: 'var(--accent-emerald)' }}>&#10003;</span> <strong>O Teto do Risk Premium:</strong> Por que overbluffar o Chip Leader e suicidio, e onde esta o limite matematico da agressao.</li>
            <li><span style={{ color: 'var(--accent-emerald)' }}>&#10003;</span> <strong>A Mesa como Organismo:</strong> Como um all-in entre dois oponentes muda instantaneamente o valor das SUAS fichas e como explorar isso.</li>
          </ul>

          <h3>Para Quem E Isso?</h3>
          <p>Este material nao e para iniciantes. E para jogadores profissionais e semi-profissionais (AVG $109-$530) que:</p>
          <ol style={{ marginLeft: '1.5rem', color: '#cbd5e1' }}>
            <li style={{ marginBottom: '0.5rem' }}>Ja entendem o basico de ICM pre-flop.</li>
            <li style={{ marginBottom: '0.5rem' }}>Estao cansados de &quot;sentir&quot; que estao cometendo erros em FTs, mas nao sabem onde.</li>
            <li style={{ marginBottom: '0.5rem' }}>Querem uma vantagem tecnica real que o field ainda nao estuda.</li>
          </ol>

          <h3>O Que Esta Incluso</h3>
          <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', padding: '2rem', margin: '2rem 0', border: 'var(--glass-border)' }}>
            <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
              <li style={{ marginBottom: '1rem' }}><strong>Modulo 1: O Problema e o Mapa</strong><br /><span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Risk Premium, Bubble Factor, Valuations de Stack.</span></li>
              <li style={{ marginBottom: '1rem' }}><strong>Modulo 2: Toy-Games como Laboratorio</strong><br /><span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>8 cenarios progressivos (RP 0 -&gt; 24), Pacto Silencioso, Nash sob ICM.</span></li>
              <li style={{ marginBottom: '1rem' }}><strong>Modulo 3: ICM Pos-Flop - A Fronteira</strong><br /><span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Downward Drift, Covering Advantage, Check-Backs de Premium Hands.</span></li>
              <li style={{ marginBottom: '1rem' }}><strong>Modulo 4: Variaveis Contextuais</strong><br /><span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Payout Structures, FGS, KO/Bounty, Dinamica de CL.</span></li>
              <li style={{ marginBottom: '1rem' }}><strong>Modulo 5: Aplicacao Pratica e Erros Comuns</strong><br /><span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Os 10 erros mais comuns e heuristicas de mesa.</span></li>
              <li style={{ marginTop: '1.5rem', color: 'var(--accent-primary)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}><strong>+ Bonus Exclusivo:</strong> Checklist de Bolso &quot;Antevisao&quot;.</li>
            </ul>
          </div>

          <h3>Elementos Diferenciadores</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.8rem' }}><strong>1. Metodologia de toy-games:</strong> isolamento de variaveis para construir intuicao antes de aplicar a situacoes reais.</li>
            <li style={{ marginBottom: '0.8rem' }}><strong>2. Conceitos proprios nomeados:</strong> Teto do RP, RP de ida vs volta: nomenclatura clara e propria que o mercado nao usa.</li>
            <li style={{ marginBottom: '0.8rem' }}><strong>3. ICM pos-flop como tese central:</strong> a maioria do conteudo existente trata ICM como fenomeno pre-flop. Esta aula trata ICM pos-flop como o edge inexplorado real.</li>
            <li style={{ marginBottom: '0.8rem' }}><strong>4. Critica fundamentada aos solvers:</strong> solvers como mapa, nao como territorio.</li>
            <li style={{ marginBottom: '0.8rem' }}><strong>5. Conexoes interdisciplinares reais:</strong> Prospect Theory, Teoria de Sistemas e Teoria dos Jogos usadas como lentes interpretativas.</li>
          </ul>
        </article>
      </section>

      {/* Autor */}
      <section id="autor">
        <div className="author-section">
          <div className="video-wrapper-inline">
            <video controls autoPlay muted playsInline loop preload="metadata">
              <source src="/0309.mp4" type="video/mp4" />
              Seu navegador nao suporta a tag de video.
            </video>
          </div>
          <div>
            <h3 style={{ textAlign: 'left', marginTop: 0, fontSize: '1.8rem' }}>Sobre o Autor</h3>
            <p style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1rem' }}><strong>Raphael Vitoi</strong></p>
            <p>Educador e Profissional de Poker ha mais de dez anos, Raphael Vitoi e um especialista em <strong>Sistemas Complexos, ICM, Multiway Spots e Teoria dos Jogos</strong>.</p>
            <p>Sua abordagem transita entre a <strong>Analise Bayesiana, Preditiva e Recursiva</strong>, focando na adaptacao estrategica e analise comportamental (GTO e desvio). Alem das mesas, mergulha na <strong>Psicologia do Poker</strong>, dissecando os vieses cognitivos que custam dinheiro.</p>
            <p><em>&quot;Pois o que importa de verdade e pensar bem.&quot;</em></p>

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
          &quot;O edge nao esta mais nas cartas que voce recebe, mas na precisao com que voce avalia o risco de joga-las.&quot;
        </p>
        <h2 style={{ fontSize: '2.5rem' }}>Recupere seu ROI. Domine a fronteira final.</h2>

        <div style={{ marginTop: '3rem' }}>
          <Link href="/aula-icm" className="card-cta" style={{ background: 'var(--accent-primary)', color: '#fff', padding: '1.2rem 4rem', borderRadius: '4px', fontSize: '1.2rem', boxShadow: '0 0 30px var(--accent-glow)', border: 'none', fontWeight: 800, marginTop: 0 }}>
            ACESSAR AULA MAGNA AGORA
          </Link>
        </div>
      </section>

      {/* Hub de Conteudo (Biblioteca) */}
      <section id="biblioteca">
        <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Biblioteca de Conhecimento</h2>
        <div className="hub-grid">
          <Link href="/aula-icm" className="hub-card">
            <span className="hub-icon">&#128202;</span>
            <h3>ICM &amp; RP: A Aula</h3>
            <p>Aula Magna: O Edge mudou de lugar. Entenda a geometria do risco pos-flop.</p>
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
            <p>Donk Bet meta, Efeito de Irradiacao, IA vs HRC Pro. Tendencias High Stakes.</p>
            <span className="card-cta">Ler &rarr;</span>
          </Link>

          <Link href="/artigos/smart-sniper" className="hub-card">
            <span className="hub-icon">&#127919;</span>
            <h3>Protocolo Smart Sniper</h3>
            <p>Gestao de carreira, rotina semanal, estrategia de domingo e validacao Monte Carlo.</p>
            <span className="card-cta">Ler &rarr;</span>
          </Link>

          <Link href="/psicologia-hs" className="hub-card">
            <span className="hub-icon">&#128300;</span>
            <h3>Psicologia High Stakes</h3>
            <p>A Fenomenologia da Incerteza: Exegese critica das heuristicas de ICM.</p>
            <span className="card-cta">Ler &rarr;</span>
          </Link>

          <Link href="/tools/icm" className="hub-card">
            <span className="hub-icon">&#127918;</span>
            <h3>Simulador ICM</h3>
            <p>Calculadora Malmuth-Harville + Simulador de Cenarios com Risk Premium.</p>
            <span className="card-cta">Abrir Laboratorio &rarr;</span>
          </Link>

          <Link href="/biblioteca" className="hub-card">
            <span className="hub-icon">&#128218;</span>
            <h3>Biblioteca Epistemica</h3>
            <p>Acervo de Filosofia, Psicologia e Existencialismo. A fundacao teorica.</p>
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
