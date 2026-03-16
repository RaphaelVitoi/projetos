/**
 * IDENTITY: Rota do Simulador Mestre ICM
 * PATH: src/app/tools/simulador/page.tsx
 * ROLE: Ponto de entrada da rota /tools/simulador.
 * BINDING: [components/simulator/MasterSimulator.tsx]
 */

import type { Metadata } from 'next';
import MasterSimulator from '../../../components/simulator/MasterSimulator';

export const metadata: Metadata = {
  title: 'Motor ICM | Raphael Vitoi',
  description:
    'Simulador Mestre de ICM e Risk Premium. 9 cenários clínicos, motor Nash, calculadora Malmuth-Harville, quizzes interativos, modo comparação e simulação por mão.',
};

export default function SimuladorPage() {
  return <MasterSimulator />;
}
