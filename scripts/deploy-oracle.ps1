$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$projectRoot = Split-Path -Parent $PSScriptRoot
$distRoot = Join-Path $projectRoot "dist\client"
$nginxConfig = Join-Path $projectRoot "deploy\nginx-portfolio.conf"
$npm = (Get-Command npm.cmd -ErrorAction Stop).Source
$sshHost = $env:PORTFOLIO_SSH_HOST
$sshUser = if ([string]::IsNullOrWhiteSpace($env:PORTFOLIO_SSH_USER)) { "ubuntu" } else { $env:PORTFOLIO_SSH_USER }
$sshKey = $env:PORTFOLIO_SSH_KEY
$remoteTarget = "Oracle_tailscale"
$sshOptions = @()

if (-not [string]::IsNullOrWhiteSpace($sshHost)) {
    if ([string]::IsNullOrWhiteSpace($sshKey) -or -not (Test-Path -LiteralPath $sshKey)) {
        throw "PORTFOLIO_SSH_KEY must point to an existing private key when PORTFOLIO_SSH_HOST is set"
    }

    $remoteTarget = "$sshUser@$sshHost"
    $sshOptions = @(
        "-F", "NUL",
        "-o", "BatchMode=yes",
        "-o", "ConnectTimeout=15",
        "-o", "IdentitiesOnly=yes",
        "-i", $sshKey
    )
}

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
sudo find /var/www/portfolio -type d -exec chmod 755 {} +
sudo find /var/www/portfolio -type f -exec chmod 644 {} +
if [ -f /etc/nginx/sites-available/default ]; then
  sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/default.before-portfolio-$stamp
fi
sudo cp '$stage/nginx-portfolio.conf' /etc/nginx/sites-available/default
sudo nginx -t
sudo systemctl reload nginx
rm -rf -- '$stage'
"@
$remoteCommands = $remoteCommands.Replace("`r", "")

    & ssh @sshOptions $remoteTarget "set -eu; mkdir -p '$stage/client'"
    if ($LASTEXITCODE -ne 0) { throw "Could not create Oracle staging directory on $remoteTarget" }

    & scp @sshOptions -r (Join-Path $distRoot ".") "${remoteTarget}:$stage/client/"
    if ($LASTEXITCODE -ne 0) { throw "Could not upload static build to $remoteTarget" }

    & scp @sshOptions $nginxConfig "${remoteTarget}:$stage/nginx-portfolio.conf"
    if ($LASTEXITCODE -ne 0) { throw "Could not upload Nginx configuration to $remoteTarget" }

    $remoteCommands | & ssh @sshOptions $remoteTarget "bash -s"
    if ($LASTEXITCODE -ne 0) { throw "Oracle Nginx deployment failed on $remoteTarget" }

    & ssh @sshOptions $remoteTarget "rm -rf -- '$stage'"
    if ($LASTEXITCODE -ne 0) { throw "Could not clean Oracle staging directory on $remoteTarget" }

    Write-Output "DEPLOYED=oracle"
    Write-Output "URL=https://hojun-portfolio.taile6cccb.ts.net/"
}
finally {
    Pop-Location
}
