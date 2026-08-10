param([string]$SiteRoot)
$ErrorActionPreference = 'Stop'
$root = if ($SiteRoot) { (Resolve-Path $SiteRoot).Path } else { Split-Path $PSScriptRoot -Parent }
$path = Join-Path $root 'scrub-takimi\index.html'
$utf8 = [Text.UTF8Encoding]::new($false)
$html = [IO.File]::ReadAllText($path, [Text.Encoding]::UTF8)
$pattern = '<a href="\.\./urunlerimiz\?onluk=scrub#onluk"><img src="\.\./assets/products/gallery/onluk/kt-on-040-[^"]+".*?<span>KT-ON-040</span>.*?</a>'
$replacement = '<a href="../urunlerimiz?onluk=scrub#onluk"><img src="../assets/products/gallery/onluk/kt-on-040-beyaz-sol-gogus-cepli-scrub-takim.webp" alt="Beyaz sol g&#246;&#287;&#252;s cepli scrub tak&#305;m" width="1024" height="1024" loading="lazy"><span>KT-ON-040</span><h3>Beyaz Sol G&#246;&#287;&#252;s Cepli Scrub Tak&#305;m</h3><p>Yaln&#305;z sol g&#246;&#287;&#252;ste tek cepli d&#252;z beyaz model.</p></a>'
if (-not [regex]::IsMatch($html, $pattern)) { throw 'KT-ON-040 scrub card not found.' }
$html = [regex]::Replace($html, $pattern, $replacement, 1)
$html = [regex]::Replace($html, '"position":2,"name":"[^"]+"', '"position":2,"name":"Beyaz Sol G\u00f6\u011f\u00fcs Cepli Scrub Tak\u0131m"', 1)
$html = $html.Replace('"position":2,"name":"Beyaz Sol G\u00f6\u011f\u00fcs Cepli Scrub Tak\u0131m","item":"https://kardeslertekstil.com.tr/urunlerimiz"', '"position":2,"name":"\u00dcr\u00fcnlerimiz","item":"https://kardeslertekstil.com.tr/urunlerimiz"')
[IO.File]::WriteAllText($path, $html, $utf8)
'Updated KT-ON-040 scrub hub card.'
