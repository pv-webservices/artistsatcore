/** Sections that belong to a single inner page. */
import { SITE, PROJECTS, WORK_FILTERS, SERVICES, AI_USES, FAQS } from './site-data.mjs';
import { BTS_PHOTOS } from '../../scripts/media-sources.mjs';
import { img, largest, ICONS, btn, heading, eyebrow, pad, socialIcon } from './ui.mjs';
import { projectCard, faq } from './sections.mjs';

/* ---------- Our work ---------- */
export function showreelFeature() {
  return `<section class="reel" aria-label="Showreel">
  <div class="wrap">
    <a class="reel__card" href="https://www.youtube.com/watch?v=${SITE.showreel}" target="_blank" rel="noopener" data-video="${SITE.showreel}" aria-label="Play the Artists at Core showreel" data-reveal>
      <div class="reel__media"><div data-parallax="8">${img('Gazi-Khan-Barna-1.png', { alt: 'Aerial still of a lake palace, featured in the Artists at Core showreel', sizes: '92vw' })}</div></div>
      <div class="reel__ui">
        <p class="eyebrow eyebrow--plain">Showreel · Artists at Core Films</p>
        <p class="reel__title">Watch the reel</p>
      </div>
      <span class="reel__play" aria-hidden="true">${ICONS.play}</span>
    </a>
  </div>
</section>`;
}

export function workGrid() {
  return `<section class="work section" aria-labelledby="pw-h">
  <div class="wrap">
    <div class="sec-head">
      <div>${eyebrow('Past works')}${heading('Selected films', { id: 'pw-h' })}</div>
      <div class="filters" role="toolbar" aria-label="Filter films" data-filters data-reveal>${WORK_FILTERS.map(
        (f, i) => `<button type="button" class="filter${i === 0 ? ' is-active' : ''}" data-filter="${f.key}" aria-pressed="${i === 0}">${f.label}</button>`,
      ).join('')}</div>
    </div>
    <div class="work__grid" data-work-grid>${PROJECTS.map((p) =>
      projectCard(p, { sizes: '(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 31vw' }),
    ).join('')}</div>
  </div>
</section>`;
}

/* ---------- Services ---------- */
export function serviceIndex() {
  return `<nav class="sindex" aria-label="Services on this page">
  <div class="wrap"><ul>${SERVICES.map((s, i) => `<li><a href="#${s.slug}"><span>${pad(i + 1)}</span>${s.title}${s.isNew ? ' <span class="tag-new">New</span>' : ''}</a></li>`).join('')}</ul></div>
</nav>`;
}

export function servicesDetailed() {
  const row = (s, i) => {
    const example = s.example
      ? btn('Watch an example', `https://www.youtube.com/watch?v=${s.example}`, { variant: 'text', icon: 'play', attrs: `target="_blank" rel="noopener" data-video="${s.example}"` })
      : '';
    const more = s.link
      ? btn('Explore AI video', s.link, { variant: 'text' })
      : btn('Get a quote for this', `/contact-us/?service=${s.slug}`, { variant: 'text' });
    return `<article class="srow${i % 2 ? ' srow--rev' : ''}" id="${s.slug}">
    <figure class="srow__media" data-reveal><div data-parallax="8">${img(s.img, { alt: s.alt, sizes: '(max-width: 900px) 92vw, 50vw', pos: s.imgPos || '' })}</div></figure>
    <div class="srow__text">
      <p class="srow__num" data-reveal>${pad(i + 1)} <span>/ ${pad(SERVICES.length)}</span>${s.isNew ? '<span class="tag-new">New</span>' : ''}</p>
      <h2 class="h2" data-reveal>${s.title}</h2>
      <p class="lead" data-reveal>${s.desc}</p>
      <ul class="chips" data-reveal>${s.tags.map((t) => `<li>${t}</li>`).join('')}</ul>
      <div class="srow__links" data-reveal>${example}${more}</div>
    </div>
  </article>`;
  };
  return `<section class="services-list section" aria-label="Our services">
  <div class="wrap">${SERVICES.map(row).join('')}</div>
</section>`;
}

export function finishing() {
  const items = ['Editing', 'Colour grading', 'Sound design', 'Music', 'VFX', 'Motion graphics', 'Subtitles', 'Other languages', 'TV, web & social formats'];
  return `<section class="finish section surface" aria-labelledby="fi-h">
  <div class="wrap finish__grid">
    <div class="finish__text">
      ${eyebrow('Post-production')}
      ${heading('Finishing that makes|*the difference.*', { id: 'fi-h' })}
      <p class="lead" data-reveal>Every film gets professional editing, colour grading, sound design and music. We add VFX, motion graphics, subtitles and versions in other languages, and deliver in the formats you need for TV, web and social.</p>
      <ul class="chips" data-reveal>${items.map((t) => `<li>${t}</li>`).join('')}</ul>
    </div>
    <figure class="finish__media" data-reveal>${img('svc-post', { alt: 'A colour grading suite with control panel and reference monitors', sizes: '(max-width: 900px) 92vw, 50vw' })}</figure>
  </div>
</section>`;
}

/* ---------- AI video page ---------- */
export function aiStatement() {
  return `<section class="statement section" aria-label="Our approach">
  <div class="wrap statement__inner">
    ${eyebrow('Our approach')}
    <p class="statement__text" data-reveal>AI cuts time and cost. <span class="dim">Our team keeps the quality and the brand safe.</span> Every AI video is guided by experienced producers, <span class="dim">with script and brand review on every video.</span></p>
  </div>
</section>`;
}

export function aiUses() {
  return `<section class="aiuses section surface" aria-labelledby="au-h">
  <div class="wrap">
    <div class="sec-head">
      <div>${eyebrow('Where it works best')}${heading('Built for the work|*that moves fast.*', { id: 'au-h' })}</div>
    </div>
    <ul class="ucards">${AI_USES.map(
      (u, i) => `<li class="ucard" data-reveal><span class="ucard__n">${pad(i + 1)}</span><h3 class="h3">${u.title}</h3><p>${u.desc}</p></li>`,
    ).join('')}</ul>
  </div>
</section>`;
}

export function aiOfferings() {
  const [prod, avatar] = SERVICES.filter((s) => s.isNew);
  const block = (s, imgName, alt, i, extra = '') => `<article class="srow${i % 2 ? ' srow--rev' : ''}">
    <figure class="srow__media" data-reveal><div data-parallax="8">${img(imgName, { alt, sizes: '(max-width: 900px) 92vw, 50vw', pos: s.imgPos || '' })}</div>${extra}</figure>
    <div class="srow__text">
      <p class="srow__num" data-reveal>${pad(i + 1)} <span>/ 02</span><span class="tag-new">New</span></p>
      <h3 class="h2" data-reveal>${s.title}</h3>
      <p class="lead" data-reveal>${s.desc}</p>
      <ul class="chips" data-reveal>${s.tags.map((t) => `<li>${t}</li>`).join('')}</ul>
      <div class="srow__links" data-reveal>${btn('Get a quote', `/contact-us/?service=${s.slug}`, { variant: 'outline' })}</div>
    </div>
  </article>`;
  return `<section class="services-list section" aria-labelledby="of-h">
  <div class="wrap">
    <div class="sec-head">${`<div>${eyebrow('AI services')}${heading('Two ways to create with AI', { id: 'of-h' })}</div>`}</div>
    ${block(prod, 'ai-studio', 'A producer and an editor reviewing AI-generated storyboard frames in an edit suite', 0)}
    ${block(avatar, 'svc-avatar', 'A presenter speaking to camera in a softly lit studio', 1, '<ul class="ai__langs ai__langs--float" aria-label="Languages"><li>Hindi</li><li>English</li><li>+ more</li></ul>')}
  </div>
</section>`;
}

/* ---------- Gallery ---------- */
const BTS_SKIP = new Set(['BTS-17.jpg']);
export function galleryGrid() {
  const list = BTS_PHOTOS.filter((f) => !BTS_SKIP.has(f));
  return `<section class="gallery section" aria-label="Behind the scenes photographs">
  <div class="wrap">
    <div class="gallery__grid" data-gallery>${list
      .map(
        (f, i) => `<a class="gallery__item" href="${largest(f)}" data-lb-index="${i}" aria-label="Open photo ${i + 1} of ${list.length}">${img(f, { alt: `Behind the scenes with Artists at Core Films, photo ${i + 1}`, sizes: '(max-width: 600px) 46vw, (max-width: 1100px) 31vw, 23vw' })}</a>`,
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
  return `<section class="contact section" aria-labelledby="enq-h">
  <div class="wrap contact__grid">
    <div class="contact__formwrap">
      ${eyebrow('Enquire')}
      ${heading('Tell us about|*your project.*', { id: 'enq-h' })}
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
          <button class="btn btn--solid" type="submit" data-submit><span class="btn__label">Send enquiry</span><span class="btn__icon">${ICONS.arrowUp}</span></button>
          <p class="form__note">We reply within one working day. Prefer to talk? <a href="${SITE.phones[0].href}">Call us</a> or <a href="${SITE.whatsapp}" target="_blank" rel="noopener">WhatsApp</a>.</p>
        </div>
        <div class="form__status" role="status" aria-live="polite" data-form-status></div>
      </form>
    </div>
    <aside class="contact__info" aria-label="Contact details">
      <div class="info" data-reveal><h2 class="info__h">${ICONS.pin}Studio</h2><a href="${SITE.address.map}" target="_blank" rel="noopener">${SITE.address.line},<br>${SITE.address.city} ${SITE.address.postcode}</a></div>
      <div class="info" data-reveal><h2 class="info__h">${ICONS.phone}Call</h2>${SITE.phones.map((p) => `<a href="${p.href}">${p.label}</a>`).join('')}</div>
      <div class="info" data-reveal><h2 class="info__h">${ICONS.mail}Email</h2>${SITE.emails.map((e) => `<a href="mailto:${e}">${e}</a>`).join('')}</div>
      <div class="info" data-reveal><h2 class="info__h">Social</h2><div class="social">${SITE.social.map((s) => `<a href="${s.href}" target="_blank" rel="noopener" aria-label="${s.label}">${socialIcon(s.label)}</a>`).join('')}</div></div>
      <a class="wa-card" href="${SITE.whatsapp}" target="_blank" rel="noopener" data-reveal><span class="wa-card__icon">${ICONS.whatsapp}</span><span><b>Chat on WhatsApp</b><small>${SITE.phones[0].label}</small></span>${ICONS.arrowUp}</a>
    </aside>
  </div>
  <div class="wrap contact__map" data-reveal>
    <iframe title="Map: Artists at Core Films, Sector 49, Gurgaon" data-src="${SITE.address.embed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" data-lazy-iframe></iframe>
  </div>
</section>`;
}

export const AI_FAQS = [FAQS[2], FAQS[3], FAQS[1], FAQS[5]];

export const aiFaq = () => faq(AI_FAQS);
