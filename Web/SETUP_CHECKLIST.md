# 🎬 Video Generation Integration - Setup Checklist

## Pre-Setup

- [ ] Python 3.8+ installed on your system
- [ ] Node.js/npm/pnpm installed
- [ ] Git installed (optional, for version control)
- [ ] Internet connection available
- [ ] ~1GB free disk space for dependencies and videos

## API Keys

- [ ] Groq API key obtained
  - [ ] Visit https://console.groq.com
  - [ ] Create account or login
  - [ ] Generate API key
  - [ ] Copy key (format: `gsk_...`)

- [ ] Pexels API key obtained
  - [ ] Visit https://www.pexels.com/api/
  - [ ] Create account or login
  - [ ] Generate API key
  - [ ] Copy key

## Environment Configuration

- [ ] `.env` file exists in `backend/` directory
- [ ] `GROQ_API_KEY` added to `.env`
- [ ] `PEXELS_API_KEY` added to `.env`
- [ ] Keys are not empty or placeholder values
- [ ] `.env` is added to `.gitignore` (if using Git)

## Dependencies Installation

- [ ] Python dependencies installed
  ```bash
  cd backend && pip install -r requirements.txt
  ```
  - [ ] fastapi
  - [ ] uvicorn
  - [ ] python-dotenv
  - [ ] groq
  - [ ] requests
  - [ ] pyttsx3
  - [ ] moviepy
  - [ ] Pillow
  - [ ] numpy

- [ ] Node dependencies installed
  ```bash
  pnpm install
  ```

## Backend Setup

- [ ] `backend/agents/video_generation_agent.py` exists and is valid
- [ ] `backend/main.py` has been updated with:
  - [ ] `video_generation_agent` import
  - [ ] `VideoGenerationRequest` model
  - [ ] `/api/generate-marketing-video` endpoint
  - [ ] `/api/download-video/{video_name}` endpoint
  - [ ] `/health` endpoint
- [ ] `backend/marketing_videos/` directory created
- [ ] `backend/marketing_videos/temp/` directory created

## Frontend Setup

- [ ] `components/video-generator.tsx` exists and is valid
- [ ] `app/dashboard/marketing/page.tsx` updated with:
  - [ ] Tabs component import
  - [ ] VideoGeneratorComponent import
  - [ ] Two tabs: "Analytics & Insights" and "Video Generator"

## Documentation

- [ ] `VIDEO_GENERATION_GUIDE.md` exists
- [ ] `QUICK_START.md` exists
- [ ] `INTEGRATION_SUMMARY.md` exists
- [ ] `setup-video-generation.bat` exists (Windows)
- [ ] `setup-video-generation.sh` exists (Unix/macOS)

## Verification

### Backend Server
- [ ] Start backend: `cd backend && python main.py`
- [ ] Check health: `curl http://localhost:8000/health`
- [ ] Expected response: `{"status":"ok"}`
- [ ] No errors in console output
- [ ] Server runs on port 8000

### Frontend Server
- [ ] Start frontend: `pnpm dev`
- [ ] Open `http://localhost:3000` in browser
- [ ] Navigation works without errors
- [ ] Network requests show no CORS errors

### UI Components
- [ ] Navigate to `http://localhost:3000/dashboard/marketing`
- [ ] Marketing page loads successfully
- [ ] Two tabs visible: "Analytics & Insights" and "Video Generator"
- [ ] Can click between tabs without errors
- [ ] "Video Generator" tab displays:
  - [ ] "AI Marketing Video Generator" title
  - [ ] Brand type textarea
  - [ ] "Generate Marketing Video" button
  - [ ] Status messages area

## First Generation Test

- [ ] Enter test brand type: "Premium coffee brand"
- [ ] Click "Generate Marketing Video" button
- [ ] Status message appears: "Starting video generation..."
- [ ] Button shows loading state
- [ ] After 2-5 minutes:
  - [ ] Status updates with progress
  - [ ] Video generation completes
  - [ ] Success message displayed
  - [ ] Video details shown (duration, filename)
  - [ ] Download button appears and is clickable

### Video Download Test
- [ ] Click "Download Video" button
- [ ] Video file downloads to local machine
- [ ] File is named `video_*.mp4`
- [ ] File size is reasonable (~50-150MB)
- [ ] Video plays in default media player
- [ ] Audio is present
- [ ] Captions are visible

## Configuration (Optional)

- [ ] Reviewed `VIDEO_GENERATION_GUIDE.md` advanced section
- [ ] Considered custom video parameters if needed
- [ ] Reviewed performance optimization tips
- [ ] Reviewed troubleshooting section

## Production Deployment Prep

- [ ] API keys are securely managed (not in code)
- [ ] `.env` is properly ignored by git
- [ ] CORS settings reviewed for production
- [ ] File path security considered
- [ ] Rate limiting considered
- [ ] Error handling reviewed

## Documentation Review

- [ ] Read `QUICK_START.md` for overview
- [ ] Reviewed `VIDEO_GENERATION_GUIDE.md` sections of interest
- [ ] Understood video generation pipeline
- [ ] Familiar with API endpoints
- [ ] Know how to troubleshoot common issues

## Team Knowledge Transfer (if applicable)

- [ ] Team members have API keys
- [ ] Team members understand video generation workflow
- [ ] Documentation shared with team
- [ ] Setup guide accessible to team
- [ ] Support contact/resource identified

## Ongoing Maintenance

- [ ] Monitor API usage and costs
- [ ] Keep dependencies updated
- [ ] Monitor video generation quality
- [ ] Track any error patterns
- [ ] Plan for scaling if needed

---

## Troubleshooting Checklist

If something doesn't work, check:

### Backend Won't Start
- [ ] Python version is 3.8+: `python --version`
- [ ] All dependencies installed: `pip list | grep fastapi`
- [ ] Port 8000 is not in use
- [ ] `.env` file exists in `backend/`
- [ ] API keys are present in `.env`

### Frontend Won't Load
- [ ] Node dependencies installed: `pnpm install`
- [ ] Running on correct port: `http://localhost:3000`
- [ ] No console errors (F12 → Console tab)
- [ ] Backend server is running
- [ ] Network tab shows requests to `localhost:8000`

### Video Generation Fails
- [ ] Internet connection is working
- [ ] API keys are correct (not truncated/modified)
- [ ] Groq API key format is correct: `gsk_...`
- [ ] Pexels API key is valid
- [ ] Brand type is not empty
- [ ] Check backend console for error messages

### Video Download Issues
- [ ] Video was generated successfully (no errors)
- [ ] File exists in `backend/marketing_videos/`
- [ ] Browser allows downloads
- [ ] Sufficient disk space available
- [ ] Check download folder for file

---

## Success Indicators ✅

You're ready to go when:
1. ✅ Backend health check returns `{"status":"ok"}`
2. ✅ Frontend loads without console errors
3. ✅ Marketing dashboard is accessible
4. ✅ Video Generator tab is visible
5. ✅ Generated test video successfully
6. ✅ Downloaded and played video file
7. ✅ Video contains all expected elements (audio, captions, CTA)
8. ✅ No critical errors in console logs

---

## Quick Reference

**Folder Locations:**
- Backend: `Web/backend/`
- Frontend: `Web/`
- Generated Videos: `Web/backend/marketing_videos/`
- Video Component: `Web/components/video-generator.tsx`

**Key Files:**
- Backend Server: `backend/main.py`
- Video Generation: `backend/agents/video_generation_agent.py`
- Frontend Component: `components/video-generator.tsx`
- Configuration: `backend/.env`
- Docs: `QUICK_START.md`, `VIDEO_GENERATION_GUIDE.md`

**Useful URLs:**
- Local Frontend: `http://localhost:3000`
- Local Backend: `http://localhost:8000`
- Health Check: `http://localhost:8000/health`
- Marketing Dashboard: `http://localhost:3000/dashboard/marketing`
- Groq Console: `https://console.groq.com`
- Pexels API: `https://www.pexels.com/api/`

---

**Last Updated:** January 10, 2026

Good luck with your video generation setup! 🚀
