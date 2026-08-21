param([string[]]$Paths)

$ErrorActionPreference = 'Stop'

$siteRoot = Split-Path $PSScriptRoot -Parent
$utf8 = [Text.UTF8Encoding]::new($false)
$updated = 0

function Plain-Text([string]$value) {
    return ([Net.WebUtility]::HtmlDecode(([regex]::Replace($value, '<[^>]+>', ' '))) -replace '\s+', ' ').Trim()
}

$files = if ($Paths.Count) {
    @($Paths | ForEach-Object { Get-Item -LiteralPath (Join-Path $siteRoot $_) })
} else {
    @(Get-ChildItem -LiteralPath $siteRoot -Recurse -File -Filter '*.html' | Where-Object { $_.FullName -notlike '*\hero-archive\*' })
}

foreach ($file in $files) {
    $html = [IO.File]::ReadAllText($file.FullName, [Text.Encoding]::UTF8)
    $details = @([regex]::Matches($html, '<details[^>]*>\s*<summary[^>]*>(.*?)</summary>(.*?)</details>', 'IgnoreCase,Singleline'))
    if (!$details.Count) { continue }

    $questions = @($details | ForEach-Object {
        [ordered]@{
            '@type' = 'Question'
            name = Plain-Text $_.Groups[1].Value
            acceptedAnswer = [ordered]@{ '@type' = 'Answer'; text = Plain-Text $_.Groups[2].Value }
        }
    })

    $next = [regex]::Replace($html, '<script(?<attrs>[^>]*)type=["'']application/ld\+json["''](?<after>[^>]*)>(?<json>.*?)</script>', {
        param($match)
        try { $schema = $match.Groups['json'].Value | ConvertFrom-Json } catch { return $match.Value }
        if ($schema.'@type' -ne 'FAQPage') { return $match.Value }
        $schema.mainEntity = $questions
        return '<script type="application/ld+json">' + ($schema | ConvertTo-Json -Depth 20 -Compress) + '</script>'
    }, 'IgnoreCase,Singleline')

    if ($next -ne $html) {
        [IO.File]::WriteAllText($file.FullName, $next, $utf8)
        $updated++
    }
}

"Synchronized FAQ schema in $updated files."
