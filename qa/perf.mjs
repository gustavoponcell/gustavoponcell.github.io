import { chromium } from 'playwright';
const exe = process.env.LOCALAPPDATA + '/ms-playwright/chromium-1248/chrome-win64/chrome.exe';
const b = await chromium.launch({ executablePath: exe });
const variants = {
  base: '',
  noSmil: '.flow__lines circle{display:none!important}',
  noAnim: '*,*::before,*::after{animation:none!important;transition:none!important}',
  noFixedBg: 'body{background-attachment:scroll!important} .topbar{backdrop-filter:none!important}',
  cv: 'main>.section:not(#s1){content-visibility:auto;contain-intrinsic-size:auto 1400px}',
};
for (const [name, css] of Object.entries(variants)) {
  const ctx = await b.newContext({ viewport: { width: 1350, height: 940 } });
  const p = await ctx.newPage();
  await p.addInitScript((css) => {
    window.__lt = []; new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__lt.push(Math.round(e.duration)))).observe({ type: 'longtask', buffered: true });
    if (css) document.addEventListener('DOMContentLoaded', () => { const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s); });
  }, css);
  await p.goto('http://127.0.0.1:4173/', { waitUntil: 'load' });
  await p.waitForTimeout(5000);
  const lt = await p.evaluate(() => window.__lt);
  console.log(name.padEnd(10), 'longtasks', JSON.stringify(lt), 'TBT~', lt.reduce((a, d) => a + Math.max(0, d - 50), 0));
  await ctx.close();
}
await b.close();
