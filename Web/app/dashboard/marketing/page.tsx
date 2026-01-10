"use client"

import { MarketingDashboard } from "@/components/marketing-dashboard"
import { VideoGeneratorComponent } from "@/components/video-generator"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Sparkles } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MarketingPage() {
  return (
    <div className="space-y-6 animate-slide-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center space-x-2">
            <TrendingUp className="h-8 w-8 text-primary" />
            <span>Marketing Dashboard</span>
          </h1>
          <p className="text-muted-foreground mt-2">AI-driven marketing intelligence, campaign optimization, and video generation</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Sparkles className="h-3 w-3 mr-1" />
            CMO Module
          </Badge>
        </div>
      </div>

      {/* Tabs for different sections */}
      <Tabs defaultValue="analytics" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="analytics">Analytics & Insights</TabsTrigger>
          <TabsTrigger value="video">Video Generator</TabsTrigger>
        </TabsList>
        
        <TabsContent value="analytics" className="space-y-6">
          {/* Marketing Dashboard Component */}
          <MarketingDashboard />
        </TabsContent>
        
        <TabsContent value="video">
          {/* Video Generator Component */}
          <VideoGeneratorComponent />
        </TabsContent>
      </Tabs>
    </div>
  )
}
