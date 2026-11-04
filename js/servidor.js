/*
  Portal SEMEC — sessão do servidor (CPF + código pessoal).

  Conversa com o Apps Script público "Acesso do Servidor". O navegador guarda
  só o token da sessão (nunca CPF ou código):
    - aparelho próprio: localStorage, vale em todas as abas e depois de fechar
      o navegador (30 dias sem uso, renovado a cada uso);
    - computador compartilhado: sessionStorage, termina ao fechar o navegador.
  Quem decide se a sessão vale é sempre o backend.
*/

(function () {
  "use strict";

  // Endereço da implantação pública "Acesso do Servidor" (termina em /exec).
  // Vazio = entrada do servidor fechada ("abre em janeiro de 2027"). Preenchido em 04/11/2026 para o teste real com uma escola.
  var URL_API = "https://script.google.com/macros/s/AKfycbxfQk-yTMqpuSz-QDxnzpBwp0JxOpjH8zkhAKmK2R4pr86C_e7zwM4GnP9mJjzSDvKbUg/exec";

  var CHAVE = "portalSemecServidor";
  var CHAVE_VOLTA = "portalSemecServidorVolta";
  var LIMITE_MS = 30000;

  function tokenValido(t) { return /^[a-f0-9]{64}$/.test(String(t || "")); }

  function ler(armazem) {
    try { return window[armazem].getItem(CHAVE) || ""; } catch (e) { return ""; }
  }
  function token() {
    var t = ler("sessionStorage") || ler("localStorage");
    return tokenValido(t) ? t : "";
  }
  function guardar(t, compartilhado) {
    limpar();
    try { window[compartilhado ? "sessionStorage" : "localStorage"].setItem(CHAVE, t); } catch (e) { /* sem armazenamento: vale só nesta página */ }
  }
  function limpar() {
    ["sessionStorage", "localStorage"].forEach(function (a) { try { window[a].removeItem(CHAVE); } catch (e) { /* nada */ } });
  }

  /* text/plain evita a pergunta prévia de CORS; o Apps Script lê o corpo como texto. */
  function chamar(corpo) {
    if (!URL_API) return Promise.reject(new Error("FECHADO"));
    var controle = typeof AbortController === "function" ? new AbortController() : null;
    var tempo = setTimeout(function () { if (controle) controle.abort(); }, LIMITE_MS);
    return fetch(URL_API, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(corpo),
      signal: controle ? controle.signal : undefined
    }).then(function (r) {
      if (!r.ok) throw new Error("Não foi possível falar com o Portal agora. Tente de novo em instantes.");
      return r.json();
    }).catch(function (e) {
      if (e && e.message === "FECHADO") throw e;
      if (e && e.name === "AbortError") throw new Error("O Portal demorou para responder. Confira a internet e tente de novo.");
      throw e && e.message && e.message.indexOf("Portal") >= 0 ? e : new Error("Sem conexão com o Portal. Confira a internet e tente de novo.");
    }).finally(function () { clearTimeout(tempo); });
  }

  function entrar(cpf, codigo, compartilhado) {
    return chamar({ acao: "entrar", cpf: cpf, codigo: codigo, compartilhado: !!compartilhado }).then(function (r) {
      if (!r.ok) throw new Error(r.erro || "Não foi possível entrar.");
      guardar(r.token, r.compartilhado);
      return r.servidor;
    });
  }

  /*
    Para as páginas do servidor: confere a sessão; sem sessão, guarda a página
    atual e manda para a entrada (que devolve a pessoa para cá depois).
  */
  function exigirSessao() {
    var t = token();
    var irParaEntrada = function (terminou) {
      try { sessionStorage.setItem(CHAVE_VOLTA, location.pathname.split("/").pop() + location.search); } catch (e) { /* segue */ }
      limpar();
      location.replace("entrar.html" + (terminou ? "?sessao=terminou" : ""));
      return new Promise(function () {});
    };
    if (!t) return irParaEntrada(false);
    return chamar({ acao: "sessao", token: t }).then(function (r) {
      if (!r.ok) return irParaEntrada(true);
      return r.servidor;
    });
  }

  function sair() {
    var t = token();
    limpar();
    var fim = function () { location.replace("entrar.html?saiu=1"); };
    if (!t) { fim(); return; }
    chamar({ acao: "sair", token: t }).then(fim, fim);
  }

  /* Página para onde voltar depois de entrar (só páginas deste site). */
  function destinoDepoisDeEntrar() {
    var volta = "";
    try { volta = sessionStorage.getItem(CHAVE_VOLTA) || ""; sessionStorage.removeItem(CHAVE_VOLTA); } catch (e) { /* segue */ }
    return /^[a-z0-9-]+\.html(\?[\w=&-]*)?$/i.test(volta) && volta.indexOf("entrar.html") !== 0 ? volta : "servidor.html";
  }

  window.PortalServidor = {
    aberto: function () { return !!URL_API; },
    temSessao: function () { return !!token(); },
    entrar: entrar,
    exigirSessao: exigirSessao,
    sair: sair,
    destinoDepoisDeEntrar: destinoDepoisDeEntrar,
    chamar: function (acao, dados) {
      var corpo = Object.assign({ acao: acao, token: token() }, dados || {});
      return chamar(corpo).then(function (r) {
        if (!r.ok && r.sessao === "TERMINOU") return exigirSessao();
        if (!r.ok) throw new Error(r.erro || "Não foi possível concluir agora.");
        return r;
      });
    }
  };
})();
