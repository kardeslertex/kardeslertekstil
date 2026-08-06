param([switch]$Quiet)

$ErrorActionPreference = 'Stop'
$siteRoot = Split-Path $PSScriptRoot -Parent
$robotsPath = Join-Path $siteRoot 'robots.txt'
$errors = [System.Collections.Generic.List[string]]::new()

if (-not (Test-Path -LiteralPath $robotsPath)) {
    $errors.Add('robots.txt is missing.')
} else {
    $content = Get-Content -LiteralPath $robotsPath -Raw
    $lines = @($content -split "`r?`n" | ForEach-Object { $_.Trim() } | Where-Object { $_ -and -not $_.StartsWith('#') })

    if (@($lines | Where-Object { $_ -ieq 'User-agent: *' }).Count -ne 1) {
        $errors.Add('robots.txt must contain exactly one global user-agent group.')
    }
    if (@($lines | Where-Object { $_ -ieq 'Allow: /' }).Count -ne 1) {
        $errors.Add('The public site root must be crawlable.')
    }

    $expectedSitemap = 'Sitemap: https://kardeslertekstil.com.tr/sitemap.xml'
    if (@($lines | Where-Object { $_ -ieq $expectedSitemap }).Count -ne 1) {
        $errors.Add('The canonical sitemap declaration is missing or duplicated.')
    }

    $requiredParameters = @('q', 'tag', 'kategori', 'urun', 'adet', 'mesaj')
    foreach ($parameter in $requiredParameters) {
        $expectedRule = "Disallow: /*?*$parameter="
        if ($lines -inotcontains $expectedRule) {
            $errors.Add("Missing crawl rule for query parameter: $parameter")
        }
    }

    foreach ($line in $lines | Where-Object { $_ -imatch '^(Allow|Disallow):' }) {
        if ($line -imatch '\.(css|js|webp|avif|png|jpe?g|svg|woff2?)(\$|\?|/|$)') {
            $errors.Add("A render resource appears to be blocked: $line")
        }
    }
}

$result = [ordered]@{
    robotsFile = $robotsPath
    blockedQueryParameters = 6
    errors = @($errors)
}

if (-not $Quiet) {
    'ROBOTS_AUDIT'
    $result | ConvertTo-Json -Depth 4
}

if ($errors.Count -gt 0) { exit 1 }
