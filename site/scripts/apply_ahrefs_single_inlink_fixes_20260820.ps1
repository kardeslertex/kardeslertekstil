$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$utf8 = New-Object System.Text.UTF8Encoding($false)

$changes = @(
  @{ Path='pendik-is-elbiseleri/index.html'; Old='<a href="../anadolu-yakasi-is-elbiseleri/">'; New='<a href="../kaynarca-is-elbiseleri/">Kaynarca &#304;&#351; Elbiseleri</a><a href="../anadolu-yakasi-is-elbiseleri/">' },
  @{ Path='gebze-is-elbiseleri/index.html'; Old='<a href="../tuzla-is-elbiseleri/">'; New='<a href="../kocaeli-is-elbiseleri/">Kocaeli &#304;&#351; Elbiseleri</a><a href="../tuzla-is-elbiseleri/">' },
  @{ Path='gizlilik-ve-kvkk.html'; Old='<p><small>'; New='<p>Site depolama ve analiz tercihleri hakk&#305;nda ayr&#305;nt&#305;l&#305; bilgi i&#231;in <a href="/cerez-politikasi">&#199;erez Politikas&#305;''n&#305;</a> inceleyebilirsiniz.</p><p><small>' },
  @{ Path='cerez-politikasi.html'; Old='<p><small>'; New='<p>Ki&#351;isel verilerin i&#351;lenmesi ve ileti&#351;im talepleri hakk&#305;nda <a href="/gizlilik-ve-kvkk">Gizlilik ve Ki&#351;isel Veriler</a> sayfas&#305;n&#305; inceleyebilirsiniz.</p><p><small>' },
  @{ Path='bilgi-merkezi/antistatik-is-kiyafeti-rehberi-2026/index.html'; Old='<section class="knowledge-seo-links"'; New='<section><h2>ESD &#252;r&#252;n se&#231;enekleri</h2><p>Elektronik &#252;retim ve kontroll&#252; alanlar i&#231;in haz&#305;rlanan <a href="../../esd-urunler/">ESD k&#305;yafetleri ve antistatik i&#351; elbiseleri</a> koleksiyonunu inceleyebilirsiniz.</p></section><section class="knowledge-seo-links"' },
  @{ Path='urun/kt-ts-032-antrasit-turuncu-garnili-polo-yaka-s-tisortu/index.html'; Old='</ul></div></section><section class="local-section"><div class="container"><h2>Benzer '; New='</ul><p><a href="../../video/antrasit-turuncu-polo-yaka-is-tisortu/">KT-TS-032 &#252;r&#252;n videosunu izleyin</a> ve modelin renk, yaka ve cep ayr&#305;nt&#305;lar&#305;n&#305; yak&#305;ndan g&#246;r&#252;n.</p></div></section><section class="local-section"><div class="container"><h2>Benzer ' },
  @{ Path='urun/kt-mk-023-grafit-fosfor-panelli-kapusonlu-s-montu/index.html'; Old='</ul></div></section><section class="local-section"><div class="container"><h2>Benzer '; New='</ul><p><a href="../../video/grafit-fosfor-panelli-is-montu/">Grafit fosfor panelli i&#351; montu videosunu izleyin</a> ve modelin g&#246;r&#252;n&#252;rl&#252;k ile kap&#252;&#351;on ayr&#305;nt&#305;lar&#305;n&#305; yak&#305;ndan g&#246;r&#252;n.</p></div></section><section class="local-section"><div class="container"><h2>Benzer ' }
)

foreach ($change in $changes) {
  $file = Join-Path $root $change.Path
  $html = [IO.File]::ReadAllText($file, [Text.Encoding]::UTF8)
  $count = ([regex]::Matches($html, [regex]::Escape($change.Old))).Count
  if ($count -ne 1) { throw "Expected one anchor in $($change.Path), found $count" }
  [IO.File]::WriteAllText($file, $html.Replace($change.Old, $change.New), $utf8)
}

Write-Host "Added contextual inlinks for 7 Ahrefs targets."
