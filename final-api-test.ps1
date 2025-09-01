Write-Host "Final API Test - All Services Configured" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green

# Test 1: User Registration
Write-Host "`n1. Testing User Registration..." -ForegroundColor Yellow
try {
    $body = @{ email = "admin@example.com"; password = "admin123456"; role = "ADMIN" } | ConvertTo-Json
    $response = Invoke-WebRequest -Uri "http://localhost:3001/api/v1/register" -Method POST -Headers @{"Content-Type"="application/json"} -Body $body -UseBasicParsing
    Write-Host "✅ Admin Registration: $($response.StatusCode) - $($response.Content)" -ForegroundColor Green
} catch {
    Write-Host "❌ Admin Registration: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 2: Admin Login
Write-Host "`n2. Testing Admin Login..." -ForegroundColor Yellow
try {
    $body = @{ email = "admin@example.com"; password = "admin123456" } | ConvertTo-Json
    $response = Invoke-WebRequest -Uri "http://localhost:3001/api/v1/login" -Method POST -Headers @{"Content-Type"="application/json"} -Body $body -UseBasicParsing
    $adminToken = ($response.Content | ConvertFrom-Json).data.accessToken
    Write-Host "✅ Admin Login: $($response.StatusCode) - Token received" -ForegroundColor Green
} catch {
    Write-Host "❌ Admin Login: $($_.Exception.Message)" -ForegroundColor Red
    $adminToken = $null
}

# Test 3: Create Lesson (Admin only)
if ($adminToken) {
    Write-Host "`n3. Testing Lesson Creation..." -ForegroundColor Yellow
    try {
        $headers = @{"Authorization" = "Bearer $adminToken"; "Content-Type" = "application/json"}
        $body = @{ title = "Advanced Mathematics"; subject = "MATH"; grade = 9 } | ConvertTo-Json
        $response = Invoke-WebRequest -Uri "http://localhost:3002/api/v1/lesson/" -Method POST -Headers $headers -Body $body -UseBasicParsing
        Write-Host "✅ Lesson Creation: $($response.StatusCode) - $($response.Content)" -ForegroundColor Green
    } catch {
        Write-Host "❌ Lesson Creation: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Test 4: Get Lessons
Write-Host "`n4. Testing Get Lessons..." -ForegroundColor Yellow
try {
    $headers = @{"Authorization" = "Bearer $adminToken"}
    $response = Invoke-WebRequest -Uri "http://localhost:3002/api/v1/lesson/" -Method GET -Headers $headers -UseBasicParsing
    Write-Host "✅ Get Lessons: $($response.StatusCode) - $($response.Content)" -ForegroundColor Green
} catch {
    Write-Host "❌ Get Lessons: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 5: Get Achievements
Write-Host "`n5. Testing Get Achievements..." -ForegroundColor Yellow
try {
    $headers = @{"Authorization" = "Bearer $adminToken"}
    $response = Invoke-WebRequest -Uri "http://localhost:3003/api/v1/achievement/me" -Method GET -Headers $headers -UseBasicParsing
    Write-Host "✅ Get Achievements: $($response.StatusCode) - $($response.Content)" -ForegroundColor Green
} catch {
    Write-Host "❌ Get Achievements: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`nFinal API Test Complete!" -ForegroundColor Green
