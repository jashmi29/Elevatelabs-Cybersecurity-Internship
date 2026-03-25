"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

type ThreatResult = {
  indicator: string;
  score: number;
  reputation: "Malicious" | "Suspicious" | "Clean";
  reports: number;
  country: string;
  isp: string;
};

export function ThreatLookup() {
  const [indicator, setIndicator] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ThreatResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!indicator) return;

    setLoading(true);
    setResult(null);
    setError(null);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Basic validation
    const isIp = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(indicator);
    const isDomain = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(indicator);

    if (!isIp && !isDomain) {
      setError("Invalid input. Please enter a valid IP address or domain name.");
      setLoading(false);
      return;
    }

    // Mock response
    const mockResult: ThreatResult = {
      indicator: indicator,
      score: Math.floor(Math.random() * 101),
      reputation: ["Malicious", "Suspicious", "Clean"][Math.floor(Math.random() * 3)] as any,
      reports: Math.floor(Math.random() * 200),
      country: "United States",
      isp: "Cloudflare, Inc.",
    };
    setResult(mockResult);
    setLoading(false);
  };
  
  const getReputationVariant = (reputation: ThreatResult['reputation']) => {
    switch (reputation) {
      case 'Malicious':
        return 'destructive';
      case 'Suspicious':
        return 'secondary';
      default:
        return 'default';
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleLookup} className="flex w-full items-center space-x-2">
        <Input
          type="text"
          placeholder="e.g., 8.8.8.8 or example.com"
          value={indicator}
          onChange={(e) => setIndicator(e.target.value)}
          className="flex-1"
          aria-label="Threat indicator"
        />
        <Button type="submit" disabled={loading}>
          <Search className="mr-2 h-4 w-4" />
          Lookup
        </Button>
      </form>
      {loading && (
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </CardContent>
        </Card>
      )}
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
      {result && !loading && (
        <Card className="animate-in fade-in-50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="font-code">{result.indicator}</span>
               <Badge variant={getReputationVariant(result.reputation)}>{result.reputation}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Threat Score</p>
              <p className="font-semibold">{result.score}/100</p>
            </div>
            <div>
              <p className="text-muted-foreground">Total Reports</p>
              <p className="font-semibold">{result.reports}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Country</p>
              <p className="font-semibold">{result.country}</p>
            </div>
            <div>
              <p className="text-muted-foreground">ISP</p>
              <p className="font-semibold">{result.isp}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
