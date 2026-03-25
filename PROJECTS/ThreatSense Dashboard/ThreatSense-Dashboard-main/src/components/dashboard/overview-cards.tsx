import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertTriangle,
  ArrowUp,
  ShieldAlert,
  Signal,
  Users,
} from "lucide-react";

const metrics = [
  {
    title: "Total Threats Detected",
    value: "1,234",
    change: "+12.5%",
    icon: <AlertTriangle className="h-5 w-5 text-primary" />,
    description: "from last week",
  },
  {
    title: "High-Risk IPs",
    value: "89",
    change: "+5.2%",
    icon: <ShieldAlert className="h-5 w-5 text-primary" />,
    description: "in the last 24 hours",
  },
  {
    title: "Recent Malicious Activity",
    value: "352",
    change: "+20.1%",
    icon: <Signal className="h-5 w-5 text-primary" />,
    description: "in the last hour",
  },
  {
    title: "Monitored Domains",
    value: "5,678",
    change: "+200",
    icon: <Users className="h-5 w-5 text-primary" />,
    description: "newly added this month",
  },
];

export function OverviewCards() {
  return (
    <>
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            {metric.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">{metric.value}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="flex items-center text-emerald-400">
                <ArrowUp className="h-3 w-3" />
                {metric.change}
              </span>
              {metric.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
