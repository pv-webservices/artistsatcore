import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  initSmooth, initHeader, initDropdown, initDrawer, initAnchors, initPageTransitions, scrollToHashOnLoad,
} from './core.js';
import { initVideoModal, initLightbox, initCursor, initLazyIframes } from './media.js';
import { runLoader, initHero } from './hero.js';
import {
  initReveals, initSplitHeadings, initWordLight, initCounters, initRail, initStack, initProcess, initParallax,
} from './scroll.js';
import { initFaq, initFilters, initSelect, initForm } from './ui.js';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const root = document.documentElement;
const mm = gsap.matchMedia();

initSmooth(gsap, ScrollTrigger);
initHeader();
initDropdown();
initDrawer();
initAnchors();
initPageTransitions();
initVideoModal();
initLightbox();
initCursor(gsap);
initLazyIframes();

const introReady = runLoader(gsap);
introReady.then(() => root.classList.add('is-ready'));

initHero(gsap, ScrollTrigger, introReady);
initRail(gsap, mm); // pinned sections first so later triggers account for their spacing
initSplitHeadings(gsap);
initWordLight(ScrollTrigger);
initCounters(ScrollTrigger);
initStack(gsap);
initProcess(ScrollTrigger);
initParallax(gsap, mm);
initFaq(ScrollTrigger);
initFilters(ScrollTrigger);
initSelect();
initForm();
initReveals();

window.addEventListener('load', () => {
  ScrollTrigger.sort();
  ScrollTrigger.refresh();
  scrollToHashOnLoad();
});
if (document.fonts?.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
