(function () {
  function isCurrentlyDark() {
    var root = document.documentElement;
    var dt = root.getAttribute("data-theme");
    if (dt === "dark") return true;
    if (dt === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function syncToggle() {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    var dark = isCurrentlyDark();
    var moon = btn.querySelector(".theme-toggle-moon");
    var sun = btn.querySelector(".theme-toggle-sun");
    if (moon) moon.classList.toggle("hidden", dark);
    if (sun) sun.classList.toggle("hidden", !dark);
    btn.setAttribute(
      "aria-label",
      dark ? "Switch to light mode" : "Switch to dark mode"
    );
    btn.setAttribute("aria-pressed", dark ? "true" : "false");
  }

  function applyExplicitTheme(goDark) {
    var root = document.documentElement;
    root.setAttribute("data-theme", goDark ? "dark" : "light");
    try {
      localStorage.setItem("theme", goDark ? "dark" : "light");
    } catch (e) {}
    syncToggle();
  }

  var btn = document.getElementById("theme-toggle");
  if (btn) {
    btn.addEventListener("click", function () {
      applyExplicitTheme(!isCurrentlyDark());
    });
  }

  syncToggle();

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", function () {
      try {
        if (localStorage.getItem("theme")) return;
      } catch (e) {}
      syncToggle();
    });
})();
