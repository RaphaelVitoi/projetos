/**
 * IDENTITY: Laboratório Toy Games (Predator Mode)
 * PATH: src/app/tools/toy-games/page.tsx
 * ROLE: Renderizar cenários didáticos extremos de ICM para gamificação do aprendizado.
 * BINDING: [layout.tsx, globals.css]
 */
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const SCENARIOS = [
    {
        id: 'sniper',
        label: 'O Franco-Atirador',
        subtitle: 'Blind War: SB (Hero) vs BB',
        icon: 'fa-crosshairs',
        color: 'emerald',
        ip: { pos: 'SB (Hero)', stack: '50bb', rp: 12, role: 'Chipleader', desc: 'Licença para matar. Pode shovar 100% (ATC).' },
        oop: { pos: 'BB (Villain)', stack: '12bb', rp: 45, role: 'Short Stack', desc: 'Death Zone. Paralisado pela existência de stacks de 8bb e 9bb na mesa.' },
        analysis: 'Predator Mode Ativado: Você é o Chipleader no SB. O BB tem 12bb e um Risk Premium de 45% (Death Zone). Matematicamente, ele não pode pagar com quase nada porque cair antes dos stacks de 8bb e 9bb é catastrófico. Seu range de shove aqui deve ser 100% (Any Two Cards).'
    },
    {
        id: 'bully',
        label: 'O Bully do Botão',
        subtitle: 'Bolha do ITM: BTN vs Blinds',
        icon: 'fa-skull-crossbones',
        color: 'rose',
        ip: { pos: 'BTN (Hero)', stack: '80bb', rp: 5, role: 'Bully', desc: 'RP ínfimo. Agressão quase sem custo.' },
        oop: { pos: 'SB (Villain)', stack: '20bb', rp: 42, role: 'Pressionado', desc: 'RP massivo (>40%). Paralisia na bolha.' },
        analysis: 'Estamos na Bolha. Você tem 80bb e os blinds têm 20bb/18bb. Seu Risk Premium é ínfimo (5%). O deles é massivo (>40%). Isso cria uma assimetria brutal. O solver sugere agressão desproporcional.'
    },
    {
        id: 'paradoxo',
        label: 'O Paradoxo do Valuation',
        subtitle: 'Estrutura Padrão: Mid vs Big',
        icon: 'fa-scale-balanced',
        color: 'amber',
        ip: { pos: 'BTN (Hero)', stack: '40bb', rp: 21.4, role: 'Inelástico', desc: 'RP de ida quase o dobro do RP de volta do BB.' },
        oop: { pos: 'BB (CL)', stack: '55bb', rp: 12.9, role: 'Defensivo Condensado', desc: 'Sobrevive a um all-in. Vantagem de risco.' },
        analysis: 'O senso comum dita que o BTN com 40bb possui conforto suficiente para oprimir a mesa. Contudo, o RP de ida do BTN é quase o dobro do RP de volta do BB. Se errar um hero-bluff, é aniquilado. A capacidade de blefar é estrangulada pela Esperança Matemática.'
    },
    {
        id: 'pacto',
        label: 'O Pacto Silencioso',
        subtitle: 'Colisão de Gigantes',
        icon: 'fa-handshake',
        color: 'indigo',
        ip: { pos: 'Vice CL', stack: '65bb', rp: 24.5, role: 'Linear Especulativo', desc: 'Destruição mútua é o pior cenário possível.' },
        oop: { pos: 'CL', stack: '70bb', rp: 23.5, role: 'Flat Call Massivo', desc: 'As fichas perdidas viram payjumps grátis.' },
        analysis: 'Dois gigantes colidem. A destruição mútua é o pior cenário possível. As fichas perdidas viram payjumps grátis aos inativos. Ocorre um Pacto Silencioso. A agressão letal (3-bet) colapsa. Os ranges de flat call inflam absurdamente, incluindo o topo.'
    }
];

const COLOR_MAP: Record<string, { accent: string; bg: string; border: string }> = {
    emerald: { accent: 'var(--accent-emerald)', bg: 'rgba(16, 185, 129, 0.08)', border: 'rgba(16, 185, 129, 0.3)' },
    rose: { accent: 'var(--accent-secondary)', bg: 'rgba(225, 29, 72, 0.08)', border: 'rgba(225, 29, 72, 0.3)' },
    amber: { accent: 'var(--accent-amber)', bg: 'rgba(245, 158, 11, 0.08)', border: 'rgba(245, 158, 11, 0.3)' },
    indigo: { accent: 'var(--accent-primary)', bg: 'rgba(99, 102, 241, 0.08)', border: 'rgba(99, 102, 241, 0.3)' },
};

function RpGauge({ value, label, color }: Readonly<{ value: number; label: string; color: string }>) {
    const pct = Math.min(100, (value / 50) * 100);
    const isHigh = value > 30;
    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto' }}>
                <svg viewBox="0 0 36 36" style={{ display: 'block', width: '100%', height: '100%' }}>
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(30,41,59,0.8)" strokeWidth="2.5" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"
                        strokeDasharray={`${pct}, 100`}
                        style={{ transition: 'stroke-dasharray 1s cubic-bezier(0.16, 1, 0.3, 1)', filter: `drop-shadow(0 0 6px ${color})` }} />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 900, color: '#fff' }}>{value.toFixed(1)}%</span>
                    <span style={{ fontSize: '0.55rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color, marginTop: '2px' }}>R. Premium</span>
                </div>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.75rem', marginBottom: 0 }}>{label}</p>
            {isHigh && <span style={{ fontSize: '0.6rem', color: 'var(--accent-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>Death Zone</span>}
        </div>
    );
}

export default function ToyGamesPage() {
    const [activeId, setActiveId] = useState(SCENARIOS[0].id);
    const active = SCENARIOS.find(s => s.id === activeId) ?? SCENARIOS[0];
    const colors = COLOR_MAP[active.color];

    return (
        <main style={{ minHeight: '100vh' }}>
            <header className="page-header">
                <p className="page-label" style={{ color: 'var(--accent-secondary)' }}>
                    <span className="fa-solid fa-crosshairs"></span> Laboratório Interativo
                </p>
                <h1 style={{ background: 'linear-gradient(135deg, #fff 0%, #fca5a5 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Toy Games: Predator Mode
                </h1>
                <p className="page-subtitle" style={{ fontStyle: 'italic' }}>
                    Isolando a mecânica do Risk Premium. Sinta a impunidade de agredir quando o oponente está paralisado.
                </p>
            </header>

            <div className="sim-container">
                {/* Seleção de cenários */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
                    {SCENARIOS.map(sc => {
                        const isActive = sc.id === activeId;
                        const c = COLOR_MAP[sc.color];
                        return (
                            <button key={sc.id} onClick={() => setActiveId(sc.id)}
                                className={`toy-scenario-btn ${isActive ? 'active' : ''}`}
                                style={isActive ? { background: c.bg, borderColor: c.border } : undefined}>
                                <span className={`fa-solid ${sc.icon} toy-icon`} style={{ color: isActive ? c.accent : undefined }}></span>
                                <div>
                                    <span className="toy-label">{sc.label}</span>
                                    <span className="toy-subtitle">{sc.subtitle}</span>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Palco do cenário ativo */}
                <div className="glass-panel" style={{ borderColor: colors.border, padding: 'clamp(1.5rem, 3vw, 2.5rem)', borderRadius: '16px' }}>
                    {/* Confronto IP vs OOP */}
                    <div className="confronto-grid">
                        {/* IP */}
                        <div className="confronto-card">
                            <p className="page-label" style={{ color: 'var(--accent-emerald)', marginBottom: '0.5rem', justifyContent: 'center' }}>Agressor (IP)</p>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{active.ip.pos}</h3>
                            <span className="stack-badge">{active.ip.stack}</span>
                            <div style={{ marginTop: '1.25rem' }}>
                                <RpGauge value={active.ip.rp} label={active.ip.role} color="var(--accent-sky)" />
                            </div>
                            <p style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '0.75rem', marginBottom: 0 }}>{active.ip.desc}</p>
                        </div>

                        {/* VS */}
                        <div className="confronto-vs">
                            <div className="confronto-vs-badge">VS</div>
                            <div className="confronto-vs-line"></div>
                        </div>

                        {/* OOP */}
                        <div className="confronto-card">
                            <p className="page-label" style={{ color: 'var(--accent-secondary)', marginBottom: '0.5rem', justifyContent: 'center' }}>Defensor (OOP)</p>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{active.oop.pos}</h3>
                            <span className="stack-badge">{active.oop.stack}</span>
                            <div style={{ marginTop: '1.25rem' }}>
                                <RpGauge value={active.oop.rp} label={active.oop.role} color="var(--accent-secondary)" />
                            </div>
                            <p style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '0.75rem', marginBottom: 0 }}>{active.oop.desc}</p>
                        </div>
                    </div>

                    {/* Análise */}
                    <div className="callout" style={{ borderLeftColor: colors.accent, background: colors.bg }}>
                        <h4 style={{ marginTop: 0, color: colors.accent }}>Análise do Cenário</h4>
                        <p style={{ marginBottom: 0, fontSize: '0.95rem' }}>{active.analysis}</p>
                    </div>
                </div>

                <nav className="article-nav" style={{ marginTop: '3rem' }}>
                    <Link href="/tools/icm">&larr; Simulador ICM</Link>
                    <Link href="/tools/masterclass">Masterclass Completa &rarr;</Link>
                </nav>
            </div>
        </main>
    );
}
