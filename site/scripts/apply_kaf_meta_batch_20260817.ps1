$ErrorActionPreference = 'Stop'
$siteRoot = Split-Path -Parent $PSScriptRoot
$utf8 = [Text.UTF8Encoding]::new($false)

$updates = @(
    @{
        Path = 'urun/kt-on-019-antrasit-kruvaze-sef-ceketi/index.html'
        Title = 'Antrasit Kruvaze Şef Ceketi KT-ON-019 | Kardeşler Tekstil'
    },
    @{
        Path = 'bilgi-merkezi/cam-seramik-sektoru-is-kiyafetleri/index.html'
        Title = 'Cam ve Seramik Sektörü İş Kıyafetleri | Kardeşler Tekstil'
    },
    @{
        Path = 'bilgi-merkezi/polar-is-kiyafetlerinde-lif-dokulmesi-kontrolu/index.html'
        Title = 'Polar İş Kıyafetlerinde Lif Dökülmesi | Kardeşler Tekstil'
    },
    @{
        Path = 'bilgi-merkezi/is-kiyafeti-sezon-oncesi-hazirlik-kontrolu/index.html'
        Title = 'İş Kıyafeti Sezon Öncesi Hazırlık | Kardeşler Tekstil'
        Description = 'Yazlık veya kışlık sezon öncesinde stok, beden dağılımı, logo malzemesi ve acil sipariş kontrollerini planlı biçimde tamamlayın.'
    },
    @{
        Path = 'bilgi-merkezi/is-pantolonunda-formlu-diz-kalibi/index.html'
        Title = 'İş Pantolonunda Formlu Diz Kalıbı | Kardeşler Tekstil'
        Description = 'İş pantolonunda formlu diz kalıbının avantajlarını keşfedin. Pens, dikiş ve hareket kabiliyeti üzerine teknik detayları inceleyin.'
    },
    @{
        Path = 'bilgi-merkezi/tedarikci-performans-puan-karti-kalite-termin-maliyet/index.html'
        Title = 'Tedarikçi Puan Kartı Oluşturma Rehberi | Kardeşler Tekstil'
        Description = 'İş kıyafeti tedarikçi performansını kalite, teslimat ve maliyet kriterleriyle ölçün. Veriye dayalı değerlendirme yöntemlerini inceleyin.'
    },
    @{
        Path = 'urun/kt-pl-029-lacivert-bordo-takviyeli-polar-mont/index.html'
        Title = 'Lacivert Bordo Polar Mont KT-PL-029 | Kardeşler Tekstil'
    },
    @{
        Path = 'bilgi-merkezi/is-kiyafeti-bom-malzeme-listesi/index.html'
        Title = 'İş Kıyafeti BOM Malzeme Listesi Rehberi | Kardeşler Tekstil'
    },
    @{
        Path = 'bilgi-merkezi/veteriner-klinigi-personel-kiyafetleri/index.html'
        Title = 'Veteriner Kliniği Personel Kıyafetleri | Kardeşler Tekstil'
    },
    @{
        Path = 'bilgi-merkezi/is-kiyafeti-uretim-sureci/index.html'
        Title = 'İş Kıyafeti Üretim Süreci Rehberi | Kardeşler Tekstil'
        Description = 'Profesyonel iş kıyafeti üretim aşamalarını keşfedin. Kumaş seçiminden teslimata kadar tüm süreci ayrıntılı olarak inceleyin.'
    },
    @{
        Path = 'bilgi-merkezi/is-kiyafeti-uretiminde-kumas-kesim-sureci/index.html'
        Title = 'İş Kıyafeti Kumaş Kesim Süreci | Kardeşler Tekstil'
    },
    @{
        Path = 'bilgi-merkezi/is-kiyafeti-rol-bazli-urun-seti-mimarisi/index.html'
        Title = 'İş Kıyafeti Rol Bazlı Ürün Seti | Kardeşler Tekstil'
    },
    @{
        Path = 'bilgi-merkezi/yuksek-gorunurluklu-is-kiyafetleri-siniflari/index.html'
        Title = 'EN ISO 20471 İş Kıyafeti Sınıfları | Kardeşler Tekstil'
    }
)

function Set-TagText([string]$html, [string]$tag, [string]$value) {
    $pattern = '(?is)(<' + [regex]::Escape($tag) + '>).*?(</' + [regex]::Escape($tag) + '>)'
    $matches = [regex]::Matches($html, $pattern)
    if ($matches.Count -ne 1) { throw "Expected one <$tag> element, found $($matches.Count)." }
    return [regex]::Replace($html, $pattern, { param($match) $match.Groups[1].Value + $value + $match.Groups[2].Value }, 1)
}

function Set-MetaContent([string]$html, [string]$attribute, [string]$key, [string]$value) {
    $pattern = '(?is)<meta\b[^>]*\b' + [regex]::Escape($attribute) + '="' + [regex]::Escape($key) + '"[^>]*>'
    $matches = [regex]::Matches($html, $pattern)
    if ($matches.Count -ne 1) { throw "Expected one meta $attribute=$key element, found $($matches.Count)." }
    return [regex]::Replace($html, $pattern, {
        param($match)
        $tag = $match.Value
        if ($tag -notmatch '\bcontent="[^"]*"') { throw "Meta $attribute=$key has no content attribute." }
        return [regex]::Replace($tag, '\bcontent="[^"]*"', { param($contentMatch) 'content="' + $value + '"' }, 1)
    }, 1)
}

foreach ($update in $updates) {
    $file = Join-Path $siteRoot $update.Path
    if (!(Test-Path -LiteralPath $file)) { throw "Missing file: $($update.Path)" }
    $html = [IO.File]::ReadAllText($file, [Text.Encoding]::UTF8)

    $html = Set-TagText $html 'title' $update.Title
    $html = Set-MetaContent $html 'property' 'og:title' $update.Title
    $html = Set-MetaContent $html 'name' 'twitter:title' $update.Title

    if ($update.Description) {
        $html = Set-MetaContent $html 'name' 'description' $update.Description
        $html = Set-MetaContent $html 'property' 'og:description' $update.Description
        $html = Set-MetaContent $html 'name' 'twitter:description' $update.Description
    }

    [IO.File]::WriteAllText($file, $html, $utf8)
    Write-Output $update.Path
}
