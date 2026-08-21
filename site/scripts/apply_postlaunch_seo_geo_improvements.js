const fs = require('fs');
const path = require('path');
const root = process.env.SEO_SITE_ROOT ? path.resolve(process.env.SEO_SITE_ROOT) : path.resolve(__dirname, '..');
const origin = 'https://kardeslertekstil.com.tr';
const today = '2026-08-21';
const generic = new Set([`${origin}/assets/logo-kit-badge.webp`, `${origin}/assets/products/gallery/tshirt/siyah-polo-yaka-tisort.webp`]);
const counts = { socialImages: 0, sources: 0, contextualLinks: 0, modifiedDates: 0, longTitles: 0, shortDescriptions: 0, sameAs: 0 };
const changedUrls = new Set();

function walk(dir, out = []) { for (const e of fs.readdirSync(dir, { withFileTypes: true })) { if (['.git','node_modules','hero-archive'].includes(e.name)) continue; const p = path.join(dir,e.name); if (e.isDirectory()) walk(p,out); else if (e.name.endsWith('.html')) out.push(p); } return out; }
function strip(s) { return decodeEntities(s.replace(/<script\b[\s\S]*?<\/script>/gi,' ').replace(/<style\b[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ')).replace(/\s+/g,' ').trim(); }
function truncate(s,max) { if ([...s].length<=max) return s; const c=[...s].slice(0,max+1).join(''); return c.slice(0,Math.max(c.lastIndexOf(' '),max-12)).replace(/[\s,:;??-]+$/u,'').trim(); }
function decodeEntities(v) { return v.replace(/&#x([0-9a-f]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16))).replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n))).replace(/&amp;/gi,'&').replace(/&quot;/gi,'"').replace(/&apos;|&#39;/gi,"'").replace(/&nbsp;/gi,' '); }
function getMeta(h,k,prop=false) { const a=prop?'property':'name'; const v=h.match(new RegExp(`<meta\\s+${a}=["']${k.replace(':','\\:')}["']\\s+content=(["'])(.*?)\\1`,'i'))?.[2]||''; return decodeEntities(v); }
function attr(v) { return v.replace(/&(?!(?:[a-z]+|#\d+|#x[0-9a-f]+);)/gi,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }
function setMeta(h,k,v,prop=false) { const a=prop?'property':'name'; return h.replace(new RegExp(`(<meta\\s+${a}=["']${k.replace(':','\\:')}["']\\s+content=)(["'])(.*?)\\2`,'i'),(_,start,quote)=>`${start}${quote}${attr(v)}${quote}`); }
function schemas(h, type, fn) { return h.replace(/<script([^>]*)type=["']application\/ld\+json["']([^>]*)>([\s\S]*?)<\/script>/gi,(all,a,b,j)=>{ let d; try{d=JSON.parse(j)}catch{return all} const ts=Array.isArray(d['@type'])?d['@type']:[d['@type']]; if(!ts.includes(type)) return all; if(fn(d)===false)return all; return `<script${a}type="application/ld+json"${b}>${JSON.stringify(d)}</script>`; }); }
function productImage(h,canonical) { const href=h.match(/<a\b[^>]*data-link-role=["']product["'][^>]*href=["']([^"']+)/i)?.[1]; if(!href)return ''; let u;try{u=new URL(href,canonical)}catch{return ''} const f=path.join(root,decodeURIComponent(u.pathname).replace(/^\//,'').replace(/\/$/,''),'index.html'); return fs.existsSync(f)?getMeta(fs.readFileSync(f,'utf8'),'og:image',true):''; }
function sources(slug) {
  if(/gots/i.test(slug)) return [['GOTS resm? standard?','https://global-standards.org/our-standards/gots']];
  if(/grs|geri-donus|recycled|sertifika/i.test(slug)) return [['Textile Exchange standartlar?','https://textileexchange.org/standards/']];
  if(/esd|antistatik|elektronik/i.test(slug)) return [['IEC 61340-5-1 standard?','https://webstore.iec.ch/en/publication/74748']];
  if(/en-|iso-|standart|koruyucu|guvenlik|reflektor|kimya|alev|yanmaz|kaynakci|ppe|kisisel-koruyucu/i.test(slug)) return [['AB Ki?isel Koruyucu Donan?m T?z???','https://eur-lex.europa.eu/eli/reg/2016/425/oj'],['ISO 13688 koruyucu giysi standard?','https://www.iso.org/standard/51449.html']];
  if(/kumas|tekstil|test|haslik|cekme|gramaj|dokuma|orme/i.test(slug)) return [['ISO/TC 38 tekstil standartlar?','https://www.iso.org/committee/48148.html']];
  return [];
}
function addSources(h,list) { if(!list.length||/data-primary-sources=/i.test(h))return [h,false]; const links=list.map(([n,u])=>`<li><a href="${u}" target="_blank" rel="noopener noreferrer">${n}</a></li>`).join(''); const block=`<section class="knowledge-primary-sources" data-primary-sources="official-v1" aria-label="Birincil kaynaklar"><h2>Birincil kaynaklar</h2><p>Teknik kapsam? do?rulamak i?in a?a??daki resm? yay?nlar esas al?nabilir. ?r?ne veya firmaya ?zel uygunluk; belge, risk de?erlendirmesi ve gerekti?inde test sonucu ?zerinden ayr?ca do?rulanmal?d?r.</p><ul>${links}</ul></section>\n    `; const n=h.replace(/(<section class="knowledge-seo-links")/i,`${block}$1`); return [n,n!==h]; }
function addContext(h,slug) { if(/data-contextual-category/i.test(h))return [h,false]; let href='../../urunlerimiz/',label='i? k?yafeti modelleri'; for(const [re,u,l] of [[/pantolon/i,'../../urunlerimiz/#kategori?kategori=pantolon','i? pantolonu modelleri'],[/yelek/i,'../../urunlerimiz/#kategori?kategori=yelek','i? yele?i modelleri'],[/mont|softshell/i,'../../urunlerimiz/#kategori?kategori=mont','i? montu modelleri'],[/tisort|polo/i,'../../urunlerimiz/#kategori?kategori=tisort','i? ti??rt? modelleri'],[/polar/i,'../../urunlerimiz/#kategori?kategori=polar','i? polar modelleri']]) if(re.test(slug)){href=u;label=l;break} const block=`<p data-contextual-support="catalog-v1">Bu konudaki teknik ?l??tler, kullan?m ko?uluna uygun <a data-contextual-category href="${href}">${label}</a> ile birlikte de?erlendirilmelidir.</p>\n      `; const n=h.replace(/(<section class="knowledge-seo-links")/i,`${block}$1`); return [n,n!==h]; }
function markModified(h) { h=setMeta(h,'article:modified_time',today,true); h=h.replace(/(<span>Son g?ncellenme:\s*<time datetime=")[^"]+("[^>]*>)[^<]+/i,(_,a,b)=>`${a}${today}${b}21 A?ustos 2026`); return schemas(h,'BlogPosting',d=>{d.dateModified=today}); }

for(const file of walk(root)) {
  let h=fs.readFileSync(file,'utf8'), original=h;
  const noindex=/<meta\s+name=["']robots["'][^>]*noindex/i.test(h);
  const canonical=h.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)/i)?.[1]||`${origin}/`;
  const blog=/["']@type["']\s*:\s*["']BlogPosting["']/i.test(h);
  let contentChanged=false;
  h=schemas(h,'Organization',d=>{if(!Array.isArray(d.sameAs)||!d.sameAs.includes('https://share.google/xZnkpfC0XkeTzcU7Q'))return false;d.sameAs=d.sameAs.map(u=>u==='https://share.google/xZnkpfC0XkeTzcU7Q'?'https://www.google.com/search?kgmid=/g/1tf8j9_f':u);counts.sameAs++});
  if(!noindex){
    const title=h.match(/<title>([^<]*)<\/title>/i)?.[1]||'';
    if([...title].length>65){const suffix=' | Karde?ler Tekstil',base=title.endsWith(suffix)?title.slice(0,-suffix.length):title,next=truncate(base,60);h=h.replace(/(<title>)[^<]*(<\/title>)/i,`$1${attr(next)}$2`);h=setMeta(h,'og:title',next,true);h=setMeta(h,'twitter:title',next);counts.longTitles++;}
    const desc=getMeta(h,'description');
    if([...desc].length<120){const lead=strip(h.match(/<main\b[\s\S]*?<p\b[^>]*>([\s\S]*?)<\/p>/i)?.[1]||'');let next=lead.length>=120?lead:`${desc} Karde?ler Tekstil'in ?retim yakla??m?n?, model se?eneklerini ve kurumsal sipari? ayr?nt?lar?n? inceleyin.`;next=truncate(next.replace(/\s+/g,' ').trim(),155);if([...next].length<120)next=truncate(`${next} Uygun modelleri ve kurumsal sipari? se?eneklerini inceleyin.`,165);h=setMeta(h,'description',next);h=setMeta(h,'og:description',next,true);h=setMeta(h,'twitter:description',next);if(blog)h=schemas(h,'BlogPosting',d=>{d.description=next});counts.shortDescriptions++;}
  }
  if(blog){
    const current=getMeta(h,'og:image',true),next=generic.has(current)?productImage(h,canonical):'';if(next&&!generic.has(next)){h=setMeta(h,'og:image',next,true);h=setMeta(h,'twitter:image',next);h=schemas(h,'BlogPosting',d=>{d.image=[next]});counts.socialImages++;}
    const slug=path.basename(path.dirname(file));let c;[h,c]=addSources(h,sources(slug));if(c){counts.sources++;contentChanged=true}[h,c]=addContext(h,slug);if(c){counts.contextualLinks++;contentChanged=true}if(contentChanged){h=markModified(h);counts.modifiedDates++;changedUrls.add(canonical)}
  }
  h=h.replace(/href="\.\.\/\?tag=(Nak%C4%B1%C5%9F%20m%C4%B1%20Bask%C4%B1%20m%C4%B1|%C4%B0%C5%9F%20G%C3%BCvenli%C4%9Fi)"/g,'href="../#filtre?tag=$1"');
  if(h!==original)fs.writeFileSync(file,h,'utf8');
}
let sitemap=fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');for(const url of changedUrls){const e=url.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');sitemap=sitemap.replace(new RegExp(`(<loc>${e}<\\/loc>[\\s\\S]*?<lastmod>)[^<]+`,'i'),`$1${today}`)}fs.writeFileSync(path.join(root,'sitemap.xml'),sitemap,'utf8');
console.log(JSON.stringify(counts,null,2));
