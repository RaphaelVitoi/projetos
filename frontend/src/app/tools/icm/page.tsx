/**
 * IDENTITY: Rota Principal do Simulador ICM
 * PATH: frontend/src/app/tools/icm/page.tsx
 * ROLE: Ponto de entrada do laboratório visual de ICM Equity e Risk Premium
 * BINDING: [ICMCalculator, SimuladorICM]
 */

import ICMCalculator from '@/components/icm/ICMCalculator';
import SimuladorICM from '@/components/icm/SimuladorICM';
import Link from 'next/link';

export const metadata = {
  title: 'Simulador ICM | Raphael Vitoi',
  description: 'Motor Algorítmico de Equidade em Torneios (Malmuth-Harville). Laboratório interativo de ICM e Risk Premium.',
};

export default function IcmPage() {
  return (
    <main style={{ minHeight: '100vh' }}>
      {/* Header Padronizado */}
      <header className="page-header">
        <p className="page-label">
          <span className="fa-solid fa-flask"></span> Laboratório Interativo
        </p>
        <h1>Simulador ICM</h1>
        <p className="page-subtitle">
          Motor Algorítmico de Equidade em Torneios (Malmuth-Harville). Visualize o impacto do Risk Premium nas suas decisões.
        </p>
      </header>

      {/* Calculadora ICM (React nativa com Malmuth-Harville) */}
      <div className="sim-container">
        <ICMCalculator />

        {/* Simulador de Cenários (Web Components + ApexCharts) */}
        <section className="sim-section">
          <div className="sim-section-header">
            <p className="page-label">
              <span className="fa-solid fa-chart-area"></span> Geometria do Risco Engine
            </p>
            <h2>Simulador de Cenários</h2>
            <p>Cenários pré-configurados com gauges de Risk Premium, modo comparação e exportação PDF.</p>
          </div>
          <SimuladorICM />
        </section>

        <nav className="article-nav" style={{ marginBottom: '4rem' }}>
          <Link href="/leitura-icm">&larr; Ler o Whitepaper: Entendendo o ICM</Link>
          <Link href="/tools/masterclass">Masterclass Interativa &rarr;</Link>
        </nav>
      </div>
    </main>
  );
}
