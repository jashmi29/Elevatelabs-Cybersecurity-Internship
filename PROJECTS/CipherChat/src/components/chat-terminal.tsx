"use client";

import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { 
  generateKeyPair, 
  exportPublicKey, 
  importPublicKey, 
  getPublicKeyFingerprint, 
  encryptMessage, 
  decryptMessage,
  EncryptedPayload 
} from '@/lib/crypto';
import { ChatBubble } from '@/components/chat-bubble';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Shield, Send, Terminal, Lock, Activity, AlertCircle, Settings, Wifi, WifiOff, Server, HelpCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  sender: string;
  payload: EncryptedPayload;
  decryptedContent?: string | null;
  decryptionError?: boolean;
}

interface ChatTerminalProps {
  username: string;
  roomId: string;
  accentColor?: string;
}

export function ChatTerminal({ username, roomId, accentColor = "text-primary" }: ChatTerminalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [keys, setKeys] = useState<{ public: string; private: CryptoKey; fingerprint: string } | null>(null);
  const [peerPublicKey, setPeerPublicKey] = useState<string | null>(null);
  const [peerFingerprint, setPeerFingerprint] = useState<string | null>(null);
  const [status, setStatus] = useState<'initializing' | 'connecting' | 'secure' | 'offline'>('initializing');
  const [relayUrl, setRelayUrl] = useState('http://localhost:5000');
  const [showSettings, setShowSettings] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initCrypto = async () => {
      try {
        const keyPair = await generateKeyPair();
        const pubKeyStr = await exportPublicKey(keyPair.publicKey);
        const fingerprint = await getPublicKeyFingerprint(pubKeyStr);
        setKeys({ public: pubKeyStr, private: keyPair.privateKey, fingerprint });
        setStatus('connecting');
      } catch (err) {
        setStatus('offline');
      }
    };
    initCrypto();
  }, []);

  const connectToRelay = () => {
    if (!keys) return;
    if (socket) {
      socket.removeAllListeners();
      socket.disconnect();
    }

    setStatus('connecting');
    setConnectionError(null);

    const newSocket = io(relayUrl, {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 3,
      timeout: 5000,
    });

    newSocket.on('connect', () => {
      setConnectionError(null);
      newSocket.emit('join', { room: roomId, username, publicKey: keys.public });
    });

    newSocket.on('connect_error', (err) => {
      setConnectionError(`UNREACHABLE: ${relayUrl}`);
      setStatus('offline');
    });

    newSocket.on('user_joined', (data: { publicKey: string; username: string }) => {
      if (data.username !== username) {
        setPeerPublicKey(data.publicKey);
        getPublicKeyFingerprint(data.publicKey).then(setPeerFingerprint);
        setStatus('secure');
        newSocket.emit('share_key', { room: roomId, publicKey: keys.public });
      }
    });

    newSocket.on('peer_key_share', (data: { publicKey: string; username: string }) => {
      if (data.username !== username) {
        setPeerPublicKey(data.publicKey);
        getPublicKeyFingerprint(data.publicKey).then(setPeerFingerprint);
        setStatus('secure');
      }
    });

    newSocket.on('encrypted_message', async (data: { sender: string; payload: EncryptedPayload }) => {
      const newMessage: Message = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        sender: data.sender,
        payload: data.payload,
      };

      if (keys.private) {
        const decrypted = await decryptMessage(data.payload, keys.private);
        newMessage.decryptedContent = decrypted;
        newMessage.decryptionError = !decrypted;
      }

      setMessages(prev => [...prev, newMessage]);
    });

    setSocket(newSocket);
  };

  useEffect(() => {
    if (keys && status === 'connecting' && !socket) {
      connectToRelay();
    }
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [keys]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !peerPublicKey || !socket || !keys) return;

    try {
      const recipientKey = await importPublicKey(peerPublicKey);
      const payload = await encryptMessage(inputMessage, recipientKey);

      socket.emit('send_message', {
        room: roomId,
        sender: username,
        payload
      });

      setMessages(prev => [...prev, {
        id: `msg-sent-${Date.now()}`,
        sender: username,
        payload,
        decryptedContent: inputMessage
      }]);

      setInputMessage('');
    } catch (err) {
      toast({ variant: "destructive", title: "Encryption Failure" });
    }
  };

  return (
    <div className="flex flex-col h-full border-x border-border/20 bg-card/30 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-50"></div>

      <header className="p-4 border-b border-border/30 space-y-3 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={cn("p-1.5 rounded-lg bg-background/50 border border-border/50", accentColor)}>
              <Terminal size={14} />
            </div>
            <h3 className="text-xs font-black uppercase tracking-widest terminal-text">{username}</h3>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 opacity-50 hover:opacity-100" 
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings size={14} />
            </Button>
            <span className={cn(
              "text-[8px] font-black uppercase px-2 py-0.5 rounded border flex items-center gap-1.5",
              status === 'secure' ? "border-green-500/30 text-green-500 bg-green-500/5" : 
              status === 'offline' ? "border-red-500/30 text-red-500 bg-red-500/5" :
              "border-yellow-500/30 text-yellow-500 bg-yellow-500/5"
            )}>
              {status === 'secure' ? <Activity size={8} className="animate-pulse" /> : status === 'offline' ? <WifiOff size={8} /> : <Wifi size={8} className="animate-pulse" />}
              {status === 'secure' ? 'STABLE LINK' : status === 'offline' ? 'DISCONNECTED' : 'NEGOTIATING'}
            </span>
          </div>
        </div>

        {showSettings && (
          <div className="p-3 bg-muted/50 border border-border/50 rounded-lg space-y-3 animate-in fade-in slide-in-from-top-2">
            <div>
              <label className="text-[9px] font-black uppercase tracking-widest text-primary">Relay Endpoint Configuration</label>
              <div className="flex gap-2 mt-1">
                <Input 
                  value={relayUrl}
                  onChange={(e) => setRelayUrl(e.target.value)}
                  className="h-8 text-[10px] terminal-text bg-background"
                  placeholder="http://localhost:5000"
                />
                <Button size="sm" onClick={connectToRelay} className="h-8 text-[9px] font-black">RECONNECT</Button>
              </div>
            </div>
            <div className="p-2 bg-blue-500/10 rounded border border-blue-500/20 flex gap-2">
              <HelpCircle size={12} className="text-blue-500 shrink-0 mt-0.5" />
              <p className="text-[8px] text-muted-foreground uppercase leading-tight font-bold">
                Cloud Workspace Tip: If localhost fails, find your port 5000 forwarded URL in the "Ports" tab of your IDE and paste it above.
              </p>
            </div>
          </div>
        )}

        {connectionError && !showSettings && (
          <div className="p-2 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-2">
            <AlertCircle size={10} className="text-destructive" />
            <p className="text-[8px] font-black text-destructive uppercase tracking-tighter">{connectionError}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 bg-background/40 rounded-lg border border-border/20">
            <p className="text-[7px] font-bold text-muted-foreground uppercase mb-1">Local Fingerprint</p>
            <p className="text-[9px] font-mono break-all leading-tight opacity-70">{keys?.fingerprint || 'GENERATING...'}</p>
          </div>
          <div className="p-2 bg-background/40 rounded-lg border border-border/20">
            <p className="text-[7px] font-bold text-muted-foreground uppercase mb-1">Remote Identity</p>
            <p className="text-[9px] font-mono break-all leading-tight opacity-70">{peerFingerprint || 'AWAITING PEER...'}</p>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6 max-w-lg mx-auto">
          {status === 'connecting' && (
            <div className="py-20 flex flex-col items-center justify-center opacity-20 text-center space-y-4">
              <Wifi size={32} className="animate-pulse" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em]">Establishing secure relay...</p>
              <p className="text-[8px] font-mono">{relayUrl}</p>
            </div>
          )}
          {status === 'offline' && !showSettings && (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-6">
              <div className="relative">
                <Server size={48} className="text-destructive opacity-20" />
                <WifiOff size={24} className="absolute -bottom-2 -right-2 text-destructive" />
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-destructive">Relay Offline or Blocked</p>
                  <p className="text-[8px] max-w-[220px] mx-auto leading-relaxed text-muted-foreground">
                    1. Run <code className="text-primary">npm run relay</code> in terminal.<br/>
                    2. If in a Cloud IDE, update the Relay URL in settings (gear icon) to your forwarded port 5000 URL.
                  </p>
                </div>
              </div>
            </div>
          )}
          {status === 'secure' && messages.length === 0 && (
            <div className="py-20 flex flex-col items-center justify-center opacity-20 text-center space-y-4">
              <Shield size={32} className="text-primary" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em]">Channel established. Ready to transmit.</p>
            </div>
          )}
          {messages.map((msg) => (
            <ChatBubble 
              key={msg.id}
              content={msg.decryptedContent ?? null}
              sender={msg.sender}
              isMe={msg.sender === username}
              timestamp={msg.payload.timestamp}
              decryptionError={msg.decryptionError}
            />
          ))}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      <div className="p-4 bg-background/20 border-t border-border/30">
        <form onSubmit={handleSend} className="flex gap-2 items-center">
          <Input 
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={status === 'secure' ? "COMMAND >> TYPE ENCRYPTED PAYLOAD..." : "AWAITING SECURE LINK..."}
            className="flex-1 bg-background/50 border-border/50 h-10 rounded-lg terminal-text text-[10px] uppercase placeholder:opacity-30"
            disabled={status !== 'secure'}
          />
          <Button 
            type="submit" 
            size="icon" 
            className="h-10 w-10 shrink-0 rounded-lg shadow-lg"
            disabled={status !== 'secure' || !inputMessage.trim()}
          >
            <Send size={16} />
          </Button>
        </form>
        <div className="flex justify-between mt-2 px-1 text-[7px] font-black text-muted-foreground uppercase tracking-widest">
          <span>NON-PERSISTENT SESSION</span>
          <span className="text-primary/60">ZERO-TRUST RELAY ACTIVE</span>
        </div>
      </div>
    </div>
  );
}
