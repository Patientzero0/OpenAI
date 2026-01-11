#!/bin/bash

# Deployment Setup Script
# This script helps set up environment files for deployment

echo "🚀 BizGenie Deployment Setup"
echo "=============================="
echo ""

# Check if .env files exist
if [ ! -f "Web/.env" ]; then
    echo "📝 Creating Web/.env file..."
    cat > Web/.env << EOF
# Backend API URL
# For local development: http://localhost:8000
# For production: https://your-backend-domain.com
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000

# Groq API Key (for chat functionality)
GROQ_API_KEY=your_groq_api_key_here

# DeepAI API Key (for image generation)
NEXT_PUBLIC_DEEPAI_API_KEY=your_deepai_api_key_here
EOF
    echo "✅ Created Web/.env - Please update with your API keys"
else
    echo "⚠️  Web/.env already exists, skipping..."
fi

if [ ! -f "Web/backend/.env" ]; then
    echo "📝 Creating Web/backend/.env file..."
    cat > Web/backend/.env << EOF
# Groq API Key for AI features
GROQ_API_KEY=your_groq_api_key_here

# Backend Server Configuration
PORT=8000
HOST=0.0.0.0

# CORS Origins (comma-separated)
CORS_ORIGINS=http://localhost:3000,https://your-frontend-domain.com
EOF
    echo "✅ Created Web/backend/.env - Please update with your API keys"
else
    echo "⚠️  Web/backend/.env already exists, skipping..."
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit Web/.env and Web/backend/.env with your API keys"
echo "2. For Docker: Run 'docker-compose up -d'"
echo "3. For local: Follow instructions in DEPLOYMENT.md"
echo ""
