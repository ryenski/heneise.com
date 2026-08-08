;(function () {
  "use strict"

  var root = document.documentElement
  var btn = document.getElementById("themeToggle")
  var lbl = document.getElementById("themeLabel")
  if (!btn || !lbl) return

  function isDark() {
    var t = root.getAttribute("data-theme")
    if (t) return t === "dark"
    return window.matchMedia("(prefers-color-scheme: dark)").matches
  }

  // The label names the theme you'd switch TO, not the one you're in.
  function syncLabel() {
    var dark = isDark()
    lbl.textContent = dark ? "Light" : "Dark"
    btn.setAttribute("aria-pressed", dark ? "true" : "false")
    btn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme")
  }

  btn.addEventListener("click", function () {
    var next = isDark() ? "light" : "dark"
    root.setAttribute("data-theme", next)
    try {
      localStorage.setItem("theme", next)
    } catch (e) {}
    syncLabel()
  })

  // Only follow the system when the visitor hasn't made an explicit choice.
  // Guarded: Safari below 14 has no addEventListener here, and an exception
  // thrown at this point would silently kill the syncLabel() call below.
  try {
    var mq = window.matchMedia("(prefers-color-scheme: dark)")
    var onSystemChange = function () {
      if (!root.getAttribute("data-theme")) syncLabel()
    }
    if (mq.addEventListener) mq.addEventListener("change", onSystemChange)
    else if (mq.addListener) mq.addListener(onSystemChange)
  } catch (e) {}

  syncLabel()
})()
