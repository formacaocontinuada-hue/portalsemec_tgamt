/* Portal SEMEC — Área do Servidor: Meu perfil (contato, nascimento e foto). */
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };
  var S = window.PortalServidor;
  var novaFoto = "";

  function mensagem(id, texto, tipo) {
    var m = $(id); m.textContent = "";
    if (!texto) return;
    var p = document.createElement("p");
    p.className = "alert" + (tipo ? " is-" + tipo : "");
    p.textContent = texto;
    m.appendChild(p);
  }
  function telefoneFormatado(d) {
    d = String(d || "").replace(/\D/g, "").slice(0, 11);
    if (d.length <= 2) return d;
    if (d.length <= 6) return "(" + d.slice(0, 2) + ") " + d.slice(2);
    var meio = d.length === 11 ? 7 : 6;
    return "(" + d.slice(0, 2) + ") " + d.slice(2, meio) + "-" + d.slice(meio);
  }

  function mostrarFoto(f) {
    var rotulos = { SEM: ["pill pill-waiting", "Falta enviar"], ENVIADA: ["pill pill-ok", "Enviada"], RECUSADA: ["pill pill-danger", "Recusada pela escola"] };
    var r = rotulos[f.situacao] || rotulos.SEM;
    var pill = document.createElement("span"); pill.className = r[0]; pill.textContent = r[1];
    $("foto-situacao").replaceChildren(pill);
    $("foto-texto").textContent = !f.podeEnviar
      ? "A sua carteira deste ano já foi emitida. A foto só pode ser trocada no início do próximo ano."
      : f.situacao === "RECUSADA" ? "A sua escola recusou a foto. Envie outra seguindo as orientações abaixo."
      : f.situacao === "ENVIADA" ? "Foto enviada em " + f.data + ". Você ainda pode trocar até a escola emitir a carteira deste ano."
      : "A foto é obrigatória para a carteira. Ela é mostrada para conferência na presença das formações.";
    $("foto-acoes").hidden = !f.podeEnviar;
  }

  /* Recorta no centro em 3:4 e reduz para 600 × 800, em JPG. */
  function prepararFoto(arquivo) {
    return new Promise(function (ok, falha) {
      if (!/^image\/(jpeg|png)$/.test(arquivo.type)) { falha(new Error("Escolha uma foto em JPG ou PNG.")); return; }
      var url = URL.createObjectURL(arquivo);
      var img = new Image();
      img.onload = function () {
        var alvo = 3 / 4, w = img.naturalWidth, h = img.naturalHeight;
        var cw = w / h > alvo ? h * alvo : w, ch = w / h > alvo ? h : w / alvo;
        var c = document.createElement("canvas"); c.width = 600; c.height = 800;
        c.getContext("2d").drawImage(img, (w - cw) / 2, (h - ch) / 2, cw, ch, 0, 0, 600, 800);
        URL.revokeObjectURL(url);
        ok(c.toDataURL("image/jpeg", 0.86));
      };
      img.onerror = function () { URL.revokeObjectURL(url); falha(new Error("Não foi possível abrir esta foto. Tente outra.")); };
      img.src = url;
    });
  }

  document.addEventListener("servidor:pronto", function (ev) {
    var r = ev.detail, d = r.dados;
    $("d-nome").textContent = d.nomeSocial ? d.nomeSocial + " (" + d.nome + ")" : d.nome;
    $("d-cpf").textContent = d.cpf;
    $("d-matricula").textContent = d.matricula || "Não informada";
    $("d-atuacoes").textContent = r.atuacoes.length
      ? r.atuacoes.map(function (a) { return [a.escola, a.cargo, a.vinculo].filter(Boolean).join(" · "); }).join(" | ")
      : "Sem atuação ativa no momento.";
    $("email").value = d.email;
    $("telefone").value = telefoneFormatado(d.telefone);
    $("nascimento").value = d.dataNascimento;
    $("nascimento").max = new Date().getFullYear() - 14 + "-12-31";
    mostrarFoto(r.foto);
  });

  $("telefone").addEventListener("input", function () { this.value = telefoneFormatado(this.value); });

  $("form-perfil").addEventListener("submit", function (ev) {
    ev.preventDefault();
    var b = $("perfil-salvar");
    b.disabled = true; b.textContent = "Salvando…";
    mensagem("perfil-mensagem", "");
    S.chamar("salvarPerfil", {
      email: $("email").value.trim(),
      telefone: $("telefone").value.replace(/\D/g, ""),
      dataNascimento: $("nascimento").value
    }).then(function (r) {
      if (r) mensagem("perfil-mensagem", r.salvo ? "Dados salvos." : "Nada mudou.", "success");
    }).catch(function (e) { mensagem("perfil-mensagem", e.message, "error"); })
      .finally(function () { b.disabled = false; b.textContent = "Salvar"; });
  });

  $("foto-arquivo").addEventListener("change", function () {
    var arquivo = this.files && this.files[0];
    this.value = "";
    if (!arquivo) return;
    mensagem("foto-mensagem", "");
    prepararFoto(arquivo).then(function (dados) {
      novaFoto = dados;
      var img = document.createElement("img"); img.src = dados; img.alt = "Foto escolhida";
      $("foto-previa").replaceChildren(img);
      $("foto-enviar").hidden = false;
      mensagem("foto-mensagem", "Confira a foto. Se estiver boa, clique em Enviar foto.");
    }).catch(function (e) { mensagem("foto-mensagem", e.message, "error"); });
  });

  $("foto-enviar").addEventListener("click", function () {
    if (!novaFoto) return;
    var b = this;
    b.disabled = true; b.textContent = "Enviando…";
    S.chamar("enviarFoto", { imagem: novaFoto }).then(function (r) {
      if (!r) return;
      novaFoto = "";
      b.hidden = true;
      S.avatar(r.servidor.nome, r.foto.imagem);
      mostrarFoto(r.foto);
      mensagem("foto-mensagem", "Foto enviada. A sua escola vai conferir.", "success");
    }).catch(function (e) { mensagem("foto-mensagem", e.message, "error"); })
      .finally(function () { b.disabled = false; b.textContent = "Enviar foto"; });
  });
})();
