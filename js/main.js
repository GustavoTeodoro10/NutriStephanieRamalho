(function () {
  "use strict";

  // Mobile menu toggle
  var menuBtn = document.getElementById("menu-btn");
  var menuMobile = document.getElementById("menu-mobile");

  if (menuBtn && menuMobile) {
    menuBtn.addEventListener("click", function () {
      var isOpen = !menuMobile.classList.contains("hidden");
      menuMobile.classList.toggle("hidden");
      menuBtn.setAttribute("aria-expanded", String(!isOpen));
    });

    menuMobile.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menuMobile.classList.add("hidden");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Scroll-reveal for elements marked .reveal
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  }

  // Close mobile menu on resize to desktop
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 1024 && menuMobile && !menuMobile.classList.contains("hidden")) {
      menuMobile.classList.add("hidden");
      if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
    }
  });
})();
