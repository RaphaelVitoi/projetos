import React from 'react';
import Link from 'next/link';
import CodeBlock from '@/components/content/CodeBlock';

export const metadata = {
  title: 'Biblioteca Epistêmica | Nexus',
  description: 'Acervo de Filosofia, Psicologia e Existencialismo.',
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
    <main className="container mx-auto px-4" style={{ padding: '4rem 0' }}>
      
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-xs font-mono font-bold tracking-widest text-slate-500 hover:text-white uppercase transition-colors group">
          <span className="fa-solid fa-arrow-left mr-2 group-hover:-translate-x-1 transition-transform"></span>
          Retornar ao Hub Central
        </Link>
      </div>

      {/* Hero Section do Hub (Padrão Masterclass Elite) */}
      <section className="text-center mb-20 animate-fade-up">
        <span className="block font-mono text-xs text-slate-400 tracking-widest uppercase mb-4 flex items-center justify-center gap-2">
          <span className="fa-solid fa-book-journal-whills"></span> Domínio Teórico
        </span>
        <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 leading-tight text-white">
          Biblioteca <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">Epistêmica</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light italic">
          Acervo SOTA de Teoria dos Jogos, Psicologia e Existencialismo. A fundação teórica para suportar a variância implacável e transcender o solver.
        </p>
      </section>

      {/* Grade de Artigos (Padrão Glass Panel + Micro-Interações) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
        {MOCK_ARTICLES.map((article) => (
          <Link key={article.id} href={`/blog/${article.slug}`} className="block group h-full">
            <article className="glass-panel p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_-15px_rgba(148,163,184,0.2)] hover:border-slate-500/30 flex flex-col h-full">
              <div className="flex justify-between items-start mb-8">
                <div className="flex gap-2 flex-wrap">
                  {article.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-slate-300 bg-slate-800/80 px-2 py-1 rounded border border-slate-600/50 shadow-inner">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-slate-500 data-mono flex items-center gap-1.5 bg-slate-950/50 px-2.5 py-1 rounded-md border border-white/5">
                  <span className="fa-regular fa-clock text-[10px]"></span> {article.readTime}
                </span>
              </div>
              
              <div className="mb-8 flex-grow">
                <h3 className="text-2xl font-heading font-bold text-white mb-4 group-hover:text-slate-300 transition-colors leading-snug">{article.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{article.excerpt}</p>
              </div>
              
              <div className="mt-auto border-t border-white/5 pt-6">
                <span className="flex items-center gap-2 text-xs font-bold tracking-widest text-slate-400 uppercase transition-all group-hover:text-white w-fit">
                  Acessar Protocolo <span className="fa-solid fa-arrow-right text-[10px] transition-transform group-hover:translate-x-1"></span>
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* Seção Integrada do CodeBlock (Padrão de Demonstração de Engine) */}
      <section className="mt-24 pt-16 border-t border-white/5 animate-fade-up relative overflow-hidden" style={{ animationDelay: '0.2s' }}>
        <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-5/12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-slate-500/10 flex items-center justify-center border border-slate-500/20 text-slate-400 font-mono font-bold">
                <span className="fa-solid fa-microchip"></span>
              </div>
              <span className="text-xs font-mono text-slate-400 tracking-widest uppercase">Integração Sistêmica</span>
            </div>
            <h2 className="text-3xl font-bold font-heading text-white mb-6 leading-tight">Fragmentos <br/><span className="text-slate-500">Executáveis</span></h2>
            <p className="text-slate-400 leading-relaxed mb-6 font-light">
              A biblioteca não é apenas texto. É código, heurística e motores matemáticos. Abaixo, uma validação da nossa interface interativa de <code className="text-white bg-white/10 px-1.5 py-0.5 rounded text-sm">CodeBlock</code> que permeia os artigos mais densos.
            </p>
          </div>
          <div className="lg:w-7/12 w-full">
            <CodeBlock 
              language="typescript"
              code={`export function calculateICM(stacks: number[], payouts: number[]): number[] {\n  // Lógica recursiva de Estado da Arte para cálculo ICM\n  // Reflete a assimetria do risco nos torneios\n  return stacks.map(() => 0);\n}`}
            />
          </div>
        </div>
      </section>
    </main>
  );
}