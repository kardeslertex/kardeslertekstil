param(
    [string]$OutputDirectory = '.kaf-seo'
)

$ErrorActionPreference = 'Stop'
$siteRoot = Split-Path -Parent $PSScriptRoot
$configPath = Join-Path $env:USERPROFILE '.codex\config.toml'

if (!(Test-Path -LiteralPath $configPath)) {
    throw "Codex config not found: $configPath"
}

$config = [IO.File]::ReadAllText($configPath, [Text.Encoding]::UTF8)
$sectionMatch = [regex]::Match(
    $config,
    '(?ms)^\[mcp_servers\.kaf-ai\]\s*(.*?)(?=^\[|\z)'
)
if (!$sectionMatch.Success) {
    throw 'mcp_servers.kaf-ai was not found in the Codex config.'
}

$section = $sectionMatch.Groups[1].Value
$url = [regex]::Match($section, 'url\s*=\s*"([^"]+)"').Groups[1].Value
$auth = [regex]::Match($section, 'X-KAF-Auth"?\s*=\s*"([^"]+)"').Groups[1].Value
if (!$url -or !$auth) {
    throw 'KAF URL or X-KAF-Auth could not be read from the Codex config.'
}

$headers = @{
    'X-KAF-Auth' = $auth
    Accept = 'application/json, text/event-stream'
}
$payload = @{
    jsonrpc = '2.0'
    id = 1
    method = 'tools/call'
    params = @{
        name = 'get_seo_fixes'
        arguments = @{ limit = 500 }
    }
} | ConvertTo-Json -Depth 10 -Compress

$response = Invoke-WebRequest `
    -Uri $url `
    -Method Post `
    -Headers $headers `
    -ContentType 'application/json' `
    -Body $payload `
    -UseBasicParsing `
    -TimeoutSec 60
$result = ($response.Content | ConvertFrom-Json).result.structuredContent
$mutations = @($result.mutations)

$absoluteOutputDirectory = if ([IO.Path]::IsPathRooted($OutputDirectory)) {
    $OutputDirectory
} else {
    Join-Path $siteRoot $OutputDirectory
}
[IO.Directory]::CreateDirectory($absoluteOutputDirectory) | Out-Null
$utf8 = [Text.UTF8Encoding]::new($false)

function Test-SuspiciousText([string]$text) {
    if (!$text) { return $false }
    return $text -match '(?i)DSS|yeleneği|yelkeni|kıyafulence' -or
        $text -match '(?i)\b(ve|iş|nasıl|maliyet|kumaş|dolap|5|satın|dope|sağlık|personel)\s*\|\s*Kardeşler Tekstil$'
}

function Get-RuleDecision($mutation, $rule) {
    $value = [string]$rule.value
    if (!$value -and $rule.createObject) { $value = [string]$rule.createObject.text }

    if (($rule.selector -eq 'title' -or $rule.selector -eq 'meta[name="description"]') -and !$value) {
        return @('reject', 'Boş title veya meta description değeri')
    }
    if (Test-SuspiciousText $value) {
        return @('reject', 'Bozuk, kesilmiş veya şüpheli metin')
    }
    if ($rule.selector -match ':contains') {
        return @('reject', 'Standart olmayan CSS seçicisi')
    }
    if ($rule.action -eq 'inject_css') {
        return @('reject', 'Sayfa içine CSS yaması; merkezi CSS tercih edilmeli')
    }
    if ($rule.action -eq 'remove_element') {
        return @('review', 'Element silme işlemi manuel doğrulama gerektirir')
    }
    if ($rule.action -eq 'create_if_missing' -and $rule.createObject.tag -eq 'script') {
        return @('review', 'Mevcut JSON-LD ile yinelenme riski')
    }
    if ($mutation.url -match '/gizlilik-ve-kvkk/?$') {
        return @('review', 'Hukuki içerik manuel onay gerektirir')
    }
    if ($rule.selector -eq 'title' -or $rule.selector -eq 'meta[name="description"]') {
        return @('candidate', 'Meta içerik adayı')
    }
    return @('review', 'Kaynak HTML üzerinde manuel doğrulama gerekli')
}

$rows = [Collections.Generic.List[object]]::new()
foreach ($mutation in $mutations) {
    foreach ($rule in @($mutation.rules)) {
        $decision = Get-RuleDecision $mutation $rule
        $rows.Add([pscustomobject][ordered]@{
            id = $mutation.id
            url = $mutation.url
            updatedAt = $mutation.updatedAt
            selector = $rule.selector
            action = $rule.action
            value = $rule.value
            attribute = $rule.attribute
            classification = $decision[0]
            reason = $decision[1]
        })
    }
}

$summary = [ordered]@{
    exportedAt = [DateTimeOffset]::UtcNow.ToString('o')
    project = 'kardeslertekstil.com.tr'
    mutationCount = $mutations.Count
    ruleCount = $rows.Count
    candidateRules = @($rows | Where-Object classification -eq 'candidate').Count
    reviewRules = @($rows | Where-Object classification -eq 'review').Count
    rejectedRules = @($rows | Where-Object classification -eq 'reject').Count
    removedIds = @($result.removedIds)
    cursor = $result.cursor
    hasMore = $result.hasMore
}

$export = [ordered]@{
    summary = $summary
    mutations = $mutations
}
[IO.File]::WriteAllText(
    (Join-Path $absoluteOutputDirectory 'kaf-fixes.json'),
    ($export | ConvertTo-Json -Depth 30),
    $utf8
)
[IO.File]::WriteAllText(
    (Join-Path $absoluteOutputDirectory 'kaf-review.json'),
    ($rows | ConvertTo-Json -Depth 8),
    $utf8
)

$reportLines = [Collections.Generic.List[string]]::new()
$reportLines.Add('# KAF SEO aktarım özeti')
$reportLines.Add('')
$reportLines.Add("- Aktarım zamanı: $($summary.exportedAt)")
$reportLines.Add("- Mutasyon: $($summary.mutationCount)")
$reportLines.Add("- Toplam kural: $($summary.ruleCount)")
$reportLines.Add("- Meta içerik adayı: $($summary.candidateRules)")
$reportLines.Add("- Manuel inceleme: $($summary.reviewRules)")
$reportLines.Add("- Reddedilen: $($summary.rejectedRules)")
$reportLines.Add('')
$reportLines.Add('## Meta içerik adayları')
$reportLines.Add('')
foreach ($row in $rows | Where-Object classification -eq 'candidate') {
    $reportLines.Add("- $($row.url) - $($row.selector): $($row.value)")
}
$reportLines.Add('')
$reportLines.Add('## Reddedilen kurallar')
$reportLines.Add('')
foreach ($group in $rows | Where-Object classification -eq 'reject' | Group-Object reason | Sort-Object Count -Descending) {
    $reportLines.Add("- $($group.Name): $($group.Count)")
}
[IO.File]::WriteAllLines(
    (Join-Path $absoluteOutputDirectory 'summary.md'),
    $reportLines,
    $utf8
)

$summary | ConvertTo-Json
