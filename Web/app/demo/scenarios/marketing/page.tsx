"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, TrendingUp, MessageCircle, ArrowRight, CheckCircle, Star } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function MarketingScenarioPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const steps = [
    {
      title: "Customer Feedback Analysis",
      description: "AI processes reviews and WhatsApp messages",
      content:
        "Analyzing 156 customer reviews and 89 WhatsApp conversations. Sentiment score: 4.2/5 with key themes: 'fast delivery', 'good prices', 'limited variety'.",
      sentiment: "positive",
    },
    {
      title: "Campaign Performance Review",
      description: "Evaluating current marketing efforts",
      content:
        "Instagram ads: 2.3% CTR, WhatsApp campaigns: 18% response rate. AI identifies 'product variety' as key improvement area mentioned in 34% of feedback.",
      sentiment: "neutral",
    },
    {
      title: "AI-Generated Recommendations",
      description: "Personalized marketing strategy suggestions",
      content:
        "Create 'New Arrivals' campaign highlighting expanded inventory. Generate WhatsApp content about latest smartphone models. Estimated reach: +40%.",
      sentiment: "positive",
    },
  ]

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isPlaying, currentStep])

  const startDemo = () => {
    setIsPlaying(true)
    setCurrentStep(0)
  }

  const resetDemo = () => {
    setIsPlaying(false)
    setCurrentStep(0)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">BizGenie Lite</span>
            <Badge variant="secondary">Demo Scenario</Badge>
          </div>
          <Button variant="outline" asChild>
            <Link href="/demo">Back to Demo</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Marketing Campaign Optimization</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how AI analyzes customer feedback to improve marketing performance and generate targeted content
          </p>
        </div>

        {/* Demo Control */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>AI Marketing Intelligence</span>
            </CardTitle>
            <CardDescription>
              Watch AI analyze customer sentiment and generate marketing recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isPlaying ? (
              <div className="text-center space-y-4">
                <div className="p-8 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                  <MessageCircle className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Scenario: Customer Feedback Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Sharma Electronics wants to improve their marketing based on customer feedback and reviews
                  </p>
                </div>
                <Button onClick={startDemo} size="lg">
                  Start Marketing Analysis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Analysis Progress</span>
                  <span className="text-sm text-muted-foreground">
                    Step {currentStep + 1} of {steps.length}
                  </span>
                </div>
                <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />

                <Card
                  className={`${
                    steps[currentStep].sentiment === "positive"
                      ? "border-green-500 bg-green-50 dark:bg-green-950"
                      : steps[currentStep].sentiment === "neutral"
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                        : "border-yellow-500 bg-yellow-50 dark:bg-yellow-950"
                  }`}
                >
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Star className="h-5 w-5" />
                      <span>{steps[currentStep].title}</span>
                    </CardTitle>
                    <CardDescription>{steps[currentStep].description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{steps[currentStep].content}</p>
                  </CardContent>
                </Card>

                {currentStep === steps.length - 1 && (
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center space-x-2 text-green-600">
                      <CheckCircle className="h-6 w-6" />
                      <span className="font-medium">Marketing Strategy Generated!</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={resetDemo} variant="outline" className="bg-transparent">
                        Replay Demo
                      </Button>
                      <Button asChild>
                        <Link href="/dashboard?tab=marketing">
                          Explore Marketing Dashboard
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sample Generated Content */}
        <Card>
          <CardHeader>
            <CardTitle>AI-Generated Marketing Content</CardTitle>
            <CardDescription>Example content created by BizGenie for WhatsApp campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-muted/30 rounded-lg border-l-4 border-primary">
              <h4 className="font-semibold mb-2">📱 New Arrivals Alert!</h4>
              <p className="text-sm mb-3">
                🔥 Latest smartphone models now in stock! Based on your feedback, we've expanded our variety with:
                <br />• iPhone 15 Pro Max
                <br />• Samsung Galaxy S24 Ultra
                <br />• OnePlus 12
                <br />
                <br />💰 Special launch prices + Free delivery in Mumbai!
                <br />📞 Call now: +91-98765-43210
              </p>
              <Badge variant="secondary" className="text-xs">
                Generated by AI • Personalized for your audience
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
