"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package } from "lucide-react"
import { useState } from "react"

export function ManualDataForm() {
  const [formData, setFormData] = useState({
    type: "",
    amount: "",
    description: "",
    category: "",
    date: "",
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-primary" />
            <span>Manual Data Entry</span>
          </CardTitle>
          <CardDescription>Add business data manually when automated sources aren't available</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="transaction" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="transaction">Transaction</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="employee">Employee</TabsTrigger>
              <TabsTrigger value="supplier">Supplier</TabsTrigger>
            </TabsList>

            <TabsContent value="transaction" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="transaction-type">Transaction Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                      <SelectItem value="investment">Investment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (₹)</Label>
                  <Input id="amount" type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="operations">Operations</SelectItem>
                      <SelectItem value="rent">Rent</SelectItem>
                      <SelectItem value="utilities">Utilities</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Transaction details..." rows={3} />
              </div>
              <Button className="w-full">Add Transaction</Button>
            </TabsContent>

            <TabsContent value="inventory" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product-name">Product Name</Label>
                  <Input id="product-name" placeholder="Product name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input id="sku" placeholder="Product SKU" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input id="quantity" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit-price">Unit Price (₹)</Label>
                  <Input id="unit-price" type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supplier">Supplier</Label>
                  <Input id="supplier" placeholder="Supplier name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Storage location" />
                </div>
              </div>
              <Button className="w-full">Add Inventory Item</Button>
            </TabsContent>

            <TabsContent value="employee" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employee-name">Employee Name</Label>
                  <Input id="employee-name" placeholder="Full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" placeholder="Job title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shift">Shift</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select shift" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (9 AM - 5 PM)</SelectItem>
                      <SelectItem value="evening">Evening (2 PM - 10 PM)</SelectItem>
                      <SelectItem value="night">Night (10 PM - 6 AM)</SelectItem>
                      <SelectItem value="full">Full Day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hours">Hours Worked</Label>
                  <Input id="hours" type="number" placeholder="8" step="0.5" />
                </div>
              </div>
              <Button className="w-full">Add Employee Record</Button>
            </TabsContent>

            <TabsContent value="supplier" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="supplier-name">Supplier Name</Label>
                  <Input id="supplier-name" placeholder="Company name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Person</Label>
                  <Input id="contact" placeholder="Contact name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+91 98765 43210" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="supplier@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reliability">Reliability Score</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Rate reliability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent (90-100%)</SelectItem>
                      <SelectItem value="good">Good (80-89%)</SelectItem>
                      <SelectItem value="average">Average (70-79%)</SelectItem>
                      <SelectItem value="poor">Poor (Below 70%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment-terms">Payment Terms</Label>
                  <Input id="payment-terms" placeholder="e.g., Net 30 days" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Additional supplier information..." rows={3} />
              </div>
              <Button className="w-full">Add Supplier</Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
