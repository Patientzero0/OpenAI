"use client"

import { OperationsDashboard } from "@/components/operations-dashboard"
import { Badge } from "@/components/ui/badge"
import { Users, Activity } from "lucide-react"

export default function OperationsPage() {
  return (
    <div className="space-y-6 animate-slide-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center space-x-2">
            <Users className="h-8 w-8 text-primary" />
            <span>Operations Dashboard</span>
          </h1>
          <p className="text-muted-foreground mt-2">Streamlined inventory, supplier, and workforce management</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            <Activity className="h-3 w-3 mr-1" />
            COO Module
          </Badge>
        </div>
      </div>

      {/* Operations Dashboard Component */}
      <OperationsDashboard />
    </div>
  )
}
