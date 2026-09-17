Add-Type -AssemblyName System.Drawing

$imageDir = Join-Path $PSScriptRoot "..\public\assets\image"
$backupDir = Join-Path $PSScriptRoot "..\public\assets\image_orig"

if (-not (Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
}

Get-ChildItem -Path $imageDir -Filter *.jpg | ForEach-Object {
    $file = $_
    $origPath = $file.FullName
    $backupPath = Join-Path $backupDir $file.Name
    
    # Backup original if not already backed up
    if (-not (Test-Path $backupPath)) {
        Copy-Item $origPath $backupPath
    }
    
    $bmp = [System.Drawing.Bitmap]::new($origPath)
    $origWidth = $bmp.Width
    $origHeight = $bmp.Height
    
    # Target max width 1280px for desktop/retina cards
    if ($origWidth -gt 1280) {
        $ratio = 1280.0 / $origWidth
        $newWidth = 1280
        $newHeight = [int]($origHeight * $ratio)
        
        $newBmp = [System.Drawing.Bitmap]::new($newWidth, $newHeight)
        $graph = [System.Drawing.Graphics]::FromImage($newBmp)
        $graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graph.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graph.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $graph.DrawImage($bmp, 0, 0, $newWidth, $newHeight)
        
        $bmp.Dispose()
        $graph.Dispose()
        
        # Save with JPEG encoder quality 85
        $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
        $encoderParams = [System.Drawing.Imaging.EncoderParameters]::new(1)
        $encoderParams.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new([System.Drawing.Imaging.Encoder]::Quality, [long]85)
        
        $tempPath = "$origPath.tmp"
        $newBmp.Save($tempPath, $codec, $encoderParams)
        $newBmp.Dispose()
        
        Move-Item -Force $tempPath $origPath
        $newSize = (Get-Item $origPath).Length
        Write-Host "Optimized $($file.Name): ${origWidth}x${origHeight} -> ${newWidth}x${newHeight} ($([math]::Round($newSize/1KB)) KB)"
    } else {
        $bmp.Dispose()
        Write-Host "Kept $($file.Name): ${origWidth}x${origHeight} ($([math]::Round($file.Length/1KB)) KB)"
    }
}
