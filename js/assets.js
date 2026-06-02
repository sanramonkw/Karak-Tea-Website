/**

 * Karak Tea — local assets (committed under assets/)

 */

const ASSET_ROOT = "assets";



function asset(path) {

  return `${ASSET_ROOT}/${path}`;

}



/** Product catalog — order and images match karaktea.com/products */

const KarakProductCatalog = [

  { id: "original", i18n: "prod.original", image: "images/products/original.webp" },

  { id: "cardamom", i18n: "prod.cardamom", image: "images/products/cardamom.webp" },

  { id: "cardamom-unsweet", i18n: "prod.cardamomUnsweet", image: "images/products/cardamom-unsweet.webp" },

  { id: "saffron", i18n: "prod.saffron", image: "images/products/saffron.webp" },

  { id: "ginger", i18n: "prod.ginger", image: "images/products/ginger.webp" },

  { id: "coffee", i18n: "prod.coffee", image: "images/products/coffee.webp" },

  { id: "saffron-1kg", i18n: "prod.saffron1kg", image: "images/products/saffron-1kg.webp" },

  { id: "saffron-unsweet-500g", i18n: "prod.saffronUnsweet500", image: "images/products/saffron-unsweet-500g.webp" },

  { id: "cardamom-1kg", i18n: "prod.cardamom1kg", image: "images/products/cardamom-1kg.webp" },

  { id: "cardamom-unsweet-500g", i18n: "prod.cardamomUnsweet500", image: "images/products/cardamom-unsweet-500g.webp" },

  { id: "zafran-unsweet", i18n: "prod.zafranUnsweet", image: "images/products/zafran-unsweet.webp" },

  { id: "iced", i18n: "prod.iced", image: "images/products/iced.webp" },

  { id: "gusto", i18n: "prod.gusto", image: "images/products/gusto-capsules.webp" },

  { id: "cinnamon", i18n: "prod.cinnamon", image: "images/products/cinnamon.webp" },

];



const KarakAssets = {

  root: ASSET_ROOT,

  logo: asset("images/brand/karak-new.png"),

  logoText: asset("images/brand/logo-text.png"),

  leaves: asset("images/theme/leaves.png"),

  check: asset("images/theme/check.png"),

  checkWhite: asset("images/theme/check-white.png"),



  shopUrl: {

    en: "https://thiafa.com/en/products?tagsIds=48",

    ar: "https://thiafa.com/ar/products?tagsIds=48",

  },



  slider: {

    en: [

      asset("images/slider/slide01b.jpg"),

      asset("images/slider/slide01a.jpg"),

      asset("images/slider/slide01d.jpg"),

    ],

    ar: [

      asset("images/slider/slide01b.jpg"),

      asset("images/slider/slide01a.jpg"),

      asset("images/slider/slide01d.jpg"),

    ],

  },



  home: {

    section1: asset("images/home/1.webp"),

    section2: {

      en: asset("images/home/2-eng.webp"),

      ar: asset("images/home/2-ar.webp"),

    },

    section3: asset("images/home/3.webp"),

    section4: {

      en: asset("images/home/4-eng.webp"),

      ar: asset("images/home/4.webp"),

    },

  },



  preparation: {

    en: asset("images/preparation/easy-en.webp"),

    ar: asset("images/preparation/easy-ar.webp"),

  },

  prepVideoId: "0DdPepASq1w",

  contactEmail: "info@karaktea.com",
  contactFormEndpoint: "https://formsubmit.co/ajax/info@karaktea.com",



  vending: asset("images/vending/english.webp"),



  catalog: KarakProductCatalog,



  products: KarakProductCatalog.map((p) => asset(p.image)),



  flags: {

    uk: asset("images/flags/uk.png"),

    jordan: asset("images/flags/jordan.png"),

    usa: asset("images/flags/usa.png"),

    egypt: asset("images/flags/egypt.png"),

    uae: asset("images/flags/uae.png"),

    bahrain: asset("images/flags/bahrain.png"),

    qatar: asset("images/flags/qatar.png"),

    jordan2: asset("images/flags/jordan2.png"),

    iraq: asset("images/flags/iraq.png"),

    southafrica: asset("images/flags/southafrica.png"),

  },

};


