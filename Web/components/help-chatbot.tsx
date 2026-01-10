"use client"

import React, { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, User, Home, BarChart3, TrendingUp, Users, Upload, Settings, HelpCircle, ArrowRight, Brain, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { useRouter, usePathname } from "next/navigation"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  quickActions?: QuickAction[]
}

interface QuickAction {
  label: string
  action: string
  IconComponent?: React.ComponentType<{ className?: string }>
}

const KNOWLEDGE_BASE = {
  pages: [
    {
      name: "Home",
      path: "/",
      description: "Landing page with features, pricing, and company information",
      icon: Home,
    },
    {
      name: "Dashboard Overview",
      path: "/dashboard/overview",
      description: "Get a comprehensive view of your business metrics and KPIs",
      icon: BarChart3,
    },
    {
      name: "Finance (CFO)",
      path: "/dashboard/finance",
      description: "Manage finances, track expenses, calculate loans, and handle GST filing",
      icon: DollarSign,
    },
    {
      name: "Marketing (CMO)",
      path: "/dashboard/marketing",
      description: "AI-powered marketing insights, sentiment analysis, and video generation",
      icon: TrendingUp,
    },
    {
      name: "Operations (COO)",
      path: "/dashboard/operations",
      description: "Monitor inventory, track suppliers, manage employees, and operations analytics",
      icon: Users,
    },
    {
      name: "Data Input",
      path: "/dashboard/data-input",
      description: "Upload invoices, integrate WhatsApp/SMS, or manually enter business data",
      icon: Upload,
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      description: "Configure your account, preferences, and integrations",
      icon: Settings,
    },
    {
      name: "Demo",
      path: "/demo",
      description: "Explore interactive demos and scenarios to understand features",
      icon: HelpCircle,
    },
  ],
  features: [
    {
      category: "Finance",
      items: [
        "Real-time expense tracking",
        "GST filing automation",
        "Loan calculator with risk assessment",
        "Cash flow analysis",
        "Financial reporting and insights",
      ],
    },
    {
      category: "Marketing",
      items: [
        "Sentiment analysis from customer data",
        "Auto-generated marketing campaigns",
        "AI video generation for promotions",
        "Social media insights",
        "Campaign performance tracking",
      ],
    },
    {
      category: "Operations",
      items: [
        "Stock and inventory monitoring",
        "Supplier reliability tracking",
        "Employee management",
        "Operations analytics",
        "Automated alerts for low stock",
      ],
    },
  ],
}

export function HelpChatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm your BizGenie assistant. I can help you navigate the website, explain features, and guide you to different sections. How can I help you today?",
      timestamp: new Date(),
      quickActions: [
        { label: "View Features", action: "features" },
        { label: "Go to Dashboard", action: "navigate:/dashboard/overview" },
        { label: "Learn About Finance", action: "finance" },
        { label: "Explore Marketing", action: "marketing" },
      ],
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('[data-slot="scroll-area-viewport"]')
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight
      }
    }
  }, [messages])

  const generateResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase()
    let response = ""
    let quickActions: QuickAction[] = []

    // Navigation queries
    if (lowerMessage.includes("go to") || lowerMessage.includes("navigate") || lowerMessage.includes("show me") || lowerMessage.includes("open")) {
      for (const page of KNOWLEDGE_BASE.pages) {
        if (lowerMessage.includes(page.name.toLowerCase()) || lowerMessage.includes(page.description.toLowerCase().split(" ")[0])) {
          response = `I'll take you to the ${page.name} page. This page ${page.description.toLowerCase()}.`
          quickActions.push({
            label: `Go to ${page.name}`,
            action: `navigate:${page.path}`,
            IconComponent: page.icon,
          })
          return {
            id: Date.now().toString(),
            role: "assistant",
            content: response,
            timestamp: new Date(),
            quickActions,
          }
        }
      }
      response = "I can help you navigate to different sections. Which page would you like to visit?\n\n- Dashboard Overview\n- Finance (CFO)\n- Marketing (CMO)\n- Operations (COO)\n- Data Input\n- Settings\n- Demo"
      quickActions = KNOWLEDGE_BASE.pages.slice(1, 5).map((page) => ({
        label: page.name,
        action: `navigate:${page.path}`,
        IconComponent: page.icon,
      }))
    }
    // Features queries
    else if (lowerMessage.includes("feature") || lowerMessage.includes("what can") || lowerMessage.includes("capabilities") || lowerMessage.includes("what does")) {
      response = "BizGenie Lite offers three main categories of features:\n\n**Finance (CFO)**: Real-time expense tracking, GST filing automation, loan calculator, cash flow analysis, and financial reporting.\n\n**Marketing (CMO)**: Sentiment analysis, auto-generated campaigns, AI video generation, social media insights, and campaign tracking.\n\n**Operations (COO)**: Stock monitoring, supplier tracking, employee management, operations analytics, and automated alerts.\n\nWhich feature would you like to know more about?"
      quickActions = [
        { label: "Finance Features", action: "finance" },
        { label: "Marketing Features", action: "marketing" },
        { label: "Operations Features", action: "operations" },
      ]
    }
    // Finance queries
    else if (lowerMessage.includes("finance") || lowerMessage.includes("cfo") || lowerMessage.includes("loan") || lowerMessage.includes("gst") || lowerMessage.includes("expense")) {
      response = "The Finance (CFO) section helps you manage your business finances:\n\n• **Expense Tracking**: Monitor your expenses in real-time\n• **GST Filing**: Automate your GST filing process\n• **Loan Calculator**: Calculate loan options with risk assessment\n• **Cash Flow**: Analyze your cash flow patterns\n• **Reports**: Generate detailed financial reports\n\nWould you like me to take you there?"
      quickActions = [
        { label: "Go to Finance", action: "navigate:/dashboard/finance", IconComponent: DollarSign },
        { label: "Learn More", action: "finance-details" },
      ]
    }
    // Marketing queries
    else if (lowerMessage.includes("marketing") || lowerMessage.includes("cmo") || lowerMessage.includes("campaign") || lowerMessage.includes("video") || lowerMessage.includes("sentiment")) {
      response = "The Marketing (CMO) section provides AI-powered marketing tools:\n\n• **Sentiment Analysis**: Analyze customer feedback and reviews\n• **Campaign Generation**: Auto-generate marketing campaigns\n• **Video Generation**: Create promotional videos using AI\n• **Social Media Insights**: Track your social media performance\n• **Campaign Tracking**: Monitor campaign effectiveness\n\nWould you like to explore the marketing section?"
      quickActions = [
        { label: "Go to Marketing", action: "navigate:/dashboard/marketing", IconComponent: TrendingUp },
        { label: "Learn More", action: "marketing-details" },
      ]
    }
    // Operations queries
    else if (lowerMessage.includes("operation") || lowerMessage.includes("coo") || lowerMessage.includes("inventory") || lowerMessage.includes("stock") || lowerMessage.includes("supplier")) {
      response = "The Operations (COO) section helps you manage day-to-day operations:\n\n• **Inventory Management**: Monitor stock levels in real-time\n• **Supplier Tracking**: Track supplier reliability and performance\n• **Employee Management**: Manage your team and resources\n• **Operations Analytics**: Get insights into your operations\n• **Alerts**: Receive automated alerts for low stock and issues\n\nWould you like to see the operations dashboard?"
      quickActions = [
        { label: "Go to Operations", action: "navigate:/dashboard/operations", IconComponent: Users },
        { label: "Learn More", action: "operations-details" },
      ]
    }
    // Data input queries
    else if (lowerMessage.includes("data") || lowerMessage.includes("upload") || lowerMessage.includes("invoice") || lowerMessage.includes("whatsapp") || lowerMessage.includes("sms")) {
      response = "The Data Input section allows you to add business data in multiple ways:\n\n• **Invoice Upload**: Upload invoice files directly\n• **WhatsApp Integration**: Sync data from WhatsApp messages\n• **SMS Integration**: Import data via SMS\n• **Manual Entry**: Enter data manually through forms\n\nWould you like to go to the data input page?"
      quickActions = [
        { label: "Go to Data Input", action: "navigate:/dashboard/data-input", IconComponent: Upload },
      ]
    }
    // Pages list query
    else if (lowerMessage.includes("all pages") || lowerMessage.includes("list pages") || lowerMessage.includes("show me all") || lowerMessage.includes("pages")) {
      response = "Here are all the pages available on BizGenie Lite:\n\n" + 
        KNOWLEDGE_BASE.pages.map((page) => `• **${page.name}** (${page.path}): ${page.description}`).join("\n\n") +
        "\n\nWhich page would you like to visit?"
      quickActions = KNOWLEDGE_BASE.pages.slice(0, 6).map((page) => ({
        label: page.name,
        action: `navigate:${page.path}`,
        IconComponent: page.icon,
      }))
    }
    // Help/Guide queries
    else if (lowerMessage.includes("help") || lowerMessage.includes("guide") || lowerMessage.includes("how") || lowerMessage.includes("tutorial") || lowerMessage.includes("get started")) {
      response = "I'm here to help! I can:\n\n• Navigate you to any page or section\n• Explain features and capabilities\n• Answer questions about the platform\n• Guide you through workflows\n\nWhat would you like help with? You can ask about features, navigation, or specific functionality."
      quickActions = [
        { label: "View All Pages", action: "pages" },
        { label: "View Features", action: "features" },
        { label: "Go to Dashboard", action: "navigate:/dashboard/overview" },
      ]
    }
    // Greetings
    else if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      response = "Hello! Welcome to BizGenie Lite. I'm here to help you navigate the platform. You can ask me about:\n\n• Features and capabilities\n• How to navigate to different sections\n• What each dashboard does\n• How to use specific tools\n\nWhat would you like to explore?"
      quickActions = [
        { label: "View Features", action: "features" },
        { label: "Go to Dashboard", action: "navigate:/dashboard/overview" },
      ]
    }
    // Settings queries
    else if (lowerMessage.includes("setting") || lowerMessage.includes("configure") || lowerMessage.includes("preference")) {
      response = "The Settings page allows you to configure your account:\n\n• Account preferences\n• Integration settings\n• Notification preferences\n• User profile management\n\nWould you like to go to settings?"
      quickActions = [
        { label: "Go to Settings", action: "navigate:/dashboard/settings", IconComponent: Settings },
      ]
    }
    // Demo queries
    else if (lowerMessage.includes("demo") || lowerMessage.includes("example") || lowerMessage.includes("trial")) {
      response = "The Demo section provides interactive examples and scenarios to help you understand how BizGenie Lite works:\n\n• Interactive demos\n• Real-world scenarios\n• Feature walkthroughs\n• Guided tours\n\nWould you like to explore the demo section?"
      quickActions = [
        { label: "Go to Demo", action: "navigate:/demo", IconComponent: HelpCircle },
      ]
    }
    // Default response
    else {
      response = "I understand you're asking about: \"" + userMessage + "\"\n\nI can help you with:\n• Navigating to different sections\n• Understanding features\n• Finding specific pages\n• General guidance\n\nCould you rephrase your question, or would you like to see a list of available pages?"
      quickActions = [
        { label: "View All Pages", action: "pages" },
        { label: "View Features", action: "features" },
        { label: "Get Help", action: "help" },
      ]
    }

    return {
      id: Date.now().toString(),
      role: "assistant",
      content: response,
      timestamp: new Date(),
      quickActions,
    }
  }

  const handleQuickAction = (action: string) => {
    if (action.startsWith("navigate:")) {
      const path = action.replace("navigate:", "")
      setOpen(false)
      setTimeout(() => {
        router.push(path)
      }, 300)
      addMessage("user", `Take me to ${path}`)
    } else if (action === "pages") {
      addMessage("user", "Show me all pages")
    } else if (action === "features") {
      addMessage("user", "What features are available?")
    } else if (action === "tour") {
      addMessage("user", "How do I get started?")
    } else if (action === "help") {
      addMessage("user", "I need help")
    } else if (action.includes("-details")) {
      addMessage("user", action.replace("-details", ""))
    } else {
      addMessage("user", action)
    }
  }

  const addMessage = (role: "user" | "assistant", content: string) => {
    if (role === "user") {
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, userMessage])
      setInput("")

      // Generate response
      setIsTyping(true)
      setTimeout(() => {
        const response = generateResponse(content)
        setMessages((prev) => [...prev, response])
        setIsTyping(false)
      }, 800)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      addMessage("user", input.trim())
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center group"
        size="icon"
      >
        <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 h-4 w-4 bg-white rounded-full flex items-center justify-center">
          <span className="h-2 w-2 bg-orange-500 rounded-full animate-pulse"></span>
        </span>
      </Button>

      {/* Chat Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full sm:w-[400px] p-0 flex flex-col">
          <SheetHeader className="border-b p-4 bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-950/20 dark:to-pink-950/20">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <SheetTitle className="text-lg font-semibold">BizGenie Assistant</SheetTitle>
                <SheetDescription className="text-xs">I'm here to help you navigate</SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.role === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
                    <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-gradient-to-r from-orange-500 to-pink-500 text-white"}`}>
                      {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    <div className={`rounded-2xl px-4 py-2 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      {message.quickActions && message.quickActions.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {message.quickActions.map((action, idx) => (
                            <Button
                              key={idx}
                              variant="outline"
                              size="sm"
                              className="w-full justify-start text-xs"
                              onClick={() => handleQuickAction(action.action)}
                            >
                              {action.IconComponent && (
                                <action.IconComponent className="mr-2 h-4 w-4" />
                              )}
                              {action.label}
                              <ArrowRight className="ml-auto h-3 w-3" />
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white flex items-center justify-center">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="rounded-2xl px-4 py-2 bg-muted">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="border-t p-4 bg-background">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1"
              />
              <Button type="submit" size="icon" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-2 text-center">Try: "Show me finance features" or "Go to marketing"</p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
