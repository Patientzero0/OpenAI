import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv(dotenv_path='.env')

api_key = os.environ.get("GROQ_API_KEY")
if not api_key:
    raise ValueError("GROQ_API_KEY not found in .env file")

client = Groq(api_key=api_key)

def get_marketing_insight(data: dict, question: str) -> str:
    """
    Generates marketing insight using Groq API based on the provided data and question.
    """
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are a marketing strategist and data analyst. Your task is to provide actionable marketing insights and recommendations based on campaign performance, customer sentiment, and engagement data provided."
                },
                {
                    "role": "user",
                    "content": f"Here is the marketing data: {data}. The user's question is: {question}"
                }
            ],
            model="llama-3.1-8b-instant",
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        return f"An error occurred: {e}"

def analyze_campaign_strategy(campaign_data: dict) -> str:
    """
    Analyzes campaign strategy and provides recommendations.
    """
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are a marketing strategist. Analyze the provided campaign data and suggest optimization strategies. Be concise but actionable."
                },
                {
                    "role": "user",
                    "content": f"Analyze this campaign data and suggest improvements: {campaign_data}"
                }
            ],
            model="llama-3.1-8b-instant",
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        return f"An error occurred: {e}"

def generate_campaign_suggestions(market_data: dict) -> str:
    """
    Generates AI-powered campaign suggestions based on market data.
    Always returns a string with exactly 3 suggestions.
    This is a pure synchronous function - NO ASYNC.
    """
    # Extract data with defaults
    platform = market_data.get('platform', 'Multi-channel')
    product = market_data.get('product_name', 'Your Product')
    audience = market_data.get('audience', 'General audience')
    tone = market_data.get('tone', 'Professional')
    budget = market_data.get('budget', 'Not specified')
    
    # Build the prompt
    prompt_text = f"""Generate exactly 3 marketing campaign suggestions based on this information:
- Platform: {platform}
- Product: {product}
- Target Audience: {audience}
- Tone: {tone}
- Budget: {budget}

Format EXACTLY as 3 numbered items (1. 2. 3.) with title and description. Write in English. Each item must have a title and brief description."""

    try:
        # Make the API call - this is synchronous
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are a creative marketing specialist. Generate exactly 3 specific campaign ideas. Format as 3 numbered items. Respond in English."
                },
                {
                    "role": "user",
                    "content": prompt_text
                }
            ],
            model="llama-3.1-8b-instant",
        )
        
        # Extract content safely
        try:
            response_content = chat_completion.choices[0].message.content
        except (AttributeError, IndexError, TypeError):
            response_content = None
        
        # Validate response
        if response_content is None:
            response_content = "1. Campaign One\n2. Campaign Two\n3. Campaign Three"
        
        # Convert to string
        result_str = str(response_content).strip()
        
        # Check for error patterns
        if len(result_str) < 10:
            result_str = "1. Campaign One\n2. Campaign Two\n3. Campaign Three"
        
        return result_str
        
    except Exception as e:
        # Return a formatted error response
        error_msg = str(e)
        if len(error_msg) > 100:
            error_msg = error_msg[:100]
        return f"1. Campaign One - {error_msg}\n2. Campaign Two\n3. Campaign Three"

