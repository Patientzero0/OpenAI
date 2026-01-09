"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CreditCard, FileText, Calendar, CheckCircle, AlertTriangle } from "lucide-react"
import { useState } from "react"

export function GstFilingForm() {
  const [gstData, setGstData] = useState({
    gstin: "",
    period: "",
    filingType: "",
  })

  const gstSummary = {
    totalSales: 567000,
    totalPurchases: 345000,
    outputTax: 102060,
    inputTax: 62100,
    netTax: 39960,
  }

  const filingStatus = [
    { type: "GSTR-1", period: "May 2024", status: "Filed", dueDate: "2024-06-11", filed: true },
    { type: "GSTR-3B", period: "May 2024", status: "Filed", dueDate: "2024-06-20", filed: true },
    { type: "GSTR-1", period: "June 2024", status: "Pending", dueDate: "2024-07-11", filed: false },
    { type: "GSTR-3B", period: "June 2024", status: "Pending", dueDate: "2024-07-20", filed: false },
  ]

  return (
    <div className="space-y-6">
      {/* GST Setup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5 text-primary" />
            <span>GST Filing Integration</span>
          </CardTitle>
          <CardDescription>Automate GST return preparation and filing from your transaction data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gstin">GSTIN</Label>
              <Input
                id="gstin"
                placeholder="22AAAAA0000A1Z5"
                value={gstData.gstin}
                onChange={(e) => setGstData({ ...gstData, gstin: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="business-type">Business Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="regular">Regular</SelectItem>
                  <SelectItem value="composition">Composition</SelectItem>
                  <SelectItem value="casual">Casual Taxable Person</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <div className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">Auto-compilation Ready</div>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  All your invoices and transactions have been processed. GST returns can be auto-generated from your
                  data.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* GST Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Current Period Summary</CardTitle>
          <CardDescription>June 2024 GST calculation based on your transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">₹{gstSummary.totalSales.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Sales</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">₹{gstSummary.totalPurchases.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Purchases</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">₹{gstSummary.netTax.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Net Tax Payable</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Output Tax (Sales)</span>
              <span className="font-medium">₹{gstSummary.outputTax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Input Tax Credit</span>
              <span className="font-medium">₹{gstSummary.inputTax.toLocaleString()}</span>
            </div>
            <hr />
            <div className="flex justify-between items-center font-medium">
              <span>Net Tax Payable</span>
              <span className="text-green-600">₹{gstSummary.netTax.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex space-x-2 mt-6">
            <Button className="flex-1">Generate GSTR-1</Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              Generate GSTR-3B
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filing Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Filing Status
            <Badge variant="outline">4 returns tracked</Badge>
          </CardTitle>
          <CardDescription>Track your GST return filing status and due dates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filingStatus.map((filing, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 border rounded-lg ${
                  filing.filed
                    ? "bg-green-50 dark:bg-green-950 border-green-200"
                    : "bg-yellow-50 dark:bg-yellow-950 border-yellow-200"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-full ${
                      filing.filed ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {filing.filed ? <CheckCircle className="h-4 w-4" /> : <Calendar className="h-4 w-4" />}
                  </div>
                  <div>
                    <div className="font-medium text-sm">
                      {filing.type} - {filing.period}
                    </div>
                    <div className="text-xs text-muted-foreground">Due: {filing.dueDate}</div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={filing.filed ? "default" : "secondary"}>{filing.status}</Badge>
                  {!filing.filed && (
                    <Button size="sm" variant="outline" className="ml-2 bg-transparent">
                      File Now
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <span>GST Compliance Score</span>
          </CardTitle>
          <CardDescription>Your GST compliance health based on filing history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">Overall Score</span>
              <span className="text-3xl font-bold text-green-600">92/100</span>
            </div>
            <Progress value={92} className="h-3" />
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="font-medium">Timely Filing</div>
                <div className="text-green-600">Excellent</div>
              </div>
              <div className="text-center">
                <div className="font-medium">Data Accuracy</div>
                <div className="text-green-600">Very Good</div>
              </div>
              <div className="text-center">
                <div className="font-medium">Payment History</div>
                <div className="text-green-600">Good</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
