/** Reusable page sections. Each returns static HTML; behaviour is attached in src/js. */
import {
  SITE, PROJECTS, SERVICES, WHY, PROCESS, FAQS, CLIENTS, HOME_BTS, AI_USES,
} from './site-data.mjs';
import { img, esc, ICONS, btn, heading, eyebrow, pad } from './ui.mjs';

const byId = (id) => PROJECTS.find((p) => p.id === id);
const ytHref = (p) => `https://www.youtube.com/watch?v=${p.id}${p.start ? `&t=${p.start}s` : ''}`;
const videoAttrs = (p) => `data-video="${p.id}"${p.start ? ` data-start="${p.start}"` : ''}`;

/* ---------- Home hero: graded film stills, each one linked to its film ---------- */
const HERO = [
  { img: 'Gazi-Khan-Barna-1.png', pid: '0ViFQ-YS05Y', label: 'AU Small Finance Bank × Network18' },
  { img: 'Beyond-the-Call-of-Duty.png', pid: 'UydFmYCLmxE', label: 'Beyond the Call of Duty', pos: '50% 30%' },
  { img: 'Westin-Brand-Film-1.png', pid: 'idxIaUF3Pg0', label: 'Westin Brand Film' },
  { img: 'Geetha-Saleesh-Hyundai-Film.png', pid: 'IcEaD0Db1wA', label: 'Samarth by Hyundai' },
  { img: 'DLF-Emporio.png', pid: 'Ygbw4mHHOIk', label: 'DLF Emporio' },
  { img: 'Bill-Gates.png', pid: '-is80pYdO7A', label: 'Gates Foundation · Every Life Counts' },
];

export function homeHero() {
  const slides = HERO.map(
    (s, i) =>
      `<div class="hero__slide${i === 0 ? ' is-active' : ''}">${img(s.img, {
        alt: i === 0 ? 'Aerial still from the AU Small Finance Bank film by Artists at Core' : '',
        sizes: '100vw', eager: i < 2, priority: i === 0, pos: s.pos || '',
      })}</div>`,
  ).join('');
  const meta = HERO.map((s) => {
    const p = byId(s.pid);
    return { title: s.label, type: p.type, id: p.id, start: p.start || '' };
  });
  return `<section class="hero" data-hero aria-label="Introduction">
  <div class="hero__media" aria-hidden="true">${slides}</div>
  <div class="hero__shade" aria-hidden="true"></div>
  <div class="wrap hero__inner">
    <div class="hero__content">
      <p class="eyebrow hero__kicker" data-reveal>Video production house · Gurgaon</p>
      ${heading('Stories that|move people.|*Films that*|*move brands.*', { tag: 'h1', cls: 'h-hero hero__title' })}
      <p class="hero__lead" data-reveal>Corporate films, ad films, animation, documentaries and AI video, made by award-winning ex-TV executives: broadcast-level quality with boutique care.</p>
      <div class="hero__ctas" data-reveal>
        ${btn('Watch showreel', '', { variant: 'solid', icon: 'play', button: true, attrs: `data-video="${SITE.showreel}" aria-label="Watch the Artists at Core showreel"` })}
        ${btn('Start a project', '/contact-us/', { variant: 'outline' })}
      </div>
    </div>
    <button class="hero__play" type="button" data-video="${SITE.showreel}" aria-label="Play the showreel" data-reveal>
      <span class="hero__play-ring">${ICONS.play}</span>
      <span class="hero__play-label">Play showreel</span>
    </button>
  </div>
  <div class="wrap hero__foot" data-reveal>
    <button class="hero__now" type="button" data-hero-now data-video="${meta[0].id}"${meta[0].start ? ` data-start="${meta[0].start}"` : ''}>
      <span class="hero__now-k">Now showing</span>
      <span class="hero__now-t" data-hero-title>${esc(meta[0].title)}</span>
      <span class="hero__now-type" data-hero-type>${esc(meta[0].type)}</span>
      <span class="hero__now-icon">${ICONS.play}</span>
    </button>
    <div class="hero__dots" role="tablist" aria-label="Featured films">${meta
      .map((m, i) => `<button type="button" class="hero__dot${i === 0 ? ' is-active' : ''}" role="tab" aria-selected="${i === 0}" aria-label="${esc(m.title)}" data-hero-dot="${i}" data-title="${esc(m.title)}" data-type="${esc(m.type)}" data-id="${m.id}" data-start="${m.start}"><i></i></button>`)
      .join('')}</div>
    <span class="hero__scroll" aria-hidden="true">Scroll<i></i></span>
  </div>
</section>`;
}

/* ---------- Project cards ---------- */
export function projectCard(p, { sizes = '(max-width: 700px) 92vw, 33vw', cls = '', heading: tag = 'h3' } = {}) {
  return `<article class="pcard ${cls}" data-cat="${p.cat}" data-reveal>
  <a class="pcard__link" href="${ytHref(p)}" target="_blank" rel="noopener" ${videoAttrs(p)} aria-label="Play ${esc(p.title)} — ${esc(p.client)}">
    <div class="pcard__media">${img(p.img, { alt: `Still from ${p.title} for ${p.client}`, sizes })}</div>
    <span class="pcard__play" aria-hidden="true">${ICONS.play}</span>
    <div class="pcard__body">
      <${tag} class="pcard__title">${esc(p.title)}</${tag}>
      <p class="pcard__meta"><span>${esc(p.type)}</span><span>${esc(p.client)}</span></p>
    </div>
  </a>
</article>`;
}

const HOME_WORK = ['Ygbw4mHHOIk', '-is80pYdO7A', 'IcEaD0Db1wA', '-rla1RaliOU', 'YOcGgzZe3i0', '-B2Kn2mtPeM'];

export function selectedWork() {
  const items = HOME_WORK.map(byId);
  return `<section class="work-home section" aria-labelledby="work-h">
  <div class="wrap">
    <div class="sec-head">
      <div>${eyebrow('Selected work')}${heading('Stories we’ve brought to life.', { id: 'work-h' })}</div>
      <a class="text-link" href="/our-work/" data-reveal>View all work ${ICONS.arrowUp}</a>
    </div>
    <div class="work-home__grid">${items
      .map((p, i) => projectCard(p, { cls: i < 2 ? 'pcard--lg' : 'pcard--sm', sizes: i < 2 ? '(max-width: 700px) 92vw, 46vw' : '(max-width: 700px) 46vw, 23vw' }))
      .join('')}</div>
  </div>
</section>`;
}

/* ---------- About ---------- */
export function about() {
  const facts = [
    { n: CLIENTS.length, suffix: '+', t: 'Brands, broadcasters and institutions' },
    { n: SERVICES.length, t: 'Services under one roof, script to delivery' },
    { n: PROCESS.length, t: 'Clear steps from brief to final files' },
    { word: 'Pan-India', t: 'Based in Gurgaon, shooting across India' },
  ];
  return `<section class="about section" id="aboutus" aria-labelledby="about-h">
  <div class="wrap about__grid">
    <figure class="about__media" data-reveal>
      <div class="about__img" data-parallax="8">${img('BTS-2.png', { alt: 'A camera rig on a crane, silhouetted against a stadium window during an Artists at Core shoot', sizes: '(max-width: 900px) 92vw, 52vw' })}</div>
      <figcaption>On set · Stadium shoot</figcaption>
    </figure>
    <div class="about__text">
      ${eyebrow('About us')}
      ${heading('We believe every|story deserves to|be told beautifully.', { id: 'about-h' })}
      <div class="prose about__prose" data-reveal>
        <p>Artists at Core Films is a video production house in Gurgaon, serving brands and agencies across Delhi NCR and India. Founded by award-winning ex-TV executives, we bring <strong>broadcast-level quality with boutique care.</strong></p>
        <p>We make corporate films, ad films, animation and documentaries, and we now offer AI video production: faster, more affordable videos with human creative direction behind every frame.</p>
      </div>
      <div class="about__ctas" data-reveal>${btn('Discover our work', '/our-work/', { variant: 'solid' })}</div>
    </div>
  </div>
  <div class="wrap">
    <ul class="facts">${facts
      .map(
        (f) =>
          `<li class="fact" data-reveal><span class="fact__n">${f.word ? f.word : `<span data-count="${f.n}">${pad(f.n)}</span>${f.suffix || ''}`}</span><span class="fact__t">${f.t}</span></li>`,
      )
      .join('')}</ul>
  </div>
</section>`;
}

/* ---------- Services grid ---------- */
export function serviceTile(s, i) {
  const href = s.link || `/services/#${s.slug}`;
  return `<li class="stile" data-reveal>
  <a href="${href}" class="stile__link">
    <div class="stile__media">${img(s.img, { alt: s.alt, sizes: '(max-width: 700px) 30vw, 25vw', pos: s.imgPos || '' })}</div>
    <div class="stile__body">
      <span class="stile__num">${pad(i + 1)}${s.isNew ? '<span class="tag-new">New</span>' : ''}</span>
      <h3 class="stile__title">${s.title}</h3>
      <p class="stile__desc">${s.desc}</p>
    </div>
    <span class="stile__arrow" aria-hidden="true">${ICONS.arrowUp}</span>
  </a>
</li>`;
}

export function servicesGrid() {
  return `<section class="services-home section surface" aria-labelledby="svc-h">
  <div class="wrap">
    <div class="sec-head">
      <div>${eyebrow('What we do')}${heading('Our creative services', { id: 'svc-h' })}</div>
      <p class="sec-head__aside" data-reveal>From the first idea to final delivery, one team handles script, shoot, edit and sound.</p>
    </div>
    <ul class="stiles">${SERVICES.map(serviceTile).join('')}</ul>
  </div>
</section>`;
}

/* ---------- AI teaser ---------- */
export function aiTeaser() {
  return `<section class="ai section" aria-labelledby="ai-h">
  <div class="wrap ai__grid">
    <div class="ai__text">
      ${eyebrow('New · AI video production')}
      ${heading('Faster, smarter,|*still human.*', { id: 'ai-h' })}
      <p class="lead" data-reveal>AI cuts time and cost. Our team keeps the quality and the brand safe. We use it where it works best:</p>
      <ol class="ai__uses">${AI_USES.map((u, i) => `<li data-reveal><span class="ai__n">${pad(i + 1)}</span><span><b>${u.title}</b><small>${u.desc}</small></span></li>`).join('')}</ol>
      <div data-reveal>${btn('Explore AI video', '/ai-video-production-gurgaon/', { variant: 'outline' })}</div>
    </div>
    <div class="ai__media" data-reveal>
      <div class="ai__img" data-parallax="8">${img('ai-hybrid', { alt: 'A cinema camera on set facing an LED wall showing a generated desert landscape', sizes: '(max-width: 900px) 92vw, 55vw' })}</div>
      <div class="ai__card">
        ${img('svc-avatar', { alt: 'An AI presenter speaking to camera', sizes: '120px', pos: '50% 20%' })}
        <div><p>AI avatars &amp; multi-language</p><ul class="ai__langs" aria-label="Languages"><li>Hindi</li><li>English</li><li>+ more</li></ul></div>
      </div>
    </div>
  </div>
</section>`;
}

/* ---------- Why us ---------- */
export function whyUs() {
  return `<section class="why section surface" aria-labelledby="why-h">
  <div class="wrap why__grid">
    <div class="why__head">
      ${eyebrow('Why Artists at Core')}
      ${heading('Broadcast pedigree.|*Boutique care.*', { id: 'why-h' })}
      <figure class="why__media" data-reveal>${img('BTS-17.jpg', { alt: 'Amitabh Bachchan reviewing a shot with the Artists at Core team', sizes: '(max-width: 900px) 92vw, 40vw', pos: '50% 30%' })}</figure>
    </div>
    <ul class="why__list">${WHY.map(
      (w, i) => `<li class="why__item" data-reveal><span class="why__n">${pad(i + 1)}</span><h3 class="h3">${w.title}</h3><p>${w.desc}</p></li>`,
    ).join('')}</ul>
  </div>
</section>`;
}

/* ---------- Clients ---------- */
export function clients() {
  return `<section class="clients section" id="clientcollaborations" aria-labelledby="cl-h">
  <div class="wrap">
    <div class="sec-head">
      <div>${eyebrow('Trusted by')}${heading('Brands that shape the world.', { id: 'cl-h' })}</div>
      <p class="sec-head__aside" data-reveal>Brands, broadcasters and institutions we have told stories for.</p>
    </div>
    <ul class="logos">${CLIENTS.map(([f, n]) => `<li data-reveal>${img(f, { alt: n })}</li>`).join('')}</ul>
  </div>
</section>`;
}

/* ---------- Process ---------- */
export function processTimeline({ id = '' } = {}) {
  return `<section class="process section" aria-labelledby="pr-h"${id ? ` id="${id}"` : ''}>
  <div class="wrap">
    <div class="sec-head">
      <div>${eyebrow('How we work')}${heading('From brief to *final cut.*', { id: 'pr-h' })}</div>
      <p class="sec-head__aside" data-reveal>Live crew, AI, or a mix of both. One team from the first call to files ready for TV, web and social.</p>
    </div>
    <ol class="steps" data-steps>${PROCESS.map(
      (s, i) => `<li class="step" data-reveal style="--d:${(i * 0.08).toFixed(2)}s"><span class="step__n">${pad(i + 1)}</span><h3 class="step__t">${s.title}</h3><p class="step__d">${s.desc}</p></li>`,
    ).join('')}</ol>
  </div>
</section>`;
}

/* ---------- Behind the scenes ---------- */
export function btsFeature() {
  const strip = HOME_BTS.map(([f, alt]) => `<li>${img(f, { alt, sizes: '(max-width: 700px) 60vw, 26vw' })}</li>`).join('');
  return `<section class="bts section surface" aria-labelledby="bts-h">
  <div class="wrap bts__grid">
    <figure class="bts__media" data-reveal><div data-parallax="8">${img('BTS-20-scaled.jpg', { alt: 'Folk musicians performing for the camera in the desert', sizes: '(max-width: 900px) 92vw, 58vw' })}</div></figure>
    <div class="bts__text">
      ${eyebrow('Behind the scenes')}
      ${heading('Behind every frame,|there’s a story.', { id: 'bts-h' })}
      <p class="lead" data-reveal>Studios and stadiums, deserts and Himalayan villages. A look at our crews on set and on location across India.</p>
      <div data-reveal>${btn('Explore the gallery', '/gallery/', { variant: 'outline' })}</div>
    </div>
  </div>
  <div class="marquee" aria-hidden="true"><ul class="marquee__track">${strip}</ul><ul class="marquee__track">${strip}</ul></div>
</section>`;
}

/* ---------- FAQ ---------- */
export function faq(items = FAQS) {
  return `<section class="faq section" aria-labelledby="faq-h">
  <div class="wrap faq__grid">
    <div class="faq__intro">
      ${eyebrow('FAQ')}
      ${heading('Questions,|*answered.*', { id: 'faq-h' })}
      <p class="lead" data-reveal>Still curious? Share your brief and we will suggest the right kind of video, a plan and a clear quote.</p>
      <div data-reveal>${btn('Talk to us', '/contact-us/', { variant: 'outline' })}</div>
    </div>
    <div class="faq__list">${items
      .map(
        (f, i) => `<details class="faq__item" data-faq data-reveal${i === 0 ? ' open' : ''}>
        <summary><span class="faq__q"><span class="faq__n">${pad(i + 1)}</span>${f.q}</span><span class="faq__icon" aria-hidden="true">${ICONS.plus}</span></summary>
        <div class="faq__a"><p>${f.a}</p></div>
      </details>`,
      )
      .join('')}</div>
  </div>
</section>`;
}

/* ---------- Closing CTA ---------- */
export function ctaBand({ kicker = 'Have a project in mind?', title = 'Let’s make something|unforgettable.', sub = 'Share your brief and we will suggest the right kind of video, a plan and a clear quote.', image = 'BTS-18.jpg' } = {}) {
  return `<section class="cta" aria-labelledby="cta-h">
  <div class="cta__bg" aria-hidden="true"><div data-parallax="14">${img(image, { alt: '', sizes: '100vw' })}</div></div>
  <div class="wrap cta__inner">
    ${eyebrow(kicker, 'eyebrow--plain')}
    ${heading(title, { id: 'cta-h', cls: 'h1 cta__title' })}
    <p class="cta__sub" data-reveal>${sub}</p>
    <div class="cta__actions" data-reveal>
      ${btn('Start a project', '/contact-us/', { variant: 'solid' })}
      ${btn('WhatsApp us', SITE.whatsapp, { variant: 'outline', icon: 'whatsapp', attrs: 'target="_blank" rel="noopener"' })}
    </div>
    <p class="cta__phone" data-reveal>Or call <a href="${SITE.phones[0].href}">${SITE.phones[0].label}</a></p>
  </div>
</section>`;
}

/* ---------- Inner page hero ---------- */
export function pageHero({ crumb, eyebrow: kicker = '', title, lead, image, imageAlt = '', pos = '', actions = [] }) {
  const acts = actions.length
    ? `<div class="phero__actions" data-reveal>${actions.map(([l, h, v]) => btn(l, h, { variant: v || 'solid' })).join('')}</div>`
    : '';
  return `<section class="phero${image ? ' phero--image' : ''}">
  ${image ? `<div class="phero__bg"><div data-parallax="12">${img(image, { alt: imageAlt, sizes: '100vw', eager: true, priority: true, pos })}</div></div>` : ''}
  <div class="wrap phero__inner">
    <nav class="crumbs" aria-label="Breadcrumb" data-reveal><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">${crumb}</span></nav>
    ${kicker ? eyebrow(kicker) : ''}
    ${heading(title, { tag: 'h1', cls: 'h1 phero__title' })}
    ${lead ? `<p class="lead phero__lead" data-reveal>${lead}</p>` : ''}
    ${acts}
  </div>
</section>`;
}

