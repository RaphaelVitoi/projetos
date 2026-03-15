/**
 * IDENTITY: Whitepaper - O Estado da Arte do ICM 2025
 * PATH: src/app/artigos/estado-da-arte/page.tsx
 * ROLE: Artigo avancado sobre tendencias High Stakes, Donk Bet meta, Micro-Stack Irradiation, IA vs HRC.
 * BINDING: [layout.tsx, globals.css]
 */

import Link from 'next/link';

export const metadata = {
    title: 'O Estado da Arte do ICM 2025 | Raphael Vitoi',
    description: 'Novas Fronteiras, Tendencias High Stakes e Ferramentas de Elite. Donk Bet meta, Efeito de Irradiacao e IA vs HRC Pro.'
};

export default function EstadoDaArtePage() {
    return (
        <main className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                    Whitepaper &bull; Nivel Avancado
                </span>
                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', background: 'linear-gradient(135deg, #fff 0%, #a5b4fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem', marginTop: '1rem' }}>
                    O Estado da Arte do ICM 2025
                </h1>
                <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Novas Fronteiras, Tendencias High Stakes e Ferramentas de Elite.</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '1rem' }}>Autor: Raphael Vitoi &bull; Novembro de 2025</p>
            </div>

            <article>
                <h2>1. Introducao: A Evolucao do Organismo</h2>
                <p>O poker e um organismo vivo e em constante mutacao. O que definimos como &quot;padrao&quot; hoje pode se tornar uma estrategia exploravel amanha. Ao observarmos as tendencias mais recentes dos circuitos High Roller (como as series Triton e SHRB) e a evolucao exponencial das ferramentas de Inteligencia Artificial em 2024/2025, identificamos dinamicas de alta importancia que refinam o nosso entendimento sobre o ICM Pos-Flop.</p>
                <p>Este documento nao trata apenas de saber &quot;trancar&quot; o jogo para garantir payjumps. Trata-se de entender como a elite mundial esta <strong>encontrando brechas ofensivas na passividade que o ICM impoe</strong>.</p>

                <hr style={{ border: 0, borderTop: '1px solid var(--border-color)', margin: '3rem 0' }} />

                <h2>2. A &quot;Meta&quot; do Donk Bet em ICM: O Ataque Defensivo</h2>
                <p>Historicamente, a passividade (checks) tem sido a resposta padrao para o aumento do Risk Premium. Contudo, solvers de ultima geracao validaram uma linha que desafia a intuicao classica: o <strong>Donk Bet do Big Blind</strong> em boards que favorecem o agressor.</p>

                <h3>O Cenario</h3>
                <p>Imagine uma situacao de ChipEV em um board K&#9830; J&#9827; T&#9824;. O BB quase nunca lideraria aqui. Porem, sob pressao extrema de ICM, o agressor (IP) esta &quot;algemado&quot; pelo Risk Premium. Ele e forcado a dar muitos check-backs para controlar o tamanho do pote e evitar riscos de queda.</p>

                <h3>A Logica da Jogada</h3>
                <p>O Big Blind &quot;percebe&quot; que o IP vai dar check com muitas maos medias para realizar equidade gratuitamente. Para negar essa equidade (deny equity) sem arriscar um check-raise caro, o BB passa a liderar com <strong>sizings minusculos (10% a 20% do pote)</strong>.</p>

                <div className="callout">
                    <h4 style={{ marginTop: 0 }}>Por que funciona? (A Falha na Matriz)</h4>
                    <p>A grande sacada estrategica e a <strong>impunidade</strong>. Em ChipEV, a melhor resposta para uma donk bet e o raise. No ICMev, crescer o pote para punir uma aposta pequena seria um <strong>erro matematico grave</strong> para o IP (o stack maior).</p>
                    <p style={{ marginBottom: 0 }}>Resultado: O donk bet quase nunca e punido com raise. Isso permite que o BB roube a iniciativa, aumente a realizacao de sua equidade e transforme maos que seriam auto-folds em maos lucrativas. E uma forma barata de protecao que explora a passividade forcada do adversario.</p>
                </div>

                <hr style={{ border: 0, borderTop: '1px solid var(--border-color)', margin: '3rem 0' }} />

                <h2>3. A Fisica dos &quot;Micro-Stacks&quot;: O Efeito de Irradiacao</h2>
                <p>A mesa final funciona como um organismo onde as stacks se influenciam mutuamente. Para tangibilizar isso, introduzimos o conceito de <strong>Irradiacao de Risco</strong>.</p>

                <h3>O Campo de Forca</h3>
                <p>Imagine que existe um &quot;Micro-Stack&quot; na mesa (alguem com menos de 5bb). A presenca desse jogador cria um campo de forca que <strong>altera a matematica de todos os outros confrontos</strong>, mesmo aqueles em que ele nao esta envolvido.</p>

                <div className="callout" style={{ borderLeftColor: 'var(--accent-secondary)', background: 'rgba(225, 29, 72, 0.08)' }}>
                    <h4 style={{ color: 'var(--accent-secondary)', marginTop: 0 }}>Exemplo Pratico</h4>
                    <p>Voce tem 30bb e joga uma mao contra o Chip Leader (80bb). O jogador com 2bb esta em outra posicao.</p>
                    <ul style={{ marginLeft: '1.5rem', color: '#cbd5e1' }}>
                        <li>O seu Risk Premium dispara para niveis estratosfericos.</li>
                        <li>A probabilidade do stack curto cair na proxima mao e altissima, garantindo um payjump imediato.</li>
                        <li>O custo matematico de voce cair antes desse &quot;morto-vivo&quot; e, para fins praticos, infinito.</li>
                    </ul>
                    <p style={{ marginBottom: 0 }}><strong>Conclusao:</strong> Quando ha um micro-stack agonizando, o &quot;acordo silencioso&quot; de passividade torna-se uma &quot;lei marcial&quot;. A agressividade entre os stacks medios deve cair a quase zero.</p>
                </div>

                <hr style={{ border: 0, borderTop: '1px solid var(--border-color)', margin: '3rem 0' }} />

                <h2>4. A Batalha das Ferramentas: IA vs. HRC Pro</h2>

                <h3>A Revolucao da IA (GTO Wizard AI)</h3>
                <p>A nova geracao de solvers baseados em redes neurais consegue estimar o Bunching Effect em segundos e trouxe luz para solucoes de Multi-Way Pos-Flop, algo antes inviavel.</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-primary)' }}>A IA do GTO Wizard derrotou o lendario Slumbot com uma margem de 19,4bb/100.</p>

                <h3>A Transparencia do HRC Pro</h3>
                <p>Apesar da velocidade da IA, o Holdem Resources Calculator (HRC Pro) continua sendo a referencia para transparencia e precisao cirurgica. Ele permite exportar faixas de bunching, entender a mecanica do e-Nash e solucionar spots complexos como <strong>Multiway PKO + ICM simultaneamente</strong>.</p>

                <table>
                    <thead>
                        <tr>
                            <th>Criterio</th>
                            <th>GTO Wizard AI</th>
                            <th>HRC Pro</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Velocidade</strong></td>
                            <td style={{ color: 'var(--accent-emerald)' }}>Segundos (rede neural)</td>
                            <td>Minutos a horas</td>
                        </tr>
                        <tr>
                            <td><strong>Bunching Effect</strong></td>
                            <td>Estimativa por IA</td>
                            <td style={{ color: 'var(--accent-emerald)' }}>Exportacao precisa</td>
                        </tr>
                        <tr>
                            <td><strong>Multiway ICM</strong></td>
                            <td>Limitado</td>
                            <td style={{ color: 'var(--accent-emerald)' }}>Completo (PKO + ICM)</td>
                        </tr>
                        <tr>
                            <td><strong>Transparencia</strong></td>
                            <td>&quot;Caixa preta&quot;</td>
                            <td style={{ color: 'var(--accent-emerald)' }}>Total (e-Nash visivel)</td>
                        </tr>
                        <tr>
                            <td><strong>Uso Ideal</strong></td>
                            <td>Volume e heuristicas rapidas</td>
                            <td>Estudo cirurgico de spots criticos</td>
                        </tr>
                    </tbody>
                </table>

                <hr style={{ border: 0, borderTop: '1px solid var(--border-color)', margin: '3rem 0' }} />

                <h2>5. Consideracoes Finais: A Mentalidade Vencedora</h2>
                <p>Dominar o ICM vai alem de saber foldar; e entender a sua <strong>Expectativa Matematica</strong> no torneio.</p>

                <div className="callout" style={{ borderLeftColor: 'var(--accent-secondary)', background: 'rgba(225, 29, 72, 0.08)' }}>
                    <h4 style={{ color: 'var(--accent-secondary)', marginTop: 0 }}>O Perigo do Mid Stack Passivo</h4>
                    <p style={{ marginBottom: 0 }}>Esperar alguem cair e uma estrategia que, matematicamente, <strong>sacramenta o jogador como alguem que terminara sempre em posicoes intermediarias</strong>. O Mid Stack sofre com a pressao, mas precisa lutar para melhorar sua propria expectativa de vitoria, escolhendo os momentos exatos (como o Donk Bet defensivo) para acumular fichas sem risco de ruina.</p>
                </div>

                <div style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(99, 102, 241, 0.08)', borderRadius: '8px', border: '1px solid rgba(99, 102, 241, 0.2)', textAlign: 'center' }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>Veredito Tecnologico</p>
                    <p style={{ fontSize: '1rem', marginBottom: 0 }}>Utilize a IA para volume e heuristicas rapidas. Utilize o HRC Pro para o estudo profundo de spots criticos de FT onde o Bunching e a assimetria de stacks sao extremos.</p>
                </div>
            </article>

            <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href="/leitura-icm" style={{ color: 'var(--text-muted)', textDecoration: 'underline', fontSize: '0.9rem' }}>
                    &larr; Entendendo o ICM
                </Link>
                <Link href="/artigos/smart-sniper" style={{ color: 'var(--text-muted)', textDecoration: 'underline', fontSize: '0.9rem' }}>
                    Protocolo Smart Sniper &rarr;
                </Link>
            </div>
        </main>
    );
}
