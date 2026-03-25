import { ShieldAlert, Info, CheckCircle2, XCircle, AlertTriangle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function EducationPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Banner */}
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
          <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <ShieldAlert className="h-10 w-10 text-primary" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-headline font-bold">It&apos;s a Training Exercise!</h1>
            <p className="text-lg text-muted-foreground">
              Don&apos;t worry—this was a simulated phishing attempt by your organization to help you stay safe online. 
              No real data was captured or compromised.
            </p>
          </div>
        </div>

        {/* What is Phishing? */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-headline font-bold flex items-center gap-2">
              <Info className="h-6 w-6 text-accent" />
              What is Phishing?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Phishing is a type of social engineering attack where criminals impersonate a trusted entity 
              (like a bank, a coworker, or a famous brand) to trick you into revealing sensitive information 
              like passwords, credit card numbers, or installing malware.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span>Learn to spot red flags before you click.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span>Reporting an email is better than ignoring it.</span>
              </li>
            </ul>
          </div>
          <div className="bg-card border rounded-2xl p-8 shadow-xl">
            <h3 className="text-xl font-headline font-bold mb-4">Common Red Flags</h3>
            <div className="space-y-4">
              <RedFlag 
                title="Sense of Urgency" 
                desc="Emails that demand immediate action or threaten account closure."
              />
              <RedFlag 
                title="Generic Greeting" 
                desc="Using 'Dear Customer' instead of your actual name."
              />
              <RedFlag 
                title="Suspicious Links" 
                desc="Hover your mouse over links to see the real destination URL."
              />
              <RedFlag 
                title="Odd Sender Address" 
                desc="Check for misspellings like 'support@amozon.com'."
              />
            </div>
          </div>
        </section>

        {/* Action Plan */}
        <section className="space-y-8">
          <h2 className="text-3xl font-headline font-bold text-center">Your Safety Action Plan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <ActionStep 
              num="01" 
              title="Stop & Think" 
              desc="Take a moment to verify the request through another channel."
            />
            <ActionStep 
              num="02" 
              title="Hover First" 
              desc="Check every link before clicking. Look for 'https' and correct domains."
            />
            <ActionStep 
              num="03" 
              title="Report It" 
              desc="Use your email provider's 'Report Phish' button immediately."
            />
          </div>
        </section>

        {/* Footer Link */}
        <div className="flex justify-center pt-8">
          <Button size="lg" asChild className="gap-2">
            <Link href="/">
              Return to Safe Landing
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

function RedFlag({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="flex gap-3">
      <AlertTriangle className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
      <div className="space-y-0.5">
        <p className="font-bold text-sm">{title}</p>
        <p className="text-xs text-muted-foreground leading-normal">{desc}</p>
      </div>
    </div>
  )
}

function ActionStep({ num, title, desc }: { num: string, title: string, desc: string }) {
  return (
    <div className="bg-card border p-6 rounded-xl space-y-3 relative overflow-hidden group">
      <span className="absolute -right-4 -top-4 text-6xl font-black text-primary/5 group-hover:text-primary/10 transition-colors">
        {num}
      </span>
      <h3 className="font-headline font-bold text-lg">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  )
}