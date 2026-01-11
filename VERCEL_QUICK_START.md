# 🚀 Vercel Deployment - Quick Start

## Step-by-Step Guide

### 1️⃣ Prepare Your Repository

Make sure your code is pushed to GitHub:
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2️⃣ Deploy to Vercel

**Option A: Via Dashboard (Easiest)**
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Project"
3. Select your GitHub repository
4. **IMPORTANT**: Set "Root Directory" to `Web`
5. Click "Deploy" (we'll add env vars after)

**Option B: Via CLI**
```bash
cd Web
npm i -g vercel
vercel login
vercel
```

### 3️⃣ Set Environment Variables

In Vercel Dashboard → Your Project → Settings → Environment Variables:

Add these **Required** variables:
```
NEXT_PUBLIC_BACKEND_URL = https://your-backend-url.com
GROQ_API_KEY = your_groq_api_key
NEXT_PUBLIC_DEEPAI_API_KEY = your_deepai_api_key
```

Add this **Optional** variable (for content generation):
```
GEMINI_API_KEY = your_gemini_api_key
```

### 4️⃣ Deploy Backend Separately

Since Vercel doesn't support Python, deploy backend on:

**Railway (Recommended):**
1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Select your repo
4. Set root directory: `Web/backend`
5. Add env var: `GROQ_API_KEY = your_key`
6. Copy the Railway URL → Use as `NEXT_PUBLIC_BACKEND_URL`

**Or Render:**
1. Go to [render.com](https://render.com)
2. New Web Service
3. Connect GitHub → Select repo
4. Root Directory: `Web/backend`
5. Build: `pip install -r requirements.txt`
6. Start: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### 5️⃣ Update Backend URL

1. Go back to Vercel
2. Update `NEXT_PUBLIC_BACKEND_URL` with your backend URL
3. Redeploy (or wait for auto-deploy)

### 6️⃣ Test Your Deployment

Visit your Vercel URL and test:
- ✅ Homepage loads
- ✅ Chat works
- ✅ Image generation works
- ✅ Backend API calls work

## 🎯 That's It!

Your site is now live at: `https://your-project.vercel.app`

## 📝 Important Notes

- **Root Directory**: Must be set to `Web` in Vercel settings
- **Backend**: Must be deployed separately (Railway/Render/etc.)
- **Environment Variables**: Must start with `NEXT_PUBLIC_` for browser access
- **CORS**: Update backend CORS to include your Vercel domain

## 🆘 Need Help?

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed instructions.
