import { chromium } from 'playwright';
const exe = process.env.LOCALAPPDATA + '/ms-playwright/chromium-1248/chrome-win64/chrome.exe';
const b = await chromium.launch({ executablePath: exe });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
await p.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
await p.waitForTimeout(400);
const r = await p.evaluate(() => {
  const hidden = [...document.querySelectorAll('.reveal')].filter((el) => getComputedStyle(el).opacity !== '1').length;
  const photo = getComputedStyle(document.querySelector('.portrait__photo')).clipPath;
  const term = document.querySelector('#terminal').textContent.length;
  return { revealsNotVisible: hidden, photoClip: photo, fontsLoaded: [...document.fonts].filter(f=>f.status==='loaded').map(f=>f.family).filter((v,i,a)=>a.indexOf(v)===i) };
});
await p.screenshot({ path: '../qa-shots/reduced-hero.png' });
await p.keyboard.press('2'); await p.waitForTimeout(300);
r.term = await p.evaluate(() => document.querySelector('#terminal').textContent.split('\n').length);
console.log(JSON.stringify(r));
await b.close();
