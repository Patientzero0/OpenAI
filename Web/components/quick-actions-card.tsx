"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, Plus, FileText, MessageCircle, Package, CreditCard, Users } from "lucide-react"
import Link from "next/link"

export function QuickActionsCard() {
  const quickActions = [
    {
      icon: Plus,
      title: "Add New Product",
      description: "Add inventory item",
      action: "/dashboard/inventory/add",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: FileText,
      title: "Create Invoice",
      description: "Generate customer invoice",
      action: "/dashboard/finance/invoice",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: MessageCircle,
      title: "Send Campaign",
      description: "Launch marketing campaign",
      action: "/dashboard/marketing/campaign",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Package,
      title: "Check Inventory",
      description: "Review stock levels",
      action: "/dashboard/operations",
      color: "bg-cyan-100 text-cyan-600",
    },
    {
      icon: CreditCard,
      title: "Record Payment",
      description: "Log customer payment",
      action: "/dashboard/finance/payment",
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      icon: Users,
      title: "Manage Staff",
      description: "Update employee shifts",
      action: "/dashboard/operations/staff",
      color: "bg-indigo-100 text-indigo-600",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Zap className="h-5 w-5 text-primary" />
          <span>Quick Actions</span>
        </CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="justify-start h-auto p-3 hover:bg-muted/50 bg-transparent"
              asChild
            >
              <Link href={action.action}>
                <div className="flex items-center space-x-3 w-full">
                  <div className={`p-2 rounded-lg ${action.color}`}>
                    <action.icon className="h-4 w-4" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-sm">{action.title}</div>
                    <div className="text-xs text-muted-foreground">{action.description}</div>
                  </div>
                </div>
              </Link>
            </Button>
          ))}
        </div>

        {/* AI Assistant */}
        <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-center space-x-2 mb-2">
            <div className="p-1 bg-primary/10 rounded-full">
              <Zap className="h-3 w-3 text-primary" />
            </div>
            <span className="font-medium text-sm">AI Assistant</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Need help with your business? Ask our AI assistant for personalized recommendations.
          </p>
          <Button size="sm" className="w-full">
            <MessageCircle className="h-3 w-3 mr-2" />
            Chat with AI
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
