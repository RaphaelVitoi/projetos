# SPEC: Módulo 6 - Simulador Interativo de Toy-Games

**Autor:** @planner | **Data:** 2026-03-11 | **PRD:** `PRD_M6_Interativo.md`

---

## 1. Resumo da Investigação

A funcionalidade é inteiramente nova. Será um componente web autocontido, sem dependências de backend ou de outros componentes da aplicação. A implementação será feita com HTML, CSS e JavaScript puros ("vanilla") para garantir máxima portabilidade e mínima sobrecarga.

O componente será servido como um arquivo HTML estático e integrado ao documento principal (`aula-icm-rp.md`) via `<iframe>`.

---

## 2. Estrutura Detalhada do Componente

### 2.1 Estrutura de Arquivos

1.  Será criada uma nova pasta: `components/interactive/`.
2.  O componente será um arquivo único: `components/interactive/icm_toy_game_simulator.html`.

### 2.2. `icm_toy_game_simulator.html`

O arquivo conterá três seções principais: HTML para a estrutura, CSS para o estilo e JavaScript para a lógica.

#### 2.2.1. Estrutura HTML

```html
<div class="simulator-container">
    <div class="controls">
        <div class="slider-group">
            <label for="rp-ip">Risk Premium do Agressor (IP): <span id="rp-ip-value">3%</span></label>
            <input type="range" id="rp-ip" min="0" max="25" value="3" step="1">
        </div>
        <div class="slider-group">
            <label for="rp-oop">Risk Premium do Defensor (OOP): <span id="rp-oop-value">9%</span></label>
            <input type="range" id="rp-oop" min="0" max="25" value="9" step="1">
        </div>
    </div>
    <div class="outputs">
        <div class="chart">
            <div class="bar-group">
                <label>Freq. de Bluff do Agressor</label>
                <div class="bar-container">
                    <div class="bar" id="bluff-bar" style="width: 50%;"></div>
                </div>
                <span id="bluff-value">50%</span>
            </div>
            <div class="bar-group">
                <label>Freq. de Defesa do Defensor</label>
                <div class="bar-container">
                    <div class="bar" id="defense-bar" style="width: 45%;"></div>
                </div>
                <span id="defense-value">45%</span>
            </div>
        </div>
    </div>
    <div class="notes">
        <p><small>Nota: Esta é uma ferramenta didática para ilustrar os conceitos do Módulo 2. Os valores são interpolações baseadas nos 8 "Toy-Games" e não substituem a análise de um solver GTO.</small></p>
    </div>
</div>
```

#### 2.2.2. Estilização CSS (dentro de `<style>`)

-   **Layout:** Usará Flexbox para organizar os controles e os outputs.
-   **Design:** Minimalista. Fundo claro, texto escuro, cores de destaque para as barras (ex: azul para bluff, cinza para defesa).
-   **Responsividade:** Media queries para empilhar os elementos em telas menores.

#### 2.2.3. Lógica JavaScript (dentro de `<script>`)

-   **Seleção de Elementos:** Pegar referências para os sliders, spans de valor e barras de gráfico.
-   **Listeners de Evento:** Adicionar um listener de `input` a ambos os sliders que chamará uma função `updateSimulator()`.
-   **Função Principal: `updateSimulator()`**
    1.  Lê os valores atuais dos sliders `rp_ip` e `rp_oop`.
    2.  Chama uma função `calculateOutputs(rp_ip, rp_oop)` para obter as frequências de bluff e defesa.
    3.  Atualiza os textos (`<span id="...">`) com os novos valores.
    4.  Atualiza a largura (`style.width`) das barras do gráfico.

-   **Função de Cálculo: `calculateOutputs(rp_ip, rp_oop)`**
    *   **ALERTA DE IMPLEMENTAÇÃO:** Esta é a parte mais crítica. Como não temos a fórmula exata do solver, esta função implementará um **modelo de interpolação linear** baseado nos pontos de dados conhecidos dos 8 Toy-Games.
    *   **Exemplo de Lógica (Simplificado):**
        *   Definir os pontos conhecidos: `const dataPoints = [{ip: 0, oop: 0, bluff: X, defense: Y}, {ip: 3, oop: 6, bluff: A, defense: B}, ...]`. **Os valores X, Y, A, B, etc., devem ser extraídos do documento `aula-icm-rp.md` após a sua correção (Tarefa 1).**
        *   A função encontrará os dois pontos de dados mais próximos da combinação `(rp_ip, rp_oop)` atual.
        *   Ela realizará uma interpolação linear entre esses dois pontos para estimar os valores de bluff e defesa.
        *   Deve conter lógica especial para o "Teto do RP" (a defesa para de cair após um certo ponto) e o cenário invertido.
    *   **Esta simplificação deve ser documentada no código como um comentário e na UI através da nota de rodapé.**

---

## 3. Integração com `aula-icm-rp.md`

-   Ao final do Módulo 2 do arquivo `aula-icm-rp.md`, o seguinte trecho de HTML será adicionado:

```html
<h3>Laboratório Interativo</h3>
<p>Use o simulador abaixo para explorar ativamente os conceitos discutidos nos Toy-Games. Manipule os valores de Risk Premium para construir uma intuição sobre as dinâmicas de pressão em ICM.</p>
<iframe src="../../components/interactive/icm_toy_game_simulator.html" style="width: 100%; height: 400px; border: 1px solid #ccc; border-radius: 5px;"></iframe>
```
*A altura (`height`) pode precisar de ajuste.*

---

## 4. Ordem de Implementação

1.  Criar a estrutura de diretórios: `components/interactive/`.
2.  Criar o arquivo `icm_toy_game_simulator.html` com a estrutura HTML e o CSS básico.
3.  Implementar a lógica JavaScript com dados *mockados* ou *placeholders* para a função `calculateOutputs()`. O objetivo nesta fase é fazer a UI funcionar.
4.  Substituir a lógica mockada pela função de interpolação real, usando os dados corrigidos da Tarefa 1 (quando disponíveis).
5.  Testar o componente de forma isolada, verificando todos os cenários dos Toy-Games.
6.  Adicionar o `<iframe>` no arquivo `aula-icm-rp.md` para a integração final.

---

## 5. Casos de Teste

| Cenário de Teste | Inputs | Output Esperado | Conceito Validado |
| :--- | :--- | :--- | :--- |
| Baseline ChipEV | IP RP=0, OOP RP=0 | Frequências de bluff/defesa base. | Equilíbrio de Nash em ChipEV |
| Pressão no OOP | IP RP=3, OOP RP=9 | Frequência de bluff do IP aumenta; frequência de defesa do OOP diminui, mas estabiliza. | Vantagem de Risco e Teto do RP |
| Pressão Invertida | IP RP=18, OOP RP=3 | Frequência de bluff do IP é moderada; frequência de defesa do OOP é *muito baixa*. | Dinâmica contraintuitiva da Parte II |
| Interpolação | IP RP=5, OOP RP=12 | Os valores de output devem estar logicamente entre os pontos de dados conhecidos mais próximos. | Validade do modelo de interpolação |

