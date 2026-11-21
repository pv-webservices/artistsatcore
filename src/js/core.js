/** Smooth scrolling, header state, dropdown, mobile drawer, anchors and page transitions. */
import Lenis from 'lenis';

export const qs = (s, el = document) => el.querySelector(s);
export const qsa = (s, el = document) => [...el.querySelectorAll(s)];
export const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const isDesktop = () => window.matchMedia('(min-width: 901px)').matches;

/** @type {Lenis|null} */
let lenis = null;
export const getLenis = () => lenis;
export const lockScroll = () => { lenis?.stop(); document.documentElement.style.overflow = 'hidden'; };
export const unlockScroll = () => { lenis?.start(); document.documentElement.style.overflow = ''; };

export function initSmooth(gsap, ScrollTrigger) {
  if (reduceMotion()) return null;
  lenis = new Lenis({ duration: 1.15, smoothWheel: true, syncTouch: false, wheelMultiplier: 1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

const headerOffset = () => (qs('[data-header]')?.offsetHeight || 70) + 8;

export function scrollToTarget(el, immediate = false) {
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -headerOffset(), immediate, duration: 1.3 });
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - headerOffset(), behavior: immediate ? 'auto' : 'smooth' });
}

export function initHeader() {
  const header = qs('[data-header]');
  if (!header) return;
  const fab = qs('.wa-fab');
  const hasHero = !!qs('[data-hero]');
  const update = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
    // On the home page the WhatsApp button waits until the hero CTAs have scrolled away
    if (fab && hasHero) fab.classList.toggle('is-tucked', window.scrollY < window.innerHeight * 0.5);
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
}

export function initDropdown() {
  qsa('[data-dropdown]').forEach((item) => {
    const btn = qs('.nav__chev', item);
    let timer;
    const set = (open) => {
      item.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
    };
    item.addEventListener('mouseenter', () => { clearTimeout(timer); set(true); });
    item.addEventListener('mouseleave', () => { timer = setTimeout(() => set(false), 160); });
    btn.addEventListener('click', () => set(!item.classList.contains('is-open')));
    item.addEventListener('focusout', (e) => { if (!item.contains(e.relatedTarget)) set(false); });
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { set(false); btn.focus(); }
    });
  });
}

export function initDrawer() {
  const drawer = qs('[data-drawer]');
  const scrim = qs('[data-drawer-scrim]');
  const burger = qs('[data-burger]');
  if (!drawer || !burger) return;
  drawer.setAttribute('data-lenis-prevent', '');
  let open = false;

  const setOpen = (next) => {
    if (next === open) return;
    open = next;
    burger.setAttribute('aria-expanded', String(open));
    if (open) {
      scrim.hidden = false;
      drawer.removeAttribute('inert');
      drawer.setAttribute('aria-hidden', 'false');
      requestAnimationFrame(() => { drawer.classList.add('is-open'); scrim.classList.add('is-open'); });
      lockScroll();
      setTimeout(() => qs('[data-drawer-close]', drawer)?.focus(), 80);
    } else {
      drawer.classList.remove('is-open');
      scrim.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      drawer.setAttribute('inert', '');
      unlockScroll();
      setTimeout(() => { if (!open) scrim.hidden = true; }, 500);
      burger.focus({ preventScroll: true });
    }
  };

  burger.addEventListener('click', () => setOpen(true));
  qs('[data-drawer-close]', drawer)?.addEventListener('click', () => setOpen(false));
  scrim.addEventListener('click', () => setOpen(false));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && open) setOpen(false); });
  qsa('a', drawer).forEach((a) => a.addEventListener('click', () => setOpen(false)));
  qsa('.drawer__toggle', drawer).forEach((t) => {
    t.addEventListener('click', () => {
      const sub = document.getElementById(t.getAttribute('aria-controls'));
      const expanded = t.getAttribute('aria-expanded') === 'true';
      t.setAttribute('aria-expanded', String(!expanded));
      sub.hidden = expanded;
    });
  });
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });
}

/** Same-page anchors (#id and /#id when already on that page) scroll smoothly. */
export function initAnchors() {
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href*="#"]');
    if (!a || e.defaultPrevented) return;
    const url = new URL(a.href, location.href);
    if (url.pathname !== location.pathname || !url.hash) return;
    if (url.hash === '#top') {
      e.preventDefault();
      lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!target) return;
    e.preventDefault();
    history.replaceState(null, '', url.hash);
    scrollToTarget(target);
  });
}

export function scrollToHashOnLoad() {
  if (!location.hash || location.hash.length < 2) return;
  const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (target) setTimeout(() => scrollToTarget(target, true), 60);
}

/** A short curtain wipe between internal pages. */
export function initPageTransitions() {
  const curtain = qs('[data-curtain]');
  if (!curtain || reduceMotion()) return;
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.target === '_blank' || a.hasAttribute('download') || a.dataset.video !== undefined) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || /\.(webp|jpe?g|png|pdf)$/i.test(url.pathname)) return;
    if (url.pathname === location.pathname) return; // same page (anchors handled elsewhere)
    e.preventDefault();
    curtain.classList.add('is-leaving');
    setTimeout(() => { location.href = url.href; }, 560);
  });
  window.addEventListener('pageshow', (e) => { if (e.persisted) curtain.classList.remove('is-leaving'); });
}
