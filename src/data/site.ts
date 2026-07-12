export const SITE = {
  url: 'https://karaktea.com',
  nameEn: 'Karak Tea',
  nameAr: 'شاي كرك',
  phone: '+96522204332',
  phoneDisplay: '+965 2220 4332',
  email: 'info@karaktea.com',
  hashtagEn: '#ForEveryMoment',
  hashtagAr: '‎#لـكـل_لـحـظـة',
  social: {
    facebook: 'https://www.facebook.com/Karak-Tea-1646050772339040',
    twitter: 'https://www.twitter.com/karakteaom/',
    instagram: 'https://www.instagram.com/karakteakw/',
    whatsapp: 'https://wa.me/96522204332',
  },
  shop: {
    en: 'https://thiafa.com/en/',
    ar: 'https://thiafa.com/ar/',
    productsTagEn: 'https://thiafa.com/en/products?tagsIds=48',
    productsTagAr: 'https://thiafa.com/ar/products?tagsIds=48',
    vendingTagEn: 'https://thiafa.com/en/products?tagsIds=5',
    vendingTagAr: 'https://thiafa.com/ar/products?tagsIds=5',
  },
};

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export const NAV_EN: NavItem[] = [
  { label: 'Home', href: '/en/' },
  { label: 'Products', href: '/en/products/' },
  { label: 'Preparation', href: '/en/preparation/' },
  { label: 'Vending Machine', href: '/en/vending-machine/' },
  { label: 'FAQs', href: '/en/faqs/' },
  { label: 'Contact us', href: '/en/contact-us/' },
  { label: 'Order Now', href: 'https://thiafa.com/en/', external: true },
];

export const NAV_AR: NavItem[] = [
  { label: 'الرئيسية', href: '/' },
  { label: 'المنتجات', href: '/المنتجات/' },
  { label: 'التحضير', href: '/التحضير/' },
  { label: 'آلات التوزيع', href: '/آلات-التوزيع/' },
  { label: 'أسئلة مكررة', href: '/أسئلة-مكررة/' },
  { label: 'اتصل بنا', href: '/اتصل-بنا/' },
  { label: 'اطلب الان', href: 'https://thiafa.com/ar/', external: true },
];
