"use client"

import * as React from "react"
import { 
  LayoutDashboard, 
  Mail, 
  Users, 
  ShieldAlert, 
  Settings, 
  BarChart3,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Campaigns", href: "/dashboard/campaigns", icon: Mail },
  { name: "Targets", href: "/dashboard/targets", icon: Users },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Education", href: "/dashboard/education", icon: ShieldAlert },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = React.useState(false)

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside 
        className={cn(
          "relative border-r border-border bg-sidebar transition-all duration-300 flex flex-col",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <ShieldAlert className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="font-headline font-bold text-lg tracking-tight">GuardianPhish</span>
          )}
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  isActive 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-muted-foreground hover:bg-accent/10 hover:text-foreground",
                  collapsed && "justify-center px-0"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-border mt-auto">
          {!collapsed && (
            <div className="flex items-center gap-3 mb-4 px-2">
              <div className="h-8 w-8 rounded-full bg-accent/20 border border-accent/30" />
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-medium truncate">Admin User</span>
                <span className="text-xs text-muted-foreground truncate">admin@guardianphish.lab</span>
              </div>
            </div>
          )}
          <Button 
            variant="ghost" 
            className={cn("w-full justify-start gap-3", collapsed && "justify-center px-0")}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span>Log Out</span>}
          </Button>
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full border border-border bg-card flex items-center justify-center hover:bg-accent/10 z-10"
        >
          {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8">
          {children}
        </div>
      </main>
    </div>
  )
}