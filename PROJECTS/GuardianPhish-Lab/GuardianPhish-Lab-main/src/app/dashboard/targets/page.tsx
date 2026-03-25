"use client"

import * as React from "react"
import { 
  Users, 
  Upload, 
  Search, 
  MoreHorizontal, 
  Mail, 
  Plus,
  Trash2,
  CheckCircle2
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const initialTargets = [
  { id: 1, name: "Alice Johnson", email: "alice.j@example.com", department: "Finance", status: "Active" },
  { id: 2, name: "Bob Smith", email: "bob.s@example.com", department: "IT", status: "Active" },
  { id: 3, name: "Charlie Davis", email: "charlie.d@example.com", department: "HR", status: "Active" },
  { id: 4, name: "Diana Prince", email: "diana.p@example.com", department: "Executive", status: "Paused" },
  { id: 5, name: "Edward Norton", email: "edward.n@example.com", department: "Operations", status: "Active" },
]

export default function TargetsPage() {
  const [targets, setTargets] = React.useState(initialTargets)
  const [search, setSearch] = React.useState("")

  const filtered = targets.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold">Target Management</h1>
          <p className="text-muted-foreground mt-1">Manage user groups and individual test subjects.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" />
            Import CSV
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Target
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="space-y-1">
              <CardTitle className="font-headline">All Targets</CardTitle>
              <CardDescription>A list of all users eligible for simulations.</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search targets..." 
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((target) => (
                  <TableRow key={target.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{target.name}</span>
                        <span className="text-xs text-muted-foreground">{target.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>{target.department}</TableCell>
                    <TableCell>
                      <Badge variant={target.status === "Active" ? "default" : "secondary"}>
                        {target.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                          <DropdownMenuItem>View History</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="font-headline">Target Groups</CardTitle>
              <CardDescription>Organize targets for better campaigns.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Finance Team", count: 12, lastActive: "2 days ago" },
                  { name: "IT & Engineering", count: 45, lastActive: "Just now" },
                  { name: "New Hires", count: 8, lastActive: "1 week ago" },
                  { name: "Sales Department", count: 24, lastActive: "3 days ago" },
                ].map((group) => (
                  <div key={group.name} className="flex items-center justify-between p-3 rounded-lg border bg-secondary/20">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold">{group.name}</p>
                      <p className="text-xs text-muted-foreground">{group.count} members • {group.lastActive}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" className="w-full text-xs gap-2">
                  <Plus className="h-3 w-3" />
                  Create New Group
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold">Consent Verified</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  All targets in the system have signed the ethical awareness participation agreement as part of their cybersecurity training program.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}