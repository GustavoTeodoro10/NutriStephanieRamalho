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

  // Scroll progress bar + compact header
  var progressBar = document.getElementById("scroll-progress");
  var header = document.querySelector(".site-header");
  var ticking = false;

  function updateOnScroll() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (progressBar) {
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var pct = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      progressBar.style.transform = "scaleX(" + pct + ")";
    }

    if (header) {
      header.classList.toggle("is-scrolled", scrollTop > 40);
    }

    ticking = false;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        window.requestAnimationFrame(updateOnScroll);
        ticking = true;
      }
    },
    { passive: true }
  );
  updateOnScroll();

  // Animated count-up for real stats (5 anos, 5,0 no Google, 66 avaliações)
  var countEls = document.querySelectorAll("[data-countup]");

  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-countup"));
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    if (reduceMotion || isNaN(target)) {
      el.textContent = target.toLocaleString("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
      return;
    }
    var duration = 1200;
    var start = null;

    function step(timestamp) {
      if (start === null) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      var value = target * eased;
      el.textContent = value.toLocaleString("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
      }
    }
    window.requestAnimationFrame(step);
  }

  if (countEls.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      countEls.forEach(animateCount);
    } else {
      var countObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCount(entry.target);
              countObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.6 }
      );
      countEls.forEach(function (el) { countObserver.observe(el); });
    }
  }

  // FAQ accordion — smooth height animation via CSS grid-rows, state in JS
  document.querySelectorAll(".faq-trigger").forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      var expanded = trigger.getAttribute("aria-expanded") === "true";
      var panel = document.getElementById(trigger.getAttribute("aria-controls"));
      trigger.setAttribute("aria-expanded", String(!expanded));
      if (panel) panel.classList.toggle("is-open", !expanded);
    });
  });
})();
