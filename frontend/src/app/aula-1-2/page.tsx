/**
 * IDENTITY: Aula 1.2 - Aprofundamento ICM Pos-Flop
 * PATH: src/app/aula-1-2/page.tsx
 * ROLE: Material complementar da masterclass. Comparativo ChipEV vs ICMev.
 * BINDING: [layout.tsx, globals.css]
 */

import Link from 'next/link';

export const metadata = {
  title: 'Aula 1.2 | Raphael Vitoi',
  description: 'Aprofundamento ICM Pos-Flop: Risk Premium, Downward Drift e as decisoes que separam jogadores medianos de profissionais de elite.',
};

export default function Aula12Page() {
  return (
    <main className="container">
      <section id="hero-aula">
        <h2>Entendendo o ICM e suas Heuristicas</h2>
        <p>
          <strong>
            Aplicando as nocoes de RP pos-flop: Comparativos entre CHIPEV (GTO Wizard) e ICMev (HRC
            Pos-Flop)
          </strong>
        </p>
      </section>

      <section>
        <article>
          <h3>Introducao: A Divergencia Arquitetonica</h3>
          <p>
            As arvores de decisao pre-flop sao identicas em termos de inputs e ranges tanto para o
            HRC quanto para o GTO Wizard. Contudo, existem diferencas significativas em como esses
            sistemas tratam os dados pos-flop.
          </p>

          <div className="callout" style={{ borderLeftColor: 'var(--accent-sky)' }}>
            <h4>Bunching Effect &amp; Contexto de Stacks</h4>
            <ul>
              <li>
                <strong>HRC Pos-Flop:</strong> Leva em conta o Bunching Effect dos jogadores que
                desistiram pre-flop, considerando o impacto dessas cartas no range restante. Analisa
                ambas as stacks dos jogadores em acao, assim como as stacks dos jogadores que ja
                desistiram.
              </li>
              <li>
                <strong>GTO Wizard:</strong> Foca apenas no Bunching Effect entre os dois jogadores
                ativos. Baseia-se exclusivamente na stack efetiva entre os jogadores envolvidos.
              </li>
            </ul>
          </div>

          <p>
            Essa diferenca e crucial para uma avaliacao mais precisa do <strong>ICMev</strong>, ja
            que o contexto das stacks restantes pode afetar significativamente as estrategias ideais.
            Nota-se tambem uma tendencia de mais &quot;ruidos&quot; no GTO Wizard, possivelmente
            devido a uma maior distancia para o Nash Equilibrium (e-Nash) nas simulacoes.
          </p>

          <hr style={{ border: 0, borderTop: '1px solid var(--border-color)', margin: '3rem 0' }} />

          <h3>Setup do Experimento</h3>

          <table>
            <tbody>
              <tr>
                <td><strong>Torneio</strong></td>
                <td>MTT Vanilla $11</td>
              </tr>
              <tr>
                <td><strong>Contexto</strong></td>
                <td>Final Table (9 players), Field 126</td>
              </tr>
              <tr>
                <td><strong>Risk Premium</strong></td>
                <td>
                  <span style={{ color: 'var(--accent-emerald)' }}>BU: 21.4%</span> vs{' '}
                  <span style={{ color: 'var(--accent-secondary)' }}>BB: 12.9%</span>
                </td>
              </tr>
              <tr>
                <td><strong>Risk Advantage</strong></td>
                <td><strong>+8.5%</strong> a favor do BTN (Pode ser mais agressivo)</td>
              </tr>
              <tr>
                <td><strong>Stacks Pos-Flop</strong></td>
                <td>BTN: 38bbs | BB: 53bbs</td>
              </tr>
            </tbody>
          </table>

          <p><strong>Cenario:</strong> BTN opens min-raise, SB folds, BB calls. Pot: 5.63bbs.</p>

          <h3>Analise Comparativa: ChipEV vs. ICMev</h3>

          <h4>1. Defendendo do BB</h4>
          <p>
            No ChipEV, observamos linhas agressivas padrao. No entanto, ao mudar para ICMev, a
            dinamica se altera.
          </p>

          <div className="callout">
            <p>
              <strong>Observacao Critica (ICMev):</strong> 7% de lead por parte do BB. Pode ser
              ruido ou influencia do ICM em favor do BB.
            </p>
          </div>

          <p>
            <strong>IP Action apos BB Check:</strong> A frequencia minima de c-bets mais elevadas
            pode estar sendo influenciada por variaveis externas. No entanto, essas estrategias
            estao sendo mixadas, o que indica que o EV entre as opcoes e equivalente.
          </p>

          <p><strong>O Fenomeno do Downward Drift:</strong> No contexto especifico desta FT sob ICM:</p>
          <ul style={{ listStyleType: 'disc', marginLeft: '1rem' }}>
            <li>Aumento substancial na frequencia de <strong>Checks</strong>.</li>
            <li>
              Apostas com tamanhos maiores migraram quase completamente para{' '}
              <strong>sizings pequenos</strong>.
            </li>
            <li>
              Essa pratica de sizing pequeno e quase inexistente em cenarios ChipEV puros.
            </li>
          </ul>

          <h4>2. Linhas de Check-Raise (XR) e Defesa</h4>
          <p>Quando o BB aplica XR contra uma c-bet small do IP:</p>
          <ul>
            <li>
              O IP tende a ser &quot;sticky&quot; (pagar mais) em algumas linhas, mas a selecao de
              maos muda drasticamente.
            </li>
            <li>
              O BB, ao enfrentar resistencia (IP calls), deve ser cauteloso ao barrilar turn e
              river.
            </li>
          </ul>

          <h4>3. Linha de C-bet Call do BB</h4>
          <p>Comparando ChipEV vs ICMev na reacao do BB a c-bets:</p>

          <table>
            <thead>
              <tr>
                <th>Situacao</th>
                <th>ChipEV</th>
                <th>ICMev</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>IP C-bet Strategy</strong></td>
                <td>Mix de sizings (Small, Medium, Large)</td>
                <td>Predominancia de Small Sizing (B20/B33)</td>
              </tr>
              <tr>
                <td><strong>BB Reaction</strong></td>
                <td>Defesa padrao (MDF)</td>
                <td>Defesa ajustada pelo RP (Overfold em certos spots, XR seletivo)</td>
              </tr>
              <tr>
                <td><strong>River Aggression</strong></td>
                <td>Polarizada (Shoves frequentes)</td>
                <td>Contida (Mais check-backs, shoves apenas com nut advantage clara)</td>
              </tr>
            </tbody>
          </table>

          <h3>Conclusoes sobre o ICMev</h3>
          <p>
            O aumento significativo na frequencia de checks e a preferencia por sizings menores em
            comparacao com abordagens baseadas em &quot;ChipEV&quot; destacam a influencia massiva
            do ICM nas decisoes pos-flop.
          </p>

          <blockquote>
            &quot;O entendimento detalhado do ICM, especialmente nas fases criticas de torneios, e
            essencial para maximizar as estrategias e adaptar-se as dinamicas complexas do
            jogo.&quot;
          </blockquote>

          <h3>Glossario de Cenarios Analisados</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px' }}>
              <strong style={{ color: 'var(--accent-primary)' }}>Cenario 12</strong>
              <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Nodelock: IP Action apos BB Check</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px' }}>
              <strong style={{ color: 'var(--accent-primary)' }}>Cenario 19</strong>
              <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Nodelock: Obrigando o IP a cbetar sizing baixa</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px' }}>
              <strong style={{ color: 'var(--accent-primary)' }}>Cenario 27</strong>
              <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Nodelock permitindo somente sizing de 50%</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px' }}>
              <strong style={{ color: 'var(--accent-primary)' }}>Cenario 54</strong>
              <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Obrigando o IP a ter somente B20</p>
            </div>
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Link
              href="/aula-icm#simulador-section"
              className="card-cta"
              style={{
                border: '1px solid var(--accent-primary)',
                padding: '1rem 2rem',
                borderRadius: '8px',
              }}
            >
              Testar Cenarios no Simulador &rarr;
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
