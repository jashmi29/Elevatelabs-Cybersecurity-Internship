"use client"

import React from 'react';
import { 
  Activity, 
  ShieldAlert, 
  ArrowUpRight, 
  ArrowDownRight,
  Wifi,
  Zap,
  Clock
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TRAFFIC_HISTORY, TOP_TALKERS } from '@/lib/mock-data';

export default function Dashboard() {
  const stats = [
    { label: 'Active Alerts', value: '12', change: '+2', trend: 'up', icon: ShieldAlert, color: 'text-red-400' },
    { label: 'Packets/Sec', value: '458', change: '-12%', trend: 'down', icon: Activity, color: 'text-accent' },
    { label: 'Identified IPs', value: '1,284', change: '+54', trend: 'up', icon: Wifi, color: 'text-primary' },
    { label: 'Threat Level', value: 'Medium', change: 'Stable', trend: 'neutral', icon: Zap, color: 'text-yellow-400' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col gap-2">
        <h2 className="text-3xl font-headline font-bold tracking-tight">Security Dashboard</h2>
        <p className="text-muted-foreground">Real-time network traffic analysis and anomaly intelligence.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-md bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                {stat.trend === 'up' ? <ArrowUpRight className="h-3 w-3 text-green-400" /> : stat.trend === 'down' ? <ArrowDownRight className="h-3 w-3 text-red-400" /> : null}
                <span className={stat.trend === 'up' ? 'text-green-400' : stat.trend === 'down' ? 'text-red-400' : ''}>
                  {stat.change}
                </span>
                from last hour
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-4 border-none shadow-lg bg-card/50 backdrop-blur-sm overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold">Network Traffic Load</CardTitle>
                <CardDescription>Aggregate packet throughput across monitored interfaces.</CardDescription>
              </div>
              <div className="flex gap-2">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-primary" /> Inbound
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-accent" /> Outbound
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[350px] p-0 pb-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TRAFFIC_HISTORY} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPackets" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis 
                  dataKey="time" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="packets" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorPackets)" 
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-3 border-none shadow-lg bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Top Traffic Sources</CardTitle>
            <CardDescription>Identified IPs with highest packet distribution.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] flex flex-col justify-between">
            <div className="space-y-4">
              {TOP_TALKERS.map((talker, idx) => (
                <div key={talker.ip} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-bold text-accent">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-sm font-semibold tracking-tight">{talker.ip}</p>
                      <div className="h-1.5 w-full bg-secondary rounded-full mt-1 overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-1000" 
                          style={{ width: `${(talker.count / TOP_TALKERS[0].count) * 100}%` }} 
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold font-mono">{talker.count.toLocaleString()}</p>
                    <p className="text-[10px] text-muted-foreground uppercase">Packets</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-border mt-4">
              <button className="text-xs font-bold text-accent hover:underline flex items-center gap-1 w-full justify-center">
                VIEW FULL REPORT <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}