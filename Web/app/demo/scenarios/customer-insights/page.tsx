"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, MessageCircle, ArrowRight, CheckCircle, Star, ThumbsUp } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function CustomerInsightsScenarioPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const steps = [
    {
      title: "Customer Feedback Collection",
      description: "Gathering reviews and WhatsApp conversations",
      content:
        "Processed 156 Google reviews, 89 WhatsApp messages, and 23 Facebook comments. Overall sentiment: 82% positive, 15% neutral, 3% negative.",
      type: "collection",
    },
    {
      title: "Sentiment Analysis & Trends",
      description: "AI identifies key themes and emotions",
      content:
        "Top positive themes: 'fast delivery' (67%), 'competitive prices' (54%), 'helpful staff' (43%). Main concern: 'limited product variety' (31% of feedback).",
      type: "analysis",
    },
    {
      title: "Actionable Insights Generated",
      description: "AI provides specific improvement recommendations",
      content:
        "Expand smartphone variety (+15 models), highlight delivery speed in marketing, train staff on new products. Predicted customer satisfaction increase: +12%.",
      type: "insights",
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
          <h1 className="text-3xl font-bold mb-4">Customer Feedback Analysis</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how AI analyzes customer reviews and WhatsApp messages to drive business improvements
          </p>
        </div>

        {/* Demo Control */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              <span>AI Customer Intelligence</span>
            </CardTitle>
            <CardDescription>
              Watch AI process customer feedback and generate actionable business insights
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isPlaying ? (
              <div className="text-center space-y-4">
                <div className="p-8 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
                  <Star className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Scenario: Customer Feedback Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Analyze customer sentiment across multiple channels to improve business operations
                  </p>
                </div>
                <Button onClick={startDemo} size="lg">
                  Start Customer Analysis
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

                <Card className="border-purple-200 bg-purple-50 dark:bg-purple-950 dark:border-purple-800">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <ThumbsUp className="h-5 w-5" />
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
                      <span className="font-medium">Customer Insights Ready!</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={resetDemo} variant="outline" className="bg-transparent">
                        Replay Demo
                      </Button>
                      <Button asChild>
                        <Link href="/dashboard?tab=marketing">
                          View Customer Analytics
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

        {/* Sample Customer Feedback */}
        <Card>
          <CardHeader>
            <CardTitle>Sample Customer Feedback</CardTitle>
            <CardDescription>Real examples of feedback processed by AI</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border rounded-lg bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">Google Review - 5 stars</span>
                  <Badge variant="secondary" className="text-xs">
                    Positive
                  </Badge>
                </div>
                <p className="text-sm">
                  "Excellent service! Got my iPhone delivered within 2 hours. Great prices too!"
                </p>
              </div>
              <div className="p-3 border rounded-lg bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                <div className="flex items-center space-x-2 mb-2">
                  <MessageCircle className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">WhatsApp Message</span>
                  <Badge variant="secondary" className="text-xs">
                    Neutral
                  </Badge>
                </div>
                <p className="text-sm">
                  "Do you have more Samsung models? Looking for Galaxy S24 but don't see it listed."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
