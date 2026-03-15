import Link from 'next/link';

export const metadata = {
    title: 'Entendendo o ICM | Raphael Vitoi',
    description: 'Whitepaper: Entendendo o ICM e suas Heuristicas - Raphael Vitoi'
};

export default function LeituraICM() {
    return (
        <main className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Documento Tecnico - Versao 1.0
                </span>
                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', background: 'linear-gradient(135deg, #fff 0%, #a5b4fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem', marginTop: '1rem' }}>
                    Entendendo o ICM e suas Heuristicas
                </h1>
                <p>Decisoes Pos-Flop em Final Tables e a Nova Fronteira do Edge.</p>
            </div>

            <article>
                <h2>Modulo 1: O Problema e o Mapa</h2>

                <h3>1.1 Por que ICM importa desde a mao 1</h3>
                <p>A tese central desta aula e direta: o edge em ICM (Independent Chip Model) migrou do pre-flop para o pos-flop. O jogo pre-flop, com suas decisoes de push/fold, ja foi extensivamente mapeado por solvers. O gap de skill real, a fronteira onde o dinheiro e ganho ou perdido em 2026, esta nas decisoes tomadas apos o flop sob a pressao do ICM.</p>
                <p>Ignorar essa realidade tem um custo quantificavel. Jogar uma estrategia de ChipEV (cEV) pura em spots de mesa final onde o ICM e o fator dominante custa, em media, <strong>mais de 10% do seu buy-in em EV ($EV)</strong>.</p>

                <div className="callout">
                    <p><strong>Definicao:</strong> Risk Premium e a equity adicional, acima do pot odds, que um jogador precisa ter para justificar um call de all-in sob a pressao do ICM. Ele mede o &quot;custo do risco&quot; que o modelo de torneio impoe a uma jogada.</p>
                </div>

                <h3>1.4 Valuations de Stack</h3>
                <p>Um erro fundamental e associar linearmente a porcentagem de fichas a porcentagem do prize pool. O Chip Leader com 40% das fichas em uma mesa final de 6 jogadores nao tem direito a 40% do prize pool.</p>
                <p>Isso nos leva ao principio mais famoso do ICM: <strong>Fichas ganhas valem menos do que fichas perdidas.</strong></p>

                <hr style={{ border: 0, borderTop: '1px solid var(--border-color)', margin: '3rem 0' }} />

                <h2>Modulo 2: Toy-Games como Laboratorio</h2>
                <p>Para entender o ICM em sua forma mais pura, usamos <strong>Toy-Games</strong>: cenarios de laboratorio ultra-simplificados.</p>

                <h4>O &quot;Teto do RP&quot;</h4>
                <p>Existe um limite. Voce nao pode &quot;overbluffar&quot; infinitamente o Chip Leader ou um stack medio. Chega um ponto matematico onde ele e obrigado a pagar com uma frequencia minima para nao ser explorado, independente do ICM. Nao tente passar por cima do Teto do RP.</p>

                <div style={{ textAlign: 'center', margin: '3rem 0' }}>
                    <Link href="/tools/icm" className="card-cta" style={{ border: '1px solid var(--accent-primary)', padding: '1rem 2rem', borderRadius: '8px', fontSize: '1rem' }}>
                        &#127918; Abrir Simulador Interativo
                    </Link>
                </div>

                <hr style={{ border: 0, borderTop: '1px solid var(--border-color)', margin: '3rem 0' }} />

                <h2>Modulo 3: ICM Pos-Flop - A Fronteira</h2>

                <h3>3.2 Downward Drift: A Gravidade do ICM</h3>
                <p>O conceito mais importante para ajustar sua estrategia pos-flop e o <strong>Downward Drift</strong>.</p>
                <blockquote>
                    Downward Drift e a heuristica de que, sob pressao ICM, as acoes &quot;descem um degrau&quot; na escala de agressividade. Apostas grandes viram apostas pequenas; apostas pequenas viram checks; e checks viram folds.
                </blockquote>

                <h3>3.5 O Check-Back com Maos Premium</h3>
                <p>Em situacoes de alto RP (ex: Bolha ou FT com shorts), o Solver frequentemente da <strong>Check-Back no Flop com AA e KK</strong>. Simplesmente sobreviver tem EV positivo. Apostar reabre a acao para um check-raise, criando um cenario de catastrofe potencial.</p>

                <hr style={{ border: 0, borderTop: '1px solid var(--border-color)', margin: '3rem 0' }} />

                <h2>Modulo 5: Aplicacao Pratica</h2>

                <h3>Os 10 Erros Mais Comuns</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Erro</th>
                            <th>Por que e um Erro</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Estudar Pos-Flop Apenas em ChipEV</strong></td>
                            <td>Ignora a pressao ICM que transforma fundamentalmente os ranges.</td>
                        </tr>
                        <tr>
                            <td><strong>Usar Sizing de Cash Game</strong></td>
                            <td>Sizings grandes constroem potes que geram um risco desproporcional.</td>
                        </tr>
                        <tr>
                            <td><strong>Overbluffar o Chip Leader</strong></td>
                            <td>Ignora o Teto do RP; o CL para de foldar em certo ponto.</td>
                        </tr>
                        <tr>
                            <td><strong>Ignorar a Mesa</strong></td>
                            <td>Nao entender que um all-in alheio muda o valor das SUAS fichas.</td>
                        </tr>
                    </tbody>
                </table>

                <div className="callout" style={{ borderLeftColor: 'var(--accent-emerald)', background: 'rgba(16, 185, 129, 0.1)' }}>
                    <h4 style={{ color: 'var(--accent-emerald)', marginTop: 0 }}>Checklist de Decisao (Tempo Real)</h4>
                    <ol style={{ marginTop: '1rem', marginLeft: '1.5rem', listStyleType: 'decimal', color: '#fff' }}>
                        <li><strong>Quem Cobre Quem?</strong> (Define a Vantagem de Risco)</li>
                        <li><strong>Short Stacks Presentes?</strong> (Eleva o RP geral)</li>
                        <li><strong>Estrutura de Pagamentos?</strong> (Flat vs Top-Heavy)</li>
                        <li><strong>Downward Drift?</strong> (Ajustou o sizing para baixo?)</li>
                    </ol>
                </div>
            </article>

            <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                <Link href="/aula-icm" style={{ color: 'var(--text-muted)', textDecoration: 'underline' }}>
                    &larr; Voltar para a Aula
                </Link>
            </div>
        </main>
    );
}
