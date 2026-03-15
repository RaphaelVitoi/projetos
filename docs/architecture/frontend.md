# Arquitetura Frontend

Este documento descreve a arquitetura geral do frontend da aplicação.

## Visão Geral

O frontend é construído com Next.js e React, utilizando Tailwind CSS para estilização.

## Calculadora ICM Universal (V2)

A Calculadora ICM Universal (V2) segue uma arquitetura modular para garantir separação de preocupações e manutenibilidade:

-   **Lógica Core (`frontend/src/lib/icm.ts`)**: Contém a implementação pura do algoritmo Independent Chip Model. Esta função é agnóstica à UI, recebendo apenas arrays de stacks e prêmios e retornando os equities calculados. Sua independência facilita testes unitários e futuras integrações.
-   **Componentes de UI (`frontend/src/components/icm/`)**:
    -   `PlayerInput.tsx`: Componente para entrada da pilha de fichas de um jogador.
    -   `PrizeInput.tsx`: Componente para entrada do valor de um prêmio.
    -   `ResultsDisplay.tsx`: Exibe os resultados do ICM em formato de lista e utiliza a biblioteca Recharts para renderizar um gráfico de pizza, visualizando a distribuição de equities.
    -   `ICMCalculator.tsx`: O componente orquestrador. Ele gerencia o estado dos jogadores e prêmios, lida com a adição/remoção de inputs, valida os dados e invoca a função `calculateICM`. Também é responsável por exibir mensagens de erro e renderizar os subcomponentes de input e resultados.
-   **Estilização**: Utiliza Tailwind CSS com um tema "Cyber/Dark" consistente com a identidade visual do projeto, inspirado em `icm_toy_game_simulator.html`.
