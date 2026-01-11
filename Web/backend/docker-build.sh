#!/bin/bash

# Docker build script for backend
# Run this from the backend directory: ./docker-build.sh

echo "🐳 Building BizGenie Backend Docker Image..."
echo ""

# Build the Docker image
docker build -t bizgenie-backend .

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build successful!"
    echo ""
    echo "To run the container:"
    echo "  docker run -p 8000:8000 -e GROQ_API_KEY=your_key bizgenie-backend"
    echo ""
    echo "Or with environment file:"
    echo "  docker run -p 8000:8000 --env-file .env bizgenie-backend"
else
    echo ""
    echo "❌ Build failed!"
    exit 1
fi
