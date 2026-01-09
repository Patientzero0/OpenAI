#!/usr/bin/env python3
"""
Simple test script to check if Gemini API key works
"""

import google.generativeai as genai
import os

# Your API key
API_KEY = "AIzaSyDzH7RgxK3756d6tcRUZlVLnmubFdb66RI"

def test_gemini_api():
    try:
        # Configure the API
        genai.configure(api_key=API_KEY)
        
        # Initialize the model
        model = genai.GenerativeModel('gemini-2.5-flash')
        
        # Simple test prompt
        prompt = "Say 'Hello, Gemini API is working!' and nothing else."
        
        print("🤖 Testing Gemini API...")
        print(f"API Key: {API_KEY[:20]}...")
        print(f"Prompt: {prompt}")
        print("-" * 50)
        
        # Generate content
        response = model.generate_content(prompt)
        
        print("✅ SUCCESS!")
        print(f"Response: {response.text}")
        
        return True
        
    except Exception as e:
        print("❌ ERROR!")
        print(f"Error type: {type(e).__name__}")
        print(f"Error message: {str(e)}")
        
        # Check for specific error types
        if "quota" in str(e).lower() or "rate_limit" in str(e).lower():
            print("\n🚨 QUOTA ISSUE:")
            print("Your API key has reached its quota limit.")
            print("You need to either:")
            print("1. Wait for quota to reset")
            print("2. Get a new API key")
            print("3. Enable billing for higher quotas")
        
        elif "api_key" in str(e).lower() or "invalid" in str(e).lower():
            print("\n🔑 API KEY ISSUE:")
            print("Your API key is invalid or expired.")
            print("Get a new key from: https://makersuite.google.com/app/apikey")
        
        return False

if __name__ == "__main__":
    print("🧪 Gemini API Test Script")
    print("=" * 50)
    
    success = test_gemini_api()
    
    print("\n" + "=" * 50)
    if success:
        print("🎉 Test completed successfully!")
    else:
        print("💥 Test failed - check the error messages above")
    
    print("\nTo run this script:")
    print("1. Install: pip install google-generativeai")
    print("2. Run: python test_gemini.py")
