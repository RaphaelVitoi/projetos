/**
 * IDENTITY: Landing Page Principal (Nexus Central)
 * PATH: src/app/page.tsx
 * ROLE: Atuar como a página de alta conversão do ecossistema Raphael Vitoi. O design visual foi 100% estabilizado no globals.css.
 * BINDING: [src/app/layout.tsx, globals.css, src/app/tools/icm/page.tsx, src/app/psicologia-hs/page.tsx]
 * TELEOLOGY: Atuar como a "Boca do Funil". A estrutura atual não deve ser sobrescrita por sub-módulos, mas sim evoluir para abrigar links holográficos para os futuros laboratórios de Teoria dos Jogos e Psicologia HS.
 */

import Link from 'next/link';
import { Suspense } from 'react';
import prisma from '@/lib/prisma';

// 1. Componente Assíncrono Isolado (Proteção de FCP orientada pelo @auditor)
async function LatestPostsFeed() {
  let posts = [];
  try {
    posts = await prisma.post.findMany({
      take: 3,
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.warn("[NEXUS] Banco de dados indisponível. Injetando dados defensivos de fallback.", error);
    // Mock defensivo para evitar que a página quebre na falta do Prisma DB
    posts = [
      { id: '1', title: 'A Ameaça Orgânica no River', excerpt: 'Como a sobrecarga de Risk Premium induz o cérebro límbico a cometer blefes irracionais.', readTime: '08 MIN', tags: ['Mindset', 'Neurobiologia'] },
      { id: '2', title: 'O Paradoxo do Valuation no ICM', excerpt: 'Por que acumular fichas pode diminuir sua esperança matemática em spots específicos.', readTime: '12 MIN', tags: ['Teoria', 'ICM'] },
      { id: '3', title: 'A Metáfora do Homem-Bomba', excerpt: 'O excesso de gozo lacaniano e a agressividade autodestrutiva como alívio de pressão.', readTime: '15 MIN', tags: ['Psicanálise', 'Filosofia'] }
    ];
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
      {posts.map((post: any) => (
        <article key={post.id} className="bg-slate-900/60 backdrop-blur-md border border-white/5 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-primary/30 flex flex-col h-full group">
          <div className="flex justify-between items-start mb-4">
            <div className="flex gap-2 flex-wrap">
              {post.tags?.map((tag: string) => (
                <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-800/50 px-2 py-1 rounded border border-white/5">
                  {tag}
                </span>
              ))}
            </div>
            <span className="text-xs text-slate-500 data-mono">{post.readTime || '5 MIN'}</span>
          </div>
          <h3 className="text-lg font-heading font-bold text-white mb-2 group-hover:text-accent-primary transition-colors">{post.title}</h3>
          <p className="text-slate-400 text-sm flex-grow leading-relaxed">{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}

// 2. Esqueleto de Carregamento (O que o usuário vê antes do banco responder)
function PostsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-slate-900/40 border border-white/5 rounded-xl p-6 h-48 animate-pulse flex flex-col">
          <div className="h-4 bg-slate-800 rounded w-1/4 mb-4"></div>
          <div className="h-6 bg-slate-800 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-slate-800 rounded w-full mb-2"></div>
          <div className="h-4 bg-slate-800 rounded w-2/3"></div>
        </div>
      ))}
    </div>
  );
}

// 3. A Espinha Dorsal (Página Principal Estática)
export default function HomePage() {
  return (
    <main className="container mx-auto px-4" style={{ padding: '4rem 0' }}>
      
      {/* Hero Section */}
      <section className="text-center mb-16 animate-fade-up">
        <span className="block font-mono text-xs text-accent-primary tracking-widest uppercase mb-4">O Templo do Aprendizado Generativo</span>
        <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 leading-tight text-white">
          O Edge Mudou de Lugar.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">Domine a Incerteza.</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8 font-light italic">
          A harmonia entre a frieza do código binário e a densidade da psicologia humana. 
          Onde a intuição encontra a precisão matemática.
        </p>
      </section>

      {/* Vitrine de Laboratórios (Bifurcação do Funil) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 animate-fade-up" style={{ animationDelay: '0.1s' }}>
        
        {/* Lab ICM (Frio) */}
        <Link href="/tools/icm" className="block group">
          <div className="glass-panel p-8 h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_-15px_rgba(56,189,248,0.3)] hover:border-sky-500/30">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-sky-500/10 flex items-center justify-center border border-sky-500/20 text-sky-400 font-mono font-bold">01</div>
              <h2 className="text-2xl font-heading font-bold text-white group-hover:text-sky-400 transition-colors">Motor Algorítmico ICM</h2>
            </div>
            <p className="text-slate-400 text-sm mb-6">Simulador de Equidade em Torneios (Malmuth-Harville). Visualize e sinta a pressão do Risk Premium.</p>
            <span className="text-xs font-bold tracking-widest text-sky-400 uppercase border-b border-sky-500/0 group-hover:border-sky-500/50 pb-1 transition-all">Acessar Laboratório &rarr;</span>
          </div>
        </Link>

        {/* Lab Psicologia (Quente) */}
        <Link href="/psicologia-hs" className="block group">
          <div className="glass-panel p-8 h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_-15px_rgba(217,70,239,0.3)] hover:border-fuchsia-500/30">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-fuchsia-500/10 flex items-center justify-center border border-fuchsia-500/20 text-fuchsia-400 font-mono font-bold">02</div>
              <h2 className="text-2xl font-heading font-bold text-white group-hover:text-fuchsia-400 transition-colors">Psicologia High Stakes</h2>
            </div>
            <p className="text-slate-400 text-sm mb-6">Hermenêutica e contrapeso humano à rigidez do solver. O excesso de gozo lacaniano e controle límbico.</p>
            <span className="text-xs font-bold tracking-widest text-fuchsia-400 uppercase border-b border-fuchsia-500/0 group-hover:border-fuchsia-500/50 pb-1 transition-all">Acessar Protocolos &rarr;</span>
          </div>
        </Link>

        {/* Biblioteca (Neutro/Sábio) */}
        <Link href="/biblioteca" className="block group">
          <div className="glass-panel p-8 h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_-15px_rgba(148,163,184,0.3)] hover:border-slate-400/30">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-slate-500/10 flex items-center justify-center border border-slate-500/20 text-slate-400 font-mono font-bold">03</div>
              <h2 className="text-2xl font-heading font-bold text-white group-hover:text-slate-300 transition-colors">Biblioteca Epistêmica</h2>
            </div>
            <p className="text-slate-400 text-sm mb-6">Acervo de Filosofia, Psicologia e Existencialismo. A fundação teórica para suportar a variância implacável.</p>
            <span className="text-xs font-bold tracking-widest text-slate-400 uppercase border-b border-slate-500/0 group-hover:border-slate-500/50 pb-1 transition-all">Acessar Acervo &rarr;</span>
          </div>
        </Link>
      </section>

      {/* Ingestão de Dados (O Streaming de UI via Prisma) */}
      <section className="pt-10 border-t border-white/5">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-xl font-heading font-bold text-white">Últimos Protocolos</h2>
            <p className="text-sm text-slate-500 mt-1">Sinais extraídos do banco de dados (MDA)</p>
          </div>
          <Link href="/psicologia-hs" className="text-xs font-bold tracking-widest text-slate-400 hover:text-white uppercase transition-colors hidden sm:block">
            Ver Todos
          </Link>
        </div>
        
        <Suspense fallback={<PostsSkeleton />}>
          <LatestPostsFeed />
        </Suspense>
      </section>
      
    </main>
  );
}