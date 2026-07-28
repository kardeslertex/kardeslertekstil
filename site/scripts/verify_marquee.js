const fs = require('fs');
const path = require('path');

const refsPath = path.join(__dirname, '..', 'referanslarimiz.html');
const indexPath = path.join(__dirname, '..', 'index.html');
const cssPath = path.join(__dirname, '..', 'styles.css');

function read(file){ return fs.existsSync(file) ? fs.readFileSync(file,'utf8') : ''; }
const refs = read(refsPath);
const indexHtml = read(indexPath);
const css = read(cssPath);

const imgRe = /<img[^>]+src=["']([^"']+)["'][^>]*>/ig;
let m; const srcs = [];
while((m = imgRe.exec(refs))){ srcs.push(m[1]); }
const unique = Array.from(new Set(srcs));
console.log('Found logos in referanslarimiz.html:', srcs.length);
console.log('Unique logos count:', unique.length);

// Check index contains marquee markup
const hasMarquee = /class="logo-marquee"/.test(indexHtml);
const hasTrack = /class="logo-track"/.test(indexHtml);
console.log('index.html contains marquee:', !!hasMarquee, 'track:', !!hasTrack);

// Check CSS has logo-inner and marquee-duration
const hasInner = /\.logo-inner/.test(css);
const hasVar = /--marquee-duration/.test(css);
console.log('styles.css contains .logo-inner:', !!hasInner, 'and --marquee-duration:', !!hasVar);

// Sanity: if unique logos > 0, expected behavior is to duplicate in DOM at runtime
if(unique.length === 0){ console.log('WARNING: no logos found in referanslarimiz.html'); process.exit(2); }

// quick list sample
console.log('\nSample logos (first 30):');
unique.slice(0,30).forEach(u => console.log(u));

process.exit(0);
