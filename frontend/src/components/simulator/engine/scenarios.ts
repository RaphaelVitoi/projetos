/**
 * IDENTITY: Base de Dados dos Cenários Clínicos de ICM
 * PATH: src/components/simulator/engine/scenarios.ts
 * ROLE: Fonte de verdade para todos os 9 cenários do Simulador Mestre.
 * BINDING: [engine/types.ts]
 *
 * NOTA sobre sprData (rpValue por street):
 *   Valores ilustrativos com direção correta (RP sempre decresce por street).
 *   RP pós-flop não é quantificável com precisão sem variáveis adicionais
 *   (range atual, board, histórico de ação, stacks dinâmicas). Use como
 *   referência direcional, não como dado exato.
 *
 * NOTA sobre prizes (estrutura de premios da FT):
 *   Calibrados contra torneio HRC real: 126 jogadores, 378k chips, 23 pagos.
 *   FT prizes: 1st=237.34, 2nd=170.96, 3rd=135.17, 4th=109.99, ..., 9th=36.47
 *   TOTAL_POOL = 1234.80. Cada cenario usa o subconjunto correto para N jogadores restantes.
 *
 * NOTA sobre defaultStreetFreqs:
 *   Cenário "paradoxo": valores de flop calibrados pelos 93 nodes HRC vs GTO Wizard (Aula 1.2).
 *   Turn e river: estimativas didáticas com direção correta (RP decresce, big-bet sizing cresce).
 *   Demais cenários: estimativas didáticas — substitua pelos dados do seu solver.
 */

import type { Scenario } from './types';

export const SCENARIOS: Scenario[] = [
  // ============================================================
  // CLINICAL (5): paradoxo, pacto, batata, agonia, lama
  // ============================================================
  {
    id: 'paradoxo',
    name: 'Paradoxo do Valuation',
    category: 'clinical',
    stacks: [40, 55],
    prizes: [237.34, 170.96],
    ipRp: 21.4,
    oopRp: 12.9,
    ipPos: 'BTN',
    ipMorph: 'Valor Estrito',
    oopPos: 'BB (CL)',
    oopMorph: 'Condensado',
    verdict: 'Agressão Estrangulada',
    narrativeTitle: 'O Instinto Traído pela Matemática',
    narrativeSubtitle: 'Mid vs Big Stack',
    icon: 'fa-scale-unbalanced',
    color: 'rose',
    theory: `
      <h3 class="text-white font-bold text-xl mb-4 tracking-tight">O Instinto Traído pela Matemática</h3>
      <p class="text-slate-300 leading-relaxed mb-4 text-[15px]">O senso comum dita que o BTN com 40bb possui conforto suficiente para oprimir a mesa. Contudo, o HRC revela o pesadelo: o "RP de ida" do BTN é quase o dobro do "RP de volta" do BB.</p>
      <p class="text-slate-300 leading-relaxed mb-6 text-[15px]"><strong>Porquê?</strong> O BB sobrevive a um <em>all-in</em>. Já o BTN, se errar um <em>hero-bluff</em>, é aniquilado para o pó absoluto, perdendo instantaneamente o <em>laddering</em> contra todos os <em>shorts</em> da mesa. A capacidade do BTN de blefar é <strong>estrangulada</strong> pela necessidade da Esperança Matemática.</p>
    `,
    exploit: [
      'Puxar o Freio de Mão: Contraia severamente os seus bluffs. Aceite que a equidade natural exigida para engajar num pote deste calibre é altíssima.',
      'Capitalize o thin value: Hero-bluffs são proibidos pelo seu RP, mas thin value bets funcionam — o BB ainda defende 82.9% do range vs BTN, garantindo pagamento em mãos médias e fortes.',
      'Explore o ΔRP+8.5% invertido: O BTN tem MAIS RP que o BB — fenômeno do paradoxo. O OOP sabe disso. Hands em que o BTN representa valor polarizado são mais credivelmente defendidas pelo BB.',
    ],
    // RP residual por street: ilustrativo, decrescente. Não quantificável com precisão.
    sprData: [
      { name: 'PRE',   potSize: 2.5,  rpValue: 12.9 },
      { name: 'FLOP',  potSize: 7.5,  rpValue: 10.4 },
      { name: 'TURN',  potSize: 22.5, rpValue: 5.8 },
      { name: 'RIVER', potSize: 40,   rpValue: 2.6 },
    ],
    // Flop calibrado pelos 93 nodes HRC vs GTO Wizard (Aula 1.2, board KJT-2-3)
    // Turn e river: estimativas didáticas — big-bet cresce à medida que RP dissipa
    defaultStreetFreqs: {
      flop: {
        ip_check:     2,
        ip_bet_small: 65,
        ip_bet_large: 33,
        oop_call:     45,
        oop_fold:     40,
        oop_raise:    15,
      },
      turn: {
        ip_check:     20,
        ip_bet_small: 45,
        ip_bet_large: 35,
        oop_call:     55,
        oop_fold:     35,
        oop_raise:    10,
      },
      river: {
        ip_check:     35,
        ip_bet_small: 10,
        ip_bet_large: 55,
        oop_call:     65,
        oop_fold:     28,
        oop_raise:    7,
      },
    },
    quiz: {
      question: 'Por que o BTN (40bb), tendo uma stack gigante, sofre uma punição utilitária (RP) muito maior que o BB (55bb)?',
      options: [
        { id: 'A', text: 'Porque perder o all-in destrói o BTN, retirando sua alavancagem e garantias de payjump. O BB, porém, sobrevive ao golpe.', isCorrect: true },
        { id: 'B', text: 'Porque estar em posição (IP) gera uma penalidade padrão no solver para compensar a realização de equidade pós-flop.', isCorrect: false },
        { id: 'C', text: 'A premissa está errada. O BTN tem um RP menor porque ele domina o range do BB.', isCorrect: false },
      ],
      explanation: 'A Assimetria de Dor: O BTN põe em risco a sua sobrevivência. O BB arrisca apenas a liderança.',
    },
  },
  {
    id: 'pacto',
    name: 'Pacto Silencioso',
    category: 'clinical',
    stacks: [65, 70],
    prizes: [237.34, 170.96],
    ipRp: 24.5,
    oopRp: 23.5,
    ipPos: 'Vice CL',
    ipMorph: 'Especulativo',
    oopPos: 'CL',
    oopMorph: 'Flat Call Massivo',
    verdict: 'Evitação de Ruína',
    narrativeTitle: 'A Mútua Destruição Assegurada',
    narrativeSubtitle: 'Colisão de Gigantes',
    icon: 'fa-handshake',
    color: 'indigo',
    theory: `
      <h3 class="text-white font-bold text-xl mb-4 tracking-tight">A Mútua Destruição Assegurada</h3>
      <p class="text-slate-300 leading-relaxed mb-4 text-[15px]">Dois gigantes colidem. É essencial notar que esta dinâmica ocorre <strong>quase estritamente entre os dois CLs ou duas stacks grandes e similares</strong>. A destruição mútua é o pior cenário possível. As fichas perdidas viram <em>payjumps</em> grátis aos inativos.</p>
      <p class="text-slate-300 leading-relaxed mb-6 text-[15px]">Ocorre um <strong>Pacto Silencioso</strong>. A agressão letal (3-bet) colapsa. Os <em>ranges</em> de <em>flat call</em> inflam absurdamente, incluindo o topo. O objetivo é avaliar <em>implied odds</em> no pós-flop sem o risco de um suicídio pré-flop.</p>
    `,
    exploit: [
      'Negação de Ação Barata: Jogue impiedosamente polarizado. Negue a ele o showdown pacífico pós-agressão. Se for para o chão, vá com o topo.',
      'Aproveite os implied odds do flat call: Se o range de flat inflou massivamente, entre com mãos especulativas (suited connectors, PPs médios) para realizar equity pós-flop com potencial de monsterizar.',
      'Foque a agressão nos shorts, não no igual: A destruição mútua não serve a nenhum dos dois grandes. Isole os curtos sempre que possível — isso é EV positivo sem o risco existencial.',
    ],
    // RP residual por street: ilustrativo, decrescente. Não quantificável com precisão.
    sprData: [
      { name: 'PRE',   potSize: 2.5,  rpValue: 23.5 },
      { name: 'FLOP',  potSize: 8,    rpValue: 22 },
      { name: 'TURN',  potSize: 24,   rpValue: 14.7 },
      { name: 'RIVER', potSize: 65,   rpValue: 11.8 },
    ],
    // Estimativa didática — dois big stacks se enfrentando, ChipEV equilibrado
    // Turn e river: sizing polarizado cresce à medida que RP dissipa
    defaultStreetFreqs: {
      flop: {
        ip_check:     35,
        ip_bet_small: 40,
        ip_bet_large: 25,
        oop_call:     50,
        oop_fold:     35,
        oop_raise:    15,
      },
      turn: {
        ip_check:     25,
        ip_bet_small: 35,
        ip_bet_large: 40,
        oop_call:     55,
        oop_fold:     33,
        oop_raise:    12,
      },
      river: {
        ip_check:     20,
        ip_bet_small: 10,
        ip_bet_large: 70,
        oop_call:     65,
        oop_fold:     28,
        oop_raise:    7,
      },
    },
    quiz: {
      question: 'Como as frequências reconfiguram o jogo pré-flop num "Pacto Silencioso"?',
      options: [
        { id: 'A', text: 'A 3-bet encolhe a um mínimo polarizado, e o flat call infla massivamente para especular sem explodir o SPR.', isCorrect: true },
        { id: 'B', text: 'Eles entram em modo push/fold agressivo para submeter psicologicamente a mesa.', isCorrect: false },
        { id: 'C', text: 'Eles foldam quase 100% das mãos um contra o outro.', isCorrect: false },
      ],
      explanation: 'O choque direto aniquila a Esperança Matemática. Transfere-se a decisão para o pós-flop onde o risco inicial é menor.',
    },
  },
  {
    id: 'batata',
    name: 'Efeito Batata Quente',
    category: 'clinical',
    stacks: [25, 20],
    prizes: [237.34, 170.96],
    ipRp: 15,
    oopRp: 19.5,
    ipPos: 'UTG',
    ipMorph: 'Polar Máximo',
    oopPos: 'BB (Call)',
    oopMorph: 'Bluffcatcher',
    verdict: 'Transferência de Fardo',
    narrativeTitle: 'O Peso de Agir Primeiro',
    narrativeSubtitle: 'A Dinâmica do Shove',
    icon: 'fa-fire-flame-curved',
    color: 'amber',
    theory: `
      <h3 class="text-white font-bold text-xl mb-4 tracking-tight">O Peso de Agir Primeiro</h3>
      <p class="text-slate-300 leading-relaxed mb-4 text-[15px]">Quando o UTG faz um <em>open-shove</em> direto, ele altera organicamente a utilidade da mão. Ele atirou a "Batata Quente" do ICM para o colo da mesa.</p>
      <p class="text-slate-300 leading-relaxed mb-6 text-[15px]">O agressor não só impõe o seu Risk Premium, como acopla a ele a <strong>Fold Equity</strong>. O BB já não tem como "devolver" essa pressão (re-shovar). Com um <em>range</em> defensivo condensado, o BB atinge o seu limite de dor e é forçado a um <em>overfold</em> drástico.</p>
    `,
    exploit: [
      'Expandir Zonas de Shove: Contra adversários aterrorizados pela bolha, alargue os shoves (aumente o Alpha) nos spots onde a transferência da pressão é letal para eles.',
      'Calibre o shove range pelo Alpha real: Alpha = (fold_equity) / (1 + fold_equity). Com o BB paralisado pelo RP e shorts na mesa, o fold_equity sobe — expanda o shove range até o threshold matemático exato.',
      'Identifique os aliados passivos: Quanto mais micro-stacks inativos no pote, maior o EV do fold do BB. Cada short fora do pote aumenta o valor do laddering e comprime ainda mais o call range do BB.',
    ],
    // RP residual por street: ilustrativo, decrescente. Não quantificável com precisão.
    sprData: [
      { name: 'PRE',   potSize: 2.5,  rpValue: 19.5 },
      { name: 'FLOP',  potSize: 7,    rpValue: 13 },
      { name: 'TURN',  potSize: 14,   rpValue: 5.5 },
      { name: 'RIVER', potSize: 20,   rpValue: 1.9 },
    ],
    // Estimativa didática — spot de shove/call, decisão binária pré-flop
    // Pós-flop: all-in polar mantido em todas as streets
    defaultStreetFreqs: {
      flop: {
        ip_check:     0,
        ip_bet_small: 0,
        ip_bet_large: 100,
        oop_call:     40,
        oop_fold:     60,
        oop_raise:    0,
      },
      turn: {
        ip_check:     0,
        ip_bet_small: 0,
        ip_bet_large: 100,
        oop_call:     42,
        oop_fold:     58,
        oop_raise:    0,
      },
      river: {
        ip_check:     0,
        ip_bet_small: 0,
        ip_bet_large: 100,
        oop_call:     45,
        oop_fold:     55,
        oop_raise:    0,
      },
    },
    quiz: {
      question: 'O que caracteriza o "Efeito Batata Quente" na aplicação de um shove em ICM?',
      options: [
        { id: 'A', text: 'O agressor impõe o seu RP somado à Fold Equity, removendo do defensor a capacidade de reagir e forçando a dor letal de um call definitivo.', isCorrect: true },
        { id: 'B', text: 'É a situação em que os blinds rodam muito rápido na mesa, forçando a ação.', isCorrect: false },
        { id: 'C', text: 'Ocorre quando o pote sofre re-shoves múltiplos, ignorando as odds.', isCorrect: false },
      ],
      explanation: 'O agressor transfere a totalidade do fardo da decisão para o oponente, negando a realização de equidade pós-flop.',
    },
  },
  {
    id: 'agonia',
    name: 'Agonia do Bluffcatcher',
    category: 'clinical',
    stacks: [80, 30],
    prizes: [237.34, 170.96],
    ipRp: 4.5,
    oopRp: 22,
    ipPos: 'CL',
    ipMorph: 'Polar Extremo',
    oopPos: 'Mid (Call)',
    oopMorph: 'Condensado Extremo',
    verdict: 'MDF Quebrado',
    narrativeTitle: 'O Colapso do MDF',
    narrativeSubtitle: 'Condensado vs Polar',
    icon: 'fa-heart-crack',
    color: 'sky',
    theory: `
      <h3 class="text-white font-bold text-xl mb-4 tracking-tight">O Colapso do MDF</h3>
      <p class="text-slate-300 leading-relaxed mb-4 text-[15px]">A ilusão do MDF (Minimum Defense Frequency) morre aqui. O CL faz uma aposta Pot-Size. O Mid-stack tem um <em>bluffcatcher</em> puro. Em ChipEV, defenderia metade das vezes.</p>
      <p class="text-slate-300 leading-relaxed mb-6 text-[15px]">No ICM, um range estritamente condensado contra um range polar com <strong>Vantagem de Risco</strong> gera dissipação de equidade absurda. A pressão de 22% obriga o Mid a "quebrar" a matemática e foldar mãos médias mecanicamente (Teto do RP).</p>
    `,
    exploit: [
      'Overbluff Sistemático: Sabendo que o bluffcatcher não suporta o peso financeiro da eliminação contínua nas streets, expanda os bluffs e aplique triple barrels levianos.',
      'Triple barrel como default estrutural: O Mid não consegue defender no Turn porque o RP permanece alto até lá. Aplique pressão contínua em todas as streets — o fold matemático do Mid é estrutural, não situacional.',
      'Polarize ao extremo para quebrar o bluffcatcher: Range condensado perde equity contra polar. Bet grande ou check — elimine os sizings médios que dão ao Mid odds aceitáveis para continuar.',
    ],
    // RP residual por street: ilustrativo, decrescente. Não quantificável com precisão.
    sprData: [
      { name: 'PRE',   potSize: 2.5,  rpValue: 22 },
      { name: 'FLOP',  potSize: 8,    rpValue: 16.4 },
      { name: 'TURN',  potSize: 24,   rpValue: 5.3 },
      { name: 'RIVER', potSize: 30,   rpValue: 2.2 },
    ],
    // Estimativa didática — CL betting polar, OOP condensado como bluffcatcher
    // Turn e river: triple barrel cresce; defensor encolhe conforme RP dissipa
    defaultStreetFreqs: {
      flop: {
        ip_check:     20,
        ip_bet_small: 30,
        ip_bet_large: 50,
        oop_call:     50,
        oop_fold:     40,
        oop_raise:    10,
      },
      turn: {
        ip_check:     15,
        ip_bet_small: 20,
        ip_bet_large: 65,
        oop_call:     60,
        oop_fold:     33,
        oop_raise:    7,
      },
      river: {
        ip_check:     10,
        ip_bet_small: 5,
        ip_bet_large: 85,
        oop_call:     72,
        oop_fold:     22,
        oop_raise:    6,
      },
    },
    quiz: {
      question: 'Por que o jogador com alto RP não consegue defender a sua porção de MDF teórica num post-flop contra o CL?',
      options: [
        { id: 'A', text: 'Porque um range condensado (mãos médias) não consegue reter equidade suficiente ao longo das streets para cobrir o altíssimo custo (RP) de eliminação.', isCorrect: true },
        { id: 'B', text: 'Porque os bluffcatchers perdem equidade bruta nas mesas finais.', isCorrect: false },
        { id: 'C', text: 'Porque o agressor sempre terá a melhor mão no longo prazo em dinâmicas de ICM.', isCorrect: false },
      ],
      explanation: 'A relação de recompensa não fecha. A dor financeira suplanta largamente o lucro teórico de apanhar o blefe.',
    },
  },
  {
    id: 'lama',
    name: 'Guerra na Lama',
    category: 'clinical',
    stacks: [12, 10],
    prizes: [237.34, 170.96],
    ipRp: 8.5,
    oopRp: 7.5,
    ipPos: 'Micro',
    ipMorph: 'Push Estendido',
    oopPos: 'Micro',
    oopMorph: 'Call Seletivo',
    verdict: 'Fome de Laddering',
    narrativeTitle: 'O Minitorneio de Sobrevivência',
    narrativeSubtitle: 'Micro vs Micro (Laddering)',
    icon: 'fa-person-falling-burst',
    color: 'emerald',
    theory: `
      <h3 class="text-white font-bold text-xl mb-4 tracking-tight">O Minitorneio de Sobrevivência</h3>
      <p class="text-slate-300 leading-relaxed mb-4 text-[15px]">Com gigantes monopolizando as fichas, os <em>shorts</em> jogam na lama. A probabilidade matemática de qualquer um deles cravar o torneio é nula.</p>
      <p class="text-slate-300 leading-relaxed mb-6 text-[15px]">O instinto grita "ChipEV puro!". Falso. A abundância de outros shorts eleva drasticamente o <strong>EV do Fold</strong>. Cruzar os braços garante <em>laddering</em> à medida que os outros caem. A sobrevida passiva vale dólares, exigindo um prêmio de risco moderado (~8%) para justificar a abdicação dessa garantia.</p>
    `,
    exploit: [
      'Aumente a Variância: Se o vilão sofre de aversão cega ao risco para garantir um payjump (overfold), a matemática exige que você roube os blinds para construir uma base para o pódio real.',
      'Spy o payjump disponível: Conte os shorts abaixo de você. Cada um vale um payjump virtual garantido pela passividade. Decida se o EV de sobreviver supera o EV de acumular antes de engajar.',
      'Calibre o shove range pelo RP real: Com RP ~8%, o Alpha exigido sobe apenas modestamente vs ChipEV. Shoves com mãos de 35-40% equity contra o alvo certo são lucrativos — não super-fold.',
    ],
    // RP residual por street: ilustrativo, decrescente. Não quantificável com precisão.
    sprData: [
      { name: 'PRE',   potSize: 2.5,  rpValue: 7.5 },
      { name: 'FLOP',  potSize: 6,    rpValue: 4.5 },
      { name: 'TURN',  potSize: 10,   rpValue: 1.5 },
      { name: 'RIVER', potSize: 12,   rpValue: 0.9 },
    ],
    // Estimativa didática — micro stacks, quase ChipEV
    // Turn e river: polarização cresce levemente; RP baixo permite mais agressão
    defaultStreetFreqs: {
      flop: {
        ip_check:     40,
        ip_bet_small: 35,
        ip_bet_large: 25,
        oop_call:     50,
        oop_fold:     38,
        oop_raise:    12,
      },
      turn: {
        ip_check:     35,
        ip_bet_small: 30,
        ip_bet_large: 35,
        oop_call:     55,
        oop_fold:     35,
        oop_raise:    10,
      },
      river: {
        ip_check:     30,
        ip_bet_small: 10,
        ip_bet_large: 60,
        oop_call:     65,
        oop_fold:     28,
        oop_raise:    7,
      },
    },
    quiz: {
      question: 'Por que o Risk Premium entre dois micro-stacks não desce para o zero absoluto (ChipEV)?',
      options: [
        { id: 'A', text: 'Porque o EV de não fazer nada (fold) é positivo. A chance de "laddering" garantida pela morte alheia requer que a sua agressão compense essa diferença financeira.', isCorrect: true },
        { id: 'B', text: 'Porque os líderes forçam uma bolha secundária que dobra o RP de toda a mesa.', isCorrect: false },
        { id: 'C', text: 'Micro-stacks não sofrem ICM, o RP é sempre nulo. A afirmação é inválida.', isCorrect: false },
      ],
      explanation: 'Cada vizinho à beira da morte é um payjump virtual garantido no seu bolso. Renunciar a esse assento seguro exige um prêmio matemático.',
    },
  },

  // ============================================================
  // BASELINE (1): chipev
  // ============================================================
  {
    id: 'chipev',
    name: 'Vácuo Matemático',
    category: 'baseline',
    stacks: [100, 100],
    prizes: [408.30],
    ipRp: 0,
    oopRp: 0,
    ipPos: 'Qualquer IP',
    ipMorph: 'Polar Perfeito',
    oopPos: 'Qualquer OOP',
    oopMorph: 'Defesa Base',
    verdict: 'MDF Perfeito',
    narrativeTitle: 'O Equilíbrio Linear',
    narrativeSubtitle: 'ChipEV Puro',
    icon: 'fa-gear',
    color: 'slate',
    theory: `
      <h3 class="text-white font-bold text-xl mb-4 tracking-tight">O Equilíbrio Linear</h3>
      <p class="text-slate-300 leading-relaxed mb-4 text-[15px]">Início de torneio ou Cash Game. Não há ICM. A utilidade das fichas é estritamente linear: 1 ficha vale 1 ficha.</p>
      <p class="text-slate-300 leading-relaxed mb-6 text-[15px]">O Nash Equilibrium atua como um relógio suíço. Contra uma aposta do tamanho do pote, o <strong>Alpha</strong> dita exatos 33.3% de bluffs. O <strong>MDF</strong> repousa em perfeitos 50.0%. A matemática não sofre deformações emocionais ou utilitárias.</p>
    `,
    exploit: [
      'Punição Imediata: Se o oponente folda acima dos 50%, overbluff imprime dinheiro. Se ele paga mais do que deve, limite os bluffs a 0 e expanda as apostas de valor thin. A punição é direta.',
      'Monitore o MDF em tempo real: Se o oponente fold > 50% vs pot-bet, incremente bluffs incrementalmente até ele ajustar. Leia a mudança de tendência e recalibra antes de ele explorar de volta.',
      'Calibre o Alpha: Bluff frequency = 33.3% para pot-bet em ChipEV puro. Qualquer desvio gera EV imediato capturável. O jogo é recíproco — qualquer ajuste seu obriga um ajuste dele.',
    ],
    // Sem ICM: RP = 0 em todas as streets
    sprData: [
      { name: 'PRE',   potSize: 2.5,  rpValue: 0 },
      { name: 'FLOP',  potSize: 7.5,  rpValue: 0 },
      { name: 'TURN',  potSize: 22.5, rpValue: 0 },
      { name: 'RIVER', potSize: 67.5, rpValue: 0 },
    ],
    // ChipEV puro: frequências de equilíbrio Nash sem distorção ICM em todas as streets
    defaultStreetFreqs: {
      flop: {
        ip_check:     40,
        ip_bet_small: 35,
        ip_bet_large: 25,
        oop_call:     50,
        oop_fold:     40,
        oop_raise:    10,
      },
      turn: {
        ip_check:     35,
        ip_bet_small: 30,
        ip_bet_large: 35,
        oop_call:     55,
        oop_fold:     35,
        oop_raise:    10,
      },
      river: {
        ip_check:     30,
        ip_bet_small: 10,
        ip_bet_large: 60,
        oop_call:     65,
        oop_fold:     28,
        oop_raise:    7,
      },
    },
    quiz: {
      question: 'Por que num vácuo matemático (ChipEV) o desvio da frequência de bluff (Alpha) é punido imediatamente por um GTO perfeito?',
      options: [
        { id: 'A', text: 'Porque sem a âncora letal do ICM a forçar o "overfold", a defesa pagará exatamente conforme as pot odds. Blefar além cede EV automático.', isCorrect: true },
        { id: 'B', text: 'Porque o GTO sempre descobre as nossas cartas com base em padrões de sizes.', isCorrect: false },
        { id: 'C', text: 'Porque a agressão em ChipEV só é rentável com underbets.', isCorrect: false },
      ],
      explanation: 'Sem a dor assimétrica de um torneio, as odds matemáticas governam absolutas. Tudo o que fuja da linha é capturado pela mecânica do Defensor.',
    },
  },

  // ============================================================
  // TOY GAME (2): sniper, bully
  // ============================================================
  {
    id: 'sniper',
    name: 'Franco-Atirador',
    category: 'toyGame',
    stacks: [50, 12, 8, 9],
    prizes: [237.34, 170.96, 135.17, 109.99],
    ipRp: 12,
    oopRp: 45,
    ipPos: 'SB (CL)',
    ipMorph: 'Modo Predador',
    oopPos: 'BB',
    oopMorph: 'Zona de Paralisia',
    verdict: 'Paralisia Extrema',
    narrativeTitle: 'Licença para Matar',
    narrativeSubtitle: 'Blind War: SB (Hero) vs BB',
    icon: 'fa-crosshairs',
    color: 'emerald',
    theory: `
      <h3 class="text-white font-bold text-xl mb-4 tracking-tight">Licença para Matar</h3>
      <p class="text-slate-300 leading-relaxed mb-4 text-[15px]"><strong>Predator Mode Ativado:</strong> Você é o Chipleader no SB. O BB tem 12bb e um Risk Premium de 45% (Death Zone).</p>
      <p class="text-slate-300 leading-relaxed mb-6 text-[15px]">Matematicamente, ele não pode pagar com quase nada porque cair antes dos stacks de 8bb e 9bb é catastrófico. Seu range de shove aqui deve ser <strong>100% (Any Two Cards)</strong>.</p>
    `,
    exploit: [
      'Shove Any Two Cards (ATC): O RP do vilão é tão alto que qualquer agressão é lucrativa. O defensor está matematicamente paralisado.',
      'Isole o alvo: Foque a pressão no jogador com maior RP. Os stacks de 8bb e 9bb são seus aliados involuntários.',
      'Prefira min-raise ao overbet/shove: O BB paralisado foldará a min-raises igualmente, preservando sua stack para pressionar os outros shorts. Gaste menos, extraia mais.',
    ],
    // RP residual por street: ilustrativo, decrescente. Não quantificável com precisão.
    sprData: [
      { name: 'PRE',   potSize: 1.5,  rpValue: 45 },
      { name: 'FLOP',  potSize: 4,    rpValue: 30 },
      { name: 'TURN',  potSize: 8,    rpValue: 15 },
      { name: 'RIVER', potSize: 12,   rpValue: 9 },
    ],
    // Estimativa didática — CL agressivo vs BB em zona de pressão extrema
    // Turn e river: sizing big escalona; defensor paralisa progressivamente
    defaultStreetFreqs: {
      flop: {
        ip_check:     10,
        ip_bet_small: 30,
        ip_bet_large: 60,
        oop_call:     45,
        oop_fold:     45,
        oop_raise:    10,
      },
      turn: {
        ip_check:     5,
        ip_bet_small: 20,
        ip_bet_large: 75,
        oop_call:     55,
        oop_fold:     38,
        oop_raise:    7,
      },
      river: {
        ip_check:     5,
        ip_bet_small: 5,
        ip_bet_large: 90,
        oop_call:     65,
        oop_fold:     28,
        oop_raise:    7,
      },
    },
    quiz: {
      question: 'Por que o SB (Chipleader) pode shovar 100% das mãos contra o BB com 12bb nesta configuração?',
      options: [
        { id: 'A', text: 'Porque o RP de 45% do BB torna qualquer call catastrófico. Morrer antes dos stacks de 8bb e 9bb destrói payjumps garantidos.', isCorrect: true },
        { id: 'B', text: 'Porque o SB sempre tem vantagem posicional no heads-up, independente dos stacks.', isCorrect: false },
        { id: 'C', text: 'Porque 12bb é automaticamente push/fold em qualquer situação de torneio.', isCorrect: false },
      ],
      explanation: 'A paralisia do BB é estrutural, não emocional. A existência de stacks menores na mesa cria um campo gravitacional que impede o BB de arriscar a eliminação.',
    },
  },
  {
    id: 'bully',
    name: 'Bully do Botão',
    category: 'toyGame',
    stacks: [80, 20, 18],
    prizes: [237.34, 170.96, 135.17],
    ipRp: 5,
    oopRp: 42,
    ipPos: 'BTN (CL)',
    ipMorph: 'Modo Predador',
    oopPos: 'Blinds',
    oopMorph: 'Zona de Paralisia',
    verdict: 'Agressão Impune',
    narrativeTitle: 'Agressão Impune',
    narrativeSubtitle: 'Bolha do ITM',
    icon: 'fa-skull-crossbones',
    color: 'rose',
    theory: `
      <h3 class="text-white font-bold text-xl mb-4 tracking-tight">Agressão Impune</h3>
      <p class="text-slate-300 leading-relaxed mb-4 text-[15px]">Estamos na Bolha. Você tem 80bb e os blinds têm 20bb/18bb. Seu Risk Premium é ínfimo (5%). O deles é massivo (>40%).</p>
      <p class="text-slate-300 leading-relaxed mb-6 text-[15px]">Isso cria uma assimetria brutal. O solver sugere agressão desproporcional. Observe como o medidor do oponente entra na <strong>Death Zone</strong> enquanto o seu brilha em <strong>Predator Mode</strong>.</p>
    `,
    exploit: [
      'Oprima sem piedade: Com RP de 5%, o custo de perder um all-in é mínimo para você. Para eles, é catastrófico.',
      'Alterne sizes: Varie entre min-raise e shove para maximizar a desorientação do defensor paralisado.',
      'Deixe o campo gravitacional trabalhar: Sua presença no BTN já impõe pressão estrutural. Os blinds se autolimitam antes da ação. Você não precisa sempre mostrar força — basta estar lá.',
    ],
    // RP residual por street: ilustrativo, decrescente. Não quantificável com precisão.
    sprData: [
      { name: 'PRE',   potSize: 1.5,  rpValue: 42 },
      { name: 'FLOP',  potSize: 5,    rpValue: 31.5 },
      { name: 'TURN',  potSize: 15,   rpValue: 9.5 },
      { name: 'RIVER', potSize: 20,   rpValue: 4.2 },
    ],
    // Estimativa didática — BTN CL na bolha, blinds em zona de pressão máxima
    // Turn e river: agressão escalona; defensor paralisa conforme pot cresce
    defaultStreetFreqs: {
      flop: {
        ip_check:     15,
        ip_bet_small: 30,
        ip_bet_large: 55,
        oop_call:     45,
        oop_fold:     47,
        oop_raise:    8,
      },
      turn: {
        ip_check:     10,
        ip_bet_small: 20,
        ip_bet_large: 70,
        oop_call:     55,
        oop_fold:     38,
        oop_raise:    7,
      },
      river: {
        ip_check:     10,
        ip_bet_small: 5,
        ip_bet_large: 85,
        oop_call:     65,
        oop_fold:     28,
        oop_raise:    7,
      },
    },
    quiz: {
      question: 'Na bolha do ITM, por que o BTN com 80bb pode agredir desproporcional contra os blinds de 20bb?',
      options: [
        { id: 'A', text: 'Porque a assimetria de RP (5% vs 42%) torna qualquer confronto lucrativo para o BTN e catastrófico para os blinds.', isCorrect: true },
        { id: 'B', text: 'Porque o BTN sempre tem a melhor mão estatisticamente na bolha.', isCorrect: false },
        { id: 'C', text: 'Porque os blinds não podem 3-bet na bolha por regras implícitas.', isCorrect: false },
      ],
      explanation: 'A bolha amplifica a assimetria de risco. O BTN joga quase ChipEV enquanto os blinds jogam com o peso da eliminação. Agressão aqui é matematicamente obrigatória.',
    },
  },

  // ============================================================
  // CLINICAL (1): ameaca
  // ============================================================
  {
    id: 'ameaca',
    name: 'Ameaça Orgânica',
    category: 'clinical',
    stacks: [90, 25],
    prizes: [237.34, 170.96],
    ipRp: 12,
    oopRp: 21,
    ipPos: 'CL',
    ipMorph: 'Polar Controlado',
    oopPos: 'Vice',
    oopMorph: 'Inelástico',
    verdict: 'Criação de Monstros',
    narrativeTitle: 'O Limite do Chip Leader',
    narrativeSubtitle: 'Dominância Absoluta',
    icon: 'fa-crown',
    color: 'fuchsia',
    theory: `
      <h3 class="text-white font-bold text-xl mb-4 tracking-tight">O Limite do God Mode</h3>
      <p class="text-slate-300 leading-relaxed mb-4 text-[15px]">O CL (90bb) ataca o Vice (25bb). O CL é imune à eliminação; a teoria linear diria que ele tem RP 0% e pode esmagar o <em>board</em>.</p>
      <p class="text-slate-300 leading-relaxed mb-6 text-[15px]">Mas o torneio é orgânico. A <strong>Elasticidade do Bubble Factor</strong> intervém. Se o CL aplicar <em>hero-bluffs</em> arrogantes e dobrar o Vice, este salta para 50bb+. <strong>O CL acaba de armar o único rival capaz de usurpar o seu império.</strong> O solver impõe ~12% de RP à liderança, blindando o jogador contra o erro de criar o próprio carrasco.</p>
    `,
    exploit: [
      'Morte da Fold Equity: Expurgue os overbluffs. A fold equity não atua sobre quem joga puramente pelas cartas ignorando a morte. Mude a marcha inteiramente para Thin Value.',
      'Polarize para thin value, não para bluffs: Apostas de thin value extraem do range condensado do Vice enquanto ele self-restringe. Bluffs acionam resistência; thin value nunca aciona resistência raivosa.',
      'Controle o crescimento orgânico: Cada pot que o Vice ganha sem envolver o CL é uma ameaça futura. Seja presente nos potes relevantes — interrompa o laddering passivo do Vice antes que ele chegue ao pódio.',
    ],
    // RP residual por street: ilustrativo, decrescente. Não quantificável com precisão.
    sprData: [
      { name: 'PRE',   potSize: 2.5,  rpValue: 21 },
      { name: 'FLOP',  potSize: 7.5,  rpValue: 14.5 },
      { name: 'TURN',  potSize: 22.5, rpValue: 1.9 },
      { name: 'RIVER', potSize: 25,   rpValue: 1.2 },
    ],
    // Estimativa didática — CL vs Vice, pressão estrutural de hegemonia
    // Turn e river: bleff-polar cresce; Vice encolhe conforme pot cresce
    defaultStreetFreqs: {
      flop: {
        ip_check:     25,
        ip_bet_small: 40,
        ip_bet_large: 35,
        oop_call:     50,
        oop_fold:     38,
        oop_raise:    12,
      },
      turn: {
        ip_check:     20,
        ip_bet_small: 30,
        ip_bet_large: 50,
        oop_call:     55,
        oop_fold:     35,
        oop_raise:    10,
      },
      river: {
        ip_check:     15,
        ip_bet_small: 10,
        ip_bet_large: 75,
        oop_call:     65,
        oop_fold:     28,
        oop_raise:    7,
      },
    },
    quiz: {
      question: 'Sendo imune à eliminação direta, por que o Chip Leader colossal sofre uma punição utilitária considerável contra o 2o classificado?',
      options: [
        { id: 'A', text: 'Para defender a Hegemonia. Dobrar o Vice cria uma ameaça orgânica à liderança, mudando o balanço de poder da mesa inteira.', isCorrect: true },
        { id: 'B', text: 'Porque o HRC impõe que stacks acima de 80bb tenham taxação de risco extra para simular o rake.', isCorrect: false },
        { id: 'C', text: 'Para evitar collusion explícito na plataforma.', isCorrect: false },
      ],
      explanation: 'O ICM não dita apenas a morte, dita a "Esperança Matemática" global de chegar à vitória. Dobrar o seu maior rival destrói ativamente a sua maior vantagem no jogo.',
    },
  },
  // ============================================================
  // CLINICAL (6): especulacao - Especulação Assimétrica
  // ============================================================
  {
    id: 'especulacao',
    name: 'Especulação Assimétrica',
    category: 'clinical',
    stacks: [35, 80, 12],
    prizes: [237.34, 170.96, 135.17],
    ipRp: 38,
    oopRp: 8.2,
    ipPos: 'BTN (CL)',
    ipMorph: 'Agressor Obrigatório',
    oopPos: 'BB (Mid)',
    oopMorph: 'Especulativo Passivo',
    verdict: 'Implied Odds de ICM',
    narrativeTitle: 'O Parasita Silencioso',
    narrativeSubtitle: 'Mid-Stack vs Chip Leader',
    icon: 'fa-virus',
    color: 'fuchsia',
    theory: `
      <h3 class="text-white font-bold text-xl mb-4 tracking-tight">O Parasita Silencioso</h3>
      <p class="text-slate-300 leading-relaxed mb-4 text-[15px]">A pedagogia convencional ensina: "sob ICM, jogue mais tight". Verdade para <em>shorts</em> e <em>big stacks</em>. Mas o <strong>mid-stack</strong> num spot especifico opera numa logica inversa: ele entra no pote nao por pot odds diretas, mas por <strong>implied odds de ICM</strong>.</p>
      <p class="text-slate-300 leading-relaxed mb-4 text-[15px]">O mecanismo: o CL (80bb) e <em>obrigado</em> a agredir pela sua vantagem de Risco. O mid (35bb) absorve essa agressividade investindo pouco (flat call, small ball), aceitando a pressao sem confronto direto. Se acertar o flop ou a textura, a perspectiva matematica e a expectativa explodem.</p>
      <p class="text-slate-300 leading-relaxed mb-6 text-[15px]">O short (12bb) e o catalisador: sua mera existencia eleva o custo de eliminacao para o mid (Efeito de Irradiacao), mas tambem garante que o fold do mid num spot ruim nao e catastrofico - o short morrera antes. O mid especula com rede de seguranca estrutural.</p>
    `,
    exploit: [
      'Flat com maos especulativas contra opens do CL: suited connectors, pocket pairs medios e suited aces tem implied odds de ICM massivas. O CL nao pode sizear voce para fora sem inflar o pote alem do que o ICM dele permite.',
      'Realize equity passivamente: check-call > check-raise na maioria das texturas. O CL bleffa por obrigacao, e voce capitaliza sem aumentar o risco de eliminacao. O river e seu aliado.',
      'Evite confronto direto pre-flop: 3-bet so com o topo absoluto. Cada ficha investida pre tem custo de ICM para voce, mas cada ficha ganha pos-flop tem valor amplificado pela perspectiva de ultrapassar o CL.',
    ],
    // RP residual por street: OOP (mid) com RP baixo, dissipacao lenta
    sprData: [
      { name: 'PRE',   potSize: 2.5,  rpValue: 8.2 },
      { name: 'FLOP',  potSize: 7,    rpValue: 6.8 },
      { name: 'TURN',  potSize: 18,   rpValue: 3.5 },
      { name: 'RIVER', potSize: 35,   rpValue: 1.2 },
    ],
    // Estimativa didatica: mid-stack especulativo, high check freq pre, call-heavy pos
    defaultStreetFreqs: {
      flop: {
        ip_check:     40,
        ip_bet_small: 45,
        ip_bet_large: 15,
        oop_call:     55,
        oop_fold:     30,
        oop_raise:    15,
      },
      turn: {
        ip_check:     30,
        ip_bet_small: 40,
        ip_bet_large: 30,
        oop_call:     50,
        oop_fold:     38,
        oop_raise:    12,
      },
      river: {
        ip_check:     25,
        ip_bet_small: 15,
        ip_bet_large: 60,
        oop_call:     60,
        oop_fold:     32,
        oop_raise:    8,
      },
    },
    quiz: {
      question: 'Por que o mid-stack (35bb) pode entrar em potes contra o CL (80bb) com maos especulativas, contradizendo a regra "tighten up sob ICM"?',
      options: [
        { id: 'A', text: 'Porque o CL e obrigado a agredir pela Vantagem de Risco, e o mid absorve essa agressividade com investimento minimo. Se acertar, a perspectiva matematica explode sem risco proporcional.', isCorrect: true },
        { id: 'B', text: 'Porque o mid-stack nao sofre pressao de ICM significativa com 35bb.', isCorrect: false },
        { id: 'C', text: 'Porque maos especulativas sempre tem equity positiva contra ranges de abertura largos.', isCorrect: false },
      ],
      explanation: 'Implied Odds de ICM: o mid investe pouco, absorve agressividade estrutural do CL, e realiza equity passivamente. O ganho nao e em fichas - e em perspectiva matematica de posicoes superiores.',
    },
  },
];
