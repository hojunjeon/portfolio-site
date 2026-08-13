$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$projectRoot = Split-Path -Parent $PSScriptRoot
$distRoot = Join-Path $projectRoot "dist\client"
$nginxConfig = Join-Path $projectRoot "deploy\nginx-portfolio.conf"
$npm = (Get-Command npm.cmd -ErrorAction Stop).Source

Push-Location $projectRoot
try {
    & $npm run build
    if ($LASTEXITCODE -ne 0) {
        throw "Build failed with exit code $LASTEXITCODE"
    }

    foreach ($required in @("index.html", "resume.html", "ai.html", "robotics.html", "autonomous-driving.html")) {
        if (-not (Test-Path -LiteralPath (Join-Path $distRoot $required))) {
            throw "Missing static route: $required"
        }
    }

    $stamp = Get-Date -Format "yyyyMMdd-HHmmss"
    $stage = "/tmp/portfolio-site-$stamp"
    $remoteCommands = @"
set -eu
sudo mkdir -p /var/www/portfolio
sudo rsync -a --delete '$stage/client/' /var/www/portfolio/
if [ -f /etc/nginx/sites-available/default ]; then
  sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/default.before-portfolio-$stamp
fi
sudo cp '$stage/nginx-portfolio.conf' /etc/nginx/sites-available/default
sudo nginx -t
sudo systemctl reload nginx
rm -rf '$stage'
"@

    & ssh Oracle "set -eu; mkdir -p '$stage/client'"
    if ($LASTEXITCODE -ne 0) { throw "Could not create Oracle staging directory" }

    & scp -r (Join-Path $distRoot ".") "Oracle:$stage/client/"
    if ($LASTEXITCODE -ne 0) { throw "Could not upload static build" }

    & scp $nginxConfig "Oracle:$stage/nginx-portfolio.conf"
    if ($LASTEXITCODE -ne 0) { throw "Could not upload Nginx configuration" }

    $remoteCommands | & ssh Oracle "bash -s"
    if ($LASTEXITCODE -ne 0) { throw "Oracle Nginx deployment failed" }

    Write-Output "DEPLOYED=oracle"
    Write-Output "URL=https://hojun-portfolio.taile6cccb.ts.net/"
}
finally {
    Pop-Location
}
