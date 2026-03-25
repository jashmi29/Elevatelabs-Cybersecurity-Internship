import Link from "next/link"
import { ShieldAlert, ArrowRight, ShieldCheck, Zap, Lock, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="px-6 py-12 lg:py-24 max-w-7xl mx-auto w-full flex flex-col items-center text-center space-y-8">
        <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
          <ShieldAlert className="h-10 w-10 text-primary-foreground" />
        </div>
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold tracking-tight">
            Ethical Phishing <span className="text-primary italic">Simulations</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Strengthen your organization&apos;s human firewall with data-driven simulations 
            designed for education, not deception. Securely train, track, and teach.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button size="lg" className="h-12 px-8 text-lg font-medium group" asChild>
            <Link href="/dashboard">
              Enter Admin Lab
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="h-12 px-8 text-lg font-medium" asChild>
            <Link href="/education">Awareness Center</Link>
          </Button>
        </div>
      </header>

      {/* Features Grid */}
      <section className="bg-card border-y border-border px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-headline font-bold">Comprehensive Protection Training</h2>
            <p className="text-muted-foreground mt-2">The tools you need to build a resilient security culture.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Zap}
              title="AI-Assisted Design"
              description="Generate realistic scenarios using advanced AI, tailored to your industry and specific threat vectors."
            />
            <FeatureCard 
              icon={Lock}
              title="Safe Capture"
              description="Simulate data breaches without ever storing sensitive information. We capture patterns, not passwords."
            />
            <FeatureCard 
              icon={ShieldCheck}
              title="Authorized Use Only"
              description="Built-in safeguards and banners ensure simulations are always identified as training exercises."
            />
            <FeatureCard 
              icon={BookOpen}
              title="Educational Debrief"
              description="Every interaction ends with an immediate teaching moment, explaining what went wrong and how to fix it."
            />
            <FeatureCard 
              icon={BarChart3}
              title="Real-time Analytics"
              description="Track open rates, click-throughs, and successful 'phishes' with detailed visual dashboards."
            />
            <FeatureCard 
              icon={ShieldAlert}
              title="Target Management"
              description="Efficiently manage test groups and campaigns with intuitive administrative controls."
            />
          </div>
        </div>
      </section>

      <footer className="mt-auto py-12 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-primary" />
            <span className="font-headline font-bold">GuardianPhish Lab</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 Ethereal Security. Strictly for educational and authorized training purposes.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Security Policy</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Ethical Guidelines</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl bg-background border border-border/50 hover:border-primary/50 transition-colors group">
      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-headline font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}

import { BarChart3 } from "lucide-react"