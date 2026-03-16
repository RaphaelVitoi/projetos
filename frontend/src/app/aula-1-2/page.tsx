/**
 * IDENTITY: Aula 1.2 - Aprofundamento ICM Pós-Flop
 * PATH: src/app/aula-1-2/page.tsx
 * ROLE: Material complementar da masterclass. Comparativo ChipEV vs ICMev.
 * BINDING: [layout.tsx, globals.css]
 */

import Link from 'next/link';

export const metadata = {
  title: 'Aula 1.2 | Raphael Vitoi',
  description: 'Aprofundamento ICM Pós-Flop: Risk Premium, Downward Drift e as decisões que separam jogadores medianos de profissionais de elite.',
};

export default function Aula12Page() {
  return (
    <main className="container">
      <section id="hero-aula">
        <h2>Entendendo o ICM e suas Heurísticas</h2>
        <p>
          <strong>
            Aplicando as noções de RP pós-flop: Comparativos entre CHIPEV (GTO Wizard) e ICMev (HRC
            Pós-Flop)
          </strong>
        </p>
      </section>

      <section>
        <article>
          <h3>Introdução: A Divergência Arquitetônica</h3>
          <p>
            As árvores de decisão pré-flop são idênticas em termos de inputs e ranges tanto para o
            HRC quanto para o GTO Wizard. Contudo, existem diferenças significativas em como esses
            sistemas tratam os dados pós-flop.
          </p>

          <div className="callout" style={{ borderLeftColor: 'var(--accent-sky)' }}>
            <h4>Bunching Effect &amp; Contexto de Stacks</h4>
            <ul>
              <li>
                <strong>HRC Pós-Flop:</strong> Leva em conta o Bunching Effect dos jogadores que
                desistiram pré-flop, considerando o impacto dessas cartas no range restante. Analisa
                ambas as stacks dos jogadores em ação, assim como as stacks dos jogadores que já
                desistiram.
              </li>
              <li>
                <strong>GTO Wizard:</strong> Foca apenas no Bunching Effect entre os dois jogadores
                ativos. Baseia-se exclusivamente na stack efetiva entre os jogadores envolvidos.
              </li>
            </ul>
          </div>

          <p>
            Essa diferença é crucial para uma avaliação mais precisa do <strong>ICMev</strong>, já
            que o contexto das stacks restantes pode afetar significativamente as estratégias ideais.
            Nota-se também uma tendência de mais &quot;ruídos&quot; no GTO Wizard, possivelmente
            devido a uma maior distância para o Nash Equilibrium (e-Nash) nas simulações.
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
                <td><strong>Stacks Pós-Flop</strong></td>
                <td>BTN: 38bbs | BB: 53bbs</td>
              </tr>
            </tbody>
          </table>

          <p><strong>Cenário:</strong> BTN opens min-raise, SB folds, BB calls. Pot: 5.63bbs.</p>

          <h3>Análise Comparativa: ChipEV vs. ICMev</h3>

          <h4>1. Defendendo do BB</h4>
          <p>
            No ChipEV, observamos linhas agressivas padrão. No entanto, ao mudar para ICMev, a
            dinâmica se altera.
          </p>

          <div className="callout">
            <p>
              <strong>Observação Crítica (ICMev):</strong> 7% de lead por parte do BB. Pode ser
              ruído ou influência do ICM em favor do BB.
            </p>
          </div>

          <p>
            <strong>IP Action após BB Check:</strong> A frequência mínima de c-bets mais elevadas
            pode estar sendo influenciada por variáveis externas. No entanto, essas estratégias
            estão sendo mixadas, o que indica que o EV entre as opções é equivalente.
          </p>

          <p><strong>O Fenômeno do Downward Drift:</strong> No contexto específico desta FT sob ICM:</p>
          <ul style={{ listStyleType: 'disc', marginLeft: '1rem' }}>
            <li>Aumento substancial na frequência de <strong>Checks</strong>.</li>
            <li>
              Apostas com tamanhos maiores migraram quase completamente para{' '}
              <strong>sizings pequenos</strong>.
            </li>
            <li>
              Essa prática de sizing pequeno é quase inexistente em cenários ChipEV puros.
            </li>
          </ul>

          <h4>2. Linhas de Check-Raise (XR) e Defesa</h4>
          <p>Quando o BB aplica XR contra uma c-bet small do IP:</p>
          <ul>
            <li>
              O IP tende a ser &quot;sticky&quot; (pagar mais) em algumas linhas, mas a seleção de
              mãos muda drasticamente.
            </li>
            <li>
              O BB, ao enfrentar resistência (IP calls), deve ser cauteloso ao barrilar turn e
              river.
            </li>
          </ul>

          <h4>3. Linha de C-bet Call do BB</h4>
          <p>Comparando ChipEV vs ICMev na reação do BB a c-bets:</p>

          <table>
            <thead>
              <tr>
                <th>Situação</th>
                <th>ChipEV</th>
                <th>ICMev</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>IP C-bet Strategy</strong></td>
                <td>Mix de sizings (Small, Medium, Large)</td>
                <td>Predominância de Small Sizing (B20/B33)</td>
              </tr>
              <tr>
                <td><strong>BB Reaction</strong></td>
                <td>Defesa padrão (MDF)</td>
                <td>Defesa ajustada pelo RP (Overfold em certos spots, XR seletivo)</td>
              </tr>
              <tr>
                <td><strong>River Aggression</strong></td>
                <td>Polarizada (Shoves frequentes)</td>
                <td>Contida (Mais check-backs, shoves apenas com nut advantage clara)</td>
              </tr>
            </tbody>
          </table>

          <h3>Conclusões sobre o ICMev</h3>
          <p>
            O aumento significativo na frequência de checks e a preferência por sizings menores em
            comparação com abordagens baseadas em &quot;ChipEV&quot; destacam a influência massiva
            do ICM nas decisões pós-flop.
          </p>

          <blockquote>
            &quot;O entendimento detalhado do ICM, especialmente nas fases críticas de torneios, é
            essencial para maximizar as estratégias e adaptar-se às dinâmicas complexas do
            jogo.&quot;
          </blockquote>

          <h3>Glossário de Cenários Analisados</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px' }}>
              <strong style={{ color: 'var(--accent-primary)' }}>Cenário 12</strong>
              <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Nodelock: IP Action após BB Check</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px' }}>
              <strong style={{ color: 'var(--accent-primary)' }}>Cenário 19</strong>
              <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Nodelock: Obrigando o IP a cbetar sizing baixa</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px' }}>
              <strong style={{ color: 'var(--accent-primary)' }}>Cenário 27</strong>
              <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>Nodelock permitindo somente sizing de 50%</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px' }}>
              <strong style={{ color: 'var(--accent-primary)' }}>Cenário 54</strong>
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
              Testar Cenários no Simulador &rarr;
            </Link>
          </div>
        </article>
      </section>

      <nav className="article-nav">
        <Link href="/aula-icm">&larr; Aula ICM</Link>
        <Link href="/biblioteca">Biblioteca &rarr;</Link>
      </nav>
    </main>
  );
}
