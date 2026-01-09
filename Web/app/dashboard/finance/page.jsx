"use client"

import { FinanceDashboard } from "@/components/finance-dashboard"
import { Badge } from "@/components/ui/badge"
import { DollarSign, TrendingUp } from "lucide-react"

export default function FinancePage() {
  return (
    <div className="space-y-6 animate-slide-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center space-x-2">
            <DollarSign className="h-8 w-8 text-primary" />
            <span>Finance Dashboard</span>
          </h1>
          <p className="text-muted-foreground mt-2">AI-powered financial management and cash flow optimization</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <TrendingUp className="h-3 w-3 mr-1" />
            CFO Module
          </Badge>
        </div>
      </div>

      {/* Finance Dashboard Component */}
      <FinanceDashboard />
    </div>
  )
}
