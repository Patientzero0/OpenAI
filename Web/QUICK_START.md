# Quick Start Guide - Video Generation Integration

## 🚀 5-Minute Setup

### Step 1: Get API Keys (5 minutes)

#### Groq API Key
1. Visit [https://console.groq.com](https://console.groq.com)
2. Sign up or log in with Google/GitHub
3. Navigate to "API Keys" in the sidebar
4. Click "Create New API Key"
5. Copy the key (starts with `gsk_`)

#### Pexels API Key
1. Visit [https://www.pexels.com/api/](https://www.pexels.com/api/)
2. Click "GET API KEY"
3. Sign up or log in
4. Copy your API key

### Step 2: Configure Environment

Edit `backend/.env`:

```env
GROQ_API_KEY=gsk_your_actual_key_here
PEXELS_API_KEY=your_pexels_key_here
```

### Step 3: Install Dependencies

**Windows:**
```bash
setup-video-generation.bat
```

**macOS/Linux:**
```bash
chmod +x setup-video-generation.sh
./setup-video-generation.sh
```

Or manually:
```bash
cd backend
pip install -r requirements.txt
cd ..
pnpm install
```

### Step 4: Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
python main.py
```

Expected output:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
```

**Terminal 2 - Frontend:**
```bash
pnpm dev
```

Expected output:
```
- Local:        http://localhost:3000
```

### Step 5: Generate Your First Video

1. Open [http://localhost:3000/dashboard/marketing](http://localhost:3000/dashboard/marketing)
2. Click "Video Generator" tab
3. Enter your brand type:
   - "Premium clothing brand with seasonal discounts"
   - "Tech startup offering cloud solutions"
   - "Local coffee shop with specialty drinks"
4. Click "Generate Marketing Video"
5. Wait 2-5 minutes for video to generate
6. Click "Download Video"

## ✅ Verification Checklist

- [ ] Python 3.8+ installed (`python --version`)
- [ ] API keys added to `backend/.env`
- [ ] Backend running on `http://localhost:8000/health` (returns `{"status": "ok"}`)
- [ ] Frontend running on `http://localhost:3000`
- [ ] Can navigate to Marketing Dashboard
- [ ] Video Generator tab visible

## 🔧 Troubleshooting

### "GROQ_API_KEY not found"
- Check `backend/.env` file exists
- Verify key is not empty: `GROQ_API_KEY=gsk_...`
- Restart backend server

### "Failed to connect to backend"
- Check backend is running: `http://localhost:8000/health`
- Verify port 8000 is not in use: `netstat -an | grep 8000` (Unix) or `netstat -ano | findstr :8000` (Windows)
- Try different port in `main.py`

### Video generation fails
- Check internet connection
- Verify Pexels API key works
- Try simpler brand type: "online store"
- Check backend console for detailed errors

### Slow video generation
- First run may be slower (loading dependencies)
- Large video downloads can take 1-2 minutes
- This is normal! ⏳

## 📊 What Gets Generated

Each video includes:
- ✅ 5 short clips (4 seconds each) from Pexels
- ✅ AI-generated marketing plan optimized for social media
- ✅ Dynamic captions (bold, outlined, on-brand)
- ✅ AI voiceovers (text-to-speech)
- ✅ Call-to-action (CTA) closing screen
- ✅ 20-30 second total duration
- ✅ 1080x1920 (9:16) aspect ratio (perfect for Instagram Reels/TikTok)
- ✅ MP4 format with H.264 codec

## 📁 File Structure

```
Web/
├── backend/
│   ├── main.py                          # FastAPI server
│   ├── requirements.txt                 # Python dependencies
│   ├── .env                             # API keys (add yours here!)
│   ├── agents/
│   │   ├── financial_analysis.py
│   │   └── video_generation_agent.py   # Video generation logic
│   └── marketing_videos/                # Generated videos output
│       └── temp/                        # Temporary working files
├── components/
│   ├── video-generator.tsx              # Video generator component
│   └── marketing-dashboard.tsx          # Marketing dashboard
├── app/dashboard/marketing/
│   └── page.tsx                         # Marketing page with tabs
├── VIDEO_GENERATION_GUIDE.md            # Full documentation
├── setup-video-generation.bat           # Windows setup
└── setup-video-generation.sh            # Unix/macOS setup
```

## 🎯 Example Inputs & Expected Outputs

### Input: "Premium coffee brand with artisan drinks"
**Expected Plan:**
- Search terms: latte, espresso machine, cafe aesthetic, barista, specialty coffee
- Captions: "Craft Your Perfect Cup", "Every Sip Matters", etc.
- CTA: "Visit our cafe today"

### Input: "E-commerce fashion store launching summer collection"
**Expected Plan:**
- Search terms: summer fashion, clothing models, beach lifestyle, shopping, trends
- Captions: "Summer Style Awaits", "Fresh Fashion", etc.
- CTA: "Shop the collection now"

### Input: "B2B SaaS project management tool"
**Expected Plan:**
- Search terms: business meeting, productivity, teamwork, office, collaboration
- Captions: "Streamline Your Workflow", "Team Success", etc.
- CTA: "Start your free trial"

## 💡 Pro Tips

1. **Be Specific**: Instead of "clothing store", try "sustainable fashion brand with eco-friendly products"
2. **Include Target Audience**: "Beauty brand for women over 50 with natural skincare"
3. **Mention Key Features**: "SaaS tool offering AI-powered analytics for small businesses"
4. **Set the Tone**: "Luxury jewelry brand with minimalist designs for professionals"

## 🆘 Getting Help

- **API Key Issues**: Check your Groq/Pexels account at their respective dashboards
- **Technical Issues**: Review `VIDEO_GENERATION_GUIDE.md` for detailed troubleshooting
- **Slow Performance**: This is normal on first run; subsequent runs are faster
- **Video Quality**: Higher bitrate = better quality (configurable in `video_generation_agent.py`)

## 🎬 Next Steps

1. Generate your first video
2. Download and preview it
3. Share on social media
4. Experiment with different brand types
5. Customize video settings (see guide for advanced options)

---

**Happy video generating! 🎉**
