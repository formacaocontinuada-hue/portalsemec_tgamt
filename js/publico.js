/*
  Portal SEMEC — página pública.
  Menu do celular (mesmo comportamento do Portal aprovado) e lista
  "Áreas de trabalho" do cabeçalho.
*/

(function () {
  "use strict";

  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("public-mobile-menu");
  if (!toggle || !nav) return;

  var celular = window.matchMedia("(max-width: 1180px)");
  var timer = null;

  var fundo = document.createElement("button");
  fundo.type = "button";
  fundo.className = "public-menu-backdrop";
  fundo.setAttribute("aria-label", "Fechar menu");
  fundo.hidden = true;
  document.body.appendChild(fundo);

  function mostrarFundo(aberto) {
    window.clearTimeout(timer);
    if (aberto) {
      fundo.hidden = false;
      window.requestAnimationFrame(function () { fundo.classList.add("is-open"); });
      return;
    }
    fundo.classList.remove("is-open");
    timer = window.setTimeout(function () {
      if (!fundo.classList.contains("is-open")) fundo.hidden = true;
    }, 280);
  }

  function abrir(aberto, devolverFoco) {
    toggle.classList.toggle("is-open", aberto);
    nav.classList.toggle("is-open", aberto);
    toggle.setAttribute("aria-expanded", String(aberto));
    toggle.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    document.body.classList.toggle("menu-open", aberto && celular.matches);
    mostrarFundo(aberto && celular.matches);
    if (!aberto && devolverFoco) toggle.focus();
  }

  toggle.addEventListener("click", function () { abrir(!nav.classList.contains("is-open")); });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) abrir(false); });
  fundo.addEventListener("click", function () { abrir(false, true); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("is-open")) abrir(false, true);
  });
  window.addEventListener("resize", function () { if (!celular.matches) abrir(false); });
})();

(function () {
  "use strict";

  var botao = document.querySelector(".areas-menu .server-button");
  var lista = document.getElementById("areas-lista");
  if (!botao || !lista) return;

  function abrir(aberta) {
    lista.hidden = !aberta;
    botao.setAttribute("aria-expanded", String(aberta));
  }

  botao.addEventListener("click", function () { abrir(lista.hidden); });
  document.addEventListener("click", function (e) {
    if (!lista.hidden && !e.target.closest(".areas-menu")) abrir(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !lista.hidden) {
      abrir(false);
      botao.focus();
    }
  });
})();
