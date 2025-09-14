"use client";

import { Bar, BarChart, XAxis, YAxis, Tooltip, Legend } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartConfig } from "@/components/ui/chart";

const data = [
  { time: "8am", current: 3800, capacity: 5000 },
  { time: "9am", current: 4600, capacity: 5000 },
  { time: "10am", current: 4100, capacity: 5000 },
  { time: "11am", current: 3900, capacity: 5000 },
  { time: "12pm", current: 3400, capacity: 5000 },
  { time: "1pm", current: 3800, capacity: 5000 },
];

const chartConfig = {
  current: {
    label: "Current Ridership",
    color: "hsl(var(--chart-1))",
  },
  capacity: {
    label: "Capacity",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function RidershipChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Ridership vs. Capacity</CardTitle>
        <CardDescription>
          Hourly passenger count compared to total capacity.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart data={data} barCategoryGap={ "5%"}>
                <XAxis
                    dataKey="time"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip content={<ChartTooltipContent />} cursor={{ fill: 'hsl(var(--muted))' }} />
                <Legend content={<ChartLegendContent />} />
                <Bar dataKey="current" fill="var(--color-current)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="capacity" fill="var(--color-capacity)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
      </CardContent>
    </Card>
  );
}
