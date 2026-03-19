"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCipher } from '@/hooks/use-cipher';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, Lock, Users, Zap, Terminal, Info, Cpu, GlobeLock, Fingerprint } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('general');
  const { login, isLoading } = useCipher();
  const router = useRouter();

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    
    try {
      await login(username);
      router.push(`/chat/${roomName}?u=${encodeURIComponent(username)}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 z-[-1] opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="space-y-10">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                <Lock className="text-primary-foreground w-7 h-7" />
              </div>
              <div>
                <h1 className="text-6xl font-black tracking-tighter glow-text">CipherChat</h1>
                <p className="text-xs terminal-text text-primary uppercase font-bold tracking-[0.2em] mt-1">
                  V.2.0 Secure Messaging Protocol
                </p>
              </div>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
              Next-generation end-to-end encryption. Privacy is not a choice; it is the default architecture.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FeatureCard 
              icon={<ShieldCheck className="w-5 h-5 text-primary" />}
              title="RSA-2048 E2EE"
              desc="Asymmetric keys generated locally via WebCrypto."
            />
            <FeatureCard 
              icon={<Fingerprint className="w-5 h-5 text-primary" />}
              title="96-bit IV"
              desc="Unique vectors for every AES-256-GCM block."
            />
            <FeatureCard 
              icon={<GlobeLock className="w-5 h-5 text-primary" />}
              title="Zero-Trust Relay"
              desc="Server only handles encrypted data streams."
            />
            <FeatureCard 
              icon={<Cpu className="w-5 h-5 text-primary" />}
              title="Hardware Isolation"
              desc="Keys never leave your browser's RAM."
            />
          </div>

          <div className="pt-8 border-t border-border/50">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-4 flex items-center gap-2">
              <Terminal className="w-3 h-3" /> System Architecture
            </h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-border/30">
                <AccordionTrigger className="hover:no-underline py-3 text-sm font-bold terminal-text">
                  SECURE TUNNEL OVERVIEW
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed space-y-4 font-body border-t border-border/10 pt-4">
                  <p>
                    <span className="text-primary font-bold">1. Key Exchange:</span> Upon user login, the browser’s WebCrypto API generates a unique RSA-2048 key pair. Your public key is shared with peers, while your private key stays securely in your browser session.
                  </p>
                  <p>
                    <span className="text-primary font-bold">2. Hybrid Encryption:</span> Each AES-256-GCM encryption uses a unique 96-bit Initialization Vector (IV), which is transmitted along with the ciphertext. The session key is wrapped using RSA-OAEP.
                  </p>
                  <p>
                    <span className="text-primary font-bold">3. Zero-Knowledge:</span> The Flask-SocketIO server only relays encrypted payloads and has no access to private keys or plaintext messages.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-[2rem] blur-xl opacity-50"></div>
          <Card className="security-card relative rounded-[2rem] overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-primary via-blue-400 to-primary w-full"></div>
            <CardHeader className="space-y-1 pt-8">
              <CardTitle className="text-2xl terminal-text font-black uppercase tracking-tight">Access Terminal</CardTitle>
              <CardDescription className="text-xs uppercase tracking-widest font-medium">Session-Based Cryptography Enabled</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleJoin} className="space-y-6 pt-2">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-primary tracking-widest">Operator Identity</label>
                  <Input 
                    placeholder="ENTER CODENAME" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    className="rounded-xl h-12 bg-muted/50 border-border/50 terminal-text focus:ring-primary/50"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-primary tracking-widest">Tunnel Path</label>
                  <Input 
                    placeholder="general" 
                    value={roomName} 
                    onChange={(e) => setRoomName(e.target.value)}
                    className="rounded-xl h-12 bg-muted/50 border-border/50 terminal-text focus:ring-primary/50"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-14 rounded-2xl text-sm font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all"
                  disabled={isLoading}
                >
                  {isLoading ? 'INITIATING RSA HANDSHAKE...' : 'ESTABLISH SECURE LINK'}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="bg-muted/30 py-6 justify-center border-t border-border/30">
              <div className="flex items-center gap-3 text-[10px] text-muted-foreground uppercase font-black tracking-widest">
                <div className="flex items-center gap-1.5 text-green-500">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  ENCRYPTION ACTIVE
                </div>
                <span className="opacity-20">|</span>
                <span>NO LOGS</span>
                <span className="opacity-20">|</span>
                <span>NON-PERSISTENT</span>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-5 rounded-2xl security-card space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
          {icon}
        </div>
        <h3 className="font-black text-xs uppercase tracking-wider terminal-text">{title}</h3>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed font-medium">{desc}</p>
    </div>
  );
}