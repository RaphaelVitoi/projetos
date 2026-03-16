/**
 * IDENTITY: Base de Dados dos Cenários Clínicos de ICM
 * PATH: src/components/simulator/engine/scenarios.ts
 * ROLE: Fonte de verdade para todos os 9 cenários do Simulador Mestre.
 *       Dados extraídos de RiskGeometryMasterclass.tsx (7), scenarios_toygame.js (2).
 * BINDING: [engine/types.ts]
 */

import type { Scenario } from './types';

export const SCENARIOS: Scenario[] = [
  // ============================================================
  // CLINICAL (5): paradoxo, pacto, batata, agonia, lama
  // ============================================================
  {
    id: 'paradoxo',
    name: 'O Paradoxo do Valuation',
    category: 'clinical',
    stacks: [40, 55],
    ipRp: 21.4,
    oopRp: 12.9,
    narrativeTitle: 'O Instinto Traído pela Matemática',
    narrativeSubtitle: 'Estrutura Padrão (Mid vs Big)',
    icon: 'fa-scale-unbalanced',
    color: 'rose',
    theory: `
      <h3 class="text-white font-bold text-xl mb-4 tracking-tight">O Instinto Traído pela Matemática</h3>
      <p class="text-slate-300 leading-relaxed mb-4 text-[15px]">O senso comum dita que o BTN com 40bb possui conforto suficiente para oprimir a mesa. Contudo, o HRC revela o pesadelo: o "RP de ida" do BTN é quase o dobro do "RP de volta" do BB.</p>
      <p class="text-slate-300 leading-relaxed mb-6 text-[15px]"><strong>Porquê?</strong> O BB sobrevive a um <em>all-in</em>. Já o BTN, se errar um <em>hero-bluff</em>, é aniquilado para o pó absoluto, perdendo instantaneamente o <em>laddering</em> contra todos os <em>shorts</em> da mesa. A capacidade do BTN de blefar é <strong>estrangulada</strong> pela necessidade da Esperança Matemática.</p>
    `,
    exploit: [
      'Puxar o Freio de Mão: Contraia severamente os seus bluffs. Aceite que a equidade natural exigida para engajar num pote deste calibre é altíssima.',
    ],
    sprData: [
      { name: 'PRE', potSize: 2.5, sprValue: 16.0 },
      { name: 'FLOP', potSize: 7.5, sprValue: 4.3 },
      { name: 'TURN', potSize: 22.5, sprValue: 0.8 },
      { name: 'RIVER', potSize: 40.0, sprValue: 0.0 },
    ],
    quiz: {
      question: 'Por que o BTN (40bb), tendo uma stack gigante, sofre uma punição utilitária (RP) muito maior que o BB (55bb)?',
      options: [
        { text: 'Porque perder o all-in destrói o BTN, retirando sua alavancagem e garantias de payjump. O BB, porém, sobrevive ao golpe.', correct: true },
        { text: 'Porque estar em posição (IP) gera uma penalidade padrão no solver para compensar a realização de equidade pós-flop.', correct: false },
        { text: 'A premissa está errada. O BTN tem um RP menor porque ele domina o range do BB.', correct: false },
      ],
      explanation: 'A Assimetria de Dor: O BTN põe em risco a sua sobrevivência. O BB arrisca apenas a liderança.',
    },
  },
  {
    id: 'pacto',
    name: 'O Pacto Silencioso',
    category: 'clinical',
    stacks: [65, 70],
    ipRp: 24.5,
    oopRp: 23.5,
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
    ],
    sprData: [
      { name: 'PRE', potSize: 2.5, sprValue: 26.0 },
      { name: 'FLOP', potSize: 8.0, sprValue: 7.6 },
      { name: 'TURN', potSize: 24.0, sprValue: 1.7 },
      { name: 'RIVER', potSize: 65.0, sprValue: 0.0 },
    ],
    quiz: {
      question: 'Como as frequências reconfiguram o jogo pré-flop num "Pacto Silencioso"?',
      options: [
        { text: 'A 3-bet encolhe a um mínimo polarizado, e o flat call infla massivamente para especular sem explodir o SPR.', correct: true },
        { text: 'Eles entram em modo push/fold agressivo para submeter psicologicamente a mesa.', correct: false },
        { text: 'Eles foldam quase 100% das mãos um contra o outro.', correct: false },
      ],
      explanation: 'O choque direto aniquila a Esperança Matemática. Transfere-se a decisão para o pós-flop onde o risco inicial é menor.',
    },
  },
  {
    id: 'batata',
    name: 'O Efeito Batata Quente',
    category: 'clinical',
    stacks: [25, 20],
    ipRp: 15.0,
    oopRp: 19.5,
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
    ],
    sprData: [
      { name: 'PRE', potSize: 2.5, sprValue: 8.0 },
      { name: 'FLOP', potSize: 7.0, sprValue: 1.9 },
      { name: 'TURN', potSize: 14.0, sprValue: 0.4 },
      { name: 'RIVER', potSize: 20.0, sprValue: 0.0 },
    ],
    quiz: {
      question: 'O que caracteriza o "Efeito Batata Quente" na aplicação de um shove em ICM?',
      options: [
        { text: 'O agressor impõe o seu RP somado à Fold Equity, removendo do defensor a capacidade de reagir e forçando a dor letal de um call definitivo.', correct: true },
        { text: 'É a situação em que os blinds rodam muito rápido na mesa, forçando a ação.', correct: false },
        { text: 'Ocorre quando o pote sofre re-shoves múltiplos, ignorando as odds.', correct: false },
      ],
      explanation: 'O agressor transfere a totalidade do fardo da decisão para o oponente, negando a realização de equidade pós-flop.',
    },
  },
  {
    id: 'agonia',
    name: 'Agonia do Bluffcatcher',
    category: 'clinical',
    stacks: [80, 30],
    ipRp: 4.5,
    oopRp: 22.0,
    narrativeTitle: 'O Colapso do MDF',
    narrativeSubtitle: 'Teto do MDF (Condensado vs Polar)',
    icon: 'fa-heart-crack',
    color: 'sky',
    theory: `
      <h3 class="text-white font-bold text-xl mb-4 tracking-tight">O Colapso do MDF</h3>
      <p class="text-slate-300 leading-relaxed mb-4 text-[15px]">A ilusão do MDF (Minimum Defense Frequency) morre aqui. O CL faz uma aposta Pot-Size. O Mid-stack tem um <em>bluffcatcher</em> puro. Em ChipEV, defenderia metade das vezes.</p>
      <p class="text-slate-300 leading-relaxed mb-6 text-[15px]">No ICM, um range estritamente condensado contra um range polar com <strong>Vantagem de Risco</strong> gera dissipação de equidade absurda. A pressão de 22% obriga o Mid a "quebrar" a matemática e foldar mãos médias mecanicamente (Teto do RP).</p>
    `,
    exploit: [
      'Overbluff Sistemático: Sabendo que o bluffcatcher não suporta o peso financeiro da eliminação contínua nas streets, expanda os bluffs e aplique triple barrels levianos.',
    ],
    sprData: [
      { name: 'PRE', potSize: 2.5, sprValue: 12.0 },
      { name: 'FLOP', potSize: 8.0, sprValue: 2.8 },
      { name: 'TURN', potSize: 24.0, sprValue: 0.3 },
      { name: 'RIVER', potSize: 30.0, sprValue: 0.0 },
    ],
    quiz: {
      question: 'Por que o jogador com alto RP não consegue defender a sua porção de MDF teórica num post-flop contra o CL?',
      options: [
        { text: 'Porque um range condensado (mãos médias) não consegue reter equidade suficiente ao longo das streets para cobrir o altíssimo custo (RP) de eliminação.', correct: true },
        { text: 'Porque os bluffcatchers perdem equidade bruta nas mesas finais.', correct: false },
        { text: 'Porque o agressor sempre terá a melhor mão no longo prazo em dinâmicas de ICM.', correct: false },
      ],
      explanation: 'A relação de recompensa não fecha. A dor financeira suplanta largamente o lucro teórico de apanhar o blefe.',
    },
  },
  {
    id: 'lama',
    name: 'Guerra na Lama',
    category: 'clinical',
    stacks: [12, 10],
    ipRp: 8.5,
    oopRp: 7.5,
    narrativeTitle: 'O Minitorneio de Sobrevivência',
    narrativeSubtitle: 'Micro vs Micro (Escada)',
    icon: 'fa-person-falling-burst',
    color: 'emerald',
    theory: `
      <h3 class="text-white font-bold text-xl mb-4 tracking-tight">O Minitorneio de Sobrevivência</h3>
      <p class="text-slate-300 leading-relaxed mb-4 text-[15px]">Com gigantes monopolizando as fichas, os <em>shorts</em> jogam na lama. A probabilidade matemática de qualquer um deles cravar o torneio é nula.</p>
      <p class="text-slate-300 leading-relaxed mb-6 text-[15px]">O instinto grita "ChipEV puro!". Falso. A abundância de outros shorts eleva drasticamente o <strong>EV do Fold</strong>. Cruzar os braços garante <em>laddering</em> à medida que os outros caem. A sobrevida passiva vale dólares, exigindo um prêmio de risco moderado (~8%) para justificar a abdicação dessa garantia.</p>
    `,
    exploit: [
      'Aumente a Variância: Se o vilão sofre de aversão cega ao risco para garantir um payjump (overfold), a matemática exige que você roube os blinds para construir uma base para o pódio real.',
    ],
    sprData: [
      { name: 'PRE', potSize: 2.5, sprValue: 3.8 },
      { name: 'FLOP', potSize: 6.0, sprValue: 1.0 },
      { name: 'TURN', potSize: 10.0, sprValue: 0.2 },
      { name: 'RIVER', potSize: 12.0, sprValue: 0.0 },
    ],
    quiz: {
      question: 'Por que o Risk Premium entre dois micro-stacks não desce para o zero absoluto (ChipEV)?',
      options: [
        { text: 'Porque o EV de não fazer nada (fold) é positivo. A chance de "laddering" garantida pela morte alheia requer que a sua agressão compense essa diferença financeira.', correct: true },
        { text: 'Porque os líderes forçam uma bolha secundária que dobra o RP de toda a mesa.', correct: false },
        { text: 'Micro-stacks não sofrem ICM, o RP é sempre nulo. A afirmação é inválida.', correct: false },
      ],
      explanation: 'Cada vizinho à beira da morte é um payjump virtual garantido no seu bolso. Renunciar a esse assento seguro exige um prêmio matemático.',
    },
  },

  // ============================================================
  // BASELINE (1): chipev
  // ============================================================
  {
    id: 'chipev',
    name: 'O Vácuo Matemático',
    category: 'baseline',
    stacks: [100, 100],
    ipRp: 0.0,
    oopRp: 0.0,
    narrativeTitle: 'O Equilíbrio Linear',
    narrativeSubtitle: 'Sem Payjumps (ChipEV Puro)',
    icon: 'fa-gear',
    color: 'slate',
    theory: `
      <h3 class="text-white font-bold text-xl mb-4 tracking-tight">O Equilíbrio Linear</h3>
      <p class="text-slate-300 leading-relaxed mb-4 text-[15px]">Início de torneio ou Cash Game. Não há ICM. A utilidade das fichas é estritamente linear: 1 ficha vale 1 ficha.</p>
      <p class="text-slate-300 leading-relaxed mb-6 text-[15px]">O Nash Equilibrium atua como um relógio suíço. Contra uma aposta do tamanho do pote, o <strong>Alpha</strong> dita exatos 33.3% de bluffs. O <strong>MDF</strong> repousa em perfeitos 50.0%. A matemática não sofre deformações emocionais ou utilitárias.</p>
    `,
    exploit: [
      'Punição Imediata: Se o oponente folda acima dos 50%, overbluff imprime dinheiro. Se ele paga mais do que deve, limite os bluffs a 0 e expanda as apostas de valor thin. A punição é direta.',
    ],
    sprData: [
      { name: 'PRE', potSize: 2.5, sprValue: 40.0 },
      { name: 'FLOP', potSize: 7.5, sprValue: 12.3 },
      { name: 'TURN', potSize: 22.5, sprValue: 3.4 },
      { name: 'RIVER', potSize: 67.5, sprValue: 0.5 },
    ],
    quiz: {
      question: 'Por que num vácuo matemático (ChipEV) o desvio da frequência de bluff (Alpha) é punido imediatamente por um GTO perfeito?',
      options: [
        { text: 'Porque sem a âncora letal do ICM a forçar o "overfold", a defesa pagará exatamente conforme as pot odds. Blefar além cede EV automático.', correct: true },
        { text: 'Porque o GTO sempre descobre as nossas cartas com base em padrões de sizes.', correct: false },
        { text: 'Porque a agressão em ChipEV só é rentável com underbets.', correct: false },
      ],
      explanation: 'Sem a dor assimétrica de um torneio, as odds matemáticas governam absolutas. Tudo o que fuja da linha é capturado pela mecânica do Defensor.',
    },
  },

  // ============================================================
  // TOY GAME (2): sniper, bully
  // ============================================================
  {
    id: 'sniper',
    name: 'O Franco-Atirador',
    category: 'toyGame',
    stacks: [50, 12, 8, 9],
    ipRp: 12.0,
    oopRp: 45.0,
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
    ],
    sprData: [
      { name: 'PRE', potSize: 1.5, sprValue: 7.0 },
      { name: 'FLOP', potSize: 4.0, sprValue: 2.0 },
      { name: 'TURN', potSize: 8.0, sprValue: 0.5 },
      { name: 'RIVER', potSize: 12.0, sprValue: 0.0 },
    ],
    quiz: {
      question: 'Por que o SB (Chipleader) pode shovar 100% das mãos contra o BB com 12bb nesta configuração?',
      options: [
        { text: 'Porque o RP de 45% do BB torna qualquer call catastrófico. Morrer antes dos stacks de 8bb e 9bb destrói payjumps garantidos.', correct: true },
        { text: 'Porque o SB sempre tem vantagem posicional no heads-up, independente dos stacks.', correct: false },
        { text: 'Porque 12bb é automaticamente push/fold em qualquer situação de torneio.', correct: false },
      ],
      explanation: 'A paralisia do BB é estrutural, não emocional. A existência de stacks menores na mesa cria um campo gravitacional que impede o BB de arriscar a eliminação.',
    },
  },
  {
    id: 'bully',
    name: 'O Bully do Botão',
    category: 'toyGame',
    stacks: [80, 20, 18],
    ipRp: 5.0,
    oopRp: 42.0,
    narrativeTitle: 'Agressão Impune',
    narrativeSubtitle: 'Bolha do ITM: BTN vs Blinds',
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
    ],
    sprData: [
      { name: 'PRE', potSize: 1.5, sprValue: 12.0 },
      { name: 'FLOP', potSize: 5.0, sprValue: 3.0 },
      { name: 'TURN', potSize: 15.0, sprValue: 0.3 },
      { name: 'RIVER', potSize: 20.0, sprValue: 0.0 },
    ],
    quiz: {
      question: 'Na bolha do ITM, por que o BTN com 80bb pode agredir desproporcional contra os blinds de 20bb?',
      options: [
        { text: 'Porque a assimetria de RP (5% vs 42%) torna qualquer confronto lucrativo para o BTN e catastrófico para os blinds.', correct: true },
        { text: 'Porque o BTN sempre tem a melhor mão estatisticamente na bolha.', correct: false },
        { text: 'Porque os blinds não podem 3-bet na bolha por regras implícitas.', correct: false },
      ],
      explanation: 'A bolha amplifica a assimetria de risco. O BTN joga quase ChipEV enquanto os blinds jogam com o peso da eliminação. Agressão aqui é matematicamente obrigatória.',
    },
  },

  // ============================================================
  // CLINICAL (1): ameaca
  // ============================================================
  {
    id: 'ameaca',
    name: 'A Ameaça Orgânica',
    category: 'clinical',
    stacks: [90, 25],
    ipRp: 12.0,
    oopRp: 21.0,
    narrativeTitle: 'O Limite do God Mode',
    narrativeSubtitle: 'Dominância Absoluta (God Mode)',
    icon: 'fa-crown',
    color: 'fuchsia',
    theory: `
      <h3 class="text-white font-bold text-xl mb-4 tracking-tight">O Limite do God Mode</h3>
      <p class="text-slate-300 leading-relaxed mb-4 text-[15px]">O CL (90bb) ataca o Vice (25bb). O CL é imune à eliminação; a teoria linear diria que ele tem RP 0% e pode esmagar o <em>board</em>.</p>
      <p class="text-slate-300 leading-relaxed mb-6 text-[15px]">Mas o torneio é orgânico. A <strong>Elasticidade do Bubble Factor</strong> intervém. Se o CL aplicar <em>hero-bluffs</em> arrogantes e dobrar o Vice, este salta para 50bb+. <strong>O CL acaba de armar o único rival capaz de usurpar o seu império.</strong> O solver impõe ~12% de RP à liderança, blindando o jogador contra o erro de criar o próprio carrasco.</p>
    `,
    exploit: [
      'Morte da Fold Equity: Expurgue os overbluffs. A fold equity não atua sobre quem joga puramente pelas cartas ignorando a morte. Mude a marcha inteiramente para Thin Value.',
    ],
    sprData: [
      { name: 'PRE', potSize: 2.5, sprValue: 10.0 },
      { name: 'FLOP', potSize: 7.5, sprValue: 2.3 },
      { name: 'TURN', potSize: 22.5, sprValue: 0.1 },
      { name: 'RIVER', potSize: 25.0, sprValue: 0.0 },
    ],
    quiz: {
      question: 'Sendo imune à eliminação direta, por que o Chip Leader colossal sofre uma punição utilitária considerável contra o 2o classificado?',
      options: [
        { text: 'Para defender a Hegemonia. Dobrar o Vice cria uma ameaça orgânica à liderança, mudando o balanço de poder da mesa inteira.', correct: true },
        { text: 'Porque o HRC impõe que stacks acima de 80bb tenham taxação de risco extra para simular o rake.', correct: false },
        { text: 'Para evitar collusion explícito na plataforma.', correct: false },
      ],
      explanation: 'O ICM não dita apenas a morte, dita a "Esperança Matemática" global de chegar à vitória. Dobrar o seu maior rival destrói ativamente a sua maior vantagem no jogo.',
    },
  },
];
