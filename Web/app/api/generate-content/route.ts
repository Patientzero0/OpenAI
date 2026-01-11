import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(request: NextRequest) {
  let platform = ''
  let campaignType = ''
  
  try {
    const requestBody = await request.json()
    platform = requestBody.platform
    campaignType = requestBody.campaignType
    const businessContext = requestBody.businessContext

    if (!platform || !campaignType) {
      return NextResponse.json(
        { error: 'Platform and campaign type are required' },
        { status: 400 }
      )
    }

    // Create platform-specific prompts
    const platformPrompts = {
      whatsapp: {
        tone: "conversational, friendly, and direct",
        length: "short and concise (under 160 characters)",
        style: "personal and engaging"
      },
      instagram: {
        tone: "vibrant, trendy, and visually appealing",
        length: "medium length with hashtags",
        style: "creative and eye-catching"
      },
      facebook: {
        tone: "professional yet approachable",
        length: "longer form content",
        style: "informative and community-focused"
      }
    }

    const campaignPrompts = {
      promotion: "Create a promotional message highlighting special offers, discounts, or deals",
      "product-launch": "Create content for launching a new product with excitement and anticipation",
      engagement: "Create content to engage and interact with the audience",
      testimonial: "Create content featuring customer testimonials and social proof"
    }

    const platformConfig = platformPrompts[platform as keyof typeof platformPrompts] || platformPrompts.whatsapp
    const campaignConfig = campaignPrompts[campaignType as keyof typeof campaignPrompts] || campaignPrompts.promotion

    const prompt = `
    You are a professional marketing content creator specializing in ${platform} marketing.
    
    Create ${campaignConfig} for ${platform} that is:
    - Tone: ${platformConfig.tone}
    - Length: ${platformConfig.length}
    - Style: ${platformConfig.style}
    
    ${businessContext ? `Business context: ${businessContext}` : ''}
    
    Requirements:
    - Include relevant emojis but don't overuse them
    - Make it engaging and actionable
    - Include a clear call-to-action
    - ${platform === 'instagram' ? 'Include relevant hashtags (3-5 hashtags)' : ''}
    - ${platform === 'whatsapp' ? 'Keep it personal and conversational' : ''}
    - ${platform === 'facebook' ? 'Make it informative and community-focused' : ''}
    
    Generate compelling marketing content that will drive engagement and conversions.
    `

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    
    if (!apiKey) {
      // Return fallback content if API key is not configured
      const fallbackContent = {
        whatsapp: {
          promotion: "🎉 Special Offer! Get 25% OFF on all products. Limited time only! Shop now and save big. Free delivery available. #SpecialOffer #Savings",
          "product-launch": "🚀 New arrivals are here! Discover our latest collection designed just for you. Premium quality, unbeatable prices. Shop now! #NewArrivals #Quality",
          engagement: "💬 We love hearing from you! What's your favorite product? Share your thoughts in the comments below. Your feedback helps us improve! #CustomerLove #Feedback",
          testimonial: "⭐ 'Best purchase I've made this year!' - Happy Customer. Join thousands of satisfied customers. Experience the difference today! #CustomerLove #Quality"
        },
        instagram: {
          promotion: "✨ Flash Sale Alert! 🎯 Get exclusive discounts on your favorite products. Limited time only - don't miss out! Swipe up to shop now! #FlashSale #Exclusive #Fashion",
          "product-launch": "🌟 Introducing our premium collection! Crafted with care, designed for you. Swipe to see the magic ➡️ #Premium #Quality #NewCollection #Fashion",
          engagement: "💭 What's your style vibe today? Drop a comment and let us know! We'd love to see your looks! Tag us for a chance to be featured! #StyleVibes #Community",
          testimonial: "💖 'Absolutely love my new purchase!' - Our amazing customer. See what everyone's talking about! Link in bio to shop the look! #CustomerLove #Quality #Fashion"
        },
        facebook: {
          promotion: "🎊 Special Promotion Alert! We're offering exclusive discounts on our best-selling products. This limited-time offer won't last long. Visit our page to learn more and take advantage of these amazing deals. Free shipping on orders over $50!",
          "product-launch": "🚀 Exciting News! We're thrilled to announce the launch of our new premium collection. Each piece is carefully crafted with attention to detail and quality. Visit our website to explore the full range and find your perfect style.",
          engagement: "💬 Community Question: What's the most important factor when choosing new products? Quality, price, or style? We'd love to hear your thoughts and learn what matters most to our amazing customers!",
          testimonial: "🌟 Customer Spotlight: 'I've been a loyal customer for over 2 years and the quality just keeps getting better!' - Sarah M. Thank you for your continued support! Read more customer stories on our website."
        }
      };

      const fallback = platform && campaignType ? 
        fallbackContent[platform as keyof typeof fallbackContent]?.[campaignType as keyof typeof fallbackContent.whatsapp] : 
        "🎉 Special Offer! Get 25% OFF on all products. Limited time only! Shop now and save big. Free delivery available. #SpecialOffer #Savings"
      
      return NextResponse.json({
        content: fallback,
        platform: platform || 'general',
        campaignType: campaignType || 'promotion',
        generatedAt: new Date().toISOString(),
        fallback: true,
        message: "Using fallback content. Please configure GEMINI_API_KEY environment variable for AI-generated content."
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })
    
    const result = await model.generateContent([
      "You are a professional marketing content creator with expertise in social media marketing, copywriting, and brand communication. You create engaging, conversion-focused content that resonates with target audiences.",
      prompt
    ])

    const response = await result.response
    const generatedContent = response.text()

    if (!generatedContent) {
      throw new Error('Failed to generate content')
    }

    return NextResponse.json({
      content: generatedContent,
      platform,
      campaignType,
      generatedAt: new Date().toISOString()
    })

  } catch (error) {
    console.error('Content generation error:', error)
    
    // Provide fallback content when API fails
    const fallbackContent = {
      whatsapp: {
        promotion: "🎉 Special Offer! Get 25% OFF on all products. Limited time only! Shop now and save big. Free delivery available. #SpecialOffer #Savings",
        "product-launch": "🚀 New arrivals are here! Discover our latest collection designed just for you. Premium quality, unbeatable prices. Shop now! #NewArrivals #Quality",
        engagement: "💬 We love hearing from you! What's your favorite product? Share your thoughts in the comments below. Your feedback helps us improve! #CustomerLove #Feedback",
        testimonial: "⭐ 'Best purchase I've made this year!' - Happy Customer. Join thousands of satisfied customers. Experience the difference today! #CustomerLove #Quality"
      },
      instagram: {
        promotion: "✨ Flash Sale Alert! 🎯 Get exclusive discounts on your favorite products. Limited time only - don't miss out! Swipe up to shop now! #FlashSale #Exclusive #Fashion",
        "product-launch": "🌟 Introducing our premium collection! Crafted with care, designed for you. Swipe to see the magic ➡️ #Premium #Quality #NewCollection #Fashion",
        engagement: "💭 What's your style vibe today? Drop a comment and let us know! We'd love to see your looks! Tag us for a chance to be featured! #StyleVibes #Community",
        testimonial: "💖 'Absolutely love my new purchase!' - Our amazing customer. See what everyone's talking about! Link in bio to shop the look! #CustomerLove #Quality #Fashion"
      },
      facebook: {
        promotion: "🎊 Special Promotion Alert! We're offering exclusive discounts on our best-selling products. This limited-time offer won't last long. Visit our page to learn more and take advantage of these amazing deals. Free shipping on orders over $50!",
        "product-launch": "🚀 Exciting News! We're thrilled to announce the launch of our new premium collection. Each piece is carefully crafted with attention to detail and quality. Visit our website to explore the full range and find your perfect style.",
        engagement: "💬 Community Question: What's the most important factor when choosing new products? Quality, price, or style? We'd love to hear your thoughts and learn what matters most to our amazing customers!",
        testimonial: "🌟 Customer Spotlight: 'I've been a loyal customer for over 2 years and the quality just keeps getting better!' - Sarah M. Thank you for your continued support! Read more customer stories on our website."
      }
    }

    const fallback = platform && campaignType ? 
      fallbackContent[platform as keyof typeof fallbackContent]?.[campaignType as keyof typeof fallbackContent.whatsapp] : 
      "🎉 Special Offer! Get 25% OFF on all products. Limited time only! Shop now and save big. Free delivery available. #SpecialOffer #Savings"
    
    return NextResponse.json({
      content: fallback,
      platform: platform || 'general',
      campaignType: campaignType || 'promotion',
      generatedAt: new Date().toISOString(),
      fallback: true,
      message: "Using fallback content due to API issues. Please check your Gemini API key."
    })
  }
}
