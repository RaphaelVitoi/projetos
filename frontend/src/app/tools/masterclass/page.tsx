/**
 * IDENTITY: Rota da Masterclass - A Geometria do Risco
 * PATH: frontend/src/app/tools/masterclass/page.tsx
 * ROLE: Interface interativa com 6 cenarios clinicos, NashSolver, quizzes e diluicao SPR.
 * BINDING: [RiskGeometryMasterclass, masterpiece.module.css]
 */

import RiskGeometryMasterclass from '@/components/icm/RiskGeometryMasterclass';

export const metadata = {
    title: 'A Geometria do Risco | Masterclass | Raphael Vitoi',
    description: 'Masterclass interativa de ICM e Risk Premium. 6 cenarios clinicos com NashSolver, quizzes e diluicao SPR.',
};

export default function MasterclassPage() {
    return <RiskGeometryMasterclass />;
}
