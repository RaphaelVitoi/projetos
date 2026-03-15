'use client';

import { useEffect, useRef } from 'react';

/**
 * IDENTITY: Simulador ICM Interativo (Client Component)
 * ROLE: Carregar o motor vanilla JS do simulador (Web Components + ApexCharts)
 *       dentro do ciclo de vida do React via useEffect.
 * BINDING: [/simulador/main.js, /simulador/scenarios.js, /simulador/scenario-list.js, /simulador/risk-gauge.js]
 */
export default function SimuladorICM() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptsLoaded = useRef(false);

  useEffect(() => {
    if (scriptsLoaded.current) return;
    scriptsLoaded.current = true;

    // Carregar ApexCharts (dependencia do simulador)
    const apexScript = document.createElement('script');
    apexScript.src = 'https://cdn.jsdelivr.net/npm/apexcharts';
    apexScript.async = true;
    document.head.appendChild(apexScript);

    // Carregar html2pdf (exportacao)
    const pdfScript = document.createElement('script');
    pdfScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    pdfScript.async = true;
    document.head.appendChild(pdfScript);

    // Carregar CSS do simulador
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/simulador/style-overrides.css';
    document.head.appendChild(link);

    // Carregar scripts do motor (em sequencia)
    apexScript.onload = () => {
      const loadScript = (src: string) => {
        return new Promise<void>((resolve) => {
          const s = document.createElement('script');
          s.type = 'module';
          s.src = src;
          s.onload = () => resolve();
          document.body.appendChild(s);
        });
      };

      // Ordem: scenarios -> components -> main
      loadScript('/simulador/scenarios.js')
        .then(() => loadScript('/simulador/risk-gauge.js'))
        .then(() => loadScript('/simulador/scenario-list.js'))
        .then(() => loadScript('/simulador/main.js'));
    };

    return () => {
      // Cleanup ao desmontar
      [apexScript, pdfScript].forEach((s) => s.remove());
      link.remove();
    };
  }, []);

  return (
    <div ref={containerRef}>
      <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950 shadow-[0_0_50px_rgba(99,102,241,0.05)]">
        {/* Header do Simulador */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/80 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
            </div>
            <span className="text-[10px] font-bold text-slate-300 tracking-[0.15em] uppercase">
              Geometria do Risco Engine <span className="text-indigo-400">v2.0</span>
            </span>
          </div>
          <button
            id="btn-mode-compare"
            className="text-[9px] font-bold uppercase tracking-widest px-4 py-2 rounded bg-slate-800 border border-slate-700 text-slate-300 hover:bg-indigo-600 hover:border-indigo-500 hover:text-white transition-all flex items-center gap-2"
          >
            <i className="fa-solid fa-code-compare"></i> Comparar
          </button>
        </div>

        {/* Corpo do Simulador */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
          {/* Sidebar de Cenarios */}
          <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-slate-800 bg-[#0a0f1c] p-4">
            <div className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-4 px-2 flex items-center gap-2">
              <i className="fa-solid fa-list-ul"></i> Selecao Tatica
            </div>
            {/* Web Component: Scenario List */}
            <div dangerouslySetInnerHTML={{ __html: '<scenario-list id="main-scenario-list"></scenario-list>' }} />
          </div>

          {/* Painel Principal */}
          <div className="lg:col-span-8 bg-slate-950 relative p-6 md:p-8">
            {/* Visao Cenario Unico */}
            <div id="single-scenario-view">
              <div className="flex flex-col mb-8">
                <div
                  id="stage-context"
                  className="self-start px-3 py-1 rounded border border-indigo-500/20 text-indigo-400 bg-indigo-500/10 text-[10px] font-bold uppercase tracking-widest mb-4"
                >
                  Iniciando Motor...
                </div>
                <h2 id="stage-title" className="text-3xl md:text-4xl font-editorial font-bold text-white leading-tight">
                  Carregando Dados...
                </h2>
              </div>

              {/* Gauges (Web Components) */}
              <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8">
                <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 flex flex-col items-center shadow-inner">
                  <div className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
                    <i className="fa-solid fa-khanda text-indigo-500/50 text-sm"></i> Agressor (IP)
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: '<risk-gauge id="gauge-ip" color="indigo"></risk-gauge>' }} />
                </div>
                <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 flex flex-col items-center shadow-inner">
                  <div className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
                    <i className="fa-solid fa-shield text-pink-500/50 text-sm"></i> Defensor (OOP)
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: '<risk-gauge id="gauge-oop" color="pink"></risk-gauge>' }} />
                </div>
              </div>

              {/* Area Dinamica gerada pelo motor */}
              <div id="content-area"></div>
            </div>

            {/* Visao de Comparacao */}
            <div id="compare-area" className="hidden"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
