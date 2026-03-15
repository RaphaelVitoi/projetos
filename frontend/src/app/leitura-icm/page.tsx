/**
 * IDENTITY: Whitepaper Completo - Entendendo o ICM e suas Heuristicas
 * PATH: src/app/leitura-icm/page.tsx
 * ROLE: Documento tecnico completo sobre ICM, Toy Games, Risk Premium e estrategia pos-flop.
 * BINDING: [layout.tsx, globals.css]
 */

import Link from 'next/link';

export const metadata = {
    title: 'Entendendo o ICM | Raphael Vitoi',
    description: 'Whitepaper: Entendendo o ICM e suas Heuristicas - Toy Games, Risk Premium, Pos-Flop e a Nova Fronteira do Edge.'
};

export default function LeituraICM() {
    return (
        <main className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                    Documento Tecnico &bull; Versao 1.0
                </span>
                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', background: 'linear-gradient(135deg, #fff 0%, #a5b4fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem', marginTop: '1rem' }}>
                    Entendendo o ICM e suas Heuristicas
                </h1>
                <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Decisoes Pos-Flop em Final Tables e a Nova Fronteira do Edge.</p>
            </div>

            <article>
                {/* ==================== MODULO 1 ==================== */}
                <h2>Modulo 1: O Problema e o Mapa</h2>

                <h3>1.1 Por que ICM importa desde a mao 1</h3>
                <p>A tese central desta aula e direta: o edge em ICM (Independent Chip Model) migrou do pre-flop para o pos-flop. O jogo pre-flop, com suas decisoes de push/fold, ja foi extensivamente mapeado por solvers. O gap de skill real, a fronteira onde o dinheiro e ganho ou perdido em 2026, esta nas decisoes tomadas apos o flop sob a pressao do ICM.</p>
                <p>Ignorar essa realidade tem um custo quantificavel. Jogar uma estrategia de ChipEV (cEV) pura em spots de mesa final onde o ICM e o fator dominante custa, em media, <strong>mais de 10% do seu buy-in em EV ($EV)</strong>.</p>

                <div className="callout">
                    <p><strong>Definicao:</strong> Risk Premium e a equity adicional, acima do pot odds, que um jogador precisa ter para justificar um call de all-in sob a pressao do ICM. Ele mede o &quot;custo do risco&quot; que o modelo de torneio impoe a uma jogada.</p>
                </div>

                <h3>1.2 A Antevisao</h3>
                <p>Hoje em dia, o conhecimento teorico sobre poker esta muito mais acessivel e pratico do que ha uma decada. Esta disponivel atraves de uma variedade de recursos: materiais gratuitos, cursos avancados, ferramentas educativas poderosas, Solucionadores de Situacoes Complexas (SOLVERS) e trackers rigorosos como o Hand2Note, que coletam e disponibilizam dados de jogadores e seus torneios. Essas informacoes permitem que jogadores e analistas desvendem os jogos da populacao e os padroes de adversarios para desenvolver estrategias precisas de exploracao.</p>
                <p>Embora os jogadores estejam se aprimorando teoricamente, ainda existem areas negligenciadas, especialmente o <strong>ICM Pos-Flop</strong>, onde muitas fraquezas sao perceptiveis mesmo entre jogadores regulares. Muitos profissionais ainda utilizam exercicios baseados em ChipEV para treinar e estudar o jogo, embora, fora das situacoes de heads-up, praticamente todas as fases do poker sejam influenciadas pelo ICM.</p>
                <p>Na visao de Raphael Vitoi, a verdadeira vantagem competitiva nao se encontra mais tanto nas decisoes pre-flop baseadas em ICM, especialmente em stakes altos, mas sim no jogo pos-flop, onde ainda ha muito a ser explorado e maximizado em termos de valor esperado (EV).</p>

                <h3>1.3 Sobre o Risk Premium (RP)</h3>
                <p>O RP e uma metrica central no ICM, ajudando a estimar o impacto das decisoes em situacoes especificas de torneio. Ele justifica decisoes baseadas no equilibrio entre o risco envolvido e o potencial retorno. No poker, cada stack tem um valor monetario implicito, que reflete uma parte do prizepool remanescente.</p>
                <p>O RP e influenciado nao apenas pela interacao direta entre duas stacks, mas tambem pela <strong>configuracao geral das stacks na mesa</strong>. Cada jogador e cada stack exercem influencia mutua, criando um ambiente dinamico onde as decisoes de um jogador repercutem em todo o campo de jogo.</p>

                <div className="callout">
                    <h4 style={{ marginTop: 0 }}>RP de Ida vs. RP de Volta</h4>
                    <p>Existem dois tipos de RPs em um cenario de Single Raised Pot (SRP): o <strong>&quot;RP de ida&quot;</strong> (do jogador que abre a rodada) e o <strong>&quot;RP de volta&quot;</strong> (do jogador que responde). Esses RPs geralmente diferem e a dinamica entre eles e crucial:</p>
                    <ul style={{ marginLeft: '1.5rem', color: '#cbd5e1' }}>
                        <li>Se os RPs sao similares, isso leva a uma estrategia mais passiva, como um acordo silencioso para evitar situacoes de risco.</li>
                        <li>Se o &quot;RP de ida&quot; for 25% maior que o &quot;RP de volta&quot;, essa diferenca simboliza a pressao adicional que o jogador com menor RP pode aplicar.</li>
                        <li>Se o &quot;RP de volta&quot; for o dobro do &quot;RP de ida&quot;, o jogador com menor RP pode exercer pressao substancial tanto pre quanto pos-flop.</li>
                    </ul>
                    <p style={{ marginBottom: 0 }}>A diferenca entre os RPs e conhecida como <strong>Vantagem ou Desvantagem de Risco</strong>. O solver nao leva em consideracao desvantagens extras como estar fora de posicao ou desvantagem de edge, ou seja, pode haver um acumulo de desvantagens nao previsto pelo programa.</p>
                </div>

                <h3>1.4 Valuations de Stack</h3>
                <p>Um erro fundamental e associar linearmente a porcentagem de fichas a porcentagem do prize pool. O Chip Leader com 40% das fichas em uma mesa final de 6 jogadores nao tem direito a 40% do prize pool.</p>
                <p>Isso nos leva ao principio mais famoso do ICM: <strong>Fichas ganhas valem menos do que fichas perdidas.</strong></p>
                <p>Embora haja uma desproporcao no valor das fichas que ganhamos em detrimento das que perdemos, acumular fichas continua sendo benefico. Se interpretarmos essa frase ao pe da letra, um CL disparado numa FT apenas se sentaria em sua pilha de fichas e nao jogaria mais nenhuma mao, o que sabemos que nao e pratico. O CL nao so tem interesse em aumentar sua perspectiva de ganhos, mas tambem tem a responsabilidade de <strong>dificultar que jogadores que possam rivalizar com ele acumulem fichas dos outros jogadores</strong>.</p>

                <hr style={{ border: 0, borderTop: '1px solid var(--border-color)', margin: '3rem 0' }} />

                {/* ==================== MODULO 2 ==================== */}
                <h2>Modulo 2: Toy-Games como Laboratorio</h2>
                <p>Para entender o ICM em sua forma mais pura, usamos <strong>Toy-Games</strong>: cenarios de laboratorio ultra-simplificados. Sao ferramentas educativas projetadas para descomplicar o universo complexo do poker, reduzindo as variaveis do jogo real para facilitar o entendimento de conceitos como Equilibrio de Nash, MDF e ICM.</p>

                <div className="callout">
                    <h4 style={{ marginTop: 0 }}>Configuracao do Toy Game Classico</h4>
                    <p><strong>Range IP:</strong> AA, QQ, JJ (18 combos)</p>
                    <p><strong>Range OOP:</strong> KK (6 combos)</p>
                    <p><strong>Pote:</strong> 100 fichas | <strong>Aposta:</strong> 100 fichas (all in)</p>
                    <p><strong>Board:</strong> 22223</p>
                    <p style={{ marginBottom: 0 }}>OOP (KK) sempre checka. AA (valor), QQ e JJ (potenciais blefes) devem balancear entre shove e check, enquanto KK (bluffcatcher puro) deve defender uma frequencia adequada.</p>
                </div>

                <h3>Toy Game 1 (ChipEV Puro)</h3>
                <p>IP possui 6 combos de value e 3 combos de bluff. KK paga 50% das vezes para neutralizar o EV dos bluffs do IP.</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-primary)' }}>a = (100 / 200 = 0,5) &rarr; 1 - a = 50% de defesa</p>

                <h3>Toy Game 2 (RP: IP 3% | OOP 6%)</h3>
                <p>O IP aumentou os bluffs de 3 para 4,2 combinacoes, enquanto o OOP comecou a desistir um pouco mais. Ambos possuem um Risk Premium relativamente baixo, indicando baixo risco, embora ainda presente. O IP possui uma <strong>vantagem de risco significativa</strong> e nao enfrenta o risco de eliminacao ao fazer um shove.</p>
                <p>Quanto menor a diferenca de RP entre os jogadores, mais passivamente eles tendem a jogar, como se houvesse um <strong>acordo silencioso</strong> para evitar situacoes de risco.</p>

                <h3>Toy Game 3 (RP: IP 3% | OOP 9%)</h3>
                <p>O IP agora blefa mais, aumentando de 4,2 para 5 combinacoes de blefe. Apesar disso, o OOP <strong>nao esta desistindo mais</strong> do que no RP anterior. Com o RP tao baixo e a distancia significativa entre os RPs, e natural que vejamos mais blefes do IP. Entretanto, o aumento de blefes nao e proporcional ao aumento do RP.</p>
                <p>O OOP atingiu o <strong>&quot;Teto do RP&quot;</strong>. Em um range formado inteiramente por bluffcatchers contra um range polarizado que sempre contem o topo, ha sempre uma chance palpavel de ser eliminado. O solver identificou a &quot;linha de corte&quot;: o OOP esta defendendo a mesma quantidade, exatamente onde o RP permite que ele defenda. De maneira contra-intuitiva, ambos estao fazendo o que e melhor para eles individualmente, como se fosse um pacto silencioso. Sim, alcancamos o <strong>Equilibrio de Nash</strong>.</p>

                <h3>Toy Game 4 (RP: IP 3% | OOP 18%)</h3>
                <p>O IP aumentou ainda mais os blefes! Temos <strong>6 combinacoes de valor contra 8 de blefe</strong>, o que e claramente desbalanceado do ponto de vista de ChipEV. Normalmente, em um contexto de ChipEV equilibrado, o KK pagaria 100% das vezes. No entanto, neste caso, o KK ainda continua pagando apenas ate o &quot;Teto do RP&quot;.</p>

                <h3>Toy Game 5 (RP: IP 3% | OOP 24%)</h3>
                <p>Quanto maior for a discrepancia entre os RPs e mais alto o RP do jogador pressionado, mais agressivamente atacamos como IP. E, mantendo a mesma logica, o KK continua seguindo a mesma regra: pagando no limite superior do RP.</p>

                <div className="callout" style={{ borderLeftColor: 'var(--accent-secondary)', background: 'rgba(225, 29, 72, 0.08)' }}>
                    <h4 style={{ color: 'var(--accent-secondary)', marginTop: 0 }}>O Teto do RP</h4>
                    <p>Assim como nao podemos pagar com 100% dos bluffcatchers quando o lider de fichas faz um shove com quase todo o seu range, isso nao implica que devemos sempre evitar dar call com uma frequencia razoavel de bluffcatchers nesse cenario de alta pressao de RP. <strong>As respostas adequadas da Teoria do Jogo em ambientes de ICM raramente sao extremas.</strong></p>
                    <p style={{ marginBottom: 0 }}>Cuidado com suposicoes que se desviam da teoria estabelecida! Frases como &quot;Esta shovando tudo, vou pagar com qualquer bluffcatcher!&quot; podem ser perigosas. Variaveis mecanicas do ICM restringem a possibilidade de fazer ajustes estrategicos que sao tanto arriscados quanto extremos.</p>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Toy Game</th>
                            <th>RP do IP</th>
                            <th>RP do OOP</th>
                            <th>Bluffs IP</th>
                            <th>Defesa OOP</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>1 (ChipEV)</strong></td>
                            <td>0%</td>
                            <td>0%</td>
                            <td>3 combos</td>
                            <td>50%</td>
                        </tr>
                        <tr>
                            <td><strong>2</strong></td>
                            <td>3%</td>
                            <td>6%</td>
                            <td>4.2 combos</td>
                            <td style={{ color: 'var(--accent-secondary)' }}>Reduz levemente</td>
                        </tr>
                        <tr>
                            <td><strong>3</strong></td>
                            <td>3%</td>
                            <td>9%</td>
                            <td>5 combos</td>
                            <td>Teto do RP</td>
                        </tr>
                        <tr>
                            <td><strong>4</strong></td>
                            <td>3%</td>
                            <td>18%</td>
                            <td style={{ color: 'var(--accent-secondary)' }}>8 combos (desbalanceado)</td>
                            <td>Teto do RP</td>
                        </tr>
                        <tr>
                            <td><strong>5</strong></td>
                            <td>3%</td>
                            <td>24%</td>
                            <td style={{ color: 'var(--accent-secondary)' }}>Maximo</td>
                            <td>Teto do RP</td>
                        </tr>
                    </tbody>
                </table>

                <div style={{ textAlign: 'center', margin: '3rem 0' }}>
                    <Link href="/tools/icm" className="card-cta" style={{ border: '1px solid var(--accent-primary)', padding: '1rem 2rem', borderRadius: '8px', fontSize: '1rem' }}>
                        &#127918; Abrir Simulador Interativo
                    </Link>
                </div>

                <hr style={{ border: 0, borderTop: '1px solid var(--border-color)', margin: '3rem 0' }} />

                {/* ==================== PARTE II ==================== */}
                <h2>Parte II: Invertendo o RP</h2>
                <p>O que acontece quando o IP possui RP maior que o OOP? Os resultados sao surpreendentes.</p>

                <h3>Inversao 1 (RP: IP 9% | OOP 3%)</h3>
                <p>IP agora possui RP maior. Embora o IP nao comece a blefar excessivamente, comparativamente ao Toy Game 3, ele ainda blefa ligeiramente acima do ChipEV. Mesmo que o risco para o OOP seja baixo, nao deixa de ser um risco. As fichas em torneios de MTT nao sao &quot;apenas fichas&quot;; elas possuem valor monetario intrinseco superior ao valor nominal.</p>
                <p><strong>O OOP, com menor Risk Premium, PAGA MENOS vs o mesmo range que continua mais inclinado para os bluffs.</strong></p>

                <h3>Inversao 2 (RP: IP 18% | OOP 3%)</h3>
                <p>O IP agora tem 18% de RP, um valor de risco absurdo, e continua shovando o MESMO range levemente inclinado aos bluffs. E o OOP, com baixissimo RP e risco, <strong>segue a foldar cada vez mais</strong> vs o mesmo range levemente inclinado a bluff.</p>

                <h3>Inversao 3 (RP: IP 21% | OOP 3%)</h3>
                <p>Exatamente o mesmo range de shove do IP, levemente inclinado ao bluff. E o OOP, com baixissimo RP e risco, <strong>ja esta alcancando quase 80% de fold!</strong></p>

                <div className="callout" style={{ borderLeftColor: 'var(--accent-emerald)', background: 'rgba(16, 185, 129, 0.08)' }}>
                    <h4 style={{ color: 'var(--accent-emerald)', marginTop: 0 }}>Por que o OOP folda tanto?</h4>
                    <p>Os 20bb sao identicos, seja contribuindo para o lider de fichas (CL) ou para um jogador com 20bbs. No entanto, a avaliacao do valor entre as stacks difere significativamente. Temos pouco incentivo para jogar como &quot;bluffcatcher&quot; contra stacks medias e curtas, ja que <strong>perder fichas tem um impacto mais significativo do que ganha-las</strong>.</p>
                    <p>Para o CL, mesmo que o range polarizado esteja levemente inclinado ao bluff, geralmente nao ha recompensa suficiente para justificar o uso de um bluffcatcher. Dobrar e aumentar a valuation para o oponente reduz a pressao do ICM sobre TODA A MESA.</p>
                    <p style={{ marginBottom: 0 }}>Um evento de colisao ou de acumulacao/perda de fichas numa FT, mesmo envolvendo apenas dois jogadores, <strong>influencia a avaliacao da stack e a expectativa matematica de todos os outros jogadores que NAO PARTICIPARAM do evento</strong>.</p>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Inversao</th>
                            <th>RP do IP</th>
                            <th>RP do OOP</th>
                            <th>Range IP</th>
                            <th>Fold OOP</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>1</strong></td>
                            <td>9%</td>
                            <td>3%</td>
                            <td>Leve inclinacao bluff</td>
                            <td>Paga menos que ChipEV</td>
                        </tr>
                        <tr>
                            <td><strong>2</strong></td>
                            <td>18%</td>
                            <td>3%</td>
                            <td>Mesmo range</td>
                            <td style={{ color: 'var(--accent-secondary)' }}>Fold crescente</td>
                        </tr>
                        <tr>
                            <td><strong>3</strong></td>
                            <td>21%</td>
                            <td>3%</td>
                            <td>Mesmo range</td>
                            <td style={{ color: 'var(--accent-secondary)' }}>~80% fold</td>
                        </tr>
                    </tbody>
                </table>

                <hr style={{ border: 0, borderTop: '1px solid var(--border-color)', margin: '3rem 0' }} />

                {/* ==================== MODULO 3 ==================== */}
                <h2>Modulo 3: ICM Pos-Flop e a Dinamica do Chip Leader</h2>

                <h3>3.1 A Mesa Final como Organismo</h3>
                <p>Quando existem jogadores prestes a serem eliminados, o RP medio na mesa aumenta. O jogador capaz de eliminar outros sem prejudicar muito sua propria stack possui uma <strong>vantagem estrategica consideravel</strong> e deve intensificar a pressao sobre a mesa.</p>
                <p>A presenca de varias stacks a beira da eliminacao eleva tanto o ICM quanto o RP medio das stacks intermediarias, dificultando sua movimentacao no jogo. O incentivo para jogar pots diminui se houver um chip leader ativo, pois ele pode utilizar a pressao do RP para impor estrategias agressivas.</p>

                <h3>3.2 Downward Drift: A Gravidade do ICM</h3>
                <blockquote>
                    Downward Drift e a heuristica de que, sob pressao ICM, as acoes &quot;descem um degrau&quot; na escala de agressividade. Apostas grandes viram apostas pequenas; apostas pequenas viram checks; e checks viram folds.
                </blockquote>

                <h3>3.3 O Impacto das Configuracoes de Mesa</h3>
                <p>As configuracoes da mesa geram diversos RPs e a estrutura de payjumps influencia diretamente esses valores:</p>
                <ul style={{ marginLeft: '1.5rem', color: '#cbd5e1' }}>
                    <li><strong>Estruturas &quot;top-heavy&quot;</strong> (premiacao concentrada no topo): o RP das stacks menores e reduzido, incentivando-os a arriscar mais.</li>
                    <li><strong>Estruturas equilibradas:</strong> o RP das stacks menores aumenta, pois a queda em posicoes inferiores e menos punitiva.</li>
                    <li>A medida que o numero de jogadores diminui, o RP medio tambem cai.</li>
                </ul>

                <h3>3.4 O Check-Back com Maos Premium</h3>
                <p>Em situacoes de alto RP (ex: Bolha ou FT com shorts), o Solver frequentemente da <strong>Check-Back no Flop com AA e KK</strong>. Simplesmente sobreviver tem EV positivo. Apostar reabre a acao para um check-raise, criando um cenario de catastrofe potencial.</p>

                <h3>3.5 Ranges Condensados sob Pressao</h3>
                <p>Jogar um range condensado versus um range linear pos-flop geralmente nao e tao lucrativo. Ranges condensados sao projetados para reter equity, nao necessariamente para gerar EV. Quando enfrentamos uma desvantagem de risco e temos poucas fichas, o cenario se torna ainda mais complicado:</p>
                <ul style={{ marginLeft: '1.5rem', color: '#cbd5e1' }}>
                    <li>Nao temos incentivos para aumentar o pote com raises</li>
                    <li>Nao veremos muitos shoves, pois um range condensado nao e equipado para isso</li>
                    <li>Ao optar por call, a tendencia e continuar enfrentando pressao no turn e river</li>
                    <li>A medida que a stack diminui, o RP aumenta gradualmente ate o &quot;Teto do RP&quot; intransponivel</li>
                </ul>

                <hr style={{ border: 0, borderTop: '1px solid var(--border-color)', margin: '3rem 0' }} />

                {/* ==================== MODULO 5 ==================== */}
                <h2>Modulo 4: Aplicacao Pratica</h2>

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
                        <tr>
                            <td><strong>Interpretar &quot;fichas perdidas valem mais&quot; literalmente</strong></td>
                            <td>Acumular fichas continua sendo benefico; o CL deve pressionar rivais.</td>
                        </tr>
                        <tr>
                            <td><strong>Focar no resultado do solver, nao na linguagem</strong></td>
                            <td>O valor esta na interpretacao e reconhecimento da linguagem teorica.</td>
                        </tr>
                        <tr>
                            <td><strong>Usar bluffcatcher contra range polarizado sob RP alto</strong></td>
                            <td>Variaveis mecanicas do ICM restringem ajustes arriscados e extremos.</td>
                        </tr>
                        <tr>
                            <td><strong>Ignorar o RP de ida vs. RP de volta</strong></td>
                            <td>A assimetria de risco entre agressor e defensor e crucial.</td>
                        </tr>
                    </tbody>
                </table>

                <div className="callout" style={{ borderLeftColor: 'var(--accent-emerald)', background: 'rgba(16, 185, 129, 0.1)' }}>
                    <h4 style={{ color: 'var(--accent-emerald)', marginTop: 0 }}>Checklist de Decisao (Tempo Real)</h4>
                    <ol style={{ marginTop: '1rem', marginLeft: '1.5rem', listStyleType: 'decimal', color: '#cbd5e1' }}>
                        <li><strong>Quem Cobre Quem?</strong> (Define a Vantagem de Risco)</li>
                        <li><strong>Short Stacks Presentes?</strong> (Eleva o RP geral)</li>
                        <li><strong>Estrutura de Pagamentos?</strong> (Flat vs Top-Heavy)</li>
                        <li><strong>Downward Drift?</strong> (Ajustou o sizing para baixo?)</li>
                        <li><strong>RP de Ida vs. RP de Volta?</strong> (Quem tem vantagem de risco?)</li>
                        <li><strong>Range Condensado vs. Polarizado?</strong> (Ajustou a agressividade?)</li>
                    </ol>
                </div>

                <div style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(99, 102, 241, 0.08)', borderRadius: '8px', border: '1px solid rgba(99, 102, 241, 0.2)', textAlign: 'center' }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>Principio Final</p>
                    <p style={{ fontSize: '1.1rem', fontStyle: 'italic', marginBottom: 0 }}>&quot;Qual e a sua perspectiva nesta mesa final? Qual e a sua esperanca matematica? Colocar-se nesta situacao de alto risco realmente vale a pena?&quot;</p>
                </div>
            </article>

            <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href="/aula-icm" style={{ color: 'var(--text-muted)', textDecoration: 'underline', fontSize: '0.9rem' }}>
                    &larr; Voltar para a Aula
                </Link>
                <Link href="/artigos/estado-da-arte" style={{ color: 'var(--text-muted)', textDecoration: 'underline', fontSize: '0.9rem' }}>
                    Estado da Arte ICM 2025 &rarr;
                </Link>
            </div>
        </main>
    );
}
