"use client";

import { Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
  ChartConfig
} from "@/components/ui/chart";
import { threatDistributionData } from "@/app/lib/data";

const chartConfig = {
  threats: {
    label: "Threats",
  },
  Critical: {
    label: "Critical",
    color: "hsl(var(--chart-5))",
  },
  High: {
    label: "High",
    color: "hsl(var(--chart-4))",
  },
  Medium: {
    label: "Medium",
    color: "hsl(var(--chart-3))",
  },
  Low: {
    label: "Low",
    color: "hsl(var(--chart-2))",
  },
  Informational: {
    label: "Informational",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function ThreatDistributionChart() {
  return (
    <div className="h-[250px] w-full">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <PieChart>
          <Tooltip content={<ChartTooltipContent nameKey="name" />} />
          <Legend content={<ChartLegendContent nameKey="name" />} />
          <Pie data={threatDistributionData} dataKey="value" nameKey="name" />
        </PieChart>
      </ChartContainer>
    </div>
  );
}
