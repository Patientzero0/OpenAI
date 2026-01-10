#!/bin/bash
# Setup script for Video Generation Integration

echo "🚀 Setting up Video Generation Integration..."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the Web/ directory"
    exit 1
fi

# Check Python installation
if ! command -v python &> /dev/null; then
    echo "❌ Error: Python is not installed. Please install Python 3.8 or higher"
    exit 1
fi

echo "✅ Python found: $(python --version)"
echo ""

# Install Python dependencies
echo "📦 Installing Python dependencies..."
cd backend
if [ -f "requirements.txt" ]; then
    python -m pip install -r requirements.txt
    echo "✅ Python dependencies installed"
else
    echo "❌ Error: requirements.txt not found in backend/"
    exit 1
fi
cd ..
echo ""

# Check for .env file
echo "🔐 Checking environment configuration..."
if [ ! -f "backend/.env" ]; then
    echo "⚠️  .env file not found in backend/"
    echo "📝 Creating template .env file..."
    cat > backend/.env << EOF
GROQ_API_KEY=your_groq_api_key_here
PEXELS_API_KEY=your_pexels_api_key_here
EOF
    echo "✅ Template .env file created"
    echo ""
    echo "⚠️  IMPORTANT: You need to add your API keys to backend/.env"
    echo "   1. Get GROQ_API_KEY from: https://console.groq.com"
    echo "   2. Get PEXELS_API_KEY from: https://www.pexels.com/api/"
    echo ""
else
    echo "✅ .env file found"
fi
echo ""

# Install Node dependencies
echo "📦 Installing Node dependencies..."
if command -v pnpm &> /dev/null; then
    pnpm install
    echo "✅ Node dependencies installed with pnpm"
elif command -v npm &> /dev/null; then
    npm install
    echo "✅ Node dependencies installed with npm"
else
    echo "⚠️  Warning: Neither pnpm nor npm found. Please install dependencies manually:"
    echo "   npm install"
fi
echo ""

echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Add your API keys to backend/.env"
echo "2. Start backend: cd backend && python main.py"
echo "3. Start frontend: pnpm dev"
echo "4. Navigate to http://localhost:3000/dashboard/marketing"
echo "5. Go to 'Video Generator' tab to create videos"
echo ""
echo "📖 For more details, see VIDEO_GENERATION_GUIDE.md"
