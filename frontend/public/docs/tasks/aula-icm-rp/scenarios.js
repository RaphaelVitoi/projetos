export const SCENARIOS = [
    {
        id: "paradox",
        icon: "fa-scale-unbalanced",
        label: "Paradoxo do Valuation",
        context: "Mid Stack (BTN) vs Big Stack (BB)",
        data: {
            ip: { pos: "BTN", stack: "40bb", rp: 21.4, morph: "Polarizado" },
            oop: { pos: "BB", stack: "55bb", rp: 12.9, morph: "Condensado" }
        },
        content: `
            <h3 class="text-xl text-white font-bold mb-4 font-editorial">O Instinto Traido</h3>
            <p class="text-slate-300 mb-4 text-sm leading-relaxed">O "Risk Premium de Ida" (21.4%) e quase o dobro do "Risk Premium de Volta". O BTN aposta a sua vida; o BB aposta apenas fichas.</p>
        `
    },
    {
        id: "pact",
        icon: "fa-handshake",
        label: "O Pacto Silencioso",
        context: "CL vs CL (Choque de Titas)",
        data: {
            ip: { pos: "CO", stack: "65bb", rp: 24.5, morph: "Linear Passivo" },
            oop: { pos: "BTN", stack: "70bb", rp: 23.5, morph: "Flat Call Massivo" }
        },
        content: `
            <h3 class="text-xl text-white font-bold mb-4 font-editorial">Destruicao Mutua Assegurada</h3>
            <p class="text-slate-300 mb-4 text-sm leading-relaxed">Quando as duas maiores stacks colidem, 3-bets somem. Ranges de flat-call explodem para evitar variancia pre-flop.</p>
        `
    },
    {
        id: "bubble_3way",
        icon: "fa-radiation",
        label: "O Abismo (3-Way Bubble)",
        context: "BTN (CL) abre, SB call, BB (Hero) decisao",
        data: {
            ip: { pos: "BTN", stack: "85bb", rp: 10.5, morph: "Maniaco (CL)" },
            oop: { pos: "BB", stack: "12bb", rp: 42.0, morph: "Paralisado" }
        },
        content: `
            <h3 class="text-xl text-white font-bold mb-4 font-editorial">Pressao Maxima de ICM</h3>
            <p class="text-slate-300 mb-4 text-sm leading-relaxed">
                Cenario de pesadelo: Bolha do ITM. O Chip Leader (BTN) abre any-two. O SB (que te cobre) paga flat. 
                O pote e gigante, mas seu <strong>Risk Premium e de 42%</strong>.
                <br><br>
                A matematica aqui desafia a logica: mesmo com "Pot Odds" excelentes, seu "Bubble Factor" exige que voce folde maos como <strong>TT</strong> e <strong>AQo</strong>. A sobrevivencia vale mais que o acumulo.
            </p>
        `
    }
];
