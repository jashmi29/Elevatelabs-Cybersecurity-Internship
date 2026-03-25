import { Header } from "@/components/dashboard/header";
import { OverviewCards } from "@/components/dashboard/overview-cards";
import { ThreatLookup } from "@/components/dashboard/threat-lookup";
import { IocTable } from "@/components/dashboard/ioc-table";
import { ThreatTrendsChart } from "@/components/dashboard/charts/threat-trends-chart";
import { ThreatDistributionChart } from "@/components/dashboard/charts/threat-distribution-chart";
import { TopThreatsChart } from "@/components/dashboard/charts/top-threats-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <OverviewCards />
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="font-headline">Threat Lookup</CardTitle>
              <CardDescription>
                Enter an IP or domain to analyze in real-time.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ThreatLookup />
            </CardContent>
          </Card>
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-headline">Threat Distribution</CardTitle>
              <CardDescription>Breakdown of threats by severity.</CardDescription>
            </CardHeader>
            <CardContent>
              <ThreatDistributionChart />
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
           <Card>
            <CardHeader>
              <CardTitle className="font-headline">Threats Over Time</CardTitle>
              <CardDescription>Recent 30-day threat activity.</CardDescription>
            </CardHeader>
            <CardContent>
              <ThreatTrendsChart />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Top Malicious Indicators</CardTitle>
              <CardDescription>
                Most frequently reported IPs and domains.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TopThreatsChart />
            </CardContent>
          </Card>
        </div>
        <div>
          <IocTable />
        </div>
      </main>
    </div>
  );
}
