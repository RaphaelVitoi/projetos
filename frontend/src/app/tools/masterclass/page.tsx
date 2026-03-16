/**
 * IDENTITY: Rota da Masterclass - A Geometria do Risco
 * PATH: frontend/src/app/tools/masterclass/page.tsx
 * ROLE: Interface interativa com 6 cenários clínicos, NashSolver, quizzes e diluição SPR.
 * BINDING: [RiskGeometryMasterclass, masterpiece.module.css]
 */

import RiskGeometryMasterclass from '@/components/icm/RiskGeometryMasterclass';
import Link from 'next/link';

export const metadata = {
    title: 'A Geometria do Risco | Masterclass | Raphael Vitoi',
    description: 'Masterclass interativa de ICM e Risk Premium. 6 cenários clínicos com NashSolver, quizzes e diluição SPR.',
};

export default function MasterclassPage() {
    return (
        <>
            <RiskGeometryMasterclass />
            <div className="sim-container" style={{ paddingBottom: '4rem' }}>
                <nav className="article-nav">
                    <Link href="/tools/icm">&larr; Simulador ICM</Link>
                    <Link href="/tools/toy-games">Toy Games: Predator Mode &rarr;</Link>
                </nav>
            </div>
        </>
    );
}
