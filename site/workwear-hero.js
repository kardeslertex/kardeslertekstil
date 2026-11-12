(function () {
  "use strict";

  var root = document.querySelector("[data-workwear-carousel]");
  if (!root) return;

  var slides = [
    {
      code: "KT-TS-032",
      name: "Antrasit Turuncu Polo Yaka İş Tişörtü",
      image: "/assets/products/gallery/tshirt/kt-ts-032-antrasit-turuncu-garnili-polo-yaka-is-tisortu.webp",
      alt: "KT-TS-032 antrasit turuncu garnili polo yaka iş tişörtü",
      href: "/urun/kt-ts-032-antrasit-turuncu-garnili-polo-yaka-s-tisortu/"
    },
    {
      code: "KT-SW-016",
      name: "Saks Mavi Reflektörlü Polo Yaka Sweatshirt",
      image: "/assets/products/hero/sweat/kt-sw-016-saks-mavisi.webp",
      alt: "KT-SW-016 saks mavi reflektörlü polo yaka sweatshirt",
      href: "/urun/kt-sw-016-saks-mavi-reflektorlu-polo-yaka-sweatshirt/"
    },
    {
      code: "KT-PT-009",
      name: "Siyah Kargo Cepli İş Pantolonu",
      image: "/assets/products/gallery/pantolon/09.jpg",
      alt: "KT-PT-009 siyah kargo cepli iş pantolonu",
      href: "/urunlerimiz/#pantolon"
    },
    {
      code: "KT-MK-005",
      name: "Siyah Gri Reflektör Şeritli İş Montu",
      image: "/assets/products/gallery/montkaban/09.webp",
      alt: "KT-MK-005 siyah gri reflektör şeritli iş montu",
      href: "/urunlerimiz/#montkaban"
    }
  ];

  var image = root.querySelector("[data-workwear-image]");
  var link = root.querySelector("[data-workwear-link]");
  var code = root.querySelector("[data-workwear-code]");
  var name = root.querySelector("[data-workwear-name]");
  var dots = Array.prototype.slice.call(root.querySelectorAll("[data-workwear-dot]"));
  var index = 0;
  var timer;
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function preload() {
    slides.slice(1).forEach(function (slide) {
      var next = new Image();
      next.src = slide.image;
    });
  }

  function show(nextIndex) {
    var slide = slides[nextIndex];
    root.classList.add("is-changing");
    window.setTimeout(function () {
      image.src = slide.image;
      image.alt = slide.alt;
      link.href = slide.href;
      link.setAttribute("aria-label", slide.code + " ürününü inceleyin");
      code.textContent = slide.code;
      name.textContent = slide.name;
      dots.forEach(function (dot, dotIndex) {
        var active = dotIndex === nextIndex;
        dot.classList.toggle("active", active);
        dot.setAttribute("aria-pressed", active ? "true" : "false");
      });
      index = nextIndex;
      root.classList.remove("is-changing");
    }, 520);
  }

  function schedule() {
    if (reduceMotion || document.hidden) return;
    window.clearInterval(timer);
    timer = window.setInterval(function () {
      show((index + 1) % slides.length);
    }, 7500);
  }

  document.addEventListener("visibilitychange", schedule);
  window.addEventListener("load", function () {
    window.setTimeout(preload, 800);
    schedule();
  }, { once: true });
}());
