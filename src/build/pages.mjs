/** Sections that belong to a single inner page. */
import { SITE, PROJECTS, WORK_FILTERS, SERVICES, AI_USES, FAQS } from './site-data.mjs';
import { BTS_PHOTOS } from '../../scripts/media-sources.mjs';
import { img, largest, ICONS, btn, splitHeading, label, pad, socialIcon } from './ui.mjs';
import { projectCard, faq } from './sections.mjs';

/* ---------- Our work ---------- */
export function showreelFeature() {
  return `<section class="reel section" data-theme="ink" aria-label="Showreel">
  <div class="wrap">
    <a class="reel__card" href="https://www.youtube.com/watch?v=${SITE.showreel}" target="_blank" rel="noopener" data-video="${SITE.showreel}" data-cursor="Play" aria-label="Play the showreel">
      <div class="reel__media" data-parallax-wrap><div data-parallax="-6">${img('Beyond-the-Call-of-Duty.png', { alt: 'Still from Beyond the Call of Duty, featured in the Artists at Core showreel', sizes: '92vw', pos: '50% 35%' })}</div></div>
      <div class="reel__ui">
        <p class="mono">Showreel · Artists at Core Films</p>
        <p class="reel__title">Watch the <em>reel</em></p>
        <span class="reel__play">${ICONS.play}</span>
      </div>
    </a>
  </div>
</section>`;
}

export function workGrid() {
  return `<section class="work section" data-theme="ink" aria-labelledby="pw-h">
  <div class="wrap">
    <div class="work__head">
      <div>${label('01', 'Past works')}${splitHeading('Selected *films*', { id: 'pw-h' })}</div>
      <div class="filters" role="toolbar" aria-label="Filter films" data-filters>${WORK_FILTERS.map(
        (f, i) => `<button type="button" class="filter${i === 0 ? ' is-active' : ''}" data-filter="${f.key}" aria-pressed="${i === 0}">${f.label}</button>`,
      ).join('')}</div>
    </div>
    <div class="work__grid" data-work-grid>${PROJECTS.map((p, i) =>
      projectCard(p, i, { sizes: '(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 44vw', cls: i % 3 === 0 ? 'pcard--wide' : '' }),
    ).join('')}</div>
  </div>
</section>`;
}

/* ---------- Services ---------- */
export function serviceIndex() {
  return `<nav class="sindex wrap" aria-label="Services on this page" data-reveal>
  <ul>${SERVICES.map((s, i) => `<li><a href="#${s.slug}"><span class="mono">${pad(i + 1)}</span>${s.title}${s.isNew ? ' <span class="tag-new">New</span>' : ''}</a></li>`).join('')}</ul>
</nav>`;
}

export function finishing() {
  const items = ['Editing', 'Colour grading', 'Sound design', 'Music', 'VFX', 'Motion graphics', 'Subtitles', 'Other languages', 'TV, web & social formats'];
  return `<section class="finish section" data-theme="bone" aria-labelledby="fi-h">
  <div class="wrap finish__grid">
    <div class="finish__media" data-reveal>${img('svc-post', { alt: 'A colour grading suite with control panel and reference monitors', sizes: '(max-width: 900px) 92vw, 50vw' })}</div>
    <div class="finish__text">
      ${label('02', 'Post-production')}
      ${splitHeading('Finishing that makes <br>the *difference*', { id: 'fi-h' })}
      <p data-reveal>Every film gets professional editing, colour grading, sound design and music. We add VFX, motion graphics, subtitles and versions in other languages, and deliver in the formats you need for TV, web and social.</p>
      <ul class="chips chips--dark" data-reveal>${items.map((t) => `<li>${t}</li>`).join('')}</ul>
    </div>
  </div>
</section>`;
}

/* ---------- AI video page ---------- */
export function aiHero() {
  return `<section class="aihero" data-theme="ink" data-phero>
  <div class="aihero__media" data-phero-media><div class="phero__img" data-parallax="10">${img('ai-hybrid', { alt: 'A cinema camera on set facing an LED wall that shows a generated desert landscape', sizes: '100vw', eager: true, priority: true })}</div></div>
  <div class="wrap aihero__inner">
    <nav class="crumbs mono" aria-label="Breadcrumb" data-reveal><a href="/">Home</a><span>/</span><a href="/services/">Services</a><span>/</span><span aria-current="page">AI video</span></nav>
    <h1 class="phero__title" data-split-hero><span class="phero__small">AI video production in Gurgaon</span>Faster, smarter, <em>still human.</em></h1>
    <p class="phero__lead" data-reveal>Faster, more affordable videos directed by experienced producers. Ideal for social ads, explainers, training and multi-language versions.</p>
    <div class="aihero__ctas" data-reveal>${btn('Get a free quote', '/contact-us/?service=ai-video-production', { variant: 'primary' })}${btn('See how we work', '#ai-process', { variant: 'ghost' })}</div>
  </div>
</section>`;
}

export function aiStatement() {
  return `<section class="aistate section" data-theme="bone">
  <div class="wrap">
    ${label('01', 'Our approach')}
    <p class="about__statement" data-words>AI cuts time and cost. Our team keeps the quality and the brand safe. Every AI video is guided by experienced producers, with script and brand review on every video.</p>
  </div>
</section>`;
}

export function aiUses() {
  return `<section class="aiuses section" data-theme="ink" aria-labelledby="au-h">
  <div class="wrap">
    <div class="aiuses__head">${label('02', 'Where it works best')}${splitHeading('Built for the work <br>that *moves fast*', { id: 'au-h' })}</div>
    <ul class="aiuses__grid">${AI_USES.map(
      (u, i) => `<li class="ucard" data-reveal><span class="ucard__n mono">${pad(i + 1)}</span><h3>${u.title}</h3><p>${u.desc}</p><span class="ucard__line" aria-hidden="true"></span></li>`,
    ).join('')}</ul>
  </div>
</section>`;
}

export function aiOfferings() {
  const [prod, avatar] = SERVICES.filter((s) => s.isNew);
  const block = (s, imgName, alt, rev, extra = '') => `<article class="offer${rev ? ' offer--rev' : ''}">
    <div class="offer__media" data-reveal>${img(imgName, { alt, sizes: '(max-width: 900px) 92vw, 46vw', pos: s.imgPos || '' })}${extra}</div>
    <div class="offer__text">
      <p class="scard__num"><span class="tag-new">New</span></p>
      <h3 class="offer__title" data-reveal>${s.title}</h3>
      <p data-reveal>${s.desc}</p>
      <ul class="chips" data-reveal>${s.tags.map((t) => `<li>${t}</li>`).join('')}</ul>
      <div data-reveal>${btn('Get a quote', `/contact-us/?service=${s.slug}`, { variant: 'line' })}</div>
    </div>
  </article>`;
  return `<section class="offers section" data-theme="ink-2" aria-labelledby="of-h">
  <div class="wrap">
    <div class="offers__head">${label('03', 'AI services')}${splitHeading('Two ways to *create with AI*', { id: 'of-h' })}</div>
    ${block(prod, 'ai-studio', 'A producer and an editor reviewing AI-generated storyboard frames in an edit suite', false)}
    ${block(avatar, 'svc-avatar', 'A presenter speaking to camera in a softly lit studio', true, '<ul class="ai__langs ai__langs--float" aria-label="Languages"><li>Hindi</li><li>English</li><li>+ more</li></ul>')}
  </div>
</section>`;
}

/* ---------- Gallery ---------- */
const BTS_SKIP = new Set(['BTS-17.jpg']); // shown large elsewhere; duplicate frames already excluded from the source list
export function galleryGrid() {
  const list = BTS_PHOTOS.filter((f) => !BTS_SKIP.has(f));
  return `<section class="gallery section" data-theme="ink" aria-label="Behind the scenes photographs">
  <div class="wrap">
    <div class="gallery__grid" data-gallery>${list
      .map(
        (f, i) => `<a class="gallery__item" href="${largest(f)}" data-lb-index="${i}" data-cursor="View" aria-label="Open photo ${i + 1} of ${list.length}">${img(f, { alt: `Behind the scenes with Artists at Core Films, photo ${i + 1}`, sizes: '(max-width: 600px) 46vw, (max-width: 1100px) 31vw, 23vw' })}</a>`,
      )
      .join('')}</div>
  </div>
</section>`;
}

/* ---------- Contact ---------- */
function serviceSelect() {
  const opts = [...SERVICES.map((s) => [s.slug, s.title]), ['not-sure', 'Not sure yet — advise me']];
  return `<div class="field field--select" data-select>
    <label class="field__label" id="svc-label">Service you need</label>
    <input type="hidden" name="service" value="" data-select-input>
    <button type="button" class="select__btn" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="svc-label svc-value" data-select-btn>
      <span id="svc-value" class="select__value is-placeholder" data-select-value>Choose a service</span>
      <span class="select__chev">${ICONS.chevron}</span>
    </button>
    <ul class="select__list" role="listbox" tabindex="-1" aria-labelledby="svc-label" data-select-list hidden>${opts
      .map(([v, t]) => `<li role="option" id="opt-${v}" data-value="${v}" aria-selected="false"><span>${t}</span><span class="select__tick">✓</span></li>`)
      .join('')}</ul>
  </div>`;
}

export function contactBlock() {
  return `<section class="contact section" data-theme="bone" aria-labelledby="enq-h">
  <div class="wrap contact__grid">
    <div class="contact__formwrap">
      ${label('01', 'Enquire')}
      ${splitHeading('Tell us about <br>your *project*', { id: 'enq-h' })}
      <form class="form" action="/api/contact.php" method="post" novalidate data-form>
        <div class="form__grid">
          <div class="field"><label class="field__label" for="f-name">Name *</label><input id="f-name" name="name" type="text" autocomplete="name" required maxlength="100"><p class="field__err" aria-live="polite"></p></div>
          <div class="field"><label class="field__label" for="f-email">Email *</label><input id="f-email" name="email" type="email" autocomplete="email" required maxlength="150"><p class="field__err" aria-live="polite"></p></div>
          <div class="field"><label class="field__label" for="f-phone">Phone *</label><input id="f-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" required maxlength="20" pattern="[0-9+()\\-\\s]{7,20}"><p class="field__err" aria-live="polite"></p></div>
          ${serviceSelect()}
          <div class="field field--full"><label class="field__label" for="f-msg">Message *</label><textarea id="f-msg" name="message" rows="5" required maxlength="3000" placeholder="Goals, audience, timelines, references…"></textarea><p class="field__err" aria-live="polite"></p></div>
          <div class="hp" aria-hidden="true"><label for="f-company">Company</label><input id="f-company" name="company" type="text" tabindex="-1" autocomplete="off"></div>
        </div>
        <div class="form__foot">
          <button class="btn btn--dark" type="submit" data-submit><span class="btn__fill" aria-hidden="true"></span><span class="btn__label">Send enquiry</span><span class="btn__icon">${ICONS.arrow}</span></button>
          <p class="form__note">We reply within one working day. Prefer to talk? <a href="${SITE.phones[0].href}">Call us</a> or <a href="${SITE.whatsapp}" target="_blank" rel="noopener">WhatsApp</a>.</p>
        </div>
        <div class="form__status" role="status" aria-live="polite" data-form-status></div>
      </form>
    </div>
    <aside class="contact__info" aria-label="Contact details">
      <div class="info" data-reveal><h2 class="info__h">${ICONS.pin}Find us</h2><a href="${SITE.address.map}" target="_blank" rel="noopener">${SITE.address.line},<br>${SITE.address.city} ${SITE.address.postcode}</a></div>
      <div class="info" data-reveal><h2 class="info__h">${ICONS.phone}Speak to us</h2>${SITE.phones.map((p) => `<a href="${p.href}">${p.label}</a>`).join('')}</div>
      <div class="info" data-reveal><h2 class="info__h">${ICONS.mail}Write to us</h2>${SITE.emails.map((e) => `<a href="mailto:${e}">${e}</a>`).join('')}</div>
      <div class="info" data-reveal><h2 class="info__h">Social</h2><div class="social social--dark">${SITE.social.map((s) => `<a href="${s.href}" target="_blank" rel="noopener" aria-label="${s.label}">${socialIcon(s.label)}</a>`).join('')}</div></div>
      <a class="wa-card" href="${SITE.whatsapp}" target="_blank" rel="noopener" data-reveal><span class="wa-card__icon">${ICONS.whatsapp}</span><span><b>Chat on WhatsApp</b><small>${SITE.phones[0].label}</small></span>${ICONS.arrowUp}</a>
    </aside>
  </div>
  <div class="wrap contact__map" data-reveal>
    <iframe title="Map: Artists at Core Films, Sector 49, Gurgaon" data-src="${SITE.address.embed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" data-lazy-iframe></iframe>
  </div>
</section>`;
}

export const AI_FAQS = [FAQS[2], FAQS[3], FAQS[1], FAQS[5]];

export const aiFaq = () => faq(AI_FAQS, { num: '05' });
