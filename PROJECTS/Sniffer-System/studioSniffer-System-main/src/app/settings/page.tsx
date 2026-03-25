"use client"

import React, { useState } from 'react';
import { 
  Settings, 
  ShieldCheck, 
  ShieldAlert, 
  Plus, 
  Trash2, 
  Save,
  Globe,
  Lock,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

export default function Configuration() {
  const { toast } = useToast();
  const [thresholds, setThresholds] = useState({
    portScan: 15,
    floodRate: 1000,
    sshAttempts: 5
  });

  const [blacklist, setBlacklist] = useState([
    { ip: '185.234.11.2', reason: 'Repeated Port Scans', added: '2023-10-24' },
    { ip: '103.44.11.22', reason: 'Known Botnet Node', added: '2023-10-22' }
  ]);

  const [newIp, setNewIp] = useState('');

  const handleSave = () => {
    toast({
      title: "Configuration Updated",
      description: "Anomaly detection thresholds have been synchronized with the backend engine."
    });
  };

  const addToBlacklist = () => {
    if (!newIp) return;
    setBlacklist([...blacklist, { ip: newIp, reason: 'Manual Entry', added: new Date().toISOString().split('T')[0] }]);
    setNewIp('');
    toast({
      title: "IP Blacklisted",
      description: `${newIp} has been added to the blocking engine.`
    });
  };

  const removeIp = (ip: string) => {
    setBlacklist(blacklist.filter(item => item.ip !== ip));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-headline font-bold tracking-tight">System Configuration</h2>
          <p className="text-muted-foreground">Fine-tune detection engines and manage network access controls.</p>
        </div>
        <Button onClick={handleSave} className="bg-accent text-accent-foreground hover:bg-accent/80 gap-2 h-10 shadow-lg shadow-accent/20">
          <Save className="w-4 h-4" /> Save Changes
        </Button>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-2 text-primary">
                <Zap className="w-5 h-5" />
                <CardTitle>Anomaly Thresholds</CardTitle>
              </div>
              <CardDescription>Adjust sensitivity of the automated detection algorithms.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="font-bold">Port Scan Sensitivity</Label>
                  <span className="text-xs font-mono bg-secondary px-2 py-1 rounded text-accent">{thresholds.portScan} ports / sec</span>
                </div>
                <Slider 
                  max={100} 
                  step={1} 
                  value={[thresholds.portScan]} 
                  onValueChange={([v]) => setThresholds({...thresholds, portScan: v})} 
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="font-bold">Traffic Flood Threshold</Label>
                  <span className="text-xs font-mono bg-secondary px-2 py-1 rounded text-accent">{thresholds.floodRate} pkts / sec</span>
                </div>
                <Slider 
                  max={5000} 
                  step={100} 
                  value={[thresholds.floodRate]} 
                  onValueChange={([v]) => setThresholds({...thresholds, floodRate: v})} 
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="font-bold">Brute Force Limit</Label>
                  <span className="text-xs font-mono bg-secondary px-2 py-1 rounded text-accent">{thresholds.sshAttempts} attempts</span>
                </div>
                <Slider 
                  max={20} 
                  step={1} 
                  value={[thresholds.sshAttempts]} 
                  onValueChange={([v]) => setThresholds({...thresholds, sshAttempts: v})} 
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-2 text-accent">
                <Lock className="w-5 h-5" />
                <CardTitle>Security Hardening</CardTitle>
              </div>
              <CardDescription>Additional system security and notification features.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/10 border border-border/30">
                <div className="space-y-0.5">
                  <Label className="font-bold">Auto-Drop High Severity</Label>
                  <p className="text-xs text-muted-foreground">Automatically drop traffic from critical threat IPs.</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/10 border border-border/30">
                <div className="space-y-0.5">
                  <Label className="font-bold">Promiscuous Mode</Label>
                  <p className="text-xs text-muted-foreground">Enable deep packet inspection for all network traffic.</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/10 border border-border/30">
                <div className="space-y-0.5">
                  <Label className="font-bold">Email Notifications</Label>
                  <p className="text-xs text-muted-foreground">Send critical alerts to administrative email.</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-2 text-destructive">
              <ShieldAlert className="w-5 h-5" />
              <CardTitle>IP Blacklist</CardTitle>
            </div>
            <CardDescription>Explicitly blocked source IP addresses.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            <div className="flex gap-2">
              <Input 
                placeholder="Enter IP address to block..." 
                className="bg-secondary/30 border-none"
                value={newIp}
                onChange={(e) => setNewIp(e.target.value)}
              />
              <Button onClick={addToBlacklist} className="bg-secondary hover:bg-secondary/80 text-foreground">
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </div>

            <div className="rounded-xl border border-border/30 overflow-hidden bg-background/30">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/30 hover:bg-secondary/30">
                    <TableHead className="text-xs font-bold">IP Address</TableHead>
                    <TableHead className="text-xs font-bold">Reason</TableHead>
                    <TableHead className="text-xs font-bold text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blacklist.map((item) => (
                    <TableRow key={item.ip} className="hover:bg-secondary/10 border-border/30 group">
                      <TableCell className="font-mono text-sm">{item.ip}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{item.reason}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeIp(item.ip)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {blacklist.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-8 text-muted-foreground italic">
                        No blacklisted IPs found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <div className="p-6 pt-0 mt-auto text-[10px] text-muted-foreground uppercase tracking-widest text-center flex items-center justify-center gap-2">
            <Globe className="w-3 h-3" /> External Threat Intelligence Enabled
          </div>
        </Card>
      </div>
    </div>
  );
}