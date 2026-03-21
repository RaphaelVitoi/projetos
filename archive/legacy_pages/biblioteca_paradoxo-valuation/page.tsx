/**
 * IDENTITY: O Paradoxo do Valuation no ICM
 * PATH: src/app/biblioteca/paradoxo-valuation/page.tsx
 * ROLE: Artigo técnico sobre a não-linearidade da utilidade de fichas no ICM.
 * BINDING: [layout.tsx, globals.css]
 */

import Link from 'next/link';

export const metadata = {
  title: 'O Paradoxo do Valuation no ICM | Raphael Vitoi',
  description: 'Por que acumular fichas pode diminuir sua esperança matemática em spots específicos da reta final. A não-linearidade da utilidade de chips no ICM.',
};

export default function ParadoxoValuationPage() {
  return (
    <main className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1.5rem' }}>

      <header className="page-header" style={{ paddingBottom: '1rem' }}>
        <p className="page-label">Teoria &bull; ICM &bull; Matemática</p>
        <h1 style={{ background: 'linear-gradient(135deg, #fff 0%, #6366f1 50%, #38bdf8 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, lineHeight: 1.2, marginTop: 0 }}>
          O Paradoxo do Valuation no ICM
        </h1>
        <p className="page-subtitle">Por que acumular fichas pode ser matematicamente contraproducente.</p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>Autor: Raphael Vitoi &bull; 2025 &bull; 12 min</p>
      </header>

      <article>

        <h2>1. A Ilusão da Fichas</h2>
        <p>Todo jogador já ouviu: <em>"Chips são poder."</em> A afirmação é trivialmente verdadeira no ChipEV — mais fichas, mais pressão, mais range de abertura. Mas no ICM, essa intuição se dissolve de forma não óbvia e com consequências sérias para a tomada de decisão.</p>
        <p>O paradoxo central é este: <strong>em determinados spots de mesa final, chamar um all-in com equidade positiva em ChipEV é a decisão matematicamente correta de perder dinheiro.</strong></p>
        <p>Este não é um problema de variance management. É uma propriedade estrutural do modelo ICM — a não-linearidade da conversão entre fichas e equity monetária.</p>

        <div className="callout">
          <h4 style={{ marginTop: 0 }}>Definição: Utilidade Não-Linear de Fichas</h4>
          <p style={{ margin: 0 }}>No ChipEV, a utilidade de uma ficha é constante — cada chip vale a mesma fração do prize pool. No ICM, a utilidade marginal de cada chip <strong>decresce</strong> com o aumento do stack. A centésima ficha que você ganha vale menos que a primeira.</p>
        </div>

        <hr className="section-divider" />

        <h2>2. A Matemática da Não-Linearidade</h2>
        <p>Considere um torneio simplificado: 3 jogadores restantes, payout 60%/30%/10%, cada um com 33% das fichas. A equity ICM de cada jogador é precisamente 33.3% do prize pool — simetria perfeita.</p>
        <p>Agora suponha que o Jogador A ganha um pot e vai para 50% das fichas totais, enquanto B e C ficam com 25% cada. A equity de A <strong>não vai para 50%</strong>.</p>

        <table>
          <thead>
            <tr><th>Stack (%)</th><th>1º Lugar</th><th>2º Lugar</th><th>3º Lugar</th><th>Equity ICM</th></tr>
          </thead>
          <tbody>
            <tr><td>33%</td><td>33.3%</td><td>33.3%</td><td>33.3%</td><td>33.3%</td></tr>
            <tr><td>50%</td><td>50.0%</td><td>28.6%</td><td>21.4%</td><td>~43.8%</td></tr>
            <tr><td>67%</td><td>67.0%</td><td>20.5%</td><td>12.5%</td><td>~52.5%</td></tr>
            <tr><td>90%</td><td>90.0%</td><td>6.7%</td><td>3.3%</td><td>~60.9%</td></tr>
          </tbody>
        </table>

        <p>O Jogador A com 90% das fichas e quase garantia de primeiro lugar possui apenas ~61% da equity monetária total. Dobrar as fichas de 33% para 67% move a equity de 33.3% para 52.5% — um ganho de 19.2 pontos percentuais onde o ChipEV projetaria 33.7.</p>
        <p>Esse é o <strong>teto do efeito</strong>: a utilidade marginal de cada ficha adicional diminui progressivamente. O chip leader carrega mais fichas, mas carrega menos equity por ficha.</p>

        <hr className="section-divider" />

        <h2>3. Onde o Paradoxo se Manifesta</h2>

        <h3>3.1 O Spot da Bolha</h3>
        <p>Imagine 5 jogadores em uma bolha de mesa final (próxima eliminação entra no dinheiro). O short stack vai all-in. Você tem o chip lead e equity de 52% vs a mão dele.</p>

        <div className="callout callout-secondary">
          <h4 style={{ marginTop: 0 }}>ChipEV vs ICMev — O Mesmo Spot</h4>
          <p><strong>ChipEV:</strong> Chamar é +EV. Você ganha fichas mais vezes do que perde.</p>
          <p style={{ margin: 0 }}><strong>ICMev:</strong> Chamar pode ser -EV. O custo de perder as fichas (eliminar-se ou reduzir drasticamente seu stack) supera o ganho de acumular mais. O efeito do payjump para os demais jogadores ao sobreviverem redistribui equity contra você.</p>
        </div>

        <p>Isto é o Risk Premium em ação: o desconto que o ICM aplica sobre chamadas aparentemente vantajosas no ChipEV. O paradoxo do valuation emerge precisamente quando esse desconto se torna maior que o edge de equity.</p>

        <h3>3.2 O Chip Leader como Vítima</h3>
        <p>Paradoxalmente, quem mais paga o custo do paradoxo é o chip leader. Ele tem mais a perder do que a ganhar em cada confronto. Cada ficha que perde reduz equity de forma convexamente custosa; cada ficha que ganha tem utilidade marginal decrescente.</p>
        <p>Resultado: o chip leader deve jogar mais passivo, não por covardia estratégica, mas por pressão matemática do modelo ICM.</p>

        <h3>3.3 A Assimetria IP/OOP</h3>
        <p>Quando o IP (In Position) carrega Risk Premium maior que o OOP (Out of Position) — configuração comum em bolhas multiway — o paradoxo assume outra camada. O jogador com stack mais alto pode ser forçado a defender menos, ceder equity de blefe, e aceitar um range mais condensado.</p>
        <p>Esse é o fenômeno explorado no Simulador ICM: a geometria do risco muda dependendo de quem carrega o RP maior — IP ou OOP.</p>

        <hr className="section-divider" />

        <h2>4. Implicações Práticas</h2>

        <table>
          <thead>
            <tr><th>Situação</th><th>ChipEV sugere</th><th>ICMev corrige para</th></tr>
          </thead>
          <tbody>
            <tr><td>Chip leader chama all-in na bolha</td><td>Chamar com &gt;50% equidade</td><td>Precisar de 55-65%+ dependendo do payjump</td></tr>
            <tr><td>Stack médio vs short stack</td><td>Chamar com &gt;50%</td><td>Geralmente chamar, RP menor</td></tr>
            <tr><td>3 jogadores, prize pool assimétrico</td><td>Acumular sempre</td><td>Às vezes passar equidade para chegar ao heads-up</td></tr>
            <tr><td>Spot de chop implícito</td><td>Ignorar</td><td>Considerar equity de sobrevivência</td></tr>
          </tbody>
        </table>

        <div className="callout callout-emerald">
          <h4 style={{ marginTop: 0 }}>A Regra Operacional</h4>
          <p style={{ margin: 0 }}>Quanto maior o payjump imediato e maior seu stack relativo, maior a threshold de equidade necessária para chamar. O paradoxo do valuation não anula a agressão — ele a <strong>recalibra</strong>. A ferramenta é o simulador ICM, não a intuição de curto prazo.</p>
        </div>

        <hr className="section-divider" />

        <h2>5. Conclusão: Chips Não São Dinheiro</h2>
        <p>A distinção entre fichas e equity monetária não é um detalhe técnico para ser ignorado em situações "claras". É a diferença arquitetônica entre o jogo de ChipEV e o jogo de ICMev.</p>
        <p>O jogador que internaliza o paradoxo do valuation para de buscar fichas e começa a buscar equity. Essa mudança de objetivo — sutil na formulação, radical na execução — é o que separa o vencedor de torneios do acumulador de fichas.</p>

        <div className="verdict-box">
          <p><strong>Q.E.D.:</strong> Acumular fichas é instrumento, não objetivo. A equidade monetária é a função objetivo real. Em qualquer spot onde esses dois vetores divergem, o ICMev vence — e o paradoxo do valuation explica por quê.</p>
        </div>

      </article>

      <nav className="article-nav" style={{ marginTop: '4rem' }}>
        <Link href="/biblioteca">&larr; Biblioteca</Link>
        <Link href="/biblioteca/motor-diluicao">O Motor de Diluição &rarr;</Link>
      </nav>

    </main>
  );
}
