/** Video modal (YouTube, loaded only on demand), image lightbox, custom cursor, lazy iframes. */
import { qs, qsa, lockScroll, unlockScroll } from './core.js';

const YT_ID = /^[\w-]{6,20}$/;

export function initVideoModal() {
  const dialog = qs('[data-vmodal]');
  const frame = qs('[data-vmodal-frame]');
  if (!dialog || !frame) return;

  const close = () => { if (dialog.open) dialog.close(); };
  dialog.addEventListener('close', () => { frame.replaceChildren(); unlockScroll(); });
  dialog.addEventListener('click', (e) => { if (e.target === dialog) close(); });
  qs('[data-vmodal-close]', dialog).addEventListener('click', close);

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-video]');
    if (!trigger) return;
    const id = trigger.dataset.video;
    if (!YT_ID.test(id)) return;
    e.preventDefault();
    const start = Number.parseInt(trigger.dataset.start || '0', 10);
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1${start ? `&start=${start}` : ''}`;
    iframe.title = trigger.getAttribute('aria-label') || 'Video player';
    iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    iframe.allowFullscreen = true;
    frame.replaceChildren(iframe);
    lockScroll();
    dialog.showModal();
  });
}

export function initLightbox() {
  const items = qsa('[data-lb-index]');
  const dialog = qs('[data-lightbox]');
  if (!items.length || !dialog) return;
  const imgEl = qs('[data-lb-img]', dialog);
  const cap = qs('[data-lb-cap]', dialog);
  const count = qs('[data-lb-count]', dialog);
  const list = items.map((a) => ({ src: a.getAttribute('href'), alt: qs('img', a)?.alt || '' }));
  let index = 0;

  const show = (i) => {
    index = (i + list.length) % list.length;
    imgEl.src = list[index].src;
    imgEl.alt = list[index].alt;
    cap.textContent = '';
    count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(list.length).padStart(2, '0')}`;
    [index + 1, index - 1].forEach((n) => { const pre = new Image(); pre.src = list[(n + list.length) % list.length].src; });
  };
  items.forEach((a, i) => a.addEventListener('click', (e) => {
    e.preventDefault();
    show(i);
    lockScroll();
    dialog.showModal();
  }));
  dialog.addEventListener('close', unlockScroll);
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
  qs('[data-lb-close]', dialog).addEventListener('click', () => dialog.close());
  qs('[data-lb-prev]', dialog).addEventListener('click', () => show(index - 1));
  qs('[data-lb-next]', dialog).addEventListener('click', () => show(index + 1));
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') show(index + 1);
    if (e.key === 'ArrowLeft') show(index - 1);
  });
  let x0 = null;
  dialog.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  dialog.addEventListener('touchend', (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 45) show(index + (dx < 0 ? 1 : -1));
    x0 = null;
  });
}

export function initCursor(gsap) {
  const cursor = qs('[data-cursor-el]');
  if (!cursor || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const label = qs('[data-cursor-label]', cursor);
  const xTo = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3' });
  const yTo = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3' });
  window.addEventListener('pointermove', (e) => { xTo(e.clientX); yTo(e.clientY); }, { passive: true });
  document.addEventListener('pointerover', (e) => {
    const t = e.target.closest('[data-cursor]');
    if (t) {
      label.textContent = t.dataset.cursor;
      cursor.classList.add('is-label', 'is-visible');
    }
  });
  document.addEventListener('pointerout', (e) => {
    const t = e.target.closest('[data-cursor]');
    if (t && !t.contains(e.relatedTarget)) cursor.classList.remove('is-label', 'is-visible');
  });
  document.addEventListener('pointerleave', () => cursor.classList.remove('is-visible'));
}

export function initLazyIframes() {
  const frames = qsa('[data-lazy-iframe]');
  if (!frames.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.src = en.target.dataset.src;
      io.unobserve(en.target);
    });
  }, { rootMargin: '400px' });
  frames.forEach((f) => io.observe(f));
}
