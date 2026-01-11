# Deployment Guide

This guide covers deploying the BizGenie application, which consists of a Next.js frontend and a FastAPI Python backend.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Variables](#environment-variables)
3. [Local Development Setup](#local-development-setup)
4. [Docker Deployment](#docker-deployment)
5. [Vercel Deployment (Frontend)](#vercel-deployment-frontend)
6. [Railway Deployment](#railway-deployment)
7. [Manual Deployment](#manual-deployment)
8. [Troubleshooting](#troubleshooting)

## Prerequisites

- Node.js 20+ and npm
- Python 3.11+
- Docker and Docker Compose (for containerized deployment)
- Git

## Environment Variables

### Frontend (.env in Web directory)

Create a `.env` file in the `Web` directory:

```env
# Backend API URL
# For local development: http://localhost:8000
# For production: https://your-backend-domain.com
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000

# Groq API Key (for chat functionality)
GROQ_API_KEY=your_groq_api_key_here

# DeepAI API Key (for image generation)
NEXT_PUBLIC_DEEPAI_API_KEY=your_deepai_api_key_here
```

### Backend (.env in Web/backend directory)

Create a `.env` file in the `Web/backend` directory:

```env
# Groq API Key for AI features
GROQ_API_KEY=your_groq_api_key_here

# Backend Server Configuration
PORT=8000
HOST=0.0.0.0

# CORS Origins (comma-separated)
CORS_ORIGINS=http://localhost:3000,https://your-frontend-domain.com
```

## Local Development Setup

### 1. Install Frontend Dependencies

```bash
cd Web
npm install
```

### 2. Install Backend Dependencies

```bash
cd Web/backend
pip install -r requirements.txt
```

### 3. Set Up Environment Variables

Copy the example environment files and fill in your API keys:

```bash
# Frontend
cp .env.example .env
# Edit .env with your values

# Backend
cd backend
cp .env.example .env
# Edit .env with your values
```

### 4. Start Backend Server

```bash
cd Web/backend
python main.py
# Or: uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The backend will be available at `http://localhost:8000`

### 5. Start Frontend Development Server

In a new terminal:

```bash
cd Web
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Docker Deployment

### Quick Start with Docker Compose

1. **Set Environment Variables**

   Create a `.env` file in the project root:

   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```

2. **Build and Run**

   ```bash
   docker-compose up -d
   ```

   This will:
   - Build both frontend and backend containers
   - Start the backend on port 8000
   - Start the frontend on port 3000
   - Set up networking between services

3. **Access the Application**

   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - Backend Health Check: http://localhost:8000/health

### Individual Docker Builds

#### Frontend Only

```bash
cd Web
docker build -t bizgenie-frontend .
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_BACKEND_URL=http://your-backend-url:8000 \
  bizgenie-frontend
```

#### Backend Only

```bash
cd Web/backend
docker build -t bizgenie-backend .
docker run -p 8000:8000 \
  -e GROQ_API_KEY=your_key \
  -v $(pwd)/marketing_videos:/app/backend/marketing_videos \
  bizgenie-backend
```

## Vercel Deployment (Frontend)

Vercel is ideal for deploying the Next.js frontend.

### Steps

1. **Install Vercel CLI** (optional)

   ```bash
   npm i -g vercel
   ```

2. **Deploy from Web Directory**

   ```bash
   cd Web
   vercel
   ```

   Or connect your GitHub repository to Vercel dashboard.

3. **Configure Environment Variables**

   In Vercel dashboard, go to your project → Settings → Environment Variables:

   - `NEXT_PUBLIC_BACKEND_URL`: Your backend URL (e.g., `https://your-backend.railway.app`)
   - `GROQ_API_KEY`: Your Groq API key
   - `NEXT_PUBLIC_DEEPAI_API_KEY`: Your DeepAI API key

4. **Update vercel.json**

   Edit `Web/vercel.json` and update the backend URL in rewrites:

   ```json
   {
     "rewrites": [
       {
         "source": "/api/backend/:path*",
         "destination": "https://your-backend-url.com/api/:path*"
       }
     ]
   }
   ```

5. **Redeploy**

   ```bash
   vercel --prod
   ```

## Railway Deployment

Railway can deploy both frontend and backend.

### Backend Deployment

1. **Create New Project** on Railway
2. **Connect GitHub Repository**
3. **Add Service** → Select `Web/backend` directory
4. **Set Environment Variables**:
   - `GROQ_API_KEY`
   - `PORT=8000`
5. **Deploy** - Railway will auto-detect Python and install dependencies

### Frontend Deployment

1. **Add Another Service** in the same project
2. **Select** `Web` directory
3. **Set Environment Variables**:
   - `NEXT_PUBLIC_BACKEND_URL`: Use the backend service URL from Railway
   - `GROQ_API_KEY`
   - `NEXT_PUBLIC_DEEPAI_API_KEY`
4. **Set Build Command**: `npm install && npm run build`
5. **Set Start Command**: `npm start`
6. **Deploy**

## Manual Deployment

### Backend (Linux Server)

1. **SSH into your server**

2. **Clone repository**

   ```bash
   git clone <your-repo-url>
   cd OpenAI/Web/backend
   ```

3. **Set up Python environment**

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

4. **Create .env file**

   ```bash
   cp .env.example .env
   nano .env  # Edit with your values
   ```

5. **Install system dependencies**

   ```bash
   sudo apt-get update
   sudo apt-get install -y ffmpeg python3-pip
   ```

6. **Run with process manager (PM2 or systemd)**

   **Using PM2:**
   ```bash
   npm install -g pm2
   pm2 start "uvicorn main:app --host 0.0.0.0 --port 8000" --name bizgenie-backend
   pm2 save
   pm2 startup
   ```

   **Using systemd:**
   Create `/etc/systemd/system/bizgenie-backend.service`:
   ```ini
   [Unit]
   Description=BizGenie Backend
   After=network.target

   [Service]
   User=your-user
   WorkingDirectory=/path/to/Web/backend
   Environment="PATH=/path/to/venv/bin"
   ExecStart=/path/to/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000

   [Install]
   WantedBy=multi-user.target
   ```

   Then:
   ```bash
   sudo systemctl enable bizgenie-backend
   sudo systemctl start bizgenie-backend
   ```

7. **Set up reverse proxy (Nginx)**

   ```nginx
   server {
       listen 80;
       server_name your-backend-domain.com;

       location / {
           proxy_pass http://localhost:8000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

### Frontend (Linux Server)

1. **Build the application**

   ```bash
   cd Web
   npm install
   npm run build
   ```

2. **Run production server**

   ```bash
   npm start
   ```

   Or use PM2:
   ```bash
   pm2 start npm --name bizgenie-frontend -- start
   ```

3. **Set up reverse proxy (Nginx)**

   ```nginx
   server {
       listen 80;
       server_name your-frontend-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

## Troubleshooting

### Backend Issues

**Problem**: Backend not starting
- Check if port 8000 is available: `lsof -i :8000`
- Verify environment variables are set correctly
- Check logs: `pm2 logs bizgenie-backend` or `journalctl -u bizgenie-backend`

**Problem**: CORS errors
- Update `CORS_ORIGINS` in backend `.env` to include your frontend URL
- Check backend `main.py` CORS middleware configuration

**Problem**: Video generation fails
- Ensure `ffmpeg` is installed: `ffmpeg -version`
- Check disk space for video output directory
- Verify `marketing_videos` directory has write permissions

### Frontend Issues

**Problem**: Cannot connect to backend
- Verify `NEXT_PUBLIC_BACKEND_URL` is set correctly
- Check backend is running and accessible
- Test backend health: `curl https://your-backend-url/health`

**Problem**: Build fails
- Clear `.next` directory: `rm -rf .next`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be 20+)

**Problem**: Environment variables not working
- Remember: Only `NEXT_PUBLIC_*` variables are available in the browser
- Restart dev server after changing `.env` files
- For production, set variables in your hosting platform

### Docker Issues

**Problem**: Containers not communicating
- Check Docker network: `docker network ls`
- Verify service names in `docker-compose.yml` match
- Check logs: `docker-compose logs`

**Problem**: Build fails
- Clear Docker cache: `docker system prune -a`
- Check Dockerfile syntax
- Verify all required files are present

## Production Checklist

- [ ] All environment variables configured
- [ ] Backend health check endpoint working (`/health`)
- [ ] CORS configured for production frontend URL
- [ ] SSL/HTTPS enabled (use Let's Encrypt or Cloudflare)
- [ ] Database backups configured (if applicable)
- [ ] Monitoring and logging set up
- [ ] Error tracking configured (Sentry, etc.)
- [ ] CDN configured for static assets
- [ ] Rate limiting configured on backend
- [ ] API keys secured and not exposed in client code

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review application logs
3. Verify environment configuration
4. Check GitHub issues (if applicable)
