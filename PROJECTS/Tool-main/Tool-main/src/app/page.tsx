
import StegoTool from '@/components/StegoTool';
import { Shield, Lock, Zap, MousePointer2 } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden pixel-grid">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <header className="relative z-10 border-b border-border/50 glass">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">InSight <span className="text-primary">Hidden</span></h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Digital Steganography Suite</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Documentation</a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">API Access</a>
            <div className="h-4 w-px bg-border/50" />
            <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
              <Lock className="h-3 w-3 text-primary" />
              <span className="text-xs font-bold text-primary">ENCRYPTED</span>
            </div>
          </nav>
        </div>
      </header>

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div className="text-center mb-16 space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-[10px] font-bold tracking-widest text-primary mb-2">
            <Zap className="h-3 w-3" /> VERSION 2.4.0 STABLE
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            The shadows are your <span className="gradient-text">strongest ally.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Embed sensitive data within standard images using advanced Least Significant Bit (LSB) manipulation. Undetectable by the naked eye, secured by design.
          </p>
        </div>

        <StegoTool />

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Lock className="h-6 w-6" />,
              title: "Lossless Fidelity",
              desc: "Optimized for PNG and BMP formats to ensure bit-perfect message extraction every single time."
            },
            {
              icon: <Zap className="h-6 w-6" />,
              title: "Contextual AI",
              desc: "Integrated LLM tools to rephrase secrets into innocuous public contexts, providing a second layer of plausible deniability."
            },
            {
              icon: <MousePointer2 className="h-6 w-6" />,
              title: "Zero Retention",
              desc: "All processing occurs client-side. Your images and messages never touch our persistent storage."
            }
          ].map((feature, i) => (
            <div key={i} className="p-8 rounded-2xl glass border-border hover:border-primary/50 transition-all group">
              <div className="mb-6 w-12 h-12 rounded-xl bg-muted border border-border flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="relative z-10 border-t border-border/50 py-12 mt-20 glass">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-2 opacity-50">
             <Shield className="h-4 w-4" />
             <span className="text-xs font-bold uppercase tracking-widest">InSight Hidden © 2024</span>
          </div>
          <div className="flex gap-8 text-xs font-medium text-muted-foreground">
            <a href="#" className="hover:text-primary">Privacy Protocol</a>
            <a href="#" className="hover:text-primary">Security Audit</a>
            <a href="#" className="hover:text-primary">Status</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
