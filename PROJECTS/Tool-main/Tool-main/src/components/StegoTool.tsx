
"use client";

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ImageDropzone } from '@/components/ImageDropzone';
import { AIContextualizer } from '@/components/AIContextualizer';
import { Eye, EyeOff, Download, Shield, Zap, Search, Loader2 } from 'lucide-react';
import { encodeMessage, decodeMessage } from '@/lib/steganography';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

export default function StegoTool() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [encodedUrl, setEncodedUrl] = useState<string | null>(null);
  const [decodedMessage, setDecodedMessage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleEncode = async () => {
    if (!file || !message) return;
    setLoading(true);
    setProgress(30);
    try {
      const resultUrl = await encodeMessage(file, message);
      setProgress(100);
      setEncodedUrl(resultUrl);
      toast({
        title: 'Encoding Complete',
        description: 'Your secret message has been hidden within the image.',
      });
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Encoding Failed',
        description: err.message,
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 500);
    }
  };

  const handleDecode = async () => {
    if (!file) return;
    setLoading(true);
    setProgress(30);
    try {
      const extracted = await decodeMessage(file);
      setProgress(100);
      setDecodedMessage(extracted);
      toast({
        title: 'Decoding Complete',
        description: 'Information extracted from the image carrier.',
      });
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Decoding Failed',
        description: 'Could not extract message from this image.',
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 500);
    }
  };

  const downloadImage = () => {
    if (!encodedUrl) return;
    const link = document.createElement('a');
    link.href = encodedUrl;
    link.download = `insight_hidden_${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Left Column: Input & Controls */}
      <div className="space-y-6">
        <Card className="glass border-border shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold">
              <Shield className="h-5 w-5 text-primary" />
              Secure Payload
            </CardTitle>
            <CardDescription>
              Upload a carrier image and enter your secret message.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <ImageDropzone onFileSelect={setFile} selectedFile={file} />

            <Tabs defaultValue="encode" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4 bg-background/50">
                <TabsTrigger value="encode" className="flex items-center gap-2">
                  <EyeOff className="h-4 w-4" /> Hide
                </TabsTrigger>
                <TabsTrigger value="decode" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" /> Reveal
                </TabsTrigger>
              </TabsList>

              <TabsContent value="encode" className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Secret Message</label>
                  <Textarea 
                    placeholder="Type what you want to hide..." 
                    className="min-h-[120px] bg-background/40 focus:ring-primary/50"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={handleEncode} 
                  disabled={loading || !file || !message}
                  className="w-full py-6 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
                >
                  {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Zap className="mr-2 h-5 w-5 fill-current" />}
                  {loading ? 'Embedding Bits...' : 'Encode & Encrypt'}
                </Button>
                {loading && <Progress value={progress} className="h-1 bg-primary/20" />}
              </TabsContent>

              <TabsContent value="decode" className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="p-4 rounded-lg bg-muted/30 border border-border text-sm text-muted-foreground">
                  Ensure you upload the steganographic PNG file to extract the hidden data.
                </div>
                <Button 
                  onClick={handleDecode} 
                  disabled={loading || !file}
                  className="w-full py-6 text-lg font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg shadow-secondary/20"
                >
                  {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Search className="mr-2 h-5 w-5" />}
                  {loading ? 'Analyzing Pixels...' : 'Extract Hidden Data'}
                </Button>
                {loading && <Progress value={progress} className="h-1 bg-secondary/20" />}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <AIContextualizer onSelectSuggestion={(msg) => setMessage(msg)} />
      </div>

      {/* Right Column: Output & Previews */}
      <div className="space-y-6">
        <Card className="glass border-border overflow-hidden shadow-2xl min-h-[400px]">
          <CardHeader className="border-b border-border/50">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Analysis Result</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {!encodedUrl && !decodedMessage ? (
              <div className="flex flex-col items-center justify-center h-[400px] text-center p-10 space-y-4 opacity-40">
                <div className="p-6 rounded-full bg-muted border border-border">
                  <Shield className="h-12 w-12 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Ready for Operation</h3>
                  <p className="text-sm">Processed output will appear here after encoding or decoding.</p>
                </div>
              </div>
            ) : null}

            {encodedUrl && (
              <div className="p-6 space-y-6 animate-in fade-in duration-500">
                <div className="relative group">
                  <img 
                    src={encodedUrl} 
                    alt="Stego Result" 
                    className="w-full rounded-xl border border-primary/30 shadow-2xl"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/60 rounded-xl">
                     <p className="text-xs font-bold text-primary">LSB ENCODED IMAGE</p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="bg-primary/5 p-4 rounded-xl border border-primary/20">
                    <p className="text-xs font-bold text-primary mb-1">STATUS</p>
                    <p className="text-sm text-foreground">Message successfully embedded. Visual integrity maintained.</p>
                  </div>
                  <Button onClick={downloadImage} className="w-full h-12 bg-primary text-primary-foreground">
                    <Download className="mr-2 h-4 w-4" /> Download Stego Image
                  </Button>
                </div>
              </div>
            )}

            {decodedMessage && (
              <div className="p-6 space-y-6 animate-in slide-in-from-right-4 duration-300">
                <div className="bg-secondary/10 p-6 rounded-xl border border-secondary/20 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-secondary tracking-widest uppercase">Extracted Information</p>
                    <div className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
                  </div>
                  <div className="p-4 bg-background/50 rounded-lg border border-border/50 font-mono text-sm leading-relaxed max-h-[300px] overflow-auto">
                    {decodedMessage}
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full border-secondary/30 text-secondary hover:bg-secondary/10"
                    onClick={() => {
                      navigator.clipboard.writeText(decodedMessage);
                      toast({ title: 'Copied', description: 'Extracted message copied to clipboard.' });
                    }}
                  >
                    <Copy className="mr-2 h-4 w-4" /> Copy To Clipboard
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Tiles */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl glass border-border space-y-2">
            <p className="text-xs font-bold text-primary">ENCRYPTION</p>
            <p className="text-[10px] text-muted-foreground leading-snug">Uses pixel-level bit replacement ensuring 100% visual fidelity for human observers.</p>
          </div>
          <div className="p-4 rounded-xl glass border-border space-y-2">
            <p className="text-xs font-bold text-accent">CARRIERS</p>
            <p className="text-[10px] text-muted-foreground leading-snug">Lossless PNG and BMP formats supported for maximum data preservation.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Copy(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}
