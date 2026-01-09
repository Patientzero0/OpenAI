"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Star, ThumbsUp, ThumbsDown, TrendingUp } from "lucide-react"
import { useState } from "react"

export function WhatsappDataForm() {
  const [feedbackData, setFeedbackData] = useState("")
  const [analysisResults, setAnalysisResults] = useState<any>(null)

  const sampleFeedback = [
    {
      customer: "Priya S.",
      message: "Great service! Fast delivery and excellent quality products. Will order again!",
      sentiment: "positive",
      rating: 5,
      category: "Service Quality",
    },
    {
      customer: "Rahul M.",
      message: "Product was good but delivery took longer than expected. Please improve.",
      sentiment: "neutral",
      rating: 3,
      category: "Delivery",
    },
    {
      customer: "Sneha K.",
      message: "Amazing quality! Loved the new collection. Keep up the good work!",
      sentiment: "positive",
      rating: 5,
      category: "Product Quality",
    },
  ]

  const processFeedback = () => {
    // Simulate AI processing
    setAnalysisResults({
      totalMessages: 15,
      sentimentBreakdown: { positive: 60, neutral: 30, negative: 10 },
      keyTopics: ["Quality", "Delivery", "Service", "Price"],
      avgRating: 4.2,
    })
  }

  return (
    <div className="space-y-6">
      {/* WhatsApp Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            <span>WhatsApp Feedback Analysis</span>
          </CardTitle>
          <CardDescription>Analyze customer feedback and reviews from WhatsApp conversations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200">
            <div className="flex items-start space-x-3">
              <MessageCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <div className="font-medium text-green-800 dark:text-green-200 mb-1">WhatsApp Business Integration</div>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Export your WhatsApp Business chat history and paste customer messages below for sentiment analysis
                  and insights.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="feedback-type">Feedback Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select feedback type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reviews">Customer Reviews</SelectItem>
                  <SelectItem value="complaints">Complaints</SelectItem>
                  <SelectItem value="suggestions">Suggestions</SelectItem>
                  <SelectItem value="general">General Feedback</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp-data">WhatsApp Messages</Label>
              <Textarea
                id="whatsapp-data"
                placeholder="Paste customer WhatsApp messages here, one per line..."
                value={feedbackData}
                onChange={(e) => setFeedbackData(e.target.value)}
                rows={8}
              />
            </div>

            <div className="flex space-x-2">
              <Button onClick={processFeedback} className="flex-1">
                Analyze Feedback
              </Button>
              <Button variant="outline">Load Sample Data</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sample Feedback */}
      <Card>
        <CardHeader>
          <CardTitle>Sample Customer Feedback</CardTitle>
          <CardDescription>Examples of WhatsApp feedback that can be analyzed</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sampleFeedback.map((feedback, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm">{feedback.customer}</span>
                    <Badge variant="outline">{feedback.category}</Badge>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < feedback.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{feedback.message}</p>
                <Badge
                  variant={
                    feedback.sentiment === "positive"
                      ? "default"
                      : feedback.sentiment === "neutral"
                        ? "secondary"
                        : "destructive"
                  }
                  className="text-xs"
                >
                  {feedback.sentiment === "positive" && <ThumbsUp className="h-3 w-3 mr-1" />}
                  {feedback.sentiment === "negative" && <ThumbsDown className="h-3 w-3 mr-1" />}
                  {feedback.sentiment}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysisResults && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>Analysis Results</span>
            </CardTitle>
            <CardDescription>AI-powered insights from your WhatsApp feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl font-bold">{analysisResults.totalMessages}</div>
                  <div className="text-sm text-muted-foreground">Messages Analyzed</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {analysisResults.sentimentBreakdown.positive}%
                  </div>
                  <div className="text-sm text-muted-foreground">Positive Sentiment</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl font-bold">{analysisResults.avgRating}/5</div>
                  <div className="text-sm text-muted-foreground">Average Rating</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl font-bold">{analysisResults.keyTopics.length}</div>
                  <div className="text-sm text-muted-foreground">Key Topics</div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200">
                <div className="font-medium text-blue-800 dark:text-blue-200 mb-2">Key Insights</div>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Customers are highly satisfied with product quality (mentioned 12 times)</li>
                  <li>• Delivery speed is a concern for 30% of customers</li>
                  <li>• Service quality receives consistent praise</li>
                  <li>• Price competitiveness is appreciated by customers</li>
                </ul>
              </div>

              <Button className="w-full">Generate Marketing Content from Insights</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
