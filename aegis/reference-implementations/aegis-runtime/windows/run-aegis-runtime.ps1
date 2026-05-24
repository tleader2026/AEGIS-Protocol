param(
  [string]$Records = "$PSScriptRoot\..\..\..\..\..\.aegis\records.jsonl",
  [string]$RegionHint = "US"
)

$ErrorActionPreference = "Stop"
Set-Location "$PSScriptRoot\..\..\..\sdk\python"
py -3 -m aegis.daemon --records $Records --region-hint $RegionHint
