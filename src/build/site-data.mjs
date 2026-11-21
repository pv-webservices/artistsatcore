/**
 * Verified business content, taken from artistsatcore.com (Nov 2026).
 * Project titles come from the films' own YouTube titles. Nothing here is invented.
 */
export const SITE = {
  name: 'Artists at Core Films',
  short: 'Artists at Core',
  url: 'https://artistsatcore.com',
  tagline: 'You narrate. We create.',
  address: {
    line: 'B-503, Wembley Estate, Sector 49',
    city: 'Gurgaon',
    region: 'Haryana',
    postcode: '122018',
    full: 'B-503, Wembley Estate, Sector 49, Gurgaon 122018',
    map: 'https://maps.google.com/maps?q=B-503%2C%20Wembley%20Estate%2C%20Sector%2049%2C%20Gurgaon',
    embed: 'https://maps.google.com/maps?q=B-503%2C%20Wembley%20Estate%2C%20Sector49%2C%20Gurgaon&t=m&z=13&output=embed&iwloc=near',
  },
  phones: [
    { label: '+91 98107 36701', href: 'tel:+919810736701' },
    { label: '+91 95600 54772', href: 'tel:+919560054772' },
  ],
  emails: ['dheeraj@artistsatcore.com', 'richa@artistsatcore.com'],
  whatsapp: 'https://wa.me/919810736701?text=' + encodeURIComponent("Hi Artists at Core, I'd like a quote for a video."),
  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/13697874/' },
    { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100064005909036' },
    { label: 'Instagram', href: 'https://www.instagram.com/artistsatcore' },
  ],
  showreel: 'GOmWLN3ZV6U',
};

export const NAV = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#aboutus' },
  { label: 'Work', href: '/our-work/' },
  { label: 'Services', href: '/services/', dropdown: true },
  { label: 'AI Video', href: '/ai-video-production-gurgaon/' },
  { label: 'Gallery', href: '/gallery/' },
  { label: 'Contact', href: '/contact-us/' },
];

export const PROJECTS = [
  { id: 'Ygbw4mHHOIk', title: 'DLF Emporio', client: 'DLF', type: 'Brand film', cat: 'brand', img: 'DLF-Emporio.png' },
  { id: 'IcEaD0Db1wA', title: 'Samarth Heroes: Geetha Saleesh', client: 'Hyundai India', type: 'Brand film', cat: 'brand', img: 'Geetha-Saleesh-Samarth-by-Hyundai.png' },
  { id: 'UydFmYCLmxE', title: 'Beyond the Call of Duty', client: 'Indian Peacekeepers at the UN', type: 'Documentary', cat: 'doc', img: 'Beyond-Duty.png' },
  { id: 'idxIaUF3Pg0', title: 'Westin Brand Film', client: 'Westin', type: 'Brand film', cat: 'brand', img: 'Westin-Brand-Film-1.png' },
  { id: '-is80pYdO7A', title: 'Every Life Counts', client: 'Gates Foundation', type: 'Impact film', cat: 'impact', img: 'Bill-Gates.png', start: 11 },
  { id: 'IgIMKZ9oFgI', title: 'Swachh Bharat Film Competition', client: 'PIB India · ft. Amitabh Bachchan', type: 'Campaign', cat: 'impact', img: 'Swacch-Bharat.png' },
  { id: 'quzpjhlsvIU', title: 'The Strongest Link: Women Warriors of Chandmari', client: 'CNN-News18', type: 'Documentary', cat: 'doc', img: 'The-Strongest-Link.png' },
  { id: '0ViFQ-YS05Y', title: 'Pehchan Institute · Badlaav Humse Hai', client: 'AU Small Finance Bank × Network18', type: 'Branded series', cat: 'impact', img: 'Gazi-Khan-Barna-1.png' },
  { id: 'YOcGgzZe3i0', title: 'Anushka Menon', client: 'Samsung', type: 'Ad film', cat: 'brand', img: 'Samsung-Anushka-Menon.png' },
  { id: '-B2Kn2mtPeM', title: '#EducateTheGirlChild', client: 'Nestlé', type: 'Campaign', cat: 'impact', img: 'Nestle-Educate-A-GirlChild.png' },
  { id: '-rla1RaliOU', title: 'Brookfield Properties India Story', client: 'Brookfield Properties · Candor TechSpace', type: 'Corporate film', cat: 'corporate', img: 'Brookfield-Properties-in-India.png' },
  { id: 'IhMZcKbwltM', title: 'Naukri RMS: A New Age Recruitment Solution', client: 'Naukri', type: 'Product film', cat: 'corporate', img: 'Naukri-RMS.png' },
];

export const WORK_FILTERS = [
  { key: 'all', label: 'All films' },
  { key: 'brand', label: 'Brand & ad films' },
  { key: 'doc', label: 'Documentaries' },
  { key: 'impact', label: 'Campaigns & impact' },
  { key: 'corporate', label: 'Corporate & product' },
];

export const HERO_SLIDES = [
  'DLF-Emporio.png', 'Westin-Brand-Film-1.png', 'Gazi-Khan-Barna-1.png', 'Geetha-Saleesh-Samarth-by-Hyundai.png',
  'Beyond-the-Call-of-Duty.png', 'Bill-Gates.png',
];
export const HERO_SLIDE_TITLES = ['DLF Emporio', 'Westin', 'AU Small Finance Bank', 'Hyundai India', 'Beyond the Call of Duty', 'Gates Foundation'];

export const SERVICES = [
  {
    slug: 'corporate-videos', title: 'Corporate videos',
    desc: 'Company films, CEO messages, training videos and event coverage that look polished and professional.',
    tags: ['Company films', 'CEO messages', 'Training', 'Events'], img: 'BTS-23.jpg', imgPos: '50% 40%', example: '2vTems3Sg8U',
    alt: 'Crew filming an interview inside a corporate office',
  },
  {
    slug: 'ad-films', title: 'Ad films and commercials',
    desc: 'TV commercials, digital ads and social campaigns, from concept and script to final edit.',
    tags: ['TV commercials', 'Digital ads', 'Social campaigns'], img: 'Westin-Brand-Film.png', example: 'TpnRfO-JGao',
    alt: 'Still from the Westin brand film: a young woman shielding her eyes from the sun',
  },
  {
    slug: 'brand-films-documentaries', title: 'Brand films and documentaries',
    desc: "Story-led films that show your brand's purpose, people and impact.",
    tags: ['Brand stories', 'Documentaries', 'Purpose films'], img: 'Beyond-the-Call-of-Duty.png', example: 'EwpS0-IV7jI',
    alt: 'Still from Beyond the Call of Duty: Indian UN peacekeepers in blue helmets',
  },
  {
    slug: 'animation-explainers', title: 'Animation and explainers',
    desc: '2D and 3D animation and motion graphics that make complex ideas simple.',
    tags: ['2D', '3D', 'Motion graphics'], img: 'Naukri-RMS-1.png', example: 'Zy2lvG4DpfQ',
    alt: 'Motion graphics frame from the Naukri RMS explainer film',
  },
  {
    slug: 'vr-360-video', title: 'VR and 360° video',
    desc: 'Immersive experiences for real estate and hospitality.',
    tags: ['Real estate', 'Hospitality', 'Immersive'], img: 'svc-vr', example: 'MTPlhWz_T6c',
    alt: 'A 360-degree camera in a modern apartment overlooking a city skyline at dusk',
  },
  {
    slug: 'post-production', title: 'Post-production',
    desc: 'Editing, colour grading, sound design, VFX, subtitles and multi-language versions.',
    tags: ['Edit', 'Colour', 'Sound', 'VFX', 'Subtitles'], img: 'svc-post',
    alt: 'A colour grading suite with control panel and reference monitors',
  },
  {
    slug: 'ai-video-production', title: 'AI video production', isNew: true,
    desc: 'AI-generated and AI-assisted videos for ads, reels, explainers and training. Our producers handle script, direction and final polish.',
    tags: ['Ads', 'Reels', 'Explainers', 'Training'], img: 'ai-hybrid', link: '/ai-video-production-gurgaon/',
    alt: 'A cinema camera facing an LED wall showing a generated desert landscape',
  },
  {
    slug: 'ai-avatars-multi-language', title: 'AI avatars and multi-language videos', isNew: true,
    desc: 'One video in Hindi, English and more, with AI voice-over, presenters and subtitles. No reshoot needed.',
    tags: ['Hindi', 'English', 'AI voice-over', 'Subtitles'], img: 'svc-avatar', imgPos: '50% 25%', link: '/ai-video-production-gurgaon/',
    alt: 'A presenter in a blazer speaking to camera in a studio',
  },
];

export const WHY = [
  { title: 'Built by broadcasters', desc: 'Founded by award-winning ex-TV executives with deep television and news experience.' },
  { title: 'Boutique care', desc: 'Senior people on every project, not only in the pitch.' },
  { title: 'End-to-end service', desc: 'Concept, script, shoot, edit and delivery under one roof.' },
  { title: 'AI with a broadcaster’s eye', desc: 'AI tools guided by experienced producers, with script and brand review on every video.' },
];

export const PROCESS = [
  { title: 'Brief', desc: 'We learn your goals and audience.' },
  { title: 'Concept and script', desc: 'We develop the story and storyboard.' },
  { title: 'Shoot or generate', desc: 'Live crew, AI, or a mix of both.' },
  { title: 'Edit and polish', desc: 'Edit, sound, colour and graphics.' },
  { title: 'Delivery', desc: 'Files ready for TV, web and social.' },
];

export const AI_USES = [
  { title: 'Social ads and reels', desc: 'Short-form content for every platform, made faster.' },
  { title: 'Product and explainer videos', desc: 'Clear, visual explanations without a full shoot.' },
  { title: 'Training and HR videos', desc: 'Internal videos at the pace your teams need.' },
  { title: 'Hybrid projects', desc: 'Live action mixed with AI visuals.' },
];

export const FAQS = [
  { q: 'Where is your production house located?', a: 'We are in Sector 49, Gurgaon, and we shoot across Delhi NCR and all of India.' },
  { q: 'What types of videos do you make?', a: 'Corporate films, ad films, brand films, animation, documentaries, VR/360 and AI videos.' },
  { q: 'Do you make AI videos?', a: 'Yes. We create AI-generated and AI-assisted videos for ads, explainers, training and social media, with professional scripting, editing and sound.' },
  { q: 'Is an AI video cheaper than a normal shoot?', a: 'Often yes, especially for explainers, social content and multi-language versions. Cost depends on length, complexity and polish. Share your brief for a quote.' },
  { q: 'How much does a corporate video cost?', a: 'It depends on length, crew, locations and post-production. Send us your brief and we will share a clear quote.' },
  { q: 'How long does a video take?', a: 'Most projects take 2 to 6 weeks from brief to final delivery.' },
];

export const CLIENTS = [
  ['DLF.png', 'DLF'], ['Hyundai.png', 'Hyundai'], ['Nestle.png', 'Nestlé'], ['MicroSoft.png', 'Microsoft'],
  ['American-Express.png', 'American Express'], ['Airtel.png', 'Airtel'], ['AbInBev.png', 'AB InBev'],
  ['BillMelinda.png', 'Bill & Melinda Gates Foundation'], ['Unicif.png', 'UNICEF'], ['UNP.png', 'United Nations Peacekeeping'],
  ['Ministry.png', 'Ministry of External Affairs'], ['BrookfieldProperties.png', 'Brookfield Properties'],
  ['NDTV.png', 'NDTV'], ['Network18.png', 'Network18'], ['News18.png', 'News18 Network'], ['Viacom.png', 'Viacom18'],
  ['Voot.png', 'Voot'], ['Naukri.png', 'Naukri.com'], ['AU.png', 'AU Small Finance Bank'], ['1-Finance.png', '1 Finance'],
  ['SII.png', 'Serum Institute of India'], ['Hakuhodo.png', 'Hakuhodo'], ['Matrix.png', 'Matrix'],
  ['Mutal-Funds-02.png', 'Mutual Funds Sahi Hai'],
];

export const HOME_BTS = [
  ['BTS-17.jpg', 'Amitabh Bachchan with the Artists at Core crew on set'],
  ['BTS-2.png', 'A camera jib rigged at a stadium shoot'],
  ['BTS-20-scaled.jpg', 'Folk musicians performing for the camera in the desert'],
  ['BTS-9.png', 'A green-screen studio set up with cameras and lights'],
  ['BTS-1.png', 'Dancers rehearsing on stage, in black and white'],
  ['BTS-3.jpeg', 'The crew filming in a Himalayan village'],
  ['BTS-12.jpeg', 'A night shoot around a bonfire'],
  ['BTS-30-scaled.jpg', 'An athlete in a wheelchair lit for an interview'],
  ['BTS-7.jpg', 'The team with UN peacekeepers on location'],
];
