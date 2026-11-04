/* Portal SEMEC — bloco "Você sabia?" da Área do Servidor. Lê dados/voce-sabia.json; só mostra cartões conferidos (ou todos em modo de revisão). */
function iniciarVoceSabia(raiz, dados, opcoes) {
  const revisao = !!(opcoes && opcoes.revisao);
  const caminhoMascote = (opcoes && opcoes.mascotes) || 'assets/mascote/';
  const cats = {}; dados.categorias.forEach(function (c) { cats[c.id] = c; });
  const todos = dados.cartoes.filter(function (c) { return revisao || c.conferido; });
  let filtro = '', lista = todos, atual = 0;
  if (!todos.length) { raiz.hidden = true; return; }

  const el = function (tag, cls, txt) { const e = document.createElement(tag); if (cls) e.className = cls; if (txt !== undefined) e.textContent = txt; return e; };
  const filtros = raiz.querySelector('.saber-filtros');
  const palco = raiz.querySelector('.saber-palco');
  const pontos = raiz.querySelector('.saber-pontos');
  const contagem = raiz.querySelector('.saber-contagem');

  [{ id: '', nome: 'Todos' }].concat(dados.categorias).forEach(function (c) {
    if (c.id && !todos.some(function (x) { return x.categoria === c.id; })) return;
    const li = el('li'); const b = el('button', 'saber-filtro', c.nome);
    b.type = 'button'; b.setAttribute('aria-pressed', c.id === filtro ? 'true' : 'false');
    b.addEventListener('click', function () {
      filtro = c.id; lista = todos.filter(function (x) { return !filtro || x.categoria === filtro; }); atual = 0;
      filtros.querySelectorAll('.saber-filtro').forEach(function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false'); });
      mostrar(0);
    });
    li.appendChild(b); filtros.appendChild(li);
  });

  function mostrar(direcao) {
    const c = lista[atual]; const cat = cats[c.categoria] || {};
    const cartao = el('article', 'saber-cartao' + (direcao > 0 ? ' is-entrando' : direcao < 0 ? ' is-entrando-volta' : ''));
    cartao.setAttribute('aria-roledescription', 'cartão');
    const m = el('div', 'saber-mascote'); const img = el('img'); img.src = opcoes && opcoes.imagem ? opcoes.imagem(cat.mascote) : caminhoMascote + cat.mascote + '.webp'; img.alt = ''; m.appendChild(img);
    const corpo = el('div', 'saber-corpo');
    const et = el('div', 'saber-etiquetas');
    et.appendChild(el('span', 'pill pill-info', cat.nome || ''));
    if (c.publico && c.publico !== 'Todos') et.appendChild(el('span', 'pill pill-muted', c.publico));
    if (revisao && !c.conferido) et.appendChild(el('span', 'pill pill-waiting', 'A SEMEC precisa conferir'));
    corpo.appendChild(et);
    corpo.appendChild(el('h3', 'saber-titulo', c.titulo));
    corpo.appendChild(el('p', 'saber-texto', c.texto));
    const mais = el('button', 'saber-mais', 'Saiba mais'); mais.type = 'button'; mais.setAttribute('aria-expanded', 'false');
    const det = el('div', 'saber-detalhe'); det.hidden = true; det.id = 'saber-detalhe-' + c.id; mais.setAttribute('aria-controls', det.id);
    det.appendChild(el('p', '', c.detalhe));
    const f = el('p', 'saber-fonte', 'Onde está escrito: ');
    if (c.fonte.url) { const a = el('a', '', c.fonte.nome); a.href = c.fonte.url; a.target = '_blank'; a.rel = 'noopener'; f.appendChild(a); }
    else f.appendChild(document.createTextNode(c.fonte.nome));
    det.appendChild(f);
    mais.addEventListener('click', function () { const abrir = det.hidden; det.hidden = !abrir; mais.setAttribute('aria-expanded', String(abrir)); mais.textContent = abrir ? 'Mostrar menos' : 'Saiba mais'; });
    corpo.appendChild(mais); corpo.appendChild(det);
    cartao.appendChild(m); cartao.appendChild(corpo);
    palco.replaceChildren(cartao);

    pontos.replaceChildren();
    lista.forEach(function (x, i) {
      const p = el('button', 'saber-ponto'); p.type = 'button'; p.setAttribute('aria-label', 'Cartão ' + (i + 1) + ': ' + x.titulo);
      if (i === atual) p.setAttribute('aria-current', 'true');
      p.addEventListener('click', function () { ir(i - atual); }); pontos.appendChild(p);
    });
    contagem.textContent = (atual + 1) + ' de ' + lista.length;
  }

  function ir(passo) {
    if (!passo || lista.length < 2) return;
    atual = (atual + passo + lista.length) % lista.length; mostrar(passo);
  }
  raiz.querySelector('[data-saber="anterior"]').addEventListener('click', function () { ir(-1); });
  raiz.querySelector('[data-saber="proximo"]').addEventListener('click', function () { ir(1); });
  raiz.addEventListener('keydown', function (e) {
    if (e.target.closest('.saber-filtros')) return;
    if (e.key === 'ArrowRight') { ir(1); e.preventDefault(); } else if (e.key === 'ArrowLeft') { ir(-1); e.preventDefault(); }
  });
  let x0 = null;
  palco.addEventListener('pointerdown', function (e) { x0 = e.clientX; });
  palco.addEventListener('pointerup', function (e) { if (x0 === null) return; const dx = e.clientX - x0; x0 = null; if (Math.abs(dx) > 45) ir(dx < 0 ? 1 : -1); });
  // Começa num cartão diferente a cada dia, para a pessoa sempre ver algo novo.
  atual = Math.floor(Date.now() / 86400000) % lista.length;
  mostrar(0);
}
