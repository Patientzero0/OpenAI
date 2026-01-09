"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, Calendar, FileText, Sparkles, TrendingUp, TrendingDown } from "lucide-react"
import { useState } from "react"

export function BusinessStoryCard() {
  const [isGenerating, setIsGenerating] = useState(false)

  const currentWeek = "June 10-16, 2024"
  const businessStory = {
    title: "Strong Growth Week with Operational Challenges",
    summary:
      "Your business showed impressive 18% revenue growth this week, driven by successful marketing campaigns and improved customer engagement. However, inventory management requires immediate attention to sustain this momentum.",
    highlights: [
      {
        type: "positive",
        icon: TrendingUp,
        title: "Revenue Surge",
        description: "Monthly revenue reached ₹67,000, exceeding target by 12%",
        impact: "High",
      },
      {
        type: "positive",
        icon: Sparkles,
        title: "Marketing Success",
        description: "Instagram engagement increased 24%, generating 112 new leads",
        impact: "Medium",
      },
      {
        type: "negative",
        icon: TrendingDown,
        title: "Inventory Concerns",
        description: "2 product categories below minimum stock, risking stockouts",
        impact: "High",
      },
    ],
    recommendations: [
      "Immediately reorder clothing and home & garden inventory to prevent stockouts",
      "Capitalize on marketing momentum by increasing ad spend by 20% next week",
      "Follow up on ₹38,600 in overdue payments to improve cash flow",
      "Consider hiring part-time staff to handle increased order volume",
    ],
    keyInsights: {
      customerBehavior: "Customers are responding well to quality-focused messaging and fast delivery promises",
      marketTrends: "Seasonal demand is picking up earlier than expected, particularly in clothing category",
      operationalEfficiency: "Current 98% efficiency rate is excellent but may strain under increased volume",
    },
  }

  const generateNewStory = () => {
    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false)
    }, 3000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-primary" />
            <span>Weekly Business Story</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={generateNewStory}
            disabled={isGenerating}
            className="flex items-center space-x-2 bg-transparent"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary"></div>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Regenerate</span>
              </>
            )}
          </Button>
        </CardTitle>
        <CardDescription className="flex items-center space-x-2">
          <Calendar className="h-4 w-4" />
          <span>Week of {currentWeek}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Story Title & Summary */}
        <div>
          <h3 className="text-lg font-semibold mb-2">{businessStory.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{businessStory.summary}</p>
        </div>

        {/* Key Highlights */}
        <div>
          <h4 className="font-medium mb-3 flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Key Highlights</span>
          </h4>
          <div className="space-y-3">
            {businessStory.highlights.map((highlight, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${
                  highlight.type === "positive"
                    ? "border-green-200 bg-green-50 dark:bg-green-950"
                    : "border-red-200 bg-red-50 dark:bg-red-950"
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`p-1 rounded-full ${
                      highlight.type === "positive" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    }`}
                  >
                    <highlight.icon className="h-3 w-3" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{highlight.title}</span>
                      <Badge variant={highlight.impact === "High" ? "destructive" : "secondary"} className="text-xs">
                        {highlight.impact} Impact
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{highlight.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div>
          <h4 className="font-medium mb-3 flex items-center space-x-2">
            <Brain className="h-4 w-4 text-primary" />
            <span>AI Recommendations</span>
          </h4>
          <div className="space-y-2">
            {businessStory.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-2 text-sm">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">{recommendation}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Insights */}
        <div>
          <h4 className="font-medium mb-3 flex items-center space-x-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Key Insights</span>
          </h4>
          <div className="grid grid-cols-1 gap-3">
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="font-medium text-sm mb-1">Customer Behavior</div>
              <p className="text-xs text-muted-foreground">{businessStory.keyInsights.customerBehavior}</p>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="font-medium text-sm mb-1">Market Trends</div>
              <p className="text-xs text-muted-foreground">{businessStory.keyInsights.marketTrends}</p>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="font-medium text-sm mb-1">Operational Efficiency</div>
              <p className="text-xs text-muted-foreground">{businessStory.keyInsights.operationalEfficiency}</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button className="w-full" asChild>
          <a href="#" className="flex items-center justify-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Download Full Report</span>
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}
