# Vercel Deployment Guide

Complete guide for deploying your BizGenie frontend to Vercel.

## 📋 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Backend Deployment**: Your FastAPI backend needs to be deployed separately (Railway, Render, etc.)

## 🚀 Quick Deployment Steps

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Click "Import Project"

2. **Connect GitHub Repository**
   - Select your repository
   - Vercel will auto-detect it's a Next.js project

3. **Configure Project Settings**
   - **Root Directory**: Set to `Web` (important!)
   - **Framework Preset**: Next.js (auto-detected)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

4. **Set Environment Variables**
   Click "Environment Variables" and add:
   
   ```
   NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.com
   GROQ_API_KEY=your_groq_api_key_here
   NEXT_PUBLIC_DEEPAI_API_KEY=your_deepai_api_key_here
   GEMINI_API_KEY=your_gemini_api_key_here (optional, for content generation)
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live at `your-project.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Navigate to Web Directory**
   ```bash
   cd Web
   ```

4. **Deploy**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Link to existing project or create new
   - Confirm settings
   - Deploy to production? (Y)

5. **Set Environment Variables**
   ```bash
   vercel env add NEXT_PUBLIC_BACKEND_URL
   vercel env add GROQ_API_KEY
   vercel env add NEXT_PUBLIC_DEEPAI_API_KEY
   vercel env add GEMINI_API_KEY
   ```

6. **Redeploy with Environment Variables**
   ```bash
   vercel --prod
   ```

## ⚙️ Configuration Details

### Root Directory Setup

Since your Next.js app is in the `Web` directory, you need to configure Vercel:

**In Vercel Dashboard:**
1. Go to Project Settings → General
2. Set "Root Directory" to `Web`
3. Save

**Or in `vercel.json` (already configured):**
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

### Environment Variables

#### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_BACKEND_URL` | Your backend API URL | `https://your-backend.railway.app` |
| `GROQ_API_KEY` | Groq API key for chat | `gsk_...` |
| `NEXT_PUBLIC_DEEPAI_API_KEY` | DeepAI key for image generation | `your-key` |

#### Optional Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `GEMINI_API_KEY` | Google Gemini API key | `AIzaSy...` |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Alternative name for Gemini key | `AIzaSy...` |

### Backend URL Configuration

Your backend needs to be deployed separately. Options:

1. **Railway** (Recommended)
   - Deploy `Web/backend` directory
   - Get the URL: `https://your-app.railway.app`
   - Use this as `NEXT_PUBLIC_BACKEND_URL`

2. **Render**
   - Deploy FastAPI backend
   - Get the URL: `https://your-app.onrender.com`
   - Use this as `NEXT_PUBLIC_BACKEND_URL`

3. **VPS/Server**
   - Deploy backend manually
   - Use your domain: `https://api.yourdomain.com`
   - Use this as `NEXT_PUBLIC_BACKEND_URL`

## 🔧 Backend Deployment (Separate Service)

Since Vercel doesn't support Python/FastAPI, deploy your backend separately:

### Option 1: Railway (Easiest)

1. **Go to Railway**
   - Visit [railway.app](https://railway.app)
   - Create new project

2. **Deploy Backend**
   - Add new service
   - Connect GitHub repository
   - Set root directory to `Web/backend`
   - Railway auto-detects Python

3. **Set Environment Variables**
   ```
   GROQ_API_KEY=your_key
   PORT=8000
   ```

4. **Get Backend URL**
   - Railway provides a URL like: `https://your-app.railway.app`
   - Use this in your frontend's `NEXT_PUBLIC_BACKEND_URL`

### Option 2: Render

1. **Create New Web Service**
2. **Connect Repository**
3. **Settings:**
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Root Directory: `Web/backend`

### Option 3: Fly.io

1. **Install Fly CLI**: `curl -L https://fly.io/install.sh | sh`
2. **Create `fly.toml`** in `Web/backend`:
   ```toml
   app = "your-app-name"
   primary_region = "iad"
   
   [build]
   
   [http_service]
     internal_port = 8000
     force_https = true
     auto_stop_machines = true
     auto_start_machines = true
     min_machines_running = 0
   
   [[services]]
     protocol = "tcp"
     internal_port = 8000
   ```
3. **Deploy**: `fly deploy`

## 🔄 Updating Environment Variables

### Via Dashboard
1. Go to Project Settings → Environment Variables
2. Add/Edit variables
3. Redeploy (automatic or manual)

### Via CLI
```bash
# Add new variable
vercel env add VARIABLE_NAME

# List all variables
vercel env ls

# Remove variable
vercel env rm VARIABLE_NAME
```

## 🌐 Custom Domain Setup

1. **Add Domain in Vercel**
   - Go to Project Settings → Domains
   - Add your domain: `yourdomain.com`

2. **Configure DNS**
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Or A record with Vercel's IP addresses

3. **SSL Certificate**
   - Vercel automatically provisions SSL certificates
   - Wait a few minutes for DNS propagation

## 📝 Post-Deployment Checklist

- [ ] Backend is deployed and accessible
- [ ] `NEXT_PUBLIC_BACKEND_URL` points to your backend
- [ ] All API keys are set in Vercel environment variables
- [ ] Test frontend → backend communication
- [ ] Test all features (chat, image generation, etc.)
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Analytics set up (optional)

## 🐛 Troubleshooting

### Build Fails

**Error: Cannot find module**
- Ensure `package.json` is in the `Web` directory
- Check that root directory is set to `Web` in Vercel

**Error: Environment variables not found**
- Variables must start with `NEXT_PUBLIC_` to be available in browser
- Redeploy after adding environment variables

### Backend Connection Issues

**CORS Errors**
- Update backend CORS settings to include your Vercel domain
- Add `https://your-project.vercel.app` to allowed origins

**404 on API calls**
- Verify `NEXT_PUBLIC_BACKEND_URL` is correct
- Check backend is running and accessible
- Test backend health: `curl https://your-backend-url/health`

### API Routes Not Working

**Chat API fails**
- Ensure `GROQ_API_KEY` is set
- Check API key is valid

**Image generation fails**
- Ensure `NEXT_PUBLIC_DEEPAI_API_KEY` is set
- Verify API key has credits

## 📊 Monitoring

### Vercel Analytics
- Enable in Project Settings → Analytics
- View real-time metrics

### Function Logs
- View in Vercel Dashboard → Deployments → Functions
- Check for errors and performance

## 🔐 Security Best Practices

1. **Never commit API keys**
   - Use environment variables only
   - Add `.env` to `.gitignore`

2. **Use Vercel Environment Variables**
   - Don't hardcode secrets
   - Use different keys for production/preview

3. **Backend Security**
   - Enable CORS properly
   - Use HTTPS only
   - Rate limit API endpoints

## 🚀 Continuous Deployment

Vercel automatically deploys on:
- Push to `main` branch → Production
- Push to other branches → Preview deployment
- Pull requests → Preview deployment

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Environment Variables](https://vercel.com/docs/environment-variables)

## ✅ Success!

Once deployed, your site will be available at:
- Production: `https://your-project.vercel.app`
- Custom domain: `https://yourdomain.com` (if configured)

Test your deployment:
1. Visit your Vercel URL
2. Test chat functionality
3. Test image generation
4. Verify backend connectivity

Need help? Check Vercel's [support documentation](https://vercel.com/support) or your deployment logs.
