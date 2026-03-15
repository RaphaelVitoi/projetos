/**
 * IDENTITY: Pagina Manifesto / Quem Sou
 * PATH: src/app/quem-sou/page.tsx
 * ROLE: Apresentar Raphael Vitoi - bio, video, manifesto, badges.
 * BINDING: [layout.tsx, globals.css]
 */

import Link from 'next/link';

export const metadata = {
  title: 'Quem e Raphael Vitoi | Manifesto',
  description: 'Educador, Estrategista, Profissional de Poker, Escritor e Especialista em Sistemas Complexos.',
};

export default function QuemSouPage() {
  return (
    <main className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>

      <section id="hero-aula">
        <h2>Sobre o Autor</h2>
        <p><strong>Educador, Estrategista, Profissional de Poker, Escritor e Especialista em Sistemas Complexos.</strong></p>
      </section>

      {/* Video Player */}
      <section>
        <div className="video-wrapper">
          <div className="video-container">
            <video controls autoPlay muted playsInline preload="metadata">
              <source src="/0309.mp4" type="video/mp4" />
              Seu navegador nao suporta a tag de video.
            </video>
          </div>
        </div>
      </section>

      <section id="manifesto">
        <article style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h3>Sobre o Autor</h3>
          <p>Educador e Profissional de Poker ha mais de dez anos, Raphael Vitoi e um especialista em <strong>Sistemas Complexos, ICM, Multiway Spots e Teoria dos Jogos</strong>. Sua abordagem transita entre a <strong>Analise Bayesiana, Preditiva e Recursiva</strong>, focando na adaptacao estrategica e analise comportamental (GTO e desvio).</p>
          <p>Alem das mesas, mergulha na <strong>Psicologia do Poker</strong>, dissecando os vieses cognitivos que custam dinheiro.</p>

          <div className="callout" style={{ textAlign: 'left', marginTop: '2rem' }}>
            <p><strong>Polimata e Estrategista:</strong> Raphael nao ensina apenas &quot;cartas&quot;; ele ensina arquitetura de decisao. Como <strong>Embaixador Deepsolver</strong>, <strong>Afiliado GTO Wizard</strong> e criador do <strong>trueICM</strong>, ele decodifica a complexidade dos sistemas para jogadores que buscam o topo da cadeia alimentar.</p>
          </div>

          <p><em>&quot;O poker nao e sobre sorte. E sobre a gestao elegante da incerteza.&quot;</em></p>

          <div style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <span style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-primary)', padding: '0.2rem 0.8rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700, border: '1px solid var(--accent-primary)' }}>Embaixador Deepsolver</span>
            <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-emerald)', padding: '0.2rem 0.8rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700, border: '1px solid var(--accent-emerald)' }}>Afiliado GTO Wizard</span>
            <span style={{ background: 'rgba(225, 29, 72, 0.1)', color: 'var(--accent-secondary)', padding: '0.2rem 0.8rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700, border: '1px solid var(--accent-secondary)' }}>Criador trueICM.com</span>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <Link href="/#metodo" className="card-cta" style={{ fontSize: '1rem' }}>
              Conhecer o Metodo Poker Racional &rarr;
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
