# 🎬 Video Generation - Developer Reference Card

## Quick Reference Commands

### Start Backend
```bash
cd backend
python main.py
```

### Start Frontend
```bash
pnpm dev
```

### Test Health
```bash
curl http://localhost:8000/health
```

### Generate Test Video
```bash
curl -X POST http://localhost:8000/api/generate-marketing-video \
  -H "Content-Type: application/json" \
  -d '{"brand_type": "Premium coffee brand"}'
```

### Download Generated Video
```bash
curl http://localhost:8000/api/download-video/video_1704834125.mp4 \
  -o video.mp4
```

---

## File Reference

| File | Location | Purpose |
|------|----------|---------|
| Main API | `backend/main.py` | FastAPI server, endpoints |
| Video Generator | `backend/agents/video_generation_agent.py` | Video generation logic |
| UI Component | `components/video-generator.tsx` | Frontend form & display |
| Marketing Page | `app/dashboard/marketing/page.tsx` | Page with tabs |
| Config | `backend/.env` | API keys |
| Dependencies | `backend/requirements.txt` | Python packages |

---

## API Endpoints

### POST /api/generate-marketing-video
**Request:**
```json
{
  "brand_type": "Premium clothing brand with seasonal discounts"
}
```

**Response (Success):**
```json
{
  "status": "success",
  "video_path": "backend/marketing_videos/video_1704834125.mp4",
  "duration": 23,
  "plan": {
    "search_terms": ["summer fashion", "clothing models", ...],
    "captions": ["Summer Style Awaits", ...],
    "voiceover": ["Discover the latest...", ...],
    "cta": "Shop the collection now"
  }
}
```

**Response (Error):**
```json
{
  "status": "error",
  "message": "Error description here"
}
```

### GET /api/download-video/{video_name}
**Returns:** MP4 file (video/mp4)

### GET /health
**Returns:** `{"status": "ok"}`

---

## Component Props & States

### VideoGeneratorComponent
**State:**
- `brandType: string` - User input
- `isGenerating: boolean` - Loading state
- `generatedVideo: object | null` - Result data
- `error: string` - Error message
- `status: string` - Status message

**Methods:**
- `handleGenerateVideo()` - POST to backend
- `handleDownloadVideo()` - Download file

---

## Configuration Quick Edit

### Video Parameters
**File:** `backend/agents/video_generation_agent.py`

```python
# Clip duration (seconds)
clip_duration = min(4, clip.duration)  # Change 4 to desired duration

# Output bitrate (quality)
bitrate="4000k"  # Lower = smaller file, Higher = better quality

# Frame rate
fps=30  # Standard for social media

# Video resolution
clip = clip.resize(height=1920)  # 1920 = height pixels

# Zoom effect speed
clip = clip.resize(lambda t: 1 + 0.02 * t)  # 0.02 = zoom speed

# Output codec preset
preset="fast"  # Options: ultrafast, superfast, veryfast, faster, fast, medium
```

### Groq Model Settings
```python
response = client.chat.completions.create(
    model="llama-3.3-70b-versatile",  # Alternative: "mixtral-8x7b-32768"
    temperature=0.7,  # 0 = deterministic, 1 = creative
)
```

### Pexels Video Search
```python
params = {
    "query": query, 
    "per_page": count,  # How many videos to fetch per search
    "orientation": "portrait"  # Options: portrait, landscape, square
}
```

---

## Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| API key not found | Check `.env` file in backend directory |
| Backend won't start | Check port 8000 not in use, Python 3.8+ |
| Video generation fails | Check internet, verify API keys, check logs |
| Slow generation | Normal for first run (2-5 min typical) |
| No videos found | Try simpler search terms, check Pexels quota |
| Memory issues | Reduce clip duration or bitrate |
| CORS errors | Verify backend is running on 8000 |

---

## Debugging

### Check Backend Logs
```bash
cd backend && python main.py
# Watch console output during video generation
```

### Enable Verbose Mode
Edit `backend/agents/video_generation_agent.py`:
```python
final.write_videofile(
    output,
    verbose=True,  # Change from False to True
    logger=None
)
```

### Check File System
```bash
# List generated videos
ls -la backend/marketing_videos/

# List temporary files
ls -la backend/marketing_videos/temp/

# Remove old temp files
rm -rf backend/marketing_videos/temp/*
```

### Monitor Network
Browser DevTools → Network tab
- Should show POST to `/api/generate-marketing-video`
- Watch for Groq/Pexels API calls
- Monitor download progress

---

## Performance Optimization

### Speed Up Generation
1. Reduce clip duration: Change `min(4, ...)` to `min(3, ...)`
2. Reduce output quality: Change `bitrate="4000k"` to `bitrate="2500k"`
3. Use faster preset: Change `preset="fast"` to `preset="faster"`
4. Reduce video resolution: Change `height=1920` to `height=1280`

### Save Disk Space
1. Delete temp files after generation (already done)
2. Reduce bitrate for smaller file sizes
3. Set up automatic cleanup of old videos

### Reduce Memory Usage
1. Reduce clip duration
2. Reduce output resolution
3. Use streaming output

---

## Testing Checklist

- [ ] Backend starts: `python main.py`
- [ ] Health check works: `curl http://localhost:8000/health`
- [ ] Frontend loads: `http://localhost:3000`
- [ ] Video Generator tab visible
- [ ] Can enter brand type
- [ ] Generate button works
- [ ] Status updates appear
- [ ] Video generated successfully
- [ ] Download button appears
- [ ] Video file downloads
- [ ] Video plays correctly

---

## Deployment Checklist

- [ ] API keys securely configured
- [ ] `.env` not in git repository
- [ ] Error handling tested
- [ ] Performance tested with larger payloads
- [ ] CORS configured for production domain
- [ ] File storage strategy defined
- [ ] Backup/cleanup plan for old videos
- [ ] Monitoring set up for API usage
- [ ] Rate limiting considered
- [ ] Logging configured

---

## Development Tips

### Hot Reload
Backend: Use `--reload` flag
```bash
python -m uvicorn main:app --reload --port 8000
```

Frontend: Already enabled with `pnpm dev`

### Testing Different Inputs
Keep a list of test cases:
```
"Premium coffee brand"
"E-commerce fashion store"
"Tech SaaS product"
"Local restaurant"
"Luxury jewelry brand"
```

### Monitor API Usage
Check Groq dashboard: https://console.groq.com
Check Pexels dashboard: https://www.pexels.com/api/

### Version Tracking
Keep track of which versions:
- First generation time
- Current average generation time
- Video quality metrics
- Error rate

---

## Code Structure

```
generate_video()
├─ Validate environment
├─ generate_marketing_plan()
│  └─ Groq API call
├─ Loop through search terms
│  ├─ fetch_pexels_videos()
│  │  └─ Pexels API call
│  └─ download_video()
│     └─ Save to temp/
├─ Loop through voiceovers
│  └─ generate_audio()
│     └─ pyttsx3 TTS
├─ build_marketing_video()
│  ├─ For each clip:
│  │  ├─ Load video
│  │  ├─ Resize & crop
│  │  ├─ Add zoom effect
│  │  ├─ Attach audio
│  │  ├─ create_bold_text_clip()
│  │  └─ Composite
│  ├─ Create CTA screen
│  └─ Render final MP4
└─ Return result
```

---

## Git Workflow

### Before Commit
1. Update .env in .gitignore
2. Remove temp video files
3. Test functionality
4. Update documentation if needed

### Useful Git Commands
```bash
# Check for .env in staging
git status

# Add everything except .env
git add -A
git reset backend/.env

# View what would be committed
git diff --cached

# Commit changes
git commit -m "Add video generation feature"
```

---

## Documentation Files

| Document | Purpose | Best For |
|----------|---------|----------|
| QUICK_START.md | 5-min setup | Getting started |
| VIDEO_GENERATION_GUIDE.md | Complete guide | Reference |
| SETUP_CHECKLIST.md | Verification steps | Testing |
| INTEGRATION_SUMMARY.md | What was done | Overview |
| ARCHITECTURE.md | System design | Understanding flow |
| IMPLEMENTATION_COMPLETE.md | Final summary | Documentation |
| Developer Reference (this file) | Quick lookup | Daily use |

---

## Key Files to Monitor

- `backend/main.py` - API endpoints
- `backend/agents/video_generation_agent.py` - Core logic
- `components/video-generator.tsx` - UI
- `backend/.env` - Configuration (don't commit!)
- `backend/requirements.txt` - Dependencies
- `backend/marketing_videos/` - Output folder

---

## Useful Resources

- FastAPI Docs: http://localhost:8000/docs
- Groq Console: https://console.groq.com
- Pexels API: https://www.pexels.com/api/
- moviepy Docs: https://zulko.github.io/moviepy/
- Next.js Docs: https://nextjs.org/docs

---

## Contact & Support

### Debug Information to Gather
- Python version: `python --version`
- pip list: `pip list`
- Node version: `node --version`
- pnpm version: `pnpm --version`
- OS: Windows/Mac/Linux
- Error messages: Full stack trace
- Steps to reproduce: Exact actions taken

### When Things Go Wrong
1. Check .env for API keys
2. Verify both servers running
3. Check browser console (F12)
4. Check backend console for errors
5. Review relevant guide (see Documentation Files above)
6. Gather debug information (see above)
7. Test individual components

---

**Last Updated:** January 10, 2026
**Status:** Production Ready ✅

