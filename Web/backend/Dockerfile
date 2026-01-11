# Python Backend Dockerfile
# Build context: Run from Web/backend directory
# Usage: cd Web/backend && docker build -t bizgenie-backend .

FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code (all files from backend directory)
COPY . .

# Create directory structure that matches code expectations
# The code uses "backend/marketing_videos" path, so we create that structure
# Since we're in /app (which is the backend), we create backend/marketing_videos
RUN mkdir -p backend/marketing_videos/temp

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD python -c "import requests; requests.get('http://localhost:8000/health')" || exit 1

# Run the application
# main.py is in the root of /app, so we can run it directly
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
