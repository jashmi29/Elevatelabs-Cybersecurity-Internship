"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, BrainCircuit, ShieldCheck, Target } from "lucide-react";
import { getAiSummaryAction } from "@/app/lib/actions";
import type { Ioc } from "@/app/lib/data";
import { useToast } from "@/hooks/use-toast";
import type { AISummarizedThreatContextOutput } from "@/ai/flows/ai-summarized-threat-context-flow";

interface AIInsightDialogProps {
  isOpen: boolean;
  onClose: () => void;
  ioc: Ioc;
}

export function AIInsightDialog({ isOpen, onClose, ioc }: AIInsightDialogProps) {
  const [summary, setSummary] = useState<AISummarizedThreatContextOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      const fetchSummary = async () => {
        setLoading(true);
        setError(null);
        setSummary(null);
        try {
          const result = await getAiSummaryAction({
            value: ioc.indicator,
            type: ioc.type === "IP Address" ? "IP_ADDRESS" : ioc.type === "Domain" ? "DOMAIN" : "FILE_HASH",
          });
          setSummary(result);
        } catch (e: any) {
          setError(e.message);
          toast({
            variant: "destructive",
            title: "Error",
            description: e.message,
          })
        } finally {
          setLoading(false);
        }
      };
      fetchSummary();
    }
  }, [isOpen, ioc, toast]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-headline text-2xl">
            <BrainCircuit className="h-6 w-6 text-primary" />
            AI-Powered Threat Insight
          </DialogTitle>
          <DialogDescription>
            AI-generated summary for{" "}
            <Badge variant="outline" className="font-code text-base">
              {ioc.indicator}
            </Badge>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4 max-h-[60vh] overflow-y-auto pr-2">
          {loading && <LoadingSkeleton />}
          {error && <ErrorDisplay message={error} />}
          {summary && !loading && (
            <div className="space-y-6 animate-in fade-in-50">
              <InsightSection icon={<ShieldCheck className="text-accent" />} title="Threat Summary">
                <p>{summary.summary}</p>
              </InsightSection>
              <InsightSection icon={<Target className="text-accent" />} title="Potential Impact">
                 <p>{summary.potentialImpact}</p>
              </InsightSection>
              <InsightSection icon={<AlertCircle className="text-accent" />} title="Suggested Next Steps">
                 <p>{summary.suggestedNextSteps}</p>
              </InsightSection>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

const InsightSection = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <div className="flex items-start gap-4">
        <div className="mt-1 flex-shrink-0">{icon}</div>
        <div>
            <h3 className="font-semibold text-lg font-headline">{title}</h3>
            <div className="text-muted-foreground mt-1">{children}</div>
        </div>
    </div>
);


const LoadingSkeleton = () => (
    <div className="space-y-6">
        <div className="space-y-2">
            <Skeleton className="h-5 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
        </div>
        <div className="space-y-2">
            <Skeleton className="h-5 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
        </div>
         <div className="space-y-2">
            <Skeleton className="h-5 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/6" />
        </div>
    </div>
)

const ErrorDisplay = ({ message }: { message: string }) => (
    <div className="flex flex-col items-center justify-center text-center rounded-lg border border-dashed border-destructive/50 p-8">
        <AlertCircle className="h-10 w-10 text-destructive mb-4" />
        <h3 className="text-lg font-semibold text-destructive">Insight Generation Failed</h3>
        <p className="text-sm text-muted-foreground mt-2">{message}</p>
    </div>
)
