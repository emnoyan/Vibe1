$ErrorActionPreference = "Stop"

Write-Host "=========================================="
Write-Host "Running Backend E2E Tests..."
Write-Host "=========================================="
Set-Location "c:/Users/Administrator/Desktop/VibeCode/Sample/server"
npm run test:e2e

Write-Host "`n=========================================="
Write-Host "Running Frontend Unit Tests..."
Write-Host "=========================================="
Set-Location "c:/Users/Administrator/Desktop/VibeCode/Sample/client"
npm run test -- run

Write-Host "`n=========================================="
Write-Host "All Tests Passed Successfully!"
Write-Host "=========================================="
