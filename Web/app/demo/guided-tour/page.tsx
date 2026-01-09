"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, ArrowRight, ArrowLeft, CheckCircle, Play } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const tourSteps = [
  {
    id: 1,
    title: "Welcome to BizGenie Lite",
    description: "Your AI-powered business partner for complete growth management",
    content:
      "BizGenie Lite combines the expertise of a CFO, CMO, and COO into one intelligent platform designed specifically for small Indian businesses.",
    action: "Let's start the tour",
    duration: "30 seconds",
  },
  {
    id: 2,
    title: "Business Health Overview",
    description: "See your complete business status at a glance",
    content:
      "The main dashboard provides an AI-powered health score across all business functions, critical alerts, and key performance metrics.",
    action: "View dashboard overview",
    duration: "1 minute",
  },
  {
    id: 3,
    title: "Finance Module (CFO)",
    description: "Smart financial management and cash flow tracking",
    content:
      "Automated cashflow analysis, payment alerts, GST compliance, and AI-powered financial health scoring with green/yellow/red risk ratings.",
    action: "Explore finance features",
    duration: "2 minutes",
  },
  {
    id: 4,
    title: "Marketing Module (CMO)",
    description: "AI-driven marketing intelligence and content generation",
    content:
      "Sentiment analysis from reviews, automated WhatsApp/Instagram content creation, campaign performance tracking, and customer insights.",
    action: "See marketing tools",
    duration: "2 minutes",
  },
  {
    id: 5,
    title: "Operations Module (COO)",
    description: "Streamlined inventory and resource management",
    content:
      "Real-time inventory monitoring, supplier reliability scoring, employee tracking, and automated operational alerts.",
    action: "Check operations dashboard",
    duration: "2 minutes",
  },
  {
    id: 6,
    title: "Weekly Business Story",
    description: "AI-generated insights and recommendations",
    content:
      "Every week, BizGenie analyzes your data and creates a comprehensive business story with actionable recommendations for growth.",
    action: "Read sample story",
    duration: "1 minute",
  },
  {
    id: 7,
    title: "Data Integration",
    description: "Connect your business data sources",
    content:
      "Upload invoices, integrate SMS/UPI notifications, analyze WhatsApp feedback, and manage GST filings - all processed by AI.",
    action: "See integration options",
    duration: "1 minute",
  },
  {
    id: 8,
    title: "Ready to Get Started!",
    description: "Your journey to AI-powered business growth begins now",
    content:
      "You've seen how BizGenie Lite can transform your business operations. Start your free trial with your own data.",
    action: "Start free trial",
    duration: "Complete",
  },
]

export default function GuidedTourPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)

  const nextStep = () => {
    if (currentStep < tourSteps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const currentTourStep = tourSteps[currentStep - 1]
  const progress = (currentStep / tourSteps.length) * 100

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">BizGenie Lite</span>
            <Badge variant="secondary">Guided Tour</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-muted-foreground">
              Step {currentStep} of {tourSteps.length}
            </div>
            <Button variant="outline" asChild>
              <Link href="/demo">Exit Tour</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Tour Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Tour Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl mb-2">{currentTourStep.title}</CardTitle>
                  <CardDescription className="text-lg">{currentTourStep.description}</CardDescription>
                </div>
                <Badge variant="outline">{currentTourStep.duration}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">{currentTourStep.content}</p>

              {/* Interactive Demo Area */}
              <div className="p-8 bg-muted/30 rounded-lg border-2 border-dashed border-border text-center">
                <div className="space-y-4">
                  {!isPlaying ? (
                    <>
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <Play className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Interactive Demo</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Click to see {currentTourStep.title.toLowerCase()} in action
                        </p>
                        <Button onClick={() => setIsPlaying(true)}>{currentTourStep.action}</Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Demo Complete</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Great! You've experienced {currentTourStep.title.toLowerCase()}
                        </p>
                        <Button variant="outline" onClick={() => setIsPlaying(false)} className="bg-transparent">
                          Replay Demo
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-6 border-t">
                <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="bg-transparent">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                <div className="flex space-x-2">
                  {tourSteps.map((step) => (
                    <div
                      key={step.id}
                      className={`w-2 h-2 rounded-full ${
                        step.id === currentStep ? "bg-primary" : step.id < currentStep ? "bg-green-500" : "bg-muted"
                      }`}
                    />
                  ))}
                </div>

                {currentStep < tourSteps.length ? (
                  <Button onClick={nextStep}>
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button asChild>
                    <Link href="/dashboard">
                      Start Free Trial
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tour Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tour Overview</CardTitle>
              <CardDescription>What you'll learn in this guided tour</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tourSteps.map((step) => (
                  <div
                    key={step.id}
                    className={`p-3 border rounded-lg ${
                      step.id === currentStep
                        ? "border-primary bg-primary/5"
                        : step.id < currentStep
                          ? "border-green-500 bg-green-50 dark:bg-green-950"
                          : "border-border"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                          step.id === currentStep
                            ? "bg-primary text-primary-foreground"
                            : step.id < currentStep
                              ? "bg-green-500 text-white"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {step.id < currentStep ? <CheckCircle className="h-3 w-3" /> : step.id}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{step.title}</div>
                        <div className="text-xs text-muted-foreground">{step.duration}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
