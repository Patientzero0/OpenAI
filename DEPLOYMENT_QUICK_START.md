# Quick Deployment Guide

## 🚀 Fastest Way: Docker Compose

1. **Create `.env` file in project root:**
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```

2. **Run:**
   ```bash
   docker-compose up -d
   ```

3. **Access:**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8000

## 📦 Environment Variables

### Frontend (Web/.env)
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
GROQ_API_KEY=your_key
NEXT_PUBLIC_DEEPAI_API_KEY=your_key
```

### Backend (Web/backend/.env)
```env
GROQ_API_KEY=your_key
PORT=8000
```

## 🌐 Production Deployment Options

### Option 1: Vercel (Frontend) + Railway (Backend)

**Frontend on Vercel:**
1. Connect GitHub repo to Vercel
2. Set root directory to `Web`
3. Add env vars: `NEXT_PUBLIC_BACKEND_URL`, `GROQ_API_KEY`, `NEXT_PUBLIC_DEEPAI_API_KEY`
4. Deploy

**Backend on Railway:**
1. Create new project
2. Add service from `Web/backend`
3. Add env var: `GROQ_API_KEY`
4. Deploy
5. Copy backend URL to frontend env var

### Option 2: Docker on VPS

1. **SSH into server**
2. **Clone repo**
3. **Create `.env` with API keys**
4. **Run:**
   ```bash
   docker-compose up -d
   ```
5. **Set up Nginx reverse proxy** (see DEPLOYMENT.md)

## ✅ Pre-Deployment Checklist

- [ ] All API keys configured
- [ ] Backend URL set correctly
- [ ] CORS configured for production domain
- [ ] Health check working: `/health`
- [ ] SSL/HTTPS enabled
- [ ] Environment variables secured

## 📚 Full Guide

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.
