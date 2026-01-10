# 🏗️ Video Generation System - Architecture Overview

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         FRONTEND (Next.js/React)                        │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Marketing Dashboard (/dashboard/marketing)                            │
│  ┌─────────────────────────────────────────────────────────────┐      │
│  │                    Tabbed Interface                         │      │
│  │  ┌──────────────────────┐  ┌──────────────────────────┐  │      │
│  │  │ Analytics & Insights │  │ Video Generator (NEW)   │  │      │
│  │  │ (Existing)           │  │                         │  │      │
│  │  └──────────────────────┘  └──────────────────────────┘  │      │
│  │                              │                           │      │
│  │                      VideoGeneratorComponent             │      │
│  │                     (components/video-generator.tsx)     │      │
│  │                                                          │      │
│  │  ┌───────────────────────────────────────────────────┐ │      │
│  │  │ Brand Type Input (Textarea)                      │ │      │
│  │  │ Generate Button (Loading State)                  │ │      │
│  │  │ Status Messages (Real-time Updates)              │ │      │
│  │  │ Error Alerts                                     │ │      │
│  │  │ Success State with Video Details                 │ │      │
│  │  │ Download Button                                  │ │      │
│  │  └───────────────────────────────────────────────────┘ │      │
│  └─────────────────────────────────────────────────────────┘      │
│                              │                                      │
│                              ↓                                      │
│              HTTP POST to Backend API                              │
│              http://localhost:8000/api/generate-marketing-video   │
│                                                                   │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                    BACKEND (FastAPI/Python)                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  FastAPI Server (backend/main.py)                                     │
│  ┌─────────────────────────────────────────────────────────────┐      │
│  │ @app.post("/api/generate-marketing-video")                 │      │
│  │ async def generate_marketing_video(request)                │      │
│  └─────────────────────────────────────────────────────────────┘      │
│                         │                                             │
│                         ↓                                             │
│  Video Generation Agent (backend/agents/video_generation_agent.py)   │
│  ┌─────────────────────────────────────────────────────────────┐      │
│  │ generate_video(brand_type) - Main Entry Point              │      │
│  │                                                             │      │
│  │  Step 1: Marketing Plan Generation                        │      │
│  │  ├─→ Groq API (Llama 3.3 70B)                            │      │
│  │  └─→ Returns: [search_terms, captions, voiceovers, cta]  │      │
│  │                                                             │      │
│  │  Step 2: Video Clip Sourcing                             │      │
│  │  ├─→ Pexels API Search                                   │      │
│  │  └─→ Download HD Portrait Videos (4 sec each)            │      │
│  │                                                             │      │
│  │  Step 3: Audio Generation                                │      │
│  │  ├─→ pyttsx3 Text-to-Speech                             │      │
│  │  └─→ Generate Voiceovers + CTA                          │      │
│  │                                                             │      │
│  │  Step 4: Video Composition                               │      │
│  │  ├─→ PIL for Caption Creation                           │      │
│  │  ├─→ Resize to 1080x1920 (9:16 aspect)                 │      │
│  │  ├─→ Add Dynamic Zoom Effect                            │      │
│  │  └─→ Overlay Captions with Backgrounds                  │      │
│  │                                                             │      │
│  │  Step 5: Final Assembly                                  │      │
│  │  ├─→ moviepy Concatenation                              │      │
│  │  ├─→ Add CTA Screen with Voiceover                      │      │
│  │  ├─→ Render as MP4 (H.264, 30fps, AAC)                 │      │
│  │  └─→ Save to backend/marketing_videos/                 │      │
│  │                                                             │      │
│  └─────────────────────────────────────────────────────────────┘      │
│                         │                                             │
│                         ↓                                             │
│           Return JSON Response to Frontend                           │
│  {                                                                     │
│    "status": "success",                                               │
│    "video_path": "backend/marketing_videos/video_*.mp4",             │
│    "duration": 23,                                                    │
│    "plan": {                                                          │
│      "search_terms": [...],                                          │
│      "captions": [...],                                              │
│      "voiceover": [...],                                             │
│      "cta": "..."                                                    │
│    }                                                                  │
│  }                                                                     │
│                                                                       │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                  EXTERNAL APIs & Services                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Groq API (cloud.groq.com)                                            │
│  ├─ Llama 3.3 70B Model                                               │
│  └─ Generates Marketing Plans                                         │
│                                                                         │
│  Pexels API (api.pexels.com)                                          │
│  ├─ Video Search & Download                                           │
│  └─ Portrait-Oriented Stock Videos                                    │
│                                                                         │
│  Local System Services                                                │
│  ├─ pyttsx3 (System TTS)                                              │
│  ├─ PIL (Image Processing)                                            │
│  └─ moviepy (Video Processing)                                        │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                    Storage & Output                                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  backend/marketing_videos/                                            │
│  ├─ video_1704834125.mp4 (Generated MP4 File)                         │
│  ├─ video_1704834126.mp4 (Generated MP4 File)                         │
│  └─ temp/ (Temporary Processing Files)                                │
│     ├─ clip_0.mp4, clip_1.mp4, ...                                   │
│     ├─ voice_0.mp3, voice_1.mp3, ...                                  │
│     └─ voice_cta.mp3                                                  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

```
┌──────────────────────────────────────────────────────────────────────┐
│ User Input: Brand Type Description                                  │
└──────────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────────┐
│ Frontend: VideoGeneratorComponent                                    │
│ - Validates input                                                    │
│ - Shows loading state                                               │
│ - Sends POST request to /api/generate-marketing-video               │
└──────────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────────┐
│ Backend: generate_video(brand_type)                                 │
│ - Validates environment (API keys, directories)                     │
└──────────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────────┐
│ Step 1: Marketing Plan Generation                                   │
│ - Call Groq API with brand type                                     │
│ - Receive: search_terms[], captions[], voiceovers[], cta            │
└──────────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────────┐
│ Step 2: Video Clip Sourcing (Loop for each search term)            │
│ - Call Pexels API search                                            │
│ - Download HD video                                                 │
│ - Save to temp/clip_N.mp4                                           │
└──────────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────────┐
│ Step 3: Audio Generation (Loop for each voiceover)                 │
│ - Convert text to speech using pyttsx3                             │
│ - Save to temp/voice_N.mp3                                          │
│ - Generate CTA voiceover → temp/voice_cta.mp3                      │
└──────────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────────┐
│ Step 4: Video Composition (Loop for each clip)                     │
│ - Load clip video file                                              │
│ - Resize to 1080x1920                                               │
│ - Add zoom effect                                                   │
│ - Attach audio voiceover                                            │
│ - Create caption image with PIL                                     │
│ - Composite video + caption                                         │
└──────────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────────┐
│ Step 5: Final Assembly                                              │
│ - Concatenate all clip compositions                                 │
│ - Create CTA screen with voiceover                                  │
│ - Concatenate clips + CTA                                           │
│ - Render to MP4 file                                                │
│ - Save to marketing_videos/video_TIMESTAMP.mp4                      │
│ - Clean up temp files                                               │
└──────────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────────┐
│ Backend: Return Success Response                                     │
│ {                                                                    │
│   "status": "success",                                              │
│   "video_path": "backend/marketing_videos/video_1704834125.mp4",   │
│   "duration": 23,                                                   │
│   "plan": { search_terms, captions, voiceovers, cta }             │
│ }                                                                    │
└──────────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────────┐
│ Frontend: Display Success State                                      │
│ - Hide loading state                                                │
│ - Show video details                                                │
│ - Show marketing plan                                               │
│ - Enable download button                                            │
└──────────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────────┐
│ User: Download Video                                                │
│ - Click "Download Video" button                                     │
│ - Browser fetches from GET /api/download-video/video_*.mp4         │
│ - File downloaded to user's computer                               │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Component Interaction Diagram

```
                    Frontend Layer
                         │
        ┌────────────────┼────────────────┐
        │                │                │
    Marketing      VideoGenerator     Other Pages
    Dashboard      Component (NEW)     Components
        │                │                │
        │                │                │
        └────────────────┼────────────────┘
                         │
                    HTTP Requests
                    (REST API)
                         │
        ┌────────────────┼────────────────┐
        │                │                │
    POST /api/       GET /api/         GET
    generate-        download-         /health
    marketing-       video/
    video            video_*.mp4
        │                │                │
        └────────────────┼────────────────┘
                         │
                    Backend Layer
                         │
        ┌────────────────┼────────────────────────────────┐
        │                │                                │
    FastAPI        VideoGenerator            Financial
    Server         Agent Module               Analysis
    (main.py)      (NEW)                      Agent
        │                │
        │                │
        │     ┌──────────┼──────────┬──────────┬──────────┐
        │     │          │          │          │          │
        │  Groq API  Pexels API  PIL    pyttsx3    moviepy
        │  (Cloud)   (Cloud)    (Local) (Local)    (Local)
        │     │          │          │          │          │
        └─────┴──────────┴──────────┴──────────┴──────────┘
                         │
                    Storage Layer
                         │
        ┌────────────────┼────────────────┐
        │                │                │
    backend/         backend/          .env
    marketing_       agents/           (Configuration)
    videos/          (Code)
    (Generated)
```

---

## File Dependency Diagram

```
Frontend (Client-Side)
├── app/dashboard/marketing/page.tsx (MODIFIED)
│   ├── imports: VideoGeneratorComponent
│   └── imports: Tabs component
│
└── components/video-generator.tsx (NEW)
    ├── imports: Card, Button, Input, Textarea, Alert components
    ├── imports: lucide-react icons
    └── calls: http://localhost:8000/api/generate-marketing-video

Backend (Server-Side)
├── main.py (MODIFIED)
│   ├── imports: FastAPI, Pydantic models
│   ├── imports: agents/video_generation_agent
│   ├── imports: agents/financial_analysis
│   ├── middleware: CORS
│   └── endpoints:
│       ├── POST /api/generate-marketing-video
│       ├── GET /api/download-video/{video_name}
│       ├── POST /api/generate-insight
│       ├── POST /api/what-if-analysis
│       └── GET /health
│
├── requirements.txt (MODIFIED)
│   ├── fastapi
│   ├── uvicorn
│   ├── python-dotenv
│   ├── groq
│   ├── requests (NEW)
│   ├── pyttsx3 (NEW)
│   ├── moviepy (NEW)
│   ├── Pillow (NEW)
│   └── numpy (NEW)
│
├── .env (MODIFIED)
│   ├── GROQ_API_KEY
│   └── PEXELS_API_KEY (NEW)
│
└── agents/
    ├── video_generation_agent.py (NEW)
    │   ├── imports: os, json, requests
    │   ├── imports: numpy, pyttsx3, groq
    │   ├── imports: PIL, moviepy
    │   ├── functions:
    │   │   ├── generate_video(brand_type)
    │   │   ├── generate_marketing_plan(brand_type)
    │   │   ├── fetch_pexels_videos(query)
    │   │   ├── download_video(url, filename)
    │   │   ├── generate_audio(text, filename)
    │   │   ├── create_bold_text_clip(...)
    │   │   └── build_marketing_video(...)
    │   └── API calls:
    │       ├── Groq API (generate_marketing_plan)
    │       └── Pexels API (fetch_pexels_videos)
    │
    └── financial_analysis.py (EXISTING)

External Services
├── Groq API (cloud.groq.com)
│   └── Llama 3.3 70B Model
│
└── Pexels API (api.pexels.com)
    └── Stock Video Search & Download
```

---

## Technology Stack

```
Frontend
├── Framework: Next.js 14 (React)
├── Language: TypeScript/JavaScript
├── Styling: Tailwind CSS
├── UI Components: shadcn/ui
├── HTTP Client: Fetch API (browser native)
└── State Management: React Hooks

Backend
├── Framework: FastAPI
├── Server: Uvicorn
├── Language: Python 3.8+
├── API Type: REST
├── Async: asyncio/ASGI

Video Processing
├── Video Editing: moviepy
├── Image Processing: PIL (Pillow)
├── Audio Generation: pyttsx3 (local TTS)
├── Numerical: numpy
└── HTTP Requests: requests

External APIs
├── AI/LLM: Groq (Llama 3.3 70B)
├── Stock Videos: Pexels
└── Delivery: Cloud-based APIs

Infrastructure
├── Backend Port: 8000
├── Frontend Port: 3000
├── Database: None (stateless)
├── File Storage: Local filesystem
└── Environment: .env configuration
```

---

## Performance Characteristics

```
Generation Timeline (Typical)
├─ Setup & Validation: 1-2 seconds
├─ Marketing Plan Generation (Groq API): 5-10 seconds
├─ Video Clips Download (Pexels): 30-60 seconds (per clip)
├─ Audio Generation (pyttsx3): 10-20 seconds
├─ Video Composition (moviepy): 60-120 seconds
└─ Final Rendering: 30-60 seconds
   └─ TOTAL: 2-5 minutes

Resource Usage (Peak)
├─ CPU: Moderate (video encoding)
├─ Memory: ~500MB (during rendering)
├─ Disk: ~200MB (temp files + output)
├─ Network: ~100-200MB (video downloads)
└─ API Calls: 1 (Groq) + 5 (Pexels search) + 5 (downloads)

Caching Opportunities
├─ API Responses: Could cache marketing plans
├─ Video Clips: Could reuse popular clips
├─ Audio Files: Could cache TTS output
└─ Compiled Videos: Kept for download
```

---

## Error Handling Flow

```
Input Validation
├─ Brand type empty? → User error alert
└─ Valid? → Continue

API Key Validation
├─ GROQ_API_KEY missing? → Startup error
├─ PEXELS_API_KEY missing? → Startup error
└─ Valid? → Continue

Marketing Plan Generation
├─ Groq API error? → Return error response
├─ JSON parse error? → Handle gracefully
└─ Success? → Continue

Video Sourcing
├─ Pexels search fails? → Skip term
├─ Download fails? → Retry, then skip
├─ No videos found? → Try next term
├─ All terms fail? → Return error response
└─ Success? → Continue

Audio Generation
├─ TTS fails? → Continue without audio
└─ Success? → Attach to clip

Video Rendering
├─ Encoding fails? → Return error response
└─ Success? → Return success response
```

---

## Security Considerations

```
Input
├─ User input (brand type): Passed directly to LLM
│  └─ Risk: Prompt injection (low risk as it's descriptive text)
└─ Mitigations: Input validation, sanitization

API Keys
├─ Stored in .env file
├─ Never logged or exposed in responses
├─ Should be rotated regularly
└─ Mitigations: .gitignore, environment variables

File Handling
├─ Generated videos saved to filesystem
├─ Download endpoint uses variable path
├─ Temporary files cleaned up
└─ Mitigations: Path validation, cleanup routines

CORS
├─ Currently open to all origins (* )
├─ Fine for development
└─ Should be restricted in production

Data Privacy
├─ No user data stored
├─ API calls to external services (Groq, Pexels)
├─ Generated videos deleted after download (optional)
└─ Mitigations: Privacy policy, data handling docs
```

---

This architecture is designed for:
✅ Scalability - Can be deployed to cloud services
✅ Maintainability - Clear separation of concerns
✅ Extensibility - Easy to add new features
✅ Reliability - Error handling throughout
✅ Performance - Optimized video processing
✅ Security - API key management, input validation

