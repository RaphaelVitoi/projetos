/**
 * IDENTITY: Psicologia High Stakes - Artigo Completo
 * PATH: src/app/psicologia-hs/page.tsx
 * ROLE: Artigo academico completo portado do legado psicologia-hs.html.
 * BINDING: [layout.tsx, globals.css]
 */

import Link from 'next/link';

export const metadata = {
  title: 'Psicologia High Stakes | Raphael Vitoi',
  description: 'Protocolo de Analise Psicologica para Mesas Finais de Poker. Fenomenologia da incerteza e tomada de decisao sob pressao ICM.',
};

export default function PsicologiaHSPage() {
  return (
    <main className="container" style={{ padding: '4rem 0' }}>
      <section id="hero-aula">
        <h2>Psicologia High Stakes</h2>
        <p><strong>Analisando o Protocolo de Analise Textual de Poker Complexo.</strong></p>
      </section>

      <section>
        <article>
          <span style={{ display: 'block', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-primary)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>Protocolo de Analise Textual Complexa</span>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginTop: 0 }}>A Fenomenologia da Incerteza e a Transubstanciacao do Valor</h2>
          <p style={{ textAlign: 'center', fontStyle: 'italic', opacity: 0.8, marginBottom: '3rem' }}>Uma Exegese Critica das Heuristicas de ICM e da Arquitetura de Solvers em Ambientes de Informacao Imperfeita</p>

          <p>A ontogenese da estrategia contemporanea no ambito dos torneios de poker multimesas (MTT) nao pode ser dissociada de uma reavaliacao radical da teleologia do risco, onde o valor nominal das fichas e subsumido por uma metrica de valor monetario extrinseco, definida pelo Independent Chip Model (ICM). Esta analise propoe uma investigacao hermeneutica das estruturas de decisao pos-flop, contrastando as implementacoes algoritmicas do GTO Wizard e do Hold&apos;em Resources Calculator (HRC).</p>

          <h3>A Divergencia Arquitetonica: GTO Wizard vs HRC</h3>
          <p>A avaliacao das arvores de decisao pos-flop revela uma dicotomia fundamental. O sistema HRC pos-flop executa uma analise recursiva que incorpora o impacto das cartas descartadas pelos jogadores que desistiram pre-flop (&quot;Bunching Effect&quot;). O GTO Wizard restringe a analise apenas aos dois competidores envolvidos.</p>

          <table>
            <thead><tr><th>Variavel Analitica</th><th>GTO Wizard (ChipEV)</th><th>HRC (ICMev)</th><th>Implicacao</th></tr></thead>
            <tbody>
              <tr><td><strong>Bunching Effect</strong></td><td>Restrito aos ativos</td><td>Inclui ranges foldados</td><td>Recalibracao da densidade de cartas.</td></tr>
              <tr><td><strong>Analise de Stacks</strong></td><td>Stack efetiva</td><td>Global (ativos e inativos)</td><td>Precisao na avaliacao do prizepool.</td></tr>
              <tr><td><strong>Precisao (-Nash)</strong></td><td>Distancia variavel</td><td>Geralmente menor e mais preciso</td><td>Maior confiabilidade operacional.</td></tr>
              <tr><td><strong>Heuristica Pos-Flop</strong></td><td>Equidade bruta</td><td>Premio de risco (RP)</td><td>Adaptacao ao contexto de Mesa Final.</td></tr>
            </tbody>
          </table>

          <h3>A Ontologia do Risk Premium e o &quot;Teto do RP&quot;</h3>
          <p>O Risk Premium (RP) funciona como uma taxa de cambio entre fichas e dinheiro real. O <strong>&quot;Teto do RP&quot;</strong> define o limite superior de defesa onde, independentemente da frequencia de blefes do agressor, o defensor e impedido de realizar sua equidade devido ao risco existencial.</p>

          <div className="callout">
            <h4 style={{ marginTop: 0 }}>Dialetica dos Toy Games</h4>
            <p><strong>Toy Game 1 (ChipEV):</strong> O jogador OOP (KK) paga 50% das vezes para neutralizar os blefes.</p>
            <p style={{ marginBottom: 0 }}><strong>Toy Game 3-5 (Desproporcao de Risco):</strong> Conforme o RP do OOP escala ate 24%, o IP pode ter mais combinacoes de blefe do que de valor (8 vs 6), e ainda assim o OOP e forcado a desistir.</p>
          </div>

          <h3>Impacto da Inscricao Tardia (Late Reg)</h3>
          <table>
            <thead><tr><th>Momento do Registro</th><th>Stack Inicial</th><th>Buy-in Efetivo</th><th>Valor ICM</th><th>Incremento</th></tr></thead>
            <tbody>
              <tr><td>Inicio do Torneio</td><td>25,000</td><td>$500</td><td>$500.00</td><td className="numeric">0.0%</td></tr>
              <tr><td>Fim do Registro (Online)</td><td>25,000</td><td>$500</td><td>$581.00</td><td className="numeric" style={{ color: 'var(--accent-emerald)' }}>+16.2%</td></tr>
              <tr><td>Inicio do Dia 2 (Live)</td><td>25,000</td><td>$4,650</td><td>$5,117.00</td><td className="numeric" style={{ color: 'var(--accent-emerald)' }}>+10.0%</td></tr>
            </tbody>
          </table>

          <h3>A Pedagogia &quot;Homem Bomba&quot;</h3>
          <p>A abordagem de Raphael Vitoi caracteriza-se por uma fusao disruptiva entre GTO e psicologia analitica. A obra &quot;Homem Bomba&quot; utiliza a metafora da bomba para descrever o excesso de &quot;gozo&quot; (jouissance) lacaniano. A metodologia propoe a substituicao da intuicao cega pela <strong>&quot;Antevisao&quot;</strong>, uma preparacao estrategica baseada em dados massivos (MDA).</p>

          <h3>Redes Neurais vs. Arvores de Decisao</h3>
          <table>
            <thead><tr><th>Modelo</th><th>Vantagem</th><th>Desvantagem</th><th>Precisao</th></tr></thead>
            <tbody>
              <tr><td><strong>Arvores de Decisao</strong></td><td>Treinamento rapido; Interpretabilidade</td><td>Dificuldade com variaveis continuas</td><td>63.6% - 66.7%</td></tr>
              <tr><td><strong>Redes Neurais</strong></td><td>Captura padroes nao lineares</td><td>&quot;Caixa Preta&quot;; Treino lento</td><td>Superior</td></tr>
              <tr><td><strong>CFR (Auto-play)</strong></td><td>Equilibrio de Nash teorico</td><td>Computacionalmente caro</td><td>Maxima</td></tr>
            </tbody>
          </table>

          <h3>Heuristicas de Defesa: BTN vs BB em Mesas Finais</h3>
          <table>
            <thead><tr><th>Textura do Flop</th><th>Freq. BTN (Cobrindo)</th><th>Freq. BTN (Coberto)</th><th>Sizing</th></tr></thead>
            <tbody>
              <tr><td>Broadway / Paired High</td><td style={{ color: 'var(--accent-emerald)' }}>Alta (~70%)</td><td style={{ color: 'var(--accent-sky)' }}>Moderada (~66%)</td><td>Small</td></tr>
              <tr><td>Monotone / Low</td><td style={{ color: 'var(--accent-secondary)' }}>Baixa</td><td style={{ color: 'var(--accent-secondary)' }}>Baixa</td><td>Small</td></tr>
            </tbody>
          </table>

          <h3>Sintese Final</h3>
          <p>A maestria no jogo reside na harmonia entre a frieza do codigo binario dos solvers e a profundidade da reflexao humana sobre o risco, a perda e o valor. O ICM atua como a lei gravitacional que curva a trajetoria das estrategias.</p>

          <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <strong>Referencias:</strong> Chen &amp; Ankenman (The Mathematics of Poker), GTO Wizard Blog, HRC Simulations, Raphael Vitoi (Homem Bomba).
          </div>
        </article>
      </section>
    </main>
  );
}
