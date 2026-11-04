/*
  Portal SEMEC — página de entrada do servidor (CPF + código pessoal).
*/

(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };
  var S = window.PortalServidor;

  function mensagem(texto, tipo) {
    var m = $("mensagem");
    m.textContent = "";
    if (!texto) return;
    var p = document.createElement("p");
    p.className = "alert" + (tipo ? " is-" + tipo : "");
    p.textContent = texto;
    m.appendChild(p);
  }

  if (!S.aberto()) {
    $("fechado").hidden = false;
    $("mascote").src = "assets/mascote/tangara-aguardando.webp";
    return;
  }
  $("form").hidden = false;

  // Quem já está conectado neste aparelho vai direto para a sua área.
  if (S.temSessao() && location.search.indexOf("sessao=terminou") < 0) {
    location.replace(S.destinoDepoisDeEntrar());
    return;
  }

  var params = new URLSearchParams(location.search);
  if (params.get("sessao") === "terminou") {
    mensagem("Sua sessão terminou. Entre novamente.");
    $("mascote").src = "assets/mascote/tangara-sessao-expirada.webp";
  } else if (params.get("saiu")) {
    mensagem("Você saiu do Portal neste aparelho.", "success");
  }

  $("cpf").addEventListener("input", function () {
    var d = this.value.replace(/\D/g, "").slice(0, 11);
    this.value = d.replace(/^(\d{3})(\d)/, "$1.$2").replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3").replace(/\.(\d{3})(\d)/, ".$1-$2");
  });
  $("codigo").addEventListener("input", function () {
    var c = this.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8);
    this.value = c.length > 4 ? c.slice(0, 4) + "-" + c.slice(4) : c;
  });

  $("form").addEventListener("submit", function (ev) {
    ev.preventDefault();
    var cpf = $("cpf").value.replace(/\D/g, "");
    var codigo = $("codigo").value.replace(/[^A-Za-z0-9]/g, "");
    if (cpf.length !== 11) { mensagem("Digite os 11 números do CPF.", "error"); $("cpf").focus(); return; }
    if (codigo.length !== 8) { mensagem("O código pessoal tem 8 letras e números, como está no folheto.", "error"); $("codigo").focus(); return; }

    var botao = $("entrar");
    botao.disabled = true;
    botao.textContent = "Entrando…";
    mensagem("");
    S.entrar(cpf, codigo, $("compartilhado").checked).then(function () {
      location.replace(S.destinoDepoisDeEntrar());
    }).catch(function (e) {
      mensagem(e.message, "error");
      $("codigo").value = "";
      $("codigo").focus();
      botao.disabled = false;
      botao.textContent = "Entrar";
    });
  });
})();
