/*
  Portal SEMEC — Área do Servidor: comum a todas as páginas da área.
  A página diz o que pede ao backend em <body data-servidor-acao="inicio|perfil|carteira">.
  Mostra a porta ("Verificando o acesso") até o backend confirmar a sessão; sem sessão,
  manda para entrar.html, que devolve a pessoa para esta página depois.
  A página recebe os dados no evento "servidor:pronto" (event.detail = resposta).
*/

(function () {
  "use strict";

  var S = window.PortalServidor;
  var porta = document.getElementById("porta");
  var area = document.getElementById("area");

  function iniciais(nome) {
    var p = String(nome || "").trim().split(/\s+/);
    return ((p[0] || "")[0] || "") + (p.length > 1 ? (p[p.length - 1][0] || "") : "");
  }

  /* Foto (ou iniciais) em todos os [data-avatar] da página. */
  function avatar(nome, imagem) {
    document.querySelectorAll("[data-avatar]").forEach(function (el) {
      el.replaceChildren();
      if (imagem) {
        var img = document.createElement("img");
        img.src = imagem;
        img.alt = "Sua foto";
        el.appendChild(img);
      } else {
        el.textContent = iniciais(nome).toUpperCase();
      }
    });
  }

  function falhou(titulo, texto) {
    document.getElementById("porta-mascote").src = "assets/mascote/tangara-erro.webp";
    document.getElementById("porta-titulo").textContent = titulo;
    document.getElementById("porta-texto").textContent = texto;
    document.getElementById("porta-tentar").hidden = false;
  }

  document.querySelectorAll("[data-sair]").forEach(function (b) {
    b.addEventListener("click", function () { b.disabled = true; S.sair(); });
  });
  var tentar = document.getElementById("porta-tentar");
  if (tentar) tentar.addEventListener("click", function () { location.reload(); });

  if (!S.aberto() || !S.temSessao()) { S.exigirSessao(); return; }

  S.chamar(document.body.dataset.servidorAcao).then(function (r) {
    if (!r) return; // sessão terminou: já está indo para a entrada
    document.querySelectorAll("[data-servidor-nome]").forEach(function (el) { el.textContent = r.servidor.nome; });
    document.querySelectorAll("[data-servidor-primeiro]").forEach(function (el) { el.textContent = r.servidor.primeiroNome; });
    avatar(r.servidor.nome, r.foto && r.foto.imagem);
    porta.hidden = true;
    area.hidden = false;
    window.PortalServidor.avatar = avatar;
    document.dispatchEvent(new CustomEvent("servidor:pronto", { detail: r }));
  }).catch(function (e) {
    falhou("Não foi possível abrir", e.message || "Tente de novo em instantes.");
  });
})();
