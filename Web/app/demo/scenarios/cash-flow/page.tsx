"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Brain, AlertTriangle, TrendingDown, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function CashFlowScenarioPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const steps = [
    {
      title: "Cash Flow Alert Detected",
      description: "BizGenie AI identifies potential cash flow issues",
      content:
        "The system detected that your accounts receivable has increased by 45% while cash reserves dropped below the safety threshold of ₹50,000.",
      riskLevel: "high",
    },
    {
      title: "AI Analysis in Progress",
      description: "Analyzing payment patterns and customer behavior",
      content:
        "AI is examining 6 months of transaction data, identifying late-paying customers, and calculating risk scores for outstanding invoices.",
      riskLevel: "medium",
    },
    {
      title: "Recommendations Generated",
      description: "Actionable solutions provided by AI",
      content:
        "Send payment reminders to 3 high-value customers (₹85,000 total), offer 2% early payment discount, and consider invoice factoring for ₹1.2L receivables.",
      riskLevel: "low",
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
          <h1 className="text-3xl font-bold mb-4">Cash Flow Crisis Management</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience how BizGenie AI identifies cash flow issues and provides actionable solutions in real-time
          </p>
        </div>

        {/* Demo Control */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <span>Interactive Cash Flow Analysis</span>
            </CardTitle>
            <CardDescription>
              Watch as AI analyzes your business data and provides intelligent recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isPlaying ? (
              <div className="text-center space-y-4">
                <div className="p-8 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
                  <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Scenario: Sharma Electronics</h3>
                  <p className="text-sm text-muted-foreground">
                    A Mumbai-based electronics retailer facing cash flow challenges due to delayed customer payments
                  </p>
                </div>
                <Button onClick={startDemo} size="lg">
                  Start Cash Flow Analysis
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

                <Alert
                  className={`${
                    steps[currentStep].riskLevel === "high"
                      ? "border-red-500 bg-red-50 dark:bg-red-950"
                      : steps[currentStep].riskLevel === "medium"
                        ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-950"
                        : "border-green-500 bg-green-50 dark:bg-green-950"
                  }`}
                >
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>{steps[currentStep].title}</AlertTitle>
                  <AlertDescription className="mt-2">{steps[currentStep].content}</AlertDescription>
                </Alert>

                {currentStep === steps.length - 1 && (
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center space-x-2 text-green-600">
                      <CheckCircle className="h-6 w-6" />
                      <span className="font-medium">Analysis Complete!</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={resetDemo} variant="outline" className="bg-transparent">
                        Replay Demo
                      </Button>
                      <Button asChild>
                        <Link href="/dashboard?tab=finance">
                          Explore Finance Dashboard
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

        {/* Key Features Demonstrated */}
        <Card>
          <CardHeader>
            <CardTitle>Features Demonstrated</CardTitle>
            <CardDescription>Key BizGenie capabilities shown in this scenario</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <TrendingDown className="h-8 w-8 text-red-500 mb-3" />
                <h3 className="font-semibold mb-2">Risk Detection</h3>
                <p className="text-sm text-muted-foreground">
                  AI monitors cash flow patterns and alerts you before problems become critical
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <Brain className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Smart Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Machine learning analyzes customer payment behavior and identifies patterns
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-500 mb-3" />
                <h3 className="font-semibold mb-2">Actionable Solutions</h3>
                <p className="text-sm text-muted-foreground">
                  Get specific, prioritized recommendations to improve your cash position
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
