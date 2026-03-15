/**
 * IDENTITY: Pagina ICM Masterclass
 * PATH: src/app/aula-icm/page.tsx
 * ROLE: Aula principal de ICM e Risk Premium Pos-Flop. Conteudo estatico (Server Component)
 *       com simulador interativo carregado via Client Component.
 * BINDING: [layout.tsx, globals.css, SimuladorICM.tsx]
 */

import Link from 'next/link';
import SimuladorICM from '@/components/icm/SimuladorICM';

export const metadata = {
  title: 'ICM Pos-Flop | Raphael Vitoi',
  description: 'Aula Exclusiva: ICM e Risk Premium no Poker. A Geometria do Risco e a desconstrucao do pos-flop.',
};

export default function AulaICMPage() {
  return (
    <main className="pt-8 pb-20">
      {/* HERO SECTION */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-bold uppercase tracking-widest mb-6">
          <span className="fa-solid fa-bolt"></span> State of the Art
        </div>
        <h2 className="text-5xl md:text-7xl font-editorial font-bold text-white mb-6 leading-tight glow-text">
          O Edge Mudou de Lugar.
        </h2>
        <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto">
          Descubra por que jogar ChipEV em mesas finais esta custando, em media, mais de{' '}
          <strong className="text-rose-400">10% do seu ROI</strong> &mdash; e como a elite do poker
          usa o &quot;Downward Drift&quot; para dominar o pos-flop em 2026.
        </p>
      </section>

      {/* MANIFESTO / ARTICLE */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <article className="prose prose-invert prose-slate lg:prose-lg mx-auto">
          <h2 className="text-3xl font-bold text-white font-editorial mb-2">A Geometria do Risco</h2>
          <p className="text-indigo-400 font-bold uppercase text-xs tracking-[0.2em] mb-10">
            A Desconstrucao do Pos-Flop sob a Otica do ICM
          </p>

          <blockquote className="border-l-4 border-indigo-500 bg-slate-900/50 p-6 rounded-r-xl text-slate-300 italic mb-10">
            &quot;O poker e uma ciencia de informacao incompleta jogada por humanos falhos. Acreditamos
            dominar a matematica, mas frequentemente somos traidos por aplicar a equacao certa no
            universo errado.&quot;
          </blockquote>

          <h4 className="text-white font-bold text-xl mb-4">1. A Ilusao do Vacuo (ChipEV vs. ICM)</h4>
          <p className="mb-6">
            Hoje, a teoria do poker esta democratizada. Solvers (PioSolver, GTO Wizard) e trackers
            mapearam as tendencias da populacao. No entanto, uma cegueira coletiva ainda assombra o
            High Stakes: a aplicacao robotica de conceitos de ChipEV em ambientes de alta pressao
            utilitaria (ICM).
          </p>
          <p className="mb-10">
            Fora do Heads-Up, praticamente todas as fases de um torneio sao distorcidas pelo ICM.
            Uma ficha ganha nunca tera o mesmo valor de uma ficha perdida. O erro do jogador mediano
            e tentar aplicar o classico MDF (Minimum Defense Frequency) numa Mesa Final onde a sua
            sobrevivencia financeira esta em risco.
          </p>

          <h4 className="text-white font-bold text-xl mb-4">2. O Motor Invisivel: Risk Premium (RP) e Bubble Factor (BF)</h4>
          <p className="mb-4">Para entender a mutacao dos ranges, precisamos entender o peso das fichas:</p>
          <ul className="list-disc pl-6 mb-10 space-y-2">
            <li>
              <strong className="text-white">Bubble Factor (BF):</strong> E o multiplicador da dor.
              Se o seu BF e de 1.5, significa que perder a mao lhe custa 50% a mais do que o valor
              que voce ganharia.
            </li>
            <li>
              <strong className="text-white">Risk Premium (RP):</strong> E a traducao do BF em
              equidade. A &quot;taxa extra&quot; de certeza matematica que voce precisa ter para
              colocar o seu torneio em risco.
            </li>
          </ul>

          <h4 className="text-white font-bold text-xl mb-4">3. Os 4 Arquetipos Clinicos do ICM</h4>
          <p className="mb-6">Ao analisarmos matrizes reais de Mesa Final, identificamos quatro comportamentos absolutos:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 not-prose">
            <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800 hover:border-indigo-500/30 transition-colors">
              <p className="font-bold text-white mb-2">
                <span className="fa-solid fa-shield-halved text-indigo-400 mr-2"></span> O Pacto Silencioso
              </p>
              <p className="text-sm text-slate-400">
                Chip Leader vs Vice CL. O RP de ambos ultrapassa 20%. A Resolucao de Nash cria um
                &quot;Pacto Silencioso&quot; de evitacao de ruina mutua.
              </p>
            </div>
            <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800 hover:border-pink-500/30 transition-colors">
              <p className="font-bold text-white mb-2">
                <span className="fa-solid fa-scale-unbalanced text-pink-400 mr-2"></span> Paradoxo do Valuation
              </p>
              <p className="text-sm text-slate-400">
                Mid Stack (IP) vs Big Blind (OOP). O Mid acha que pode pressionar, mas o BB
                sobrevive a colisao enquanto o Mid vira po.
              </p>
            </div>
            <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800 hover:border-emerald-500/30 transition-colors">
              <p className="font-bold text-white mb-2">
                <span className="fa-solid fa-skull text-emerald-400 mr-2"></span> A Guerra na Lama
              </p>
              <p className="text-sm text-slate-400">
                Dois shorts. Quem entra em overfold massivo rezando pelo ICM acaba morrendo para os
                blinds e sangrando EV.
              </p>
            </div>
            <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800 hover:border-amber-500/30 transition-colors">
              <p className="font-bold text-white mb-2">
                <span className="fa-solid fa-crown text-amber-400 mr-2"></span> A Ameaca Organica
              </p>
              <p className="text-sm text-slate-400">
                Chip Leader ataca Vice. Se o CL perder, ele cria um monstro. O solver protege o seu
                &quot;God Mode&quot; limitando manobras arriscadas.
              </p>
            </div>
          </div>

          <h4 className="text-white font-bold text-xl mb-4">Conclusao: A Arte da Adaptacao</h4>
          <p>
            Os Solvers sao bussolas, nao destinos. A vantagem competitiva moderna nao esta em
            decorar tabelas pre-flop. Esta em compreender a Elasticidade do Risk Premium no pos-flop.
          </p>
        </article>
      </section>

      {/* CARDS DE RECURSOS */}
      <section className="max-w-5xl mx-auto px-6 mb-16" id="solucao">
        <h3 className="text-2xl font-bold text-white mb-8 text-center font-editorial">O Arsenal Tatico</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/leitura-icm" className="glass-panel p-6 rounded-xl hover:bg-slate-800/80 hover:-translate-y-1 transition-all group flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
              <span className="fa-solid fa-file-lines text-xl"></span>
            </div>
            <div>
              <h5 className="text-white font-bold">Ler Whitepaper</h5>
              <span className="text-xs text-slate-500 font-medium">Teoria Completa &rarr;</span>
            </div>
          </Link>
          <a href="#simulador-section" className="glass-panel p-6 rounded-xl hover:bg-slate-800/80 hover:-translate-y-1 transition-all group flex items-center gap-4 ring-1 ring-emerald-500/30">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <span className="fa-solid fa-gamepad text-xl"></span>
            </div>
            <div>
              <h5 className="text-white font-bold">Usar Simulador</h5>
              <span className="text-xs text-emerald-500/70 font-medium">Laboratorio Interativo &rarr;</span>
            </div>
          </a>
          <Link href="/aula-1-2" className="glass-panel p-6 rounded-xl hover:bg-slate-800/80 hover:-translate-y-1 transition-all group flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-colors">
              <span className="fa-solid fa-graduation-cap text-xl"></span>
            </div>
            <div>
              <h5 className="text-white font-bold">Aula 1.2</h5>
              <span className="text-xs text-slate-500 font-medium">Material Complementar &rarr;</span>
            </div>
          </Link>
        </div>
      </section>

      {/* SIMULADOR INTEGRADO */}
      <section id="simulador-section" className="max-w-6xl mx-auto px-4 mb-24 scroll-mt-24">
        <SimuladorICM />
      </section>
    </main>
  );
}
