export interface Packet {
  id: string;
  timestamp: string;
  sourceIp: string;
  destinationIp: string;
  sourcePort: number;
  destinationPort: number;
  protocol: 'TCP' | 'UDP' | 'ICMP';
  length: number;
  flags?: string;
}

export interface Anomaly {
  id: string;
  type: string;
  sourceIp: string;
  destinationIp: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  details: string;
  protocol?: string;
  destinationPort?: number;
}

export const MOCK_PACKETS: Packet[] = [
  { id: '1', timestamp: new Date(Date.now() - 1000).toISOString(), sourceIp: '192.168.1.5', destinationIp: '8.8.8.8', sourcePort: 54321, destinationPort: 443, protocol: 'TCP', length: 64, flags: 'SYN' },
  { id: '2', timestamp: new Date(Date.now() - 2000).toISOString(), sourceIp: '10.0.0.12', destinationIp: '192.168.1.1', sourcePort: 12345, destinationPort: 80, protocol: 'TCP', length: 1500, flags: 'ACK' },
  { id: '3', timestamp: new Date(Date.now() - 3000).toISOString(), sourceIp: '192.168.1.10', destinationIp: '1.1.1.1', sourcePort: 60000, destinationPort: 53, protocol: 'UDP', length: 128 },
  { id: '4', timestamp: new Date(Date.now() - 4000).toISOString(), sourceIp: '172.16.0.4', destinationIp: '172.16.0.1', sourcePort: 0, destinationPort: 0, protocol: 'ICMP', length: 32 },
  { id: '5', timestamp: new Date(Date.now() - 5000).toISOString(), sourceIp: '192.168.1.5', destinationIp: '52.12.33.1', sourcePort: 54322, destinationPort: 443, protocol: 'TCP', length: 1200, flags: 'PSH, ACK' },
  { id: '6', timestamp: new Date(Date.now() - 6000).toISOString(), sourceIp: '45.12.33.22', destinationIp: '192.168.1.100', sourcePort: 3321, destinationPort: 22, protocol: 'TCP', length: 44, flags: 'SYN' },
  { id: '7', timestamp: new Date(Date.now() - 7000).toISOString(), sourceIp: '192.168.1.100', destinationIp: '45.12.33.22', sourcePort: 22, destinationPort: 3321, protocol: 'TCP', length: 44, flags: 'SYN, ACK' },
  { id: '8', timestamp: new Date(Date.now() - 8000).toISOString(), sourceIp: '45.12.33.22', destinationIp: '192.168.1.100', sourcePort: 3321, destinationPort: 22, protocol: 'TCP', length: 52, flags: 'ACK' },
];

export const MOCK_ANOMALIES: Anomaly[] = [
  { 
    id: 'a1', 
    type: 'Port Scan', 
    sourceIp: '185.234.11.2', 
    destinationIp: '192.168.1.100', 
    timestamp: new Date(Date.now() - 3600000).toISOString(), 
    severity: 'high', 
    details: 'Multiple connection attempts to sequential ports (20-1000) within 2 seconds.',
    protocol: 'TCP'
  },
  { 
    id: 'a2', 
    type: 'Traffic Flood', 
    sourceIp: '10.0.5.11', 
    destinationIp: '192.168.1.1', 
    timestamp: new Date(Date.now() - 7200000).toISOString(), 
    severity: 'critical', 
    details: 'Over 50,000 packets per second detected from single source.',
    protocol: 'UDP'
  },
  { 
    id: 'a3', 
    type: 'Unauthorized SSH Access', 
    sourceIp: '203.0.113.44', 
    destinationIp: '192.168.1.50', 
    timestamp: new Date(Date.now() - 14400000).toISOString(), 
    severity: 'medium', 
    details: 'Failed SSH login attempts reaching threshold limit.',
    protocol: 'TCP',
    destinationPort: 22
  },
];

export const TRAFFIC_HISTORY = [
  { time: '00:00', packets: 400 },
  { time: '04:00', packets: 300 },
  { time: '08:00', packets: 900 },
  { time: '12:00', packets: 1200 },
  { time: '16:00', packets: 1500 },
  { time: '20:00', packets: 1100 },
  { time: '23:59', packets: 600 },
];

export const TOP_TALKERS = [
  { ip: '192.168.1.5', count: 12450 },
  { ip: '10.0.0.12', count: 8320 },
  { ip: '192.168.1.10', count: 4500 },
  { ip: '172.16.0.4', count: 3200 },
  { ip: '8.8.8.8', count: 2100 },
];