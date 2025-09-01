@echo off
REM Mini Learning Platform - Test Runner (Windows)
REM This script runs all unit tests for the domain models

echo 🧪 Running Mini Learning Platform Unit Tests
echo ==============================================

REM Check if Jest is available
where npx >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ npx not found. Please install Node.js and npm.
    pause
    exit /b 1
)

echo.
echo 📋 Available Test Commands:
echo   npm test              - Run all tests
echo   npm run test:watch    - Run tests in watch mode
echo   npm run test:coverage - Run tests with coverage report
echo   npm run test:user     - Run user domain tests only
echo   npm run test:lesson   - Run lesson domain tests only
echo   npm run test:achievement - Run achievement domain tests only
echo   npm run test:domain   - Run all domain model tests
echo   npm run test:events   - Run all event tests
echo.

REM Run all tests
echo 🚀 Running all unit tests...
npm test

echo.
echo ✅ Test run completed!
echo.
echo 📊 To see detailed coverage report, run:
echo    npm run test:coverage
echo.
echo 🔄 To run tests in watch mode, run:
echo    npm run test:watch
echo.
pause
