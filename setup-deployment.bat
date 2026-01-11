@echo off
REM Deployment Setup Script for Windows
REM This script helps set up environment files for deployment

echo 🚀 BizGenie Deployment Setup
echo ==============================
echo.

REM Check if .env files exist
if not exist "Web\.env" (
    echo 📝 Creating Web\.env file...
    (
        echo # Backend API URL
        echo # For local development: http://localhost:8000
        echo # For production: https://your-backend-domain.com
        echo NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
        echo.
        echo # Groq API Key (for chat functionality)
        echo GROQ_API_KEY=your_groq_api_key_here
        echo.
        echo # DeepAI API Key (for image generation)
        echo NEXT_PUBLIC_DEEPAI_API_KEY=your_deepai_api_key_here
    ) > Web\.env
    echo ✅ Created Web\.env - Please update with your API keys
) else (
    echo ⚠️  Web\.env already exists, skipping...
)

if not exist "Web\backend\.env" (
    echo 📝 Creating Web\backend\.env file...
    (
        echo # Groq API Key for AI features
        echo GROQ_API_KEY=your_groq_api_key_here
        echo.
        echo # Backend Server Configuration
        echo PORT=8000
        echo HOST=0.0.0.0
        echo.
        echo # CORS Origins (comma-separated)
        echo CORS_ORIGINS=http://localhost:3000,https://your-frontend-domain.com
    ) > Web\backend\.env
    echo ✅ Created Web\backend\.env - Please update with your API keys
) else (
    echo ⚠️  Web\backend\.env already exists, skipping...
)

echo.
echo ✅ Setup complete!
echo.
echo Next steps:
echo 1. Edit Web\.env and Web\backend\.env with your API keys
echo 2. For Docker: Run 'docker-compose up -d'
echo 3. For local: Follow instructions in DEPLOYMENT.md
echo.

pause
