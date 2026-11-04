/* Portal SEMEC — Área do Servidor: Minha carteira. */
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };
  function estado(mascote, titulo, texto, botao) {
    $("c-mascote").src = "assets/mascote/" + mascote + ".webp";
    $("c-titulo").textContent = titulo;
    $("c-texto").textContent = texto;
    $("c-botao").hidden = !botao;
    if (botao) $("c-botao").textContent = botao;
  }
  document.addEventListener("servidor:pronto", function (ev) {
    var r = ev.detail, c = r.carteira, f = r.foto;
    if (c.emitida && r.imagem) {
      $("c-digital").hidden = false;
      $("c-estado").hidden = true;
      $("c-digital-ano").textContent = "Validade " + c.ano;
      $("c-imagem").src = r.imagem;
      $("c-qr").src = r.qr;
      // Tamanho grande numa aba nova (a imagem já está na página; nada vai para outro site).
      $("c-imagem").addEventListener("click", function () {
        var aba = window.open("", "_blank");
        if (!aba) return;
        aba.document.title = "Carteira " + c.ano;
        var img = aba.document.createElement("img");
        img.src = r.imagem; img.alt = "Carteira"; img.style.cssText = "width:100%;height:auto;display:block";
        aba.document.body.style.cssText = "margin:0;background:#031f49";
        aba.document.body.appendChild(img);
      });
      return;
    }
    if (c.emitida) estado("tangara-boas-vindas", "Carteira " + c.ano + " emitida",
      "A sua escola emitiu a carteira em " + c.data + ". Retire a carteira impressa na sua escola.", "");
    else if (f.situacao === "SEM") estado("tangara-aguardando", "Falta a sua foto",
      "Envie a sua foto para que a escola possa emitir a sua carteira de " + c.ano + ".", "Enviar minha foto");
    else if (f.situacao === "RECUSADA") estado("tangara-aguardando", "A escola recusou a sua foto",
      "Envie outra foto seguindo as orientações do perfil.", "Enviar outra foto");
    else estado("tangara-aguardando", "Aguardando a emissão",
      "A sua foto foi enviada em " + f.data + ". A sua escola confere e emite a carteira de " + c.ano + ".", "");
  });
})();
