import { NextRequest, NextResponse } from 'next/server'

const API_URL = "https://api.deepai.org/api/text2img";

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    const formData = new FormData();
    formData.append('text', prompt);

    const apiKey = process.env.NEXT_PUBLIC_DEEPAI_API_KEY || process.env.DEEPAI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'DeepAI API key is not configured. Please set NEXT_PUBLIC_DEEPAI_API_KEY or DEEPAI_API_KEY environment variable.' },
        { status: 500 }
      );
    }

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            "api-key": apiKey,
        },
        body: formData,
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`DeepAI API error: ${response.status} ${response.statusText}`, errorText);
      return NextResponse.json({ error: 'Failed to generate image from DeepAI API', details: errorText }, { status: response.status })
    }

    const jsonResponse = await response.json();

    if (!jsonResponse || !jsonResponse.output_url) {
        console.error("DeepAI API response did not contain output_url:", jsonResponse);
        return NextResponse.json({ error: 'DeepAI API response did not contain image URL' }, { status: 500 })
    }

    return NextResponse.json({ imageUrl: jsonResponse.output_url }, { status: 200 });

  } catch (error) {
    console.error('Image generation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}