// Full-page screenshots of mekan-web via headless Chrome + raw CDP (no deps).
// Usage (dev server running): node scripts/screenshots.mjs docs/screenshots/<before|after> [baseUrl]
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const OUT = process.argv[2];
const BASE = process.argv[3] || 'http://localhost:4321';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9333;

const PAGES = [
  ['home', '/'],
  ['about', '/about'],
  ['service-quality-assurance', '/services/quality-assurance'],
  ['service-agribusiness-development', '/services/agribusiness-development'],
  ['service-agricultural-productivity', '/services/agricultural-productivity'],
  ['service-food-systems', '/services/food-systems'],
  ['service-global-standards', '/services/global-standards'],
  ['service-investment-advisory', '/services/investment-advisory'],
  ['projects', '/projects'],
  ['blog', '/blog'],
  ['resources', '/resources'],
  ['privacy-policy', '/privacy-policy'],
  ['terms-of-service', '/terms-of-service'],
  ['404', '/404'],
  ['500', '/500'],
];
const VIEWPORTS = [
  ['desktop', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false }],
  ['phone', { width: 375, height: 812, deviceScaleFactor: 1, mobile: true }],
];
const THEMES = ['light', 'dark'];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const profile = join(tmpdir(), 'mekan-shoot-profile');
const chrome = spawn(CHROME, [
  '--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
  '--hide-scrollbars', '--no-first-run', '--no-default-browser-check', 'about:blank',
], { stdio: 'ignore' });

let wsUrl;
for (let i = 0; i < 50 && !wsUrl; i++) {
  try {
    const tabs = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
    wsUrl = tabs.find((t) => t.type === 'page')?.webSocketDebuggerUrl;
  } catch {}
  if (!wsUrl) await sleep(200);
}
if (!wsUrl) throw new Error('Chrome did not start');

const ws = new WebSocket(wsUrl);
await new Promise((r) => ws.addEventListener('open', r, { once: true }));
let nextId = 0;
const pending = new Map();
const listeners = new Set();
ws.addEventListener('message', (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
  } else if (msg.method) listeners.forEach((fn) => fn(msg));
});
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++nextId;
  pending.set(id, { resolve, reject });
  ws.send(JSON.stringify({ id, method, params }));
});
const waitFor = (method, ms = 30000) => new Promise((resolve) => {
  const t = setTimeout(() => { listeners.delete(fn); resolve(null); }, ms);
  const fn = (m) => { if (m.method === method) { clearTimeout(t); listeners.delete(fn); resolve(m); } };
  listeners.add(fn);
});
const evaluate = async (expression) =>
  (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result?.value;

await send('Page.enable');
await send('Runtime.enable');

let themeScriptId;
mkdirSync(OUT, { recursive: true });

for (const theme of THEMES) {
  if (themeScriptId) await send('Page.removeScriptToEvaluateOnNewDocument', { identifier: themeScriptId });
  themeScriptId = (await send('Page.addScriptToEvaluateOnNewDocument', {
    source: `try { localStorage.setItem('theme', '${theme}'); } catch {}`,
  })).identifier;
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: theme }] });

  for (const [vpName, vp] of VIEWPORTS) {
    await send('Emulation.setDeviceMetricsOverride', vp);
    await send('Emulation.setTouchEmulationEnabled', { enabled: vp.mobile });

    for (const [name, path] of PAGES) {
      const loaded = waitFor('Page.loadEventFired');
      await send('Page.navigate', { url: BASE + path });
      await loaded;
      await sleep(1200);

      // Walk the page so lazy images and scroll-triggered content load.
      await evaluate(`(async () => {
        const step = innerHeight * 0.8;
        for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
          scrollTo(0, y); await new Promise(r => setTimeout(r, 120));
        }
        scrollTo(0, 0);
      })()`);
      // AOS loads async from a CDN and re-hides elements on init, so wait for it before forcing.
      await evaluate(`(async () => {
        for (let i = 0; i < 50 && typeof window.AOS === 'undefined'; i++) await new Promise(r => setTimeout(r, 100));
        await new Promise(r => setTimeout(r, 600));
      })()`);
      // Force every reveal/AOS element into its final state so nothing is captured invisible.
      await evaluate(`(() => {
        const s = document.createElement('style');
        s.textContent = '[data-aos],.reveal,.reveal-left,.reveal-right,.reveal-scale{opacity:1!important;transform:none!important;transition:none!important}';
        document.head.appendChild(s);
        document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale').forEach(e => e.classList.add('revealed'));
        document.querySelectorAll('[data-aos]').forEach(e => e.classList.add('aos-animate'));
        // Pin viewport-height sections to their real pixel height so the full-page capture does not stretch them.
        for (const el of document.querySelectorAll('body *')) {
          const cs = getComputedStyle(el);
          if (/vh|svh|dvh/.test(el.className?.toString?.() || '') || cs.minHeight.endsWith('px') && parseFloat(cs.minHeight) >= innerHeight * 0.95) {
            const h = el.getBoundingClientRect().height;
            if (h >= innerHeight * 0.9) { el.style.minHeight = h + 'px'; el.style.height = h + 'px'; }
          }
        }
      })()`);
      await evaluate(`Promise.all([...document.images].filter(i => !i.complete).map(i => new Promise(r => { i.onload = i.onerror = r; setTimeout(r, 4000); })))`);
      await sleep(900);

      // Grow the viewport to the full page height (vh sections are pinned above), then capture it in one frame.
      const height = await evaluate('Math.ceil(document.documentElement.scrollHeight)');
      await send('Emulation.setDeviceMetricsOverride', { ...vp, height });
      await sleep(700);
      const { data } = await send('Page.captureScreenshot', { format: 'jpeg', quality: 82 });
      await send('Emulation.setDeviceMetricsOverride', vp);
      const file = join(OUT, `${name}--${vpName}--${theme}.jpg`);
      writeFileSync(file, Buffer.from(data, 'base64'));
      console.log(`${file}  (${height}px)`);
    }
  }
}

ws.close();
chrome.kill();
