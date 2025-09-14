"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ChartTooltipContent } from "@/components/ui/chart";


const data = [
  { time: "8am", forecasted: 4000, actual: 3800 },
  { time: "9am", forecasted: 4500, actual: 4600 },
  { time: "10am", forecasted: 4200, actual: 4100 },
  { time: "11am", forecasted: 3800, actual: 3900 },
  { time: "12pm", forecasted: 3500, actual: 3400 },
  { time: "1pm", forecasted: 3700, actual: 3800 },
];

export function RidershipChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ridership: Forecast vs. Actual</CardTitle>
        <CardDescription>
          Hourly passenger count comparison for today.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
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
                <Bar dataKey="forecasted" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} name="Forecasted" />
                <Bar dataKey="actual" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} name="Actual" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
