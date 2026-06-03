/* ─── Sync nav height + carousel translateZ ─── */
const scene = document.querySelector('.c-scene');

function setNavHeight() {
  const el = document.getElementById('nav');
  if (!el) return;
  document.documentElement.style.setProperty('--nav-h', el.offsetHeight + 'px');
}

function setTZ() {
  if (!scene) return;
  const tz = scene.offsetWidth / 2;
  document.documentElement.style.setProperty('--tz', tz + 'px');
}

function onLayoutChange() {
  setNavHeight();
  setTZ();
}

onLayoutChange();
window.addEventListener('resize', onLayoutChange);

/* ─── Mobile nav menu ─── */
const nav        = document.getElementById('nav');
const navToggle  = document.getElementById('navToggle');
const navMenu    = document.getElementById('navMenu');
const navBackdrop = document.getElementById('navBackdrop');

function setNavOpen(open) {
  const t = window.KarakI18n?.t ?? ((k) => k);
  nav.classList.toggle('nav-open', open);
  navMenu.classList.toggle('is-open', open);
  navMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
  navBackdrop.hidden = !open;
  navBackdrop.setAttribute('aria-hidden', open ? 'false' : 'true');
  document.body.classList.toggle('nav-menu-open', open);
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  navToggle.setAttribute('aria-label', t(open ? 'nav.close' : 'nav.open'));
}

function closeNav() { setNavOpen(false); }

navToggle.addEventListener('click', () => {
  setNavOpen(!nav.classList.contains('nav-open'));
});

navBackdrop.addEventListener('click', closeNav);

function getNavOffset() {
  const navEl = document.getElementById('nav');
  return (navEl?.offsetHeight ?? 74) + (window.innerWidth < 768 ? 20 : 12);
}

function scrollToHash(hash, behavior = 'smooth') {
  if (!hash || hash === '#') return;
  if (hash === '#hero') {
    window.scrollTo({ top: 0, behavior });
    return;
  }
  const target = document.querySelector(hash);
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.scrollY - getNavOffset();
  window.scrollTo({ top: Math.max(0, top), behavior });
}

document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach((link) => {
  link.addEventListener('click', (e) => {
    const hash = link.getAttribute('href');
    if (!hash || hash === '#') return;
    if (!document.querySelector(hash)) return;
    e.preventDefault();
    closeNav();
    requestAnimationFrame(() => scrollToHash(hash));
  });
});

/* ─── Nav scroll spy — highlight current section ─── */
const NAV_SPY_ORDER = ['hero', 'story', 'products', 'flavors', 'preparation', 'vending', 'faq'];
const NAV_SPY_MAP = {
  hero: 'hero',
  story: 'story',
  products: 'products',
  flavors: 'flavors',
  preparation: 'preparation',
  vending: null,
  faq: 'faq',
};

function resolveNavSpyId(sectionId) {
  if (NAV_SPY_MAP[sectionId]) return NAV_SPY_MAP[sectionId];
  const idx = NAV_SPY_ORDER.indexOf(sectionId);
  if (idx < 0) return null;
  for (let i = idx; i >= 0; i--) {
    const navId = NAV_SPY_MAP[NAV_SPY_ORDER[i]];
    if (navId) return navId;
  }
  return null;
}

function updateNavSpy() {
  const offset = getNavOffset() + 48;
  const y = window.scrollY + offset;
  let currentSection = NAV_SPY_ORDER[0];

  NAV_SPY_ORDER.forEach((id) => {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= y) currentSection = id;
  });

  const activeNavId = resolveNavSpyId(currentSection);

  document.querySelectorAll('.nav-links a[href^="#"]').forEach((link) => {
    const hash = link.getAttribute('href')?.slice(1);
    const isActive = hash && hash === activeNavId;
    link.classList.toggle('is-active', Boolean(isActive));
    if (isActive) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeNav();
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) closeNav();
  setNavHeight();
  updateNavSpy();
});

/* Re-measure nav after fonts / i18n layout settle */
document.addEventListener('karak:langchange', () => {
  requestAnimationFrame(() => {
    setNavHeight();
    requestAnimationFrame(setNavHeight);
  });
});
if (document.fonts?.ready) {
  document.fonts.ready.then(() => {
    setNavHeight();
    setTZ();
  });
}

if (scene && typeof ResizeObserver !== 'undefined') {
  const sceneObs = new ResizeObserver(() => setTZ());
  sceneObs.observe(scene);
}

/* ─── Hero scroll controller ─── */
const isContactPage = document.body.classList.contains('page-contact');
const heroWrap   = document.getElementById('hero');
const ring       = document.getElementById('cRing');
const tSteps     = document.querySelectorAll('.text-step');
const dots       = document.querySelectorAll('.s-dot');
const scrollHint = document.getElementById('scrollHint');
let curStep = 0;

function lerp(a, b, t) { return a + (b - a) * t; }

function updateHero() {
  const sy = window.scrollY;

  nav?.classList.toggle('scrolled', sy > 40);

  if (!heroWrap || !ring) {
    updateNavSpy();
    return;
  }

  if (window.innerWidth < 768) setTZ();

  const maxSY = heroWrap.offsetHeight - window.innerHeight;
  const p = maxSY > 0 ? Math.max(0, Math.min(1, sy / maxSY)) : 0;

  const angle = p * 270;
  ring.style.transform = `rotateY(${angle}deg)`;

  const step = Math.min(3, Math.floor(p * 4));
  if (step !== curStep && tSteps.length && dots.length) {
    tSteps[curStep]?.classList.remove('active');
    dots[curStep]?.classList.remove('active');
    curStep = step;
    tSteps[curStep]?.classList.add('active');
    dots[curStep]?.classList.add('active');
  }

  if (scrollHint) {
    const showHint = p < 0.06;
    scrollHint.style.opacity = showHint ? '1' : '0';
    if (window.innerWidth < 768) {
      scrollHint.classList.toggle('is-collapsed', !showHint);
    } else {
      scrollHint.classList.remove('is-collapsed');
    }
  }

  updateNavSpy();
}

if (heroWrap && ring) {
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      const maxSY = heroWrap.offsetHeight - window.innerHeight;
      const target = (i / 4 + 0.01) * maxSY;
      window.scrollTo({ top: target, behavior: 'smooth' });
    });
  });

  window.addEventListener('scroll', updateHero, { passive: true });
  updateHero();
} else if (isContactPage && nav) {
  nav.classList.add('scrolled');
}

/* ─── Product category filter ─── */
document.querySelectorAll('.pf-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.pf-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    document.querySelectorAll('.pm-card').forEach(card => {
      if (cat === 'all' || card.dataset.cat === cat) {
        card.classList.remove('filtered-out');
      } else {
        card.classList.add('filtered-out');
      }
    });
  });
});
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ─── Flavor selector ─── */
const flavors = {
  original: {
    en: 'Original', ar: 'سادة',
    img: 'Assests/heroImages/slide01a.jpg',
    seal: { en: '100%<br>Natural', ar: '١٠٠٪<br>طبيعي' },
    desc: {
      en: 'The quintessential karak — a warm, full-bodied blend of black tea and creamer. Bold, smooth, and deeply satisfying. The cup that started every morning in the Gulf for generations.',
      ar: 'كرك بأصالة — مزيج دافئ وغني من الشاي الأسود والكريمر. جريء، ناعم، ومُرضٍ بعمق. الكوب الذي افتتح صباح الخليج لأجيال.',
    },
    tags: {
      en: ['Black Tea', 'Creamy', '100% Natural'],
      ar: ['شاي أسود', 'كريمي', '١٠٠٪ طبيعي'],
    },
  },
  cardamom: {
    en: 'Cardamom', ar: 'هيل',
    img: 'Assests/heroImages/slide01b.jpg',
    seal: { en: 'Cardamom<br>Natural', ar: 'هيل<br>طبيعي' },
    desc: {
      en: 'Delicately spiced with green cardamom pods — a floral, aromatic warmth that makes every sip feel like a celebration.',
      ar: 'متبل بلطف بحبوب الهيل الأخضر — دفء عطري زهري يجعل كل رشفة احتفالاً.',
    },
    tags: {
      en: ['Cardamom', 'Aromatic', 'Floral'],
      ar: ['هيل', 'عطري', 'زهري'],
    },
  },
  saffron: {
    en: 'Saffron', ar: 'زعفران',
    img: 'Assests/heroImages/slide01b.jpg',
    seal: { en: 'Real<br>Saffron', ar: 'زعفران<br>أصلي' },
    desc: {
      en: 'Elevated with real saffron threads, this blend brings golden depth and subtle floral complexity. A luxurious cup.',
      ar: 'مع خيوط زعفران حقيقية، يمنح هذا المزيج عمقاً ذهبياً وتعقيداً زهرياً راقياً. كوب فاخر.',
    },
    tags: {
      en: ['Real Saffron', 'Premium', 'Golden'],
      ar: ['زعفران أصلي', 'فاخر', 'ذهبي'],
    },
  },
  plain: {
    en: 'Unsweetened', ar: 'بدون سكر',
    img: 'Assests/heroImages/2-eng.webp',
    seal: { en: 'No<br>Sugar', ar: 'بدون<br>سكر' },
    desc: {
      en: 'The same authentic blend, without added sugar — giving you full control over sweetness and strength.',
      ar: 'نفس المزيج الأصيل، بدون سكر مضاف — تحكم كامل بالحلاوة والقوة.',
    },
    tags: {
      en: ['No Sugar', 'Clean', 'Customizable'],
      ar: ['بدون سكر', 'نقي', 'قابل للتخصيص'],
    },
  },
};
const $fImg = document.getElementById('fImg');
const $fEn  = document.getElementById('fEn');
const $fAr  = document.getElementById('fAr');
const $fDesc= document.getElementById('fDesc');
const $fBadg= document.getElementById('fBadges');
const $fSeal= document.getElementById('fSeal');

if ($fImg && $fEn && $fAr && $fDesc && $fBadg && $fSeal) {

function flavorLang() {
  return window.KarakI18n?.getLanguage?.() ?? 'en';
}

function renderFlavor(key, animate) {
  const d = flavors[key];
  if (!d) return;
  const lang = flavorLang();
  const apply = () => {
    $fImg.src = d.img;
    $fEn.textContent = d.en;
    $fAr.textContent = d.ar;
    $fDesc.textContent = d.desc[lang];
    $fSeal.innerHTML = d.seal[lang];
    $fBadg.innerHTML = d.tags[lang].map((tag) => `<span class="fbadge">${tag}</span>`).join('');
    $fImg.style.opacity = '1';
  };
  if (animate) {
    $fImg.style.opacity = '0';
    setTimeout(apply, 360);
  } else {
    apply();
  }
}

document.querySelectorAll('.ftab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.ftab').forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
    renderFlavor(tab.dataset.fl, true);
  });
});

function updateCarouselLocale() {
  const activeFl = document.querySelector('.ftab.active')?.dataset.fl || 'original';
  renderFlavor(activeFl, false);
  if (flavors.plain) {
    flavors.plain.img = lang === 'ar'
      ? 'Assests/heroImages/2-ar.webp'
      : 'Assests/heroImages/2-eng.webp';
  }
}

document.addEventListener('karak:langchange', updateCarouselLocale);

}

/* ─── FAQ accordion — one open at a time ─── */
document.querySelectorAll('.faq-item').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    document.querySelectorAll('.faq-item').forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

/* ─── Contact form ─── */
const contactForm   = document.getElementById('contactForm');
const contactStatus = document.getElementById('contactStatus');

if (contactForm && contactStatus) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const t = window.KarakI18n?.t ?? ((k) => k);

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      contactStatus.textContent = t('contact.error');
      contactStatus.classList.add('is-error');
      contactStatus.hidden = false;
      return;
    }

    contactStatus.textContent = t('contact.success');
    contactStatus.classList.remove('is-error');
    contactStatus.hidden = false;
    contactForm.reset();
  });
}
