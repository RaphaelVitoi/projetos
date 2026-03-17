/**
 * IDENTITY: O Motor de Diluição
 * PATH: src/app/biblioteca/motor-diluicao/page.tsx
 * ROLE: Artigo técnico sobre a não-linearidade do Risk Premium através das streets.
 * BINDING: [layout.tsx, globals.css]
 */

import Link from 'next/link';

export const metadata = {
  title: 'O Motor de Diluição | Raphael Vitoi',
  description: 'Como o Risk Premium afeta os ranges de call de forma não-linear. A dissipação de RP por street e o modelo matemático do Downward Drift.',
};

export default function MotorDiluicaoPage() {
  return (
    <main className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1.5rem' }}>

      <header className="page-header" style={{ paddingBottom: '1rem' }}>
        <p className="page-label">ICM &bull; Estratégia &bull; Matemática</p>
        <h1 style={{ background: 'linear-gradient(135deg, #fff 0%, #10b981 50%, #6366f1 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, lineHeight: 1.2, marginTop: 0 }}>
          O Motor de Diluição
        </h1>
        <p className="page-subtitle">Como o Risk Premium afeta ranges de call de forma não-linear através das streets.</p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>Autor: Raphael Vitoi &bull; 2025 &bull; 8 min</p>
      </header>

      <article>

        <h2>1. O Problema da Uniformidade</h2>
        <p>A maioria dos jogadores pensa o ICM como uma pressão uniforme: você está em uma mesa final, então você joga mais tight. Pré-flop, flop, turn, river — o ICM é sempre o mesmo, certo?</p>
        <p>Errado. O ICM é uma pressão dinâmica que <strong>muda de magnitude</strong> conforme o SPR (Stack-to-Pot Ratio) decresce ao longo das streets. O Risk Premium não é uma constante — é uma função decrescente do SPR restante.</p>
        <p>Esse fenômeno é o que chamamos de <em>Motor de Diluição</em>: o mecanismo pelo qual a pressão ICM sobre a tomada de decisão se dissipa progressivamente do pré-flop ao river.</p>

        <div className="callout">
          <h4 style={{ marginTop: 0 }}>Definição: Downward Drift</h4>
          <p style={{ margin: 0 }}>O Downward Drift (formulado por Dara O'Kearney) descreve como o ICM tende a comprimir ranges de betting e calling nas streets posteriores. O mecanismo subjacente é exatamente o Motor de Diluição: o RP residual enfraquece conforme o SPR cai.</p>
        </div>

        <hr className="section-divider" />

        <h2>2. O Modelo Matemático</h2>
        <p>O Risk Premium efetivo em qualquer street pode ser modelado como:</p>

        <div className="callout" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
          <p style={{ margin: '0 0 0.5rem' }}><strong>RP_street = oopRp × (SPR_atual × potSize) / eff_stack</strong></p>
          <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Onde oopRp é o Risk Premium base do OOP, SPR_atual é o stack-to-pot ratio naquela street,
            potSize é o tamanho do pot atual e eff_stack é o effective stack no início da mão.
          </p>
        </div>

        <p>A implicação direta: conforme o SPR cai, o RP_street cai junto. O pré-flop, com SPR máximo, carrega o RP mais alto. O river, com SPR tipicamente 0-2, carrega apenas o RP residual.</p>

        <h3>2.1 Exemplo Numérico</h3>
        <p>Considere um hand em mesa final: OOP com RP de 18%, effective stacks de 40BB, pote inicial de 3BB (SPR ≈ 13).</p>

        <table>
          <thead>
            <tr><th>Street</th><th>SPR Típico</th><th>RP Efetivo</th><th>Impacto no Range</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Pré-Flop</strong></td><td>~13</td><td>Alto (100% do RP base)</td><td>Máxima compressão de range</td></tr>
            <tr><td><strong>Flop</strong></td><td>~4-7</td><td>Médio (~50-65%)</td><td>Compressão moderada</td></tr>
            <tr><td><strong>Turn</strong></td><td>~2-3</td><td>Baixo (~20-35%)</td><td>Compressão leve</td></tr>
            <tr><td><strong>River</strong></td><td>~0-1</td><td>Residual (~5-15%)</td><td>Quase ChipEV puro</td></tr>
          </tbody>
        </table>

        <p>A conclusão operacional é contraintuitiva para muitos: <strong>o river de uma mão ICM-sensitiva se joga quase como ChipEV</strong>. O dano real do ICM já foi feito no pré-flop e no flop, quando o SPR ainda carregava pressão.</p>

        <hr className="section-divider" />

        <h2>3. A Não-Linearidade da Diluição</h2>
        <p>O aspecto mais importante do Motor de Diluição é que a dissipação não é linear. Não é que o RP decresce em passos iguais do pré ao river. A curva de dissipação é convexa: a maior queda ocorre entre o pré-flop e o flop.</p>

        <div className="callout callout-secondary">
          <h4 style={{ marginTop: 0 }}>Por Que a Queda É Maior no Flop?</h4>
          <p>No pré-flop, a decisão de chamar ou 3-bet carrega o risco do stack inteiro — SPR máximo. Ao entrar no flop, já há fichas comprometidas no pot. O SPR cai abruptamente, e com ele o RP efetivo.</p>
          <p style={{ margin: 0 }}>Resultado: a street onde o ICM mais pesa <em>e menos é considerado</em> pelos jogadores é o flop. As apostas de c-bet e as chamadas de flop estão se tomando sob RP significativo que muitos ignoram.</p>
        </div>

        <h3>3.1 O Erro Sistemático</h3>
        <p>O erro mais comum é inverter a atenção: jogadores ICM-conscientes focam no pré-flop (correto) mas relaxam no flop (errado) e ficam ansiosos no river (desnecessário).</p>
        <p>O river de uma mão com SPR 0.5 é matematicamente semelhante a uma decisão de ChipEV. O flop com SPR 6 ainda carrega ~50% do RP original. A hierarquia de atenção deveria acompanhar a hierarquia de RP — que é decrescente com o SPR, não com a street em si.</p>

        <hr className="section-divider" />

        <h2>4. Implicações para o Jogo</h2>

        <h3>4.1 C-Bet de Flop em Mesa Final</h3>
        <p>A c-bet no flop é a street mais subestimada do ICM. Com SPR típico de 4-7, o OOP ainda carrega RP substancial. Uma c-bet de valor ou semiblefe no flop <em>convida</em> o OOP a arriscar equity real. O IP, sabendo disso, pode explorar com mais frequência de chamada — o OOP não consegue barrelar sem custo.</p>

        <h3>4.2 Turn como Ponto de Transição</h3>
        <p>O turn é o ponto onde o SPR entra na zona crítica de 2-3. Aqui, a decisão de barreling determina se a mão vai ser resolvida sob pressão ICM real (se houver stack suficiente para o river) ou se o river será quasi-ChipEV.</p>

        <h3>4.3 River: Quase Livre</h3>
        <p>Com SPR de 0-1, a pressão ICM é residual. A decisão de bet/fold no river é dominada pela equidade pura e pela frequência de defesa mínima — não pelo Risk Premium. Isso implica que blefar no river em mesa final <em>não é necessariamente errado</em> por razões ICM; é uma decisão primariamente de ChipEV que o RP residual ajusta marginalmente.</p>

        <table>
          <thead>
            <tr><th>Street</th><th>Driver Principal da Decisão</th><th>Erro Típico</th></tr>
          </thead>
          <tbody>
            <tr><td>Pré-Flop</td><td>ICM + Range Construction</td><td>Chamar muito amplo vs. all-ins</td></tr>
            <tr><td>Flop</td><td>ICM + Equity Realização</td><td>Ignorar RP residual ainda alto</td></tr>
            <tr><td>Turn</td><td>Transição ICM → ChipEV</td><td>Super-foldar sem necessidade matemática</td></tr>
            <tr><td>River</td><td>ChipEV + RP Residual Leve</td><td>Foldar por "medo ICM" onde não existe</td></tr>
          </tbody>
        </table>

        <hr className="section-divider" />

        <h2>5. O SPR Pipeline no Simulador</h2>
        <p>O Simulador ICM do PokerRacional implementa o Motor de Diluição visualmente através do componente <strong>SPR Pipeline</strong>: uma barra progressiva que mostra a dissipação do RP por street em tempo real, conforme os parâmetros do cenário são ajustados.</p>
        <p>O pipeline torna visível o que o modelo matemático descreve: a curva de queda convexa, a street de transição crítica, e o ponto onde a decisão deixa de ser dominada pelo ICM.</p>

        <div className="callout callout-emerald">
          <h4 style={{ marginTop: 0 }}>Regra Operacional</h4>
          <p style={{ margin: 0 }}>Antes de tomar qualquer decisão pós-flop em mesa final, estime mentalmente o SPR atual. Se SPR &gt; 5, você ainda está sob pressão ICM significativa. Se SPR &lt; 2, a decisão é primariamente ChipEV. Ajuste sua threshold de chamada e betting frequency de acordo com essa estimativa — não com o número da street.</p>
        </div>

        <hr className="section-divider" />

        <h2>6. Conclusão</h2>
        <p>O ICM não é um interruptor binário ligado/desligado. É uma pressão que varia continuamente com o SPR. Compreender o Motor de Diluição significa entender <em>onde</em> o ICM realmente pesa — e liberar-se do medo ICM onde ele não é matematicamente justificado.</p>
        <p>A meta final é jogar cada street com o nível correto de conservadorismo: máximo no pré-flop, decrescente no flop e turn, mínimo no river. Não por intuição — por estrutura matemática.</p>

        <div className="verdict-box">
          <p><strong>Q.E.D.:</strong> O Risk Premium não é uma constante de mesa final — é uma função do SPR. O Motor de Diluição explica por que o river de uma mão ICM-sensitiva frequentemente deve ser jogado como ChipEV, e por que o flop exige mais atenção ICM do que a maioria dos jogadores dá.</p>
        </div>

      </article>

      <nav className="article-nav" style={{ marginTop: '4rem' }}>
        <Link href="/biblioteca/paradoxo-valuation">&larr; Paradoxo do Valuation</Link>
        <Link href="/leitura-icm">Whitepaper ICM &rarr;</Link>
      </nav>

    </main>
  );
}
