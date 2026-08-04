param(
    [Parameter(Mandatory = $true)][string]$InputPath,
    [Parameter(Mandatory = $true)][string]$OutputPath,
    [int]$Tolerance = 90
)

Add-Type -AssemblyName System.Drawing

$source = [System.Drawing.Bitmap]::FromFile((Resolve-Path -LiteralPath $InputPath))
$result = New-Object System.Drawing.Bitmap $source.Width, $source.Height, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

try {
    for ($y = 0; $y -lt $source.Height; $y++) {
        for ($x = 0; $x -lt $source.Width; $x++) {
            $pixel = $source.GetPixel($x, $y)
            $greenDominance = $pixel.G - [Math]::Max($pixel.R, $pixel.B)
            if ($pixel.G -ge 110 -and $greenDominance -ge $Tolerance) {
                $alpha = 0
                $red = [Math]::Min(255, $pixel.R + [Math]::Floor(($pixel.G - $pixel.R) * 0.12))
                $blue = [Math]::Min(255, $pixel.B + [Math]::Floor(($pixel.G - $pixel.B) * 0.12))
                $result.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $red, [Math]::Min($pixel.G, [Math]::Max($red, $blue)), $blue))
            } else {
                $result.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $pixel.R, $pixel.G, $pixel.B))
            }
        }
    }

    $destination = [System.IO.Path]::GetFullPath((Join-Path (Get-Location) $OutputPath))
    $directory = [System.IO.Path]::GetDirectoryName($destination)
    [System.IO.Directory]::CreateDirectory($directory) | Out-Null
    $result.Save($destination, [System.Drawing.Imaging.ImageFormat]::Png)
    Write-Output $destination
}
finally {
    $result.Dispose()
    $source.Dispose()
}
