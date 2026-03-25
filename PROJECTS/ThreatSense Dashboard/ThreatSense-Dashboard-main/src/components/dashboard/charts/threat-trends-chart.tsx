"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { threatTrendsData } from "@/app/lib/data";

const chartConfig = {
  threats: {
    label: "Threats",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function ThreatTrendsChart() {
  return (
    <div className="h-[250px] w-full">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <LineChart data={threatTrendsData}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            fontSize={12}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            fontSize={12}
          />
          <Tooltip cursor={false} content={<ChartTooltipContent />} />
          <Line
            dataKey="threats"
            type="monotone"
            stroke="var(--color-threats)"
            strokeWidth={2}
            dot={true}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
