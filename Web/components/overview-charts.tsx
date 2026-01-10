"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Package, 
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  Target,
  Zap,
  ArrowUp,
  ArrowDown,
  Minus
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

// 6-Month Performance Data
const monthlyData = [
  { month: "Jan", revenue: 45000, customers: 890, orders: 245, profit: 13000 },
  { month: "Feb", revenue: 52000, customers: 950, orders: 289, profit: 17000 },
  { month: "Mar", revenue: 48000, customers: 1020, orders: 312, profit: 10000 },
  { month: "Apr", revenue: 61000, customers: 1150, orders: 356, profit: 19000 },
  { month: "May", revenue: 55000, customers: 1200, orders: 398, profit: 16000 },
  { month: "Jun", revenue: 67000, customers: 1250, orders: 445, profit: 22000 },
]

// Calculate insights
const getInsights = () => {
  const current = monthlyData[monthlyData.length - 1]
  const previous = monthlyData[monthlyData.length - 2]
  const first = monthlyData[0]
  
  const revenueChange = ((current.revenue - previous.revenue) / previous.revenue * 100)
  const profitMargin = (current.profit / current.revenue * 100)
  const avgOrderValue = current.revenue / current.orders
  const customerGrowth = ((current.customers - first.customers) / first.customers * 100)
  const revenueGrowth = ((current.revenue - first.revenue) / first.revenue * 100)
  
  // Find best and worst months
  const bestMonth = monthlyData.reduce((max, m) => m.revenue > max.revenue ? m : max)
  const worstMonth = monthlyData.reduce((min, m) => m.revenue < min.revenue ? m : min)
  
  return {
    revenueChange: parseFloat(revenueChange.toFixed(1)),
    profitMargin: parseFloat(profitMargin.toFixed(1)),
    avgOrderValue: parseFloat(avgOrderValue.toFixed(0)),
    customerGrowth: parseFloat(customerGrowth.toFixed(1)),
    revenueGrowth: parseFloat(revenueGrowth.toFixed(1)),
    bestMonth: bestMonth.month,
    worstMonth: worstMonth.month,
    totalRevenue: monthlyData.reduce((sum, m) => sum + m.revenue, 0),
    totalProfit: monthlyData.reduce((sum, m) => sum + m.profit, 0),
  }
}

const insights = getInsights()

// Generate recommendations
const getRecommendations = () => {
  const recs = []
  
  if (insights.revenueChange < 0) {
    recs.push({
      type: "warning",
      title: "Revenue Decline Detected",
      message: `Revenue dropped ${Math.abs(insights.revenueChange)}% from last month. Consider reviewing marketing campaigns or seasonal factors.`,
      action: "Review Marketing Dashboard",
      href: "/dashboard/marketing"
    })
  }
  
  if (insights.profitMargin < 20) {
    recs.push({
      type: "warning",
      title: "Profit Margin Below Target",
      message: `Current profit margin is ${insights.profitMargin}%. Aim for at least 20% for sustainable growth.`,
      action: "Optimize Expenses",
      href: "/dashboard/finance"
    })
  }
  
  if (insights.customerGrowth > 30) {
    recs.push({
      type: "success",
      title: "Strong Customer Growth",
      message: `Customer base grew ${insights.customerGrowth}% in 6 months! Consider expanding inventory to meet demand.`,
      action: "Check Inventory",
      href: "/dashboard/operations"
    })
  }
  
  // Always add top recommendation
  recs.push({
    type: "info",
    title: "Best Performing Month",
    message: `${insights.bestMonth} had the highest revenue. Analyze what worked well and replicate successful strategies.`,
    action: "View Finance Details",
    href: "/dashboard/finance"
  })
  
  return recs
}

const recommendations = getRecommendations()

// Performance highlights
const highlights = [
  {
    label: "Total Revenue (6 months)",
    value: `₹${(insights.totalRevenue / 1000).toFixed(0)}K`,
    change: `+${insights.revenueGrowth}%`,
    trend: insights.revenueGrowth > 0 ? "up" : "down",
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950"
  },
  {
    label: "Total Profit (6 months)",
    value: `₹${(insights.totalProfit / 1000).toFixed(0)}K`,
    change: `${insights.profitMargin}% margin`,
    trend: "neutral",
    icon: TrendingUp,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950"
  },
  {
    label: "Customer Growth",
    value: `${insights.customerGrowth > 0 ? '+' : ''}${insights.customerGrowth}%`,
    change: "vs January",
    trend: insights.customerGrowth > 0 ? "up" : "down",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950"
  },
  {
    label: "Avg Order Value",
    value: `₹${insights.avgOrderValue}`,
    change: "Current month",
    trend: "neutral",
    icon: Package,
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-950"
  },
]

export function OverviewCharts() {
  return (
    <div className="space-y-6">
      {/* Key Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {highlights.map((highlight, index) => {
          const Icon = highlight.icon
          return (
            <Card key={index} className="relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-20 h-20 ${highlight.bgColor} opacity-50 rounded-bl-full`} />
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${highlight.bgColor}`}>
                    <Icon className={`h-5 w-5 ${highlight.color}`} />
                  </div>
                  {highlight.trend === "up" && <ArrowUp className="h-4 w-4 text-green-600" />}
                  {highlight.trend === "down" && <ArrowDown className="h-4 w-4 text-red-600" />}
                  {highlight.trend === "neutral" && <Minus className="h-4 w-4 text-gray-400" />}
                </div>
                <div className="text-sm text-muted-foreground mb-1">{highlight.label}</div>
                <div className="text-2xl font-bold mb-1">{highlight.value}</div>
                <div className="text-xs text-muted-foreground">{highlight.change}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Key Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Key Insights from Last 6 Months
          </CardTitle>
          <CardDescription>AI-powered analysis of your business performance trends</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Insight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="font-semibold text-sm">Strong Growth</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Revenue increased by <strong>{insights.revenueGrowth}%</strong> over 6 months. 
                Best month: <strong>{insights.bestMonth}</strong> (₹{(monthlyData.find(m => m.month === insights.bestMonth)?.revenue || 0) / 1000}K)
              </p>
            </div>
            
            <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-blue-600" />
                <span className="font-semibold text-sm">Customer Expansion</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Customer base grew by <strong>{insights.customerGrowth}%</strong>. 
                Current: <strong>{monthlyData[monthlyData.length - 1].customers}</strong> active customers.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-purple-600" />
                <span className="font-semibold text-sm">Order Value</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Average order value: <strong>₹{insights.avgOrderValue}</strong>. 
                {insights.avgOrderValue > 150 ? " Excellent!" : " Consider upselling strategies."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations & Action Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Recommendations & Action Items
          </CardTitle>
          <CardDescription>Actionable insights to improve your business performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <Alert 
                key={index}
                className={
                  rec.type === "warning" 
                    ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20" 
                    : rec.type === "success"
                    ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                    : "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
                }
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <AlertTitle className="text-sm font-semibold mb-1">{rec.title}</AlertTitle>
                    <AlertDescription className="text-xs text-muted-foreground">
                      {rec.message}
                    </AlertDescription>
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={rec.href}>
                      {rec.action}
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Profitability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Profit Margin</span>
                <span className="font-semibold">{insights.profitMargin}%</span>
              </div>
              <Progress value={insights.profitMargin} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {insights.profitMargin >= 20 
                  ? "Excellent profit margin" 
                  : insights.profitMargin >= 15
                  ? "Good, aim for 20%+"
                  : "Consider cost optimization"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Growth Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>6-Month Growth</span>
                <span className={`font-semibold ${insights.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {insights.revenueGrowth >= 0 ? '+' : ''}{insights.revenueGrowth}%
                </span>
              </div>
              <Progress 
                value={Math.min(insights.revenueGrowth + 50, 100)} 
                className="h-2" 
              />
              <p className="text-xs text-muted-foreground">
                {insights.revenueGrowth > 30 
                  ? "Outstanding growth trajectory" 
                  : insights.revenueGrowth > 10
                  ? "Steady positive growth"
                  : "Focus on growth initiatives"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Performance Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Rating</span>
                <Badge variant="default">Good</Badge>
              </div>
              <Progress value={75} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Based on revenue growth, profitability, and customer expansion metrics
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
