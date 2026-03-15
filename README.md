# Meu Projeto Next.js

Esta é a descrição do meu projeto.

---

## Calculadora ICM Universal (V2)

A aplicação agora inclui uma Calculadora ICM (Independent Chip Model) Universal na versão 2.0. Esta ferramenta interativa permite analisar cenários de torneios de poker, calculando o equity (valor esperado) de cada jogador com base em suas pilhas de fichas e na estrutura de premiação.

### Tecnologias Utilizadas:
- **Next.js**: Framework React para renderização do lado do servidor e geração de sites estáticos.
- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Tailwind CSS**: Framework CSS utilitário para estilização rápida e responsiva, com tema "Cyber/Dark".
- **Recharts**: Uma biblioteca de gráficos para React, utilizada para visualizar os resultados ICM em formato de pizza.

### Como Usar:
1.  **Navegue** até a página principal da aplicação.
2.  **Adicione** ou remova jogadores e ajuste suas pilhas de fichas (stacks).
3.  **Adicione** ou remova prêmios e defina seus valores.
4.  Clique no botão **"Calcular ICM"** para ver os equities calculados para cada jogador e uma representação visual em gráfico de pizza.

### Estrutura:
- A lógica de cálculo ICM é isolada em `frontend/src/lib/icm.ts`.
- Os componentes de UI estão localizados em `frontend/src/components/icm/`.
