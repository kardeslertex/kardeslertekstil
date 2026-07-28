const fs = require("fs");
const path = require("path");

const root = process.cwd();
const buildDir = path.join(root, ".article-build");
const slug = "is-kiyafeti-fiyatlari-2026";
const title = "İş Kıyafeti Fiyatları 2026: Fiyatları Neler Belirler?";
const seoTitle = "İş Kıyafeti Fiyatları 2026 | Fiyatları Neler Belirler?";
const description = "İş kıyafeti fiyatları 2026 yılında hangi faktörlere göre değişiyor? Kumaş, gramaj, logo, sipariş adedi ve üretim detaylarını inceleyin.";
const canonical = `https://kardeslertekstil.com.tr/bilgi-merkezi/${slug}/`;
const published = "2026-07-28";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const rich = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
const slugify = (s) => s.toLocaleLowerCase("tr-TR")
  .replace(/ı/g, "i").replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s").replace(/ö/g, "o").replace(/ç/g, "c")
  .normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function blocksOf(text) {
  return text.replace(/^\uFEFF/, "").trim().split(/\r?\n\s*\r?\n/).map((b) => b.replace(/\r?\n/g, " ").trim()).filter(Boolean);
}

const mainSections = [];
const introBlocks = blocksOf(fs.readFileSync(path.join(buildDir, "intro.txt"), "utf8"));
const sources = [];
for (let n = 1; n <= 15; n++) {
  let blocks = blocksOf(fs.readFileSync(path.join(buildDir, `${n}.txt`), "utf8"));
  if (n === 14 && blocks[0].includes("(SSS) ")) {
    const marker = blocks[0].indexOf("(SSS)") + 5;
    blocks = [blocks[0].slice(0, marker), blocks[0].slice(marker).trim(), ...blocks.slice(1)];
  }
  sources.push({ n, blocks });
}

const usedIds = new Map();
function uniqueId(text) {
  const base = slugify(text);
  const count = usedIds.get(base) || 0;
  usedIds.set(base, count + 1);
  return count ? `${base}-${count + 1}` : base;
}

function isHeading(block, next, index) {
  if (index === 0) return true;
  if (/^\d+\.\s+\D/.test(block) && block.length < 120) return true;
  if (block.length <= 105 && !/[.!?:;]$/.test(block) && next && next.length > 115) return true;
  if (block === "Sonuç" && next) return true;
  return false;
}

function renderSection(section) {
  const { n, blocks } = section;
  const classifications = blocks.map((block, i) => isHeading(block, blocks[i + 1], i) ? (i === 0 ? "h2" : "h3") : "text");
  const mainTitle = blocks[0];
  const mainId = uniqueId(mainTitle);
  mainSections.push({ title: mainTitle, id: mainId });
  let html = `<h2 id="${mainId}">${rich(mainTitle)}</h2>\n`;
  let i = 1;
  while (i < blocks.length) {
    if (classifications[i] === "h3") {
      html += `<h3 id="${uniqueId(blocks[i])}">${rich(blocks[i])}</h3>\n`;
      i++;
      continue;
    }
    let run = i;
    while (run < blocks.length && classifications[run] === "text" && blocks[run].length <= 145) run++;
    if (run - i >= 2) {
      html += "<ul>\n";
      for (; i < run; i++) html += `<li>${rich(blocks[i])}</li>\n`;
      html += "</ul>\n";
      continue;
    }
    html += `<p>${rich(blocks[i])}</p>\n`;
    i++;
  }
  return html;
}

let articleContent = "";
introBlocks.forEach((block, i) => {
  if (i === 0) articleContent += `<h2 id="giris">${rich(block)}</h2>\n`;
  else articleContent += `<p${i === 1 ? ' class="intro"' : ""}>${rich(block)}</p>\n`;
});
sources.forEach((section) => { articleContent += renderSection(section); });

const faqBlocks = sources.find((s) => s.n === 14).blocks;
const faqItems = [];
for (let i = 1; i < faqBlocks.length; i += 2) {
  if (faqBlocks[i] === "Sonuç" || !faqBlocks[i + 1]) break;
  faqItems.push({
    "@type": "Question",
    name: faqBlocks[i],
    acceptedAnswer: { "@type": "Answer", text: faqBlocks[i + 1] }
  });
}

const allPlainText = [title, ...introBlocks, ...sources.flatMap((s) => s.blocks)].join(" ");
const wordCount = allPlainText.split(/\s+/).filter(Boolean).length;
const readingMinutes = Math.max(1, Math.ceil(wordCount / 220));
const toc = [
  { title: "Giriş", id: "giris" },
  ...mainSections
].map((item) => `<li><a href="#${item.id}">${rich(item.title)}</a></li>`).join("\n");

const template = fs.readFileSync(path.join(root, "bilgi-merkezi", "is-kiyafeti-secerken-nelere-dikkat-edilmeli", "index.html"), "utf8");
const header = template.match(/<header class="site-header">[\s\S]*?<\/header>/)[0];
const footer = template.match(/<footer class="site-footer">[\s\S]*?<\/footer>/)[0];
const json = (value) => JSON.stringify(value, null, 2).replace(/</g, "\\u003c");

const blogPosting = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: title,
  description,
  url: canonical,
  mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
  datePublished: published,
  dateModified: published,
  inLanguage: "tr-TR",
  author: { "@type": "Organization", name: "Kardeşler Tekstil", url: "https://kardeslertekstil.com.tr/" },
  publisher: {
    "@type": "Organization",
    name: "Kardeşler Tekstil",
    url: "https://kardeslertekstil.com.tr/",
    logo: { "@type": "ImageObject", url: "https://kardeslertekstil.com.tr/assets/logo-kit-badge.png" }
  }
};
const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://kardeslertekstil.com.tr/" },
    { "@type": "ListItem", position: 2, name: "Bilgi Merkezi", item: "https://kardeslertekstil.com.tr/bilgi-merkezi/" },
    { "@type": "ListItem", position: 3, name: title, item: canonical }
  ]
};
const faq = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqItems };

const html = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${esc(seoTitle)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="article">
  <meta property="og:locale" content="tr_TR">
  <meta property="og:site_name" content="Kardeşler Tekstil">
  <meta property="og:title" content="${esc(seoTitle)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="https://kardeslertekstil.com.tr/assets/logo-kit-badge.png">
  <meta property="article:published_time" content="${published}">
  <meta property="article:modified_time" content="${published}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(seoTitle)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="https://kardeslertekstil.com.tr/assets/logo-kit-badge.png">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" type="image/png" sizes="48x48" href="/icon-48.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/icon-32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/icon-16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/icon-180.png">
  <link rel="manifest" href="/site.webmanifest">
  <meta name="theme-color" content="#f97316">
  <link rel="stylesheet" href="../../styles.css">
  <script src="../knowledge-center.js" defer></script>
  <script type="application/ld+json">${json(blogPosting)}</script>
  <script type="application/ld+json">${json(breadcrumb)}</script>
  <script type="application/ld+json" id="faq-schema">${json(faq)}</script>
</head>
<body data-post-slug="${slug}">
  ${header}
  <div class="container knowledge-breadcrumb">
    <nav aria-label="Breadcrumb"><ol><li><a href="../../index.html">Ana Sayfa</a></li><li><a href="../">Bilgi Merkezi</a></li><li aria-current="page">${esc(title)}</li></ol></nav>
  </div>
  <main class="knowledge-article">
    <div class="container knowledge-article-layout">
      <article class="knowledge-article-main">
        <span class="category">İş Kıyafeti Rehberi</span>
        <h1>${esc(title)}</h1>
        <div class="knowledge-article-meta" role="group" aria-label="Yazı bilgileri">
          <span>${readingMinutes} dakika okuma</span>
          <span>Yazar: Kardeşler Tekstil</span>
          <span>Yayın: <time datetime="${published}">28 Temmuz 2026</time></span>
          <span>Son güncellenme: <time datetime="${published}">28 Temmuz 2026</time></span>
        </div>
        <nav class="knowledge-note" aria-labelledby="article-toc-title">
          <strong id="article-toc-title">İçindekiler</strong>
          <ol>${toc}</ol>
        </nav>
${articleContent}
        <section class="knowledge-cta">
          <h2>Firmanıza Özel İş Kıyafeti Teklifi Alın</h2>
          <p>Ürün modeli, kumaş, logo uygulaması ve sipariş adedinize uygun çözüm için bizimle iletişime geçin.</p>
          <a class="btn btn-accent" href="../../iletisim.html">Teklif Alın</a>
        </section>
        <a class="knowledge-back" href="../">← Bilgi Merkezi'ne Dön</a>
        <nav class="knowledge-post-nav knowledge-post-nav-single" aria-label="Yazılar arası geçiş">
          <a href="../is-kiyafeti-secerken-nelere-dikkat-edilmeli/"><span>Önceki Yazı</span><strong>İş Kıyafeti Seçerken Nelere Dikkat Edilmeli?</strong></a>
        </nav>
      </article>
      <aside class="knowledge-aside"><div class="eyebrow eyebrow-accent">Teklif Alın</div><h2>Firmanıza Özel Üretim</h2><p>İhtiyacınıza uygun model, kumaş ve logo uygulaması için bizimle iletişime geçin.</p><a class="btn btn-accent" href="../../iletisim.html">İletişime Geçin</a></aside>
    </div>
  </main>
  ${footer}
</body>
</html>
`;

const outDir = path.join(root, "bilgi-merkezi", slug);
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "index.html"), html, "utf8");
console.log(JSON.stringify({ wordCount, readingMinutes, faqCount: faqItems.length, tocCount: mainSections.length + 1, outDir }, null, 2));
