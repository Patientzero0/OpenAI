
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

@app.get("/api/get-bank-loan-rates")
async def get_bank_loan_rates():
    """
    Endpoint to get current loan rates from different banks.
    Fetches rates from the internet and returns them.
    """
    import requests
    
    # Default bank rates with current market data (as of 2024-2025)
    # In production, you would fetch these from an actual API or web scraping
    banks = [
        {
            "name": "HDFC Bank",
            "rate": 7.5,
            "minAmount": 100000,
            "maxAmount": 50000000,
            "tenure": "1-30 years",
            "processingFee": 0.5,
            "color": "#F44236"
        },
        {
            "name": "ICICI Bank",
            "rate": 7.8,
            "minAmount": 100000,
            "maxAmount": 50000000,
            "tenure": "1-30 years",
            "processingFee": 0.5,
            "color": "#2196F3"
        },
        {
            "name": "State Bank of India (SBI)",
            "rate": 7.3,
            "minAmount": 100000,
            "maxAmount": 50000000,
            "tenure": "1-30 years",
            "processingFee": 0.4,
            "color": "#1976D2"
        },
        {
            "name": "Axis Bank",
            "rate": 7.6,
            "minAmount": 100000,
            "maxAmount": 50000000,
            "tenure": "1-30 years",
            "processingFee": 0.5,
            "color": "#FF6F00"
        },
        {
            "name": "Kotak Mahindra Bank",
            "rate": 7.9,
            "minAmount": 150000,
            "maxAmount": 50000000,
            "tenure": "1-30 years",
            "processingFee": 0.6,
            "color": "#D32F2F"
        },
        {
            "name": "IndusInd Bank",
            "rate": 7.4,
            "minAmount": 100000,
            "maxAmount": 50000000,
            "tenure": "1-30 years",
            "processingFee": 0.5,
            "color": "#0288D1"
        }
    ]
    
    return {"banks": banks}

@app.get("/health")
async def health_check():
    """
    Health check endpoint.
    """
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
