/* opencode 运行时文档站 — 交互脚本（无依赖）
   功能：移动端侧栏开关、客户端搜索（标题+小节）、快捷键 "/" 聚焦搜索。 */
(function () {
  "use strict";

  // ── 移动端侧栏 ──────────────────────────────
  var toggle = document.querySelector(".menu-toggle");
  var sidebar = document.getElementById("sidebar");
  if (toggle && sidebar) {
    toggle.addEventListener("click", function () {
      sidebar.classList.toggle("open");
    });
    document.addEventListener("click", function (e) {
      if (window.innerWidth <= 860 && sidebar.classList.contains("open") &&
          !sidebar.contains(e.target) && e.target !== toggle) {
        sidebar.classList.remove("open");
      }
    });
  }

  // ── 搜索 ───────────────────────────────────
  var input = document.getElementById("search-input");
  var results = document.getElementById("search-results");
  if (!input || !results || !window.__SEARCH_INDEX__) return;

  var index = window.__SEARCH_INDEX__;

  function search(q) {
    q = q.trim().toLowerCase();
    if (!q) return [];
    var out = [];
    for (var i = 0; i < index.length; i++) {
      var page = index[i];
      var title = (page.t || "").toLowerCase();
      var section = (page.s || "").toLowerCase();
      var heads = (page.h || []).join(" ").toLowerCase();
      var score = -1;
      if (title.indexOf(q) >= 0) score = 3;
      else if (section.indexOf(q) >= 0) score = 2;
      else if (heads.indexOf(q) >= 0) score = 1;
      if (score >= 0) out.push({ page: page, score: score });
    }
    out.sort(function (a, b) { return b.score - a.score; });
    return out.slice(0, 12);
  }

  function basePrefix() {
    // 当前页面相对站点根的前缀：取自顶栏 brand 链接（构建时按页面深度生成），
    // 天然适配任意部署路径——域名根、子路径（如 /oc-lark-web/docs/）、本地预览
    var brand = document.querySelector("a.brand");
    if (brand) {
      var href = brand.getAttribute("href") || "";
      var idx = href.lastIndexOf("index.html");
      if (idx >= 0) return href.slice(0, idx);
    }
    // 兜底：按当前路径深度估算（页面无 brand 时）
    var depth = location.pathname.split("/").length - 2;
    return new Array(Math.max(0, depth) + 1).join("../");
  }
  var prefix = basePrefix();

  function render(list) {
    results.replaceChildren();
    if (!list.length) {
      var empty = document.createElement("div");
      empty.className = "sr-empty";
      empty.textContent = "未找到匹配内容";
      results.appendChild(empty);
      results.hidden = false;
      return;
    }
    list.forEach(function (item) {
      var a = document.createElement("a");
      a.href = prefix + item.page.p;
      var t = document.createElement("div");
      t.className = "sr-title";
      t.textContent = item.page.t;
      var m = document.createElement("div");
      m.className = "sr-meta";
      m.textContent = item.page.s + (item.page.h && item.page.h.length ? " · " + item.page.h.slice(0, 3).join(" / ") : "");
      a.appendChild(t);
      a.appendChild(m);
      results.appendChild(a);
    });
    results.hidden = false;
  }

  input.addEventListener("input", function () {
    var q = input.value;
    if (!q.trim()) { results.hidden = true; return; }
    render(search(q));
  });

  input.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      input.value = "";
      results.hidden = true;
      input.blur();
    } else if (e.key === "Enter") {
      var first = results.querySelector("a");
      if (first) location.href = first.href;
    }
  });

  document.addEventListener("click", function (e) {
    if (!results.hidden && !results.contains(e.target) && e.target !== input) {
      results.hidden = true;
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "/" && document.activeElement !== input &&
        !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) {
      e.preventDefault();
      input.focus();
    }
  });
})();
