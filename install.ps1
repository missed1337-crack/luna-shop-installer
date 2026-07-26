$ErrorActionPreference = "Stop"

$siteUrl = "http://localhost:1337/"
$installRoot = Join-Path $env:LOCALAPPDATA "LunaShop"
$launcherPath = Join-Path $installRoot "luna-shop.cmd"
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")

if ($siteUrl -ne "http://localhost:1337/") {
  throw "The LUNA|SHOP local demo launcher must use http://localhost:1337/."
}

New-Item -ItemType Directory -Path $installRoot -Force | Out-Null
$launcher = "@echo off`r`nstart `"`" `"$siteUrl`"`r`n"
[System.IO.File]::WriteAllText($launcherPath, $launcher, [System.Text.UTF8Encoding]::new($false))

$pathEntries = @($userPath -split ";" | Where-Object { $_ })
if ($pathEntries -notcontains $installRoot) {
  $newPath = (($pathEntries + $installRoot) -join ";")
  [Environment]::SetEnvironmentVariable("Path", $newPath, "User")
}

Write-Host "LUNA|SHOP DEMO ONLY - real payments and shipments are disabled."
Write-Host "LUNA|SHOP launcher installed for the current user."
Write-Host "Open a new terminal and run: luna-shop"
Write-Host "The local server must already be running on http://localhost:1337/."
Write-Host "To uninstall, remove $installRoot and its user PATH entry."
