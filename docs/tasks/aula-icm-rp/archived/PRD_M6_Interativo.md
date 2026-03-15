# PRD: Módulo 6 - Simulador Interativo de Toy-Games

**Autor:** @planner | **Data:** 2026-03-11 | **Status:** Rascunho

---

## 1. Problema

A aula `aula-icm-rp.md` utiliza "Toy-Games" estáticos para explicar as dinâmicas do Risk Premium (RP). Embora pedagogicamente eficaz, o formato de texto e tabelas não permite que o aluno "sinta" a relação entre as variáveis. A internalização de conceitos contraintuitivos (como o "Teto do RP" ou a reação do OOP com RP baixo) seria acelerada se o aluno pudesse manipular as variáveis e observar as consequências em tempo real.

---

## 2. Resultado Esperado

Um componente web simples, autocontido e interativo que sirva como um laboratório para os "Toy-Games" do Módulo 2. O componente permitirá ao usuário ajustar os valores de Risk Premium do agressor (IP) e do defensor (OOP) e visualizar instantaneamente o impacto nas frequências ótimas de bluff e defesa. O objetivo não é ser um solver preciso, mas uma ferramenta didática para acelerar a intuição.

O componente deve ser integrado ao final do Módulo 2 do documento `aula-icm-rp.md`.

---

## 3. Histórias de Usuário

-   **Como estudante da aula,** eu quero poder arrastar um slider que representa o RP do meu oponente e ver um gráfico que me mostra o quanto a minha frequência de bluff deve aumentar, para que eu possa internalizar a relação entre a pressão que eu aplico e o risco que meu oponente corre.
-   **Como estudante cético,** eu quero poder replicar o cenário contraintuitivo da "Parte II" dos Toy-Games (onde o agressor tem RP alto) e ver com meus próprios olhos que a defesa do oponente diminui, para que eu acredite no conceito e pare de cometer esse erro.
-   **Como estudante focado,** eu quero uma ferramenta simples que modele *apenas* o cenário dos Toy-Games, sem a distração de outras variáveis (board, ranges, etc.), para que eu possa focar em dominar uma única variável de cada vez.

---

## 4. Requisitos

### 4.1 Requisitos Funcionais (Comportamento)

| ID | Requisito | Prioridade | Notas |
| :--- | :--- | :--- | :--- |
| RF-01 | Deve haver dois controles de entrada (sliders) para definir o "RP do Agressor (IP)" e o "RP do Defensor (OOP)". | Deve | O range deve ir de 0% a 25% para cobrir os cenários da aula. |
| RF-02 | O componente deve exibir dois outputs principais em tempo real: a frequência de bluff do agressor e a frequência de defesa do defensor. | Deve | Pode ser em percentual ou em um gráfico de barras simples. |
| RF-03 | A lógica de cálculo deve ser baseada nos dados e princípios dos 8 Toy-Games apresentados no Módulo 2. | Deve | O objetivo é a fidelidade pedagógica ao texto, não a precisão de um solver. |
| RF-04 | Deve ser implementado com tecnologias web padrão (HTML, CSS, JavaScript) sem dependências de frameworks pesados (React, Vue, etc.). | Deveria | Garante leveza, portabilidade e facilidade de manutenção. |
| RF-05 | O componente deve ser integrado ou "embedado" no documento `aula-icm-rp.md`, preferencialmente após a conclusão do Módulo 2. | Deve | Para que o usuário interaja com a ferramenta logo após aprender a teoria. |

### 4.2 Requisitos Não-Funcionais (Qualidade)

| ID | Requisito | Prioridade | Notas |
| :--- | :--- | :--- | :--- |
| RNF-01 | O design visual deve ser limpo, minimalista e consistente com o estilo geral do site/documento. | Deve | Evitar distrações visuais. |
| RNF-02 | O componente deve ser responsivo e funcional em telas de desktop e mobile. | Deveria | Para permitir o estudo em diferentes dispositivos. |
| RNF-03 | A interação deve ser instantânea, sem atrasos perceptíveis ao arrastar os sliders. | Deve | A natureza da ferramenta exige feedback em tempo real. |

---

## 5. Fora do Escopo

-   **Solver de Poker Completo:** Esta ferramenta não é e não deve tentar ser um GTO Wizard ou DeepSolver. Ela apenas ilustra um cenário isolado.
-   **Configurações Adicionais:** Não haverá opções para mudar o tamanho do pote, o tamanho da aposta, os ranges das mãos ou a textura do board.
-   **Armazenamento de Dados:** O estado do componente não será salvo. Cada visita começa com os valores padrão.
-   **Lógica de Solver Real:** A lógica de cálculo será uma aproximação ou interpolação dos resultados dos Toy-Games, não um cálculo de equilíbrio em tempo real.

---

## 6. Riscos

| Risco | Severidade | Mitigação |
| :--- | :--- | :--- |
| A lógica simplificada ser imprecisa e ensinar uma heurística errada. | Alta | A SPEC deve deixar explícito que a lógica é uma *interpolação* dos resultados conhecidos dos Toy-Games, e o próprio componente deve ter uma nota de rodapé afirmando seu propósito puramente didático. |
| O desenvolvimento do componente atrasar a entrega das outras melhorias. | Média | Definir um escopo minimalista na SPEC, focando apenas no essencial para o ganho pedagógico e usando tecnologias simples (vanilla JS). |
| A integração com o documento Markdown se provar tecnicamente complexa. | Baixa | A SPEC deve prever um método de fallback simples, como um link para uma página separada, caso o "embed" direto falhe. O uso de `<iframe>` é geralmente uma solução robusta. |

