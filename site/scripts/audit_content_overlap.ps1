param([switch]$Quiet)

$ErrorActionPreference = 'Stop'
$siteRoot = Split-Path $PSScriptRoot -Parent
$knowledgeRoot = Join-Path $siteRoot 'bilgi-merkezi'
$errors = [Collections.Generic.List[string]]::new()
$titleOwners = @{}
$bodyOwners = @{}
$records = [Collections.Generic.List[object]]::new()

function Plain-Text([string]$value) {
    $text = [regex]::Replace($value, '(?is)<[^>]+>', ' ')
    $text = [Net.WebUtility]::HtmlDecode($text)
    return ($text -replace '\s+', ' ').Trim()
}

function Normalize-Intent([string]$value) {
    $value = $value.ToLowerInvariant()
    $value = $value -replace '[^\p{L}\p{Nd}\s]', ' '
    $stop = @('ve','ile','için','icin','nasıl','nasil','nedir','rehberi','seçim','secim','2026','2027','kardeşler','tekstil')
    return @($value -split '\s+' | Where-Object { $_.Length -gt 2 -and $_ -notin $stop } | Sort-Object -Unique)
}

function Similarity($left, $right) {
    if (!$left.Count -or !$right.Count) { return 0 }
    $rightSet = [Collections.Generic.HashSet[string]]::new([string[]]$right)
    $unionSet = [Collections.Generic.HashSet[string]]::new([string[]]$left)
    $intersection = 0
    foreach ($token in $left) { if ($rightSet.Contains($token)) { $intersection++ } }
    foreach ($token in $right) { [void]$unionSet.Add($token) }
    $union = $unionSet.Count
    if (!$union) { return 0 }
    return [Math]::Round($intersection / $union, 3)
}

$articles = Get-ChildItem -LiteralPath $knowledgeRoot -Filter 'index.html' -File -Recurse | Where-Object {
    if ($_.DirectoryName -eq $knowledgeRoot) { return $false }
    $html = [IO.File]::ReadAllText($_.FullName, [Text.Encoding]::UTF8)
    return $html -notmatch '(?is)<meta[^>]+name=["'']robots["''][^>]+content=["''][^"'']*noindex' -and
           $html -notmatch '(?is)<meta[^>]+http-equiv=["'']refresh'
}

foreach ($file in $articles) {
    $html = [IO.File]::ReadAllText($file.FullName, [Text.Encoding]::UTF8)
    $slug = Split-Path $file.DirectoryName -Leaf
    $h1 = Plain-Text ([regex]::Match($html, '(?is)<h1\b[^>]*>(.*?)</h1>').Groups[1].Value)
    $titleKey = $h1.ToLowerInvariant()
    if (!$titleOwners.ContainsKey($titleKey)) { $titleOwners[$titleKey] = [Collections.Generic.List[string]]::new() }
    $titleOwners[$titleKey].Add($slug)

    $core = [regex]::Replace($html, '(?is)<section class=["'']knowledge-seo-links["''].*?</section>', ' ')
    $core = [regex]::Replace($core, '(?is)<section[^>]*>\s*<h2[^>]*>Sık Sorulan Sorular</h2>.*?</section>', ' ')
    $core = [regex]::Replace($core, '(?is)<(script|style|nav|footer|header)\b.*?</\1>', ' ')
    $coreText = Plain-Text $core
    $bodyKey = $coreText.ToLowerInvariant()
    if (!$bodyOwners.ContainsKey($bodyKey)) { $bodyOwners[$bodyKey] = [Collections.Generic.List[string]]::new() }
    $bodyOwners[$bodyKey].Add($slug)

    $records.Add([pscustomobject]@{ slug=$slug; title=$h1; tokens=@(Normalize-Intent $h1) })
}

foreach ($entry in $titleOwners.GetEnumerator() | Where-Object { $_.Value.Count -gt 1 }) {
    $errors.Add("Exact duplicate article title: $($entry.Value -join ', ')")
}
foreach ($entry in $bodyOwners.GetEnumerator() | Where-Object { $_.Value.Count -gt 1 }) {
    $errors.Add("Exact duplicate article body: $($entry.Value -join ', ')")
}

$nearIntent = [Collections.Generic.List[object]]::new()
for ($i = 0; $i -lt $records.Count; $i++) {
    for ($j = $i + 1; $j -lt $records.Count; $j++) {
        $score = Similarity $records[$i].tokens $records[$j].tokens
        if ($score -ge 0.8) {
            $nearIntent.Add([pscustomobject]@{ similarity=$score; slugA=$records[$i].slug; slugB=$records[$j].slug })
        }
    }
}

$result = [ordered]@{
    articles = $articles.Count
    exactDuplicateTitleGroups = @($titleOwners.GetEnumerator() | Where-Object { $_.Value.Count -gt 1 }).Count
    exactDuplicateBodyGroups = @($bodyOwners.GetEnumerator() | Where-Object { $_.Value.Count -gt 1 }).Count
    nearIntentPairs = $nearIntent.Count
    nearIntentSample = @($nearIntent | Sort-Object similarity -Descending | Select-Object -First 25)
    errors = @($errors)
}

if (!$Quiet) {
    'CONTENT_OVERLAP_AUDIT'
    $result | ConvertTo-Json -Depth 5
}
if ($errors.Count) { exit 1 }
