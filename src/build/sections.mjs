/** Reusable page sections. Each returns static HTML; behaviour is attached in src/js. */
import {
  SITE, PROJECTS, HERO_SLIDES, HERO_SLIDE_TITLES, SERVICES, WHY, PROCESS, FAQS, CLIENTS, HOME_BTS, AI_USES,
} from './site-data.mjs';
import { img, esc, ICONS, btn, splitHeading, label, pad } from './ui.mjs';

/* ---------- Home hero: the viewfinder ---------- */
export function homeHero() {
  const slides = HERO_SLIDES.map(
    (name, i) =>
      `<div class="vf__slide${i === 0 ? ' is-active' : ''}" data-title="${esc(HERO_SLIDE_TITLES[i])}">${img(name, {
        alt: i === 0 ? 'Still from the DLF Emporio film by Artists at Core' : '',
        sizes: '100vw', eager: i < 2, priority: i === 0,
      })}</div>`,
  ).join('');
  return `<section class="hero" data-hero data-theme="ink" aria-label="Introduction">
  <div class="hero__media" data-hero-media>
    <div class="vf__slides" data-vf-slides>${slides}</div>
    <div class="hero__shade" data-hero-shade></div>
  </div>
  <div class="vf__ui" data-vf-ui aria-hidden="true">
    <span class="vf__corner vf__corner--tl"></span><span class="vf__corner vf__corner--tr"></span>
    <span class="vf__corner vf__corner--bl"></span><span class="vf__corner vf__corner--br"></span>
    <span class="vf__rec"><i></i>REC</span>
    <span class="vf__tc" data-vf-tc>00:00:00:00</span>
    <span class="vf__title"><small>Now showing</small><b data-vf-title>${esc(HERO_SLIDE_TITLES[0])}</b></span>
    <span class="vf__count"><b data-vf-index>01</b> / ${pad(HERO_SLIDES.length)}</span>
  </div>
  <div class="hero__layout wrap" data-hero-layout>
    <h1 class="hero__title">
      <span class="hero__kicker" data-hero-kicker><span class="dot"></span>Video production house in Gurgaon</span>
      <span class="hero__line hero__line--1" data-hero-line="1"><span class="hero__word">You narrate</span></span>
      <span class="hero__slot" data-hero-slot aria-hidden="true"></span>
      <span class="hero__line hero__line--2" data-hero-line="2"><span class="hero__word"><em>we</em> create.</span></span>
    </h1>
    <div class="hero__foot" data-hero-foot>
      <p class="hero__lead">Corporate films, ad films, animation, documentaries and AI video. Founded by award-winning ex-TV executives: <strong>broadcast-level quality with boutique care.</strong></p>
      <div class="hero__ctas">
        ${btn('Get a free quote', '/contact-us/', { variant: 'primary' })}
        <button class="btn btn--ghost" type="button" data-video="${SITE.showreel}" data-cursor="Play"><span class="btn__fill" aria-hidden="true"></span><span class="btn__label">Watch showreel</span><span class="btn__icon">${ICONS.play}</span></button>
      </div>
    </div>
  </div>
  <div class="hero__reveal" data-hero-reveal>
    <button class="reel-btn" type="button" data-video="${SITE.showreel}" aria-label="Play the Artists at Core showreel" data-cursor="Play">
      <svg class="reel-btn__ring" viewBox="0 0 200 200" aria-hidden="true"><defs><path id="reelPath" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"/></defs><text><textPath href="#reelPath">SHOWREEL · ARTISTS AT CORE FILMS · SHOWREEL · ARTISTS AT CORE FILMS ·</textPath></text></svg>
      <span class="reel-btn__core">${ICONS.play}</span>
    </button>
    <p class="hero__reveal-copy">Trusted by DLF, Hyundai, Nestlé <em>&amp; more.</em></p>
  </div>
  <div class="hero__scroll" data-hero-scroll aria-hidden="true"><span>Scroll</span><i></i></div>
</section>`;
}

/* ---------- About ---------- */
export function about() {
  const facts = [
    { n: CLIENTS.length, t: 'Brands, broadcasters and institutions in our client roster' },
    { n: SERVICES.length, t: 'Services under one roof, from script to final delivery' },
    { n: PROCESS.length, t: 'Clear steps from brief to files ready for TV, web and social' },
    { n: null, big: 'Pan-India', t: 'Based in Sector 49, Gurgaon. We shoot across Delhi NCR and all of India.' },
  ];
  return `<section class="about section" id="aboutus" data-theme="bone">
  <div class="wrap">
    ${label('01', 'About the studio')}
    <p class="about__statement" data-words>Artists at Core Films is a video production house in Gurgaon, serving brands and agencies across Delhi NCR and India. Founded by award-winning ex-TV executives, we bring broadcast-level quality with boutique care.</p>
    <div class="about__row">
      <p class="about__sub" data-reveal>We make corporate films, ad films, animation and documentaries, and we now offer <strong>AI video production</strong>: faster, more affordable videos with human creative direction behind every frame.</p>
      <div class="about__ctas" data-reveal>${btn('Get a free quote', '/contact-us/', { variant: 'dark' })}${btn('Watch our work', '/our-work/', { variant: 'line-dark' })}</div>
    </div>
    <ul class="facts">${facts
      .map(
        (f) =>
          `<li class="fact" data-reveal><span class="fact__n${f.n === null ? ' fact__n--word' : ''}">${f.n !== null ? `<span data-count="${f.n}">${pad(f.n)}</span>` : f.big}</span><span class="fact__t">${f.t}</span></li>`,
      )
      .join('')}</ul>
  </div>
</section>`;
}

/* ---------- Project cards ---------- */
export function projectCard(p, i, { sizes = '(max-width: 900px) 84vw, 44vw', cls = '' } = {}) {
  const href = `https://www.youtube.com/watch?v=${p.id}${p.start ? `&t=${p.start}s` : ''}`;
  return `<article class="pcard ${cls}" data-cat="${p.cat}">
  <a class="pcard__link" href="${href}" target="_blank" rel="noopener" data-video="${p.id}"${p.start ? ` data-start="${p.start}"` : ''} data-cursor="Play" aria-label="Play ${esc(p.title)} — ${esc(p.client)}">
    <div class="pcard__media">${img(p.img, { alt: `Still from ${p.title} for ${p.client}`, sizes })}
      <span class="pcard__play" aria-hidden="true">${ICONS.play}</span>
      <span class="pcard__idx" aria-hidden="true">${pad(i + 1)}</span>
    </div>
    <div class="pcard__body">
      <p class="pcard__meta"><span>${esc(p.type)}</span><span>${esc(p.client)}</span></p>
      <h3 class="pcard__title">${esc(p.title)}</h3>
    </div>
  </a>
</article>`;
}

export function projectsRail() {
  return `<section class="work-rail section" data-theme="ink" data-rail aria-labelledby="work-h">
  <div class="wrap work-rail__head">
    <div>${label('02', 'Featured projects')}${splitHeading('Stories we’ve *told*', { id: 'work-h' })}</div>
    <div class="work-rail__aside" data-reveal>
      <p>Brand films, documentaries and campaigns for brands, broadcasters and institutions across India.</p>
      ${btn('All work', '/our-work/', { variant: 'line' })}
    </div>
  </div>
  <div class="work-rail__viewport" data-rail-viewport>
    <div class="work-rail__track" data-rail-track>${PROJECTS.map((p, i) => projectCard(p, i)).join('')}</div>
  </div>
  <div class="wrap work-rail__progress" aria-hidden="true">
    <span class="mono" data-rail-tc>00:00</span><span class="work-rail__bar"><i data-rail-bar></i></span><span class="mono">${pad(PROJECTS.length)} films</span>
  </div>
</section>`;
}

/* ---------- Services stack ---------- */
export function serviceCard(s, i, { detailed = false } = {}) {
  const example = s.example
    ? `<a class="link-arrow" href="https://www.youtube.com/watch?v=${s.example}" target="_blank" rel="noopener" data-video="${s.example}">${ICONS.play}<span>Watch an example</span></a>`
    : '';
  const more = s.link
    ? `<a class="link-arrow" href="${s.link}">${ICONS.arrow}<span>Explore AI video</span></a>`
    : detailed ? `<a class="link-arrow" href="/contact-us/?service=${s.slug}">${ICONS.arrow}<span>Get a quote for this</span></a>`
      : `<a class="link-arrow" href="/services/#${s.slug}">${ICONS.arrow}<span>Learn more</span></a>`;
  return `<article class="scard" id="${detailed ? s.slug : ''}" data-scard style="--i:${i}">
  <div class="scard__inner"><span class="scard__dim" aria-hidden="true"></span>
    <div class="scard__text">
      <p class="scard__num"><span>${pad(i + 1)}</span><span>/ ${pad(SERVICES.length)}</span>${s.isNew ? '<span class="tag-new">New</span>' : ''}</p>
      <h3 class="scard__title">${s.title}</h3>
      <p class="scard__desc">${s.desc}</p>
      <ul class="chips">${s.tags.map((t) => `<li>${t}</li>`).join('')}</ul>
      <div class="scard__links">${example}${more}</div>
    </div>
    <div class="scard__media">${img(s.img, { alt: s.alt, sizes: '(max-width: 900px) 92vw, 46vw', pos: s.imgPos || '' })}</div>
  </div>
</article>`;
}

export function servicesStack({ detailed = false, headline = true } = {}) {
  const head = headline
    ? `<div class="wrap services__head">
    <div>${label('03', 'What we make')}${splitHeading('Eight ways to tell <br>your *story*', { id: 'svc-h' })}</div>
    <p class="services__intro" data-reveal>From the first idea to final delivery, one team handles script, shoot, edit and sound.</p>
  </div>`
    : '';
  return `<section class="services section" data-theme="ink-2" aria-labelledby="svc-h">
  ${head}
  <div class="wrap services__stack" data-stack>${SERVICES.map((s, i) => serviceCard(s, i, { detailed })).join('')}</div>
</section>`;
}

/* ---------- AI teaser ---------- */
export function aiTeaser() {
  return `<section class="ai section" data-theme="ink" aria-labelledby="ai-h">
  <div class="wrap ai__grid">
    <div class="ai__media" data-parallax-wrap>
      <div class="ai__img" data-parallax="-8">${img('ai-hybrid', { alt: 'A cinema camera on set facing an LED wall showing a generated desert landscape', sizes: '(max-width: 900px) 92vw, 55vw' })}</div>
      <div class="ai__avatar" data-reveal>
        ${img('svc-avatar', { alt: 'An AI presenter speaking to camera', sizes: '220px', pos: '50% 20%' })}
        <ul class="ai__langs" aria-label="Languages"><li>Hindi</li><li>English</li><li>+ more</li></ul>
      </div>
    </div>
    <div class="ai__text">
      ${label('04', 'New · AI video production')}
      ${splitHeading('Faster, smarter, <br>*still human.*', { id: 'ai-h' })}
      <p class="ai__lead" data-reveal>AI cuts time and cost. Our team keeps the quality and the brand safe. We use it where it works best:</p>
      <ol class="ai__uses">${AI_USES.map((u, i) => `<li data-reveal><span class="mono">${pad(i + 1)}</span><span>${u.title}</span></li>`).join('')}</ol>
      <div data-reveal>${btn('Explore AI video', '/ai-video-production-gurgaon/', { variant: 'primary' })}</div>
    </div>
  </div>
</section>`;
}

/* ---------- Why us (bento) ---------- */
export function whyUs() {
  const [a, b, c, d] = WHY;
  const cell = (w, n, extra = '') =>
    `<div class="why__copy"><span class="why__n mono">${pad(n)}</span><h3>${w.title}</h3><p>${w.desc}</p>${extra}</div>`;
  return `<section class="why section" data-theme="bone" aria-labelledby="why-h">
  <div class="wrap">
    <div class="why__head">${label('05', 'Why brands choose Artists at Core')}${splitHeading('Broadcast pedigree. <br>*Boutique care.*', { id: 'why-h' })}</div>
    <div class="why__grid">
      <article class="why__cell why__cell--photo why__cell--tall" data-reveal>${img('BTS-17.jpg', { alt: 'Amitabh Bachchan reviewing a shot with the Artists at Core team', sizes: '(max-width: 900px) 92vw, 40vw', pos: '50% 30%' })}${cell(a, 1)}</article>
      <article class="why__cell why__cell--plain" data-reveal>${cell(b, 2)}</article>
      <article class="why__cell why__cell--photo" data-reveal>${img('BTS-9.png', { alt: 'A green-screen studio prepared for a shoot', sizes: '(max-width: 900px) 92vw, 30vw' })}${cell(c, 3)}</article>
      <article class="why__cell why__cell--ink" data-reveal>${cell(d, 4, `<a class="link-arrow" href="/ai-video-production-gurgaon/">${ICONS.arrow}<span>How we use AI</span></a>`)}</article>
    </div>
  </div>
</section>`;
}

/* ---------- Clients marquee ---------- */
export function clients({ num = '06' } = {}) {
  const half = Math.ceil(CLIENTS.length / 2);
  const row = (list, dir) => {
    const items = list.map(([f, n]) => `<li>${img(f, { alt: n })}</li>`).join('');
    return `<div class="marquee marquee--${dir}"><ul class="marquee__track">${items}</ul><ul class="marquee__track" aria-hidden="true">${items}</ul></div>`;
  };
  return `<section class="clients section" id="clientcollaborations" data-theme="ink" aria-labelledby="cl-h">
  <div class="wrap clients__head">
    ${label(num, 'Client collaborations')}
    ${splitHeading('Trusted by brands, <br>broadcasters &amp; *institutions*', { id: 'cl-h' })}
  </div>
  <div class="clients__rows">${row(CLIENTS.slice(0, half), 'left')}${row(CLIENTS.slice(half), 'right')}</div>
</section>`;
}

/* ---------- Process timeline ---------- */
export function processTimeline({ num = '07', theme = 'bone' } = {}) {
  return `<section class="process section" data-theme="${theme}" data-process aria-labelledby="pr-h">
  <div class="wrap">
    <div class="process__head">${label(num, 'How we work')}${splitHeading('From brief to *final cut*', { id: 'pr-h' })}</div>
    <div class="process__timeline">
      <div class="process__track" aria-hidden="true"><i class="process__fill" data-process-fill></i><span class="process__head-tc mono" data-process-tc>00:00:00:00</span></div>
      <ol class="process__steps">${PROCESS.map(
        (s, i) => `<li class="step" data-step><span class="step__clip" aria-hidden="true"></span><span class="step__n mono">${pad(i + 1)}</span><h3 class="step__t">${s.title}</h3><p class="step__d">${s.desc}</p></li>`,
      ).join('')}</ol>
    </div>
  </div>
</section>`;
}

/* ---------- Behind the scenes collage ---------- */
export function btsCollage() {
  const cols = [[], [], []];
  HOME_BTS.forEach((b, i) => cols[i % 3].push(b));
  return `<section class="bts section" data-theme="ink" aria-labelledby="bts-h">
  <div class="wrap bts__head">
    <div>${label('08', 'Behind the scenes')}${splitHeading('On set, *on location*', { id: 'bts-h' })}</div>
    <div data-reveal>${btn('View gallery', '/gallery/', { variant: 'line' })}</div>
  </div>
  <div class="wrap bts__cols">${cols
    .map(
      (c, ci) =>
        `<div class="bts__col" data-bts-col="${ci}">${c.map(([f, alt]) => `<a class="bts__item" href="/gallery/" data-cursor="View">${img(f, { alt, sizes: '(max-width: 700px) 46vw, 30vw' })}</a>`).join('')}</div>`,
    )
    .join('')}</div>
</section>`;
}

/* ---------- FAQ ---------- */
export function faq(items = FAQS, { num = '09' } = {}) {
  return `<section class="faq section" data-theme="bone" aria-labelledby="faq-h">
  <div class="wrap faq__grid">
    <div class="faq__intro">
      ${label(num, 'Frequently asked questions')}
      ${splitHeading('Questions, <br>*answered*', { id: 'faq-h' })}
      <p data-reveal>Still curious? Share your brief and we will suggest the right kind of video, a plan and a clear quote.</p>
      <div data-reveal>${btn('Talk to us', '/contact-us/', { variant: 'dark' })}</div>
    </div>
    <div class="faq__list">${items
      .map(
        (f, i) => `<details class="faq__item" data-faq data-reveal${i === 0 ? ' open' : ''}>
        <summary><span class="faq__q"><span class="mono">${pad(i + 1)}</span>${f.q}</span><span class="faq__icon" aria-hidden="true">${ICONS.plus}</span></summary>
        <div class="faq__a"><p>${f.a}</p></div>
      </details>`,
      )
      .join('')}</div>
  </div>
</section>`;
}

/* ---------- Closing CTA ---------- */
export function ctaBand({ title = 'Got a story?', sub = 'Share your brief and we will suggest the right kind of video, a plan and a clear quote.' } = {}) {
  return `<section class="cta" data-theme="rec" aria-labelledby="cta-h">
  <div class="wrap cta__inner">
    <p class="cta__kicker mono" data-reveal>● REC — Your project, next</p>
    <h2 class="cta__title" id="cta-h" data-cta-title><span>${title}</span></h2>
    <div class="cta__row">
      <p class="cta__sub" data-reveal>${sub} <em>You narrate. We create.</em></p>
      <div class="cta__actions" data-reveal>
        ${btn('Get a free quote', '/contact-us/', { variant: 'dark' })}
        ${btn(SITE.phones[0].label, SITE.phones[0].href, { variant: 'line-dark', icon: 'phone' })}
        ${btn('WhatsApp us', SITE.whatsapp, { variant: 'line-dark', icon: 'whatsapp', attrs: 'target="_blank" rel="noopener"' })}
      </div>
    </div>
  </div>
</section>`;
}

/* ---------- Inner page hero ---------- */
export function pageHero({ crumb, title, lead, image, imageAlt = '', pos = '', theme = 'ink', h1Small = '' }) {
  return `<section class="phero" data-theme="${theme}" data-phero>
  <div class="wrap phero__inner">
    <nav class="crumbs mono" aria-label="Breadcrumb" data-reveal><a href="/">Home</a><span>/</span><span aria-current="page">${crumb}</span></nav>
    <h1 class="phero__title" data-split-hero>${h1Small ? `<span class="phero__small">${h1Small}</span>` : ''}${title}</h1>
    ${lead ? `<p class="phero__lead" data-reveal>${lead}</p>` : ''}
  </div>
  ${image ? `<div class="phero__media" data-phero-media><div class="phero__img" data-parallax="12">${img(image, { alt: imageAlt, sizes: '100vw', eager: true, priority: true, pos })}</div></div>` : ''}
</section>`;
}
