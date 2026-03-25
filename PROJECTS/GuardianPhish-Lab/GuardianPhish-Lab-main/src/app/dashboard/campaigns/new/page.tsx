"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Sparkles, 
  Send, 
  Eye, 
  FileText,
  AlertCircle,
  Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { generatePhishingEmailTemplate } from "@/ai/flows/generate-phishing-email-template"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NewCampaignPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = React.useState(false)
  const [step, setStep] = React.useState(1)
  
  const [formData, setFormData] = React.useState({
    name: "",
    scenario: "password reset scam",
    targetGroup: "Finance Team",
    subject: "",
    body: "",
    disclaimer: ""
  })

  const handleGenerateAI = async () => {
    if (!formData.scenario) {
      toast({
        title: "Scenario Required",
        description: "Please select or describe a scenario first.",
        variant: "destructive"
      })
      return
    }

    setLoading(true)
    try {
      const result = await generatePhishingEmailTemplate({ scenario: formData.scenario })
      setFormData({
        ...formData,
        subject: result.subject,
        body: result.body_html,
        disclaimer: result.disclaimer
      })
      toast({
        title: "Template Generated",
        description: "AI has successfully drafted your campaign content."
      })
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Could not connect to AI services. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    toast({
      title: "Campaign Launched",
      description: "Emails are being queued for delivery."
    })
    router.push("/dashboard/campaigns")
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-headline font-bold">New Campaign</h1>
          <p className="text-muted-foreground">Design your simulation and select your targets.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Step Indicators */}
        <div className="space-y-4">
          {[
            { id: 1, title: "Configuration", desc: "Basics and scenario" },
            { id: 2, title: "Template Design", desc: "Craft your message" },
            { id: 3, title: "Review & Launch", desc: "Final verification" }
          ].map((s) => (
            <div 
              key={s.id}
              className={`p-4 rounded-lg border transition-all ${
                step === s.id ? "bg-primary/10 border-primary" : "bg-card border-border opacity-60"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === s.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {s.id}
                </span>
                <span className="font-semibold">{s.title}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1 ml-9">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Form Area */}
        <div className="md:col-span-2 space-y-6">
          <Card className="border-border/50">
            <CardContent className="pt-6">
              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Campaign Name</Label>
                    <Input 
                      id="name" 
                      placeholder="e.g., Q4 Security Awareness" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="scenario">Simulation Scenario</Label>
                    <Select 
                      value={formData.scenario} 
                      onValueChange={(v) => setFormData({...formData, scenario: v})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a scenario" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="password reset scam">Password Reset Request</SelectItem>
                        <SelectItem value="fake invoice">Unpaid Invoice Alert</SelectItem>
                        <SelectItem value="it support impersonation">IT Support Verification</SelectItem>
                        <SelectItem value="gift card reward">Corporate Holiday Bonus</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="target">Target Group</Label>
                    <Select 
                      value={formData.targetGroup} 
                      onValueChange={(v) => setFormData({...formData, targetGroup: v})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Finance Team">Finance Department</SelectItem>
                        <SelectItem value="Engineering">Engineering & Ops</SelectItem>
                        <SelectItem value="New Hires">New Hires (Onboarding)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <Label>Email Content</Label>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2 border-primary/50 text-primary hover:bg-primary/10"
                      onClick={handleGenerateAI}
                      disabled={loading}
                    >
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                      Generate with AI
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject Line</Label>
                    <Input 
                      id="subject" 
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    />
                  </div>
                  <Tabs defaultValue="editor">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="editor">Editor</TabsTrigger>
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                    </TabsList>
                    <TabsContent value="editor" className="space-y-4 mt-4">
                      <Textarea 
                        className="min-h-[300px] font-code text-sm" 
                        value={formData.body}
                        onChange={(e) => setFormData({...formData, body: e.target.value})}
                      />
                    </TabsContent>
                    <TabsContent value="preview" className="mt-4">
                      <div className="border rounded-md p-6 bg-white text-black min-h-[300px]">
                        <div className="mb-4 pb-4 border-b">
                          <p className="text-sm font-bold">Subject: {formData.subject}</p>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: formData.body }} />
                        <div className="mt-8 pt-4 border-t border-dashed text-xs text-gray-500">
                          {formData.disclaimer}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-lg flex gap-3">
                    <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-destructive">ETHICAL REQUIREMENT</p>
                      <p className="text-xs text-destructive/80 leading-relaxed">
                        By launching this campaign, you confirm that you have obtained necessary authorization and consent. 
                        This simulation will NOT capture real passwords. Users will be redirected to educational debriefing.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Final Review</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-secondary/30 rounded border">
                        <p className="text-xs text-muted-foreground">CAMPAIGN NAME</p>
                        <p className="font-medium">{formData.name || "Untitled Campaign"}</p>
                      </div>
                      <div className="p-3 bg-secondary/30 rounded border">
                        <p className="text-xs text-muted-foreground">SCENARIO</p>
                        <p className="font-medium capitalize">{formData.scenario}</p>
                      </div>
                      <div className="p-3 bg-secondary/30 rounded border">
                        <p className="text-xs text-muted-foreground">TARGETS</p>
                        <p className="font-medium">{formData.targetGroup}</p>
                      </div>
                      <div className="p-3 bg-secondary/30 rounded border">
                        <p className="text-xs text-muted-foreground">SCHEDULE</p>
                        <p className="font-medium">Send Immediately</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between border-t p-6 mt-6">
              <Button 
                variant="outline" 
                onClick={() => setStep(step - 1)}
                disabled={step === 1}
              >
                Previous
              </Button>
              {step < 3 ? (
                <Button onClick={() => setStep(step + 1)}>
                  Next Step
                </Button>
              ) : (
                <Button onClick={handleCreate} className="gap-2 bg-primary hover:bg-primary/90">
                  <Send className="h-4 w-4" />
                  Launch Simulation
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}