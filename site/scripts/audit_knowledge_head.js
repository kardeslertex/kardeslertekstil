const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const KNOWLEDGE_DIR = path.join(ROOT, 'bilgi-merkezi');

function has(content, regex) {
  return regex.test(content);
}

function listArticleFiles() {
  const entries = fs.readdirSync(KNOWLEDGE_DIR, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => ({
      slug: entry.name,
      filePath: path.join(KNOWLEDGE_DIR, entry.name, 'index.html')
    }))
    .filter((item) => fs.existsSync(item.filePath));
}

function auditArticle(slug, html) {
  const checks = {
    title: has(html, /<title>[^<]+<\/title>/i),
    description: has(html, /<meta\s+name=["']description["']\s+content=["'][^"']+["'][^>]*>/i),
    canonical: has(
      html,
      new RegExp(`<link\\s+rel=["']canonical["']\\s+href=["']https://kardeslertekstil\\.com\\.tr/bilgi-merkezi/${slug}/["'][^>]*>`, 'i')
    ),
    ogTitle: has(html, /<meta\s+property=["']og:title["']\s+content=["'][^"']+["'][^>]*>/i),
    ogDescription: has(html, /<meta\s+property=["']og:description["']\s+content=["'][^"']+["'][^>]*>/i),
    ogUrl: has(
      html,
      new RegExp(`<meta\\s+property=["']og:url["']\\s+content=["']https://kardeslertekstil\\.com\\.tr/bilgi-merkezi/${slug}/["'][^>]*>`, 'i')
    ),
    twitterCard: has(html, /<meta\s+name=["']twitter:card["']\s+content=["'][^"']+["'][^>]*>/i),
    postSlugData: has(html, new RegExp(`<body[^>]*data-post-slug=["']${slug}["']`, 'i')),
    knowledgeScript: has(html, /<script\s+src=["']\.\.\/knowledge-center\.js["']\s+defer><\/script>/i),
    articleSchema: has(html, /"@type"\s*:\s*"(Article|BlogPosting)"/i),
    breadcrumbSchema: has(html, /"@type"\s*:\s*"BreadcrumbList"/i)
  };

  const critical = ['title', 'description', 'canonical', 'postSlugData', 'knowledgeScript'];
  const criticalMissing = critical.filter((key) => !checks[key]);

  const warning = ['ogTitle', 'ogDescription', 'ogUrl', 'twitterCard', 'articleSchema', 'breadcrumbSchema']
    .filter((key) => !checks[key]);

  return { checks, criticalMissing, warning };
}

function isDynamicSeoReady() {
  const jsPath = path.join(KNOWLEDGE_DIR, 'knowledge-center.js');
  if (!fs.existsSync(jsPath)) return false;
  const js = fs.readFileSync(jsPath, 'utf8');
  return (
    /function\s+normalizeArticleHeadMeta\s*\(/.test(js)
    && /function\s+injectArticleSchemas\s*\(/.test(js)
    && /normalizeArticleHeadMeta\(current,\s*article\)/.test(js)
  );
}

function run() {
  const files = listArticleFiles();
  if (!files.length) {
    console.error('No knowledge article files found.');
    process.exit(2);
  }

  const report = [];
  const dynamicSeoMode = isDynamicSeoReady();
  for (const item of files) {
    const html = fs.readFileSync(item.filePath, 'utf8');
    const result = auditArticle(item.slug, html);
    if (dynamicSeoMode) {
      result.warning = result.warning.filter((key) => key !== 'twitterCard' && key !== 'breadcrumbSchema' && key !== 'articleSchema');
    }
    report.push({ slug: item.slug, ...result });
  }

  const failed = report.filter((r) => r.criticalMissing.length > 0);
  const warned = report.filter((r) => r.warning.length > 0);

  console.log('Knowledge Article Head SEO Audit');
  console.log('================================');
  console.log('Articles checked:', report.length);
  console.log('Dynamic SEO mode:', dynamicSeoMode ? 'ON (runtime meta/schema injection detected)' : 'OFF');
  console.log('Critical failures:', failed.length);
  console.log('Warnings:', warned.length);

  if (failed.length) {
    console.log('\nCritical failures:');
    failed.slice(0, 50).forEach((item) => {
      console.log(`- ${item.slug}: missing ${item.criticalMissing.join(', ')}`);
    });
    if (failed.length > 50) {
      console.log(`... and ${failed.length - 50} more`);
    }
  }

  if (warned.length) {
    console.log('\nWarnings (non-blocking):');
    warned.slice(0, 50).forEach((item) => {
      console.log(`- ${item.slug}: missing ${item.warning.join(', ')}`);
    });
    if (warned.length > 50) {
      console.log(`... and ${warned.length - 50} more`);
    }
  }

  if (failed.length) {
    process.exit(1);
  }

  process.exit(0);
}

run();
