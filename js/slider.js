/**
 * Home hero slider (rslides-style)
 */
(function () {
  const slider = document.getElementById("wrap-slider");
  if (!slider || typeof KarakAssets === "undefined") return;

  const slidesUl = slider.querySelector(".rslides");
  if (!slidesUl) return;

  let current = 0;
  let timer;

  function getLang() {
    return typeof KarakI18n !== "undefined" ? KarakI18n.getLang() : "en";
  }

  function buildSlides() {
    const lang = getLang();
    const urls = KarakAssets.slider[lang] || KarakAssets.slider.en;
    slidesUl.innerHTML = "";

    urls.forEach((url, i) => {
      const li = document.createElement("li");
      li.className = "item" + (i === 0 ? " active" : "");
      li.style.backgroundImage = `url("${url}")`;
      li.innerHTML = `
        <div class="container slider-inner">
          <div class="slider-cont">
            <h2 class="title" data-i18n="hero.title">Karak Tea</h2>
            <p data-i18n="hero.lead"></p>
            <a href="https://thiafa.com/en/" class="btn-default btn-white" target="_blank" rel="noopener noreferrer" data-shop-link data-i18n="hero.cta">Shop Now</a>
          </div>
        </div>`;
      slidesUl.appendChild(li);
    });

    buildTabs(urls.length);
    if (typeof KarakI18n !== "undefined") {
      KarakI18n.apply(getLang());
    }
    current = 0;
    startAuto();
  }

  function buildTabs(count) {
    let tabs = slider.querySelector(".rslides_tabs");
    if (!tabs) {
      tabs = document.createElement("ul");
      tabs.className = "rslides_tabs";
      slider.appendChild(tabs);
    }
    tabs.innerHTML = "";
    for (let i = 0; i < count; i++) {
      const li = document.createElement("li");
      if (i === 0) li.className = "active";
      const btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("aria-label", "Slide " + (i + 1));
      btn.addEventListener("click", () => goTo(i));
      li.appendChild(btn);
      tabs.appendChild(li);
    }
  }

  function goTo(index) {
    const items = slidesUl.querySelectorAll(".item");
    const tabs = slider.querySelectorAll(".rslides_tabs li");
    if (!items.length) return;
    items[current]?.classList.remove("active");
    tabs[current]?.classList.remove("active");
    current = index % items.length;
    items[current].classList.add("active");
    tabs[current]?.classList.add("active");
    resetAuto();
  }

  function next() {
    goTo(current + 1);
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(next, 6000);
  }

  function resetAuto() {
    startAuto();
  }

  buildSlides();

  document.addEventListener("karak:langchange", buildSlides);
})();
