"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, X, CheckCircle, AlertCircle } from "lucide-react"
import { useState } from "react"

export function InvoiceUploadForm() {
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; status: string; size: string }>>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newFiles = Array.from(files).map((file) => ({
        name: file.name,
        status: "processing",
        size: (file.size / 1024 / 1024).toFixed(2) + " MB",
      }))
      setUploadedFiles([...uploadedFiles, ...newFiles])
      setIsProcessing(true)

      // Simulate processing
      setTimeout(() => {
        setUploadedFiles((prev) =>
          prev.map((file) => (file.status === "processing" ? { ...file, status: "completed" } : file)),
        )
        setIsProcessing(false)
      }, 3000)
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5 text-primary" />
            <span>Upload Invoices & Bills</span>
          </CardTitle>
          <CardDescription>
            Upload your invoices, bills, and receipts for automatic data extraction and analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* File Upload */}
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Drop files here or click to upload</h3>
              <p className="text-sm text-muted-foreground">Supports PDF, Excel, Word, and image files (JPG, PNG)</p>
              <Input
                type="file"
                multiple
                accept=".pdf,.xlsx,.xls,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <Label htmlFor="file-upload">
                <Button variant="outline" className="cursor-pointer bg-transparent" asChild>
                  <span>Choose Files</span>
                </Button>
              </Label>
            </div>
          </div>

          {/* Processing Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="invoice-type">Invoice Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Sales Invoice</SelectItem>
                  <SelectItem value="purchase">Purchase Invoice</SelectItem>
                  <SelectItem value="expense">Expense Receipt</SelectItem>
                  <SelectItem value="gst">GST Invoice</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="auto-categorize">Processing Mode</Label>
              <Select defaultValue="auto">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto-categorize</SelectItem>
                  <SelectItem value="manual">Manual review</SelectItem>
                  <SelectItem value="batch">Batch processing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any context or special instructions for processing these documents..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Uploaded Files</span>
              <Badge variant="outline">{uploadedFiles.length} files</Badge>
            </CardTitle>
            <CardDescription>Files being processed by AI for data extraction</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium text-sm">{file.name}</div>
                      <div className="text-xs text-muted-foreground">{file.size}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {file.status === "processing" && (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                        <span className="text-sm text-muted-foreground">Processing...</span>
                      </div>
                    )}
                    {file.status === "completed" && (
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-600">Completed</span>
                      </div>
                    )}
                    {file.status === "error" && (
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <span className="text-sm text-red-600">Error</span>
                      </div>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {isProcessing && (
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span className="text-sm text-blue-700 dark:text-blue-300">
                    AI is extracting data from your documents...
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Processing Results */}
      {uploadedFiles.some((file) => file.status === "completed") && (
        <Card>
          <CardHeader>
            <CardTitle>Extracted Data Preview</CardTitle>
            <CardDescription>Review and confirm the extracted information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 border rounded-lg">
                  <div className="text-sm font-medium">Total Amount</div>
                  <div className="text-2xl font-bold">₹45,230</div>
                  <div className="text-xs text-muted-foreground">From 3 invoices</div>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="text-sm font-medium">GST Amount</div>
                  <div className="text-2xl font-bold">₹8,141</div>
                  <div className="text-xs text-muted-foreground">18% average rate</div>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="text-sm font-medium">Vendors</div>
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-xs text-muted-foreground">Unique suppliers</div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button className="flex-1">Confirm & Import Data</Button>
                <Button variant="outline">Review Details</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
