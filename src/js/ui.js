/** Interactive components: FAQ accordion, work filters, custom select, enquiry form. */
import { qs, qsa, reduceMotion } from './core.js';

const refresh = (ScrollTrigger) => {
  clearTimeout(refresh.t);
  refresh.t = setTimeout(() => ScrollTrigger.refresh(), 120);
};

export function initFaq(ScrollTrigger) {
  qsa('[data-faq]').forEach((d) => {
    const summary = qs('summary', d);
    const body = qs('.faq__a', d);
    summary.addEventListener('click', (e) => {
      if (reduceMotion() || !body.animate) { refresh(ScrollTrigger); return; }
      e.preventDefault();
      if (d.open) {
        const a = body.animate([{ height: `${body.offsetHeight}px` }, { height: '0px' }], { duration: 380, easing: 'cubic-bezier(.65,0,.35,1)' });
        a.onfinish = () => { d.open = false; refresh(ScrollTrigger); };
      } else {
        d.open = true;
        const h = body.offsetHeight;
        body.animate([{ height: '0px' }, { height: `${h}px` }], { duration: 480, easing: 'cubic-bezier(.22,1,.36,1)' })
          .onfinish = () => refresh(ScrollTrigger);
      }
    });
  });
}

export function initFilters(ScrollTrigger) {
  const bar = qs('[data-filters]');
  const grid = qs('[data-work-grid]');
  if (!bar || !grid) return;
  const cards = qsa('.pcard', grid);
  bar.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-filter]');
    if (!btn) return;
    const key = btn.dataset.filter;
    qsa('[data-filter]', bar).forEach((b) => {
      const on = b === btn;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    cards.forEach((c) => {
      const show = key === 'all' || c.dataset.cat === key;
      c.classList.toggle('is-hidden', !show);
      c.classList.toggle('pcard--wide', show && key === 'all' && cards.indexOf(c) % 3 === 0);
    });
    refresh(ScrollTrigger);
  });
}

/** Accessible custom listbox that matches the site theme (native popups can't be styled). */
export function initSelect() {
  qsa('[data-select]').forEach((root) => {
    const btn = qs('[data-select-btn]', root);
    const list = qs('[data-select-list]', root);
    const input = qs('[data-select-input]', root);
    const valueEl = qs('[data-select-value]', root);
    const opts = qsa('[role="option"]', list);
    let active = -1;

    const setActive = (i) => {
      active = (i + opts.length) % opts.length;
      opts.forEach((o, n) => o.classList.toggle('is-active', n === active));
      list.setAttribute('aria-activedescendant', opts[active].id);
      opts[active].scrollIntoView({ block: 'nearest' });
    };
    const open = () => {
      list.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
      const sel = opts.findIndex((o) => o.getAttribute('aria-selected') === 'true');
      setActive(sel >= 0 ? sel : 0);
      list.focus({ preventScroll: true });
    };
    const close = (focusBtn = true) => {
      list.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
      if (focusBtn) btn.focus({ preventScroll: true });
    };
    const choose = (i) => {
      opts.forEach((o, n) => o.setAttribute('aria-selected', String(n === i)));
      input.value = opts[i].dataset.value;
      valueEl.textContent = opts[i].textContent.replace('✓', '').trim();
      valueEl.classList.remove('is-placeholder');
      root.classList.remove('is-invalid');
      close();
    };

    btn.addEventListener('click', () => (list.hidden ? open() : close()));
    btn.addEventListener('keydown', (e) => {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) { e.preventDefault(); open(); }
    });
    list.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive(active + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(active - 1); }
      else if (e.key === 'Home') { e.preventDefault(); setActive(0); }
      else if (e.key === 'End') { e.preventDefault(); setActive(opts.length - 1); }
      else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(active); }
      else if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'Tab') close(false);
    });
    opts.forEach((o, i) => {
      o.addEventListener('click', () => choose(i));
      o.addEventListener('mousemove', () => { if (active !== i) setActive(i); });
    });
    document.addEventListener('pointerdown', (e) => { if (!root.contains(e.target) && !list.hidden) close(false); });

    const preset = new URLSearchParams(location.search).get('service');
    const idx = opts.findIndex((o) => o.dataset.value === preset);
    if (idx >= 0) { choose(idx); list.hidden = true; }
  });
}

const RULES = {
  name: (v) => (v.trim().length >= 2 ? '' : 'Please enter your name.'),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Please enter a valid email address.'),
  phone: (v) => (/^[0-9+()\-\s]{7,20}$/.test(v.trim()) && v.replace(/\D/g, '').length >= 7 ? '' : 'Please enter a valid phone number.'),
  message: (v) => (v.trim().length >= 10 ? '' : 'Tell us a little about the project (at least 10 characters).'),
};

function mailtoFallback(data) {
  const body = `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nService: ${data.service || '-'}\n\n${data.message}`;
  return `mailto:dheeraj@artistsatcore.com?cc=richa@artistsatcore.com&subject=${encodeURIComponent('Video enquiry from the website')}&body=${encodeURIComponent(body)}`;
}

export function initForm() {
  const form = qs('[data-form]');
  if (!form) return;
  const status = qs('[data-form-status]', form);
  const submit = qs('[data-submit]', form);

  const validateField = (input) => {
    const rule = RULES[input.name];
    if (!rule) return true;
    const msg = rule(input.value);
    const field = input.closest('.field');
    field.classList.toggle('is-invalid', !!msg);
    qs('.field__err', field).textContent = msg;
    input.setAttribute('aria-invalid', String(!!msg));
    return !msg;
  };
  qsa('input, textarea', form).forEach((el) => {
    el.addEventListener('blur', () => { if (el.value) validateField(el); });
    el.addEventListener('input', () => { if (el.closest('.field')?.classList.contains('is-invalid')) validateField(el); });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fields = qsa('input[name], textarea[name]', form).filter((el) => RULES[el.name]);
    const ok = fields.map(validateField).every(Boolean);
    if (!ok) { fields.find((f) => f.getAttribute('aria-invalid') === 'true')?.focus(); return; }

    const data = Object.fromEntries(new FormData(form).entries());
    submit.setAttribute('data-loading', '');
    qs('.btn__label', submit).textContent = 'Sending…';
    status.innerHTML = '';
    try {
      const res = await fetch(form.action, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) throw new Error(json?.error || 'unavailable');
      form.reset();
      status.innerHTML = `<p class="ok">Thank you, ${data.name.split(' ')[0].replace(/[<>&"]/g, '')}. Your brief is with us and we will be in touch shortly.</p>`;
    } catch {
      status.innerHTML = `<p class="err">We couldn't send your message just now. Please <a href="${mailtoFallback(data)}">email it to us instead</a> or call <a href="tel:+919810736701">+91 98107 36701</a>.</p>`;
    } finally {
      submit.removeAttribute('data-loading');
      qs('.btn__label', submit).textContent = 'Send enquiry';
    }
  });
}
