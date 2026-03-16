# Conceito: A Membrana Inteligente (Smart CLI)
> Autor: @maverick | Origem: RelatÃ³rio Sentinela 2026-03-12

## A Tese
Atualmente, o do.ps1 Ã© um canal passivo ('dumb pipe'). Ele aceita qualquer coisa e joga na fila. Isso transfere a carga cognitiva de roteamento para o sistema ou para o usuÃ¡rio (que precisa saber o que pedir).

Precisamos evoluir o do.ps1 para uma **Membrana SemipermeÃ¡vel Inteligente**.

## A InovaÃ§Ã£o
O terminal nÃ£o deve apenas receber comandos; deve **negociar** intenÃ§Ãµes.

### UX Proposta (O Dialogo)
1. **UsuÃ¡rio:** .\do "quero melhorar a seguranÃ§a"
2. **Sistema (AnÃ¡lise de Intent):** Detecta palavras-chave de seguranÃ§a.
3. **Sistema (SugestÃ£o):** "Parece que vocÃª quer uma auditoria. Deseja acionar o @securitychief diretamente? [S/N]"
4. **Resultado:** Roteamento preciso desde a entrada, reduzindo ruÃ­do na fila.

## Isomorfismo BiolÃ³gico
Assim como uma membrana celular seleciona o que entra com base em receptores, a CLI deve selecionar inputs com base em padrÃµes conhecidos (Regex/Keywords), rejeitando entropia (inputs vazios/confusos) na porta de entrada.

## Diretrizes para o @planner
- NÃ£o use IA pesada na CLI (latÃªncia). Use heurÃ­sticas rÃ¡pidas (Regex).
- Mantenha a compatibilidade com o modo nÃ£o-interativo (flags -Force).
- O objetivo Ã© velocidade e precisÃ£o de roteamento.