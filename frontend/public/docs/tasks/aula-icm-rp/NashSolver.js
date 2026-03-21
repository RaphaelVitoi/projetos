export class NashSolver {
    constructor() {
        // Baseline para Pot Size Bet (PSB)
        // Alpha (Bluff) = 33.3% | MDF (Defesa) = 50.0%
        // Equity Call (ChipEV) = 33.3% (1/(1+2))
        this.BASELINE = {
            ALPHA: 33.33,
            MDF: 50.00,
            EQUITY: 33.33
        };
    }

    /**
     * Calcula o equilibrio ajustado pelo Risk Premium
     * @param {number} ipRp - Risk Premium do Agressor (IP)
     * @param {number} oopRp - Risk Premium do Defensor (OOP)
     * @param {number} agressionFactor - Fator de agressividade (0.5 a 1.5, padrao 1.0)
     */
    solve(ipRp, oopRp, agressionFactor = 1.0) {
        // @verifier: Input Sanitization (Garante estabilidade do motor)
        const safeIpRp = Math.max(0, parseFloat(ipRp) || 0);
        const safeOopRp = Math.max(0, parseFloat(oopRp) || 0);
        const safeFactor = Math.max(0.1, Math.min(3.0, parseFloat(agressionFactor) || 1.0));

        // Heuristica de Ajuste ICM
        // 1. Defensor (OOP): Perde MDF drasticamente conforme seu RP sobe.
        //    Ganha leve incentivo de call se o IP estiver sob risco extremo (IP blefa menos).
        let defense = this.BASELINE.MDF - (safeOopRp * 1.4) + (safeIpRp * 0.2);

        // 2. Agressor (IP): Aumenta blefes se OOP estiver pressionado (exploit).
        //    Reduz blefes drasticamente se seu proprio RP for alto (preservacao).
        let bluff = this.BASELINE.ALPHA + (safeOopRp * 1.0) - (safeIpRp * 1.1);

        // Aplica o fator de agressividade (modulacao comportamental)
        bluff = bluff * safeFactor;

        // 3. EV Diff (Diferenca de Valor Esperado):
        //    Quanto a equidade necessaria "salta" do ChipEV (33%) para o ICM.
        //    EV Diff = (Equity ICM - Equity ChipEV) = Basicamente o proprio RP (OOP) contextualizado.
        let requiredEquity = this.BASELINE.EQUITY + safeOopRp;

        // Clamping (Limites fisicos de 0% a 100%)
        defense = Math.max(0, Math.min(100, defense));
        bluff = Math.max(0, Math.min(100, bluff));

        return {
            defense: {
                value: defense.toFixed(1),
                delta: (defense - this.BASELINE.MDF).toFixed(1),
                label: "MDF Ajustado"
            },
            bluff: {
                value: bluff.toFixed(1),
                delta: (bluff - this.BASELINE.ALPHA).toFixed(1),
                label: "Freq. Bluff Otima"
            },
            evDiff: {
                value: (requiredEquity - this.BASELINE.EQUITY).toFixed(1),
                totalRequired: requiredEquity.toFixed(1),
                label: "EV Diff (Equity Shift)"
            },
            verdict: this._getVerdict(defense, bluff)
        };
    }

    _getVerdict(def, bluff) {
        if (def < 35) return "Overfold Massivo (Exploitavel)";
        if (bluff < 20) return "Agressao Contida (Valor Puro)";
        if (bluff > 45) return "Overbluff (Punicao de ICM)";
        return "Equilibrio GTO Padrao";
    }

    /**
     * Simula a decisao para uma mao especifica
     * @param {number} handEquity - Equidade bruta da mao (0-100)
     * @param {number} requiredEquity - Equidade necessaria calculada (ICM)
     */
    simulateHand(handEquity, requiredEquity) {
        const diff = handEquity - requiredEquity;
        const isCall = diff >= 0;
        
        return {
            action: isCall ? "CALL" : "FOLD",
            margin: Math.abs(diff).toFixed(1),
            isClose: Math.abs(diff) < 2.0, // Margem de erro de 2%
            statusClass: isCall ? "status-positive" : "status-negative"
        };
    }
}
