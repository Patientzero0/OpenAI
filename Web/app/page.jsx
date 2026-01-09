import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BarChart3, Brain, DollarSign, TrendingUp, Users, Zap } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function HomePage() {
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
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#demo" className="text-muted-foreground hover:text-foreground transition-colors">
              Demo
            </Link>
            <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            AI-Powered Business Management
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
            Your AI Business Partner for <span className="text-primary">Complete Growth</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
            BizGenie Lite acts as your CFO, CMO, and COO - helping small Indian businesses manage finance, marketing,
            and operations with intelligent automation and insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/dashboard">
                Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#demo">Watch Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Product Vision */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
            <p className="text-lg text-muted-foreground text-balance">
              Empowering small Indian businesses with AI-driven insights that simplify complex business operations,
              enabling entrepreneurs to focus on growth while our intelligent system handles the analytical heavy
              lifting across finance, marketing, and operations.
            </p>
          </div>
        </div>
      </section>

      {/* Three Core Modules */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Three Powerful Modules</h2>
            <p className="text-lg text-muted-foreground">Complete business management in one intelligent platform</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Finance Module */}
            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="h-6 w-6 text-primary" />
                  <Badge variant="outline">CFO Module</Badge>
                </div>
                <CardTitle>Smart Finance Management</CardTitle>
                <CardDescription>Automated cashflow tracking and financial health monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>UPI/Bank SMS integration</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>GST filing automation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Payment alerts & risk scoring</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Green/Yellow/Red risk ratings</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Marketing Module */}
            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  <Badge variant="outline">CMO Module</Badge>
                </div>
                <CardTitle>AI Marketing Intelligence</CardTitle>
                <CardDescription>Automated content generation and campaign optimization</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-secondary rounded-full" />
                    <span>Review & feedback analysis</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-secondary rounded-full" />
                    <span>Auto WhatsApp/Instagram ads</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-secondary rounded-full" />
                    <span>Campaign performance tracking</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-secondary rounded-full" />
                    <span>AI image generation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Operations Module */}
            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="h-6 w-6 text-primary" />
                  <Badge variant="outline">COO Module</Badge>
                </div>
                <CardTitle>Operations Excellence</CardTitle>
                <CardDescription>Streamlined inventory and resource management</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <span>Inventory monitoring</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <span>Vendor delay alerts</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <span>Supplier reliability scoring</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <span>Employee shift tracking</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* User Personas */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Built for Indian Entrepreneurs</h2>
            <p className="text-lg text-muted-foreground">
              Understanding the unique challenges of small business owners
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Retail Store Owner</CardTitle>
                <CardDescription>Managing inventory and customer relationships</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Struggles with manual inventory tracking, understanding customer preferences, and managing cash flow
                  during seasonal fluctuations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Restaurant Owner</CardTitle>
                <CardDescription>Balancing operations and marketing</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Needs help with supplier management, staff scheduling, and leveraging online reviews to improve
                  business reputation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Service Provider</CardTitle>
                <CardDescription>Growing client base and operations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Challenges with client acquisition, project management, and maintaining consistent service quality
                  across growing operations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tech Stack & Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powered by Advanced AI</h2>
            <p className="text-lg text-muted-foreground">
              Built with cutting-edge technology for reliable business insights
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <BarChart3 className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Smart Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Advanced data processing with pandas and scikit-learn</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Brain className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">AI Models</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">HuggingFace sentiment analysis and Stable Diffusion</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Zap className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Real-time Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Instant insights from SMS, invoices, and social data</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Indian Context</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Built specifically for Indian business practices and regulations
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of Indian entrepreneurs already using BizGenie Lite</p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/dashboard">
              Start Your Free Trial <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">BizGenie Lite</span>
          </div>
          <p className="text-muted-foreground">Empowering small Indian businesses with AI-driven insights</p>
        </div>
      </footer>
    </div>
  )
}
