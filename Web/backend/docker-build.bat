@echo off
REM Docker build script for backend (Windows)
REM Run this from the backend directory: docker-build.bat

echo 🐳 Building BizGenie Backend Docker Image...
echo.

REM Build the Docker image
docker build -t bizgenie-backend .

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Build successful!
    echo.
    echo To run the container:
    echo   docker run -p 8000:8000 -e GROQ_API_KEY=your_key bizgenie-backend
    echo.
    echo Or with environment file:
    echo   docker run -p 8000:8000 --env-file .env bizgenie-backend
) else (
    echo.
    echo ❌ Build failed!
    exit /b 1
)
