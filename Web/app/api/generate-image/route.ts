import { NextRequest, NextResponse } from 'next/server'

// Note: Gemini doesn't have image generation capabilities
// This endpoint will provide image suggestions and prompts instead

export async function POST(request: NextRequest) {
  try {
    const { prompt, platform, style } = await request.json()

    if (!prompt) {
      return NextResponse.json(
        { error: 'Content prompt is required' },
        { status: 400 }
      )
    }

    // Since Gemini doesn't generate images, we'll provide detailed image suggestions
    const platformStyles = {
      whatsapp: "clean, professional, minimal design suitable for messaging",
      instagram: "vibrant, trendy, visually striking with modern aesthetics",
      facebook: "professional, clear, community-oriented design"
    }

    const stylePrompts = {
      modern: "modern, clean design with contemporary typography",
      vintage: "retro, nostalgic aesthetic with classic elements",
      minimalist: "minimal, clean design with plenty of white space",
      bold: "bold, attention-grabbing design with strong colors"
    }

    const platformStyle = platformStyles[platform as keyof typeof platformStyles] || platformStyles.whatsapp
    const selectedStyle = stylePrompts[style as keyof typeof stylePrompts] || stylePrompts.modern

    const imageSuggestions = {
      prompt: prompt,
      enhancedPrompt: `Create a marketing image for ${platform} that is:
- Style: ${selectedStyle}
- Platform: ${platformStyle}
- Content: ${prompt}

Requirements:
- High quality, professional marketing image
- Suitable for social media marketing
- Clear, readable text if any
- Engaging visual design
- Optimized for ${platform} dimensions`,
      suggestions: [
        "Use tools like Canva, Adobe Express, or Figma to create the image",
        "Consider using stock photo services like Unsplash or Pexels for base images",
        "Add your brand colors and typography to maintain consistency",
        "Include a clear call-to-action in the visual design",
        "Ensure the image is optimized for the target platform's dimensions"
      ],
      tools: [
        {
          name: "Openai GPT Image-1",
          url: "https://chat.openai.com/",
          description: "Best Text to Image Generation Model"
        }
      ],
      platform,
      style,
      generatedAt: new Date().toISOString()
    }

    return NextResponse.json(imageSuggestions)

  } catch (error) {
    console.error('Image suggestion error:', error)
    
    return NextResponse.json(
      { error: 'Failed to generate image suggestions. Please try again.' },
      { status: 500 }
    )
  }
}
