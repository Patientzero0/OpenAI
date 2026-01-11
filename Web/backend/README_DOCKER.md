# Docker Deployment for Backend

## Quick Start

### Build the Docker Image

From the `Web/backend` directory:

```bash
# Linux/Mac
docker build -t bizgenie-backend .

# Or use the build script
chmod +x docker-build.sh
./docker-build.sh
```

```powershell
# Windows
docker build -t bizgenie-backend .

# Or use the build script
docker-build.bat
```

### Run the Container

**Basic run:**
```bash
docker run -p 8000:8000 \
  -e GROQ_API_KEY=your_groq_api_key \
  bizgenie-backend
```

**With environment file:**
```bash
docker run -p 8000:8000 \
  --env-file .env \
  bizgenie-backend
```

**With volume for video output:**
```bash
docker run -p 8000:8000 \
  -e GROQ_API_KEY=your_groq_api_key \
  -v $(pwd)/marketing_videos:/app/marketing_videos \
  bizgenie-backend
```

**Detached mode (background):**
```bash
docker run -d -p 8000:8000 \
  --name bizgenie-backend \
  -e GROQ_API_KEY=your_groq_api_key \
  bizgenie-backend
```

## Build Context

The Dockerfile is designed to be run from the `Web/backend` directory:

```bash
cd Web/backend
docker build -t bizgenie-backend .
```

This ensures:
- `requirements.txt` is found correctly
- `main.py` is in the root of the container
- `agents/` directory is copied correctly
- All paths are relative to the backend directory

## Directory Structure in Container

```
/app/
├── main.py              # Main FastAPI application
├── requirements.txt     # Python dependencies
├── agents/              # Agent modules
│   ├── financial_analysis.py
│   ├── marketing_analysis.py
│   ├── operations_analysis.py
│   └── video_generation_agent.py
└── marketing_videos/    # Video output directory
    └── temp/            # Temporary files
```

## Environment Variables

Required:
- `GROQ_API_KEY` - Groq API key for AI features

Optional:
- `PORT` - Server port (default: 8000)
- `HOST` - Server host (default: 0.0.0.0)
- `CORS_ORIGINS` - Comma-separated list of allowed origins

## Testing

After starting the container:

```bash
# Health check
curl http://localhost:8000/health

# Should return: {"status":"ok"}
```

## Troubleshooting

### Port Already in Use
```bash
# Use a different port
docker run -p 8001:8000 bizgenie-backend
```

### Permission Issues
```bash
# Run with specific user (Linux)
docker run -p 8000:8000 --user $(id -u):$(id -g) bizgenie-backend
```

### View Logs
```bash
# If running in detached mode
docker logs bizgenie-backend

# Follow logs
docker logs -f bizgenie-backend
```

### Stop Container
```bash
docker stop bizgenie-backend
docker rm bizgenie-backend
```

## Production Deployment

For production, consider:
- Using Docker Compose (see root `docker-compose.yml`)
- Setting up reverse proxy (Nginx)
- Using environment variables from secrets management
- Setting resource limits
- Using health checks
- Setting up logging

Example with resource limits:
```bash
docker run -d \
  --name bizgenie-backend \
  -p 8000:8000 \
  --memory="512m" \
  --cpus="1.0" \
  -e GROQ_API_KEY=your_key \
  bizgenie-backend
```
