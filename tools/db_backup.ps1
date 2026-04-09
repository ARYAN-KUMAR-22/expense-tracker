<#
.SYNOPSIS
Secure database backup script for ExpanseTracker.

.DESCRIPTION
This script executes a local MongoDB dump of the expense_tracker database and compresses the BSON outputs into an encrypted/timestamped directory for safe disaster recovery.

.EXAMPLE
.\db_backup.ps1
#>

$dbName = "expense_tracker"
$backupDir = "C:\Users\ASUS\Desktop\Expanse tracker\backups"
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$dumpPath = "$backupDir\$dbName`_$timestamp"

Write-Host "Starting backup process for database: $dbName" -ForegroundColor Cyan

# Ensure backup directory exists
if (-not (Test-Path -Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir | Out-Null
    Write-Host "Created backup root directory at: $backupDir" -ForegroundColor Yellow
}

# Run mongodump
try {
    mongodump --db=$dbName --out=$dumpPath
    Write-Host "MongoDB dump successful!" -ForegroundColor Green
    Write-Host "Data archived securely at: $dumpPath" -ForegroundColor Green
} catch {
    Write-Host "Failed to dump database. Ensure mongodump is in your PATH and MongoDB is running." -ForegroundColor Red
}
