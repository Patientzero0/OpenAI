import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv(dotenv_path='.env')

api_key = os.environ.get("GROQ_API_KEY")
if not api_key:
    raise ValueError("GROQ_API_KEY not found in .env file")

client = Groq(api_key=api_key)

def get_operations_insight(data: dict, question: str) -> str:
    """
    Generates operations insight using Groq API based on the provided data and question.
    """
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are an operations management expert. Your task is to provide actionable insights and recommendations based on the operations data provided."
                },
                {
                    "role": "user",
                    "content": f"Here is the operations data: {data}. The user's question is: {question}"
                }
            ],
            model="llama-3.1-8b-instant",
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        return f"An error occurred: {e}"
