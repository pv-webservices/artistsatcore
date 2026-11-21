/** Loader (film countdown) and the home hero viewfinder: slideshow, timecode, iris-open and scroll expansion. */
import { qs, qsa, reduceMotion } from './core.js';

const FPS = 25;
export const timecode = (ms) => {
  const f = Math.floor((ms / 1000) * FPS);
  const p = (n) => String(n).padStart(2, '0');
  return `${p(Math.floor(f / (FPS * 3600)))}:${p(Math.floor(f / (FPS * 60)) % 60)}:${p(Math.floor(f / FPS) % 60)}:${p(f % FPS)}`;
};

/** Resolves when the hero may start its intro. Plays only on the first page view of a session. */
export function runLoader(gsap) {
  const loader = qs('[data-loader]');
  const root = document.documentElement;
  const seen = root.classList.contains('intro-seen');
  if (!loader || seen || reduceMotion()) {
    loader?.remove();
    return Promise.resolve();
  }
  try { sessionStorage.setItem('aac-intro', '1'); } catch { /* storage unavailable: intro simply replays */ }
  const count = qs('[data-loader-count]', loader);
  const tc = qs('[data-loader-tc]', loader);
  const STEP = 420;
  const t0 = performance.now();

  return new Promise((resolve) => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      gsap.to(loader, {
        clipPath: 'inset(0 0 100% 0)', duration: 0.85, ease: 'expo.inOut',
        onComplete: () => loader.remove(),
      });
      setTimeout(resolve, 320);
    };
    const tick = (now) => {
      if (done) return;
      const el = now - t0;
      const step = Math.min(2, Math.floor(el / STEP));
      count.textContent = String(3 - step);
      loader.style.setProperty('--sweep', `${((el % STEP) / STEP) * 360}deg`);
      tc.textContent = timecode(el);
      if (el >= STEP * 3) finish();
      else requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    setTimeout(finish, 2600); // never block longer than this
  });
}

function slideshow(hero) {
  const slides = qsa('.vf__slide', hero);
  const title = qs('[data-vf-title]', hero);
  const idx = qs('[data-vf-index]', hero);
  const tcEl = qs('[data-vf-tc]', hero);
  let i = 0;
  let visible = true;
  const t0 = performance.now();

  const next = () => {
    if (!visible || document.hidden) return;
    slides[i].classList.remove('is-active');
    i = (i + 1) % slides.length;
    slides[i].classList.add('is-active');
    title.textContent = slides[i].dataset.title;
    idx.textContent = String(i + 1).padStart(2, '0');
  };
  if (!reduceMotion()) setInterval(next, 3800);

  const loop = (now) => {
    if (visible) tcEl.textContent = timecode(now - t0);
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
  new IntersectionObserver(([en]) => { visible = en.isIntersecting; }).observe(hero);
}

/** Frame rectangle (px insets from the hero edges) derived from the layout slot. */
function measureFrame(hero) {
  const slot = qs('[data-hero-slot]', hero).getBoundingClientRect();
  const l1 = qs('[data-hero-line="1"]', hero).getBoundingClientRect();
  const l2 = qs('[data-hero-line="2"]', hero).getBoundingClientRect();
  const box = hero.getBoundingClientRect();
  const W = box.width;
  const H = box.height;
  const mobile = W <= 900;
  // The frame tucks behind the giant type: it may extend into the lower part of line 1 and upper part of line 2.
  const reach = mobile ? 0.34 : 0.55;
  const availTop = Math.min(slot.top, l1.bottom - l1.height * reach);
  const availBottom = Math.max(slot.bottom, l2.top + l2.height * reach);
  const availH = availBottom - availTop;
  let w;
  let h;
  if (mobile) {
    w = slot.width;
    h = Math.min(availH, w * 1.2);
  } else {
    w = Math.min(slot.width * 0.66, (availH * 16) / 9);
    h = Math.min(availH, (w * 9) / 16 + 60);
  }
  const top = availTop - box.top + (availH - h) / 2;
  const left = (W - w) / 2;
  return { t: top, l: left, r: W - left - w, b: H - top - h, W, H };
}

export function initHero(gsap, ScrollTrigger, introReady) {
  const hero = qs('[data-hero]');
  if (!hero) return;
  slideshow(hero);

  const line1 = qs('[data-hero-line="1"]', hero);
  const line2 = qs('[data-hero-line="2"]', hero);
  const kicker = qs('[data-hero-kicker]', hero);
  const foot = qs('[data-hero-foot]', hero);
  const shade = qs('[data-hero-shade]', hero);
  const ui = qs('[data-vf-ui]', hero);
  const reveal = qs('[data-hero-reveal]', hero);
  const scrollCue = qs('[data-hero-scroll]', hero);
  const state = { k: reduceMotion() ? 1 : 0, p: 0, fa: reduceMotion() ? 1 : 0 };
  const words = qsa('.hero__word', hero);
  let frame = measureFrame(hero);

  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp01 = gsap.utils.clamp(0, 1);
  const apply = () => {
    const { k, p } = state;
    // k: iris opening from a thin horizontal slit; p: scroll expansion to full bleed
    const midY = frame.t + (frame.H - frame.t - frame.b) / 2;
    const t = lerp(midY, frame.t, k);
    const b = lerp(frame.H - midY, frame.b, k);
    const l = lerp(frame.l + 40, frame.l, k);
    const r = lerp(frame.r + 40, frame.r, k);
    const s = hero.style;
    s.setProperty('--t', `${lerp(t, 0, p)}px`);
    s.setProperty('--b', `${lerp(b, 0, p)}px`);
    s.setProperty('--l', `${lerp(l, 0, p)}px`);
    s.setProperty('--r', `${lerp(r, 0, p)}px`);
    s.setProperty('--rad', `${lerp(14, 0, p)}px`);
    const vw = frame.W / 100;
    line1.style.transform = `translate3d(${-p * 38 * vw}px,0,0)`;
    line2.style.transform = `translate3d(${p * 38 * vw}px,0,0)`;
    line1.style.opacity = line2.style.opacity = String(clamp01(1 - p * 1.6));
    kicker.style.opacity = foot.style.opacity = String(state.fa * clamp01(1 - p * 2.6));
    foot.style.visibility = p > 0.45 ? 'hidden' : '';
    shade.style.opacity = String(p * 0.9);
    ui.style.opacity = String(clamp01(k * (1 - p * 1.8)));
    const rv = clamp01((p - 0.62) / 0.3);
    reveal.style.opacity = String(rv);
    reveal.style.transform = `scale(${0.9 + rv * 0.1})`;
    reveal.classList.toggle('is-live', rv > 0.5);
    if (scrollCue) scrollCue.style.opacity = String(clamp01(k - p * 4));
  };
  apply();

  const onResize = () => { frame = measureFrame(hero); apply(); };
  let rt;
  window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(onResize, 120); });
  ScrollTrigger.addEventListener('refresh', onResize);

  ScrollTrigger.create({
    trigger: hero,
    start: 'top top',
    end: '+=115%',
    pin: true,
    pinSpacing: true,
    scrub: reduceMotion() ? false : 0.5,
    onUpdate: (st) => { state.p = st.progress; apply(); },
  });

  if (reduceMotion()) return;
  gsap.set(words, { yPercent: 45, autoAlpha: 0 });
  gsap.set([kicker, foot], { y: 24 });
  introReady.then(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.to(state, { k: 1, duration: 1.6, ease: 'expo.inOut', onUpdate: apply }, 0)
      .to(words, { yPercent: 0, autoAlpha: 1, duration: 1.3, stagger: 0.15 }, 0.35)
      .to(state, { fa: 1, duration: 1, ease: 'power2.out', onUpdate: apply }, 0.7)
      .to([kicker, foot], { y: 0, duration: 1.1, stagger: 0.12 }, 0.7);
  });
}
