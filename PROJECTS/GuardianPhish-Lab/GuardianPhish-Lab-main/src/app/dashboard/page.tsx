"use client"

import * as React from "react"
import { 
  Users, 
  Mail, 
  MousePointer2, 
  AlertTriangle,
  ArrowUpRight,
  Plus
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts'
import Link from "next/link"

const stats = [
  { name: "Total Sent", value: "1,248", icon: Mail, change: "+12%", trend: "up" },
  { name: "Open Rate", value: "42.5%", icon: MousePointer2, change: "+5.2%", trend: "up" },
  { name: "Click Rate", value: "18.2%", icon: ArrowUpRight, change: "-2.1%", trend: "down" },
  { name: "Phished Users", value: "84", icon: AlertTriangle, change: "+12", trend: "up" },
]

const chartData = [
  { name: 'Mon', sent: 40, phished: 12 },
  { name: 'Tue', sent: 30, phished: 8 },
  { name: 'Wed', sent: 65, phished: 24 },
  { name: 'Thu', sent: 45, phished: 15 },
  { name: 'Fri', sent: 90, phished: 32 },
  { name: 'Sat', sent: 20, phished: 5 },
  { name: 'Sun', sent: 15, phished: 3 },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold">Lab Overview</h1>
          <p className="text-muted-foreground mt-1">Global metrics for active simulations and historical data.</p>
        </div>
        <Link href="/dashboard/campaigns/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Campaign
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} className="border-border/50 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                {stat.name}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-headline">{stat.value}</div>
              <p className={cn(
                "text-xs mt-1",
                stat.trend === 'up' ? "text-green-500" : "text-red-500"
              )}>
                {stat.change} <span className="text-muted-foreground">from last week</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <Card className="lg:col-span-2 border-border/50 shadow-md">
          <CardHeader>
            <CardTitle className="font-headline">Activity Trends</CardTitle>
            <CardDescription>Daily breakdown of emails sent vs. successful simulations.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip 
                  cursor={{fill: 'hsl(var(--primary) / 0.1)'}}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="sent" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="phished" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-border/50 shadow-md">
          <CardHeader>
            <CardTitle className="font-headline">Recent Events</CardTitle>
            <CardDescription>Live feed of user interactions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { user: "j.doe@example.com", event: "Clicked Link", time: "2 mins ago", severity: "high" },
                { user: "m.smith@corp.net", event: "Opened Email", time: "15 mins ago", severity: "low" },
                { user: "support@org.com", event: "Submitted Data", time: "1 hour ago", severity: "critical" },
                { user: "hr@company.io", event: "Clicked Link", time: "3 hours ago", severity: "high" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 pb-4 border-b border-border/50 last:border-0 last:pb-0">
                  <div className={cn(
                    "h-2 w-2 rounded-full mt-2 shrink-0",
                    item.severity === 'critical' ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" :
                    item.severity === 'high' ? "bg-orange-500" : "bg-blue-400"
                  )} />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{item.user}</span>
                    <span className="text-xs text-muted-foreground">{item.event} • {item.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-6 text-xs" asChild>
              <Link href="/dashboard/analytics">View All Activity</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ")
}