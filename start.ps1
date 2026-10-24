Set-Location -Path $PSScriptRoot
$env:NODE_OPTIONS = "--use-system-ca"
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host " Starting Rent Anything Bengaluru (Next.js Dev Server)  " -ForegroundColor Cyan
Write-Host " Local URL: http://localhost:3000                       " -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Cyan
Start-Process "http://localhost:3000"
npm run dev
