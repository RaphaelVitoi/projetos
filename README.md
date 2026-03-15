# Raphael Vitoi - Site Pessoal

Site pessoal e plataforma educacional de Raphael Vitoi: poker profissional, psicologia, teoria dos jogos e sistemas complexos.

## Stack

- **Next.js 16** (App Router, Server Components, React 19)
- **Tailwind CSS 4** (@theme, @plugin, prose)
- **Prisma** (SQLite local, modelo Post)
- **TypeScript 5**

## Estrutura do Projeto

```
frontend/             # Projeto Next.js (fonte de verdade do site)
  src/app/            # Rotas (App Router)
    page.tsx          # Home (Nexus Central)
    aula-icm/         # Masterclass ICM + Simulador interativo
    aula-1-2/         # Material complementar (ChipEV vs ICMev)
    leitura-icm/      # Whitepaper ICM
    psicologia-hs/    # Hub de Psicologia HS + [slug] dinamico
    biblioteca/       # Biblioteca Epistemica
    quem-sou/         # Manifesto/Bio
  src/lib/            # Logica compartilhada (prisma.ts, icm.ts)
  public/             # Assets estaticos
    legacy/           # HTMLs originais preservados como referencia
    simulador/        # Motor vanilla JS do simulador ICM (Web Components)
  prisma/             # Schema e seed do banco de dados

content/              # Material educacional futuro
  artigos/            # Carta de vendas, textos
  aulas/              # Documentos didaticos, videos
  interativo/         # Toy games, simuladores experimentais
  pesquisa/           # Papers de pesquisa ICM

docs/                 # Documentacao do sistema
scripts/              # Scripts organizados (tests/, init/, utils/, maintenance/)
queue/                # Fila de tarefas (tasks.json + archive/)
```

## Rotas Ativas

| Rota | Tipo | Descricao |
|------|------|-----------|
| `/` | Static | Landing page com feed de posts (Prisma + Suspense) |
| `/aula-icm` | Static | Masterclass: A Geometria do Risco + Simulador ICM |
| `/aula-1-2` | Static | Aprofundamento pos-flop (ChipEV vs ICMev) |
| `/leitura-icm` | Static | Whitepaper completo sobre ICM |
| `/psicologia-hs` | Static | Hub de protocolos de psicologia |
| `/psicologia-hs/[slug]` | Dynamic | Artigo individual |
| `/biblioteca` | Static | Biblioteca epistemica |
| `/quem-sou` | Static | Manifesto e bio (com video) |

## Desenvolvimento

```bash
cd frontend
npm install
npx prisma generate
npx prisma db push
npm run dev
```

## Build

```bash
cd frontend
npm run build
```

## Kernel Operacional

O projeto inclui um sistema de automacao em PowerShell (do.ps1, Agent-TaskManager.psm1) que orquestra tarefas via fila JSON. Os scripts de teste, inicializacao, utilidades e manutencao estao organizados em `scripts/`.
