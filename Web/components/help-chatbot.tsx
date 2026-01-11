"use client"

import React, { useState, useRef, useEffect } from "react"
import { MessageCircle, Send, Bot, User, BarChart3, TrendingUp, Users, Upload, Settings, ArrowRight, DollarSign, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { useRouter } from "next/navigation"

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

export function HelpChatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm **BizGenie**. I've fixed my scrolling! You can now scroll through our conversation easily. How can I help you navigate today?",
      timestamp: new Date(),
    },
  ])

  const scrollRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Native scroll to bottom logic
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping, open])

  const deriveQuickActions = (text: string): QuickAction[] => {
    if (!text) return []
    const actions: QuickAction[] = []
    const lowerText = text.toLowerCase()
    const pages = [
      { name: "Finance", path: "/dashboard/finance", icon: DollarSign },
      { name: "Marketing", path: "/dashboard/marketing", icon: TrendingUp },
      { name: "Operations", path: "/dashboard/operations", icon: Users },
      { name: "Overview", path: "/dashboard/overview", icon: BarChart3 },
    ]
    pages.forEach(page => {
      if (lowerText.includes(page.path) || lowerText.includes(page.name.toLowerCase())) {
        actions.push({
          label: `Open ${page.name}`,
          action: `Maps:${page.path}`,
          IconComponent: page.icon
        })
      }
    })
    return actions.slice(0, 3) 
  }

  const addMessage = async (content: string) => {
    const userMsg: Message = { id: Date.now().toString(), role: "user", content, timestamp: new Date() }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content }))
        }),
      })
      const aiResponse = await res.json()
      if (aiResponse?.content) {
        setMessages((prev) => [...prev, {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: aiResponse.content,
          timestamp: new Date(),
          quickActions: deriveQuickActions(aiResponse.content)
        }])
      }
    } catch (err) {
      console.error("Chat Error:", err)
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-2xl z-50 text-white"
      >
        <MessageCircle className="h-7 w-7" />
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full sm:max-w-[440px] p-0 flex flex-col h-[100dvh] border-l shadow-2xl">
          
          {/* Fixed Header */}
          <div className="p-5 bg-white dark:bg-zinc-950 border-b flex items-center gap-4 shrink-0">
            <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <SheetTitle className="text-lg font-bold">BizGenie AI</SheetTitle>
              <div className="flex items-center gap-1.5 text-[10px] text-green-600 font-bold uppercase tracking-wider">
                <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse" /> Active
              </div>
            </div>
          </div>

          {/* INTERNAL SCROLLABLE BODY */}
          {/* We use a native div with overflow-y-auto and custom scrollbar styling */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-6 bg-zinc-50/50 dark:bg-zinc-900/50 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700"
            style={{ scrollBehavior: 'smooth' }}
          >
            {messages.map((message) => (
              <div key={message.id} className={`flex flex-col ${message.role === "user" ? "items-end" : "items-start"}`}>
                <div className={`flex gap-3 max-w-[90%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                    message.role === "user" ? "bg-zinc-200" : "bg-indigo-600 text-white"
                  }`}>
                    {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className={`px-4 py-3 rounded-2xl text-sm shadow-sm leading-relaxed ${
                      message.role === "user" 
                        ? "bg-indigo-600 text-white rounded-tr-none" 
                        : "bg-white dark:bg-zinc-800 border rounded-tl-none text-zinc-800 dark:text-zinc-100"
                    }`}>
                      {message.content}
                    </div>
                    
                    {message.quickActions && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {message.quickActions.map((action, i) => (
                          <Button 
                            key={i} 
                            variant="outline" 
                            size="sm" 
                            onClick={() => {
                                const path = action.action.replace("navigate:", "");
                                setOpen(false);
                                router.push(path);
                            }} 
                            className="rounded-xl h-8 text-xs bg-white dark:bg-zinc-800 hover:bg-indigo-50 border-zinc-200"
                          >
                            {action.IconComponent && <action.IconComponent className="mr-2 h-3 w-3" />}
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3 items-center">
                <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white dark:bg-zinc-800 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" />
                </div>
              </div>
            )}
            {/* Invisible element to ensure we can always scroll to the very bottom */}
            <div className="h-2" />
          </div>

          {/* Fixed Footer */}
          <div className="p-4 bg-white dark:bg-zinc-950 border-t shrink-0">
            <form 
              onSubmit={(e) => { e.preventDefault(); if(input.trim()) addMessage(input.trim()); }} 
              className="relative flex items-center gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 h-12 bg-zinc-100 dark:bg-zinc-900 border-none rounded-2xl px-4 focus-visible:ring-2 focus-visible:ring-indigo-600"
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={isTyping || !input.trim()} 
                className="h-12 w-12 rounded-2xl bg-indigo-600 text-white shrink-0 shadow-lg transition-transform active:scale-90"
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}