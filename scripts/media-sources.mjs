/** Every image the site uses. `name` is the original file in public/ (or a generated id). */
const still = (name) => ({ name, trimBars: true, widths: [640, 1024, 1600] });
const bts = (name) => ({ name, widths: [480, 960, 1600], quality: 72 });
const logo = (name) => ({ name, logo: true, width: 320 });
const gen = (name) => ({ name, generated: true, widths: [640, 1024, 1536], quality: 76 });

export const FILM_STILLS = [
  'DLF-Emporio.png', 'Brookfield-Properties-in-India.png', 'Bill-Gates.png', 'Geetha-Saleesh-Hyundai-Film.png',
  'Geetha-Saleesh-Samarth-by-Hyundai.png', 'Beyond-Duty.png', 'Beyond-the-Call-of-Duty.png', 'The-Strongest-Link.png',
  'Swacch-Bharat.png', 'Naukri-RMS.png', 'Naukri-RMS-1.png', 'Nestle-Educate-A-GirlChild.png', 'Westin-Brand-Film.png',
  'Westin-Brand-Film-1.png', 'Samsung-Anushka-Menon.png', 'Gazi-Khan-Barna-1.png', 'Gazi-Khan-Barna.png',
];

export const BTS_PHOTOS = [
  'BTS-1.jpeg', 'BTS-1.jpg', 'BTS-1.png', 'BTS-10.jpeg', 'BTS-10.jpg', 'BTS-10.png', 'BTS-11.jpeg', 'BTS-11.jpg',
  'BTS-11.png', 'BTS-12-A.jpg', 'BTS-12.jpeg', 'BTS-12.jpg', 'BTS-13.jpg', 'BTS-13.png', 'BTS-14-1.jpg', 'BTS-14.jpg',
  'BTS-15.jpg', 'BTS-16.jpg', 'BTS-17.jpg', 'BTS-18.jpg', 'BTS-19.jpg', 'BTS-2.jpeg', 'BTS-2.jpg', 'BTS-2.png',
  'BTS-20-scaled.jpg', 'BTS-21-scaled.jpg', 'BTS-22.jpg', 'BTS-23.jpg', 'BTS-24.jpg', 'BTS-25-scaled.jpg',
  'BTS-26-scaled.jpg', 'BTS-27-scaled.jpg', 'BTS-28-scaled.jpg', 'BTS-29-scaled.jpg', 'BTS-30-scaled.jpg',
  'BTS-31-scaled.jpg', 'BTS-33.jpg', 'BTS-3.jpeg', 'BTS-3.jpg', 'BTS-3.png', 'BTS-4.jpeg', 'BTS-4.jpg', 'BTS-4.png',
  'BTS-5.jpeg', 'BTS-5.jpg', 'BTS-5.png', 'BTS-6.jpeg', 'BTS-6.jpg', 'BTS-6.png', 'BTS-7.jpeg', 'BTS-7.jpg',
  'BTS-7.png', 'BTS-8.jpeg', 'BTS-8.jpg', 'BTS-8.png', 'BTS-9.jpeg', 'BTS-9.jpg', 'BTS-9.png',
  'AC-1.jpeg', 'AC-2.jpeg', 'AC-3.jpeg', 'AC-4.jpeg', 'AC-5.jpeg',
];

export const CLIENT_LOGOS = [
  'DLF.png', 'Hyundai.png', 'Nestle.png', 'MicroSoft.png', 'American-Express.png', 'Airtel.png', 'AbInBev.png',
  'BillMelinda.png', 'Unicif.png', 'UNP.png', 'Ministry.png', 'BrookfieldProperties.png', 'NDTV.png', 'Network18.png',
  'News18.png', 'Viacom.png', 'Voot.png', 'Naukri.png', 'AU.png', '1-Finance.png', 'SII.png', 'Hakuhodo.png',
  'Matrix.png', 'Mutal-Funds-02.png',
];

export const GENERATED = ['ai-hybrid', 'ai-studio', 'svc-post', 'svc-vr', 'svc-avatar'];

export const MEDIA_SOURCES = [
  ...FILM_STILLS.map(still),
  ...BTS_PHOTOS.map(bts),
  ...CLIENT_LOGOS.map(logo),
  ...GENERATED.map(gen),
];
