"use client"

import type React from "react"
import { Brain, BarChart3, TrendingUp, Users, Home, Upload, Settings, HelpCircle } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

const navigation = [
  {
    title: "Overview",
    url: "/dashboard/overview",
    icon: Home,
  },
  {
    title: "Finance (CFO)",
    url: "/dashboard/finance",
    icon: BarChart3,
  },
  {
    title: "Marketing (CMO)",
    url: "/dashboard/marketing",
    icon: TrendingUp,
  },
  {
    title: "Operations (COO)",
    url: "/dashboard/operations",
    icon: Users,
  },
  {
    title: "Data Input",
    url: "/dashboard/data-input",
    icon: Upload,
  },
]

const secondaryNavigation = [
  {
    title: "Demo",
    url: "/demo",
    icon: HelpCircle,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-border">
        <SidebarHeader className="border-b border-border">
          <div className="flex items-center justify-between px-2 py-2">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">BizGenie Lite</span>
            </div>
            <ThemeToggle />
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigation.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                      className="transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <Link href={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Tools</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {secondaryNavigation.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                      className="transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <Link href={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-border">
          <div className="p-2">
            <Button variant="outline" size="sm" asChild className="w-full bg-transparent">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold">Business Intelligence</span>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 bg-muted/30">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
