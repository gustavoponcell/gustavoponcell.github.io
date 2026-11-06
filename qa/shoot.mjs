// Usage: node qa/shoot.mjs <url> <outPrefix> [width] [height] [fullPage]
import { chromium } from 'playwright';
const [url, out, w='1440', h='900', full='1'] = process.argv.slice(2);
const exe = process.env.LOCALAPPDATA + '/ms-playwright/chromium-1248/chrome-win64/chrome.exe';
const browser = await chromium.launch({ executablePath: exe });
const page = await browser.newPage({ viewport: { width:+w, height:+h } });
const errors = [];
page.on('console', m => { if (m.type()==='error') errors.push(m.text()); });
page.on('pageerror', e => errors.push('PAGEERROR '+e.message));
await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
// scroll through to trigger reveal animations
const H = await page.evaluate(() => document.documentElement.scrollHeight);
for (let y=0; y<H; y+= +h*0.6) { await page.evaluate(y=>window.scrollTo(0,y), y); await page.waitForTimeout(250); }
await page.evaluate(()=>window.scrollTo(0,0)); await page.waitForTimeout(800);
await page.screenshot({ path: `${out}.png`, fullPage: full==='1' });
console.log(JSON.stringify({ height: H, errors }));
await browser.close();
