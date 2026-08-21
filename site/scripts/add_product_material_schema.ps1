$ErrorActionPreference = 'Stop'

$siteRoot = Split-Path $PSScriptRoot -Parent
$productRoot = Join-Path $siteRoot 'urun'
$utf8 = [Text.UTF8Encoding]::new($false)
$updated = 0
function U([string]$value) { return [regex]::Unescape($value) }

foreach ($file in Get-ChildItem -LiteralPath $productRoot -Recurse -File -Filter 'index.html') {
    $html = [IO.File]::ReadAllText($file.FullName, [Text.Encoding]::UTF8)
    $productMatch = [regex]::Match(
        $html,
        '<script(?<attrs>[^>]*)type=["'']application/ld\+json["''](?<after>[^>]*)>(?<json>.*?)</script>',
        'IgnoreCase,Singleline'
    )
    if (!$productMatch.Success) { throw "Product schema not found: $($file.FullName)" }

    $productSchema = $null
    foreach ($match in [regex]::Matches($html, '<script(?<attrs>[^>]*)type=["'']application/ld\+json["''](?<after>[^>]*)>(?<json>.*?)</script>', 'IgnoreCase,Singleline')) {
        try { $candidate = $match.Groups['json'].Value | ConvertFrom-Json } catch { continue }
        if ($candidate.'@type' -eq 'Product') { $productSchema = $candidate; break }
    }
    if (!$productSchema) { throw "Valid Product schema not found: $($file.FullName)" }

    $sku = [string]$productSchema.sku
    $name = [Net.WebUtility]::HtmlDecode([string]$productSchema.name)
    $normalizedName = $name.ToLowerInvariant()
    $material = switch -Regex ($sku) {
        '^KT-TS-' {
            if ($normalizedName -match 'polo') { U 'lakost \u00f6rme kuma\u015f' } else { U 'penye \u00f6rme kuma\u015f' }
            break
        }
        '^KT-SW-' { U 'iki veya \u00fc\u00e7 iplik sweatshirt kuma\u015f\u0131'; break }
        '^KT-PL-' { U 'polar kuma\u015f'; break }
        '^KT-SS-' { U 'lamineli softshell kuma\u015f'; break }
        '^KT-PT-' { U 'i\u015f giysilik dokuma kuma\u015f'; break }
        '^KT-TL-' { U 'i\u015f giysilik dokuma kuma\u015f'; break }
        '^KT-ON-' {
            if ($normalizedName -match 'denim') { U 'denim dokuma kuma\u015f' } else { U '\u00f6nl\u00fck ve a\u015f\u00e7\u0131 giyimine uygun dokuma kuma\u015f' }
            break
        }
        '^KT-MK-' { U 'montluk d\u0131\u015f kuma\u015f, astar ve \u0131s\u0131 yal\u0131t\u0131m dolgusu'; break }
        '^KT-YL-' {
            if ($normalizedName -match 'polar') { U 'polar kuma\u015f' }
            elseif ($normalizedName -match 'softshell') { U 'lamineli softshell kuma\u015f' }
            elseif ($normalizedName -match 'dolgulu|kapitone' -or $file.FullName -match 'kislik') { U 'd\u0131\u015f kuma\u015f ve \u0131s\u0131 yal\u0131t\u0131m dolgusu' }
            else { U 'i\u015f giysilik dokuma kuma\u015f' }
            break
        }
        default { throw "No material rule for product $sku in $($file.FullName)" }
    }

    $next = [regex]::Replace($html, '<script(?<attrs>[^>]*)type=["'']application/ld\+json["''](?<after>[^>]*)>(?<json>.*?)</script>', {
        param($match)
        try { $schema = $match.Groups['json'].Value | ConvertFrom-Json } catch { return $match.Value }
        if ($schema.'@type' -ne 'Product') { return $match.Value }

        $schema | Add-Member -NotePropertyName 'material' -NotePropertyValue $material -Force
        $json = $schema | ConvertTo-Json -Depth 20 -Compress
        return '<script type="application/ld+json">' + $json + '</script>'
    }, 'IgnoreCase,Singleline')

    if ($next -ne $html) {
        [IO.File]::WriteAllText($file.FullName, $next, $utf8)
        $updated++
    }
}

"Added category-appropriate material data to $updated product schemas."
