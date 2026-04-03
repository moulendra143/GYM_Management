$body = Get-Content -Raw "tmp_reminder_body.json"
try {
    $resp = Invoke-RestMethod -Uri 'http://localhost:5000/api/admin/send-reminders' -Method Post -ContentType 'application/json' -Body $body -ErrorAction Stop
    $resp | ConvertTo-Json -Depth 5 | Write-Output
} catch {
    if ($_.Exception.Response -ne $null) {
        $sr = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $sr.ReadToEnd() | Write-Output
    } else {
        $_.Exception.Message | Write-Output
    }
}
