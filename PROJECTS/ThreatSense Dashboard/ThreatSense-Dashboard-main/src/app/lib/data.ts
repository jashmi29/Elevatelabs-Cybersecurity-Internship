export type Ioc = {
  id: number;
  indicator: string;
  type: "IP Address" | "Domain" | "File Hash";
  timestamp: string;
  source: "VirusTotal" | "AbuseIPDB";
  tags: string[];
};

export const iocData: Ioc[] = [
  {
    id: 1,
    indicator: "198.51.100.23",
    type: "IP Address",
    timestamp: "2024-05-21 14:30",
    source: "AbuseIPDB",
    tags: ["Botnet", "C2"],
  },
  {
    id: 2,
    indicator: "malicious-domain.xyz",
    type: "Domain",
    timestamp: "2024-05-21 12:15",
    source: "VirusTotal",
    tags: ["Phishing"],
  },
  {
    id: 3,
    indicator: "203.0.113.88",
    type: "IP Address",
    timestamp: "2024-05-20 23:05",
    source: "AbuseIPDB",
    tags: ["Brute-force", "SSH"],
  },
  {
    id: 4,
    indicator: "eicar.com.txt",
    type: "File Hash",
    timestamp: "2024-05-20 18:45",
    source: "VirusTotal",
    tags: ["Malware", "Test"],
  },
  {
    id: 5,
    indicator: "exploit-kit-landing.co",
    type: "Domain",
    timestamp: "2024-05-19 09:00",
    source: "VirusTotal",
    tags: ["Exploit Kit"],
  },
  {
    id: 6,
    indicator: "192.0.2.14_error", // for testing error state
    type: "IP Address",
    timestamp: "2024-05-19 08:30",
    source: "AbuseIPDB",
    tags: ["Scanning"],
  },
];

export const threatTrendsData = [
  { date: "May 1", threats: 65 },
  { date: "May 4", threats: 59 },
  { date: "May 7", threats: 80 },
  { date: "May 10", threats: 81 },
  { date: "May 13", threats: 56 },
  { date: "May 16", threats: 95 },
  { date: "May 19", threats: 110 },
  { date: "May 22", threats: 92 },
];

export const threatDistributionData = [
    { name: "Critical", value: 120, fill: "var(--color-chart-5)" },
    { name: "High", value: 340, fill: "var(--color-chart-4)" },
    { name: "Medium", value: 280, fill: "var(--color-chart-3)" },
    { name: "Low", value: 450, fill: "var(--color-chart-2)" },
    { name: "Informational", value: 100, fill: "var(--color-chart-1)" },
];

export const topThreatsData = [
  { indicator: "198.51.100.23", reports: 98 },
  { indicator: "exploit-kit.co", reports: 86 },
  { indicator: "203.0.113.88", reports: 72 },
  { indicator: "bad-actor-ip.net", reports: 65 },
  { indicator: "phishing-site.com", reports: 51 },
];
