param(
  [string]$SiteRoot = (Join-Path $PSScriptRoot ".."),
  [string]$OutputDirectory = (Join-Path $PSScriptRoot "..\..\audits")
)

$ErrorActionPreference = "Stop"
$articlesRoot = Join-Path $SiteRoot "bilgi-merkezi"
New-Item -ItemType Directory -Path $OutputDirectory -Force | Out-Null

function PlainText([string]$html) {
  $withoutScripts = [regex]::Replace($html, '<(?:script|style)[^>]*>[\s\S]*?</(?:script|style)>', ' ', 'IgnoreCase')
  $text = [regex]::Replace($withoutScripts, '<[^>]+>', ' ')
  $text = [Net.WebUtility]::HtmlDecode($text)
  return [regex]::Replace($text, '\s+', ' ').Trim()
}

function GetMatch([string]$html, [string]$pattern) {
  $match = [regex]::Match($html, $pattern, 'IgnoreCase')
  if ($match.Success) { return [Net.WebUtility]::HtmlDecode($match.Groups[1].Value).Trim() }
  return ''
}

function Tokens([string]$value) {
  $normalized = $value.ToLowerInvariant() -replace '[^a-z0-9çğıöşü ]', ' '
  $stop = @('ve','ile','icin','için','bir','nedir','nasil','nasıl','rehberi','2026','is','iş')
  return @($normalized -split '\s+' | Where-Object { $_.Length -gt 2 -and $_ -notin $stop } | Sort-Object -Unique)
}

$rows = foreach ($file in Get-ChildItem $articlesRoot -Directory | ForEach-Object { Join-Path $_.FullName 'index.html' } | Where-Object { Test-Path $_ }) {
  $html = [IO.File]::ReadAllText($file)
  $title = GetMatch $html '<title>([\s\S]*?)</title>'
  $description = GetMatch $html '<meta[^>]+name=["'']description["''][^>]+content=["'']([^"'']*)'
  if (-not $description) { $description = GetMatch $html '<meta[^>]+content=["'']([^"'']*)["''][^>]+name=["'']description["'']' }
  $canonical = GetMatch $html '<link[^>]+rel=["'']canonical["''][^>]+href=["'']([^"'']+)'
  $body = PlainText $html
  $words = @($body -split '\s+' | Where-Object { $_ }).Count
  $slug = Split-Path (Split-Path $file -Parent) -Leaf
  $cluster = switch -Regex ($slug) {
    'kumas|pamuk|polyester|softshell|polar|denim' { 'Kumaş ve malzeme'; break }
    'nakis|baski|logo|transfer|serigrafi' { 'Logo, baskı ve nakış'; break }
    'yikama|bakim|leke|kurutma' { 'Bakım ve yıkama'; break }
    'beden|olcu|kalip' { 'Beden ve kalıp'; break }
    'tedarik|satın|satin|siparis|maliyet|butce' { 'Satın alma ve tedarik'; break }
    'standart|koruyucu|antistatik|alev|reflektor' { 'Standart ve koruyucu ürün'; break }
    'istanbul|pendik|tuzla|kartal|maltepe|atasehir|umraniye|sancaktepe' { 'Yerel'; break }
    default { 'Ürün ve kullanım rehberi' }
  }
  [pscustomobject]@{
    Slug = $slug; URL = $canonical; Title = $title; MetaDescription = $description
    WordCount = $words; Cluster = $cluster; SearchConsoleClicks = ''; SearchConsoleImpressions = ''
    SearchConsoleCTR = ''; SearchConsolePosition = ''; Leads = ''; Backlinks = ''
    Decision = 'Search Console verisi bekleniyor'; Notes = ''
  }
}

$inventoryPath = Join-Path $OutputDirectory 'knowledge-content-inventory.csv'
$rows | Sort-Object Cluster, Title | Export-Csv $inventoryPath -NoTypeInformation -Encoding UTF8

$candidates = [Collections.Generic.List[object]]::new()
for ($i = 0; $i -lt $rows.Count; $i++) {
  $leftTokens = @(Tokens $rows[$i].Title)
  if ($leftTokens.Count -lt 2) { continue }
  for ($j = $i + 1; $j -lt $rows.Count; $j++) {
    if ($rows[$i].Cluster -ne $rows[$j].Cluster) { continue }
    $rightTokens = @(Tokens $rows[$j].Title)
    $intersection = @($leftTokens | Where-Object { $_ -in $rightTokens }).Count
    $union = @($leftTokens + $rightTokens | Sort-Object -Unique).Count
    if (-not $union) { continue }
    $score = [math]::Round($intersection / $union, 3)
    if ($score -ge 0.6) {
      $candidates.Add([pscustomobject]@{
        Cluster = $rows[$i].Cluster; Similarity = $score; URL_A = $rows[$i].URL
        Title_A = $rows[$i].Title; URL_B = $rows[$j].URL; Title_B = $rows[$j].Title
        Action = 'Performans ve arama niyeti birlikte incelenecek'
      })
    }
  }
}

$candidatePath = Join-Path $OutputDirectory 'knowledge-merge-candidates.csv'
$candidates | Sort-Object Similarity -Descending | Export-Csv $candidatePath -NoTypeInformation -Encoding UTF8

[pscustomobject]@{ Articles = $rows.Count; MergeCandidates = $candidates.Count; Inventory = $inventoryPath; Candidates = $candidatePath } | ConvertTo-Json
