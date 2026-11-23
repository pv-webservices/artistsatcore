/** Low-level markup helpers shared by every template (runs at build time in Node). */
import { readFileSync } from 'node:fs';
import path from 'node:path';

const MEDIA_PATH = path.resolve('src/data/media.json');
let mediaCache = null;
export function media() {
  if (!mediaCache || process.env.NODE_ENV !== 'production') mediaCache = JSON.parse(readFileSync(MEDIA_PATH, 'utf8'));
  return mediaCache;
}

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const pad = (n) => String(n).padStart(2, '0');

/**
 * Responsive <img> for an optimized asset.
 * @param {string} name original filename or generated id
 */
export function img(name, { alt = '', sizes = '100vw', cls = '', eager = false, priority = false, pos = '', attrs = '' } = {}) {
  const m = media()[name];
  if (!m) throw new Error(`Image not optimized: ${name}. Add it to scripts/media-sources.mjs and run npm run images:optimize.`);
  if (m.logo) {
    return `<img src="/media/${m.slug}.webp" width="${m.w}" height="${m.h}" alt="${esc(alt)}" loading="lazy" decoding="async"${cls ? ` class="${cls}"` : ''}${attrs ? ' ' + attrs : ''}>`;
  }
  const srcset = m.widths.map((w) => `/media/${m.slug}-${w}.webp ${w}w`).join(', ');
  const fallback = m.widths[Math.min(1, m.widths.length - 1)];
  const style = pos ? ` style="object-position:${pos}"` : '';
  return `<img src="/media/${m.slug}-${fallback}.webp" srcset="${srcset}" sizes="${sizes}" width="${m.w}" height="${m.h}" alt="${esc(alt)}" ${eager ? 'loading="eager"' : 'loading="lazy"'} decoding="async"${priority ? ' fetchpriority="high"' : ''}${cls ? ` class="${cls}"` : ''}${style}${attrs ? ' ' + attrs : ''}>`;
}

/** Largest available URL for an asset (used by lightboxes and CSS backgrounds). */
export function largest(name) {
  const m = media()[name];
  return `/media/${m.slug}-${m.widths[m.widths.length - 1]}.webp`;
}

export const ICONS = {
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/></svg>',
  arrowUp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/></svg>',
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>',
  chevron: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/></svg>',
  close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/></svg>',
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18v12H3zM3 7l9 6 9-6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="9.5" r="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
  whatsapp: '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16.04 3C8.86 3 3.03 8.82 3.03 16c0 2.3.6 4.54 1.75 6.52L3 29l6.65-1.74A12.95 12.95 0 0 0 16.04 29C23.2 29 29.03 23.18 29.03 16S23.2 3 16.04 3Zm0 23.64c-2 0-3.95-.54-5.65-1.55l-.4-.24-3.95 1.03 1.05-3.85-.26-.4A10.6 10.6 0 0 1 5.4 16c0-5.87 4.77-10.64 10.64-10.64 5.86 0 10.63 4.77 10.63 10.64 0 5.86-4.77 10.64-10.63 10.64Zm5.83-7.97c-.32-.16-1.89-.93-2.18-1.04-.3-.1-.5-.16-.72.16-.21.32-.82 1.04-1 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.21-.18-.32-.02-.5.14-.65.15-.15.32-.37.48-.56.16-.19.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.53-.71-.54h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66s1.14 3.08 1.3 3.3c.16.2 2.25 3.43 5.44 4.81.76.33 1.35.52 1.81.67.76.24 1.46.2 2 .12.62-.09 1.89-.77 2.16-1.52.27-.74.27-1.38.19-1.51-.08-.14-.29-.22-.61-.38Z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3zM9.5 9.75h3.8v1.5h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1v5.45h-4v-4.83c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.91h-4z"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.87.25-1.46 1.5-1.46h1.6V4.45A21 21 0 0 0 14.27 4.3c-2.3 0-3.87 1.4-3.87 3.98v2.22H7.8v3h2.6V21z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor"/></svg>',
};

export const socialIcon = (label) => ICONS[label.toLowerCase()] || '';

/**
 * Button: solid (white), outline, or text link. Rectangular, small caps label, trailing icon.
 * Pass `button: true` to render a <button> (e.g. for showreel triggers).
 */
export function btn(label, href, { variant = 'solid', icon = 'arrowUp', attrs = '', cls = '', button = false } = {}) {
  const classes = `btn btn--${variant}${cls ? ' ' + cls : ''}`;
  const inner = `<span class="btn__label">${label}</span>${icon ? `<span class="btn__icon">${ICONS[icon] || ''}</span>` : ''}`;
  return button
    ? `<button type="button" class="${classes}" ${attrs}>${inner}</button>`
    : `<a class="${classes}" href="${href}" ${attrs}>${inner}</a>`;
}

/**
 * Display heading with masked line reveal.
 * Lines are separated by "|"; wrap text in *asterisks* to render it in the dimmed second tone.
 */
export function heading(text, { tag = 'h2', cls = 'h2', id = '' } = {}) {
  const lines = text.split('|').map((line, i) => {
    const html = line.replace(/\*([^*]+)\*/g, '<span class="dim">$1</span>');
    return `<span class="ln" style="--i:${i}"><span>${html}</span></span>`;
  });
  return `<${tag} class="${cls} lines"${id ? ` id="${id}"` : ''} data-lines>${lines.join(' ')}</${tag}>`;
}

export const eyebrow = (text, cls = '') => `<p class="eyebrow${cls ? ' ' + cls : ''}" data-reveal>${text}</p>`;
