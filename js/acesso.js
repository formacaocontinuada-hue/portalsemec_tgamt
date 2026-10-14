/*
  Portal SEMEC — entrada com a conta institucional.

  Usa o mesmo backend (Apps Script) e a mesma autorização da Central de Certificados:
    1. "Entrar" leva à página de entrada do Apps Script (só contas do domínio).
    2. O Google confirma a conta e devolve a pessoa para cá com uma autorização
       temporária no fragmento (#entrada=...&nonce=...&exp=...).
    3. A unidade é identificada pelo backend (IDENTIFICAR_UNIDADE). O navegador
       nunca decide sozinho quem é a unidade.

  Portal e Central ficam no mesmo endereço base (formacaocontinuada-hue.github.io),
  por isso a autorização é guardada com a mesma chave: quem entrou em um já está
  identificado no outro. Nenhum dado pessoal é guardado aqui, só a autorização
  temporária emitida pelo backend.
*/

(function () {
  "use strict";

  var CANAL = "CENTRAL_CERTIFICADOS_SEMEC";
  var URL_ENTRADA = "https://script.google.com/a/macros/edu.tangaradaserra.mt.gov.br/s/AKfycbwBzokI4suZwZmEOJilCJ2N6y7PfWEH26hlJaYdfqCYb6m6VO7JK_-ktGwMlO2MYus/exec";
  var URL_API = "https://script.google.com/macros/s/AKfycbx7ad67DJu8S4IJ7PPpaVvd7ihOHdGnvEKlyDSj5m2grQi7LrO3cZcnBq1Roer918I0/exec";

  var CHAVE_SESSAO = "centralCertificadosEntrada";
  var CHAVE_NONCE = "centralCertificadosNonceEntrada";
  var MARGEM_MS = 60 * 1000;
  var LIMITE_MS = 30000;

  var memoria = null;

  function tokenValido(token) {
    return /^[a-f0-9]{64}$/.test(String(token || ""));
  }

  function lerSessao() {
    var sessao = memoria;
    try {
      sessao = JSON.parse(localStorage.getItem(CHAVE_SESSAO) || "null") || sessao;
    } catch (e) { /* armazenamento indisponível: usa a memória da página */ }
    if (sessao && tokenValido(sessao.token) && Number(sessao.exp) > Date.now() + MARGEM_MS) {
      return sessao;
    }
    return null;
  }

  function salvarSessao(token, exp) {
    memoria = { token: token, exp: Number(exp) };
    try { localStorage.setItem(CHAVE_SESSAO, JSON.stringify(memoria)); } catch (e) { /* segue na memória */ }
  }

  function limparSessao() {
    memoria = null;
    try { localStorage.removeItem(CHAVE_SESSAO); } catch (e) { /* nada a limpar */ }
  }

  /* Retorno da página de entrada ---------------------------------------- */
  function lerRetorno() {
    var fragmento = window.location.hash.replace(/^#/, "");
    if (fragmento.indexOf("entrada=") === -1) return;

    var p = new URLSearchParams(fragmento);
    var token = p.get("entrada");
    var nonce = p.get("nonce");
    var exp = Number(p.get("exp"));
    var esperado = "";
    try {
      esperado = sessionStorage.getItem(CHAVE_NONCE) || "";
      sessionStorage.removeItem(CHAVE_NONCE);
    } catch (e) { esperado = ""; }

    // Tira a autorização do endereço e do histórico.
    window.history.replaceState(null, "", window.location.pathname + window.location.search);

    if (tokenValido(token) && nonce && esperado && nonce === esperado && exp > Date.now()) {
      salvarSessao(token, exp);
    }
  }

  lerRetorno();

  function gerarNonce() {
    var bytes = new Uint8Array(32);
    window.crypto.getRandomValues(bytes);
    return Array.prototype.map.call(bytes, function (b) { return b.toString(16).padStart(2, "0"); }).join("");
  }

  /* Ações públicas -------------------------------------------------------- */
  function entrar() {
    var nonce = gerarNonce();
    try {
      sessionStorage.setItem(CHAVE_NONCE, nonce);
    } catch (e) {
      return Promise.reject(erro(
        "Este navegador está bloqueando o armazenamento da página. Saia do modo de navegação privada ou use outro navegador.",
        "ARMAZENAMENTO_BLOQUEADO"
      ));
    }
    var destino = new URL(URL_ENTRADA);
    destino.searchParams.set("modo", "entrar");
    destino.searchParams.set("nonce", nonce);
    destino.searchParams.set("retorno", window.location.origin + window.location.pathname);
    window.location.assign(destino.href);
    return new Promise(function () {});
  }

  function sair() {
    var sessao = lerSessao();
    limparSessao();
    if (!sessao) return;
    try {
      fetch(URL_API, {
        method: "POST",
        keepalive: true,
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ canal: CANAL, acao: "SAIR", token: sessao.token })
      }).catch(function () {});
    } catch (e) { /* a autorização já saiu do navegador */ }
  }

  function erro(mensagem, codigo) {
    var e = new Error(mensagem);
    e.codigo = codigo;
    return e;
  }

  function pedir(acao, dados) {
    var sessao = lerSessao();
    if (!sessao) return Promise.reject(erro("Entre com a conta institucional.", "SEM_SESSAO"));

    var controle = new AbortController();
    var limite = window.setTimeout(function () { controle.abort(); }, LIMITE_MS);

    return fetch(URL_API, {
      method: "POST",
      redirect: "follow",
      signal: controle.signal,
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ canal: CANAL, acao: acao, dados: dados || {}, token: sessao.token })
    })
      .then(function (http) { return http.json(); })
      .catch(function (e) {
        throw erro(
          e && e.name === "AbortError"
            ? "O serviço demorou para responder. Tente novamente."
            : "Não foi possível falar com o serviço da SEMEC. Verifique a conexão e tente novamente.",
          "FALHA_CONEXAO"
        );
      })
      .then(function (resposta) {
        window.clearTimeout(limite);
        if (!resposta || resposta.ok === false) {
          var codigo = (resposta && resposta.codigo) || "ERRO_SERVICO";
          if (codigo === "SESSAO_INVALIDA") limparSessao();
          throw erro((resposta && (resposta.mensagem || resposta.erro)) || "O serviço não concluiu a solicitação.", codigo);
        }
        var resultado = resposta.resultado || resposta.result || resposta;
        if (resultado.ok === false) {
          throw erro(resultado.mensagem || "O serviço não concluiu a solicitação.", resultado.codigo || "ERRO_SERVICO");
        }
        return resultado;
      }, function (e) {
        window.clearTimeout(limite);
        throw e;
      });
  }

  /* Devolve { id, tipo: "ESCOLA" | "SEMEC", nome } conferido pelo backend. */
  function identificar() {
    return pedir("IDENTIFICAR_UNIDADE").then(function (r) {
      var u = r.unidade;
      if (r.acessoInstitucionalAutorizado === false || !u) {
        throw erro("Esta conta não está autorizada para as áreas de trabalho do Portal.", "ACESSO_NAO_AUTORIZADO");
      }
      return {
        id: String(u.idEscola || u.idUnidade || u.codigo || "").trim(),
        tipo: String(u.tipo || r.perfilAcesso || "").toUpperCase(),
        nome: String(u.nome || "").trim()
      };
    });
  }

  window.PortalAcesso = Object.freeze({
    temSessao: function () { return Boolean(lerSessao()); },
    entrar: entrar,
    sair: sair,
    identificar: identificar
  });
})();
