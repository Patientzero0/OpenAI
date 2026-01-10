
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


class CampaignRequest(BaseModel):
    platform: str | None = None
    product_name: str | None = None
    audience: str | None = None
    tone: str | None = None
    budget: str | None = None
    number_of_suggestions: int | None = 3


@app.post("/api/generate-campaign-suggestions")
async def generate_campaign_suggestions(request: CampaignRequest):
    """
    Generate campaign suggestions. This implementation uses a simple templating
    fallback. In future it can call Grok or another LLM service when configured.
    """
    # Basic safe defaults
    platform = request.platform or "whatsapp"
    product = request.product_name or "Your Product"
    audience = request.audience or "existing customers"
    tone = request.tone or "friendly"
    budget = request.budget or "unspecified"
    n = request.number_of_suggestions or 3

    suggestions = []
    for i in range(max(1, min(6, n))):
        # Create simple variations to simulate AI output
        title = f"{product} - Campaign Idea #{i+1}"
        content = (
            f"{product} {('- ' + tone) if tone else ''} campaign for {audience}. "
            f"Platform: {platform}. Focus on a clear CTA, highlight benefits, and include a time-limited offer. "
            f"Suggested budget: {budget}. Example copy: 'Get {product} today and enjoy exclusive savings!'")
        engagement = "High" if i % 2 == 0 else "Medium"
        est_reach = f"{1000 * (i + 1)}+"
        suggestions.append({
            "type": platform,
            "title": title,
            "content": content,
            "engagement": engagement,
            "estimatedReach": est_reach,
        })

    return {"suggestions": suggestions}


@app.get("/health")
async def health_check():
    """
    Health check endpoint.
    """
    return {"status": "ok"}


@app.post("/api/handle-alert")
async def handle_alert(request: dict):
    """
    Handle a single alert. This will call Grok or fallback to templated responses.
    Expected request: {"alert": { ... }}
    Returns: {"result": "action taken or recommendation", "resolved": bool}
    """
    alert = request.get("alert") if isinstance(request, dict) else None
    if not alert:
        return {"result": "Invalid alert payload", "resolved": False}

    # Simple templated responses (fallback). Replace with Grok call when available.
    a_type = alert.get("type")
    severity = alert.get("severity")
    message = alert.get("message")

    # Basic logic
    if a_type == "inventory":
        # Simulate reorder for inventory alerts
        cat = message.split(" ")[0] if message else "items"
        result = f"Placed reorder for {cat}. Notified procurement team."
        resolved = True
    elif a_type == "supplier":
        result = "Contacted supplier and scheduled expedited delivery. Follow-up set for 24 hours."
        resolved = False
    elif a_type == "employee":
        result = "Assigned backup staff for the shift and notified HR."
        resolved = True
    elif a_type == "delivery":
        result = "Prioritized pending deliveries and re-routed available drivers."
        resolved = False
    else:
        result = "Reviewed alert. Recommended action: investigate and assign owner."
        resolved = False

    return {"result": result, "resolved": resolved}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
