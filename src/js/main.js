import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  initSmooth, initHeader, initDropdown, initDrawer, initAnchors, scrollToHashOnLoad,
} from './core.js';
import { initVideoModal, initLightbox, initLazyIframes } from './media.js';
import { initHero } from './hero.js';
import { initReveals, initCounters, initParallax, initServiceIndex } from './scroll.js';
import { initFaq, initFilters, initSelect, initForm } from './ui.js';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const mm = gsap.matchMedia();

initSmooth(gsap, ScrollTrigger);
initHeader();
initDropdown();
initDrawer();
initAnchors();
initVideoModal();
initLightbox();
initLazyIframes();
initHero();
initParallax(gsap, mm);
initCounters();
initServiceIndex();
initFaq(ScrollTrigger);
initFilters(ScrollTrigger);
initSelect();
initForm();
initReveals();

document.documentElement.classList.add('is-ready');

window.addEventListener('load', () => {
  ScrollTrigger.refresh();
  scrollToHashOnLoad();
});
if (document.fonts?.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
