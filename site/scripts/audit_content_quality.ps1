param([switch]$Quiet)

$ErrorActionPreference = 'Stop'
$siteRoot = Split-Path $PSScriptRoot -Parent
$knowledgeRoot = Join-Path $siteRoot 'bilgi-merkezi'
$errors = [System.Collections.Generic.List[string]]::new()
$thinPages = [System.Collections.Generic.List[string]]::new()
$articles = Get-ChildItem -LiteralPath $knowledgeRoot -Filter 'index.html' -File -Recurse | Where-Object {
    if ($_.DirectoryName -eq $knowledgeRoot) { return $false }
    $html = [IO.File]::ReadAllText($_.FullName, [Text.Encoding]::UTF8)
    return $html -notmatch '(?is)<meta[^>]+name=["'']robots["''][^>]+content=["''][^"'']*noindex' -and
           $html -notmatch '(?is)<meta[^>]+http-equiv=["'']refresh'
}

foreach ($file in $articles) {
    $html = Get-Content -LiteralPath $file.FullName -Raw
    $slug = Split-Path $file.DirectoryName -Leaf
    $h1Count = [regex]::Matches($html, '<h1\b', 'IgnoreCase').Count
    if ($h1Count -ne 1) { $errors.Add("Article must have exactly one H1: $slug") }
    if ($html -notmatch 'data-seo-enhancement=["'']knowledge-v3["'']') { $errors.Add("Topic links are missing: $slug") }
    if ($html -notmatch 'knowledge-review-note') { $errors.Add("Editorial responsibility note is missing: $slug") }
    if ($html -notmatch '["'']@type["'']\s*:\s*["'']BlogPosting["'']') { $errors.Add("BlogPosting schema is missing: $slug") }

    $body = [regex]::Replace($html, '(?is)<section class=["'']knowledge-seo-links["''].*?</section>', ' ')
    $body = [regex]::Replace($body, '(?is)<(script|style|nav|footer)\b.*?</\1>', ' ')
    $body = [regex]::Replace($body, '<[^>]+>', ' ')
    $body = [Net.WebUtility]::HtmlDecode($body)
    $wordCount = @($body -split '\s+' | Where-Object { $_ }).Count
    if ($wordCount -lt 450) { $thinPages.Add($slug) }
}

$result = [ordered]@{
    articles = $articles.Count
    structurallyValidArticles = $articles.Count - $errors.Count
    articlesUnder450CoreWords = $thinPages.Count
    thinPageSample = @($thinPages | Select-Object -First 10)
    errors = @($errors)
}
if (-not $Quiet) {
    'CONTENT_QUALITY_AUDIT'
    $result | ConvertTo-Json -Depth 4
}
if ($errors.Count -gt 0) { exit 1 }
