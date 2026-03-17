/**
 * IDENTITY: Biblioteca Epistêmica
 * PATH: src/app/biblioteca/page.tsx
 * ROLE: Acervo de artigos. Hub teórico.
 * BINDING: [layout.tsx, globals.css]
 */

import Link from 'next/link';

export const metadata = {
  title: 'Biblioteca Epistêmica | Raphael Vitoi',
  description: 'Acervo SOTA de Teoria dos Jogos, Psicologia e Existencialismo.',
};

interface MockArticle {
  readonly id: string;
  readonly title: string;
  readonly excerpt: string;
  readonly readTime: string;
  readonly tags: string[];
  readonly icon: string;
  readonly status: 'em-breve' | 'disponivel';
  readonly href?: string;
}

const MOCK_ARTICLES: MockArticle[] = [
  {
    id: '1',
    icon: '⚖️',
    title: 'O Paradoxo do Valuation no ICM',
    excerpt: 'Por que acumular fichas pode diminuir sua esperança matemática em spots específicos da reta final.',
    readTime: '12 min',
    tags: ['Teoria', 'ICM', 'Matemática'],
    status: 'disponivel',
    href: '/biblioteca/paradoxo-valuation',
  },
  {
    id: '2',
    icon: '🧠',
    title: 'Hermenêutica do Blefe',
    excerpt: 'Lendo as intenções do oponente através da lente do excesso de gozo e da psicanálise lacaniana.',
    readTime: '15 min',
    tags: ['Psicologia', 'Comportamento'],
    status: 'disponivel',
    href: '/biblioteca/hermeneutica-blefe',
  },
  {
    id: '3',
    icon: '📉',
    title: 'O Motor de Diluição',
    excerpt: 'Como o Risk Premium afeta os ranges de call de forma não-linear.',
    readTime: '8 min',
    tags: ['ICM', 'Estratégia'],
    status: 'disponivel',
    href: '/biblioteca/motor-diluicao',
  },
];

export default function BibliotecaPage() {
  return (
    <main className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '4rem 1.5rem' }}>

      {/* Hero */}
      <header className="page-header" style={{ paddingBottom: '1rem' }}>
        <p className="page-label">
          <span className="fa-solid fa-book-journal-whills"></span> Domínio Teórico
        </p>
        <h1>Biblioteca Epistêmica</h1>
        <p className="page-subtitle" style={{ maxWidth: '660px' }}>
          Acervo SOTA de Teoria dos Jogos, Psicologia e Existencialismo. A fundação teórica para suportar a variância implacável e transcender o solver.
        </p>
      </header>

      {/* Grade de Artigos */}
      <div className="hub-grid" style={{ alignItems: 'start', marginTop: '2rem' }}>
        {MOCK_ARTICLES.map((article) => {
          const inner = (
            <>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span className="hub-icon" style={{ marginBottom: 0 }}>{article.icon}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                  {article.readTime}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.85rem' }}>
                {article.tags.map((tag) => (
                  <span key={tag} className="article-tag">{tag}</span>
                ))}
              </div>
              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>
              <span className="card-cta" style={article.status === 'em-breve' ? { opacity: 0.4, cursor: 'default' } : {}}>
                {article.status === 'disponivel' ? 'Ler Artigo →' : 'Em breve →'}
              </span>
            </>
          );
          return article.status === 'disponivel' && article.href ? (
            <Link key={article.id} href={article.href} className="hub-card">{inner}</Link>
          ) : (
            <div key={article.id} className="hub-card" style={{ cursor: 'default' }}>{inner}</div>
          );
        })}
      </div>

      {/* Em Desenvolvimento */}
      <section style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid var(--border-color)' }}>
        <p className="page-label" style={{ textAlign: 'center', marginBottom: '0.75rem' }}>
          <span className="fa-solid fa-flask"></span> Em Construção
        </p>
        <h3 style={{ textAlign: 'center', fontSize: '1.6rem', marginBottom: '2.5rem' }}>
          Próximas Adições
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          {[
            { icon: 'fa-brain', color: 'var(--accent-primary)', title: 'Prospect Theory no Poker', desc: 'Kahneman e Tversky encontram o Risk Premium: como a assimetria da dor distorce decisões de FT.' },
            { icon: 'fa-atom', color: 'var(--accent-emerald)', title: 'Teoria dos Jogos Aplicada', desc: 'Do dilema do prisioneiro ao equilíbrio de Nash em mesas multiway com ICM assimétrico.' },
            { icon: 'fa-infinity', color: 'var(--accent-amber)', title: 'Existencialismo e Variância', desc: 'Sartre, Camus e a construção de sentido no longo prazo implacável do poker profissional.' },
          ].map(({ icon, color, title, desc }) => (
            <div key={title} style={{
              background: 'var(--bg-card)',
              backdropFilter: 'blur(12px)',
              border: 'var(--glass-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}>
              <span className={`fa-solid ${icon}`} style={{ color, fontSize: '1.1rem' }}></span>
              <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: 1.3 }}>{title}</strong>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA para conteudo existente */}
      <div className="callout" style={{ marginTop: '3rem', textAlign: 'center' }}>
        <p style={{ marginBottom: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Enquanto o acervo cresce, explore o conteúdo já publicado:
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/leitura-icm" className="card-cta" style={{ fontSize: '0.85rem' }}>Whitepaper ICM &rarr;</Link>
          <Link href="/artigos/estado-da-arte" className="card-cta" style={{ fontSize: '0.85rem' }}>Estado da Arte 2025 &rarr;</Link>
          <Link href="/artigos/smart-sniper" className="card-cta" style={{ fontSize: '0.85rem' }}>Protocolo Smart Sniper &rarr;</Link>
        </div>
      </div>

      <nav className="article-nav" style={{ marginTop: '4rem' }}>
        <Link href="/">&larr; Hub Central</Link>
        <Link href="/aula-icm">Aula ICM &rarr;</Link>
      </nav>
    </main>
  );
}
