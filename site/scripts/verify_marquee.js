const fs = require('fs');
const path = require('path');

const refsPath = path.join(__dirname, '..', 'referanslarimiz.html');
const indexPath = path.join(__dirname, '..', 'index.html');
const cssPath = path.join(__dirname, '..', 'styles.css');

function read(file){ return fs.existsSync(file) ? fs.readFileSync(file,'utf8') : ''; }
const refs = read(refsPath);
const indexHtml = read(indexPath);
const css = read(cssPath);

const imgRe = /<a class=["'][^"']*\bref-logo\b[^"']*["'][^>]*>\s*<img[^>]+src=["']([^"']+)["'][^>]*>/ig;
let m; const srcs = [];
while((m = imgRe.exec(refs))){ srcs.push(m[1]); }
const unique = Array.from(new Set(srcs));
console.log('Found logos in referanslarimiz.html:', srcs.length);
console.log('Unique logos count:', unique.length);
const missing = unique.filter(src => !fs.existsSync(path.join(__dirname, '..', src)));
console.log('Missing logo files:', missing.length);

// Check index contains marquee markup
const hasMarquee = /class="logo-marquee"/.test(indexHtml);
const hasTrack = /class="logo-track"/.test(indexHtml);
console.log('index.html contains marquee:', !!hasMarquee, 'track:', !!hasTrack);

// Check CSS has logo-inner and marquee-duration
const hasInner = /\.logo-inner/.test(css);
const hasVar = /--marquee-duration/.test(css);
console.log('styles.css contains .logo-inner:', !!hasInner, 'and --marquee-duration:', !!hasVar);
const hasPause = /\.logo-marquee\.is-paused\s+\.logo-inner\s*\{\s*animation-play-state\s*:\s*paused/.test(css);
const hasReducedMotion = /prefers-reduced-motion:\s*reduce/.test(css);
const hasDirectAnimation = /\.logo-marquee\s+\.logo-inner\s*\{[^}]*animation\s*:\s*marquee-left/s.test(css);
const hasPermanentReducedMotionPause = /matchMedia\(['"]\(prefers-reduced-motion:\s*reduce\)['"]\)\.matches[\s\S]{0,160}classList\.add\(['"]is-paused['"]\)/.test(indexHtml);
const hasContain = /\.logo-item img[^}]*object-fit\s*:\s*contain/s.test(css);
const usesSharedSource = /fetch\(REFS_PAGE\)/.test(indexHtml) && /querySelectorAll\('\.ref-logo img'\)/.test(indexHtml);
console.log('direct animation:', hasDirectAnimation, 'pause:', hasPause, 'reduced motion:', hasReducedMotion, 'permanent reduced-motion pause:', hasPermanentReducedMotionPause, 'object-fit contain:', hasContain, 'shared source:', usesSharedSource);

// Sanity: if unique logos > 0, expected behavior is to duplicate in DOM at runtime
if(unique.length === 0 || missing.length || !hasMarquee || !hasTrack || !hasInner || !hasVar || !hasDirectAnimation || !hasPause || !hasReducedMotion || hasPermanentReducedMotionPause || !hasContain || !usesSharedSource){
  console.log('ERROR: marquee verification failed');
  process.exit(2);
}

// quick list sample
console.log('\nSample logos (first 30):');
unique.slice(0,30).forEach(u => console.log(u));

process.exit(0);
