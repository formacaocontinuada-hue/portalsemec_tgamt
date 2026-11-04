/* Portal SEMEC — Área do Servidor: Meus certificados (só leitura do registro oficial). */
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };
  var S = window.PortalServidor;

  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt !== undefined) e.textContent = txt; return e; }
  function mensagem(texto, tipo) {
    var m = $("cert-mensagem"); m.textContent = "";
    if (texto) m.appendChild(el("p", "alert" + (tipo ? " is-" + tipo : ""), texto));
  }
  function pdfDe(base64) {
    var bin = atob(base64), bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new Blob([bytes], { type: "application/pdf" });
  }

  function abrir(c, modo, botao) {
    // A aba é aberta já no clique (senão o navegador bloqueia); o PDF entra quando chegar.
    var aba = modo === "ver" ? window.open("", "_blank") : null;
    var texto = botao.textContent;
    botao.disabled = true; botao.textContent = "Carregando…";
    mensagem("");
    S.chamar("certificado", { id: c.id, modo: modo }).then(function (r) {
      if (!r) return;
      var url = URL.createObjectURL(pdfDe(r.pdf));
      if (aba) { aba.location.href = url; }
      else {
        var a = el("a"); a.href = url; a.download = r.nome;
        document.body.appendChild(a); a.click();
        setTimeout(function () { a.remove(); }, 1000); // remover na hora faz alguns navegadores perderem o nome do arquivo
      }
      setTimeout(function () { URL.revokeObjectURL(url); }, 60000);
    }).catch(function (e) {
      if (aba) aba.close();
      mensagem(e.message, "error");
    }).finally(function () { botao.disabled = false; botao.textContent = texto; });
  }

  document.addEventListener("servidor:pronto", function (ev) {
    var lista = ev.detail.certificados || [];
    $("cert-total").textContent = lista.length ? lista.length + (lista.length === 1 ? " certificado" : " certificados") : "";
    $("cert-vazio").hidden = lista.length > 0;
    var ul = $("cert-lista");
    lista.forEach(function (c) {
      var li = el("li");
      var info = el("div");
      info.appendChild(el("strong", "", c.formacao || "Certificado"));
      info.appendChild(el("small", "", [c.etapa, c.ano, c.cargaHoraria ? c.cargaHoraria + " h" : "", c.data ? "emitido em " + c.data : ""].filter(Boolean).join(" · ")));
      if (c.codigo) info.appendChild(el("small", "", "Código de autenticidade: " + c.codigo));
      var acoes = el("div", "cert-acoes");
      if (c.temPdf) {
        var ver = el("button", "button button-ghost", "Ver"); ver.type = "button";
        ver.addEventListener("click", function () { abrir(c, "ver", ver); });
        var baixar = el("button", "button button-primary", "Baixar"); baixar.type = "button";
        baixar.addEventListener("click", function () { abrir(c, "baixar", baixar); });
        acoes.appendChild(ver); acoes.appendChild(baixar);
      } else {
        acoes.appendChild(el("span", "pill pill-waiting", "PDF em preparação"));
      }
      if (c.validacao) {
        var v = el("a", "", "Validar"); v.href = c.validacao; v.target = "_blank"; v.rel = "noopener";
        acoes.appendChild(v);
      }
      li.appendChild(info); li.appendChild(acoes);
      ul.appendChild(li);
    });
  });
})();
