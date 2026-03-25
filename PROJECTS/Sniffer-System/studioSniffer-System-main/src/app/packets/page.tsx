"use client"

import React, { useState } from 'react';
import { Search, Filter, Download, ArrowUpDown } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MOCK_PACKETS } from '@/lib/mock-data';

export default function PacketViewer() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPackets = MOCK_PACKETS.filter(p => 
    p.sourceIp.includes(searchTerm) || 
    p.destinationIp.includes(searchTerm) || 
    p.protocol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-headline font-bold tracking-tight">Packet Data Viewer</h2>
          <p className="text-muted-foreground">Real-time log of captured network traffic.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9 gap-2">
            <Filter className="h-4 w-4" /> Filter
          </Button>
          <Button variant="outline" size="sm" className="h-9 gap-2">
            <Download className="h-4 w-4" /> Export
          </Button>
        </div>
      </header>

      <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-3 border-b border-border/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Filter by IP, Protocol, or Port..." 
              className="pl-10 h-10 bg-secondary/30 border-none focus-visible:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border/50 hover:bg-transparent">
                  <TableHead className="w-[180px] font-bold">Timestamp</TableHead>
                  <TableHead className="font-bold">Source IP</TableHead>
                  <TableHead className="font-bold">Destination IP</TableHead>
                  <TableHead className="font-bold">Protocol</TableHead>
                  <TableHead className="font-bold text-right">Src Port</TableHead>
                  <TableHead className="font-bold text-right">Dst Port</TableHead>
                  <TableHead className="font-bold text-right">Size (B)</TableHead>
                  <TableHead className="font-bold">Flags</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPackets.map((packet) => (
                  <TableRow key={packet.id} className="border-border/30 hover:bg-secondary/20 transition-colors group">
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {new Date(packet.timestamp).toLocaleTimeString()}
                    </TableCell>
                    <TableCell className="font-semibold tracking-tight">{packet.sourceIp}</TableCell>
                    <TableCell className="font-semibold tracking-tight">{packet.destinationIp}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={cn(
                        "font-bold text-[10px] uppercase",
                        packet.protocol === 'TCP' ? 'bg-indigo-500/10 text-indigo-400' : 
                        packet.protocol === 'UDP' ? 'bg-sky-500/10 text-sky-400' : 
                        'bg-gray-500/10 text-gray-400'
                      )}>
                        {packet.protocol}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono text-xs">{packet.sourcePort}</TableCell>
                    <TableCell className="text-right font-mono text-xs">{packet.destinationPort}</TableCell>
                    <TableCell className="text-right font-mono text-xs">{packet.length}</TableCell>
                    <TableCell className="font-mono text-[10px] text-muted-foreground uppercase">{packet.flags || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredPackets.length === 0 && (
            <div className="p-12 text-center text-muted-foreground">
              No packets found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Ensure cn is available since it's used in the template
import { cn } from '@/lib/utils';