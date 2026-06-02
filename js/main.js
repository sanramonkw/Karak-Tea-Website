/**
 * Karak Tea — header, overlay menu, FAQ, localized images
 */
(function () {
  const header = document.getElementById("header");
  const overlay = document.getElementById("menu-overlay");
  const hamburger = document.querySelector(".hamburger");
  const closeBtn = document.querySelector(".menu-overlay .closebtn");

  function openMenu() {
    overlay?.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    overlay?.classList.remove("open");
    document.body.style.overflow = "";
  }

  hamburger?.addEventListener("click", openMenu);
  closeBtn?.addEventListener("click", closeMenu);
  overlay?.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));

  const pageKey = document.body.dataset.page;
  if (pageKey) {
    document.querySelectorAll(`.navbar-nav a[data-nav="${pageKey}"]`).forEach((a) => {
      a.classList.add("active");
    });
    document.querySelectorAll(`.overlay-nav a[data-nav="${pageKey}"]`).forEach((a) => {
      a.classList.add("active");
    });
  }

  document.querySelectorAll(".accordion").forEach((btn) => {
    btn.addEventListener("click", () => {
      const panel = btn.nextElementSibling;
      const wasActive = btn.classList.contains("active");
      document.querySelectorAll(".accordion").forEach((b) => {
        b.classList.remove("active");
        b.nextElementSibling?.classList.remove("open");
      });
      if (!wasActive) {
        btn.classList.add("active");
        panel?.classList.add("open");
      }
    });
  });

  function applyLocalizedImages() {
    const lang = typeof KarakI18n !== "undefined" ? KarakI18n.getLang() : "en";
    if (typeof KarakAssets === "undefined") return;

    document.querySelectorAll("[data-img-lang]").forEach((img) => {
      const key = img.getAttribute("data-img-lang");
      if (key === "preparation") {
        img.src = KarakAssets.preparation[lang] || KarakAssets.preparation.en;
      }
    });

    const shopUrl = KarakAssets.shopUrl?.[lang] || KarakAssets.shopUrl?.en;
    if (shopUrl) {
      document.querySelectorAll(".product-shop-link, [data-shop-link]").forEach((a) => {
        a.href = shopUrl;
      });
    }

    document.querySelectorAll("[data-flag]").forEach((img) => {
      const flag = img.getAttribute("data-flag");
      if (KarakAssets.flags[flag]) img.src = KarakAssets.flags[flag];
    });

    document.querySelectorAll("[data-home-img]").forEach((img) => {
      const key = img.getAttribute("data-home-img");
      const paths = KarakAssets.home?.[key];
      if (!paths) return;
      img.src = typeof paths === "string" ? paths : paths[lang] || paths.en;
    });
  }

  const origApply = typeof KarakI18n !== "undefined" ? KarakI18n.apply.bind(KarakI18n) : null;
  if (origApply) {
    KarakI18n.apply = function (lang) {
      origApply(lang);
      applyLocalizedImages();
      document.dispatchEvent(new CustomEvent("karak:langchange", { detail: { lang } }));
    };
    KarakI18n.init = function () {
      this.apply(this.getLang());
      document.querySelectorAll(".lang-switcher button").forEach((btn) => {
        btn.addEventListener("click", () => {
          const l = btn.dataset.lang;
          if (l === "en" || l === "ar") this.apply(l);
        });
      });
    };
    KarakI18n.init();
  }

  applyLocalizedImages();
})();
