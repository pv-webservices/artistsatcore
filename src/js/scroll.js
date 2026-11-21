/** Scroll-driven motion. Everything is transform/opacity based and skipped for reduced motion. */
import { qs, qsa, reduceMotion } from './core.js';
import { timecode } from './hero.js';

export function initReveals() {
  const els = qsa('[data-reveal]');
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
  els.forEach((el) => io.observe(el));
}

export function initSplitHeadings(gsap) {
  qsa('[data-split]').forEach((h) => {
    const words = qsa('.wi', h);
    if (reduceMotion()) { gsap.set(words, { y: 0, yPercent: 0 }); return; }
    gsap.fromTo(words, { y: 0, yPercent: 110 }, {
      y: 0, yPercent: 0, duration: 1.15, ease: 'expo.out', stagger: 0.055,
      scrollTrigger: { trigger: h, start: 'top 88%', once: true },
    });
  });
  qsa('[data-split-hero]').forEach((h) => {
    if (reduceMotion()) return;
    gsap.from(h, { y: 50, autoAlpha: 0, duration: 1.3, ease: 'expo.out', delay: 0.15 });
  });
}

/** Statement paragraphs light up word by word as they scroll through. */
export function initWordLight(ScrollTrigger) {
  qsa('[data-words]').forEach((p) => {
    const words = p.textContent.trim().split(/\s+/);
    p.innerHTML = words.map((w) => `<span class="word">${w}</span>`).join(' ');
    const spans = qsa('.word', p);
    if (reduceMotion()) { spans.forEach((s) => s.classList.add('is-lit')); return; }
    ScrollTrigger.create({
      trigger: p, start: 'top 82%', end: 'bottom 52%', scrub: true,
      onUpdate: (st) => {
        const n = Math.round(st.progress * spans.length);
        spans.forEach((s, i) => s.classList.toggle('is-lit', i < n));
      },
    });
  });
}

export function initCounters(ScrollTrigger) {
  qsa('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    if (reduceMotion()) return;
    el.textContent = '00';
    ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: () => {
        const t0 = performance.now();
        const step = (now) => {
          const k = Math.min(1, (now - t0) / 1400);
          const eased = 1 - (1 - k) ** 3;
          el.textContent = String(Math.round(end * eased)).padStart(2, '0');
          if (k < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
    });
  });
}

/** Featured projects: pinned horizontal scroll on desktop; native swipe on mobile. */
export function initRail(gsap, mm) {
  const section = qs('[data-rail]');
  if (!section) return;
  const track = qs('[data-rail-track]', section);
  const bar = qs('[data-rail-bar]', section);
  const tc = qs('[data-rail-tc]', section);
  const viewport = qs('[data-rail-viewport]', section);

  mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
    gsap.to(track, {
      x: () => -distance(), ease: 'none',
      scrollTrigger: {
        trigger: section, start: 'top top', end: () => `+=${distance()}`, pin: true, scrub: 0.6,
        invalidateOnRefresh: true, anticipatePin: 1,
        onUpdate: (st) => {
          bar.style.transform = `scaleX(${st.progress})`;
          tc.textContent = timecode(st.progress * 96000).slice(3, 8);
        },
      },
    });
  });
  mm.add('(max-width: 900px)', () => {
    const onScroll = () => {
      const max = viewport.scrollWidth - viewport.clientWidth;
      const p = max > 0 ? viewport.scrollLeft / max : 0;
      bar.style.transform = `scaleX(${p})`;
      tc.textContent = timecode(p * 96000).slice(3, 8);
    };
    viewport.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => viewport.removeEventListener('scroll', onScroll);
  });
}

/** Stacking service cards: the card underneath recedes as the next one arrives. */
export function initStack(gsap) {
  if (reduceMotion()) return;
  const cards = qsa('[data-scard]');
  cards.forEach((card, i) => {
    const next = cards[i + 1];
    if (!next) return;
    const inner = qs('.scard__inner', card);
    const dim = qs('.scard__dim', card);
    const tl = gsap.timeline({
      scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 20%', scrub: true },
    });
    tl.to(inner, { scale: 0.93, ease: 'none' }, 0).to(dim, { opacity: 0.55, ease: 'none' }, 0);
  });
}

/** Process timeline: a red playhead moves through five clips. */
export function initProcess(ScrollTrigger) {
  qsa('[data-process]').forEach((sec) => {
    const tl = qs('.process__timeline', sec);
    const steps = qsa('[data-step]', sec);
    const tc = qs('[data-process-tc]', sec);
    const set = (p) => {
      tl.style.setProperty('--p', p.toFixed(4));
      steps.forEach((s, i) => s.classList.toggle('is-on', p >= i / steps.length + 0.02 || p > 0.98));
      if (tc) tc.textContent = timecode(p * 154000);
    };
    if (reduceMotion()) { set(1); return; }
    set(0);
    ScrollTrigger.create({ trigger: tl, start: 'top 78%', end: 'bottom 50%', scrub: 0.4, onUpdate: (st) => set(st.progress) });
  });
}

export function initParallax(gsap, mm) {
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    qsa('[data-parallax]').forEach((el) => {
      const amt = Number(el.dataset.parallax) || 10;
      gsap.fromTo(el, { yPercent: -amt / 2 }, {
        yPercent: amt / 2, ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });
    qsa('[data-bts-col]').forEach((col) => {
      const k = [-6, 10, -3][Number(col.dataset.btsCol)] || 0;
      gsap.fromTo(col, { yPercent: k * -0.5 }, {
        yPercent: k * 0.5, ease: 'none',
        scrollTrigger: { trigger: col.closest('section'), start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });
    const cta = qs('[data-cta-title] span');
    if (cta) {
      gsap.fromTo(cta, { xPercent: 8 }, {
        xPercent: -2, ease: 'none',
        scrollTrigger: { trigger: cta.closest('section'), start: 'top bottom', end: 'bottom 40%', scrub: true },
      });
    }
    qsa('[data-phero-media]').forEach((m) => {
      if (!m.closest('.phero')) return;
      const g = parseFloat(getComputedStyle(qs('.wrap') || document.body).paddingLeft) || 20;
      gsap.fromTo(m, { clipPath: `inset(0px ${g}px 0px ${g}px round 18px)` }, {
        clipPath: 'inset(0px 0px 0px 0px round 0px)', ease: 'none',
        scrollTrigger: { trigger: m, start: 'top 85%', end: 'top 15%', scrub: true },
      });
    });
  });
}
