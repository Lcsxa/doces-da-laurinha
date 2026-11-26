/* ==========================================================================
   DOCE DE LAURINHA — interatividade (sem dependências)
   ========================================================================== */
const WHATSAPP_NUMERO = '5521974932021';
const linkWhatsApp = (texto) => `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;

/* --------------------------------------------------------------------------
   CABEÇALHO: sombra ao rolar e link ativo do menu
   -------------------------------------------------------------------------- */
const cabecalho = document.querySelector('.cabecalho');
const atualizarCabecalho = () => cabecalho.classList.toggle('rolado', window.scrollY > 20);
atualizarCabecalho();
window.addEventListener('scroll', atualizarCabecalho, { passive: true });

const linksMenu = Array.from(document.querySelectorAll('.nav__lista a'));
const secoesMenu = ['inicio', 'trabalhos', 'sobre', 'encomendas', 'contato']
  .map((id) => document.getElementById(id))
  .filter(Boolean);

if ('IntersectionObserver' in window) {
  const observadorSecoes = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      linksMenu.forEach((link) => {
        const ativo = link.getAttribute('href') === `#${entrada.target.id}`;
        link.classList.toggle('ativo', ativo);
        if (ativo) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
  secoesMenu.forEach((secao) => observadorSecoes.observe(secao));
}

/* --------------------------------------------------------------------------
   MENU MOBILE
   -------------------------------------------------------------------------- */
const botaoMenu = document.querySelector('.menu-toggle');
const menu = document.getElementById('menu-principal');

function fecharMenu() {
  menu.classList.remove('aberto');
  botaoMenu.setAttribute('aria-expanded', 'false');
  botaoMenu.setAttribute('aria-label', 'Abrir menu');
}

botaoMenu.addEventListener('click', () => {
  const vaiAbrir = !menu.classList.contains('aberto');
  menu.classList.toggle('aberto', vaiAbrir);
  botaoMenu.setAttribute('aria-expanded', String(vaiAbrir));
  botaoMenu.setAttribute('aria-label', vaiAbrir ? 'Fechar menu' : 'Abrir menu');
});

menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', fecharMenu));
document.addEventListener('click', (evento) => {
  if (!evento.target.closest('.cabecalho')) fecharMenu();
});
document.addEventListener('keydown', (evento) => {
  if (evento.key === 'Escape') fecharMenu();
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 980) fecharMenu();
});

/* --------------------------------------------------------------------------
   GALERIA + LIGHTBOX (teclado, toque e link para a publicação original)
   -------------------------------------------------------------------------- */
const fotos = Array.from(document.querySelectorAll('#galeria .foto'));
const lightbox = document.getElementById('lightbox');
const lbImagem = document.getElementById('lightbox-imagem');
const lbLegenda = document.getElementById('lightbox-legenda');
const lbPost = document.getElementById('lightbox-post');
const lbContador = document.getElementById('lightbox-contador');
const botaoFechar = document.getElementById('lightbox-fechar');
const botaoAnterior = document.getElementById('lightbox-anterior');
const botaoProxima = document.getElementById('lightbox-proxima');
const focaveisLightbox = [botaoFechar, botaoAnterior, botaoProxima, lbPost];

let indiceAtual = 0;

function atualizarLightbox() {
  const botao = fotos[indiceAtual];
  const imagem = botao.querySelector('img');
  lbImagem.src = imagem.getAttribute('src');
  lbImagem.alt = imagem.alt;
  lbLegenda.textContent = botao.querySelector('.foto__legenda').textContent.trim();
  lbPost.href = botao.dataset.post || 'https://www.instagram.com/docedelaurinha/';
  lbContador.textContent = `${indiceAtual + 1} / ${fotos.length}`;
}

function abrirLightbox(indice) {
  indiceAtual = indice;
  atualizarLightbox();
  lightbox.hidden = false;
  document.body.classList.add('lightbox-aberto');
  botaoFechar.focus();
}

function fecharLightbox() {
  lightbox.hidden = true;
  document.body.classList.remove('lightbox-aberto');
  fotos[indiceAtual].focus();
}

function navegarFotos(direcao) {
  indiceAtual = (indiceAtual + direcao + fotos.length) % fotos.length;
  atualizarLightbox();
}

fotos.forEach((foto, indice) => foto.addEventListener('click', () => abrirLightbox(indice)));

botaoFechar.addEventListener('click', fecharLightbox);
botaoAnterior.addEventListener('click', () => navegarFotos(-1));
botaoProxima.addEventListener('click', () => navegarFotos(1));

lightbox.addEventListener('click', (evento) => {
  if (evento.target === lightbox) fecharLightbox();
});

document.addEventListener('keydown', (evento) => {
  if (lightbox.hidden) return;
  if (evento.key === 'Escape') fecharLightbox();
  if (evento.key === 'ArrowLeft') navegarFotos(-1);
  if (evento.key === 'ArrowRight') navegarFotos(1);

  if (evento.key === 'Tab') {
    const posicao = focaveisLightbox.indexOf(document.activeElement);
    if (evento.shiftKey && posicao <= 0) {
      evento.preventDefault();
      focaveisLightbox[focaveisLightbox.length - 1].focus();
    } else if (!evento.shiftKey && posicao === focaveisLightbox.length - 1) {
      evento.preventDefault();
      focaveisLightbox[0].focus();
    }
  }
});

let toqueInicialX = 0;
lightbox.addEventListener('touchstart', (evento) => {
  toqueInicialX = evento.changedTouches[0].screenX;
}, { passive: true });
lightbox.addEventListener('touchend', (evento) => {
  const distancia = evento.changedTouches[0].screenX - toqueInicialX;
  if (Math.abs(distancia) > 50) navegarFotos(distancia < 0 ? 1 : -1);
}, { passive: true });

/* --------------------------------------------------------------------------
   FORMULÁRIO → consulta de data via WhatsApp (nada é armazenado)
   -------------------------------------------------------------------------- */
const formulario = document.getElementById('form-consulta');
const statusForm = document.getElementById('form-status');
const campoData = document.getElementById('data');

function dataLocalISO(data) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}
const hoje = new Date();
hoje.setHours(0, 0, 0, 0);
campoData.min = dataLocalISO(hoje);

function formatarDataBR(valor) {
  const partes = valor.split('-');
  if (partes.length !== 3) return valor;
  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

const validacoes = {
  nome: (valor) => (valor.trim().length >= 2 ? '' : 'Informe seu nome.'),
  data: (valor) => {
    if (!valor) return 'Escolha a data desejada.';
    const objeto = new Date(`${valor}T12:00:00`);
    if (Number.isNaN(objeto.getTime())) return 'Informe uma data válida.';
    if (objeto < hoje) return 'Escolha uma data a partir de hoje.';
    return '';
  },
  quantidade: (valor) => {
    if (!valor) return '';
    const numero = Number(valor);
    return Number.isInteger(numero) && numero >= 1 && numero <= 999
      ? ''
      : 'Informe uma quantidade entre 1 e 999.';
  }
};

function marcarErro(id, mensagem) {
  const campo = document.getElementById(id);
  const erro = document.getElementById(`${id}-erro`);
  const recipiente = campo.closest('.campo');
  campo.setAttribute('aria-invalid', mensagem ? 'true' : 'false');
  recipiente.classList.toggle('campo--erro', Boolean(mensagem));
  if (erro) erro.textContent = mensagem;
}

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  statusForm.textContent = '';

  const valores = {};
  let primeiroInvalido = null;
  Object.entries(validacoes).forEach(([id, validar]) => {
    const campo = document.getElementById(id);
    valores[id] = campo.value.trim();
    const mensagem = validar(valores[id]);
    marcarErro(id, mensagem);
    if (mensagem && !primeiroInvalido) primeiroInvalido = campo;
  });

  if (primeiroInvalido) {
    statusForm.textContent = 'Confira os campos destacados antes de continuar.';
    primeiroInvalido.focus();
    return;
  }

  const linhas = [
    'Olá! Vim pelo site e gostaria de consultar uma data para uma encomenda.',
    '',
    `Nome: ${valores.nome}`,
    `Data desejada: ${formatarDataBR(valores.data)}`
  ];

  const tema = document.getElementById('tema').value.trim();
  const observacoes = document.getElementById('observacoes').value.trim();
  if (tema) linhas.push(`Tema ou ocasião: ${tema}`);
  if (valores.quantidade) linhas.push(`Quantidade aproximada: ${valores.quantidade}`);
  if (observacoes) linhas.push(`Observações: ${observacoes}`);
  linhas.push('', 'Sei que é uma consulta e que a disponibilidade será confirmada na conversa.');

  const url = linkWhatsApp(linhas.join('\n'));
  const novaJanela = window.open(url, '_blank', 'noopener,noreferrer');
  if (!novaJanela) window.location.href = url;

  statusForm.textContent = 'Mensagem preparada! Confira a conversa que abriu no WhatsApp.';
  window.setTimeout(() => { statusForm.textContent = ''; }, 10000);
});

Object.keys(validacoes).forEach((id) => {
  const campo = document.getElementById(id);
  campo.addEventListener('input', () => {
    if (campo.getAttribute('aria-invalid') === 'true') marcarErro(id, validacoes[id](campo.value));
  });
});

/* --------------------------------------------------------------------------
   ANO DO RODAPÉ
   -------------------------------------------------------------------------- */
const anoAtual = document.getElementById('ano');
if (anoAtual) anoAtual.textContent = String(new Date().getFullYear());
