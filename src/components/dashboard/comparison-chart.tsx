"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ChartTooltipContent } from "@/components/ui/chart";

const data = [
  { route: "335E", original: 18, optimized: 12 },
  { route: "500D", original: 25, optimized: 15 },
  { route: "225C", original: 15, optimized: 10 },
  { route: "V-500K", original: 22, optimized: 18 },
  { route: "502H", original: 12, optimized: 9 },
];

export function ComparisonChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule Optimization Impact</CardTitle>
        <CardDescription>
          Comparison of average passenger wait times (in minutes) before and after optimization.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis
                dataKey="route"
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
                tickFormatter={(value) => `${value} min`}
              />
              <Tooltip content={<ChartTooltipContent />} cursor={{ fill: 'hsl(var(--muted))' }}/>
              <Legend />
              <Bar dataKey="original" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} name="Original Wait Time" />
              <Bar dataKey="optimized" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} name="Optimized Wait Time" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
