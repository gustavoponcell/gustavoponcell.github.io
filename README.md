# Gustavo Poncell — Portfólio interativo

Apresentação comercial navegável para a reunião sobre duas plataformas: **gestão de ONGs** e **controle de acesso para condomínio fechado**.

**Site:** https://gustavoponcell.github.io/

---

## Stack

| Camada | Escolha | Por quê |
|---|---|---|
| Build | **Vite 6** | Build estático em < 1 s, sem framework para manter |
| UI | **HTML + CSS + JavaScript puros** | Uma página só; ~10 KB de JS (gzip), nota 100 de desempenho no Lighthouse (desktop) |
| Conteúdo | `src/data.js` | Projetos, galerias e competências separados do layout |
| Fontes | Archivo (variável, eixo de largura), Doto (matriz de pontos), JetBrains Mono — via Fontsource, servidas pelo próprio site | Sem chamada externa ao Google Fonts |
| Hospedagem | **GitHub Pages** (deploy automático via GitHub Actions) | Grátis; o build usa caminhos relativos e roda sem mudanças na Vercel, Netlify ou Cloudflare Pages |
| QA | Playwright + Lighthouse | Capturas reais, teste de teclado, desempenho |

## Estrutura

```
index.html            Estrutura das 7 seções (textos fixos ficam aqui)
src/
  data.js             ← EDITE AQUI: projetos, telas, galerias do Behance, competências, contatos
  main.js             Renderização, navegação por teclado, lightbox, abas, animações
  styles.css          Direção de arte (tokens no topo, em :root)
public/
  img/dev/            Telas dos sistemas (+ variantes -960 para celular)
  img/design/         Slides do Behance (+ -960 e -320 para miniaturas)
  img/me/             Retrato P&B e versão pontilhada (1-bit)
  img/og.png          Imagem de compartilhamento
qa/
  review.mjs          Capturas por tela + erros de console, imagens, fontes e rolagem horizontal
  keys.mjs            Teste de navegação por teclado, abas, lightbox e galerias
  reduced.mjs         Teste de prefers-reduced-motion
  perf.mjs            Medição de tarefas longas
.github/workflows/    Build e deploy no GitHub Pages a cada push na main
```

## Manutenção

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # gera dist/
npm run preview    # serve dist/ em http://localhost:4173
```

Publicar: `git push` na `main` → o GitHub Actions gera o build e publica em 1–2 minutos.

- **Adicionar um projeto de desenvolvimento:** acrescente um objeto em `devProjects` (`src/data.js`). Coloque as telas em `public/img/dev/` em WebP, 1440×900 — e gere a versão `-960.webp` (o código procura por ela).
- **Adicionar um projeto de design:** acrescente em `designProjects`, com imagens 1920×1080 em `public/img/design/` e as variantes `-960` e `-320`.
- **Cores e tipografia:** variáveis no topo de `src/styles.css` (`--signal` é o laranja de destaque).
- **Indexação no Google:** a página está com `noindex` (só quem recebe o link encontra). Para aparecer em buscas, remova `<meta name="robots" content="noindex" />` do `index.html`.
- **Os testes de `qa/`** apontam para o Chromium instalado pelo Playwright neste computador (`%LOCALAPPDATA%/ms-playwright/chromium-1248`). Em outra máquina, rode `npx playwright install chromium` e ajuste o caminho no começo de cada script.

## Navegação durante a apresentação

| Tecla | Ação |
|---|---|
| `↓` `→` `Espaço` `PgDn` | Próximo ponto (seção, projeto, conceito) — funciona com passadores de slide |
| `↑` `←` `PgUp` | Ponto anterior |
| `1`–`7` | Ir direto para a seção |
| `Home` / `End` | Abertura / contato |
| `F` | Tela cheia |
| `?` | Painel de atalhos |
| No zoom de imagem: `←` `→` e `Esc` | Navegar / fechar |

---

## Fontes e projetos selecionados

**Currículo** (PDF fornecido): formação, experiências (Nexter 2023, Dicom/UFVJM 2024, O Quarto Rec 2024), ferramentas, contatos.

**GitHub — github.com/gustavoponcell** (repositórios e histórico de commits analisados):

| Projeto | Uso no site | Status mostrado | Observação |
|---|---|---|---|
| ana-cleide-imoveis (privado) | Destaque P.01 | Interface aprovada · backend em implantação | 108 commits, todos do autor. Telas de `docs/screenshots` (dados demonstrativos) |
| ClinicAgenda | Destaque P.02 | Protótipo funcional | Telas capturadas rodando o sistema localmente (API Express + PostgreSQL + seed do próprio repositório) |
| adriano-azevedo-imoveis (privado) | Destaque P.03 | Em desenvolvimento | 163 commits, todos do autor. Telas das verificações do próprio projeto |
| sistema_de_aluguel, portifolio, Barbearia, oficina, rotadebares, aurora-wumpus-ai | Tabela "Arquivo" | Funcional / deploy desativado / acadêmico / experimento | `project-x8j9z.vercel.app` responde 404, por isso não há link de demo |
| sinema | Não usado | — | Integra players de streaming de terceiros — arriscado numa reunião comercial |
| github-slideshow | Não usado | — | Exercício de treinamento do GitHub |

**Behance — behance.net/gustavoponcell:** LACAP, Bacanal da Dionísio's e Jequitimuu. Os três projetos estão publicados como Figma Slides incorporados; os slides foram exportados em 1920×1080 pelo conector do Figma, sem alteração. As métricas do Bacanal (130 mil contas alcançadas etc.) são as do estudo de caso publicado pelo autor.

**Fotografia:** convertida para P&B com mistura de canais própria para a luz roxa original; parede e post-its levados ao branco por uma máscara de cor (a pele permanece com meios-tons), recorte 4:5 e nitidez leve. Uma segunda versão em pontilhado 1-bit (matriz de Bayer) faz a transição animada na abertura.

## Decisões de design

1. **Referência interpretada, não copiada.** Da referência vieram o papel com grade de pontos, a tipografia monoespaçada de "sistema", painéis com bordas pretas e barras de título, e um único laranja de sinal. O que é autoral: o nome em Archivo condensado e pesado, o letreiro em matriz de pontos (Doto), o retrato que se revela do pontilhado para a foto e a seção de design em fundo preto, como uma inversão editorial.
2. **Narrativa comercial em 7 atos:** quem sou → prova técnica (sistemas reais) → prova estética (design) → competências com evidência → aplicação ao cliente → contato. Cada projeto termina com "Relevância para vocês", que liga o que já foi feito à ONG e ao condomínio.
3. **Credibilidade acima de efeito.** Os status são reais (nada é chamado de "finalizado" sem ser), cada competência aponta onde está comprovada, e os mockups da seção 06 são marcados como ilustrativos, com dados fictícios, sem prazo nem orçamento.
4. **Feito para projetar numa tela grande.** Paradas de apresentação navegáveis pelo teclado e por passadores de slide, telas dos sistemas em largura total e escala tipográfica maior a partir de 1700 px.
5. **Movimento discreto e barato:** só `transform` e `opacity`, nada de SMIL nem efeitos que pesem na thread principal. Com `prefers-reduced-motion`, tudo aparece já pronto.

## Resultado dos testes (06/11/2026)

| Verificação | Resultado |
|---|---|
| Erros de console / requisições falhas | 0 / 0 (1440, 1920, 768, 390 px) |
| Fontes carregadas | Archivo, Doto, JetBrains Mono ✓ |
| Rolagem horizontal | Nenhuma em 390, 768, 1440, 1920 px (corrigido um estouro de grid no celular e no tablet) |
| Navegação por teclado | 16 paradas em sequência; 1–7, Home/End, abas (←/→), lightbox (←/→/Esc), painel de atalhos ✓ |
| prefers-reduced-motion | Todo o conteúdo visível, sem animações ✓ |
| Links externos | GitHub (8) 200 · WhatsApp 200 · Instagram 200 · perfil do Behance 200 · projetos do Behance abertos no navegador (o curl recebe 403 do anti-robô) |
| Lighthouse desktop | Performance **100** · Acessibilidade **100** · Boas práticas **100** · SEO 66 (só por causa do `noindex`, proposital) |
| Lighthouse celular (4G simulado) | Performance **94** · Acessibilidade **100** · Boas práticas **100** |

Correções feitas durante a revisão: retrato com blend errado; terminal com área vazia (reorganizado com a trajetória); botões de navegação cobrindo texto (movidos para a lateral e ocultos abaixo de 1280 px); telas dos projetos com faixas pretas (passaram a ocupar a largura total); título cortado em algumas paradas (cálculo de posição agora ignora a animação de entrada); estouro horizontal no celular e no tablet; contraste do laranja em textos pequenos; rótulo acessível do logo; tarefa longa de 1,7 s na thread principal (animações SMIL e fundo fixo trocados por versões só com `transform`); fontes servidas pelo próprio site; imagens com `srcset`.
