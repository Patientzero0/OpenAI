"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Brain, Package, AlertTriangle, ArrowRight, CheckCircle, TrendingDown } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function InventoryScenarioPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const steps = [
    {
      title: "Low Stock Alert Triggered",
      description: "AI detects inventory levels below safety threshold",
      content:
        "iPhone 14 Pro: 2 units left (min: 5), Samsung Galaxy S23: 1 unit left (min: 3). Historical data shows these sell 8-12 units per week.",
      alertLevel: "high",
    },
    {
      title: "Supplier Performance Analysis",
      description: "Evaluating vendor reliability and delivery times",
      content:
        "Supplier A (iPhones): 95% on-time delivery, 3-day avg. Supplier B (Samsung): 87% on-time, 5-day avg. AI recommends prioritizing Supplier A for urgent orders.",
      alertLevel: "medium",
    },
    {
      title: "Automated Reorder Suggestions",
      description: "AI generates optimal purchase recommendations",
      content:
        "Recommended order: iPhone 14 Pro (15 units), Samsung Galaxy S23 (10 units). Total investment: ₹4.2L. Expected ROI: 28% based on sales velocity.",
      alertLevel: "low",
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
          <h1 className="text-3xl font-bold mb-4">Smart Inventory Management</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience automated stock monitoring and intelligent reorder recommendations powered by AI
          </p>
        </div>

        {/* Demo Control */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-primary" />
              <span>AI Inventory Intelligence</span>
            </CardTitle>
            <CardDescription>Watch AI monitor stock levels and generate smart reorder recommendations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isPlaying ? (
              <div className="text-center space-y-4">
                <div className="p-8 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800">
                  <Package className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Scenario: Stock Management Crisis</h3>
                  <p className="text-sm text-muted-foreground">
                    Sharma Electronics needs to manage inventory levels during peak sales season
                  </p>
                </div>
                <Button onClick={startDemo} size="lg">
                  Start Inventory Analysis
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
                    steps[currentStep].alertLevel === "high"
                      ? "border-red-500 bg-red-50 dark:bg-red-950"
                      : steps[currentStep].alertLevel === "medium"
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
                      <span className="font-medium">Reorder Plan Generated!</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={resetDemo} variant="outline" className="bg-transparent">
                        Replay Demo
                      </Button>
                      <Button asChild>
                        <Link href="/dashboard?tab=operations">
                          Explore Operations Dashboard
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

        {/* Inventory Insights */}
        <Card>
          <CardHeader>
            <CardTitle>AI Inventory Insights</CardTitle>
            <CardDescription>Key metrics and predictions for optimal stock management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg text-center">
                <TrendingDown className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">2</div>
                <div className="text-sm text-muted-foreground">Products Below Min Stock</div>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <Package className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">₹4.2L</div>
                <div className="text-sm text-muted-foreground">Recommended Investment</div>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">28%</div>
                <div className="text-sm text-muted-foreground">Expected ROI</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
