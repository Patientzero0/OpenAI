"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  TrendingUp,
  TrendingDown,
  Star,
  Share2,
  Eye,
  Heart,
  Target,
  Brain,
  Sparkles,
  Instagram,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Zap,
} from "lucide-react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { useState } from "react"

import { Input } from "@/components/ui/input"

// Sample data for demonstration
const campaignPerformance = [
  { month: "Jan", whatsapp: 1200, instagram: 800, organic: 600, conversions: 45 },
  { month: "Feb", whatsapp: 1500, instagram: 950, organic: 720, conversions: 62 },
  { month: "Mar", whatsapp: 1800, instagram: 1100, organic: 850, conversions: 78 },
  { month: "Apr", whatsapp: 2100, instagram: 1300, organic: 920, conversions: 89 },
  { month: "May", whatsapp: 1900, instagram: 1250, organic: 980, conversions: 95 },
  { month: "Jun", whatsapp: 2400, instagram: 1600, organic: 1100, conversions: 112 },
]

const sentimentData = [
  { name: "Positive", value: 68, color: "#15803d" },
  { name: "Neutral", value: 22, color: "#84cc16" },
  { name: "Negative", value: 10, color: "#ea580c" },
]

const recentReviews = [
  {
    id: 1,
    platform: "Google",
    customer: "Priya S.",
    rating: 5,
    text: "Excellent service and quality products. Fast delivery too!",
    sentiment: "positive",
    date: "2024-01-15",
  },
  {
    id: 2,
    platform: "WhatsApp",
    customer: "Rahul M.",
    rating: 4,
    text: "Good experience overall, but delivery was slightly delayed.",
    sentiment: "neutral",
    date: "2024-01-14",
  },
  {
    id: 3,
    platform: "Instagram",
    customer: "Sneha K.",
    rating: 5,
    text: "Love the new collection! Amazing quality and design.",
    sentiment: "positive",
    date: "2024-01-13",
  },
  {
    id: 4,
    platform: "Facebook",
    customer: "Amit P.",
    rating: 2,
    text: "Product quality was not as expected. Disappointed.",
    sentiment: "negative",
    date: "2024-01-12",
  },
]

const campaignSuggestions = [
  {
    type: "WhatsApp",
    title: "Festival Season Sale",
    content:
      "🎉 Diwali Special Offer! Get 25% OFF on all products. Limited time only! Shop now and celebrate with savings. Free delivery across India. #DiwaliSale #Savings",
    engagement: "High",
    estimatedReach: "2,500+",
  },
  {
    type: "Instagram",
    title: "Product Showcase Post",
    content:
      "✨ Introducing our premium collection! Crafted with care, designed for you. Swipe to see the magic ➡️ #Premium #Quality #NewCollection",
    engagement: "Medium",
    estimatedReach: "1,800+",
  },
  {
    type: "Facebook",
    title: "Customer Testimonial",
    content:
      "🌟 'Best purchase I've made this year!' - Happy Customer. Join thousands of satisfied customers. Experience the difference today! #CustomerLove #Quality",
    engagement: "High",
    estimatedReach: "3,200+",
  },
]

const keywordTrends = [
  { keyword: "quality products", mentions: 45, trend: "up", change: "+12%" },
  { keyword: "fast delivery", mentions: 38, trend: "up", change: "+8%" },
  { keyword: "customer service", mentions: 32, trend: "down", change: "-5%" },
  { keyword: "value for money", mentions: 28, trend: "up", change: "+15%" },
  { keyword: "product variety", mentions: 22, trend: "neutral", change: "0%" },
]

export function MarketingDashboard() {
  const [selectedPlatform, setSelectedPlatform] = useState("")
  const [campaignType, setCampaignType] = useState("")
  const [productName, setProductName] = useState("")
  const [brandColor, setBrandColor] = useState("")
  const [imageText, setImageText] = useState("")
  const [generatedContent, setGeneratedContent] = useState("")
  const [generatedImage, setGeneratedImage] = useState("")
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)

  const totalReach = 5400
  const totalEngagement = 1250
  const conversionRate = 4.2
  const avgSentiment = 4.3

  const generateContent = () => {
    const templates = [
      "🚀 New arrivals are here! Discover our latest collection designed just for you. Premium quality, unbeatable prices. Shop now! #NewArrivals #Quality",
      "💫 Special offer alert! Get exclusive discounts on your favorite products. Limited time only. Don't miss out! #SpecialOffer #Savings",
      "⭐ Customer favorite! Our best-selling products are back in stock. Experience the quality that everyone's talking about! #BestSeller #BackInStock",
    ]
    const randomTemplate = templates[Math.floor(Math.random() * templates.length)]
    setGeneratedContent(randomTemplate)
  }

  const generateImage = async () => {
    setIsGeneratingImage(true);
    setGeneratedImage("");

    let visualIntent = "";
    switch (campaignType) {
      case "promotion":
        visualIntent = "Offer-focused";
        break;
      case "product-launch":
        visualIntent = "Product hero";
        break;
      case "engagement":
        visualIntent = "Lifestyle / interactive";
        break;
      case "testimonial":
        visualIntent = "Human-centric / quote-based";
        break;
    }

    const prompt = [
        selectedPlatform,
        campaignType,
        visualIntent,
        productName,
        brandColor,
        imageText,
        "modern",
        "clean"
    ].filter(Boolean).join(' ');

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })

      if (response.ok) {
        const jsonResponse = await response.json();
        if (jsonResponse.imageUrl) {
          setGeneratedImage(jsonResponse.imageUrl);
        } else {
          console.error("API response did not contain imageUrl:", jsonResponse);
        }
      } else {
        console.error("Failed to generate image")
        const error = await response.json()
        console.error(error)
      }
    } catch (error) {
      console.error("Error generating image:", error)
    } finally {
      setIsGeneratingImage(false)
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReach.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +18% from last month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEngagement.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +24% from last month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +0.8% from last month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Sentiment</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgSentiment}/5</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +0.2 from last month
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* AI Content Generator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span>AI Content Generator</span>
          </CardTitle>
          <CardDescription>Generate engaging content and images for your social media campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="platform">Platform</Label>
                <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="whatsapp">WhatsApp Business</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="campaign-type">Campaign Type</Label>
                <Select value={campaignType} onValueChange={setCampaignType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="promotion">Promotion</SelectItem>
                    <SelectItem value="product-launch">Product Launch</SelectItem>
                    <SelectItem value="engagement">Engagement</SelectItem>
                    <SelectItem value="testimonial">Customer Testimonial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="product-name">Product / Service name</Label>
                <Input
                  id="product-name"
                  placeholder="e.g., Premium Leather Wallet"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand-color">Brand color preference</Label>
                <Input
                  id="brand-color"
                  placeholder="e.g., Use brand default"
                  value={brandColor}
                  onChange={(e) => setBrandColor(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image-text">Any text to show on image? (optional)</Label>
                <Input
                  id="image-text"
                  placeholder="e.g., 50% Off"
                  value={imageText}
                  onChange={(e) => setImageText(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="generated-content">Generated Content</Label>
              <Textarea
                id="generated-content"
                placeholder="Click 'Generate Content' to create AI-powered marketing copy..."
                value={generatedContent}
                onChange={(e) => setGeneratedContent(e.target.value)}
                rows={4}
              />
            </div>

            <div className="flex space-x-2">
              <Button onClick={generateContent} className="flex items-center space-x-2">
                <Brain className="h-4 w-4" />
                <span>Generate Content</span>
              </Button>
              <Button onClick={generateImage} disabled={isGeneratingImage} variant="outline">
                <Zap className="h-4 w-4 mr-2" />
                {isGeneratingImage ? "Generating..." : "Generate Image"}
              </Button>
              <Button variant="outline">Save Template</Button>
            </div>

            {generatedImage && (
              <div className="mt-4">
                <Label>Generated Image</Label>
                <div className="mt-2 border rounded-lg overflow-hidden">
                  <img src={generatedImage} alt="Generated by AI" className="w-full" />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaign Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>Multi-channel marketing reach and conversions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={campaignPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="whatsapp"
                  stackId="1"
                  stroke="#15803d"
                  fill="#15803d"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="instagram"
                  stackId="1"
                  stroke="#84cc16"
                  fill="#84cc16"
                  fillOpacity={0.6}
                />
                <Area type="monotone" dataKey="organic" stackId="1" stroke="#ea580c" fill="#ea580c" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sentiment Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Sentiment Analysis</CardTitle>
            <CardDescription>AI-powered analysis of customer feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reviews & Campaign Suggestions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reviews */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Reviews & Feedback
              <Badge variant="outline">{recentReviews.length} new</Badge>
            </CardTitle>
            <CardDescription>Latest customer feedback across platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReviews.map((review) => (
                <div key={review.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {review.platform}
                      </Badge>
                      <span className="text-sm font-medium">{review.customer}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{review.text}</p>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={
                        review.sentiment === "positive"
                          ? "default"
                          : review.sentiment === "neutral"
                            ? "secondary"
                            : "destructive"
                      }
                      className="text-xs"
                    >
                      {review.sentiment === "positive" && <ThumbsUp className="h-3 w-3 mr-1" />}
                      {review.sentiment === "negative" && <ThumbsDown className="h-3 w-3 mr-1" />}
                      {review.sentiment}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Campaign Suggestions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-primary" />
              <span>AI Campaign Suggestions</span>
            </CardTitle>
            <CardDescription>Personalized content recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaignSuggestions.map((suggestion, index) => (
                <div key={index} className="p-4 border rounded-lg bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {suggestion.type === "WhatsApp" && <MessageCircle className="h-4 w-4 text-green-600" />}
                      {suggestion.type === "Instagram" && <Instagram className="h-4 w-4 text-pink-600" />}
                      {suggestion.type === "Facebook" && <Share2 className="h-4 w-4 text-blue-600" />}
                      <span className="font-medium text-sm">{suggestion.title}</span>
                    </div>
                    <Badge variant={suggestion.engagement === "High" ? "default" : "secondary"}>
                      {suggestion.engagement}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{suggestion.content}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Est. reach: {suggestion.estimatedReach}</span>
                    <Button size="sm" variant="outline">
                      Use Template
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Keyword Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Trending Keywords & Mentions</CardTitle>
          <CardDescription>What customers are saying about your business</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {keywordTrends.map((keyword, index) => (
              <div key={index} className="p-4 border rounded-lg text-center">
                <div className="font-medium text-sm mb-1">{keyword.keyword}</div>
                <div className="text-2xl font-bold mb-1">{keyword.mentions}</div>
                <div className="flex items-center justify-center space-x-1">
                  {keyword.trend === "up" && <TrendingUp className="h-3 w-3 text-green-600" />}
                  {keyword.trend === "down" && <TrendingDown className="h-3 w-3 text-red-600" />}
                  <span
                    className={`text-xs ${
                      keyword.trend === "up"
                        ? "text-green-600"
                        : keyword.trend === "down"
                          ? "text-red-600"
                          : "text-muted-foreground"
                    }`}
                  >
                    {keyword.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Marketing Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-primary" />
            <span>AI Marketing Insights</span>
          </CardTitle>
          <CardDescription>Data-driven recommendations to boost your marketing performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200">
              <div className="font-medium text-green-800 dark:text-green-200 mb-2">High-Performing Content</div>
              <p className="text-sm text-green-700 dark:text-green-300">
                Posts mentioning "quality products" and "fast delivery" get 40% more engagement. Consider highlighting
                these strengths in your next campaign.
              </p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200">
              <div className="font-medium text-blue-800 dark:text-blue-200 mb-2">Optimal Posting Time</div>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Your audience is most active between 7-9 PM on weekdays. Scheduling posts during this window could
                increase reach by 25%.
              </p>
            </div>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200">
              <div className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Customer Service Focus</div>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Customer service mentions are trending down (-5%). Consider creating content that showcases your support
                team and response times.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
