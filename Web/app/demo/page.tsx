import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Play, FileText, BarChart3, Users, Zap } from "lucide-react"
import Link from "next/link"
import { DemoScenarios } from "@/components/demo-scenarios"
import { DemoDataGenerator } from "@/components/demo-data-generator"

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">BizGenie Lite</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Link href="/demo" className="text-foreground font-medium">
              Demo
            </Link>
          </nav>
          <Button variant="outline" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Interactive Demo
          </Badge>
          <h1 className="text-4xl font-bold mb-4">Experience BizGenie Lite</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore how AI-powered business intelligence transforms small business management with real sample data
          </p>
        </div>

        {/* Demo Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Play className="h-5 w-5 text-primary" />
              <span>Demo Overview</span>
            </CardTitle>
            <CardDescription>
              This interactive demo showcases BizGenie Lite using realistic data from a sample Indian retail business
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <BarChart3 className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Sample Business</h3>
                <p className="text-sm text-muted-foreground">
                  "Sharma Electronics" - A growing electronics retail store in Mumbai with 6 months of business data
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <FileText className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Real Scenarios</h3>
                <p className="text-sm text-muted-foreground">
                  Authentic business challenges including cash flow issues, inventory management, and marketing
                  campaigns
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Brain className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">AI Insights</h3>
                <p className="text-sm text-muted-foreground">
                  Experience how AI analyzes data and provides actionable recommendations for business growth
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Start Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Guided Tour */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-primary" />
                <span>Guided Tour</span>
              </CardTitle>
              <CardDescription>Step-by-step walkthrough of all features with explanations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Duration</span>
                  <Badge variant="outline">8-10 minutes</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Coverage</span>
                  <span className="text-muted-foreground">All 3 modules + AI insights</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Best for</span>
                  <span className="text-muted-foreground">First-time users</span>
                </div>
              </div>
              <Button className="w-full" asChild>
                <Link href="/demo/guided-tour">
                  <Play className="h-4 w-4 mr-2" />
                  Start Guided Tour
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Free Exploration */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span>Free Exploration</span>
              </CardTitle>
              <CardDescription>Explore the dashboard freely with pre-loaded sample data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Duration</span>
                  <Badge variant="outline">Unlimited</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Data</span>
                  <span className="text-muted-foreground">6 months of sample data</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Best for</span>
                  <span className="text-muted-foreground">Experienced users</span>
                </div>
              </div>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/dashboard/overview?demo=true">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Explore Dashboard
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Demo Scenarios */}
        <DemoScenarios />

        {/* Sample Data Generator */}
        <DemoDataGenerator />

        {/* Demo Features */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>What You'll Experience</CardTitle>
            <CardDescription>Key features and capabilities demonstrated in this demo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: "Financial Health Scoring",
                  description: "AI-powered risk assessment with green/yellow/red ratings",
                },
                {
                  title: "Automated Insights",
                  description: "Weekly business stories with actionable recommendations",
                },
                {
                  title: "Multi-channel Marketing",
                  description: "Campaign performance across WhatsApp, Instagram, and organic channels",
                },
                {
                  title: "Inventory Management",
                  description: "Real-time stock monitoring with automated reorder alerts",
                },
                {
                  title: "Supplier Analytics",
                  description: "Reliability scoring and performance tracking for vendors",
                },
                {
                  title: "Employee Tracking",
                  description: "Shift management and attendance monitoring",
                },
                {
                  title: "GST Compliance",
                  description: "Automated return preparation and filing status tracking",
                },
                {
                  title: "Sentiment Analysis",
                  description: "Customer feedback analysis from reviews and WhatsApp messages",
                },
                {
                  title: "Predictive Analytics",
                  description: "Cash flow forecasting and business trend predictions",
                },
              ].map((feature, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="font-medium text-sm mb-1">{feature.title}</div>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-12 p-8 bg-primary/5 rounded-lg border border-primary/20">
          <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            After exploring the demo, start your free trial with your own business data and experience the power of
            AI-driven business intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/dashboard">
                Start Free Trial
                <Zap className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/demo/guided-tour">Try Guided Demo</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
