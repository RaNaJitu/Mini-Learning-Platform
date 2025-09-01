$ErrorActionPreference = 'Stop'

function Invoke-JsonPost($url, $body, $headers) {
  $json = $body | ConvertTo-Json
  return Invoke-RestMethod -Method Post -Uri $url -ContentType 'application/json' -Body $json -Headers $headers
}

$base = 'http://localhost:3000'
$adminEmail = 'admin@example.com'
$studentEmail = 'student@example.com'
$pwd = 'Password1@'

Write-Host 'Register/Login admin & student'
try { $regAdmin = Invoke-JsonPost "$base/users/api/v1/register" @{ email = $adminEmail; password = $pwd; role = 'ADMIN' } @{} } catch {}
$loginAdmin = Invoke-JsonPost "$base/users/api/v1/login" @{ email = $adminEmail; password = $pwd } @{}
$adminToken = $loginAdmin.data.accessToken

try { $regStudent = Invoke-JsonPost "$base/users/api/v1/register" @{ email = $studentEmail; password = $pwd; role = 'STUDENT' } @{} } catch {}
$loginStudent = Invoke-JsonPost "$base/users/api/v1/login" @{ email = $studentEmail; password = $pwd } @{}
$studentToken = $loginStudent.data.accessToken
$studentId = if ($regStudent) { $regStudent.data.id } else { $loginStudent.data.id }

$adminHeaders = @{ 'Authorization' = "Bearer $adminToken" }
$studentHeaders = @{ 'Authorization' = "Bearer $studentToken" }

Write-Host 'GET /users/me'
$me = Invoke-RestMethod -Headers $studentHeaders -Uri "$base/users/api/v1/me"

Write-Host 'POST /lessons'
$createLesson = Invoke-JsonPost "$base/lessons/api/v1/" @{ title = 'Algebra 101'; subject = 'MATH'; grade = 5 } $adminHeaders
$lessonId = $createLesson.data.id

Write-Host 'POST /lessons/:id/enroll'
$enroll = Invoke-RestMethod -Headers $adminHeaders -Method Post -Uri "$base/lessons/api/v1/$lessonId/enroll?userId=$studentId"

Write-Host 'POST /lessons/:id/complete'
$complete = Invoke-RestMethod -Headers $adminHeaders -Method Post -Uri "$base/lessons/api/v1/$lessonId/complete?userId=$studentId"

Write-Host 'GET /lessons'
$listLessons = Invoke-RestMethod -Headers $studentHeaders -Uri "$base/lessons/api/v1/"

Write-Host 'GET /achievements/me'
$achMe = Invoke-RestMethod -Headers $studentHeaders -Uri "$base/achievements/api/v1/me"

Write-Host 'GET /achievements/user/:userId'
$achUser = Invoke-RestMethod -Headers $adminHeaders -Uri "$base/achievements/api/v1/user/$studentId"

Write-Output 'OK login admin'
$loginAdmin | ConvertTo-Json -Depth 6
Write-Output 'OK login student'
$loginStudent | ConvertTo-Json -Depth 6
Write-Output 'OK /users/me'
$me | ConvertTo-Json -Depth 6
Write-Output 'OK create lesson'
$createLesson | ConvertTo-Json -Depth 6
Write-Output 'OK enroll'
$enroll | ConvertTo-Json -Depth 6
Write-Output 'OK complete'
$complete | ConvertTo-Json -Depth 6
Write-Output 'OK lessons list'
$listLessons | ConvertTo-Json -Depth 6
Write-Output 'OK achievements me'
$achMe | ConvertTo-Json -Depth 6
Write-Output 'OK achievements user'
$achUser | ConvertTo-Json -Depth 6


