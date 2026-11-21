/** Site chrome: <head>, header + drawer, footer, floating actions and global overlays. */
import { SITE, NAV, SERVICES, FAQS } from './site-data.mjs';
import { esc, ICONS, btn, socialIcon, pad } from './ui.mjs';

const FONTS =
  'https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,62..125,300..900;1,62..125,400..700' +
  '&family=Newsreader:ital,opsz,wght@1,6..72,300..600&family=Azeret+Mono:wght@400;500&display=swap';

function localBusinessLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE.name,
    url: SITE.url,
    image: `${SITE.url}/og-image.jpg`,
    logo: `${SITE.url}/media/logo.png`,
    description:
      'Video production house in Gurgaon for corporate films, ad films, animation and AI videos.',
    telephone: '+91 98107 36701',
    email: SITE.emails[0],
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.line,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postcode,
      addressCountry: 'IN',
    },
    areaServed: ['Gurgaon', 'Delhi NCR', 'India'],
    sameAs: SITE.social.map((s) => s.href),
  };
}

function faqLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

export function head({ title, desc, path = '/', faq = false, noindex = false }) {
  const url = SITE.url + path;
  const ld = [localBusinessLd()];
  if (faq) ld.push(faqLd(faq === true ? FAQS : faq));
  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
${noindex ? '<meta name="robots" content="noindex">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#0d0c0b">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE.url}/og-image.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<style>html{background:#0d0c0b;color:#f1ece3;color-scheme:dark}body{margin:0;background:#0d0c0b}svg:not([width]){width:1em;height:1em}</style>
<link rel="stylesheet" href="/src/styles/main.css">
<script>document.documentElement.classList.add('js');setTimeout(function(){var h=document.documentElement;if(!h.classList.contains('is-ready'))h.classList.add('no-anim','is-ready')},4500);try{if(sessionStorage.getItem('aac-intro'))document.documentElement.classList.add('intro-seen')}catch(e){}</script>
<script type="application/ld+json">${JSON.stringify(ld.length === 1 ? ld[0] : ld)}</script>`;
}

const logo = (cls = '') =>
  `<a href="/" class="logo ${cls}" aria-label="Artists at Core Films — home"><img src="/media/logo.webp" width="360" height="205" alt="Artists at Core Films"></a>`;

function servicesMenu() {
  return SERVICES.map(
    (s, i) =>
      `<li><a href="/services/#${s.slug}"><span class="dd__num">${pad(i + 1)}</span><span class="dd__title">${s.title}</span>${s.isNew ? '<span class="tag-new">New</span>' : ''}</a></li>`,
  ).join('');
}

export function header({ current = '/' } = {}) {
  const isActive = (href) => (href === current ? ' aria-current="page"' : '');
  const desktop = NAV.map((n) => {
    if (!n.dropdown) return `<li><a class="nav__link" href="${n.href}"${isActive(n.href)}><span>${n.label}</span></a></li>`;
    return `<li class="nav__item--dd" data-dropdown>
      <div class="nav__dd-trigger">
        <a class="nav__link" href="${n.href}"${isActive(n.href)}><span>${n.label}</span></a>
        <button class="nav__chev" type="button" aria-expanded="false" aria-controls="dd-services" aria-label="Show services">${ICONS.chevron}</button>
      </div>
      <div class="dd" id="dd-services">
        <ul class="dd__list">${servicesMenu()}</ul>
        <a class="dd__all" href="/services/">All services ${ICONS.arrow}</a>
      </div>
    </li>`;
  }).join('');

  const mobile = NAV.map((n, i) => {
    if (!n.dropdown)
      return `<li><a class="drawer__link" href="${n.href}"${isActive(n.href)}><span class="drawer__num">${pad(i + 1)}</span>${n.label}</a></li>`;
    return `<li class="drawer__group">
      <div class="drawer__row">
        <a class="drawer__link" href="${n.href}"${isActive(n.href)}><span class="drawer__num">${pad(i + 1)}</span>${n.label}</a>
        <button class="drawer__toggle" type="button" aria-expanded="false" aria-controls="drawer-services" aria-label="Show services">${ICONS.chevron}</button>
      </div>
      <ul class="drawer__sub" id="drawer-services" hidden>${SERVICES.map((s) => `<li><a href="/services/#${s.slug}">${s.title}${s.isNew ? ' <span class="tag-new">New</span>' : ''}</a></li>`).join('')}</ul>
    </li>`;
  }).join('');

  return `<a class="skip" href="#main">Skip to content</a>
<header class="site-header" data-header>
  <div class="site-header__inner">
    ${logo('site-header__logo')}
    <nav class="nav" aria-label="Main">
      <ul class="nav__list">${desktop}</ul>
    </nav>
    <div class="site-header__actions">
      ${btn('Get a free quote', '/contact-us/', { variant: 'primary', cls: 'btn--sm site-header__cta' })}
      <button class="burger" type="button" aria-expanded="false" aria-controls="drawer" aria-label="Open menu" data-burger>
        <span class="burger__lines" aria-hidden="true"><span></span><span></span></span>
        <span class="burger__text">Menu</span>
      </button>
    </div>
  </div>
</header>
<div class="drawer-scrim" data-drawer-scrim hidden></div>
<aside class="drawer" id="drawer" aria-label="Menu" aria-hidden="true" data-drawer inert>
  <div class="drawer__head">
    ${logo('drawer__logo')}
    <button class="drawer__close" type="button" aria-label="Close menu" data-drawer-close>${ICONS.close}</button>
  </div>
  <nav aria-label="Mobile"><ul class="drawer__list">${mobile}</ul></nav>
  <div class="drawer__foot">
    ${btn('Get a free quote', '/contact-us/', { variant: 'primary', cls: 'btn--block' })}
    <div class="drawer__contact">
      ${SITE.phones.map((p) => `<a href="${p.href}">${ICONS.phone}<span>${p.label}</span></a>`).join('')}
      <a href="mailto:${SITE.emails[0]}">${ICONS.mail}<span>${SITE.emails[0]}</span></a>
    </div>
    <div class="social">${SITE.social.map((s) => `<a href="${s.href}" target="_blank" rel="noopener" aria-label="${s.label}">${socialIcon(s.label)}</a>`).join('')}</div>
  </div>
</aside>`;
}

export function footer() {
  const navLinks = NAV.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join('');
  return `<footer class="site-footer" data-theme="ink">
  <div class="wrap site-footer__top">
    <div class="site-footer__brand">
      <img src="/media/logo.webp" width="360" height="205" alt="Artists at Core Films" class="site-footer__logo" loading="lazy">
      <p class="site-footer__tag">You narrate. <em>We create.</em></p>
      <p class="site-footer__blurb">Video production house in Gurgaon, serving brands and agencies across Delhi NCR and India.</p>
    </div>
    <div class="site-footer__cols">
      <div><h2 class="site-footer__h">Find us</h2><address><a href="${SITE.address.map}" target="_blank" rel="noopener">${SITE.address.line},<br>${SITE.address.city} ${SITE.address.postcode}</a></address></div>
      <div><h2 class="site-footer__h">Speak to us</h2><ul>${SITE.phones.map((p) => `<li><a href="${p.href}">${p.label}</a></li>`).join('')}</ul></div>
      <div><h2 class="site-footer__h">Write to us</h2><ul>${SITE.emails.map((e) => `<li><a href="mailto:${e}">${e}</a></li>`).join('')}</ul></div>
      <div><h2 class="site-footer__h">Explore</h2><ul class="site-footer__nav">${navLinks}</ul></div>
      <div><h2 class="site-footer__h">Social</h2><ul>${SITE.social.map((s) => `<li><a href="${s.href}" target="_blank" rel="noopener">${s.label} ${ICONS.arrowUp}</a></li>`).join('')}</ul></div>
    </div>
  </div>
  <div class="site-footer__mark" aria-hidden="true"><span>Artists</span><span class="at">@</span><span>Core</span></div>
  <div class="wrap site-footer__bottom">
    <p>© 2026 Artists at Core Films</p>
    <a href="#top" class="to-top" data-to-top>Back to top ${ICONS.arrowUp}</a>
  </div>
</footer>`;
}

export function globals() {
  return `<a class="wa-fab" href="${SITE.whatsapp}" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">${ICONS.whatsapp}<span class="wa-fab__label">WhatsApp</span></a>
<div class="loader" data-loader aria-hidden="true">
  <div class="loader__leader">
    <svg class="loader__ring" viewBox="0 0 200 200"><circle cx="100" cy="100" r="88"/><circle cx="100" cy="100" r="70"/><path d="M100 0v200M0 100h200"/></svg>
    <div class="loader__sweep"></div>
    <span class="loader__count" data-loader-count>3</span>
  </div>
  <p class="loader__meta"><span>A@C FILMS</span><span data-loader-tc>00:00:00:00</span></p>
</div>
<div class="curtain" data-curtain aria-hidden="true"><img src="/media/logo.webp" width="360" height="205" alt=""></div>
<dialog class="vmodal" data-vmodal aria-label="Video player">
  <button class="vmodal__close" type="button" data-vmodal-close aria-label="Close video">${ICONS.close}</button>
  <div class="vmodal__frame" data-vmodal-frame></div>
</dialog>
<dialog class="lightbox" data-lightbox aria-label="Image viewer">
  <button class="lightbox__close" type="button" data-lb-close aria-label="Close">${ICONS.close}</button>
  <button class="lightbox__nav lightbox__nav--prev" type="button" data-lb-prev aria-label="Previous image">${ICONS.arrow}</button>
  <figure class="lightbox__fig"><img alt="" data-lb-img><figcaption data-lb-cap></figcaption></figure>
  <button class="lightbox__nav lightbox__nav--next" type="button" data-lb-next aria-label="Next image">${ICONS.arrow}</button>
  <p class="lightbox__count" data-lb-count></p>
</dialog>
<div class="cursor" data-cursor-el aria-hidden="true"><span class="cursor__label" data-cursor-label></span></div>`;
}
