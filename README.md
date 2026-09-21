# Stephanie Ramalho — Nutricionista | Site institucional

Redesign completo do site da nutricionista **Stephanie Ramalho** (CRN 3-79644), com todo o conteúdo real extraído do site anterior ([stephanieramalho.com.br](https://stephanieramalho.com.br)), do Instagram ([@steh_nutri](https://www.instagram.com/steh_nutri/)) e do perfil no Google Meu Negócio.

Site estático, sem dependência de Node.js/build step em produção — abre direto no navegador e sobe em qualquer hospedagem estática (GitHub Pages, Netlify, Vercel, cPanel, etc).

## Stack

- **HTML5** semântico, uma única página (one-pager de conversão)
- **Tailwind CSS v4**, compilado com o [CLI standalone](https://tailwindcss.com/blog/standalone-cli) (sem precisar de Node/npm)
- **JavaScript puro** (menu mobile, accordion de FAQ nativo via `<details>`, scroll-reveal com `IntersectionObserver`)
- Imagens otimizadas em **WebP**

## Estrutura do projeto

```
NutriStephanieRamalho/
├── index.html              # Página única com todas as seções
├── css/
│   ├── input.css           # Fonte Tailwind (tokens de marca, componentes)
│   └── output.css          # CSS compilado — é o que o index.html carrega
├── js/
│   └── main.js             # Menu mobile + animações de entrada
├── images/                 # Fotos e logo reais do site/Instagram da cliente
├── favicon/                # Ícones gerados a partir do logo original
└── .claude/launch.json     # Config apenas para preview local neste ambiente
```

## Como rodar localmente

Não precisa instalar nada além de um servidor estático simples. Duas opções:

**Python (já vem instalado na maioria dos sistemas):**
```bash
python -m http.server 4173
```
Depois abra `http://localhost:4173`.

**Ou apenas abra `index.html` direto no navegador** — o site não depende de servidor para funcionar, só é mais fiel usar um servidor local por causa de cache/paths.

## Como editar o estilo (Tailwind)

O arquivo `css/output.css` é gerado a partir de `css/input.css`. Sempre que uma classe Tailwind nova for usada no HTML, é preciso recompilar.

1. Baixe o **Tailwind CLI standalone** (não precisa de Node/npm) para o seu sistema operacional na [página de releases](https://github.com/tailwindlabs/tailwindcss/releases/latest):
   - Windows: `tailwindcss-windows-x64.exe`
   - macOS: `tailwindcss-macos-arm64` (Apple Silicon) ou `tailwindcss-macos-x64`
   - Linux: `tailwindcss-linux-x64`
2. Rode:
   ```bash
   tailwindcss -i css/input.css -o css/output.css --minify
   ```
   (adicione `--watch` durante o desenvolvimento para recompilar automaticamente)

Os tokens de marca (cores, fontes, sombras) ficam centralizados no bloco `@theme` de `css/input.css`.

## Publicando no GitHub

```bash
git init
git add .
git commit -m "Redesign completo do site institucional"
git branch -M main
git remote add origin <URL_DO_SEU_REPOSITORIO>
git push -u origin main
```

## Deploy (hospedagem)

Qualquer uma destas opções funciona sem configuração adicional, pois o site é 100% estático:

- **GitHub Pages**: Settings → Pages → Deploy from branch → `main` / `/ (root)`
- **Netlify**: arraste a pasta do projeto em [app.netlify.com/drop](https://app.netlify.com/drop), ou conecte o repositório (build command vazio, publish directory `/`)
- **Vercel**: importe o repositório, framework preset "Other", sem build command

## Sobre o conteúdo

Todo o texto, serviços, endereços, avaliações e fotos vêm de fontes reais e públicas da cliente:

- Textos institucionais e descrição de serviços: site anterior
- Endereços dos dois locais de atendimento (consultório e academia parceira): perfil Dietbox da cliente
- WhatsApp: `(11) 94998-0820`, extraído do botão de agendamento do site anterior
- Avaliações (5,0 · 66 avaliações): perfil da cliente no Google, com depoimentos reais copiados na íntegra
- Fotos de perfil, consultório, parceiros e resultados: mídia já publicada no site/Instagram da cliente

**Observação:** não foi encontrado um e-mail comercial publicado em nenhum canal oficial da cliente (site, Instagram, Google Meu Negócio, Dietbox). Por isso o rodapé não exibe e-mail — para adicioná-lo, edite o bloco "Contato" em `index.html` e no `<footer>`.

## CTAs do WhatsApp

Todos os botões de "Agendar" apontam para `wa.me/5511949980820` com uma mensagem pré-preenchida específica da seção (ex.: quem clica no Plano de 90 dias já chega perguntando sobre o Plano de 90 dias). Para trocar o número ou as mensagens, busque por `wa.me/5511949980820?text=` em `index.html`.

---

Site desenvolvido por **TeoCode** · © 2026 TeoCode
