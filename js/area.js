/*
  Portal SEMEC — porta e identificação das áreas de trabalho.
  A página diz qual área é em <body data-area-trabalho="escola|semec">.
  Mostra a porta até o backend confirmar a unidade; depois mostra a área
  com o nome e o brasão da unidade (dados/escolas.json).
*/

(function () {
  "use strict";

  var AREAS = {
    escola: {
      nome: "Área da Escola",
      tipos: ["ESCOLA", "SEMEC"],
      entrar: "Entre com a conta institucional da sua unidade (@edu.tangaradaserra.mt.gov.br).",
      outraArea: null
    },
    semec: {
      nome: "Área da SEMEC",
      tipos: ["SEMEC"],
      entrar: "Entre com a conta institucional do seu setor na SEMEC (@edu.tangaradaserra.mt.gov.br).",
      outraArea: {
        texto: "Esta área é das equipes da SEMEC. A conta da sua escola usa a Área da Escola.",
        botao: "Ir para a Área da Escola",
        endereco: "escola.html"
      }
    }
  };

  var acesso = window.PortalAcesso;
  var config = AREAS[document.body.dataset.areaTrabalho];
  var porta = document.getElementById("porta");
  var area = document.getElementById("area");
  var botao = document.getElementById("porta-botao");

  var ESTADOS = {
    verificando: {
      mascote: "tangara-carregando", titulo: "Verificando o acesso",
      texto: "Aguarde um instante.", botao: false
    },
    entrar: {
      mascote: "tangara-login", titulo: "Entrar no Portal",
      texto: config.entrar, botao: "Entrar com a conta institucional"
    },
    expirada: {
      mascote: "tangara-sessao-expirada", titulo: "Sua entrada expirou",
      texto: "Por segurança, entre novamente com a conta institucional.",
      botao: "Entrar novamente"
    },
    negado: {
      mascote: "tangara-acesso-negado", titulo: "Acesso não autorizado",
      texto: "Esta conta não está cadastrada para as áreas de trabalho do Portal. Use a conta institucional da sua unidade.",
      botao: "Entrar com outra conta"
    },
    outraArea: {
      mascote: "tangara-acesso-negado", titulo: "Esta área é de outra equipe",
      texto: config.outraArea && config.outraArea.texto,
      botao: config.outraArea && config.outraArea.botao
    }
  };

  function mostrarPorta(nome, alerta) {
    var e = ESTADOS[nome];
    porta.hidden = false;
    porta.dataset.estado = nome;
    area.hidden = true;
    document.getElementById("porta-mascote").src = "assets/mascote/" + e.mascote + ".webp";
    document.getElementById("porta-titulo").textContent = e.titulo;
    document.getElementById("porta-texto").textContent = e.texto;
    var caixaAlerta = document.getElementById("porta-alerta");
    caixaAlerta.textContent = alerta || "";
    caixaAlerta.hidden = !alerta;
    botao.hidden = !e.botao;
    botao.textContent = e.botao || "";
    document.getElementById("porta-ajuda").hidden = !e.botao || nome === "outraArea";
    if (e.botao) botao.focus();
  }

  function mostrarArea() {
    porta.hidden = true;
    area.hidden = false;
  }

  function aviso(titulo, texto) {
    var caixa = document.getElementById("area-aviso");
    document.getElementById("area-aviso-titulo").textContent = titulo || "";
    document.getElementById("area-aviso-texto").textContent = texto || "";
    caixa.hidden = !titulo;
  }

  function aplicarUnidade(unidade, catalogo) {
    var registro = null;
    (catalogo.unidades || []).forEach(function (u) { if (u.id === unidade.id) registro = u; });

    var semec = unidade.tipo === "SEMEC";
    var nome;
    if (semec && config === AREAS.escola) nome = "Secretaria Municipal de Educação";
    else nome = (registro && registro.nome) || unidade.nome || "Unidade";
    var brasao = semec || !registro ? "assets/marca/brasao-tangara.webp" : registro.brasao;

    document.querySelectorAll("[data-unidade-nome]").forEach(function (el) { el.textContent = nome; });
    document.querySelectorAll("[data-unidade-brasao]").forEach(function (img) {
      img.src = brasao;
      img.alt = "Brasão de " + nome;
    });
    document.title = config.nome + " — " + nome + " | Portal SEMEC";

    if (semec && config === AREAS.escola) {
      aviso("Visão da SEMEC", "Você entrou com uma conta da SEMEC e está vendo a Área da Escola como as unidades veem.");
    }
  }

  function iniciar() {
    if (!acesso) {
      mostrarPorta("entrar", "Os arquivos do Portal não carregaram. Atualize a página.");
      return;
    }
    if (!acesso.temSessao()) {
      mostrarPorta("entrar");
      return;
    }

    mostrarPorta("verificando");

    Promise.all([
      acesso.identificar(),
      fetch("dados/escolas.json", { cache: "no-cache" }).then(function (r) { return r.ok ? r.json() : {}; }).catch(function () { return {}; })
    ])
      .then(function (resultado) {
        var unidade = resultado[0];
        if (config.tipos.indexOf(unidade.tipo) === -1) {
          mostrarPorta("outraArea");
          return;
        }
        aplicarUnidade(unidade, resultado[1]);
        mostrarArea();
      })
      .catch(function (e) {
        if (e.codigo === "ACESSO_NAO_AUTORIZADO") {
          acesso.sair();
          mostrarPorta("negado");
        } else if (e.codigo === "SEM_SESSAO" || e.codigo === "SESSAO_INVALIDA") {
          mostrarPorta("expirada");
        } else {
          mostrarPorta("entrar", e.message || "Não foi possível confirmar o acesso. Tente novamente.");
          botao.textContent = "Tentar novamente";
          botao.dataset.repetir = "1";
        }
      });
  }

  botao.addEventListener("click", function () {
    if (botao.dataset.repetir) {
      delete botao.dataset.repetir;
      iniciar();
      return;
    }
    if (porta.dataset.estado === "outraArea") {
      window.location.assign(config.outraArea.endereco);
      return;
    }
    if (porta.dataset.estado === "negado") acesso.sair();
    acesso.entrar().catch(function (e) { mostrarPorta(porta.dataset.estado, e.message); });
  });

  document.querySelectorAll("[data-sair]").forEach(function (el) {
    el.addEventListener("click", function () {
      acesso.sair();
      document.body.classList.remove("menu-open");
      document.getElementById("menu-lateral").classList.remove("is-open");
      document.querySelector(".backdrop").hidden = true;
      mostrarPorta("entrar");
    });
  });

  iniciar();
})();
