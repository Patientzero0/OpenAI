"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Smartphone, CreditCard, CheckCircle } from "lucide-react"
import { useState } from "react"

export function SmsIntegrationForm() {
  const [isConnected, setIsConnected] = useState(false)
  const [smsData, setSmsData] = useState("")
  const [autoSync, setAutoSync] = useState(true)

  const bankSmsExamples = [
    {
      bank: "SBI",
      example: "SBI: Rs.5000 debited from A/c XX1234 on 15-JUN-24 to UPI/MERCHANT_NAME/REF123456",
      type: "Debit",
    },
    {
      bank: "HDFC",
      example: "HDFC Bank: Rs.2500 credited to A/c XX5678 on 15-JUN-24 from UPI/CUSTOMER_NAME",
      type: "Credit",
    },
    {
      bank: "ICICI",
      example: "ICICI: Transaction of Rs.1200 at MERCHANT on 15-JUN-24 using Card XX9876",
      type: "Card Payment",
    },
  ]

  const recentTransactions = [
    { amount: "₹5,000", type: "UPI Payment", merchant: "Customer ABC", time: "2 hours ago", status: "processed" },
    { amount: "₹2,500", type: "Bank Transfer", merchant: "Supplier XYZ", time: "4 hours ago", status: "processed" },
    { amount: "₹1,200", type: "Card Payment", merchant: "Office Supplies", time: "6 hours ago", status: "processed" },
  ]

  return (
    <div className="space-y-6">
      {/* Connection Setup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Smartphone className="h-5 w-5 text-primary" />
            <span>SMS & UPI Integration</span>
          </CardTitle>
          <CardDescription>Connect your bank SMS notifications for automatic transaction tracking</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isConnected ? (
            <>
              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-3">
                  <MessageCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-blue-800 dark:text-blue-200 mb-1">How it works</div>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Forward your bank SMS notifications to our secure system. We'll automatically extract transaction
                      data and update your financial records.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Your Phone Number</Label>
                  <Input id="phone" placeholder="+91 98765 43210" type="tel" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="banks">Select Your Banks</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {["SBI", "HDFC", "ICICI", "Axis", "Kotak", "PNB", "BOI", "Others"].map((bank) => (
                      <Button key={bank} variant="outline" size="sm" className="justify-start bg-transparent">
                        {bank}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button onClick={() => setIsConnected(true)} className="w-full">
                  Connect SMS Integration
                </Button>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium text-green-800 dark:text-green-200">SMS Integration Active</div>
                    <div className="text-sm text-green-700 dark:text-green-300">
                      Connected to +91 98765 43210 • 3 banks linked
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Auto-sync transactions</div>
                  <div className="text-sm text-muted-foreground">Automatically process new SMS notifications</div>
                </div>
                <Switch checked={autoSync} onCheckedChange={setAutoSync} />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Manual SMS Input */}
      <Card>
        <CardHeader>
          <CardTitle>Manual SMS Input</CardTitle>
          <CardDescription>Paste bank SMS messages for immediate processing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sms-data">Bank SMS Messages</Label>
            <Textarea
              id="sms-data"
              placeholder="Paste your bank SMS messages here, one per line..."
              value={smsData}
              onChange={(e) => setSmsData(e.target.value)}
              rows={6}
            />
          </div>

          <div className="flex space-x-2">
            <Button className="flex-1">Process SMS Data</Button>
            <Button variant="outline">Clear</Button>
          </div>
        </CardContent>
      </Card>

      {/* SMS Format Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Supported SMS Formats</CardTitle>
          <CardDescription>Examples of bank SMS formats we can process</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {bankSmsExamples.map((example, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{example.bank}</Badge>
                  <Badge variant={example.type === "Credit" ? "default" : "secondary"}>{example.type}</Badge>
                </div>
                <p className="text-sm font-mono text-muted-foreground">{example.example}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      {isConnected && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Transactions
              <Badge variant="outline">{recentTransactions.length} processed</Badge>
            </CardTitle>
            <CardDescription>Automatically extracted from SMS notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium text-sm">{transaction.merchant}</div>
                      <div className="text-xs text-muted-foreground">{transaction.type}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{transaction.amount}</div>
                    <div className="text-xs text-muted-foreground">{transaction.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
