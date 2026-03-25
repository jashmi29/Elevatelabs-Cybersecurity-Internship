
"use client";

import React, { useState } from 'react';
import { Sparkles, Copy, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { rephraseSecretMessage } from '@/ai/flows/rephrase-secret-message';
import { useToast } from '@/hooks/use-toast';

export function AIContextualizer({ onSelectSuggestion }: { onSelectSuggestion: (msg: string) => void }) {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleRephrase = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const { rephrasedMessage } = await rephraseSecretMessage({ secretMessage: input });
      setResult(rephrasedMessage);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'AI Processing Error',
        description: 'Failed to rephrase message. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 p-4 rounded-xl glass border-primary/20">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="h-4 w-4 text-accent animate-pulse" />
        <h3 className="text-sm font-semibold gradient-text">Secret Message Contextualizer</h3>
      </div>
      
      <Textarea
        placeholder="Enter your sensitive message to contextualize..."
        className="text-xs bg-background/50"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <Button 
        onClick={handleRephrase} 
        disabled={loading || !input.trim()}
        className="w-full h-8 text-xs bg-accent text-accent-foreground hover:bg-accent/90"
      >
        {loading ? <Loader2 className="h-3 w-3 animate-spin mr-2" /> : <Sparkles className="h-3 w-3 mr-2" />}
        Generate Innocuous Version
      </Button>

      {result && (
        <div className="mt-4 animate-in fade-in slide-in-from-top-1">
          <div className="p-3 bg-muted/40 rounded-lg text-xs leading-relaxed border border-border relative group">
            <p className="text-muted-foreground italic mb-1 uppercase tracking-tighter text-[10px]">Plausible Context:</p>
            {result}
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="icon" variant="ghost" className="h-6 w-6" onClick={copyToClipboard}>
                {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
              </Button>
              <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => onSelectSuggestion(result)}>
                <Check className="h-3 w-3 text-primary" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
