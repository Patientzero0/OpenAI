import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, FileText, MessageCircle, CreditCard, Package } from "lucide-react"
import { InvoiceUploadForm } from "@/components/forms/invoice-upload-form"
import { SmsIntegrationForm } from "@/components/forms/sms-integration-form"
import { WhatsappDataForm } from "@/components/forms/whatsapp-data-form"
import { ManualDataForm } from "@/components/forms/manual-data-form"
import { GstFilingForm } from "@/components/forms/gst-filing-form"

export default function DataInputPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Data Input & Integration</h1>
        <p className="text-muted-foreground">Upload and integrate your business data for AI-powered insights</p>
      </div>

      {/* Integration Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5 text-primary" />
            <span>Supported Data Sources</span>
          </CardTitle>
          <CardDescription>
            BizGenie Lite can process multiple data sources to provide comprehensive business insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="font-medium text-sm">Invoices & Bills</div>
              <div className="text-xs text-muted-foreground">PDF, Excel, Images</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <MessageCircle className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="font-medium text-sm">SMS & UPI</div>
              <div className="text-xs text-muted-foreground">Bank notifications</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <CreditCard className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="font-medium text-sm">GST Filings</div>
              <div className="text-xs text-muted-foreground">GSTR-1, GSTR-3B</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Package className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="font-medium text-sm">Manual Entry</div>
              <div className="text-xs text-muted-foreground">Custom data input</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Input Forms */}
      <Tabs defaultValue="invoices" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="invoices" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Invoices</span>
          </TabsTrigger>
          <TabsTrigger value="sms" className="flex items-center space-x-2">
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">SMS/UPI</span>
          </TabsTrigger>
          <TabsTrigger value="whatsapp" className="flex items-center space-x-2">
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </TabsTrigger>
          <TabsTrigger value="gst" className="flex items-center space-x-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">GST</span>
          </TabsTrigger>
          <TabsTrigger value="manual" className="flex items-center space-x-2">
            <Package className="h-4 w-4" />
            <span className="hidden sm:inline">Manual</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="invoices">
          <InvoiceUploadForm />
        </TabsContent>

        <TabsContent value="sms">
          <SmsIntegrationForm />
        </TabsContent>

        <TabsContent value="whatsapp">
          <WhatsappDataForm />
        </TabsContent>

        <TabsContent value="gst">
          <GstFilingForm />
        </TabsContent>

        <TabsContent value="manual">
          <ManualDataForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
