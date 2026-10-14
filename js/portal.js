/*
  Portal SEMEC — comportamento comum a todas as páginas.
  Só o necessário: abrir/fechar o menu lateral e montar os cartões de ferramenta
  a partir de dados/ferramentas.json.
*/

(function () {
  "use strict";

  /* Menu lateral ---------------------------------------------------------- */
  function setupMenu() {
    var sidebar = document.getElementById("menu-lateral");
    var toggle = document.querySelector(".menu-toggle");
    var backdrop = document.querySelector(".backdrop");
    if (!sidebar || !toggle || !backdrop) return;

    function open() {
      sidebar.classList.add("is-open");
      sidebar.removeAttribute("inert");
      backdrop.hidden = false;
      document.body.classList.add("menu-open");
      toggle.setAttribute("aria-expanded", "true");
      var first = sidebar.querySelector("a, button");
      if (first) first.focus();
    }

    function close() {
      sidebar.classList.remove("is-open");
      sidebar.setAttribute("inert", "");
      backdrop.hidden = true;
      document.body.classList.remove("menu-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.focus();
    }

    sidebar.setAttribute("inert", "");
    toggle.addEventListener("click", open);
    document.querySelectorAll("[data-menu-close]").forEach(function (el) {
      el.addEventListener("click", close);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && sidebar.classList.contains("is-open")) close();
    });
  }

  /* Cartões de ferramenta ----------------------------------------------- */
  var STATUS = {
    "pronta": { label: "Disponível", className: "pill-ok" },
    "em-construcao": { label: "Em construção", className: "pill-waiting" },
    "planejada": { label: "Em breve", className: "pill-muted" }
  };

  var ICONS = {
    certificado: '<circle cx="12" cy="9" r="5"/><path d="M8.5 13 7 21l5-2.5 5 2.5-1.5-8"/>',
    calendario: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    documento: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',
    indicadores: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'
  };

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function buildCard(tool) {
    var status = STATUS[tool.situacao] || STATUS.planejada;
    var usable = tool.situacao === "pronta" && tool.endereco;
    var card = el(usable ? "a" : "div", "tool-card");

    if (usable) {
      card.href = tool.endereco;
      if (/^https?:/i.test(tool.endereco)) {
        card.target = "_blank";
        card.rel = "noopener";
      }
    } else {
      card.setAttribute("aria-disabled", "true");
    }

    var icon = el("span", "tool-card-icon");
    icon.setAttribute("aria-hidden", "true");
    icon.innerHTML = '<svg viewBox="0 0 24 24">' + (ICONS[tool.icone] || ICONS.documento) + "</svg>";

    card.appendChild(icon);
    card.appendChild(el("strong", "", tool.nome));
    card.appendChild(el("small", "", tool.descricao));
    card.appendChild(el("span", "pill " + status.className, status.label));
    return card;
  }

  function setupToolGrids() {
    var grids = document.querySelectorAll("[data-area]");
    if (!grids.length) return;

    fetch("dados/ferramentas.json", { cache: "no-cache" })
      .then(function (response) {
        if (!response.ok) throw new Error(String(response.status));
        return response.json();
      })
      .then(function (data) {
        grids.forEach(function (grid) {
          grid.innerHTML = "";
          (data.ferramentas || [])
            .filter(function (tool) { return tool.area === grid.dataset.area; })
            .forEach(function (tool) { grid.appendChild(buildCard(tool)); });
        });
      })
      .catch(function () {
        grids.forEach(function (grid) {
          grid.innerHTML = "";
          grid.appendChild(el("p", "alert is-error", "Não foi possível carregar as ferramentas. Atualize a página."));
        });
      });
  }

  document.addEventListener("DOMContentLoaded", function () {
    setupMenu();
    setupToolGrids();
  });
})();
