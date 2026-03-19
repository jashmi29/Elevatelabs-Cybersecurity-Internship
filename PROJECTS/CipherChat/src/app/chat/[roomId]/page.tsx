
"use client";

import { use, useState, useEffect } from 'react';
import { ChatTerminal } from '@/components/chat-terminal';
import { Shield, Lock, Fingerprint, Activity, Terminal, Globe, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SplitChatRoom({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = use(params);
  const [baseUsername, setBaseUsername] = useState('OPERATOR');

  useEffect(() => {
    const stored = sessionStorage.getItem('cipher_user');
    if (stored) {
      setBaseUsername(JSON.parse(stored).username);
    }
  }, []);

  return (
    <div className="h-screen w-full bg-background flex flex-col overflow-hidden relative">
      {/* Global Background Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      {/* Top HUD Bar */}
      <header className="h-14 border-b border-border/50 bg-card/50 backdrop-blur-md flex items-center justify-between px-6 z-10 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10">
              <ChevronLeft size={18} />
            </Button>
          </Link>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="text-xs font-black uppercase tracking-tighter terminal-text">ENCRYPTED TUNNEL: {roomId}</h1>
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            </div>
            <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">V2.0 SECURE RELAY PROTOCOL</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5 text-primary">
              <Lock size={10} />
              <span className="text-[9px] font-black uppercase tracking-widest">E2EE Stream Active</span>
            </div>
            <span className="text-[7px] text-muted-foreground uppercase font-black">Zero-Knowledge Relay</span>
          </div>
          <div className="h-8 w-[1px] bg-border/50"></div>
          <div className="flex items-center gap-3">
            <Globe size={16} className="text-muted-foreground" />
            <Activity size={16} className="text-primary animate-pulse" />
          </div>
        </div>
      </header>

      {/* Split Main Content */}
      <main className="flex-1 flex overflow-hidden z-10">
        {/* Alpha Terminal */}
        <section className="flex-1 min-w-0">
          <ChatTerminal 
            username={`${baseUsername}-ALPHA`} 
            roomId={roomId} 
            accentColor="text-blue-500"
          />
        </section>

        {/* Tactical Divider */}
        <div className="w-[1px] h-full bg-border/50 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-8 opacity-20">
            <Shield size={16} />
            <Fingerprint size={16} />
            <Activity size={16} />
          </div>
        </div>

        {/* Bravo Terminal */}
        <section className="flex-1 min-w-0">
          <ChatTerminal 
            username={`${baseUsername}-BRAVO`} 
            roomId={roomId} 
            accentColor="text-cyan-400"
          />
        </section>
      </main>

      {/* Footer HUD */}
      <footer className="h-8 bg-background border-t border-border/50 px-6 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-4 text-[7px] font-black text-muted-foreground uppercase tracking-[0.2em]">
          <span>STATUS: SECURE</span>
          <span>SYSTEM: OK</span>
          <span>LATENCY: 42MS</span>
        </div>
        <div className="flex items-center gap-2 text-[7px] font-black text-primary uppercase tracking-[0.2em]">
          <Terminal size={10} />
          <span>CRYPTOGRAPHIC ISOLATION ENABLED</span>
        </div>
      </footer>
    </div>
  );
}
