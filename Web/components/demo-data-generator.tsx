"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Database, Shuffle, Download, CheckCircle } from "lucide-react"
import { useState } from "react"

export function DemoDataGenerator() {
  const [businessType, setBusinessType] = useState("")
  const [dataSize, setDataSize] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const generateSampleData = () => {
    setIsGenerating(true)
    setGenerationProgress(0)

    // Simulate data generation progress
    const interval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsGenerating(false)
          setIsComplete(true)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const businessTypes = [
    { value: "retail", label: "Retail Store", description: "Electronics, clothing, general merchandise" },
    { value: "restaurant", label: "Restaurant/Cafe", description: "Food service, delivery, catering" },
    { value: "services", label: "Service Business", description: "Consulting, repair, professional services" },
    { value: "manufacturing", label: "Small Manufacturing", description: "Production, assembly, distribution" },
  ]

  const dataSizes = [
    { value: "3months", label: "3 Months", transactions: "~150", description: "Quick overview" },
    { value: "6months", label: "6 Months", transactions: "~300", description: "Recommended" },
    { value: "12months", label: "12 Months", transactions: "~600", description: "Comprehensive analysis" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Database className="h-5 w-5 text-primary" />
          <span>Custom Demo Data Generator</span>
        </CardTitle>
        <CardDescription>Generate realistic sample data tailored to your business type</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isComplete ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="business-type">Business Type</Label>
                <Select value={businessType} onValueChange={setBusinessType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your business type" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div>
                          <div className="font-medium">{type.label}</div>
                          <div className="text-xs text-muted-foreground">{type.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="data-size">Data Period</Label>
                <Select value={dataSize} onValueChange={setDataSize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select data period" />
                  </SelectTrigger>
                  <SelectContent>
                    {dataSizes.map((size) => (
                      <SelectItem key={size.value} value={size.value}>
                        <div>
                          <div className="font-medium">{size.label}</div>
                          <div className="text-xs text-muted-foreground">
                            {size.transactions} transactions • {size.description}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {businessType && dataSize && (
              <div className="p-4 bg-muted/30 rounded-lg">
                <h4 className="font-medium mb-2">Generated Data Will Include:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Sales transactions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Expense records</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Customer reviews</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Inventory data</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Supplier records</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Employee data</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Marketing campaigns</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>GST records</span>
                  </div>
                </div>
              </div>
            )}

            {isGenerating && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Generating sample data...</span>
                  <span className="text-sm text-muted-foreground">{generationProgress}%</span>
                </div>
                <Progress value={generationProgress} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  Creating realistic transactions, customer data, and business scenarios...
                </div>
              </div>
            )}

            <div className="flex space-x-2">
              <Button
                onClick={generateSampleData}
                disabled={!businessType || !dataSize || isGenerating}
                className="flex-1"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Shuffle className="h-4 w-4 mr-2" />
                    Generate Demo Data
                  </>
                )}
              </Button>
              <Button variant="outline" disabled={isGenerating} className="bg-transparent">
                Use Default Data
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <CheckCircle className="h-6 w-6" />
              <span className="text-lg font-medium">Demo Data Generated Successfully!</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold">287</div>
                <div className="text-muted-foreground">Transactions</div>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold">45</div>
                <div className="text-muted-foreground">Customers</div>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold">12</div>
                <div className="text-muted-foreground">Suppliers</div>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold">156</div>
                <div className="text-muted-foreground">Reviews</div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button className="flex-1" asChild>
                <a href="/dashboard/overview?demo=true">
                  <Database className="h-4 w-4 mr-2" />
                  Explore Dashboard
                </a>
              </Button>
              <Button variant="outline" className="bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
