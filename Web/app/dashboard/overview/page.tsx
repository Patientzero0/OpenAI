import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Brain, DollarSign, TrendingUp, Users, Package, AlertTriangle, Target, Activity } from "lucide-react"
import Link from "next/link"
import { BusinessStoryCard } from "@/components/business-story-card"
import { QuickActionsCard } from "@/components/quick-actions-card"
import { OverviewCharts } from "@/components/overview-charts"

// Helper function to get score class based on value
function getScoreClass(score: number): string {
  if (score < 40) return "score-low"
  if (score < 70) return "score-medium"
  return "score-high"
}

// Helper function to get score label
function getScoreLabel(score: number): string {
  if (score < 40) return "Low"
  if (score < 70) return "Medium"
  return "High"
}

export default function OverviewPage() {
  // Sample aggregated data
  const businessHealth = {
    finance: { score: 85, status: "good", trend: "+5%" },
    marketing: { score: 78, status: "good", trend: "+12%" },
    operations: { score: 92, status: "excellent", trend: "+3%" },
    overall: 85,
  }

  const keyMetrics = {
    revenue: 67000,
    expenses: 45000,
    profit: 22000,
    cashflow: 125000,
    customers: 1250,
    orders: 445,
    inventory: 2850000,
    efficiency: 98,
  }

  const criticalAlerts = [
    {
      module: "Operations",
      type: "inventory",
      message: "2 product categories below minimum stock",
      severity: "high",
      action: "Reorder Now",
    },
    {
      module: "Finance",
      type: "payment",
      message: "₹38,600 in overdue payments",
      severity: "medium",
      action: "Send Reminders",
    },
    {
      module: "Marketing",
      type: "campaign",
      message: "Instagram engagement down 8%",
      severity: "low",
      action: "Review Content",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">BizGenie Lite</span>
          </div>
          <Button variant="outline" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Business Overview</h1>
          <p className="text-muted-foreground">Your complete business intelligence at a glance</p>
        </div>

        {/* Business Health Score */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-primary" />
              <span>Overall Business Health</span>
              <Badge variant="default" className="ml-2">
                {businessHealth.overall}/100
              </Badge>
            </CardTitle>
            <CardDescription>AI-powered assessment across all business functions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">Overall Score</span>
                <span className="text-3xl font-bold text-primary">{businessHealth.overall}/100</span>
              </div>
              <Progress value={businessHealth.overall} className="h-4" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`text-center p-4 border rounded-lg ${getScoreClass(businessHealth.finance.score)}`}>
                  <DollarSign className="h-8 w-8 mx-auto mb-2" />
                  <div className="font-medium">Finance (CFO)</div>
                  <div className="text-2xl font-bold">{businessHealth.finance.score}</div>
                  <Badge className={`mt-1 score-badge-${getScoreLabel(businessHealth.finance.score).toLowerCase()}`}>
                    {getScoreLabel(businessHealth.finance.score)}
                  </Badge>
                  <div className="text-sm mt-1">{businessHealth.finance.trend}</div>
                </div>

                <div className={`text-center p-4 border rounded-lg ${getScoreClass(businessHealth.marketing.score)}`}>
                  <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                  <div className="font-medium">Marketing (CMO)</div>
                  <div className="text-2xl font-bold">{businessHealth.marketing.score}</div>
                  <Badge className={`mt-1 score-badge-${getScoreLabel(businessHealth.marketing.score).toLowerCase()}`}>
                    {getScoreLabel(businessHealth.marketing.score)}
                  </Badge>
                  <div className="text-sm mt-1">{businessHealth.marketing.trend}</div>
                </div>

                <div className={`text-center p-4 border rounded-lg ${getScoreClass(businessHealth.operations.score)}`}>
                  <Users className="h-8 w-8 mx-auto mb-2" />
                  <div className="font-medium">Operations (COO)</div>
                  <div className="text-2xl font-bold">{businessHealth.operations.score}</div>
                  <Badge className={`mt-1 score-badge-${getScoreLabel(businessHealth.operations.score).toLowerCase()}`}>
                    {getScoreLabel(businessHealth.operations.score)}
                  </Badge>
                  <div className="text-sm mt-1">{businessHealth.operations.trend}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Critical Alerts */}
        {criticalAlerts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <span>Critical Alerts</span>
              <Badge variant="destructive">{criticalAlerts.length}</Badge>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {criticalAlerts.map((alert, index) => (
                <Alert
                  key={index}
                  className={`${
                    alert.severity === "high"
                      ? "border-red-500 bg-red-50 dark:bg-red-950"
                      : alert.severity === "medium"
                        ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-950"
                        : "border-blue-500 bg-blue-50 dark:bg-blue-950"
                  }`}
                >
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle className="text-sm">{alert.module}</AlertTitle>
                  <AlertDescription className="text-xs mb-2">{alert.message}</AlertDescription>
                  <Button size="sm" variant="outline" className="text-xs bg-transparent">
                    {alert.action}
                  </Button>
                </Alert>
              ))}
            </div>
          </div>
        )}

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{keyMetrics.revenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{keyMetrics.customers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{keyMetrics.orders}</div>
              <p className="text-xs text-muted-foreground">+24% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{keyMetrics.efficiency}%</div>
              <p className="text-xs text-muted-foreground">+2% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Business Story - Takes 2 columns */}
          <div className="lg:col-span-2">
            <BusinessStoryCard />
          </div>

          {/* Quick Actions - Takes 1 column */}
          <div>
            <QuickActionsCard />
          </div>
        </div>

        {/* Charts Section */}
        <OverviewCharts />

        {/* Module Quick Access */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <span>Finance Dashboard</span>
              </CardTitle>
              <CardDescription>Cashflow, payments, and financial health</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Cash Position</span>
                  <span className="font-medium">₹{keyMetrics.cashflow.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Monthly Profit</span>
                  <span className="font-medium text-green-600">₹{keyMetrics.profit.toLocaleString()}</span>
                </div>
              </div>
              <Button asChild className="w-full">
                <Link href="/dashboard?tab=finance">View Finance</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>Marketing Dashboard</span>
              </CardTitle>
              <CardDescription>Campaigns, reviews, and customer insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Total Reach</span>
                  <span className="font-medium">5,400</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Avg Sentiment</span>
                  <span className="font-medium text-green-600">4.3/5</span>
                </div>
              </div>
              <Button asChild className="w-full">
                <Link href="/dashboard?tab=marketing">View Marketing</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span>Operations Dashboard</span>
              </CardTitle>
              <CardDescription>Inventory, suppliers, and staff management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Inventory Value</span>
                  <span className="font-medium">₹28.5L</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Staff Present</span>
                  <span className="font-medium text-green-600">4/5</span>
                </div>
              </div>
              <Button asChild className="w-full">
                <Link href="/dashboard?tab=operations">View Operations</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
