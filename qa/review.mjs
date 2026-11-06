// Captura a página em "telas" sequenciais + relatório de erros, imagens e fontes.
// Uso: node qa/review.mjs <url> <outDir> <width> <height>
import { chromium } from 'playwright';
import fs from 'node:fs';
const [url, out, w = '1440', h = '900'] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const exe = process.env.LOCALAPPDATA + '/ms-playwright/chromium-1248/chrome-win64/chrome.exe';
const browser = await chromium.launch({ executablePath: exe });
const page = await browser.newPage({ viewport: { width: +w, height: +h } });
const errors = [], failed = [];
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message));
page.on('requestfailed', (r) => failed.push(r.url() + ' ' + r.failure()?.errorText));
page.on('response', (r) => r.status() >= 400 && failed.push(r.status() + ' ' + r.url()));
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(2600);
const H = await page.evaluate(() => document.documentElement.scrollHeight);
let i = 0;
for (let y = 0; y < H; y += +h) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), y);
  await page.waitForTimeout(1100);
  await page.screenshot({ path: `${out}/${String(i++).padStart(2, '0')}.png` });
}
const report = await page.evaluate(async () => {
  await document.fonts.ready;
  const fonts = ['Archivo', 'Doto', 'JetBrains Mono'].map((f) => [f, document.fonts.check(`16px "${f}"`)]);
  const broken = [...document.images].filter((im) => im.complete && im.naturalWidth === 0).map((im) => im.src);
  const overflow = [...document.querySelectorAll('body *')].filter((el) => el.getBoundingClientRect().right > document.documentElement.clientWidth + 1 && getComputedStyle(el).position !== 'fixed').slice(0, 8).map((el) => el.tagName + '.' + el.className);
  return { fonts, broken, overflow, scrollW: document.documentElement.scrollWidth, clientW: document.documentElement.clientWidth };
});
console.log(JSON.stringify({ height: H, shots: i, errors, failed, ...report }, null, 1));
await browser.close();
