;(function () {
  "use strict"

  var grid = document.getElementById("plates")
  if (!grid) return

  var buttons = Array.prototype.slice.call(grid.querySelectorAll(".plate-btn"))
  if (!buttons.length) return

  var items = buttons.map(function (b) {
    return {
      full: b.getAttribute("data-full"),
      title: b.getAttribute("data-title") || "",
      year: b.getAttribute("data-year") || "",
      tags: b.getAttribute("data-tags") || "",
    }
  })

  var lb = document.createElement("div")
  lb.className = "lb"
  lb.setAttribute("role", "dialog")
  lb.setAttribute("aria-modal", "true")
  lb.setAttribute("aria-label", "Portfolio plate viewer")
  lb.innerHTML =
    '<div class="lb-bar">' +
    '<span class="meta" id="lbCount"></span>' +
    '<button class="lb-x" type="button" id="lbClose">Close</button>' +
    "</div>" +
    '<div class="lb-stage" id="lbStage"></div>' +
    '<div class="lb-foot">' +
    "<div>" +
    '<p class="lb-title" id="lbTitle"></p>' +
    '<p class="meta" id="lbMeta"></p>' +
    "</div>" +
    '<div class="lb-nav">' +
    '<button type="button" id="lbPrev">← Previous</button>' +
    '<button type="button" id="lbNext">Next →</button>' +
    "</div>" +
    "</div>"
  document.body.appendChild(lb)

  var stage = lb.querySelector("#lbStage")
  var elTitle = lb.querySelector("#lbTitle")
  var elMeta = lb.querySelector("#lbMeta")
  var elCount = lb.querySelector("#lbCount")
  var bClose = lb.querySelector("#lbClose")
  var bPrev = lb.querySelector("#lbPrev")
  var bNext = lb.querySelector("#lbNext")

  var cur = 0
  var lastFocus = null

  function render(i) {
    cur = (i + items.length) % items.length
    var it = items[cur]
    stage.textContent = ""
    var img = document.createElement("img")
    img.src = it.full
    img.alt = it.title
    stage.appendChild(img)
    elTitle.textContent = it.title
    elMeta.textContent = [it.tags, it.year].filter(Boolean).join(", ")
    // Position, not decoration: inside the viewer the rest of the set is not
    // visible, so this is the only cue for where you are in it.
    elCount.textContent = cur + 1 + " of " + items.length
  }

  function open(i, trigger) {
    lastFocus = trigger || document.activeElement
    render(i)
    lb.classList.add("is-open")
    document.body.classList.add("lb-open")
    bClose.focus()
  }

  function close() {
    lb.classList.remove("is-open")
    document.body.classList.remove("lb-open")
    stage.textContent = ""
    if (lastFocus && lastFocus.focus) lastFocus.focus()
  }

  grid.addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest(".plate-btn") : null
    if (!b) return
    open(parseInt(b.getAttribute("data-i"), 10) || 0, b)
  })

  bClose.addEventListener("click", close)
  bPrev.addEventListener("click", function () {
    render(cur - 1)
  })
  bNext.addEventListener("click", function () {
    render(cur + 1)
  })

  // Clicking the surrounding paper closes; clicking the plate itself does not.
  lb.addEventListener("mousedown", function (e) {
    if (e.target === lb || e.target === stage) close()
  })

  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("is-open")) return
    if (e.key === "Escape") {
      e.preventDefault()
      close()
      return
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      render(cur - 1)
      return
    }
    if (e.key === "ArrowRight") {
      e.preventDefault()
      render(cur + 1)
      return
    }
    if (e.key === "Tab") {
      var f = [bClose, bPrev, bNext]
      var idx = f.indexOf(document.activeElement)
      e.preventDefault()
      var next = e.shiftKey
        ? idx <= 0
          ? f.length - 1
          : idx - 1
        : idx === f.length - 1
          ? 0
          : idx + 1
      f[next].focus()
    }
  })
})()
