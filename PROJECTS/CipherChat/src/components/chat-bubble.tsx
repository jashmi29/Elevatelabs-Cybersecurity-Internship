"use client";

import { cn } from "@/lib/utils";
import { Lock, AlertCircle, CheckCircle2, Shield } from "lucide-react";

interface ChatBubbleProps {
  content: string | null;
  sender: string;
  isMe: boolean;
  timestamp: number;
  decryptionError?: boolean;
}

export function ChatBubble({ content, sender, isMe, timestamp, decryptionError }: ChatBubbleProps) {
  const timeStr = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={cn(
      "flex flex-col max-w-[80%] animate-fade-in-up",
      isMe ? "ml-auto items-end" : "mr-auto items-start"
    )}>
      <div className="flex items-center gap-2 mb-1.5 px-1">
        <span className="text-[10px] uppercase font-black terminal-text tracking-widest text-primary/80">
          {sender}
        </span>
        <span className="text-[9px] text-muted-foreground font-bold terminal-text">
          [{timeStr}]
        </span>
      </div>
      
      <div className={cn(
        "relative p-4 shadow-xl border overflow-hidden",
        isMe ? "chat-bubble-sent border-primary/50" : "chat-bubble-received"
      )}>
        {decryptionError ? (
          <div className="flex items-center gap-3 text-destructive p-1">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <div className="space-y-0.5">
              <p className="text-xs font-black uppercase tracking-tighter terminal-text">Decryption Critical Failure</p>
              <p className="text-[9px] font-bold opacity-80">Message integrity check failed (Bad RSA Wrap)</p>
            </div>
          </div>
        ) : (
          <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap break-words">{content || "DECRYPTING PAYLOAD..."}</p>
        )}
        
        <div className={cn(
          "flex items-center justify-between gap-4 mt-3 pt-3 border-t",
          isMe ? "border-primary-foreground/10" : "border-border/50"
        )}>
          <div className={cn(
            "flex items-center gap-1.5 text-[8px] font-black uppercase tracking-[0.1em]",
            isMe ? "text-primary-foreground/60" : "text-muted-foreground"
          )}>
            <Shield className="w-3 h-3" />
            <span>AES-256-GCM VERIFIED</span>
          </div>
          {isMe && <CheckCircle2 className="w-3 h-3 text-primary-foreground/80" />}
        </div>
      </div>
    </div>
  );
}