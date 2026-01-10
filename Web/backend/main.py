
from fastapi import FastAPI
from pydantic import BaseModel
from agents.financial_analysis import get_financial_insight, analyze_what_if_scenario
from fastapi.middleware.cors import CORSMiddleware

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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
