(function () {
  "use strict";

  // 1. Dynamic year stamp
  var year = document.getElementById("year-stamp");
  if (year) year.textContent = String(new Date().getFullYear());

  // 2. Sticky nav — add .scrolled once the page moves
  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle("scrolled", window.scrollY > 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // 3. Scroll reveal via IntersectionObserver (once per element, staggered)
  var revealEls = document.querySelectorAll("[data-reveal]");
  if (revealEls.length) {
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var el = entry.target;
            var delay = parseFloat(el.getAttribute("data-reveal-delay")) || 0;
            el.style.transitionDelay = delay + "ms";
            el.classList.add("in-view");
            io.unobserve(el);
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
      );
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add("in-view"); });
    }
  }

  // 4. Accordion (rules) — single open, dynamic height
  document.addEventListener("click", function (event) {
    var header = event.target.closest(".accordion-header");
    if (!header) return;

    var item = header.closest(".accordion-item");
    if (!item) return;

    var accordion = item.closest(".accordion");
    var wasActive = item.classList.contains("active");

    if (accordion) {
      accordion.querySelectorAll(".accordion-item").forEach(function (el) {
        el.classList.remove("active");
        var c = el.querySelector(".accordion-content");
        if (c) c.style.maxHeight = null;
      });
    }

    if (!wasActive) {
      item.classList.add("active");
      var content = item.querySelector(".accordion-content");
      if (content) content.style.maxHeight = content.scrollHeight + "px";
    }
  });
})();
