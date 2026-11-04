/* Portal SEMEC — Área do Servidor: tela inicial. */
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };

  function aviso(titulo, texto, link, rotulo, alerta) {
    var n = document.createElement("div");
    n.className = "notice" + (alerta ? " is-warning" : "");
    var d = document.createElement("div");
    var s = document.createElement("strong"); s.textContent = titulo;
    var t = document.createElement("span"); t.textContent = texto + " ";
    d.appendChild(s); d.appendChild(t);
    if (link) { var a = document.createElement("a"); a.href = link; a.textContent = rotulo; t.appendChild(a); }
    n.appendChild(d);
    $("pendencias").appendChild(n);
  }

  document.addEventListener("servidor:pronto", function (ev) {
    var r = ev.detail;
    var a = r.atuacoes[0];
    $("onde-atua").textContent = a ? [a.cargo, a.escola].filter(Boolean).join(" · ") + (r.atuacoes.length > 1 ? " e mais " + (r.atuacoes.length - 1) : "")
      : "Sem atuação ativa no momento.";

    var foto = r.foto.situacao, cart = r.carteira;
    $("resumo-foto").textContent = foto === "ENVIADA" ? "Enviada" : foto === "RECUSADA" ? "Recusada" : "Falta";
    $("resumo-carteira").textContent = cart.emitida ? "Emitida" : "Aguardando";
    $("resumo-carteira-ano").textContent = "Carteira " + cart.ano;

    if (foto === "SEM") aviso("Falta a sua foto.", "Sem foto não há carteira nem registro de presença nas formações.", "perfil.html#foto", "Enviar foto", true);
    else if (foto === "RECUSADA") aviso("A sua escola recusou a foto.", "Envie outra seguindo as orientações.", "perfil.html#foto", "Enviar outra foto", true);
    else if (!cart.emitida) aviso("Foto enviada.", "Agora é com a sua escola: ela confere a foto e emite a sua carteira.", "", "", false);
    if (!r.servidor.podeInscrever) aviso("Você não aparece no quadro de nenhuma escola.", "Você continua vendo seus dados e certificados. Para participar das formações, fale com a sua escola.", "", "", true);

    var bloco = document.querySelector(".saber");
    fetch("dados/voce-sabia.json", { cache: "no-cache" }).then(function (x) { return x.ok ? x.json() : null; })
      .then(function (d) { if (d) iniciarVoceSabia(bloco, d); else bloco.hidden = true; })
      .catch(function () { bloco.hidden = true; });
  });
})();
