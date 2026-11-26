# Doce de Laurinha — site one-page

Site de apresentação e contato da Doce de Laurinha. HTML, CSS e JavaScript puro: sem dependências, banco de dados, login, carrinho ou agendamento automático. O pedido é iniciado pelo WhatsApp.

## Como abrir e publicar

- **Local:** abra `index.html` no navegador. Não precisa de servidor.
- **Publicar:** envie esta pasta inteira para um repositório e importe o repositório na [Vercel](https://vercel.com/new). Deixe o Build Command vazio e o Output Directory como `.`. A cada push, a Vercel publica a versão nova.

Depois do primeiro deploy, edite no `<head>` do `index.html` o `og:image` e o `twitter:image` para URLs absolutas do seu domínio (ex.: `https://seu-site.vercel.app/imagens/og-image.png`). O WhatsApp exige URL absoluta para mostrar a prévia.

## Estrutura

```
index.html          conteúdo, metadados e dados estruturados
css/style.css       sistema visual e responsividade
js/script.js        menu, lightbox e formulário de consulta
imagens/
  logo-cabecalho.png logo com personagem enviado para o cabeçalho
  logo.png          assinatura visual usada no rodapé
  favicon.png       ícone da aba
  og-image.png      prévia para WhatsApp/redes (1200 x 630)
  real-01.jpg       retrato de Lidiane (publicação de apresentação)
  real-02 a 12      fotos reais das publicações do Instagram
  elementos.png     arte da marca (cupcake/fuê) — reserva
  hero-menina.png   ilustração da Laurinha — reserva
robots.txt          indexação liberada
vercel.json         configuração da Vercel
```

## Fotos do Instagram

As fotos `real-01.jpg` a `real-12.jpg` foram obtidas das publicações públicas do perfil [@docedelaurinha](https://www.instagram.com/docedelaurinha/) e salvas localmente em JPG (até 640 px no maior lado). Cada foto da galeria tem o link da publicação original no lightbox, e as legendas usam apenas temas citados nas próprias legendas publicadas.

A imagem `real-08.jpg` é uma arte promocional (Black Friday) e não foi usada na galeria. A ilustração `hero-menina.png` não é carregada pela página e fica disponível para uso futuro.

### Trocar ou adicionar fotos

1. Salve a nova foto em `imagens/` (JPG ou WebP, até ~1200 px, mantendo a proporção original).
2. Em `index.html`, troque o `src` da imagem correspondente dentro de `#galeria`.
3. Ajuste `alt` (descreva só o que a imagem mostra) e a legenda visível.
4. Atualize `data-post` com a URL da publicação original (`https://www.instagram.com/p/CODIGO/`).
5. Para adicionar uma foto, copie um bloco `<button class="foto">`; o lightbox e o contador se ajustam sozinhos.

Não use fotos de banco ou de outras confeitarias apresentando-as como trabalhos da loja.

## Onde editar

- **Textos:** direto no `index.html`.
- **WhatsApp:** número em `js/script.js` (`WHATSAPP_NUMERO`) e nos links `wa.me` do `index.html`.
- **Instagram, endereço e avaliação:** seções Contato e Rodapé do `index.html`; a avaliação usa o link de pesquisa do Google informado pela cliente.
- **SEO:** `<head>` do `index.html`, incluindo os dados estruturados `LocalBusiness`.
- **Cores, fontes e espaçamento:** variáveis no início de `css/style.css`.

## Comportamento

- O formulário valida nome e data (a partir de hoje) e quantidade quando preenchida. Ele abre o WhatsApp com a mensagem montada; nada é enviado para servidor nem armazenado.
- A mensagem gerada deixa claro que se trata de uma consulta e que a disponibilidade será confirmada na conversa.
- O lightbox funciona por toque e teclado (Esc fecha, setas navegam, Tab fica preso na janela) e inclui link para a publicação original.
- A entrada do hero é breve, não há animações repetidas ao rolar, e o movimento respeita `prefers-reduced-motion`. No celular, os atalhos fixos de WhatsApp e consulta têm espaço reservado ao fim da página para não cobrir conteúdo.

Feito com cuidado para a Doce de Laurinha by Lidiane Magalhães.
