const fs = require('fs');
const path = require('path');

const ROOT = path.resolve('site');
const baseUrl = 'https://kardeslertekstil.com.tr';

function walk(dir){
  const out=[];
  for(const e of fs.readdirSync(dir,{withFileTypes:true})){
    const p=path.join(dir,e.name);
    if(e.isDirectory()) out.push(...walk(p));
    else if(e.isFile() && e.name.toLowerCase().endsWith('.html')) out.push(p);
  }
  return out;
}

function rel(p){ return path.relative(ROOT,p).replace(/\\/g,'/'); }

const files=walk(ROOT);
const existingHtml = new Set(files.map(f=>rel(f)));
const byUrlPath = new Set();
for(const f of files){
  const r=rel(f);
  if(r==='index.html') byUrlPath.add('/');
  else if(r.endsWith('/index.html')) byUrlPath.add('/'+r.slice(0,-'index.html'.length));
  else byUrlPath.add('/'+r.replace(/\.html$/i,''));
}

const findings=[];
const pageRows=[];
const brokenLinks=[];
const imgIssues=[];

for(const f of files){
  const html=fs.readFileSync(f,'utf8');
  const r=rel(f);

  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].replace(/\s+/g,' ').trim() : '';
  const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i);
  const desc = descMatch ? descMatch[1].trim() : '';
  const canonMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i);
  const canonical = canonMatch ? canonMatch[1].trim() : '';
  const robotsMeta = (html.match(/<meta[^>]+name=["']robots["'][^>]*content=["']([^"']+)["'][^>]*>/i)||[])[1] || '';

  const h1Matches = [...html.matchAll(/<h1\b[^>]*>/gi)];
  const h2Matches = [...html.matchAll(/<h2\b[^>]*>/gi)];
  const h3Matches = [...html.matchAll(/<h3\b[^>]*>/gi)];

  pageRows.push({file:r,titleLen:title.length,descLen:desc.length,hasTitle:!!title,hasDesc:!!desc,canonical,robotsMeta,h1Count:h1Matches.length,h2Count:h2Matches.length,h3Count:h3Matches.length});

  if(!title) findings.push({severity:'high',type:'missing_title',file:r});
  if(!desc) findings.push({severity:'high',type:'missing_description',file:r});
  if(title && (title.length<30 || title.length>65)) findings.push({severity:'medium',type:'title_length',file:r,value:title.length});
  if(desc && (desc.length<70 || desc.length>170)) findings.push({severity:'medium',type:'desc_length',file:r,value:desc.length});
  if(h1Matches.length===0) findings.push({severity:'high',type:'missing_h1',file:r});
  if(h1Matches.length>1) findings.push({severity:'high',type:'multiple_h1',file:r,value:h1Matches.length});
  if(!canonical) findings.push({severity:'high',type:'missing_canonical',file:r});
  if(canonical && !canonical.startsWith(baseUrl)) findings.push({severity:'high',type:'canonical_offdomain_or_relative',file:r,value:canonical});
  if(/noindex/i.test(robotsMeta)) findings.push({severity:'critical',type:'noindex_meta',file:r,value:robotsMeta});

  // internal links + assets
  for(const m of html.matchAll(/<(a|img|script|link)\b[^>]+?(href|src)=["']([^"'#]+)(#[^"']*)?["'][^>]*>/gi)){
    const tag=m[1].toLowerCase();
    const attr=m[2].toLowerCase();
    const raw=m[3];
    if(!raw) continue;
    if(/^(mailto:|tel:|https?:\/\/|data:|javascript:)/i.test(raw)) continue;

    let target=raw;
    if(target.startsWith('/')){
      target = target.slice(1);
    }else{
      const baseDir = path.posix.dirname(r);
      target = path.posix.normalize(path.posix.join(baseDir,target));
    }

    // remove query
    target = target.split('?')[0];

    if(attr==='href' && tag==='a'){
      let ok=false;
      if(target.endsWith('/')){
        ok = existingHtml.has(path.posix.join(target,'index.html')) || existingHtml.has(target+'index.html');
      } else if(target.toLowerCase().endsWith('.html')){
        ok = existingHtml.has(target);
      } else {
        ok = existingHtml.has(target+'.html') || existingHtml.has(path.posix.join(target,'index.html')) || byUrlPath.has('/'+target.replace(/^\/+/,'')) || (target==='' && existingHtml.has('index.html'));
      }
      if(!ok){
        brokenLinks.push({file:r,tag:'a',attr,target:raw,resolved:target});
      }
    }

    if((tag==='img' || tag==='script' || (tag==='link'&&attr==='href'))){
      const ext = path.posix.extname(target).toLowerCase();
      if(ext){
        if(!fs.existsSync(path.join(ROOT,target))){
          brokenLinks.push({file:r,tag,attr,target:raw,resolved:target});
        }
      }
    }
  }

  for(const m of html.matchAll(/<img\b([^>]*?)>/gi)){
    const attrs=m[1];
    const alt=/(^|\s)alt=["']([^"']*)["']/i.exec(attrs);
    const width=/(^|\s)width=["']?\d+["']?/i.test(attrs);
    const height=/(^|\s)height=["']?\d+["']?/i.test(attrs);
    const lazy=/(^|\s)loading=["']lazy["']/i.test(attrs);
    const src=/(^|\s)src=["']([^"']+)["']/i.exec(attrs);
    const srcVal=src?src[2]:'';
    if(!alt || !alt[2].trim()) imgIssues.push({file:r,type:'missing_alt',src:srcVal});
    if(alt && /modeli\s*\d+|model\s*\d+/i.test(alt[2])) imgIssues.push({file:r,type:'generic_alt',src:srcVal,alt:alt[2]});
    if(!width || !height) imgIssues.push({file:r,type:'missing_wh',src:srcVal});
    if(!lazy && !/logo|brand|hero/i.test(srcVal)) imgIssues.push({file:r,type:'not_lazy',src:srcVal});
  }
}

// duplicates
const titleMap=new Map();
const descMap=new Map();
for(const p of pageRows){
  if(p.hasTitle){
    const t = p.file.startsWith('bilgi-merkezi/') ? '' : p.file;
    if(!titleMap.has(p.file.startsWith('bilgi-merkezi/') ? p.file : p.file));
  }
}
for(const p of pageRows){
  if(p.hasTitle){
    const key=p.file.startsWith('bilgi-merkezi/')?null:p.file;
  }
}
for(const p of pageRows){
  if(p.hasTitle){
    const key=p.titleLen+':'+p.file; // placeholder
  }
}
const titleByText=new Map();
const descByText=new Map();
for(const f of files){
  const html=fs.readFileSync(f,'utf8');
  const r=rel(f);
  const t=(html.match(/<title>([\s\S]*?)<\/title>/i)||[])[1];
  const d=(html.match(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i)||[])[1];
  if(t){ const k=t.replace(/\s+/g,' ').trim(); if(!titleByText.has(k)) titleByText.set(k,[]); titleByText.get(k).push(r); }
  if(d){ const k=d.trim(); if(!descByText.has(k)) descByText.set(k,[]); descByText.get(k).push(r); }
}
const duplicateTitles=[...titleByText.entries()].filter(([k,v])=>v.length>1).map(([k,v])=>({text:k,count:v.length,files:v}));
const duplicateDescs=[...descByText.entries()].filter(([k,v])=>v.length>1).map(([k,v])=>({text:k,count:v.length,files:v}));

const out={
  checkedHtml: files.length,
  findings,
  pages: pageRows,
  brokenLinks,
  imgIssues,
  duplicateTitles,
  duplicateDescs
};

fs.writeFileSync(path.resolve('output/seo-audit-pages.json'), JSON.stringify(out,null,2), 'utf8');
console.log('Wrote output/seo-audit-pages.json');
console.log('HTML checked:', files.length);
console.log('Broken links:', brokenLinks.length);
console.log('Image issues:', imgIssues.length);
console.log('Duplicate titles:', duplicateTitles.length);
console.log('Duplicate descriptions:', duplicateDescs.length);
