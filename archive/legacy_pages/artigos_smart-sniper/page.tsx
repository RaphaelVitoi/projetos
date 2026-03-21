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
            <header className="page-header" style={{ paddingBottom: '1rem' }}>
                <p className="page-label">Manual Operacional &bull; Edição 2025</p>
                <h1 style={{ background: 'linear-gradient(135deg, #fff 0%, #10b981 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, lineHeight: 1.2, marginTop: 0 }}>O Protocolo Smart Sniper</h1>
                <p className="page-subtitle">Gestão de Carreira, Eficiência Matemática e Alta Performance em MTTs.</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>Autor: Raphael Vitoi &bull; 2025</p>
            </header>

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
                <p>A <strong>Lei de Yerkes-Dodson</strong> (neurociência cognitiva) demonstra que a performance humana segue uma curva de U invertido em relação à carga de trabalho: há um pico de rendimento em estimulação moderada, e colapso tanto por subestimulação quanto por sobrecarga.</p>
                <p>Em termos práticos: acima de 8 telas, o cérebro entra em <strong>C-Game automático</strong> -- o jogador para de raciocinar e passa a reagir. O edge técnico desaparece. Abaixo de 4 telas, subutiliza-se o capital cognitivo disponível.</p>
                <table>
                    <thead>
                        <tr><th>Parâmetro</th><th>Regra</th><th>Motivo</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Telas</strong></td>
                            <td>Max 6 a 8</td>
                            <td>Zona de Flow: identifica vilões, ajusta ranges e aplica pressão de ICM</td>
                        </tr>
                        <tr>
                            <td><strong>Excesso (12+)</strong></td>
                            <td style={{ color: 'var(--accent-secondary)' }}>Proibido</td>
                            <td>Transforma você em um robô explorável (C-Game forçado)</td>
                        </tr>
                    </tbody>
                </table>

                <h3>2.2 A Seleção de Alvos (Small Fields e Vanillas)</h3>
                <p>Fugimos da loteria dos grandes fields (&gt;3.000 pessoas) durante a semana. A variância em MTTs não é linear; é <strong>exponencial</strong> em relação ao tamanho do field.</p>
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
                            <td>FT: ~3.3% (300 field) vs ~0.3% (3.000 field) — 10x mais frequente</td>
                        </tr>
                    </tbody>
                </table>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Chegar à Mesa Final 10 vezes mais frequentemente não significa ganhar 10 vezes mais por torneio -- significa suavizar a curva de downswing e garantir fluxo de caixa constante, reduzindo o bankroll necessário para sobreviver à variância.</p>

                <h3>2.3 A &quot;Zona de Domínio&quot; (O Pulo do Gato)</h3>
                <p>Nós <strong>NÃO</strong> registramos no Nível 1 (Deep Stack 100bb+) de torneios regulares.</p>

                <div className="callout callout-emerald">
                    <h4 style={{ color: 'var(--accent-emerald)', marginTop: 0 }}>Entrada Cirúrgica</h4>
                    <p>Registramos quando a stack efetiva está entre <strong>30bb e 50bb</strong> (próximo ao fim do registro tardio ou quando a média é o dobro da inicial).</p>
                    <p><strong>Benefício:</strong> Entramos na fase onde o ICM começa a pressionar os stacks médios. Com 30-50bb, temos manobrabilidade total para exercer edge, mas sem a &quot;gordura&quot; inútil do early game.</p>
                    <p style={{ marginBottom: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Nota matemática: cada novo jogador que se registra dilui a equidade das stacks existentes em <strong style={{ color: 'var(--accent-emerald)' }}>~0,28% por entrada</strong>. Ao evitar o Deep Stack, você não paga essa taxa passiva por 4 horas. Ao entrar na Zona de Domínio, você captura uma stack já valorizada pelo ICM -- sem ter pagado o custo de permanecer.</p>
                </div>

                <hr className="section-divider" />

                {/* ==================== DOMINGO ==================== */}
                <h2>3. O Domingo: Risco Assimétrico</h2>
                <p>No domingo, a lógica muda. É o dia da liquidez máxima. Se jogarmos volume massivo como a massa, seremos engolidos pela variância. Nossa resposta é a <strong>Qualidade Extrema</strong> -- a aplicação prática da <strong>Estratégia de Haltere</strong> de Nassim Taleb: extrema proteção em um lado (semana, Small Fields, renda fixa), extrema exposição a ganhos no outro (domingo, Majors, venture capital), eliminando o meio-termo medíocre.</p>

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

                <h3>5.1 Prova pelo Índice de Sharpe</h3>
                <p>Em investimentos, não buscamos apenas retorno; buscamos <strong>retorno por unidade de risco</strong>. A fórmula adaptada ao poker: <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)' }}>S = ROI / Desvio Padrão</span></p>

                <table>
                    <thead>
                        <tr><th>Modelo</th><th>ROI Teórico</th><th>Desvio Padrão</th><th>Sharpe Ratio</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>A — Metralhadora</strong> <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>(Max Late Reg puro)</span></td>
                            <td>10%</td>
                            <td>160 BI</td>
                            <td style={{ color: 'var(--accent-secondary)', fontFamily: 'var(--font-mono)' }}>0.062</td>
                        </tr>
                        <tr>
                            <td><strong>B — Grinder Clássico</strong> <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>(Deep Stack)</span></td>
                            <td>20%</td>
                            <td>120 BI</td>
                            <td style={{ color: 'var(--accent-amber)', fontFamily: 'var(--font-mono)' }}>0.166</td>
                        </tr>
                        <tr>
                            <td><strong>C — Smart Sniper</strong> <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>(Sua estratégia)</span></td>
                            <td style={{ color: 'var(--accent-emerald)' }}>35%</td>
                            <td style={{ color: 'var(--accent-emerald)' }}>70 BI</td>
                            <td style={{ color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)', fontWeight: 800 }}>0.500</td>
                        </tr>
                    </tbody>
                </table>

                <div className="callout callout-emerald">
                    <h4 style={{ color: 'var(--accent-emerald)', marginTop: 0 }}>5.2 O Subsídio do ICM (Arbitragem de Late Reg)</h4>
                    <p>O Modelo B paga $100 por uma stack que vale $100. O Modelo C, ao entrar com 30-50bb via Late Reg (Regra do 2x Average), paga $100 por uma stack que vale estatisticamente <strong>$105 a $108</strong>.</p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-emerald)', marginBottom: 0 }}>
                        Lucro Total = Skill Edge + Arbitragem ICM<br />
                        Modelo B: 20% (Skill) + 0% (ICM) = 20% — em 8h de trabalho<br />
                        Modelo C: 25% (Skill) + 8% (ICM) = 33% — em 4h de trabalho
                    </p>
                </div>

                <hr className="section-divider" />

                {/* ==================== GRADE TATICA ==================== */}
                <h2>6. A Grade de Ouro (Seleção de Torneios)</h2>
                <p>Os melhores torneios para executar a estratégia, focando em sites Tier S e A: <strong>Chico Network (BetOnline), Bodog, CoinPoker, PartyPoker</strong>.</p>

                <div className="callout">
                    <h4 style={{ marginTop: 0 }}>Segunda a Sábado — O Grind de Estabilidade <span style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>$20 ABI</span></h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Meta: 6 a 8 telas. Foco: Small Fields (&lt;500), Vanillas, entrada em Late Reg 2x Average.</p>
                    <p><strong style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-primary)' }}>Manhã / Início da Tarde</strong></p>
                    <ul style={{ marginLeft: '1.5rem', color: '#cbd5e1', marginBottom: '1rem' }}>
                        <li><strong>Bodog:</strong> $22 Monster Stack (Freezout) — Field macio, estrutura lenta. Must Play.</li>
                        <li><strong>PartyPoker:</strong> $11 ou $22 The Daily Legends — Fields controlados, sem HUD.</li>
                        <li><strong>Chico (BetOnline):</strong> $22 Daily Grind — Field minúsculo (~200 players). Variância zero.</li>
                        <li><strong>CoinPoker:</strong> ₮20 ou ₮30 Swordfish — Overlay frequente, field cripto ultra-soft.</li>
                    </ul>
                    <p><strong style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-primary)' }}>Tarde / Noite (Prime Time)</strong></p>
                    <ul style={{ marginLeft: '1.5rem', color: '#cbd5e1', marginBottom: '0' }}>
                        <li><strong>Bodog:</strong> $33 ou $55 Crazy Eights / Lucky Sevens — Garantidos bons, field recreativo.</li>
                        <li><strong>Chico (BetOnline):</strong> $33 Daily Majors — Estrutura excelente para ICM no final.</li>
                        <li><strong>CoinPoker:</strong> ₮50 Marc Gork Special — Valor absurdo quando disponível.</li>
                    </ul>
                </div>

                <div className="callout callout-secondary">
                    <h4 style={{ color: 'var(--accent-secondary)', marginTop: 0 }}>Domingo — O Dia do Sniper <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>$40 ABI / Teto $400</span></h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>4 telas de elite. Foco: Big Hit (prêmios &gt;$5k-$10k). Se cair, não reentrar em lixo.</p>
                    <ol style={{ marginLeft: '1.5rem', color: '#cbd5e1' }}>
                        <li style={{ marginBottom: '0.75rem' }}>
                            <strong>$109 BetOnline Main Event (Chico Network)</strong><br />
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>~1.500 jogadores. 1º lugar paga $20k-$30k. Melhor chance de cravada grande com variância média.</span>
                        </li>
                        <li style={{ marginBottom: '0.75rem' }}>
                            <strong>$82 ou $109 Bodog Special</strong><br />
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Field anônimo e recreativo. ROI inflado pela ausência de HUD. 1º lugar frequentemente &gt;$10k.</span>
                        </li>
                        <li style={{ marginBottom: '0.75rem' }}>
                            <strong>$43/$54 GGPoker Bounty Hunters Sunday</strong><br />
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Late Reg agressivo obrigatório (20-30bb). Prêmio astronômico. Ticket de loteria com +EV.</span>
                        </li>
                        <li>
                            <strong>$55 PartyPoker Sunday Party ou ₮100 CoinPoker Sunday Special</strong><br />
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Field limpo, sem HUD (Party) ou softness extremo para o prize pool (Coin).</span>
                        </li>
                    </ol>
                    <div style={{ borderTop: '1px solid rgba(225,29,72,0.2)', marginTop: '1rem', paddingTop: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#94a3b8' }}>
                        Exemplo de sessão: Chico $109 + Bodog $82 + GG $54 + Coin ₮100 ≈ <strong style={{ color: '#fff' }}>$345 investidos</strong> | Potencial de prêmio somado: <strong style={{ color: 'var(--accent-emerald)' }}>$50.000+</strong>
                    </div>
                </div>

                <hr className="section-divider" />

                {/* ==================== CHECKLIST ==================== */}
                <h2>7. Checklist Diário do Aluno</h2>
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
                <Link href="/artigos/validacao-smart-sniper">Validação Científica &rarr;</Link>
            </nav>
        </main>
    );
}
