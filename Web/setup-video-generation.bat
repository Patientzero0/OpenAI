@echo off
REM Setup script for Video Generation Integration (Windows)

echo.
echo 🚀 Setting up Video Generation Integration...
echo.

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: package.json not found. Please run this script from the Web\ directory
    pause
    exit /b 1
)

REM Check Python installation
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: Python is not installed. Please install Python 3.8 or higher
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('python --version') do set PYTHON_VERSION=%%i
echo ✅ Python found: %PYTHON_VERSION%
echo.

REM Install Python dependencies
echo 📦 Installing Python dependencies...
cd backend
if exist "requirements.txt" (
    python -m pip install -r requirements.txt
    if errorlevel 1 (
        echo ❌ Error installing Python dependencies
        pause
        exit /b 1
    )
    echo ✅ Python dependencies installed
) else (
    echo ❌ Error: requirements.txt not found in backend\
    pause
    exit /b 1
)
cd ..
echo.

REM Check for .env file
echo 🔐 Checking environment configuration...
if not exist "backend\.env" (
    echo ⚠️  .env file not found in backend\
    echo 📝 Creating template .env file...
    (
        echo GROQ_API_KEY=your_groq_api_key_here
        echo PEXELS_API_KEY=your_pexels_api_key_here
    ) > backend\.env
    echo ✅ Template .env file created
    echo.
    echo ⚠️  IMPORTANT: You need to add your API keys to backend\.env
    echo    1. Get GROQ_API_KEY from: https://console.groq.com
    echo    2. Get PEXELS_API_KEY from: https://www.pexels.com/api/
    echo.
) else (
    echo ✅ .env file found
)
echo.

REM Install Node dependencies
echo 📦 Installing Node dependencies...
where pnpm >nul 2>&1
if errorlevel 0 (
    pnpm install
    echo ✅ Node dependencies installed with pnpm
) else (
    where npm >nul 2>&1
    if errorlevel 0 (
        npm install
        echo ✅ Node dependencies installed with npm
    ) else (
        echo ⚠️  Warning: Neither pnpm nor npm found. Please install dependencies manually:
        echo    npm install
    )
)
echo.

echo ✅ Setup complete!
echo.
echo 📋 Next steps:
echo 1. Add your API keys to backend\.env
echo 2. Start backend: cd backend ^&^& python main.py
echo 3. Start frontend: pnpm dev
echo 4. Navigate to http://localhost:3000/dashboard/marketing
echo 5. Go to 'Video Generator' tab to create videos
echo.
echo 📖 For more details, see VIDEO_GENERATION_GUIDE.md
echo.
pause
