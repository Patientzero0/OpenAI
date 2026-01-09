"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, TrendingUp, Package, MessageCircle } from "lucide-react"
import Link from "next/link"

export function DemoScenarios() {
  const scenarios = [
    {
      id: "cash-flow-crisis",
      title: "Cash Flow Crisis Management",
      description: "See how BizGenie identifies cash flow issues and provides actionable solutions",
      icon: AlertTriangle,
      severity: "high",
      duration: "3 min",
      highlights: ["Risk scoring", "Payment alerts", "AI recommendations"],
      path: "/demo/scenarios/cash-flow",
    },
    {
      id: "marketing-optimization",
      title: "Marketing Campaign Optimization",
      description: "Discover how AI analyzes customer feedback to improve marketing performance",
      icon: TrendingUp,
      severity: "medium",
      duration: "4 min",
      highlights: ["Sentiment analysis", "Content generation", "Campaign tracking"],
      path: "/demo/scenarios/marketing",
    },
    {
      id: "inventory-management",
      title: "Smart Inventory Management",
      description: "Experience automated stock monitoring and supplier performance tracking",
      icon: Package,
      severity: "low",
      duration: "3 min",
      highlights: ["Stock alerts", "Supplier scoring", "Reorder automation"],
      path: "/demo/scenarios/inventory",
    },
    {
      id: "customer-insights",
      title: "Customer Feedback Analysis",
      description: "Learn how WhatsApp and review analysis drives business improvements",
      icon: MessageCircle,
      severity: "medium",
      duration: "3 min",
      highlights: ["Review analysis", "Trend identification", "Response suggestions"],
      path: "/demo/scenarios/customer-insights",
    },
  ]

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Interactive Scenarios</CardTitle>
        <CardDescription>
          Experience specific business challenges and see how BizGenie Lite provides solutions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scenarios.map((scenario) => (
            <div key={scenario.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-3 mb-3">
                <div
                  className={`p-2 rounded-lg ${
                    scenario.severity === "high"
                      ? "bg-red-100 text-red-600"
                      : scenario.severity === "medium"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-blue-100 text-blue-600"
                  }`}
                >
                  <scenario.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-sm">{scenario.title}</h3>
                    <Badge variant="outline" className="text-xs">
                      {scenario.duration}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{scenario.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {scenario.highlights.map((highlight, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                  <Button size="sm" variant="outline" className="w-full bg-transparent" asChild>
                    <Link href={scenario.path}>Try Scenario</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
