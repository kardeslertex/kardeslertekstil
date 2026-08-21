#!/usr/bin/env node
// Audit every URL exported in Google Search Console coverage ZIP files.

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const desktop = process.argv[2];
const output = process.argv[3] || 'gsc-live-audit-20260821.json';
if (!desktop) throw new Error('Desktop path is required');

function unzipText(archive, entry) {
  try {
    return execFileSync('tar.exe', ['-xOf', archive, entry], { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
  } catch {
    return '';
  }
}

function parseCsv(text) {
  text = text.replace(/^\uFEFF/, '');
  const rows = [];
  let row = [], field = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (char === '"') quoted = false;
      else field += char;
    } else if (char === '"') quoted = true;
    else if (char === ',') { row.push(field); field = ''; }
    else if (char === '\n') { row.push(field.replace(/\r$/, '')); rows.push(row); row = []; field = ''; }
    else field += char;
  }
  if (field || row.length) { row.push(field.replace(/\r$/, '')); rows.push(row); }
  const headers = rows.shift() || [];
  return rows.filter(r => r.some(Boolean)).map(r => Object.fromEntries(headers.map((h, i) => [h, r[i] || ''])));
}

function readExports() {
  const archives = fs.readdirSync(desktop)
    .filter(name => /^kardeslertekstil\.com\.tr-Coverage-Drilldown-2026-08-21(?: \(\d+\))?\.zip$/.test(name))
    .sort(new Intl.Collator('tr').compare);
  const exports = [];
  for (const name of archives) {
    const archive = path.join(desktop, name);
    const metadata = parseCsv(unzipText(archive, 'Meta Veri.csv'));
    const issue = metadata.find(r => r['Mülk'] === 'Sorun')?.['Değer'] || 'Bilinmeyen';
    const table = parseCsv(unzipText(archive, 'Tablo.csv'));
    table.forEach((row, index) => {
      const url = (row.URL || '').replace(/[\r\n]/g, '').trim();
      if (url) exports.push({ archive: name, issue, row: index + 2, url, last_crawl: row['Son tarama'] || '' });
    });
  }
  return exports;
}

const redirectStatuses = new Set([301, 302, 303, 307, 308]);

async function audit(item) {
  let current = item.url, response, body = '', error = '';
  const chain = [], started = Date.now();
  try {
    for (let i = 0; i < 10; i++) {
      response = await fetch(current, {
        redirect: 'manual',
        signal: AbortSignal.timeout(25000),
        headers: { 'user-agent': 'Mozilla/5.0 (compatible; KardeslerTekstil-GSC-Audit/1.0)', accept: 'text/html,application/xhtml+xml,*/*;q=0.8' }
      });
      const location = response.headers.get('location') || '';
      chain.push({ url: current, status: response.status, location });
      if (!redirectStatuses.has(response.status) || !location) {
        body = (await response.text()).slice(0, 1_500_000);
        break;
      }
      current = new URL(location, current).href;
    }
    if (chain.length === 10 && redirectStatuses.has(chain.at(-1).status)) error = 'too_many_redirects';
  } catch (err) {
    error = `${err.name}: ${err.message}`;
    chain.push({ url: current, status: 0, location: '' });
  }
  const canonical = body.match(/<link\b(?=[^>]*\brel=["'][^"']*canonical[^"']*["'])(?=[^>]*\bhref=["']([^"']+)["'])[^>]*>/i)?.[1] || '';
  const metaRobots = body.match(/<meta\b(?=[^>]*\bname=["']robots["'])(?=[^>]*\bcontent=["']([^"']*)["'])[^>]*>/i)?.[1] || '';
  return {
    ...item,
    initial_status: chain[0].status,
    final_status: chain.at(-1).status,
    final_url: chain.at(-1).url,
    redirect_count: Math.max(0, chain.length - 1),
    redirect_chain: chain,
    canonical,
    meta_robots: metaRobots,
    x_robots_tag: response?.headers.get('x-robots-tag') || '',
    content_type: response?.headers.get('content-type') || '',
    elapsed_ms: Date.now() - started,
    error
  };
}

function counts(rows, key) {
  return Object.fromEntries([...rows.reduce((map, row) => map.set(String(row[key]), (map.get(String(row[key])) || 0) + 1), new Map())]);
}

async function main() {
  const exports = readExports();
  const results = [];
  let cursor = 0;
  async function worker() {
    while (cursor < exports.length) {
      const index = cursor++;
      results[index] = await audit(exports[index]);
    }
  }
  await Promise.all(Array.from({ length: 12 }, worker));
  const payload = {
    checked: results.length,
    unique_urls: new Set(results.map(row => row.url)).size,
    issues: counts(results, 'issue'),
    initial_statuses: counts(results, 'initial_status'),
    final_statuses: counts(results, 'final_status'),
    errors: results.filter(row => row.error).length,
    results
  };
  fs.writeFileSync(output, JSON.stringify(payload, null, 2), 'utf8');
  const { results: omitted, ...summary } = payload;
  console.log(JSON.stringify(summary, null, 2));
  console.log(`Report: ${path.resolve(output)}`);
}

main().catch(error => { console.error(error); process.exitCode = 1; });
