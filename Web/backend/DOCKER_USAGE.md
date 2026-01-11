# Docker Usage for Backend

## Quick Start

### Build from Backend Directory

```bash
cd Web/backend
docker build -t bizgenie-backend .
```

### Run the Container

```bash
docker run -p 8000:8000 \
  -e GROQ_API_KEY=your_groq_api_key \
  bizgenie-backend
```

## Important Notes

### Build Context

The Dockerfile is designed to be run **from the `Web/backend` directory**:

```bash
cd Web/backend
docker build -t bizgenie-backend .
```

This ensures:
- ✅ `requirements.txt` is found correctly
- ✅ `main.py` is copied to `/app/main.py`
- ✅ `agents/` directory is copied correctly
- ✅ All paths work as expected

### Directory Structure in Container

When built from `Web/backend`, the container structure is:

```
/app/                    # WORKDIR
├── main.py             # FastAPI app
├── requirements.txt
├── agents/             # Agent modules
│   ├── financial_analysis.py
│   ├── marketing_analysis.py
│   ├── operations_analysis.py
│   └── video_generation_agent.py
└── backend/            # Created by Dockerfile
    └── marketing_videos/
        └── temp/       # Temporary video files
```

### Video Path Handling

The code is configured to handle multiple path scenarios:
- `backend/marketing_videos/` - For running from project root
- `marketing_videos/` - For running from backend directory
- `/app/backend/marketing_videos/` - For Docker container

The download endpoint in `main.py` will try all paths automatically.

## Common Commands

### Build
```bash
cd Web/backend
docker build -t bizgenie-backend .
```

### Run with Environment File
```bash
docker run -p 8000:8000 --env-file .env bizgenie-backend
```

### Run with Volume (persist videos)
```bash
docker run -p 8000:8000 \
  -e GROQ_API_KEY=your_key \
  -v $(pwd)/backend/marketing_videos:/app/backend/marketing_videos \
  bizgenie-backend
```

### Run in Background
```bash
docker run -d -p 8000:8000 \
  --name bizgenie-backend \
  -e GROQ_API_KEY=your_key \
  bizgenie-backend
```

### View Logs
```bash
docker logs bizgenie-backend
docker logs -f bizgenie-backend  # Follow logs
```

### Stop Container
```bash
docker stop bizgenie-backend
docker rm bizgenie-backend
```

## Troubleshooting

### "Cannot find module" errors
- Make sure you're building from `Web/backend` directory
- Check that all files are copied (use `docker build --no-cache` to rebuild)

### Video generation fails
- Ensure `ffmpeg` is installed (it's in the Dockerfile)
- Check disk space: `docker system df`
- Verify GROQ_API_KEY and PEXELS_API_KEY are set

### Port already in use
```bash
# Use different port
docker run -p 8001:8000 bizgenie-backend
```

## Using Build Scripts

### Linux/Mac
```bash
cd Web/backend
chmod +x docker-build.sh
./docker-build.sh
```

### Windows
```cmd
cd Web\backend
docker-build.bat
```

The scripts will build the image and show you how to run it.
