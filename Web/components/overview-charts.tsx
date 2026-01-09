"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from "recharts"

// Sample data for overview charts
const businessTrends = [
  { month: "Jan", revenue: 45000, customers: 890, orders: 245, efficiency: 94 },
  { month: "Feb", revenue: 52000, customers: 950, orders: 289, efficiency: 96 },
  { month: "Mar", revenue: 48000, customers: 1020, orders: 312, efficiency: 95 },
  { month: "Apr", revenue: 61000, customers: 1150, orders: 356, efficiency: 97 },
  { month: "May", revenue: 55000, customers: 1200, orders: 398, efficiency: 96 },
  { month: "Jun", revenue: 67000, customers: 1250, orders: 445, efficiency: 98 },
]

const performanceMetrics = [
  { month: "Jan", finance: 78, marketing: 65, operations: 88 },
  { month: "Feb", finance: 82, marketing: 68, operations: 90 },
  { month: "Mar", finance: 79, marketing: 72, operations: 87 },
  { month: "Apr", finance: 85, marketing: 75, operations: 92 },
  { month: "May", finance: 83, marketing: 76, operations: 89 },
  { month: "Jun", finance: 85, marketing: 78, operations: 92 },
]

export function OverviewCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Business Growth Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Business Growth Trends</CardTitle>
          <CardDescription>Revenue, customers, and orders over 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={businessTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value, name) => {
                  if (name === "revenue") return [`₹${value.toLocaleString()}`, "Revenue"]
                  if (name === "customers") return [value.toLocaleString(), "Customers"]
                  if (name === "orders") return [value, "Orders"]
                  return [value, name]
                }}
              />
              <Area type="monotone" dataKey="revenue" stackId="1" stroke="#15803d" fill="#15803d" fillOpacity={0.6} />
              <Area type="monotone" dataKey="customers" stackId="2" stroke="#84cc16" fill="#84cc16" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Module Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Module Performance Scores</CardTitle>
          <CardDescription>AI-assessed performance across all business functions</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip formatter={(value) => [`${value}/100`, ""]} />
              <Line
                type="monotone"
                dataKey="finance"
                stroke="#15803d"
                strokeWidth={3}
                name="Finance"
                dot={{ fill: "#15803d", strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="marketing"
                stroke="#84cc16"
                strokeWidth={3}
                name="Marketing"
                dot={{ fill: "#84cc16", strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="operations"
                stroke="#ea580c"
                strokeWidth={3}
                name="Operations"
                dot={{ fill: "#ea580c", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
