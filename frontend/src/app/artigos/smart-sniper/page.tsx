/**
 * IDENTITY: O Protocolo Smart Sniper
 * PATH: src/app/artigos/smart-sniper/page.tsx
 * ROLE: Manual de gestão de carreira, eficiência matemática e alta performance em MTTs.
 * BINDING: [layout.tsx, globals.css]
 */

import Link from 'next/link';

export const metadata = {
    title: 'O Protocolo Smart Sniper | Raphael Vitoi',
    description: 'Gestão de Carreira, Eficiência Matemática e Alta Performance em MTTs. Rotina Semanal, Estratégia de Domingo, Scaffolding.'
};

export default function SmartSniperPage() {
    return (
        <main className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1.5rem' }}>
            <div className="article-header">
                <span className="article-tag">Manual Operacional &bull; Edição 2025</span>
                <h1 style={{ background: 'linear-gradient(135deg, #fff 0%, #10b981 100%)' }}>O Protocolo Smart Sniper</h1>
                <p className="article-subtitle">Gestão de Carreira, Eficiência Matemática e Alta Performance em MTTs.</p>
                <p className="article-meta">Autor: Raphael Vitoi &bull; 2025</p>
            </div>

            <article>
                {/* ==================== MANIFESTO ==================== */}
                <h2>1. O Manifesto da Eficiência</h2>
                <p>O &quot;Grind&quot; tradicional morreu. A velha escola ensinava que para vencer no poker você precisava abrir 15 telas, jogar 12 horas por dia e aceitar uma variância brutal em nome do &quot;longo prazo&quot;.</p>
                <p>Este documento apresenta a antítese dessa ideia. O Protocolo Smart Sniper não foi desenhado para gerar rake para os sites; foi desenhado para gerar <strong>Lucro Líquido e Longevidade</strong> para você.</p>

                <div className="callout">
                    <h4 style={{ marginTop: 0 }}>Três Pilares Científicos</h4>
                    <ol style={{ marginLeft: '1.5rem', listStyleType: 'decimal', color: '#cbd5e1' }}>
                        <li><strong>Eficiência Financeira:</strong> Buscamos o maior retorno por hora jogada ($/Hour), não apenas ROI por torneio.</li>
                        <li><strong>Sustentabilidade Cognitiva:</strong> Respeitamos os limites biológicos do cérebro para manter o A-Game.</li>
                        <li><strong>Matemática Defensiva:</strong> Usamos a seleção de torneios para blindar o bankroll contra a variância tóxica.</li>
                    </ol>
                </div>

                <hr className="section-divider" />

                {/* ==================== ROTINA SEMANAL ==================== */}
                <h2>2. A Rotina Semanal: A Estratégia &quot;Sniper&quot;</h2>
                <p>De segunda a sábado, nosso objetivo é <strong>construção de bankroll com baixo risco</strong>.</p>

                <h3>2.1 O Volume Otimizado (6 a 8 Telas)</h3>
                <p>A neurociência prova que a qualidade de decisão cai drasticamente quando a carga cognitiva excede o limite de atenção.</p>
                <table>
                    <thead>
                        <tr><th>Parâmetro</th><th>Regra</th><th>Motivo</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Telas</strong></td>
                            <td>Max 6 a 8</td>
                            <td>Permite identificar vilões, ajustar ranges e aplicar pressão de ICM</td>
                        </tr>
                        <tr>
                            <td><strong>Excesso (12+)</strong></td>
                            <td style={{ color: 'var(--accent-secondary)' }}>Proibido</td>
                            <td>Transforma você em um robô explorável</td>
                        </tr>
                    </tbody>
                </table>

                <h3>2.2 A Seleção de Alvos (Small Fields e Vanillas)</h3>
                <p>Fugimos da loteria dos grandes fields (&gt;3.000 pessoas) durante a semana.</p>
                <table>
                    <thead>
                        <tr><th>Critério</th><th>Alvo</th><th>Matemática</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Formato</strong></td>
                            <td>Vanilla (Freezout/Re-entry)</td>
                            <td>Menor variância, fluxo de caixa constante</td>
                        </tr>
                        <tr>
                            <td><strong>Field</strong></td>
                            <td style={{ color: 'var(--accent-emerald)' }}>100 a 500 jogadores</td>
                            <td>10x mais fácil chegar à Mesa Final que em 3.000</td>
                        </tr>
                    </tbody>
                </table>

                <h3>2.3 A &quot;Zona de Domínio&quot; (O Pulo do Gato)</h3>
                <p>Nós <strong>NÃO</strong> registramos no Nível 1 (Deep Stack 100bb+) de torneios regulares.</p>

                <div className="callout callout-emerald">
                    <h4 style={{ color: 'var(--accent-emerald)', marginTop: 0 }}>Entrada Cirúrgica</h4>
                    <p>Registramos quando a stack efetiva está entre <strong>30bb e 50bb</strong> (próximo ao fim do registro tardio ou quando a média é o dobro da inicial).</p>
                    <p style={{ marginBottom: 0 }}><strong>Benefício:</strong> Entramos na fase onde o ICM começa a pressionar os stacks médios. Com 30-50bb, temos manobrabilidade total para exercer edge, mas sem a &quot;gordura&quot; inútil do early game.</p>
                </div>

                <hr className="section-divider" />

                {/* ==================== DOMINGO ==================== */}
                <h2>3. O Domingo: Risco Assimétrico</h2>
                <p>No domingo, a lógica muda. É o dia da liquidez máxima. Se jogarmos volume massivo como a massa, seremos engolidos pela variância. Nossa resposta é a <strong>Qualidade Extrema</strong>.</p>

                <h3>3.1 A Regra do &quot;Teto de Gastos&quot;</h3>
                <p><strong>Princípio:</strong> Você nunca deve gastar mais em buy-ins no domingo do que gasta em uma terça-feira. Isso blinda seu bankroll contra a &quot;ressaca de segunda-feira&quot;.</p>

                <h3>3.2 Menos Telas, Maiores Prêmios (4 Telas)</h3>
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
                            <td>Alavancagem de Patrimônio (Big Hit)</td>
                        </tr>
                    </tbody>
                </table>

                <hr className="section-divider" />

                {/* ==================== EVOLUCAO ==================== */}
                <h2>4. A Evolução Técnica: O Modelo &quot;Scaffolding&quot;</h2>
                <p>Não jogamos PKOs complexos ou Deep Stacks caros ainda. Isso não é uma limitação eterna; é uma <strong>proteção temporária</strong>.</p>

                <table>
                    <thead>
                        <tr><th>Fase</th><th>Foco</th><th>Desbloqueio</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Fase 1 (Atual)</strong></td>
                            <td>Vanilla Small Field + Matemática ICM/Nash</td>
                            <td>Construir caixa e confiança</td>
                        </tr>
                        <tr>
                            <td><strong>Fase 2</strong></td>
                            <td>Inserir PKOs na grade (Zona de Domínio)</td>
                            <td>Dominar matemática dos Bounties</td>
                        </tr>
                        <tr>
                            <td><strong>Fase 3 (Maestria)</strong></td>
                            <td>Liberdade para atacar qualquer formato</td>
                            <td>Edge técnico absoluto</td>
                        </tr>
                    </tbody>
                </table>

                <div className="callout callout-secondary">
                    <h4 style={{ color: 'var(--accent-secondary)', marginTop: 0 }}>Regra de Ouro</h4>
                    <p style={{ marginBottom: 0 }}>Só jogamos onde somos favoritos. Se você não domina 100bb deep em PKO, jogar lá é <strong>doar dinheiro para os profissionais</strong>.</p>
                </div>

                <hr className="section-divider" />

                {/* ==================== VALIDACAO ==================== */}
                <h2>5. Validação Científica</h2>
                <p>Simulações de Monte Carlo (100.000 iterações) comparando a estratégia Smart Sniper com o &quot;Grind de Volume&quot; provaram:</p>

                <table>
                    <thead>
                        <tr><th>Métrica</th><th>Smart Sniper</th><th>Grind Volume</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Risco de Prejuízo Global</strong></td>
                            <td style={{ color: 'var(--accent-emerald)' }}>2.12%</td>
                            <td>&gt;15%</td>
                        </tr>
                        <tr>
                            <td><strong>Pior Cenário (Bottom 5%)</strong></td>
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
                            <td>Similar, mas com variância tóxica</td>
                        </tr>
                        <tr>
                            <td><strong>Retorno/Estresse</strong></td>
                            <td style={{ color: 'var(--accent-emerald)' }}>3x superior</td>
                            <td>Baseline</td>
                        </tr>
                    </tbody>
                </table>

                <hr className="section-divider" />

                {/* ==================== CHECKLIST ==================== */}
                <h2>6. Checklist Diário do Aluno</h2>
                <p>Antes de registrar, faça a auditoria:</p>

                <div className="callout callout-emerald">
                    <ol style={{ marginLeft: '1.5rem', listStyleType: 'decimal', color: '#cbd5e1', lineHeight: 2 }}>
                        <li><strong>Estou descansado?</strong> (Se não, não jogue. O A-Game é obrigatório).</li>
                        <li><strong>Estou respeitando o limite de telas?</strong> (Max 8 na semana, Max 4 no domingo).</li>
                        <li><strong>O torneio é Small Field?</strong> (Preferência por &lt;500 players na semana).</li>
                        <li><strong>Estou na Zona de Domínio?</strong> (Entrando com 30-50bb ou Late Reg inteligente).</li>
                        <li><strong>Evitei a armadilha do Deep Stack?</strong> (Não registrar no Nível 1 de torneios lentos).</li>
                    </ol>
                </div>

                <div className="verdict-box-emerald">
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-emerald)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>Conclusão</p>
                    <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Você não é um &quot;clicador de botões&quot;. Você é um <strong>Gestor de Ativos</strong>.</p>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: 0 }}>Seu tempo, sua atenção e seu bankroll são seus ativos. Não os desperdice em loterias. Invista-os onde a matemática garante que você é o predador, não a presa.</p>
                </div>
            </article>

            <nav className="article-nav">
                <Link href="/artigos/estado-da-arte">&larr; Estado da Arte ICM</Link>
                <Link href="/">Hub Central &rarr;</Link>
            </nav>
        </main>
    );
}
