# Video & Content Generation Integration Guide

## Overview

This document covers the complete integration of the AI-powered video generation system with your OpenAI Web application. The system uses Groq AI for marketing planning and Pexels API for video clips.

## Prerequisites

### 1. API Keys Required

You need to obtain two API keys:

#### Groq API Key
- Go to [Groq Console](https://console.groq.com)
- Sign up or log in
- Navigate to API keys section
- Create a new API key
- Copy and save it

#### Pexels API Key
- Go to [Pexels API](https://www.pexels.com/api/)
- Sign up or log in
- Request access to the API
- Copy your API key

### 2. Environment Setup

Update your `.env` file in the `backend/` directory:

```env
GROQ_API_KEY=your_actual_groq_api_key_here
PEXELS_API_KEY=your_actual_pexels_api_key_here
```

**Important:** Never commit `.env` files to version control. Add `.env` to your `.gitignore`.

## Installation

### 1. Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

Required packages:
- `fastapi` - Web framework
- `uvicorn` - ASGI server
- `python-dotenv` - Environment variables
- `groq` - Groq AI SDK
- `requests` - HTTP client
- `pyttsx3` - Text-to-speech
- `moviepy` - Video processing
- `Pillow` - Image processing
- `numpy` - Numerical computing

### 2. Install Node Dependencies (Frontend)

```bash
cd ..
pnpm install
```

## System Architecture

### Backend Structure

```
backend/
├── main.py                    # FastAPI application with endpoints
├── requirements.txt           # Python dependencies
├── .env                       # Environment variables
├── agents/
│   ├── financial_analysis.py
│   ├── video_generator.py     # Original standalone script
│   └── video_generation_agent.py  # New refactored agent module
└── marketing_videos/          # Output directory for generated videos
    └── temp/                  # Temporary files during generation
```

### API Endpoints

#### Generate Marketing Video
```
POST /api/generate-marketing-video
Content-Type: application/json

{
  "brand_type": "Premium clothing brand with limited-time discounts"
}

Response:
{
  "status": "success",
  "video_path": "backend/marketing_videos/video_1704834125.mp4",
  "duration": 23,
  "plan": {
    "search_terms": [...],
    "captions": [...],
    "voiceover": [...],
    "cta": "..."
  }
}
```

#### Download Video
```
GET /api/download-video/{video_name}

Example:
GET /api/download-video/video_1704834125.mp4
```

#### Other Endpoints
```
POST /api/generate-insight      # Financial insights
POST /api/what-if-analysis      # What-if scenarios
GET /health                     # Health check
```

## Frontend Integration

### New Components

#### VideoGeneratorComponent
Location: `components/video-generator.tsx`

Features:
- Brand type input textarea
- Real-time status updates
- Error handling with user-friendly messages
- Generated video details display
- Download button for video

#### Updated Marketing Page
Location: `app/dashboard/marketing/page.tsx`

Changes:
- Added tabbed interface
- Two tabs: "Analytics & Insights" and "Video Generator"
- Seamless integration with existing marketing dashboard

## Running the Application

### 1. Start the Backend Server

```bash
cd backend
python main.py
```

The server will start on `http://localhost:8000`

You can verify it's running by visiting:
```
http://localhost:8000/health
```

### 2. Start the Frontend

In another terminal:

```bash
pnpm dev
```

The frontend will be available at `http://localhost:3000`

## Usage Workflow

### Generating a Video

1. Navigate to the Marketing Dashboard (`/dashboard/marketing`)
2. Click on the "Video Generator" tab
3. Enter your brand type or business description:
   - Example: "Premium clothing brand with limited-time discounts"
   - Example: "Tech startup offering AI-powered solutions"
   - Example: "Local restaurant with authentic cuisine"
4. Click "Generate Marketing Video"
5. Wait for the process to complete (typically 2-5 minutes depending on)
   - Video clip download speeds
   - Audio generation time
   - Video compilation time
6. Once complete, review the generated content:
   - View video metadata (duration, file name)
   - See marketing plan details (captions, voiceover)
   - Download the video file

### Video Generation Process

The system performs the following steps:

1. **Marketing Plan Generation**
   - Uses Groq's Llama 3.3 70B model
   - Generates 5 search terms, captions, voiceovers, and CTA
   - Optimized for Instagram Reels/TikTok format

2. **Video Clip Sourcing**
   - Fetches portrait-orientation videos from Pexels
   - Downloads HD quality clips
   - Searches for 3 videos per term, uses the best available

3. **Audio Generation**
   - Converts voiceover text to speech using pyttsx3
   - Generates CTA audio narration
   - Creates natural-sounding dialogue

4. **Video Composition**
   - Resizes clips to 1080x1920 (9:16 aspect ratio)
   - Adds dynamic zoom effect
   - Overlays bold, outlined captions
   - Applies semi-transparent backgrounds for readability

5. **Final Assembly**
   - Concatenates all clips
   - Adds CTA screen with voiceover
   - Exports as MP4 (30fps, h264 codec)
   - Saves to `backend/marketing_videos/`

## Troubleshooting

### Error: "GROQ_API_KEY not found in .env file"
- Solution: Ensure you've added your Groq API key to `.env`
- Verify the `.env` file is in the `backend/` directory

### Error: "PEXELS_API_KEY not found in .env file"
- Solution: Add your Pexels API key to `.env`
- Check for typos in the key name

### Error: "Failed to connect to backend"
- Solution: Ensure backend server is running on port 8000
- Run: `cd backend && python main.py`
- Verify with: `curl http://localhost:8000/health`

### Error: "No videos found for certain keywords"
- Solution: This is normal for obscure terms
- The system automatically skips failed searches
- Uses available clips for video generation

### Video Generation Takes Too Long
- First run may take longer (dependencies installation)
- Subsequent runs are faster
- Large video downloads can take 1-2 minutes
- Video compilation typically takes 2-3 minutes

### Memory Issues During Video Processing
- Reduce clip duration in `video_generation_agent.py`
- Change `clip_duration = min(4, clip.duration)` to `min(3, ...)`
- Reduce bitrate in `write_videofile` call

## Configuration Customization

### Video Parameters

Edit `backend/agents/video_generation_agent.py`:

```python
# Clip duration (seconds)
clip_duration = min(4, clip.duration)

# Video resolution
clip = clip.resize(height=1920)

# Zoom effect speed
clip = clip.resize(lambda t: 1 + 0.02 * t)

# Output bitrate
final.write_videofile(..., bitrate="4000k", ...)

# Frame rate
final.write_videofile(..., fps=30, ...)
```

### AI Model Settings

Edit `backend/agents/video_generation_agent.py`:

```python
# Groq model (can also use "mixtral-8x7b-32768")
response = client.chat.completions.create(
    model="llama-3.3-70b-versatile",  # Change model here
    ...
)

# Temperature (0-1, higher = more creative)
temperature=0.7
```

### Video Search Parameters

```python
# Number of videos to fetch per search term
videos = fetch_pexels_videos(term, count=3)

# Video orientation (portrait, landscape, square)
"orientation": "portrait"
```

## File Locations

- **Generated Videos**: `backend/marketing_videos/`
- **Temporary Files**: `backend/marketing_videos/temp/`
- **Backend Code**: `backend/agents/video_generation_agent.py`
- **Frontend Component**: `components/video-generator.tsx`
- **API Routes**: `backend/main.py`

## Performance Considerations

### First Run
- May take 5-10 minutes
- Python dependencies need to be loaded
- Initial API connections

### Subsequent Runs
- Typically 2-5 minutes per video
- Depends on internet speed for video downloads
- No dependency overhead

### Optimization Tips
1. Use more specific brand descriptions for better video results
2. Run during off-peak hours to avoid rate limiting
3. Keep brand descriptions concise (1-2 sentences ideal)
4. Pre-warm the system with a simple test generation

## Limitations

1. **API Rate Limits**
   - Pexels: ~50 requests per hour
   - Groq: Check your plan at console.groq.com
   - Respect these limits in production

2. **Video Duration**
   - Current setup: ~20-30 seconds per video
   - Maximum practical: 60 seconds
   - Minimum practical: 10 seconds

3. **Content Quality**
   - Depends on available video clips
   - AI-generated voiceover has synthetic quality
   - Text-to-speech may vary by system

4. **File Size**
   - Typical output: 50-150 MB per video
   - High bitrate ensures quality
   - Can be reduced if needed

## Future Enhancements

Potential improvements:
1. Add video preview before download
2. Multiple video format exports
3. Custom music/background audio options
4. Advanced video effects and transitions
5. Batch generation support
6. Video quality/duration selection
7. Brand color and style customization
8. Integration with social media APIs for direct posting
9. Analytics on generated content performance
10. Custom model fine-tuning for better results

## Support & Debugging

### Enable Verbose Logging

Edit `backend/agents/video_generation_agent.py`:

```python
# Remove verbose=False for detailed output
final.write_videofile(
    output,
    fps=30,
    codec="libx264",
    audio_codec="aac",
    bitrate="4000k",
    preset="fast",
    verbose=True,  # Change to True
    logger=None
)
```

### Check Backend Logs

The backend prints detailed progress:
```
🎬 Generating AI marketing plan...
📥 Downloading videos from Pexels...
  Searching for: keyword1
  ✓ Downloaded clip 1
...
🎥 Building marketing video...
✅ Video created successfully!
```

### API Testing

Use curl or Postman:

```bash
curl -X POST http://localhost:8000/api/generate-marketing-video \
  -H "Content-Type: application/json" \
  -d '{"brand_type": "Premium clothing brand"}'
```

## License

This integration uses:
- Groq AI (API key required)
- Pexels (API key required)
- Open source libraries (FastAPI, moviepy, etc.)

Ensure you comply with respective license terms.
