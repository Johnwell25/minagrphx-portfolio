/* =========================================================================
   MINAGRPHX — main.js
   Vanilla JS only. No dependencies, no build step.
   ========================================================================= */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* -----------------------------------------------------------------------
     Nav: scrolled state + mobile panel
     ----------------------------------------------------------------------- */
  var nav = document.querySelector(".site-nav");
  var burger = document.querySelector(".nav-burger");
  var mobilePanel = document.querySelector(".mobile-panel");

  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (burger && mobilePanel) {
    burger.addEventListener("click", function () {
      var open = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!open));
      mobilePanel.classList.toggle("is-open", !open);
      document.body.style.overflow = !open ? "hidden" : "";
    });
    mobilePanel.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        burger.setAttribute("aria-expanded", "false");
        mobilePanel.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  /* -----------------------------------------------------------------------
     Signature element: grid overlay + crosshair cursor
     Toggle with the on-screen control or the "G" key.
     ----------------------------------------------------------------------- */
  var bgGrid = document.querySelector(".bg-grid");
  var crosshair = document.querySelector(".crosshair");
  var gridToggle = document.querySelector(".grid-toggle");
  var gridOn = false;

  function buildCols() {
    var colsEl = document.querySelector(".bg-grid__cols");
    if (!colsEl) return;
    for (var i = 0; i < 12; i++) {
      colsEl.appendChild(document.createElement("span"));
    }
  }
  buildCols();

  function setGrid(on) {
    gridOn = on;
    if (bgGrid) bgGrid.classList.toggle("is-on", on);
    if (crosshair && !reduceMotion) crosshair.classList.toggle("is-on", on);
    if (gridToggle) gridToggle.setAttribute("aria-pressed", String(on));
  }

  if (gridToggle) {
    gridToggle.addEventListener("click", function () { setGrid(!gridOn); });
  }
  window.addEventListener("keydown", function (e) {
    if (e.key.toLowerCase() === "g" && !e.metaKey && !e.ctrlKey) {
      var tag = (document.activeElement && document.activeElement.tagName) || "";
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      setGrid(!gridOn);
    }
  });

  if (crosshair && !reduceMotion) {
    var label = crosshair.querySelector(".crosshair__label");
    window.addEventListener("mousemove", function (e) {
      crosshair.style.transform = "translate(" + e.clientX + "px," + e.clientY + "px)";
      if (label) {
        var col = Math.min(12, Math.max(1, Math.ceil((e.clientX / window.innerWidth) * 12)));
        var row = Math.round(e.clientY / 32);
        label.textContent = "X:" + col + " / Y:" + row;
        label.style.left = "0px";
        label.style.top = "0px";
      }
    }, { passive: true });
  }

  /* -----------------------------------------------------------------------
     Scroll reveal
     ----------------------------------------------------------------------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el, i) {
      el.style.transitionDelay = (i % 6) * 60 + "ms";
      io.observe(el);
    });
  }

  /* -----------------------------------------------------------------------
     Portfolio data
     Shared between the work grid, the home preview, and the detail overlay.
     ----------------------------------------------------------------------- */
  var PROJECTS = [
    {
      id: "solace",
      title: "Solace",
      category: "Identity",
      year: "2026",
      coord: "A1",
      size: "wide",
      summary: "Wordmark, print system and packaging for an independent skincare line built on restraint.",
      role: "Identity, packaging, art direction",
      client: "Solace Studio",
      pattern: "bars"
    },
    {
      id: "meridian",
      title: "Meridian Journal",
      category: "Editorial",
      year: "2025",
      coord: "B1",
      size: "narrow",
      summary: "A quarterly print journal on urban planning — grid system, typeface pairing and cover series.",
      role: "Editorial design, typesetting",
      client: "Meridian Press",
      pattern: "columns"
    },
    {
      id: "afterglow",
      title: "Afterglow",
      category: "Type",
      year: "2025",
      coord: "C1",
      size: "square",
      summary: "A condensed display typeface commissioned for a music festival's on-site signage.",
      role: "Type design",
      client: "Afterglow Festival",
      pattern: "type"
    },
    {
      id: "northline",
      title: "Northline Transit",
      category: "Identity",
      year: "2025",
      coord: "D1",
      size: "tall",
      summary: "Wayfinding and route-map redesign for a regional transit authority.",
      role: "Identity, wayfinding",
      client: "Northline Transit Authority",
      pattern: "grid"
    },
    {
      id: "porous",
      title: "Porous",
      category: "Packaging",
      year: "2024",
      coord: "A2",
      size: "narrow",
      summary: "Structural packaging and die-line system for a modular ceramics brand.",
      role: "Packaging, structural design",
      client: "Porous Ceramics",
      pattern: "circles"
    },
    {
      id: "tenfold",
      title: "Tenfold",
      category: "Editorial",
      year: "2024",
      coord: "B2",
      size: "wide",
      summary: "Annual report redesign for a climate research nonprofit — data visualisation and layout.",
      role: "Editorial design, data viz",
      client: "Tenfold Institute",
      pattern: "diagonal"
    },
    {
      id: "hollow",
      title: "Hollow",
      category: "Type",
      year: "2024",
      coord: "C2",
      size: "square",
      summary: "Variable typeface exploring negative space, released as an open specimen.",
      role: "Type design, specimen",
      client: "Self-initiated",
      pattern: "type2"
    },
    {
      id: "civic",
      title: "Civic Supply Co.",
      category: "Packaging",
      year: "2023",
      coord: "D2",
      size: "tall",
      summary: "Private-label packaging system for a household goods retailer, built to scale across 40 SKUs.",
      role: "Packaging system, guidelines",
      client: "Civic Supply Co.",
      pattern: "stack"
    },
    {
      id: "isogrid",
      title: "Isogrid",
      category: "Identity",
      year: "2023",
      coord: "A3",
      size: "square",
      summary: "Brand identity for a structural engineering firm — a mark built entirely from a triangular grid.",
      role: "Identity, brand system",
      client: "Isogrid Engineering",
      pattern: "tri"
    }
  ];

  function svgFor(pattern) {
    var blue = "#2f6bff";
    var blueLight = "#7fa8ff";
    var line = "#1c2028";
    var svgs = {
      bars:
        '<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><rect width="400" height="300" fill="#0b0e13"/>' +
        '<rect x="40" y="60" width="40" height="180" fill="' + blue + '"/>' +
        '<rect x="100" y="30" width="40" height="240" fill="#1c2028"/>' +
        '<rect x="160" y="90" width="40" height="120" fill="' + blueLight + '"/>' +
        '<rect x="220" y="20" width="40" height="260" fill="#141821"/>' +
        '<rect x="280" y="110" width="40" height="80" fill="' + blue + '"/>' +
        '<line x1="0" y1="150" x2="400" y2="150" stroke="' + line + '" stroke-width="1"/></svg>',
      columns:
        '<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><rect width="400" height="300" fill="#0b0e13"/>' +
        '<rect x="30" y="30" width="150" height="14" fill="' + blueLight + '"/>' +
        '<rect x="30" y="60" width="150" height="6" fill="#2a2f3a"/><rect x="30" y="74" width="150" height="6" fill="#2a2f3a"/>' +
        '<rect x="30" y="88" width="100" height="6" fill="#2a2f3a"/>' +
        '<rect x="220" y="30" width="150" height="220" fill="' + blue + '" opacity="0.14"/>' +
        '<rect x="220" y="30" width="150" height="6" fill="' + blue + '"/>' +
        '<rect x="220" y="46" width="120" height="6" fill="#2a2f3a"/><rect x="220" y="60" width="140" height="6" fill="#2a2f3a"/></svg>',
      type:
        '<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><rect width="400" height="300" fill="#0b0e13"/>' +
        '<text x="200" y="185" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="150" font-weight="900" fill="' + blue + '">A</text>' +
        '<line x1="0" y1="150" x2="400" y2="150" stroke="' + line + '"/></svg>',
      grid:
        '<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><rect width="400" height="300" fill="#0b0e13"/>' +
        '<g stroke="' + line + '" stroke-width="1">' +
        '<line x1="100" y1="0" x2="100" y2="300"/><line x1="200" y1="0" x2="200" y2="300"/><line x1="300" y1="0" x2="300" y2="300"/>' +
        '<line x1="0" y1="75" x2="400" y2="75"/><line x1="0" y1="150" x2="400" y2="150"/><line x1="0" y1="225" x2="400" y2="225"/></g>' +
        '<circle cx="200" cy="150" r="46" fill="none" stroke="' + blueLight + '" stroke-width="2"/>' +
        '<circle cx="200" cy="150" r="6" fill="' + blue + '"/></svg>',
      circles:
        '<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><rect width="400" height="300" fill="#0b0e13"/>' +
        '<circle cx="130" cy="150" r="70" fill="none" stroke="' + blue + '" stroke-width="2"/>' +
        '<circle cx="230" cy="150" r="46" fill="' + blueLight + '" opacity="0.9"/>' +
        '<circle cx="300" cy="90" r="18" fill="none" stroke="#2a2f3a" stroke-width="2"/></svg>',
      diagonal:
        '<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><rect width="400" height="300" fill="#0b0e13"/>' +
        '<polygon points="0,300 220,300 400,0 260,0" fill="' + blue + '" opacity="0.16"/>' +
        '<line x1="0" y1="280" x2="400" y2="10" stroke="' + blueLight + '" stroke-width="2"/>' +
        '<line x1="0" y1="220" x2="340" y2="0" stroke="#1c2028" stroke-width="1"/></svg>',
      type2:
        '<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><rect width="400" height="300" fill="#0b0e13"/>' +
        '<text x="200" y="200" text-anchor="middle" font-family="Georgia, serif" font-size="220" fill="none" stroke="' + blue + '" stroke-width="1.5">O</text></svg>',
      stack:
        '<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><rect width="400" height="300" fill="#0b0e13"/>' +
        '<rect x="60" y="40" width="280" height="46" fill="#141821" stroke="' + line + '"/>' +
        '<rect x="60" y="96" width="280" height="46" fill="' + blue + '" opacity="0.85"/>' +
        '<rect x="60" y="152" width="280" height="46" fill="#141821" stroke="' + line + '"/>' +
        '<rect x="60" y="208" width="280" height="46" fill="' + blueLight + '" opacity="0.5"/></svg>',
      tri:
        '<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><rect width="400" height="300" fill="#0b0e13"/>' +
        '<polygon points="200,40 320,260 80,260" fill="none" stroke="' + blue + '" stroke-width="2"/>' +
        '<polygon points="200,40 260,150 140,150" fill="' + blueLight + '" opacity="0.8"/>' +
        '<line x1="80" y1="260" x2="320" y2="40" stroke="#1c2028"/></svg>'
    };
    return svgs[pattern] || svgs.grid;
  }

  /* -----------------------------------------------------------------------
     Render: home preview (first 3), work grid (all / filtered)
     ----------------------------------------------------------------------- */
  function cellSizeClass(size) {
    if (size === "wide") return "p-cell--wide";
    if (size === "narrow") return "p-cell--narrow";
    if (size === "tall") return "p-cell--tall";
    return "p-cell--square";
  }

  function renderCell(p) {
    var el = document.createElement("article");
    el.className = "p-cell " + cellSizeClass(p.size);
    el.setAttribute("data-id", p.id);
    el.setAttribute("data-category", p.category);
    el.setAttribute("tabindex", "0");
    el.setAttribute("role", "button");
    el.setAttribute("aria-label", "Open project: " + p.title);
    el.setAttribute("data-reveal", "");
    el.innerHTML =
      '<div class="p-cell__art">' + svgFor(p.pattern) + "</div>" +
      '<div class="p-cell__meta">' +
      '<span class="p-cell__coord">' + p.coord + "</span>" +
      '<div class="p-cell__info">' +
      '<h3 class="p-cell__title">' + p.title + "</h3>" +
      '<span class="p-cell__cat">' + p.category + " — " + p.year + "</span>" +
      "</div></div>";
    return el;
  }

  var homeGrid = document.querySelector("[data-home-grid]");
  if (homeGrid) {
    PROJECTS.slice(0, 3).forEach(function (p) { homeGrid.appendChild(renderCell(p)); });
  }

  var workGrid = document.querySelector("[data-work-grid]");
  var filterBar = document.querySelector("[data-filters]");
  var countEl = document.querySelector("[data-count]");

  function renderWork(filter) {
    if (!workGrid) return;
    workGrid.innerHTML = "";
    var list = filter && filter !== "All" ? PROJECTS.filter(function (p) { return p.category === filter; }) : PROJECTS;
    list.forEach(function (p) { workGrid.appendChild(renderCell(p)); });
    if (countEl) countEl.textContent = String(list.length).padStart(2, "0") + " PROJECTS";
    attachCellHandlers();
    // re-run reveal for freshly injected nodes
    var newReveals = workGrid.querySelectorAll("[data-reveal]");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      newReveals.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
      newReveals.forEach(function (el, i) {
        el.style.transitionDelay = (i % 6) * 50 + "ms";
        setTimeout(function () { el.classList.add("is-visible"); }, 20);
      });
    }
  }

  if (workGrid) {
    renderWork("All");
    if (filterBar) {
      filterBar.addEventListener("click", function (e) {
        var btn = e.target.closest("button[data-filter]");
        if (!btn) return;
        filterBar.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
        btn.setAttribute("aria-pressed", "true");
        renderWork(btn.getAttribute("data-filter"));
      });
    }
  } else if (homeGrid) {
    attachCellHandlers();
  }

  /* -----------------------------------------------------------------------
     Detail overlay
     ----------------------------------------------------------------------- */
  var detail = document.querySelector(".detail");
  var detailPanel = detail ? detail.querySelector(".detail__panel") : null;

  function openDetail(id) {
    var p = PROJECTS.filter(function (x) { return x.id === id; })[0];
    if (!p || !detail) return;
    detail.querySelector(".detail__art").innerHTML = svgFor(p.pattern);
    detail.querySelector("[data-d-title]").textContent = p.title;
    detail.querySelector("[data-d-coord]").textContent = p.coord;
    detail.querySelector("[data-d-summary]").textContent = p.summary;
    detail.querySelector("[data-d-role]").textContent = p.role;
    detail.querySelector("[data-d-client]").textContent = p.client;
    detail.querySelector("[data-d-year]").textContent = p.year;
    detail.querySelector("[data-d-cat]").textContent = p.category;
    detail.classList.add("is-open");
    document.body.style.overflow = "hidden";
    var closeBtn = detail.querySelector(".detail__close");
    if (closeBtn) closeBtn.focus();
  }

  function closeDetail() {
    if (!detail) return;
    detail.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  function attachCellHandlers() {
    document.querySelectorAll(".p-cell").forEach(function (cell) {
      cell.addEventListener("click", function () { openDetail(cell.getAttribute("data-id")); });
      cell.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openDetail(cell.getAttribute("data-id"));
        }
      });
    });
  }

  if (detail) {
    detail.querySelector(".detail__scrim").addEventListener("click", closeDetail);
    detail.querySelector(".detail__close").addEventListener("click", closeDetail);
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeDetail();
    });
  }

  /* -----------------------------------------------------------------------
     Contact form — static site, no backend: build a mailto: link
     ----------------------------------------------------------------------- */
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.querySelector("#name").value.trim();
      var email = form.querySelector("#email").value.trim();
      var message = form.querySelector("#message").value.trim();
      var subject = encodeURIComponent("Project inquiry from " + (name || "website"));
      var body = encodeURIComponent(
        (message || "") + "\n\n—\n" + (name || "") + (email ? "\n" + email : "")
      );
      window.location.href = "mailto:hello@minagrphx.studio?subject=" + subject + "&body=" + body;
    });
  }

  /* -----------------------------------------------------------------------
     Copy email button
     ----------------------------------------------------------------------- */
  var copyBtn = document.querySelector("[data-copy-email]");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var text = copyBtn.getAttribute("data-copy-email");
      navigator.clipboard.writeText(text).then(function () {
        var original = copyBtn.textContent;
        copyBtn.textContent = "Copied";
        copyBtn.classList.add("is-copied");
        setTimeout(function () {
          copyBtn.textContent = original;
          copyBtn.classList.remove("is-copied");
        }, 1800);
      });
    });
  }
})();
