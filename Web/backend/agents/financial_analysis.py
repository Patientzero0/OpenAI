
import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv(dotenv_path='.env')

api_key = os.environ.get("GROQ_API_KEY")
if not api_key:
    raise ValueError("GROQ_API_KEY not found in .env file")

client = Groq(api_key=api_key)


def find_profitable_months_local(data):
    max_net = -float('inf')
    profitable_months = []
    for month_data in data.get('cashflowData', []):
        month = month_data['month']
        net = month_data['net']
        if net > max_net:
            max_net = net
            profitable_months = [month]
        elif net == max_net:
            profitable_months.append(month)
    
    if not profitable_months:
        return "No profitable months found in the data."
    elif len(profitable_months) == 1:
        return f"The most profitable month is {profitable_months[0]} with a net profit of ₹{max_net}."
    else:
        return f"The most profitable months are {', '.join(profitable_months)} (tied) with a net profit of ₹{max_net}."


def get_financial_insight(data: dict, question: str) -> str:
    """
    Generates financial insight using Groq API based on the provided data and question.
    """
    # Pre-calculate profitable months
    profitable_months_insight = find_profitable_months_local(data)

    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are a financial analyst. Your task is to provide insights based on the financial data provided. Always include the profitable months insight if relevant to the question."
                },
                {
                    "role": "user",
                    "content": f"Here is the financial data: {data}. "
                               f"Pre-calculated profitable months insight: {profitable_months_insight}. "
                               f"The user's question is: {question}"
                }
            ],
            model="llama-3.1-8b-instant",
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        return f"An error occurred: {e}"


def analyze_what_if_scenario(original_data: dict, modified_data: dict) -> str:
    """
    Analyzes a what-if scenario by comparing original and modified financial data.
    Adjusts the prompt based on the complexity of the modified_data.
    """
    try:
        # Check if modified_data is a simple revenue/expense update
        is_simple_revenue_expense_update = False
        if isinstance(modified_data, dict) and all(key in modified_data for key in ["Monthly revenue", "Monthly expenses"]):
            # Further check if there are only these keys (and potentially 'Monthly profit')
            if len(modified_data) <= 3 and all(key in ["Monthly revenue", "Monthly expenses", "Monthly profit"] for key in modified_data.keys()):
                is_simple_revenue_expense_update = True

        if is_simple_revenue_expense_update:
            system_content = (
                "You are a financial analyst. Your task is to provide a concise financial analysis "
                "comparing the original and modified monthly revenue and expenses. "
                "Format your response as follows:\n"
                "1. Start with a brief introductory sentence about the scenario\n"
                "2. Use bullet points (starting with '-') for key findings\n"
                "3. Keep the analysis clear and well-spaced\n"
                "4. Highlight the financial impact (increase/decrease in profit)\n"
                "5. Provide practical insights about what this means for the business\n"
                "Do NOT use asterisks (**) for formatting. Use clean bullet points with dashes (-)."
            )
            user_content = (
                f"Here is the original financial data: {original_data}. "
                f"Here is the modified scenario with new monthly revenue and expenses: {modified_data}. "
                f"Please provide a concise analysis of the financial impact with proper formatting."
            )
        else:
            system_content = (
                "You are a financial analyst. Your task is to analyze a what-if scenario and provide a comprehensive breakdown of the financial impact. "
                "Format your response as follows:\n"
                "1. Start with a brief summary of the comparison\n"
                "2. Create a section titled 'Pros of the Modified Scenario:' with bullet points (starting with '-')\n"
                "3. Create a section titled 'Cons of the Modified Scenario:' with bullet points (starting with '-')\n"
                "4. Create a section titled 'Mitigation Strategies:' with bullet points (starting with '-')\n"
                "5. Use clear line breaks between sections for better readability\n"
                "Do NOT use asterisks (**) for formatting. Use clean bullet points with dashes (-)."
            )
            user_content = (
                f"Here is the original financial data: {original_data}. "
                f"Here is the modified scenario: {modified_data}. "
                f"Please analyze the financial impact of these changes following the requested structure."
            )

        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_content},
                {"role": "user", "content": user_content}
            ],
            model="llama-3.1-8b-instant",
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        return f"An error occurred: {e}"
