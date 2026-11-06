// Testa a navegação de apresentação: ↓ em sequência, captura cada parada; depois atalhos 1–7, lightbox, abas.
import { chromium } from 'playwright';
import fs from 'node:fs';
const [url, out, w = '1440', h = '900'] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const exe = process.env.LOCALAPPDATA + '/ms-playwright/chromium-1248/chrome-win64/chrome.exe';
const b = await chromium.launch({ executablePath: exe });
const p = await b.newPage({ viewport: { width: +w, height: +h } });
const errors = []; p.on('pageerror', (e) => errors.push(e.message)); p.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
await p.goto(url, { waitUntil: 'networkidle' }); await p.waitForTimeout(1500);
const log = [];
for (let i = 0; i < 22; i++) {
  await p.keyboard.press('ArrowDown'); await p.waitForTimeout(1300);
  const st = await p.evaluate(() => ({ y: Math.round(scrollY), sec: document.querySelector('#counter-now').textContent, hud: document.querySelector('#hud-label').textContent }));
  log.push(st);
  await p.screenshot({ path: `${out}/${String(i).padStart(2, '0')}.png` });
  if (log.length > 1 && log[log.length - 2].y === st.y) break;
}
// atalhos numéricos
const jumps = {};
for (const k of ['3', '6', '1', 'End', 'Home']) { await p.keyboard.press(k); await p.waitForTimeout(1300); jumps[k] = await p.evaluate(() => document.querySelector('#counter-now').textContent); }
// abas da proposta
await p.keyboard.press('6'); await p.waitForTimeout(1200);
await p.click('#tab-b'); await p.waitForTimeout(700);
const tabB = await p.evaluate(() => ({ aHidden: document.querySelector('#panel-a').hidden, bHidden: document.querySelector('#panel-b').hidden }));
await p.locator('#panel-b').scrollIntoViewIfNeeded(); await p.waitForTimeout(600);
await p.screenshot({ path: `${out}/tab-b.png` });
// lightbox: abre primeira tela do P.01, navega com →, fecha com Esc
await p.keyboard.press('3'); await p.waitForTimeout(1200);
await p.click('[data-open="ana-cleide"]'); await p.waitForTimeout(600);
await p.keyboard.press('ArrowRight'); await p.waitForTimeout(500);
const lb = await p.evaluate(() => ({ open: document.querySelector('#lightbox').open, count: document.querySelector('#lb-count').textContent, cap: document.querySelector('#lb-caption').textContent }));
await p.screenshot({ path: `${out}/lightbox.png` });
await p.keyboard.press('Escape'); await p.waitForTimeout(300);
const lbClosed = await p.evaluate(() => !document.querySelector('#lightbox').open);
// troca de tela no viewer
await p.click('#ana-cleide [data-shot="1"]'); await p.waitForTimeout(700);
const shot = await p.evaluate(() => document.querySelector('#ana-cleide .browser__shot img').getAttribute('src'));
// galeria de design
await p.keyboard.press('4'); await p.waitForTimeout(1200);
await p.click('#bacanal [data-img="2"]'); await p.waitForTimeout(700);
const gal = await p.evaluate(() => document.querySelector('#bacanal [data-num]').textContent);
// ajuda
await p.click('#help-btn'); await p.waitForTimeout(300);
const helpOpen = await p.evaluate(() => document.querySelector('#help').open);
await p.screenshot({ path: `${out}/help.png` });
console.log(JSON.stringify({ stops: log, jumps, tabB, lb, lbClosed, shot, gal, helpOpen, errors }, null, 0));
await b.close();
