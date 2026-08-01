const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITEMAP_PATH = path.join(ROOT, 'sitemap.xml');
const KNOWLEDGE_JS_PATH = path.join(ROOT, 'bilgi-merkezi', 'knowledge-center.js');
const BASE = 'https://kardeslertekstil.com.tr/bilgi-merkezi/';

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function parsePublishedMap(source) {
  const map = new Map();
  const re = /slug:\s*"([^"]+)"[\s\S]*?published:\s*"(\d{4}-\d{2}-\d{2})"/g;
  let match;
  while ((match = re.exec(source)) !== null) {
    map.set(match[1], match[2]);
  }
  return map;
}

function parseSitemapKnowledgeSlugs(xml) {
  const slugs = new Set();
  const re = /<loc>https:\/\/kardeslertekstil\.com\.tr\/bilgi-merkezi\/([^<\/]+)\/\<\/loc>/g;
  let match;
  while ((match = re.exec(xml)) !== null) {
    const slug = match[1].trim();
    if (slug) slugs.add(slug);
  }
  return slugs;
}

function sync(xml, publishedBySlug) {
  let updatedCount = 0;
  let insertedCount = 0;
  let unchangedCount = 0;
  const missingInSitemap = [];

  let nextXml = xml;

  for (const [slug, published] of publishedBySlug.entries()) {
    const url = `${BASE}${slug}/`;
    const loc = `<loc>${url}</loc>`;
    const pattern = new RegExp(`(<url[^>]*>\\s*${escapeRegExp(loc)})([\\s\\S]*?<\\/url>)`, 'g');

    let found = false;

    nextXml = nextXml.replace(pattern, (full, prefix, tail) => {
      found = true;

      if (/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/.test(tail)) {
        const replacedTail = tail.replace(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/, `<lastmod>${published}</lastmod>`);
        if (replacedTail !== tail) {
          updatedCount += 1;
        } else {
          unchangedCount += 1;
        }
        return `${prefix}${replacedTail}`;
      }

      insertedCount += 1;
      const withLastmod = `\n    <lastmod>${published}</lastmod>${tail}`;
      return `${prefix}${withLastmod}`;
    });

    if (!found) {
      const pagePath = path.join(ROOT, 'bilgi-merkezi', slug, 'index.html');
      if (fs.existsSync(pagePath)) {
        const entry = `  <url><loc>${url}</loc><lastmod>${published}</lastmod></url>\n`;
        nextXml = nextXml.replace('</urlset>', `${entry}</urlset>`);
        insertedCount += 1;
      } else {
        missingInSitemap.push(slug);
      }
    }
  }

  // changefreq and priority are intentionally omitted: the site has no
  // reliable per-page signals from which to derive those values.
  nextXml = nextXml
    .replace(/<changefreq>[^<]+<\/changefreq>/g, '')
    .replace(/<priority>[^<]+<\/priority>/g, '')
    .replace(/[ \t]+$/gm, '')
    .replace(/(?:\r?\n){3,}/g, '\n\n');

  return {
    xml: nextXml,
    updatedCount,
    insertedCount,
    unchangedCount,
    missingInSitemap
  };
}

function run() {
  const shouldWrite = process.argv.includes('--write');

  const js = fs.readFileSync(KNOWLEDGE_JS_PATH, 'utf8');
  const xml = fs.readFileSync(SITEMAP_PATH, 'utf8');

  const publishedBySlug = parsePublishedMap(js);
  const sitemapSlugs = parseSitemapKnowledgeSlugs(xml);

  const { xml: nextXml, updatedCount, insertedCount, unchangedCount, missingInSitemap } = sync(xml, publishedBySlug);

  const missingInPosts = Array.from(sitemapSlugs).filter((slug) => !publishedBySlug.has(slug));
  const changed = nextXml !== xml;

  console.log('Sitemap Lastmod Sync Report');
  console.log('===========================');
  console.log('Published entries found:', publishedBySlug.size);
  console.log('Knowledge URLs in sitemap:', sitemapSlugs.size);
  console.log('Updated lastmod entries:', updatedCount);
  console.log('Inserted lastmod entries:', insertedCount);
  console.log('Unchanged matches:', unchangedCount);
  console.log('Missing in sitemap:', missingInSitemap.length);
  console.log('Missing in posts map:', missingInPosts.length);

  if (missingInSitemap.length) {
    console.log('\nSlugs missing in sitemap (sample):');
    missingInSitemap.slice(0, 30).forEach((slug) => console.log('-', slug));
    if (missingInSitemap.length > 30) console.log(`... and ${missingInSitemap.length - 30} more`);
  }

  if (missingInPosts.length) {
    console.log('\nSitemap slugs missing in posts map (sample):');
    missingInPosts.slice(0, 30).forEach((slug) => console.log('-', slug));
    if (missingInPosts.length > 30) console.log(`... and ${missingInPosts.length - 30} more`);
  }

  if (!shouldWrite) {
    console.log('\nDry run complete. Use --write to apply changes.');
    process.exit(0);
  }

  if (!changed) {
    console.log('\nNo file change needed.');
    process.exit(0);
  }

  fs.writeFileSync(SITEMAP_PATH, nextXml, 'utf8');
  console.log('\nSitemap updated successfully.');
  process.exit(0);
}

run();
