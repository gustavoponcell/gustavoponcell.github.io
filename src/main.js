import { contacts, devProjects, archive, designProjects, skills } from './data.js';

document.documentElement.classList.add('js');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const v960 = (src) => src.replace(/\.webp$/, '-960.webp');
const devSet = (src) => `${v960(src)} 960w, ${src} 1440w`;
const DEV_SIZES = '(max-width: 720px) 100vw, min(1100px, 80vw)';
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ------------------------------------------------------------------ */
/* Render: projetos de desenvolvimento                                 */
/* ------------------------------------------------------------------ */
function renderDev() {
  $('#dev-projects').innerHTML = devProjects.map((p) => `
    <article class="case reveal" id="${p.id}" data-stop aria-labelledby="${p.id}-t">
      <header class="case__head">
        <span class="case__code">${p.code}</span>
        <div>
          <h3 class="case__title" id="${p.id}-t">${esc(p.name)}</h3>
          <p class="case__kind">${esc(p.kind)}</p>
        </div>
        <div class="case__meta">
          <span class="chip chip--${p.status.tone}">${esc(p.status.label)}</span>
          <span>${esc(p.client)} · ${p.year}</span>
        </div>
      </header>
      <div class="case__body">
        <div class="viewer" data-viewer="${p.id}">
          <div class="viewer__stage">
            <div class="browser">
              <div class="browser__bar"><span class="lights" aria-hidden="true"><i></i><i></i><i></i></span><span class="browser__url" data-url>${esc(p.id)}/${esc(p.shots[0].url)}</span></div>
              <button class="browser__shot" type="button" data-open="${p.id}" aria-label="Ampliar tela: ${esc(p.shots[0].label)}">
                <img src="${v960(p.shots[0].src)}" srcset="${devSet(p.shots[0].src)}" sizes="${DEV_SIZES}" alt="${esc(p.name)} — ${esc(p.shots[0].label)}" width="1440" height="900" loading="lazy" decoding="async" />
                <span class="zoom">Ampliar ⤢</span>
              </button>
            </div>
            ${p.mobile ? `<button class="phone" type="button" data-open-mobile="${p.id}" aria-label="Ampliar: ${esc(p.mobile.label)}"><img src="${p.mobile.src}" alt="${esc(p.name)} — ${esc(p.mobile.label)}" loading="lazy" decoding="async" /></button>` : ''}
          </div>
          ${p.shots.length > 1 ? `<div class="viewer__tabs" role="group" aria-label="Telas de ${esc(p.name)}">
            ${p.shots.map((s, i) => `<button type="button" data-shot="${i}" aria-pressed="${i === 0}">${esc(s.label)}</button>`).join('')}
          </div>` : ''}
        </div>
        <div class="info">
          <div class="info__col">
            <div><h4>Problema</h4><p>${esc(p.problem)}</p></div>
            <div><h4>O que foi construído</h4><ul>${p.features.map((f) => `<li>${esc(f)}</li>`).join('')}</ul></div>
          </div>
          <div class="info__col">
            <div><h4>Stack</h4><div class="tags">${p.stack.map((t) => `<span>${esc(t)}</span>`).join('')}</div></div>
            <div><h4>Minha participação</h4><p>${esc(p.role)}</p></div>
          </div>
          <div class="info__col">
            <div><h4>Relevância para vocês</h4>
              <div class="fit"><div><b>ONG</b><span>${esc(p.fit.ong)}</span></div><div><b>Condomínio</b><span>${esc(p.fit.cond)}</span></div></div>
            </div>
            <div>
              ${p.links.length ? `<div class="links">${p.links.map((l) => `<a href="${l.href}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join('')}</div>` : ''}
              <p class="note">${esc(p.note)}</p>
            </div>
          </div>
        </div>
      </div>
    </article>`).join('');

  $('#archive-rows').innerHTML = archive.map((r) => `
    <tr><td><a href="${r.href}" target="_blank" rel="noopener">${esc(r.name)}</a></td><td>${esc(r.what)}</td><td>${esc(r.stack)}</td><td>${esc(r.status)}</td></tr>`).join('');
}

/* ------------------------------------------------------------------ */
/* Render: design                                                      */
/* ------------------------------------------------------------------ */
const designSrc = (id, w) => `img/design/${id}${w ? '-' + w : ''}.webp`;
const designSet = (id) => `${designSrc(id, 960)} 960w, ${designSrc(id)} 1920w`;
const DESIGN_SIZES = '(max-width: 980px) 100vw, 62vw';
function renderDesign() {
  $('#design-projects').innerHTML = designProjects.map((d) => `
    <article class="dcase reveal" id="${d.id}" data-stop aria-labelledby="${d.id}-t">
      <header class="dcase__head">
        <span class="dcase__code">${d.code}</span>
        <h3 class="dcase__title" id="${d.id}-t">${esc(d.name)}<span class="dcase__full">${esc(d.full)}</span></h3>
        <div class="dcase__meta">${esc(d.kind)}<br/>${d.year} · <a href="${d.href}" target="_blank" rel="noopener">Ver no Behance ↗</a></div>
      </header>
      <div class="dcase__body">
        <div data-gallery="${d.id}">
          <div class="dstage">
            <button class="dstage__main" type="button" data-open-design="${d.id}" aria-label="Ampliar: ${esc(d.images[0][1])}">
              <img src="${designSrc(d.images[0][0], 960)}" srcset="${designSet(d.images[0][0])}" sizes="${DESIGN_SIZES}" alt="${esc(d.name)} — ${esc(d.images[0][1])}" width="1920" height="1080" loading="lazy" decoding="async" />
            </button>
            <div class="dstage__cap"><span data-cap>${esc(d.images[0][1])}</span><span data-num>01 / ${String(d.images.length).padStart(2, '0')}</span></div>
          </div>
          <div class="strip" role="group" aria-label="Imagens de ${esc(d.name)}">
            ${d.images.map(([id, cap], i) => `<button type="button" data-img="${i}" aria-pressed="${i === 0}" aria-label="${esc(cap)}"><img src="${designSrc(id, 320)}" alt="" loading="lazy" decoding="async" width="1920" height="1080" /></button>`).join('')}
          </div>
        </div>
        <div class="dtext">
          <p>${esc(d.text)}</p>
          ${d.metrics ? `<div class="dmetrics">${d.metrics.map(([n, l]) => `<div><strong>${esc(n)}</strong><span>${esc(l)}</span></div>`).join('')}</div><small>${esc(d.metricsNote)}</small>` : ''}
          <p class="kv"><b>Ferramentas</b> — ${esc(d.tools)}</p>
        </div>
      </div>
    </article>`).join('');
}

function renderSkills() {
  $('#skill-rows').innerHTML = skills.map((s) => `<tr><td>${esc(s.area)}</td><td>${esc(s.tech)}</td><td>${esc(s.proof)}</td></tr>`).join('');
}

function renderContacts() {
  $('#c-whats').href = contacts.whatsapp; $('#c-whats-txt').textContent = contacts.whatsappDisplay;
  $('#c-mail').href = `mailto:${contacts.email}`; $('#c-mail-txt').textContent = contacts.email;
  $('#c-gh').href = contacts.github; $('#c-be').href = contacts.behance; $('#c-ig').href = contacts.instagram;
}

renderDev(); renderDesign(); renderSkills(); renderContacts();

/* ------------------------------------------------------------------ */
/* Galerias (troca de tela com transição)                              */
/* ------------------------------------------------------------------ */
function swapImg(btn, img, src, alt, srcset, sizes) {
  const apply = () => { if (srcset) { img.sizes = sizes; img.srcset = srcset; } img.src = src; img.alt = alt; };
  if (reduceMotion) { apply(); return; }
  btn.classList.add('is-swapping');
  const pre = new Image(); if (srcset) { pre.sizes = sizes; pre.srcset = srcset; } pre.src = src;
  const done = () => { apply(); requestAnimationFrame(() => btn.classList.remove('is-swapping')); };
  setTimeout(() => (pre.complete ? done() : (pre.onload = pre.onerror = done)), 180);
}

const viewerState = {};
$$('[data-viewer]').forEach((v) => {
  const p = devProjects.find((x) => x.id === v.dataset.viewer);
  viewerState[p.id] = 0;
  v.addEventListener('click', (e) => {
    const t = e.target.closest('[data-shot]');
    if (!t) return;
    const i = +t.dataset.shot; viewerState[p.id] = i;
    $$('[data-shot]', v).forEach((b) => b.setAttribute('aria-pressed', String(b === t)));
    const s = p.shots[i];
    swapImg($('.browser__shot', v), $('.browser__shot img', v), v960(s.src), `${p.name} — ${s.label}`, devSet(s.src), DEV_SIZES);
    $('[data-url]', v).textContent = `${p.id}/${s.url}`;
    $('.browser__shot', v).setAttribute('aria-label', `Ampliar tela: ${s.label}`);
  });
});

const galleryState = {};
$$('[data-gallery]').forEach((g) => {
  const d = designProjects.find((x) => x.id === g.dataset.gallery);
  galleryState[d.id] = 0;
  g.addEventListener('click', (e) => {
    const t = e.target.closest('[data-img]');
    if (!t) return;
    const i = +t.dataset.img; galleryState[d.id] = i;
    $$('[data-img]', g).forEach((b) => b.setAttribute('aria-pressed', String(b === t)));
    const [id, cap] = d.images[i];
    swapImg($('.dstage__main', g), $('.dstage__main img', g), designSrc(id, 960), `${d.name} — ${cap}`, designSet(id), DESIGN_SIZES);
    $('[data-cap]', g).textContent = cap;
    $('[data-num]', g).textContent = `${String(i + 1).padStart(2, '0')} / ${String(d.images.length).padStart(2, '0')}`;
    $('.dstage__main', g).setAttribute('aria-label', `Ampliar: ${cap}`);
  });
});

/* ------------------------------------------------------------------ */
/* Lightbox                                                            */
/* ------------------------------------------------------------------ */
const lb = $('#lightbox'); const lbImg = $('#lb-img'); const lbBox = $('.lightbox__img');
let lbItems = []; let lbIndex = 0; let lbReturn = null;
function lbShow() {
  const it = lbItems[lbIndex];
  lbImg.src = it.src; lbImg.alt = it.alt;
  lbBox.classList.toggle('is-tall', !!it.tall); lbBox.scrollTop = 0;
  $('#lb-caption').textContent = it.alt;
  $('#lb-count').textContent = lbItems.length > 1 ? `${lbIndex + 1} / ${lbItems.length}` : '';
  $('#lb-prev').hidden = $('#lb-next').hidden = lbItems.length < 2;
}
function lbOpen(items, index, from) { lbItems = items; lbIndex = index; lbReturn = from; lbShow(); lb.showModal(); }
const lbStep = (d) => { lbIndex = (lbIndex + d + lbItems.length) % lbItems.length; lbShow(); };
$('#lb-prev').addEventListener('click', () => lbStep(-1));
$('#lb-next').addEventListener('click', () => lbStep(1));
$('#lb-close').addEventListener('click', () => lb.close());
lb.addEventListener('close', () => lbReturn && lbReturn.focus());
lb.addEventListener('click', (e) => { if (e.target === lb || e.target === lbBox) lb.close(); });

document.addEventListener('click', (e) => {
  const o = e.target.closest('[data-open]');
  if (o) {
    const p = devProjects.find((x) => x.id === o.dataset.open);
    const items = p.shots.map((s) => ({ src: s.full || s.src, alt: `${p.name} — ${s.label}`, tall: !!s.full }));
    return lbOpen(items, viewerState[p.id] || 0, o);
  }
  const m = e.target.closest('[data-open-mobile]');
  if (m) {
    const p = devProjects.find((x) => x.id === m.dataset.openMobile);
    return lbOpen([{ src: p.mobile.src, alt: `${p.name} — ${p.mobile.label}`, tall: true }], 0, m);
  }
  const d = e.target.closest('[data-open-design]');
  if (d) {
    const g = designProjects.find((x) => x.id === d.dataset.openDesign);
    return lbOpen(g.images.map(([id, cap]) => ({ src: designSrc(id), alt: `${g.name} — ${cap}` })), galleryState[g.id] || 0, d);
  }
});

/* ------------------------------------------------------------------ */
/* Abas da proposta                                                    */
/* ------------------------------------------------------------------ */
const tabs = $$('[role="tab"]');
function selectTab(tab, focus = true) {
  tabs.forEach((t) => {
    const on = t === tab;
    t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1;
    const panel = document.getElementById(t.getAttribute('aria-controls'));
    panel.hidden = !on;
    if (on) { panel.classList.remove('is-entering'); void panel.offsetWidth; panel.classList.add('is-entering', 'in'); }
  });
  if (focus) tab.focus();
  collectStops();
}
tabs.forEach((t, i) => {
  t.addEventListener('click', () => selectTab(t));
  t.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault(); e.stopPropagation();
      selectTab(tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length]);
    }
  });
});

/* ------------------------------------------------------------------ */
/* Reveal + efeitos de entrada                                         */
/* ------------------------------------------------------------------ */
const GLYPHS = '█▓▒░/<>_#*+';
function scramble(el) {
  const final = el.dataset.text || el.textContent; el.dataset.text = final;
  if (reduceMotion) return;
  let f = 0; const total = 18;
  const tick = () => {
    el.textContent = final.split('').map((c, i) => (c === ' ' || i < (f / total) * final.length ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join('');
    if (++f <= total) requestAnimationFrame(tick); else el.textContent = final;
  };
  tick();
}
function countUp(el) {
  const to = +el.dataset.count; const suf = el.dataset.suffix || '';
  if (reduceMotion) return;
  const t0 = performance.now(); const dur = 1100;
  const step = (t) => { const k = Math.min(1, (t - t0) / dur); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))) + suf; if (k < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}

const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (!en.isIntersecting) return;
    const el = en.target; el.classList.add('in'); io.unobserve(el);
    $$('.scramble', el).forEach(scramble);
    $$('[data-count]', el).forEach(countUp);
    if (el.id === 'terminal' || el.contains($('#terminal'))) typeTerminal();
    $$('.bars i', el).forEach((b, i) => b.style.setProperty('--i', i));
  });
}, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
$$('.reveal, .concept, .arch').forEach((el) => io.observe(el));

// Stagger leve dentro dos grupos do hero
$$('.hero .reveal').forEach((el, i) => el.style.setProperty('--d', `${i * 0.07}s`));

/* Terminal digitado */
let typed = false;
function typeTerminal() {
  if (typed) return; typed = true;
  const pre = $('#terminal'); const lines = JSON.parse(pre.dataset.lines);
  if (reduceMotion) { pre.textContent = lines.join('\n'); return; }
  let li = 0, ci = 0, out = '';
  const cursor = '<span class="cur"></span>';
  const tick = () => {
    if (li >= lines.length) { pre.innerHTML = esc(out) + cursor; return; }
    const line = lines[li];
    ci += 2; const partial = line.slice(0, ci);
    pre.innerHTML = esc(out + partial) + cursor;
    if (ci >= line.length) { out += line + '\n'; li++; ci = 0; setTimeout(tick, 140); } else setTimeout(tick, 16);
  };
  tick();
}

/* Retrato: pontilhado → foto */
const portrait = $('#portrait');
function revealPortrait() {
  if (reduceMotion) { portrait.classList.add('is-on'); return; }
  setTimeout(() => { portrait.classList.add('is-scanning', 'is-on'); }, 700);
}
const photo = $('.portrait__photo');
photo.complete ? revealPortrait() : photo.addEventListener('load', revealPortrait, { once: true });

/* Relógio local (Diamantina usa o horário de Brasília) */
const clock = $('#clock');
const fmt = new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'America/Sao_Paulo' });
const tickClock = () => { clock.textContent = `${fmt.format(new Date())} BRT`; };
tickClock(); setInterval(tickClock, 1000);

/* ------------------------------------------------------------------ */
/* Navegação de apresentação                                           */
/* ------------------------------------------------------------------ */
const sections = $$('main > .section');
const navLinks = $$('[data-nav]');
const names = ['Abertura', 'Perfil', 'Sistemas', 'Design', 'Stack', 'Proposta', 'Contato'];
let stops = [];
function collectStops() { stops = $$('[data-stop]').filter((el) => !el.closest('[hidden]')); }
collectStops();

const topbarH = () => $('#topbar').offsetHeight;
// Posição de layout (ignora o translateY das animações de entrada ainda não disparadas)
function absTop(el) { let y = 0; while (el) { y += el.offsetTop; el = el.offsetParent; } return y; }
const stopY = (el) => Math.max(0, absTop(el) - topbarH() - 8);
function goToEl(el) {
  scrollTo({ top: stopY(el), behavior: reduceMotion ? 'auto' : 'smooth' });
}
function goStop(delta) {
  const y = scrollY;
  let target;
  if (delta > 0) target = stops.find((el) => stopY(el) - y > 12);
  else target = [...stops].reverse().find((el) => stopY(el) - y < -12);
  if (target) goToEl(target);
  else if (delta > 0) scrollTo({ top: document.documentElement.scrollHeight, behavior: reduceMotion ? 'auto' : 'smooth' });
  else scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
}
$('#next').addEventListener('click', () => goStop(1));
$('#prev').addEventListener('click', () => goStop(-1));

const help = $('#help');
$('#help-btn').addEventListener('click', () => help.showModal());
$('#help-close').addEventListener('click', () => help.close());
help.addEventListener('click', (e) => { if (e.target === help) help.close(); });

document.addEventListener('keydown', (e) => {
  if (e.altKey || e.ctrlKey || e.metaKey) return;
  if (lb.open) {
    if (e.key === 'ArrowRight') { e.preventDefault(); lbStep(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); lbStep(-1); }
    return;
  }
  if (help.open) return;
  const tag = (e.target.tagName || '').toLowerCase();
  if (['input', 'textarea', 'select'].includes(tag)) return;
  const onControl = ['button', 'a'].includes(tag);
  switch (e.key) {
    case 'ArrowDown': case 'PageDown': case 'ArrowRight':
      e.preventDefault(); goStop(1); break;
    case ' ':
      if (onControl) return; e.preventDefault(); goStop(e.shiftKey ? -1 : 1); break;
    case 'ArrowUp': case 'PageUp': case 'ArrowLeft':
      e.preventDefault(); goStop(-1); break;
    case 'Home': e.preventDefault(); goToEl(sections[0]); break;
    case 'End': e.preventDefault(); goToEl(sections[sections.length - 1]); break;
    case 'f': case 'F':
      if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen?.().catch(() => {});
      break;
    case '?': help.showModal(); break;
    default:
      if (/^[1-7]$/.test(e.key)) { e.preventDefault(); goToEl(sections[+e.key - 1]); }
  }
});

/* Seção atual, contador, progresso e HUD */
const progress = $('#progress'); const counterNow = $('#counter-now'); const hudLabel = $('#hud-label');
let ticking = false;
function onScroll() {
  ticking = false;
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  const probe = innerHeight * 0.35;
  let cur = 0;
  sections.forEach((s, i) => { if (s.getBoundingClientRect().top <= probe) cur = i; });
  if (scrollY >= max - 4) cur = sections.length - 1;
  navLinks.forEach((a, i) => (i === cur ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current')));
  counterNow.textContent = String(cur + 1).padStart(2, '0');
  hudLabel.textContent = names[cur];
  document.body.classList.toggle('on-ink', sections[cur].classList.contains('section--ink'));
}
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
addEventListener('resize', onScroll);
onScroll();
