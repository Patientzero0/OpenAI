"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, TrendingUp, Users, ArrowRight, Brain } from "lucide-react"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const overviewData = [
  { month: "Jan", finance: 85, marketing: 78, operations: 92 },
  { month: "Feb", finance: 88, marketing: 82, operations: 89 },
  { month: "Mar", finance: 82, marketing: 85, operations: 94 },
  { month: "Apr", finance: 90, marketing: 88, operations: 91 },
  { month: "May", finance: 87, marketing: 91, operations: 96 },
  { month: "Jun", finance: 93, marketing: 89, operations: 98 },
]

const quickStats = [
  {
    title: "Financial Health",
    value: "93%",
    change: "+5%",
    trend: "up",
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950",
    icon: DollarSign,
    href: "/dashboard/finance",
  },
  {
    title: "Marketing Performance",
    value: "89%",
    change: "+12%",
    trend: "up",
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950",
    icon: TrendingUp,
    href: "/dashboard/marketing",
  },
  {
    title: "Operational Efficiency",
    value: "98%",
    change: "+2%",
    trend: "up",
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950",
    icon: Users,
    href: "/dashboard/operations",
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-slide-in">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center space-x-2">
            <Brain className="h-8 w-8 text-primary" />
            <span>Business Overview</span>
          </h1>
          <p className="text-muted-foreground mt-2">Your AI-powered business intelligence center</p>
        </div>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
          All Systems Active
        </Badge>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
            <Link href={stat.href}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={stat.color}>{stat.change} from last month</span>
                </p>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      {/* Performance Overview Chart */}
      <Card>
        <CardHeader>
          <CardTitle>6-Month Performance Overview</CardTitle>
          <CardDescription>Comprehensive view of all business modules performance</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={overviewData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="finance" stroke="hsl(var(--chart-1))" strokeWidth={3} name="Finance" />
              <Line type="monotone" dataKey="marketing" stroke="hsl(var(--chart-2))" strokeWidth={3} name="Marketing" />
              <Line
                type="monotone"
                dataKey="operations"
                stroke="hsl(var(--chart-3))"
                strokeWidth={3}
                name="Operations"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Module Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-6 w-6 text-primary" />
              <CardTitle>Finance (CFO)</CardTitle>
            </div>
            <CardDescription>Cash flow management, risk assessment, and financial insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Cash Health Score</span>
                <span className="font-semibold text-green-600">93/100</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Monthly Revenue</span>
                <span className="font-semibold">₹67,000</span>
              </div>
              <Button asChild className="w-full mt-4">
                <Link href="/dashboard/finance">
                  View Finance Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              <CardTitle>Marketing (CMO)</CardTitle>
            </div>
            <CardDescription>Campaign optimization, sentiment analysis, and content generation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Total Reach</span>
                <span className="font-semibold text-blue-600">5,400</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Conversion Rate</span>
                <span className="font-semibold">4.2%</span>
              </div>
              <Button asChild className="w-full mt-4">
                <Link href="/dashboard/marketing">
                  View Marketing Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Users className="h-6 w-6 text-primary" />
              <CardTitle>Operations (COO)</CardTitle>
            </div>
            <CardDescription>Inventory management, supplier tracking, and workforce optimization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Efficiency Score</span>
                <span className="font-semibold text-purple-600">98%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Staff Attendance</span>
                <span className="font-semibold">4/5 Present</span>
              </div>
              <Button asChild className="w-full mt-4">
                <Link href="/dashboard/operations">
                  View Operations Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
