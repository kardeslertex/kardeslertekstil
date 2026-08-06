$ErrorActionPreference = 'Stop'
$siteRoot = Split-Path $PSScriptRoot -Parent
$utf8 = [Text.UTF8Encoding]::new($false)
$organizationId = 'https://kardeslertekstil.com.tr/#organization'
$changed = 0

function Compact-Json($value) { $value | ConvertTo-Json -Compress -Depth 20 }
function Plain-Text([string]$value) {
    return ([Net.WebUtility]::HtmlDecode(([regex]::Replace($value, '<[^>]+>', ' '))) -replace '\s+', ' ').Trim()
}

$files = Get-ChildItem -LiteralPath $siteRoot -Filter '*.html' -File -Recurse | Where-Object {
    $_.FullName -notlike "$(Join-Path $siteRoot 'hero-archive')*"
}

foreach ($file in $files) {
    $html = [IO.File]::ReadAllText($file.FullName, [Text.Encoding]::UTF8)
    $original = $html
    $canonicalMatch = [regex]::Match($html, '<link[^>]+rel=["'']canonical["''][^>]+href=["'']([^"'']+)', 'IgnoreCase')
    $canonical = if ($canonicalMatch.Success) { [Net.WebUtility]::HtmlDecode($canonicalMatch.Groups[1].Value) } else { '' }

    $html = [regex]::Replace($html, '<script(?<attrs>[^>]*)type=["'']application/ld\+json["''](?<after>[^>]*)>(?<json>.*?)</script>', {
        param($match)
        try { $schema = $match.Groups['json'].Value | ConvertFrom-Json } catch { return $match.Value }
        if ($schema.'@type' -eq 'LocalBusiness') {
            if ($file.Name -eq 'index.html' -and $file.DirectoryName -eq $siteRoot) { return '' }
            $area = $schema.areaServed
            $heading = [regex]::Match($original, '<h1[^>]*>(.*?)</h1>', 'IgnoreCase,Singleline').Groups[1].Value
            $heading = [Net.WebUtility]::HtmlDecode(([regex]::Replace($heading, '<[^>]+>', ' ')).Trim())
            $service = [ordered]@{
                '@context' = 'https://schema.org'
                '@type' = 'Service'
                '@id' = "$canonical#service"
                name = $heading
                url = $canonical
                serviceType = 'Kurumsal iş kıyafeti üretimi'
                provider = [ordered]@{ '@id' = $organizationId }
                areaServed = $area
            }
            return '<script type="application/ld+json">' + (Compact-Json $service) + '</script>'
        }
        if ($schema.'@type' -eq 'Product') {
            $productRoot = Join-Path $siteRoot 'urun'
            if ($file.FullName -notlike "$productRoot\*") {
                $heading = Plain-Text ([regex]::Match($original, '<h1[^>]*>(.*?)</h1>', 'IgnoreCase,Singleline').Groups[1].Value)
                $descriptionMatch = [regex]::Match($original, '<meta[^>]+name=["'']description["''][^>]+content=["'']([^"'']+)', 'IgnoreCase')
                $description = [Net.WebUtility]::HtmlDecode($descriptionMatch.Groups[1].Value)
                $position = 0
                $items = @([regex]::Matches($original, '<a[^>]+href=["'']([^"'']+)["''][^>]*>.*?<h3[^>]*>(.*?)</h3>', 'IgnoreCase,Singleline') | ForEach-Object {
                    $href = [Net.WebUtility]::HtmlDecode($_.Groups[1].Value)
                    $absolute = [uri]::new([uri]$canonical, $href).AbsoluteUri
                    if ($absolute.StartsWith('https://kardeslertekstil.com.tr/')) {
                        $position++
                        [ordered]@{ '@type'='ListItem'; position=$position; name=(Plain-Text $_.Groups[2].Value); url=$absolute }
                    }
                } | Where-Object { $_ })
                $collection = [ordered]@{
                    '@context' = 'https://schema.org'
                    '@type' = 'CollectionPage'
                    '@id' = "$canonical#collection"
                    name = $heading
                    description = $description
                    url = $canonical
                    isPartOf = [ordered]@{ '@id' = 'https://kardeslertekstil.com.tr/#website' }
                    about = [ordered]@{ '@id' = $organizationId }
                    mainEntity = [ordered]@{ '@type'='ItemList'; '@id'="$canonical#item-list"; numberOfItems=$items.Count; itemListElement=$items }
                }
                return '<script type="application/ld+json">' + (Compact-Json $collection) + '</script>'
            }
            $schema | Add-Member -NotePropertyName '@id' -NotePropertyValue "$canonical#product" -Force
            if ($schema.manufacturer) {
                $schema.manufacturer = [ordered]@{ '@id' = $organizationId }
            }
            return '<script type="application/ld+json">' + (Compact-Json $schema) + '</script>'
        }
        if ($schema.'@type' -eq 'CollectionPage' -and $schema.mainEntity.'@type' -ne 'ItemList') {
            $position = 0
            $items = @([regex]::Matches($original, '<a[^>]+href=["'']([^"'']+)["''][^>]*>.*?<h3[^>]*>(.*?)</h3>', 'IgnoreCase,Singleline') | ForEach-Object {
                $href = [Net.WebUtility]::HtmlDecode($_.Groups[1].Value)
                if ($href -notmatch '^(#|mailto:|tel:|javascript:)') {
                    $absolute = [uri]::new([uri]$canonical, $href).AbsoluteUri
                    if ($absolute.StartsWith('https://kardeslertekstil.com.tr/')) {
                        $position++
                        [ordered]@{ '@type'='ListItem'; position=$position; name=(Plain-Text $_.Groups[2].Value); url=$absolute }
                    }
                }
            } | Where-Object { $_ })
            if ($items.Count) {
                $schema | Add-Member -NotePropertyName 'mainEntity' -NotePropertyValue ([ordered]@{ '@type'='ItemList'; '@id'="$canonical#item-list"; numberOfItems=$items.Count; itemListElement=$items }) -Force
                $schema | Add-Member -NotePropertyName '@id' -NotePropertyValue "$canonical#collection" -Force
                return '<script type="application/ld+json">' + (Compact-Json $schema) + '</script>'
            }
        }
        if ($schema.'@type' -eq 'BreadcrumbList' -and $canonical) {
            $items = @($schema.itemListElement)
            foreach ($item in $items) {
                if ([string]$item.item -match '^([^?#]+)[?#]') { $item.item = $matches[1] }
            }
            if ($items.Count) { $items[-1].item = $canonical }
            return '<script type="application/ld+json">' + (Compact-Json $schema) + '</script>'
        }
        if ($schema.'@type' -eq 'FAQPage') {
            $questions = @([regex]::Matches($original, '<details[^>]*>\s*<summary[^>]*>(.*?)</summary>(.*?)</details>', 'IgnoreCase,Singleline') | ForEach-Object {
                [ordered]@{
                    '@type' = 'Question'
                    name = Plain-Text $_.Groups[1].Value
                    acceptedAnswer = [ordered]@{ '@type'='Answer'; text=(Plain-Text $_.Groups[2].Value) }
                }
            })
            if (-not $questions.Count) {
                $faqSection = [regex]::Match($original, '<section[^>]*>\s*<h2[^>]*>[^<]*Sorulan Sorular\s*</h2>(.*?)</section>', 'IgnoreCase,Singleline')
                if ($faqSection.Success) {
                    $questions = @([regex]::Matches($faqSection.Groups[1].Value, '<h[3-4][^>]*>(.*?)</h[3-4]>\s*<p[^>]*>(.*?)</p>', 'IgnoreCase,Singleline') | ForEach-Object {
                        [ordered]@{ '@type'='Question'; name=(Plain-Text $_.Groups[1].Value); acceptedAnswer=[ordered]@{ '@type'='Answer'; text=(Plain-Text $_.Groups[2].Value) } }
                    })
                }
            }
            if (-not $questions.Count) {
                $visibleSections = @([regex]::Matches($original, '<h[2-4][^>]*>(.*?)</h[2-4]>\s*<p[^>]*>(.*?)</p>', 'IgnoreCase,Singleline'))
                $questions = @(@($schema.mainEntity) | ForEach-Object {
                    $question = $_
                    $questionName = Plain-Text ([string]$question.name)
                    $visibleAnswer = $null
                    foreach ($section in $visibleSections) {
                        if ((Plain-Text $section.Groups[1].Value) -eq $questionName) { $visibleAnswer = Plain-Text $section.Groups[2].Value; break }
                    }
                    if ($visibleAnswer) {
                        [ordered]@{ '@type'='Question'; name=$questionName; acceptedAnswer=[ordered]@{ '@type'='Answer'; text=$visibleAnswer } }
                    } else { $question }
                })
            }
            if ($questions.Count) {
                $faq = [ordered]@{ '@context'='https://schema.org'; '@type'='FAQPage'; mainEntity=$questions }
                return '<script type="application/ld+json">' + (Compact-Json $faq) + '</script>'
            }
        }
        return $match.Value
    }, 'IgnoreCase,Singleline')

    if ($html -ne $original) {
        [IO.File]::WriteAllText($file.FullName, $html, $utf8)
        $changed++
    }
}

"Normalized entity schema in $changed files."
