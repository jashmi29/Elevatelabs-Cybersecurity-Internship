"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Lock, ShieldAlert, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function SimulationLandingPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // In a real app, we would log this to our simulation database here
    // For this prototype, we just wait a bit and redirect
    setTimeout(() => {
      setLoading(false)
      // REDIRECT TO EDUCATION! This is the most important step for an ethical platform.
      router.push("/education")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      {/* Hidden banner for developer awareness, but simulation targets see a convincing page */}
      <div className="fixed top-4 left-4 right-4 z-50 pointer-events-none flex justify-center opacity-20">
         <div className="bg-red-600 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter">
            SIMULATION ONLY • SIMULATION ONLY • SIMULATION ONLY
         </div>
      </div>

      <Card className="w-full max-w-md shadow-2xl border-0 overflow-hidden bg-white">
        <div className="h-2 bg-blue-600 w-full" />
        <CardHeader className="text-center space-y-4 pt-10">
          <div className="h-16 w-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-200">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">Sign in to Corporate Hub</CardTitle>
            <CardDescription className="text-slate-500">
              Session expired. Please re-authenticate to continue.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pt-4 pb-8 px-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-semibold">Work Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@company.com" 
                required 
                className="bg-slate-50 border-slate-200 text-slate-900"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="pass" className="text-slate-700 font-semibold">Password</Label>
                <a href="#" className="text-xs font-medium text-blue-600 hover:underline">Forgot password?</a>
              </div>
              <Input 
                id="pass" 
                type="password" 
                required 
                className="bg-slate-50 border-slate-200 text-slate-900"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="bg-slate-50 border-t border-slate-100 py-6 px-8 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <AlertCircle className="h-4 w-4" />
            <span>Connection is encrypted with 256-bit SSL</span>
          </div>
          <div className="w-full flex justify-between text-[10px] text-slate-400 uppercase font-semibold tracking-widest">
            <span>Corporate Security</span>
            <span>Ver. 4.2.0</span>
          </div>
        </CardFooter>
      </Card>

      <p className="mt-8 text-slate-400 text-sm">
        © 2024 Global Corporate Systems. All rights reserved.
      </p>
    </div>
  )
}