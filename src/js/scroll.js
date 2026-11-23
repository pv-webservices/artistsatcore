/** Scroll-driven motion. Everything is transform/opacity based and skipped for reduced motion. */
import { qs, qsa, reduceMotion } from './core.js';

/** Fade-up reveals and masked heading lines, staggered per batch. */
export function initReveals() {
  const els = qsa('[data-reveal], [data-lines]');
  if (reduceMotion() || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.filter((e) => e.isIntersecting).forEach((en, i) => {
      en.target.style.setProperty('--d', `${Math.min(i, 6) * 0.08}s`);
      en.target.classList.add('is-in');
      io.unobserve(en.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  // Anything already in the first screen animates straight away, in document order
  let first = 0;
  els.forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
      el.style.setProperty('--d', `${Math.min(first++, 8) * 0.07}s`);
      setTimeout(() => el.classList.add('is-in'), 60);
    } else io.observe(el);
  });
}

export function initCounters() {
  const els = qsa('[data-count]');
  if (reduceMotion() || !els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.filter((e) => e.isIntersecting).forEach(({ target: el }) => {
      io.unobserve(el);
      const end = Number(el.dataset.count);
      const t0 = performance.now();
      const step = (now) => {
        const k = Math.min(1, (now - t0) / 1600);
        el.textContent = String(Math.round(end * (1 - (1 - k) ** 3))).padStart(2, '0');
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.6 });
  els.forEach((el) => { el.textContent = '00'; io.observe(el); });
}

/** Gentle image parallax inside clipped frames. */
export function initParallax(gsap, mm) {
  mm.add('(prefers-reduced-motion: no-preference) and (min-width: 701px)', () => {
    qsa('[data-parallax]').forEach((el) => {
      const amt = Number(el.dataset.parallax) || 10;
      gsap.fromTo(el, { yPercent: -amt / 2 }, {
        yPercent: amt / 2, ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });
  });
}

/** Highlights the current service in the sticky index on the services page. */
export function initServiceIndex() {
  const nav = qs('.sindex');
  if (!nav) return;
  const links = qsa('a', nav);
  const map = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
  const io = new IntersectionObserver((entries) => {
    entries.filter((e) => e.isIntersecting).forEach((en) => {
      links.forEach((a) => a.classList.remove('is-current'));
      const a = map.get(en.target.id);
      if (!a) return;
      a.classList.add('is-current');
      a.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  map.forEach((_, id) => { const el = document.getElementById(id); if (el) io.observe(el); });
}
