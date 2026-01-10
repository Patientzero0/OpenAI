import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BarChart3, Brain, DollarSign, TrendingUp, Users, Zap, CheckCircle2, LineChart, PieChart } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 border-b border-gray-100 dark:border-slate-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">BizGenie Lite</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors font-medium">
              Features
            </Link>
            <Link href="#pricing" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors font-medium">
              Pricing
            </Link>
            <Link href="#tech" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors font-medium">
              Technology
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <Button asChild className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0">
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section with Mesh Gradient */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden pt-20 bg-white dark:bg-slate-950">
        {/* Animated Mesh Gradient Background - Light Mode */}
        <div className="absolute inset-0 overflow-hidden dark:hidden">
          {/* Orange gradient blob */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          {/* Pink gradient blob */}
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: '0.5s'}}></div>
          {/* Purple gradient blob */}
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        {/* Animated Mesh Gradient Background - Dark Mode */}
        <div className="absolute inset-0 overflow-hidden hidden dark:block">
          {/* Orange gradient blob */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
          {/* Pink gradient blob */}
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" style={{animationDelay: '0.5s'}}></div>
          {/* Purple gradient blob */}
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-orange-100 to-pink-100 dark:from-orange-900 dark:to-pink-900 text-orange-700 dark:text-orange-200 hover:bg-gradient-to-r hover:from-orange-200 hover:to-pink-200 dark:hover:from-orange-800 dark:hover:to-pink-800 border-0 px-4 py-2">
              ✨ Enterprise Growth Made Simple
            </Badge>
            
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
              AI That Drives Your<br />Enterprise Growth
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
              Transform your business with AI-powered insights for finance, marketing, and operations. Built for Indian entrepreneurs.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 font-semibold text-lg px-8 py-7 rounded-xl shadow-2xl" asChild>
                <Link href="/dashboard">
                  Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-gray-900 backdrop-blur-md bg-white dark:bg-slate-900 font-semibold text-lg px-8 py-7 rounded-xl transition-all duration-300" asChild>
                <Link href="#demo">Watch Demo</Link>
              </Button>
            </div>
          </div>

          {/* Dashboard Preview - Bento Grid */}
          <div className="relative z-20 mx-auto max-w-5xl">
            <div className="bg-gradient-to-b from-white/95 to-white/85 dark:from-slate-900/95 dark:to-slate-900/85 dark:border-slate-700 backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl p-8 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Large Chart - Top Left */}
                <div className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-gray-700">Revenue Trend</span>
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                  </div>
                  <svg viewBox="0 0 200 120" className="w-full h-32">
                    <polyline
                      points="10,100 40,70 70,80 100,40 130,50 160,20 190,30"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="2"
                    />
                    <polyline
                      points="10,100 40,70 70,80 100,40 130,50 160,20 190,30"
                      fill="url(#gradient)"
                      opacity="0.3"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#2563eb" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Small Metric Card 1 */}
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-4">
                  <div className="text-sm text-gray-600 mb-2">Total Revenue</div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">₹2.4M</div>
                  <div className="text-xs text-emerald-600 font-semibold">↑ 12% this month</div>
                </div>

                {/* Small Metric Card 2 */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4">
                  <div className="text-sm text-gray-600 mb-2">Growth Rate</div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">24%</div>
                  <div className="text-xs text-purple-600 font-semibold">↑ Up from 18%</div>
                </div>

                {/* Donut Chart */}
                <div className="bg-gradient-to-br from-orange-50 to-pink-100 rounded-2xl p-4 flex flex-col items-center justify-center">
                  <div className="w-24 h-24 relative">
                    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#f97316" strokeWidth="8" strokeDasharray="75.4 251.2" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">75%</div>
                        <div className="text-xs text-gray-600">Complete</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Card */}
                <div className="md:col-span-2 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-4">
                  <div className="text-sm font-semibold text-gray-700 mb-3">Performance</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Conversions</span>
                      <span className="font-bold text-gray-900">1,240</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-indigo-600 h-1.5 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                </div>

                {/* Alert Card */}
                <div className="md:col-span-2 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-700">1 Alert</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">Stock running low for Product A</p>
                </div>
              </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-pink-500/0 via-pink-500/0 to-orange-500/10 dark:from-pink-700/0 dark:via-pink-700/0 dark:to-orange-700/20 rounded-3xl blur-3xl -z-10" style={{top: '-20px', left: '-20px', right: '-20px', bottom: '-20px'}}></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Everything you need to manage and grow your business with AI</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="border border-gray-200 dark:border-slate-700 hover:border-orange-300 dark:hover:border-orange-500 hover:shadow-xl transition-all duration-300 bg-white dark:bg-slate-800 rounded-2xl">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 dark:from-orange-900 to-orange-50 dark:to-orange-800 rounded-xl flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <CardTitle className="text-gray-900 dark:text-white">Smart Finance Management</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">Automated cashflow tracking and financial insights</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Real-time expense tracking</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">GST filing automation</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Loan calculator</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Risk scoring</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border border-gray-200 dark:border-slate-700 hover:border-pink-300 dark:hover:border-pink-500 hover:shadow-xl transition-all duration-300 bg-white dark:bg-slate-800 rounded-2xl">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-pink-100 dark:from-pink-900 to-pink-50 dark:to-pink-800 rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                </div>
                <CardTitle className="text-gray-900 dark:text-white">AI Marketing Intelligence</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">Campaign optimization and content generation</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Sentiment analysis</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Auto-generated campaigns</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Video generation</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Social media insights</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border border-gray-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-500 hover:shadow-xl transition-all duration-300 bg-white dark:bg-slate-800 rounded-2xl">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 dark:from-purple-900 to-purple-50 dark:to-purple-800 rounded-xl flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-gray-900 dark:text-white">Operations Excellence</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">Inventory and resource management</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Stock monitoring</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Supplier alerts</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Employee tracking</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Reliability scoring</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose BizGenie */}
      <section id="pricing" className="py-24 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose BizGenie Lite</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Built specifically for Indian entrepreneurs</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Benefit 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-orange-100 dark:from-orange-900 to-orange-50 dark:to-orange-800">
                  <Brain className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">AI-Powered Insights</h3>
                <p className="text-gray-600 dark:text-gray-400">Get intelligent recommendations powered by advanced machine learning models</p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-pink-100 dark:from-pink-900 to-pink-50 dark:to-pink-800">
                  <Zap className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Lightning Fast</h3>
                <p className="text-gray-600 dark:text-gray-400">Real-time processing of your business data with instant actionable insights</p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-purple-100 dark:from-purple-900 to-purple-50 dark:to-purple-800">
                  <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Comprehensive Analytics</h3>
                <p className="text-gray-600 dark:text-gray-400">Understand your business with detailed reports and visualizations</p>
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-blue-100 dark:from-blue-900 to-blue-50 dark:to-blue-800">
                  <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Growth Focused</h3>
                <p className="text-gray-600 dark:text-gray-400">Strategies and recommendations specifically designed to scale your business</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button size="lg" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0 font-semibold text-lg px-8 py-7 rounded-xl shadow-xl" asChild>
              <Link href="/dashboard">
                Start Your Free Trial Today <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech" className="py-24 px-4 bg-white dark:bg-slate-950">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Enterprise-Grade Technology</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Built with cutting-edge tools and frameworks for reliability</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Tech 1 */}
            <div className="text-center p-6 rounded-2xl border border-gray-100 dark:border-slate-700 hover:border-orange-200 dark:hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-100 dark:from-orange-900 to-orange-50 dark:to-orange-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">React & Next.js</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Modern frontend with server-side rendering for optimal performance</p>
            </div>

            {/* Tech 2 */}
            <div className="text-center p-6 rounded-2xl border border-gray-100 dark:border-slate-700 hover:border-pink-200 dark:hover:border-pink-500 hover:bg-pink-50 dark:hover:bg-pink-950/30 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-100 dark:from-pink-900 to-pink-50 dark:to-pink-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Brain className="h-6 w-6 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Python & FastAPI</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Robust backend with machine learning integration</p>
            </div>

            {/* Tech 3 */}
            <div className="text-center p-6 rounded-2xl border border-gray-100 dark:border-slate-700 hover:border-purple-200 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950/30 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 dark:from-purple-900 to-purple-50 dark:to-purple-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Advanced Analytics</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pandas, NumPy, and scikit-learn for powerful data processing</p>
            </div>

            {/* Tech 4 */}
            <div className="text-center p-6 rounded-2xl border border-gray-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 dark:from-blue-900 to-blue-50 dark:to-blue-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Cloud Ready</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Scalable infrastructure ready for enterprise deployment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-24 px-4 overflow-hidden bg-white dark:bg-slate-950">
        {/* Gradient Background - Light Mode */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-50 via-pink-50 to-purple-50 dark:hidden -z-10"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:hidden -z-10"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:hidden -z-10"></div>

        {/* Gradient Background - Dark Mode */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 hidden dark:block -z-10"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20 hidden dark:block -z-10"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20 hidden dark:block -z-10"></div>

        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            Join thousands of Indian entrepreneurs who are already using BizGenie Lite to drive growth, optimize operations, and scale their businesses.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0 font-semibold text-lg px-8 py-7 rounded-xl shadow-xl" asChild>
              <Link href="/dashboard">
                Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800 font-semibold text-lg px-8 py-7 rounded-xl" asChild>
              <Link href="#features">Learn More</Link>
            </Button>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mt-8">No credit card required • 14-day free trial • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              {/* Brand */}
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">BizGenie Lite</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Empowering Indian entrepreneurs with AI-driven business intelligence</p>
              </div>

              {/* Product */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Product</h4>
                <ul className="space-y-2">
                  <li><Link href="#features" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors">Features</Link></li>
                  <li><Link href="#pricing" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors">Pricing</Link></li>
                  <li><Link href="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors">Dashboard</Link></li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors">About Us</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors">Blog</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors">Contact</a></li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors">Security</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-100 dark:border-slate-800 pt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400 text-sm">© 2026 BizGenie Lite. All rights reserved. Built with ❤️ for Indian entrepreneurs.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
