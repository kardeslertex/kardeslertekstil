// Read-only crawl of this site's sitemap URLs. No external origins are followed.
import fs from 'node:fs/promises';
const origin = 'https://kardeslertekstil.com.tr';
const rows = [];
let stop = false;
async function read(url) {
  return fetch(url, {redirect:'manual', signal:AbortSignal.timeout(20000)});
}
const sitemap = await read(origin + '/sitemap.xml');
if (!sitemap.ok) throw new Error(`Sitemap HTTP ${sitemap.status}`);
const xml = await sitemap.text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1].replaceAll('&amp;','&'));
if (!urls.length || urls.some(u=>new URL(u).origin !== origin)) throw new Error('Invalid sitemap scope');
const queue = [...urls];
async function worker() {
  while (queue.length && !stop) {
    const url = queue.shift();
    try {
      const response = await read(url);
      const html = await response.text();
      const tags = [...html.matchAll(/<link\b[^>]*>/gi)].map(m=>m[0]);
      const canonicals = tags.filter(t=>/rel=["']canonical["']/i.test(t)).map(t=>t.match(/href=["']([^"']+)["']/i)?.[1]);
      const robots = [...html.matchAll(/<meta\b[^>]*>/gi)].map(m=>m[0]).filter(t=>/name=["']robots["']/i.test(t)).join(' ');
      const row = {url,status:response.status,canonicals,ok:response.status===200&&canonicals.length===1&&canonicals[0]===url&&!/noindex/i.test(robots)};
      if ([403,429].includes(response.status) || /<title>Just a moment|cf-chl-/i.test(html)) {
        row.error='Access/rate-limit response; crawl stopped without retries'; stop=true;
      }
      rows.push(row);
    } catch (e) {rows.push({url,ok:false,error:e.message});}
    if (rows.length % 100 === 0) console.log(`Checked ${rows.length}/${urls.length}`);
  }
}
await Promise.all(Array.from({length:4},worker));
const issues=rows.filter(r=>!r.ok);
const summary={expected:urls.length,checked:rows.length,passed:rows.length-issues.length,issues:issues.length,stopped:stop,finishedAt:new Date().toISOString()};
await fs.writeFile('live-site-audit.json',JSON.stringify({summary,issues,rows},null,2));
console.log(JSON.stringify(summary));
for (const row of issues) console.log(JSON.stringify(row));
if (issues.length || rows.length!==urls.length) process.exitCode=1;
