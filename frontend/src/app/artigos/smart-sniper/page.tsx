/**
 * IDENTITY: O Protocolo Smart Sniper
 * PATH: src/app/artigos/smart-sniper/page.tsx
 * ROLE: Manual de gestao de carreira, eficiencia matematica e alta performance em MTTs.
 * BINDING: [layout.tsx, globals.css]
 */

import Link from 'next/link';

export const metadata = {
    title: 'O Protocolo Smart Sniper | Raphael Vitoi',
    description: 'Gestao de Carreira, Eficiencia Matematica e Alta Performance em MTTs. Rotina Semanal, Estrategia de Domingo, Scaffolding.'
};

export default function SmartSniperPage() {
    return (
        <main className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                    Manual Operacional &bull; Edicao 2025
                </span>
                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', background: 'linear-gradient(135deg, #fff 0%, #10b981 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem', marginTop: '1rem' }}>
                    O Protocolo Smart Sniper
                </h1>
                <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Gestao de Carreira, Eficiencia Matematica e Alta Performance em MTTs.</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '1rem' }}>Autor: Raphael Vitoi &bull; 2025</p>
            </div>

            <article>
                {/* ==================== MANIFESTO ==================== */}
                <h2>1. O Manifesto da Eficiencia</h2>
                <p>O &quot;Grind&quot; tradicional morreu. A velha escola ensinava que para vencer no poker voce precisava abrir 15 telas, jogar 12 horas por dia e aceitar uma variancia brutal em nome do &quot;longo prazo&quot;.</p>
                <p>Este documento apresenta a antitese dessa ideia. O Protocolo Smart Sniper nao foi desenhado para gerar rake para os sites; foi desenhado para gerar <strong>Lucro Liquido e Longevidade</strong> para voce.</p>

                <div className="callout">
                    <h4 style={{ marginTop: 0 }}>Tres Pilares Cientificos</h4>
                    <ol style={{ marginLeft: '1.5rem', listStyleType: 'decimal', color: '#cbd5e1' }}>
                        <li><strong>Eficiencia Financeira:</strong> Buscamos o maior retorno por hora jogada ($/Hour), nao apenas ROI por torneio.</li>
                        <li><strong>Sustentabilidade Cognitiva:</strong> Respeitamos os limites biologicos do cerebro para manter o A-Game.</li>
                        <li><strong>Matematica Defensiva:</strong> Usamos a selecao de torneios para blindar o bankroll contra a variancia toxica.</li>
                    </ol>
                </div>

                <hr style={{ border: 0, borderTop: '1px solid var(--border-color)', margin: '3rem 0' }} />

                {/* ==================== ROTINA SEMANAL ==================== */}
                <h2>2. A Rotina Semanal: A Estrategia &quot;Sniper&quot;</h2>
                <p>De segunda a sabado, nosso objetivo e <strong>construcao de bankroll com baixo risco</strong>.</p>

                <h3>2.1 O Volume Otimizado (6 a 8 Telas)</h3>
                <p>A neurociencia prova que a qualidade de decisao cai drasticamente quando a carga cognitiva excede o limite de atencao.</p>
                <table>
                    <thead>
                        <tr><th>Parametro</th><th>Regra</th><th>Motivo</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Telas</strong></td>
                            <td>Max 6 a 8</td>
                            <td>Permite identificar viloes, ajustar ranges e aplicar pressao de ICM</td>
                        </tr>
                        <tr>
                            <td><strong>Excesso (12+)</strong></td>
                            <td style={{ color: 'var(--accent-secondary)' }}>Proibido</td>
                            <td>Transforma voce em um robo exploravel</td>
                        </tr>
                    </tbody>
                </table>

                <h3>2.2 A Selecao de Alvos (Small Fields e Vanillas)</h3>
                <p>Fugimos da loteria dos grandes fields (&gt;3.000 pessoas) durante a semana.</p>
                <table>
                    <thead>
                        <tr><th>Criterio</th><th>Alvo</th><th>Matematica</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Formato</strong></td>
                            <td>Vanilla (Freezout/Re-entry)</td>
                            <td>Menor variancia, fluxo de caixa constante</td>
                        </tr>
                        <tr>
                            <td><strong>Field</strong></td>
                            <td style={{ color: 'var(--accent-emerald)' }}>100 a 500 jogadores</td>
                            <td>10x mais facil chegar a Mesa Final que em 3.000</td>
                        </tr>
                    </tbody>
                </table>

                <h3>2.3 A &quot;Zona de Dominio&quot; (O Pulo do Gato)</h3>
                <p>Nos <strong>NAO</strong> registramos no Nivel 1 (Deep Stack 100bb+) de torneios regulares.</p>

                <div className="callout" style={{ borderLeftColor: 'var(--accent-emerald)', background: 'rgba(16, 185, 129, 0.08)' }}>
                    <h4 style={{ color: 'var(--accent-emerald)', marginTop: 0 }}>Entrada Cirurgica</h4>
                    <p>Registramos quando a stack efetiva esta entre <strong>30bb e 50bb</strong> (proximo ao fim do registro tardio ou quando a media e o dobro da inicial).</p>
                    <p style={{ marginBottom: 0 }}><strong>Beneficio:</strong> Entramos na fase onde o ICM comeca a pressionar os stacks medios. Com 30-50bb, temos manobrabilidade total para exercer edge, mas sem a &quot;gordura&quot; inutil do early game.</p>
                </div>

                <hr style={{ border: 0, borderTop: '1px solid var(--border-color)', margin: '3rem 0' }} />

                {/* ==================== DOMINGO ==================== */}
                <h2>3. O Domingo: Risco Assimetrico</h2>
                <p>No domingo, a logica muda. E o dia da liquidez maxima. Se jogarmos volume massivo como a massa, seremos engolidos pela variancia. Nossa resposta e a <strong>Qualidade Extrema</strong>.</p>

                <h3>3.1 A Regra do &quot;Teto de Gastos&quot;</h3>
                <p><strong>Principio:</strong> Voce nunca deve gastar mais em buy-ins no domingo do que gasta em uma terca-feira. Isso blinda seu bankroll contra a &quot;ressaca de segunda-feira&quot;.</p>

                <h3>3.2 Menos Telas, Maiores Premios (4 Telas)</h3>
                <p>Em vez de jogar 15 torneios baratos, jogamos <strong>4 Torneios Principais (Majors)</strong> com buy-ins mais altos (dentro do teto de gastos).</p>

                <table>
                    <thead>
                        <tr><th>Dia</th><th>Telas</th><th>ABI</th><th>Objetivo</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Semana</strong></td>
                            <td>6-8</td>
                            <td>$20</td>
                            <td>Estabilidade e Fluxo de Caixa</td>
                        </tr>
                        <tr>
                            <td><strong>Domingo</strong></td>
                            <td style={{ color: 'var(--accent-primary)' }}>4</td>
                            <td style={{ color: 'var(--accent-primary)' }}>$40</td>
                            <td>Alavancagem de Patrimonio (Big Hit)</td>
                        </tr>
                    </tbody>
                </table>

                <hr style={{ border: 0, borderTop: '1px solid var(--border-color)', margin: '3rem 0' }} />

                {/* ==================== EVOLUCAO ==================== */}
                <h2>4. A Evolucao Tecnica: O Modelo &quot;Scaffolding&quot;</h2>
                <p>Nao jogamos PKOs complexos ou Deep Stacks caros ainda. Isso nao e uma limitacao eterna; e uma <strong>protecao temporaria</strong>.</p>

                <table>
                    <thead>
                        <tr><th>Fase</th><th>Foco</th><th>Desbloqueio</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Fase 1 (Atual)</strong></td>
                            <td>Vanilla Small Field + Matematica ICM/Nash</td>
                            <td>Construir caixa e confianca</td>
                        </tr>
                        <tr>
                            <td><strong>Fase 2</strong></td>
                            <td>Inserir PKOs na grade (Zona de Dominio)</td>
                            <td>Dominar matematica dos Bounties</td>
                        </tr>
                        <tr>
                            <td><strong>Fase 3 (Maestria)</strong></td>
                            <td>Liberdade para atacar qualquer formato</td>
                            <td>Edge tecnico absoluto</td>
                        </tr>
                    </tbody>
                </table>

                <div className="callout" style={{ borderLeftColor: 'var(--accent-secondary)', background: 'rgba(225, 29, 72, 0.08)' }}>
                    <h4 style={{ color: 'var(--accent-secondary)', marginTop: 0 }}>Regra de Ouro</h4>
                    <p style={{ marginBottom: 0 }}>So jogamos onde somos favoritos. Se voce nao domina 100bb deep em PKO, jogar la e <strong>doar dinheiro para os profissionais</strong>.</p>
                </div>

                <hr style={{ border: 0, borderTop: '1px solid var(--border-color)', margin: '3rem 0' }} />

                {/* ==================== VALIDACAO ==================== */}
                <h2>5. Validacao Cientifica</h2>
                <p>Simulacoes de Monte Carlo (100.000 iteracoes) comparando a estrategia Smart Sniper com o &quot;Grind de Volume&quot; provaram:</p>

                <table>
                    <thead>
                        <tr><th>Metrica</th><th>Smart Sniper</th><th>Grind Volume</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Risco de Prejuizo Global</strong></td>
                            <td style={{ color: 'var(--accent-emerald)' }}>2.12%</td>
                            <td>&gt;15%</td>
                        </tr>
                        <tr>
                            <td><strong>Pior Cenario (Bottom 5%)</strong></td>
                            <td style={{ color: 'var(--accent-emerald)' }}>+$14,077</td>
                            <td>Negativo</td>
                        </tr>
                        <tr>
                            <td><strong>Lucro Mediano</strong></td>
                            <td>$76,536</td>
                            <td>Inferior</td>
                        </tr>
                        <tr>
                            <td><strong>Top 1% (Big Hits)</strong></td>
                            <td style={{ color: 'var(--accent-emerald)' }}>$165,502</td>
                            <td>Similar, mas com variancia toxica</td>
                        </tr>
                        <tr>
                            <td><strong>Retorno/Estresse</strong></td>
                            <td style={{ color: 'var(--accent-emerald)' }}>3x superior</td>
                            <td>Baseline</td>
                        </tr>
                    </tbody>
                </table>

                <hr style={{ border: 0, borderTop: '1px solid var(--border-color)', margin: '3rem 0' }} />

                {/* ==================== CHECKLIST ==================== */}
                <h2>6. Checklist Diario do Aluno</h2>
                <p>Antes de registrar, faca a auditoria:</p>

                <div className="callout" style={{ borderLeftColor: 'var(--accent-emerald)', background: 'rgba(16, 185, 129, 0.1)' }}>
                    <ol style={{ marginLeft: '1.5rem', listStyleType: 'decimal', color: '#cbd5e1', lineHeight: 2 }}>
                        <li><strong>Estou descansado?</strong> (Se nao, nao jogue. O A-Game e obrigatorio).</li>
                        <li><strong>Estou respeitando o limite de telas?</strong> (Max 8 na semana, Max 4 no domingo).</li>
                        <li><strong>O torneio e Small Field?</strong> (Preferencia por &lt;500 players na semana).</li>
                        <li><strong>Estou na Zona de Dominio?</strong> (Entrando com 30-50bb ou Late Reg inteligente).</li>
                        <li><strong>Evitei a armadilha do Deep Stack?</strong> (Nao registrar no Nivel 1 de torneios lentos).</li>
                    </ol>
                </div>

                <div style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)', textAlign: 'center' }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-emerald)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>Conclusao</p>
                    <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Voce nao e um &quot;clicador de botoes&quot;. Voce e um <strong>Gestor de Ativos</strong>.</p>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: 0 }}>Seu tempo, sua atencao e seu bankroll sao seus ativos. Nao os desperdice em loterias. Invista-os onde a matematica garante que voce e o predador, nao a presa.</p>
                </div>
            </article>

            <nav className="article-nav">
                <Link href="/artigos/estado-da-arte">&larr; Estado da Arte ICM</Link>
                <Link href="/">Hub Central &rarr;</Link>
            </nav>
        </main>
    );
}
