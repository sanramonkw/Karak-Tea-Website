/** International distributors listed on the Contact page (same list on EN + AR). */
export interface Distributor {
  country: string;
  image: string;
  website?: string;
  instagram?: string;
  email?: string;
  phone: string;
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
];
