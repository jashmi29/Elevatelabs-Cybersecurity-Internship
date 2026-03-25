"use client";

import {
  Bar,
  BarChart,
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
import { topThreatsData } from "@/app/lib/data";

const chartConfig = {
  reports: {
    label: "Reports",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig;

export function TopThreatsChart() {
  return (
    <div className="h-[250px] w-full">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <BarChart
          data={topThreatsData}
          layout="vertical"
          margin={{ left: 10, right: 10 }}
        >
          <CartesianGrid horizontal={false} />
          <YAxis
            dataKey="indicator"
            type="category"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            fontSize={12}
            width={100}
            tickFormatter={(value) => value.length > 12 ? `${value.substring(0, 12)}...` : value}
          />
          <XAxis dataKey="reports" type="number" hide />
          <Tooltip cursor={false} content={<ChartTooltipContent />} />
          <Bar
            dataKey="reports"
            fill="var(--color-reports)"
            radius={4}
            barSize={20}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
