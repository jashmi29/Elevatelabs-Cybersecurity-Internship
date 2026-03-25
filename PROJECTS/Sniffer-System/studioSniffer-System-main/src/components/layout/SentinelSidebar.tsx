"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Activity, 
  ShieldAlert, 
  Settings, 
  Database,
  Search,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';

const NAVIGATION_ITEMS = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Packet Viewer', href: '/packets', icon: Search },
  { name: 'Anomalies', href: '/anomalies', icon: ShieldAlert },
  { name: 'Configuration', href: '/settings', icon: Settings },
];

export function SentinelSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary rounded-lg shadow-lg shadow-primary/20">
            <Zap className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-headline font-bold text-xl tracking-tight text-foreground">SentinelFlow</h1>
            <p className="text-xs text-muted-foreground font-medium">Network Security Engine</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-xs uppercase tracking-widest font-bold text-muted-foreground/50">Monitoring</SidebarGroupLabel>
          <SidebarMenu>
            {NAVIGATION_ITEMS.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton 
                  asChild 
                  isActive={pathname === item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                    pathname === item.href 
                      ? "bg-primary/10 text-accent" 
                      : "hover:bg-sidebar-accent text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Link href={item.href}>
                    <item.icon className={cn("w-5 h-5", pathname === item.href ? "text-accent" : "")} />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}