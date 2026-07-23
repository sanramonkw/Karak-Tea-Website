/** International distributors listed on the Contact page (same list on EN + AR). */
export interface Distributor {
  country: string;
  image: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  /** X (formerly Twitter) profile URL. */
  twitter?: string;
  tiktok?: string;
  /** WhatsApp Channel URL (whatsapp.com/channel/...). */
  whatsappChannel?: string;
  email?: string;
  /** One number, or several for markets with multiple contact lines. */
  phone: string | string[];
}

export const DISTRIBUTORS: Distributor[] = [
  {
    country: 'United Kingdom',
    image: '/images/flags-03-300x202.png',
    website: 'https://alasala.co.uk/',
    instagram: 'https://www.instagram.com/alasalauk/',
    email: 'sales@alasala.co.uk',
    phone: '+44 7766794724',
  },
  {
    country: 'Canada',
    image: '/images/flags-07-300x202.png',
    website: 'https://www.salembrothers.ca/contact-us',
    email: 'sales@salembrotherscanada.com',
    phone: '+962777665297',
  },
  {
    country: 'United States',
    image: '/images/flags-09-300x202.png',
    website: 'https://redseaimports.com',
    instagram: 'https://www.instagram.com/alsaeedah48126/',
    email: 'alazizi@redseaimports.com',
    phone: '+13138880295',
  },
  {
    country: 'Egypt',
    image: '/images/flags-10-300x202.png',
    website: 'https://egy.karaktea.com/',
    instagram: 'http://instagram.com/Karaktea.eg',
    email: 'alsafwa55.eg@gmail.com',
    phone: '+201119549495',
  },
  {
    country: 'United Arab Emirates',
    image: '/images/UAE-Flag-1-300x202.png',
    website: 'https://www.alhayattrading.ae/',
    email: 'aboheesin940@gmail.com',
    phone: '+971542800666',
  },
  {
    country: 'Bahrain',
    image: '/images/flags-02-300x202.png',
    website: 'http://plus965trading.com',
    email: 'info@plus965trading.com',
    phone: '+97332189911',
  },
  {
    country: 'Qatar',
    image: '/images/flags-04-300x202.png',
    website: 'https://healthylife.com.qa/',
    instagram: 'https://www.instagram.com/karakteaqa',
    email: 'ahmed.belasi@healthylife.com.qa',
    phone: '+97450779779',
  },
  {
    country: 'Jordan',
    image: '/images/Last-Jordan--300x202.png',
    instagram: 'https://www.instagram.com/malayo.jo/',
    email: 'murad@malayoislands.com',
    phone: '+96264892220',
  },
  {
    country: 'Iraq',
    image: '/images/flags-06-300x202.png',
    website: 'https://www.alnadir.com/',
    instagram: 'https://www.instagram.com/al_nadir_trading_company/',
    email: 'omar.alkarkhi@alnadir.com',
    phone: '+9647729994010',
  },
  {
    country: 'South Africa',
    image: '/images/flags-08-300x202.png',
    website: 'https://www.karaktea.co.za/order-form',
    instagram: 'https://www.instagram.com/karakteaza/',
    email: 'mo_gardee@yahoo.com',
    phone: '+270118374904',
  },
  {
    country: 'Oman',
    image: '/images/Oman-Flag-300x202.png',
    instagram: 'https://www.instagram.com/karakteaom/',
    whatsappChannel: 'https://whatsapp.com/channel/0029VbDEFXZId7nUHQO0z63V',
    email: 'Eastcreativity4b@gmail.com',
    phone: ['+968 78699099', '+968 71193399'],
  },
  {
    country: 'Japan',
    image: '/images/Japan-Flag-300x202.png',
    website: 'https://lakshimi.jp/',
    instagram: 'https://www.instagram.com/lakshimi.kobe/?hl=ja',
    twitter: 'https://twitter.com/lakshimi_kobe',
    facebook: 'https://www.facebook.com/lakshimi.tea',
    email: 'info@lakshimi.jp',
    phone: '+81 (0) 78-945-7772',
  },
  {
    country: 'Libya',
    image: '/images/Libya-Flag-300x202.png',
    website: 'https://minaa-aldawliya.com/',
    instagram: 'https://www.instagram.com/minaa_aldawliya/',
    facebook: 'https://www.facebook.com/minaaaldawliyaco',
    tiktok: 'https://www.tiktok.com/@minaa_aldawliya',
    email: 'internationalport000@gmail.com',
    phone: '+218 91 535 1535',
  },
  {
    country: 'Sudan',
    image: '/images/Sudan-Flag-300x202.png',
    instagram: 'https://www.instagram.com/karaktea_.sdn',
    email: 'info@goodsexpress.co.uk',
    phone: ['+249 91 910 1119', '+249 12 384 3339', '+249 91 239 7349'],
  },
];
