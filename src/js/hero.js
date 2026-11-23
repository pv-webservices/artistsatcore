/** Home hero: crossfading graded film stills with a "Now showing" caption linked to each film. */
import { qs, qsa, reduceMotion } from './core.js';

const SLIDE_MS = 6500;

export function initHero() {
  const hero = qs('[data-hero]');
  if (!hero) return;
  const slides = qsa('.hero__slide', hero);
  const dots = qsa('[data-hero-dot]', hero);
  const now = qs('[data-hero-now]', hero);
  const titleEl = qs('[data-hero-title]', hero);
  const typeEl = qs('[data-hero-type]', hero);
  if (slides.length < 2) return;

  hero.style.setProperty('--slide', `${SLIDE_MS / 1000}s`);
  let index = 0;
  let timer = null;
  let inView = true;

  const show = (next) => {
    if (next === index) return;
    slides[index].classList.remove('is-active');
    slides[next].classList.add('is-active');
    dots.forEach((d, i) => {
      d.classList.toggle('is-active', i === next);
      d.classList.toggle('is-done', i < next);
      d.setAttribute('aria-selected', String(i === next));
    });
    const d = dots[next];
    now.classList.add('is-swapping');
    setTimeout(() => {
      titleEl.textContent = d.dataset.title;
      typeEl.textContent = d.dataset.type;
      now.dataset.video = d.dataset.id;
      if (d.dataset.start) now.dataset.start = d.dataset.start;
      else delete now.dataset.start;
      now.setAttribute('aria-label', `Play ${d.dataset.title}`);
      now.classList.remove('is-swapping');
    }, 380);
    index = next;
  };

  const stop = () => { clearTimeout(timer); timer = null; };
  const schedule = () => {
    stop();
    if (reduceMotion() || !inView || document.hidden) return;
    timer = setTimeout(() => { show((index + 1) % slides.length); schedule(); }, SLIDE_MS);
  };

  dots.forEach((d, i) => d.addEventListener('click', () => {
    // restart the progress animation on the newly active dot
    d.classList.remove('is-active');
    void d.offsetWidth;
    show(i);
    d.classList.add('is-active');
    schedule();
  }));

  new IntersectionObserver(([en]) => {
    inView = en.isIntersecting;
    hero.classList.toggle('is-paused', !inView);
    if (inView) schedule(); else stop();
  }).observe(hero);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : schedule()));
  schedule();
}
