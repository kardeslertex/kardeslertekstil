$ErrorActionPreference = 'Stop'

$siteRoot = Split-Path -Parent $PSScriptRoot
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$titles = [ordered]@{
  'bilgi-merkezi\polar-is-kiyafetlerinde-lif-dokulmesi-kontrolu\index.html' = 'Polar İş Kıyafetlerinde Lif Dökülmesi Kontrolü'
  'bilgi-merkezi\tamir-edilebilir-is-kiyafeti-tasarimi\index.html' = 'Tamir Edilebilir İş Kıyafeti Tasarımı'
  'bilgi-merkezi\vardiya-dolabi-is-kiyafeti-standardi\index.html' = 'Vardiya Dolabı İş Kıyafeti Standardı'
  'bilgi-merkezi\diz-takviyeli-is-pantolonu-cep-ve-kalip-rehberi\index.html' = 'Diz Takviyeli İş Pantolonu: Cep ve Kalıp Rehberi'
  'bilgi-merkezi\polar-mi-softshell-mi-hangi-kosulda\index.html' = 'Polar mı Softshell mi? Hangi Koşulda Hangisi Seçilir?'
  'bilgi-merkezi\sef-ceketi-ve-capraz-askili-onluk-seti\index.html' = 'Şef Ceketi ve Çapraz Askılı Önlük Seti Planlama'
  'bilgi-merkezi\urun-kodundan-teknik-sartnameye-katalog-yonetimi\index.html' = 'Ürün Kodundan Teknik Şartnameye Katalog Yönetimi'
  'urun\kt-pl-009-lacivert-polar-mont-kollari-ve-beden-reflektor-bantli-uc-cepli-fermuarlar-turuncu-reflektif\index.html' = 'Reflektör Bantlı Lacivert Polar Mont | KT-PL-009'
  'urun\kt-pt-025-lacivert-fosfor-panelli-dikey-reflektorlu-s-pantolonu\index.html' = 'Fosfor Panelli Reflektörlü İş Pantolonu | KT-PT-025'
  'urun\kt-ss-001-softshell-kaban-cift-renk-cikarilabilir-kapusonlu-uc-cepli\index.html' = 'Çıkarılabilir Kapüşonlu Softshell Kaban | KT-SS-001'
}

$changed = 0
foreach ($entry in $titles.GetEnumerator()) {
  $path = Join-Path $siteRoot $entry.Key
  $html = [IO.File]::ReadAllText($path, [Text.Encoding]::UTF8)
  if ($html -notmatch '(?is)<title>.*?</title>') { throw "Title not found: $($entry.Key)" }
  $encoded = [Net.WebUtility]::HtmlEncode($entry.Value)
  $next = [regex]::Replace($html, '(?is)<title>.*?</title>', "<title>$encoded</title>", 1)
  if ($next -ne $html) {
    [IO.File]::WriteAllText($path, $next, $utf8NoBom)
    $changed++
  }
}

Write-Output "Normalized title lengths: $changed"
