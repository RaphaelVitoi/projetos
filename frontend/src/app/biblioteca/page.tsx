import Link from 'next/link';
import CodeBlock from '@/components/content/CodeBlock';

export const metadata = {
  title: 'Biblioteca Epistemica | Raphael Vitoi',
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
    excerpt: 'Por que acumular fichas pode diminuir sua esperanca matematica em spots especificos da reta final.',
    slug: 'paradoxo-valuation-icm',
    readTime: '12 MIN',
    tags: ['Teoria', 'ICM', 'Matematica']
  },
  {
    id: '2',
    title: 'Hermeneutica do Blefe',
    excerpt: 'Lendo as intencoes do oponente atraves da lente do excesso de gozo e da psicanalise lacaniana.',
    slug: 'hermeneutica-do-blefe',
    readTime: '15 MIN',
    tags: ['Psicologia', 'Comportamento']
  },
  {
    id: '3',
    title: 'O Motor de Diluicao',
    excerpt: 'Como o Risk Premium afeta os ranges de call de forma nao-linear.',
    slug: 'motor-de-diluicao',
    readTime: '8 MIN',
    tags: ['ICM', 'Estrategia']
  }
];

export default function BibliotecaPage() {
  return (
    <main className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 1.5rem' }}>

      {/* Hero */}
      <section id="hero-aula" className="animate-fade-up">
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
          <span className="fa-solid fa-book-journal-whills" style={{ marginRight: '0.5rem' }}></span> Dominio Teorico
        </p>
        <h2 style={{ background: 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Biblioteca Epistemica
        </h2>
        <p style={{ maxWidth: '700px', margin: '0 auto', fontStyle: 'italic' }}>
          Acervo SOTA de Teoria dos Jogos, Psicologia e Existencialismo. A fundacao teorica para suportar a variancia implacavel e transcender o solver.
        </p>
      </section>

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
              <span className="fa-solid fa-microchip" style={{ marginRight: '0.5rem' }}></span> Integracao Sistemica
            </p>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Fragmentos Executaveis</h3>
            <p style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
              A biblioteca nao e apenas texto. E codigo, heuristica e motores matematicos.
            </p>
          </div>
          <div>
            <CodeBlock
              language="typescript"
              code={`export function calculateICM(stacks: number[], payouts: number[]): number[] {
  // Logica recursiva de Estado da Arte para calculo ICM
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
