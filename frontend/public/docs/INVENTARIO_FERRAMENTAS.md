# Y i InventArio de Ferramentas Interativas (State of the Art)
> **AtenAAo Agentes:** Este mapa A a fonte de verdade para features de frontend/interatividade. Consulte ANTES de propor novas funcionalidades para evitar redundAncia.

---

## 1. Ativas (Em ProduAAo)

### 1.1 Simulador de Toy-Games (V1)
- **LocalizaAAo:** `components/interactive/icm_toy_game_simulator.html`
- **Stack:** Vanilla HTML / Tailwind via CDN / Vanilla JS / ApexCharts
- **PropAsito:** ProtAtipo didAtico embutido na `aula-icm.html`. Ilustra o "Downward Drift" e "Teto de RP" usando 8 cenArios prA-fixados de Nash.
- **Status:** ConcluAdo, altamente polido visualmente. ReferAncia de ouro para design UI/UX.

---

## 2. Em Planejamento / ConstruAAo

### 2.1 LaboratArio de ICM Universal (V2)
- **LocalizaAAo Planejada:** `frontend/src/app/tools/icm/`
- **Stack Planejada:** Next.js (App Router), React, TypeScript, Tailwind, Recharts.
- **PropAsito:** Calculadora universal recursiva (calcula $EV para qualquer stack/premiaAAo).
- **ReferAncias:** Baseia-se no design e lAgica extraAdos da V1.
- **Status:** PRD e SPEC gerados. Aguardando execuAAo pelo `@implementor`.
