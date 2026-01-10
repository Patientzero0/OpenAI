
from fastapi import FastAPI, BackgroundTasks
from fastapi.responses import FileResponse
from pydantic import BaseModel
from agents.financial_analysis import get_financial_insight, analyze_what_if_scenario
from agents.video_generation_agent import generate_video
from agents.operations_analysis import get_operations_insight
app = FastAPI()

# ...existing code...

class OperationsData(BaseModel):
    data: dict
    question: str

# AI Operations Insights endpoint
@app.post("/api/generate-operations-insight")
async def generate_operations_insight(request: OperationsData):
    """
    Endpoint to generate operations insight based on provided data and a question.
    """
    insight = get_operations_insight(request.data, request.question)
    return {"insight": insight}
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

# CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class FinancialData(BaseModel):
    data: dict
    question: str

class WhatIfData(BaseModel):
    original_data: dict
    modified_data: dict

class VideoGenerationRequest(BaseModel):
    brand_type: str

@app.post("/api/generate-insight")
async def generate_insight(request: FinancialData):
    """
    Endpoint to generate financial insight based on provided data and a question.
    """
    insight = get_financial_insight(request.data, request.question)
    return {"insight": insight}

@app.post("/api/what-if-analysis")
async def what_if_analysis(request: WhatIfData):
    """
    Endpoint to analyze a what-if scenario.
    """
    analysis = analyze_what_if_scenario(request.original_data, request.modified_data)
    return {"analysis": analysis}

@app.post("/api/generate-marketing-video")
async def generate_marketing_video(request: VideoGenerationRequest):
    """
    Endpoint to generate a marketing video based on brand type.
    """
    result = generate_video(request.brand_type)
    return result

@app.get("/api/download-video/{video_name}")
async def download_video(video_name: str):
    """
    Endpoint to download a generated video.
    """
    video_path = f"backend/marketing_videos/{video_name}"
    if os.path.exists(video_path):
        return FileResponse(
            path=video_path,
            media_type="video/mp4",
            filename=video_name
        )
    return {"error": "Video not found"}

@app.get("/health")
async def health_check():
    """
    Health check endpoint.
    """
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
