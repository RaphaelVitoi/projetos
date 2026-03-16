import Link from 'next/link';
import CodeBlock from '@/components/content/CodeBlock';

export const metadata = {
  title: 'Biblioteca Epistêmica | Raphael Vitoi',
  description: 'Acervo SOTA de Teoria dos Jogos, Psicologia e Existencialismo.',
};

interface MockArticle {
  readonly id: string;
  readonly title: string;
  readonly excerpt: string;
  readonly slug: string;
  readonly readTime: string;
  readonly tags: string[];
}

const MOCK_ARTICLES: MockArticle[] = [
  {
    id: '1',
    title: 'O Paradoxo do Valuation no ICM',
    excerpt: 'Por que acumular fichas pode diminuir sua esperança matemática em spots específicos da reta final.',
    slug: 'paradoxo-valuation-icm',
    readTime: '12 MIN',
    tags: ['Teoria', 'ICM', 'Matemática']
  },
  {
    id: '2',
    title: 'Hermenêutica do Blefe',
    excerpt: 'Lendo as intenções do oponente através da lente do excesso de gozo e da psicanálise lacaniana.',
    slug: 'hermeneutica-do-blefe',
    readTime: '15 MIN',
    tags: ['Psicologia', 'Comportamento']
  },
  {
    id: '3',
    title: 'O Motor de Diluição',
    excerpt: 'Como o Risk Premium afeta os ranges de call de forma não-linear.',
    slug: 'motor-de-diluicao',
    readTime: '8 MIN',
    tags: ['ICM', 'Estratégia']
  }
];

export default function BibliotecaPage() {
  return (
    <main className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 1.5rem' }}>

      {/* Hero */}
      <header className="page-header animate-fade-up" style={{ padding: '2rem 0 1rem' }}>
        <p className="page-label">
          <span className="fa-solid fa-book-journal-whills"></span> Domínio Teórico
        </p>
        <h1>Biblioteca Epistêmica</h1>
        <p className="page-subtitle" style={{ maxWidth: '700px' }}>
          Acervo SOTA de Teoria dos Jogos, Psicologia e Existencialismo. A fundação teórica para suportar a variância implacável e transcender o solver.
        </p>
      </header>

      {/* Grade de Artigos */}
      <div className="hub-grid animate-fade-up" style={{ animationDelay: '0.1s' }}>
        {MOCK_ARTICLES.map((article) => (
          <div key={article.id} className="hub-card" style={{ cursor: 'default' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {article.tags.map((tag) => (
                  <span key={tag} style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', background: 'rgba(30, 41, 59, 0.8)', padding: '0.15rem 0.5rem', borderRadius: '3px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    {tag}
                  </span>
                ))}
              </div>
              <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                {article.readTime}
              </span>
            </div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>{article.title}</h3>
            <p style={{ flexGrow: 1 }}>{article.excerpt}</p>
            <span className="card-cta">Em breve &rarr;</span>
          </div>
        ))}
      </div>

      {/* Secao CodeBlock */}
      <section className="animate-fade-up" style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid var(--border-color)', animationDelay: '0.2s' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', alignItems: 'center' }}>
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
              <span className="fa-solid fa-microchip" style={{ marginRight: '0.5rem' }}></span> Integração Sistêmica
            </p>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Fragmentos Executáveis</h3>
            <p style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
              A biblioteca não é apenas texto. É código, heurística e motores matemáticos.
            </p>
          </div>
          <div>
            <CodeBlock
              language="typescript"
              code={`export function calculateICM(stacks: number[], payouts: number[]): number[] {
  // Lógica recursiva de Estado da Arte para cálculo ICM
  // Reflete a assimetria do risco nos torneios
  return stacks.map(() => 0);
}`}
            />
          </div>
        </div>
      </section>

      <div style={{ marginTop: '4rem', textAlign: 'center' }}>
        <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'underline', fontSize: '0.9rem' }}>
          &larr; Retornar ao Hub Central
        </Link>
      </div>
    </main>
  );
}
