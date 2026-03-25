"use client"

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  BrainCircuit, 
  ExternalLink, 
  AlertTriangle,
  Info,
  ChevronRight,
  Loader2,
  Trash2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { MOCK_ANOMALIES, Anomaly } from '@/lib/mock-data';
import { aiAnomalyInsightTool, AiAnomalyInsightToolOutput } from '@/ai/flows/ai-anomaly-insight-tool';
import { useToast } from '@/hooks/use-toast';

export default function AnomalyManagement() {
  const [selectedAnomaly, setSelectedAnomaly] = useState<Anomaly | null>(null);
  const [insight, setInsight] = useState<AiAnomalyInsightToolOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGetInsight = async (anomaly: Anomaly) => {
    setSelectedAnomaly(anomaly);
    setLoading(true);
    setInsight(null);
    try {
      const result = await aiAnomalyInsightTool({
        anomalyType: anomaly.type,
        sourceIp: anomaly.sourceIp,
        destinationIp: anomaly.destinationIp,
        protocol: anomaly.protocol,
        destinationPort: anomaly.destinationPort,
        timestamp: anomaly.timestamp,
        additionalDetails: anomaly.details
      });
      setInsight(result);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "AI Analysis Failed",
        description: "Could not fetch threat intelligence at this time."
      });
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'high': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      default: return 'bg-sky-500/10 text-sky-500 border-sky-500/20';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-headline font-bold tracking-tight">Anomaly Reports</h2>
          <p className="text-muted-foreground">Detected network threats and security event intelligence.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="destructive" size="sm" className="h-9 gap-2">
            <Trash2 className="h-4 w-4" /> Clear History
          </Button>
        </div>
      </header>

      <div className="grid gap-4">
        {MOCK_ANOMALIES.map((anomaly) => (
          <Card key={anomaly.id} className="border-none shadow-md bg-card/50 backdrop-blur-sm overflow-hidden group hover:ring-1 hover:ring-primary/30 transition-all duration-300">
            <div className="flex flex-col md:flex-row">
              <div className={`w-2 h-auto ${anomaly.severity === 'critical' ? 'bg-red-500' : anomaly.severity === 'high' ? 'bg-orange-500' : 'bg-primary'}`} />
              <div className="flex-1 p-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold tracking-tight">{anomaly.type}</h3>
                      <Badge variant="outline" className={getSeverityColor(anomaly.severity)}>
                        {anomaly.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><ShieldAlert className="w-3 h-3 text-accent" /> {anomaly.sourceIp}</span>
                      <span className="flex items-center gap-1 font-mono text-xs">{new Date(anomaly.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      onClick={() => handleGetInsight(anomaly)}
                      className="bg-primary hover:bg-primary/80 text-white gap-2 shadow-lg shadow-primary/20"
                    >
                      <BrainCircuit className="w-4 h-4" /> AI Insight
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-secondary/20 rounded-lg text-sm border border-border/50">
                  {anomaly.details}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedAnomaly} onOpenChange={(open) => !open && setSelectedAnomaly(null)}>
        <DialogContent className="max-w-2xl bg-card border-border shadow-2xl p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-0">
            <div className="flex items-center gap-3 text-accent mb-2">
              <BrainCircuit className="w-6 h-6" />
              <span className="text-xs font-bold uppercase tracking-widest">AI Threat Analysis Engine</span>
            </div>
            <DialogTitle className="text-2xl font-headline font-bold">
              Analysis for {selectedAnomaly?.type}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Deep packet inspection and threat intelligence powered by Gemini.
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-[60vh] overflow-y-auto p-6 space-y-8">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
                <p className="text-sm font-medium animate-pulse">Consulting Threat Intelligence databases...</p>
              </div>
            ) : insight ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
                <section className="space-y-3">
                  <div className="flex items-center gap-2 text-primary font-bold">
                    <Info className="w-5 h-5" />
                    <h4>Explanation</h4>
                  </div>
                  <div className="text-sm leading-relaxed text-muted-foreground bg-secondary/10 p-4 rounded-xl border border-border/30">
                    {insight.explanation}
                  </div>
                </section>

                <section className="space-y-3">
                  <div className="flex items-center gap-2 text-orange-400 font-bold">
                    <AlertTriangle className="w-5 h-5" />
                    <h4>Threat Intelligence</h4>
                  </div>
                  <div className="text-sm leading-relaxed text-muted-foreground bg-secondary/10 p-4 rounded-xl border border-border/30">
                    {insight.threatIntelligence}
                  </div>
                </section>

                <section className="space-y-3">
                  <div className="flex items-center gap-2 text-accent font-bold">
                    <ShieldAlert className="w-5 h-5" />
                    <h4>Remediation Suggestions</h4>
                  </div>
                  <div className="text-sm leading-relaxed text-muted-foreground bg-secondary/10 p-4 rounded-xl border border-border/30 whitespace-pre-line">
                    {insight.remediationSuggestions}
                  </div>
                </section>
              </div>
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                Click "AI Insight" to generate a threat report.
              </div>
            )}
          </div>

          <DialogFooter className="bg-secondary/20 p-4 border-t border-border">
            <Button variant="outline" onClick={() => setSelectedAnomaly(null)}>Close Analysis</Button>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/80 gap-2">
              <ExternalLink className="w-4 h-4" /> Export Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}