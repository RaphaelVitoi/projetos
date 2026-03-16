/**
 * IDENTITY: Whitepaper - O Estado da Arte do ICM 2025
 * PATH: src/app/artigos/estado-da-arte/page.tsx
 * ROLE: Artigo avançado sobre tendências High Stakes, Donk Bet meta, Micro-Stack Irradiation, IA vs HRC.
 * BINDING: [layout.tsx, globals.css]
 */

import Link from 'next/link';

export const metadata = {
    title: 'O Estado da Arte do ICM 2025 | Raphael Vitoi',
    description: 'Novas Fronteiras, Tendências High Stakes e Ferramentas de Elite. Donk Bet meta, Efeito de Irradiação e IA vs HRC Pro.'
};

export default function EstadoDaArtePage() {
    return (
        <main className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                    Whitepaper &bull; Nível Avançado
                </span>
                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', background: 'linear-gradient(135deg, #fff 0%, #a5b4fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem', marginTop: '1rem' }}>
                    O Estado da Arte do ICM 2025
                </h1>
                <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Novas Fronteiras, Tendências High Stakes e Ferramentas de Elite.</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '1rem' }}>Autor: Raphael Vitoi &bull; Novembro de 2025</p>
            </div>

            <article>
                <h2>1. Introdução: A Evolução do Organismo</h2>
                <p>O poker é um organismo vivo e em constante mutação. O que definimos como &quot;padrão&quot; hoje pode se tornar uma estratégia explorável amanhã. Ao observarmos as tendências mais recentes dos circuitos High Roller (como as séries Triton e SHRB) e a evolução exponencial das ferramentas de Inteligência Artificial em 2024/2025, identificamos dinâmicas de alta importância que refinam o nosso entendimento sobre o ICM Pós-Flop.</p>
                <p>Este documento não trata apenas de saber &quot;trancar&quot; o jogo para garantir payjumps. Trata-se de entender como a elite mundial está <strong>encontrando brechas ofensivas na passividade que o ICM impõe</strong>.</p>

                <hr style={{ border: 0, borderTop: '1px solid var(--border-color)', margin: '3rem 0' }} />

                <h2>2. A &quot;Meta&quot; do Donk Bet em ICM: O Ataque Defensivo</h2>
                <p>Historicamente, a passividade (checks) tem sido a resposta padrão para o aumento do Risk Premium. Contudo, solvers de última geração validaram uma linha que desafia a intuição clássica: o <strong>Donk Bet do Big Blind</strong> em boards que favorecem o agressor.</p>

                <h3>O Cenário</h3>
                <p>Imagine uma situação de ChipEV em um board K&#9830; J&#9827; T&#9824;. O BB quase nunca lideraria aqui. Porém, sob pressão extrema de ICM, o agressor (IP) está &quot;algemado&quot; pelo Risk Premium. Ele é forçado a dar muitos check-backs para controlar o tamanho do pote e evitar riscos de queda.</p>

                <h3>A Lógica da Jogada</h3>
                <p>O Big Blind &quot;percebe&quot; que o IP vai dar check com muitas mãos médias para realizar equidade gratuitamente. Para negar essa equidade (deny equity) sem arriscar um check-raise caro, o BB passa a liderar com <strong>sizings minúsculos (10% a 20% do pote)</strong>.</p>

                <div className="callout">
                    <h4 style={{ marginTop: 0 }}>Por que funciona? (A Falha na Matriz)</h4>
                    <p>A grande sacada estratégica é a <strong>impunidade</strong>. Em ChipEV, a melhor resposta para uma donk bet é o raise. No ICMev, crescer o pote para punir uma aposta pequena seria um <strong>erro matemático grave</strong> para o IP (o stack maior).</p>
                    <p style={{ marginBottom: 0 }}>Resultado: O donk bet quase nunca é punido com raise. Isso permite que o BB roube a iniciativa, aumente a realização de sua equidade e transforme mãos que seriam auto-folds em mãos lucrativas. É uma forma barata de proteção que explora a passividade forçada do adversário.</p>
                </div>

                <hr style={{ border: 0, borderTop: '1px solid var(--border-color)', margin: '3rem 0' }} />

                <h2>3. A Física dos &quot;Micro-Stacks&quot;: O Efeito de Irradiação</h2>
                <p>A mesa final funciona como um organismo onde as stacks se influenciam mutuamente. Para tangibilizar isso, introduzimos o conceito de <strong>Irradiação de Risco</strong>.</p>

                <h3>O Campo de Força</h3>
                <p>Imagine que existe um &quot;Micro-Stack&quot; na mesa (alguém com menos de 5bb). A presença desse jogador cria um campo de força que <strong>altera a matemática de todos os outros confrontos</strong>, mesmo aqueles em que ele não está envolvido.</p>

                <div className="callout" style={{ borderLeftColor: 'var(--accent-secondary)', background: 'rgba(225, 29, 72, 0.08)' }}>
                    <h4 style={{ color: 'var(--accent-secondary)', marginTop: 0 }}>Exemplo Prático</h4>
                    <p>Você tem 30bb e joga uma mão contra o Chip Leader (80bb). O jogador com 2bb está em outra posição.</p>
                    <ul style={{ marginLeft: '1.5rem', color: '#cbd5e1' }}>
                        <li>O seu Risk Premium dispara para níveis estratosféricos.</li>
                        <li>A probabilidade do stack curto cair na próxima mão é altíssima, garantindo um payjump imediato.</li>
                        <li>O custo matemático de você cair antes desse &quot;morto-vivo&quot; é, para fins práticos, infinito.</li>
                    </ul>
                    <p style={{ marginBottom: 0 }}><strong>Conclusão:</strong> Quando há um micro-stack agonizando, o &quot;acordo silencioso&quot; de passividade torna-se uma &quot;lei marcial&quot;. A agressividade entre os stacks médios deve cair a quase zero.</p>
                </div>

                <hr style={{ border: 0, borderTop: '1px solid var(--border-color)', margin: '3rem 0' }} />

                <h2>4. A Batalha das Ferramentas: IA vs. HRC Pro</h2>

                <h3>A Revolução da IA (GTO Wizard AI)</h3>
                <p>A nova geração de solvers baseados em redes neurais consegue estimar o Bunching Effect em segundos e trouxe luz para soluções de Multi-Way Pós-Flop, algo antes inviável.</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-primary)' }}>A IA do GTO Wizard derrotou o lendário Slumbot com uma margem de 19,4bb/100.</p>

                <h3>A Transparência do HRC Pro</h3>
                <p>Apesar da velocidade da IA, o Holdem Resources Calculator (HRC Pro) continua sendo a referência para transparência e precisão cirúrgica. Ele permite exportar faixas de bunching, entender a mecânica do e-Nash e solucionar spots complexos como <strong>Multiway PKO + ICM simultaneamente</strong>.</p>

                <table>
                    <thead>
                        <tr>
                            <th>Critério</th>
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
                            <td style={{ color: 'var(--accent-emerald)' }}>Exportação precisa</td>
                        </tr>
                        <tr>
                            <td><strong>Multiway ICM</strong></td>
                            <td>Limitado</td>
                            <td style={{ color: 'var(--accent-emerald)' }}>Completo (PKO + ICM)</td>
                        </tr>
                        <tr>
                            <td><strong>Transparência</strong></td>
                            <td>&quot;Caixa preta&quot;</td>
                            <td style={{ color: 'var(--accent-emerald)' }}>Total (e-Nash visível)</td>
                        </tr>
                        <tr>
                            <td><strong>Uso Ideal</strong></td>
                            <td>Volume e heurísticas rápidas</td>
                            <td>Estudo cirúrgico de spots críticos</td>
                        </tr>
                    </tbody>
                </table>

                <hr style={{ border: 0, borderTop: '1px solid var(--border-color)', margin: '3rem 0' }} />

                <h2>5. Considerações Finais: A Mentalidade Vencedora</h2>
                <p>Dominar o ICM vai além de saber foldar; é entender a sua <strong>Expectativa Matemática</strong> no torneio.</p>

                <div className="callout" style={{ borderLeftColor: 'var(--accent-secondary)', background: 'rgba(225, 29, 72, 0.08)' }}>
                    <h4 style={{ color: 'var(--accent-secondary)', marginTop: 0 }}>O Perigo do Mid Stack Passivo</h4>
                    <p style={{ marginBottom: 0 }}>Esperar alguém cair é uma estratégia que, matematicamente, <strong>sacramenta o jogador como alguém que terminará sempre em posições intermediárias</strong>. O Mid Stack sofre com a pressão, mas precisa lutar para melhorar sua própria expectativa de vitória, escolhendo os momentos exatos (como o Donk Bet defensivo) para acumular fichas sem risco de ruína.</p>
                </div>

                <div style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(99, 102, 241, 0.08)', borderRadius: '8px', border: '1px solid rgba(99, 102, 241, 0.2)', textAlign: 'center' }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>Veredito Tecnológico</p>
                    <p style={{ fontSize: '1rem', marginBottom: 0 }}>Utilize a IA para volume e heurísticas rápidas. Utilize o HRC Pro para o estudo profundo de spots críticos de FT onde o Bunching e a assimetria de stacks são extremos.</p>
                </div>
            </article>

            <nav className="article-nav">
                <Link href="/leitura-icm">&larr; Entendendo o ICM</Link>
                <Link href="/artigos/smart-sniper">Protocolo Smart Sniper &rarr;</Link>
            </nav>
        </main>
    );
}
