/**
 * IDENTITY: Rota Principal do Simulador ICM
 * PATH: frontend/src/app/tools/icm/page.tsx
 * ROLE: Ponto de entrada do laboratorio visual de ICM Equity e Risk Premium
 * BINDING: [ICMCalculator, SimuladorICM]
 */

import ICMCalculator from '@/components/icm/ICMCalculator';
import SimuladorICM from '@/components/icm/SimuladorICM';
import Link from 'next/link';

export const metadata = {
  title: 'Simulador ICM | Raphael Vitoi',
  description: 'Motor Algoritmico de Equidade em Torneios (Malmuth-Harville). Laboratorio interativo de ICM e Risk Premium.',
};

export default function IcmPage() {
  return (
    <main style={{ minHeight: '100vh', padding: '2rem 1.5rem' }}>
      <header style={{ maxWidth: '1200px', margin: '0 auto 2rem', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
          Laboratorio Interativo
        </p>
        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
          Simulador ICM
        </h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Motor Algoritmico de Equidade em Torneios (Malmuth-Harville). Visualize o impacto do Risk Premium nas suas decisoes.
        </p>
      </header>

      {/* Calculadora ICM (React nativa com Malmuth-Harville) */}
      <ICMCalculator />

      {/* Simulador de Cenarios (Web Components + ApexCharts) */}
      <section style={{ maxWidth: '1200px', margin: '4rem auto 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
            Geometria do Risco Engine
          </p>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
            Simulador de Cenarios
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto' }}>
            Cenarios pre-configurados com gauges de Risk Premium, modo comparacao e exportacao PDF.
          </p>
        </div>
        <SimuladorICM />
      </section>

      <div style={{ maxWidth: '1200px', margin: '3rem auto 0', textAlign: 'center' }}>
        <Link href="/leitura-icm" style={{ color: 'var(--text-muted)', textDecoration: 'underline', fontSize: '0.9rem' }}>
          &larr; Ler o Whitepaper: Entendendo o ICM
        </Link>
      </div>
    </main>
  );
}
