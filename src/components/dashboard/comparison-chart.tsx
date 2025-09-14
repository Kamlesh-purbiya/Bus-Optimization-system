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
  { hour: "8am", actual: 150, predicted: 160 },
  { hour: "9am", actual: 250, predicted: 240 },
  { hour: "10am", actual: 180, predicted: 185 },
  { hour: "11am", actual: 200, predicted: 190 },
  { hour: "12pm", actual: 220, predicted: 230 },
];

const chartConfig = {
  actual: {
    label: "Actual Ridership",
    color: "hsl(var(--chart-1))",
  },
  predicted: {
    label: "AI Predicted Demand",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;


export function ComparisonChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ridership: Actual vs. Predicted</CardTitle>
        <CardDescription>
          Comparison of actual ridership against AI-predicted demand for Route 335E.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
            <BarChart data={data}>
              <XAxis
                dataKey="hour"
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
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip content={<ChartTooltipContent />} cursor={{ fill: 'hsl(var(--muted))' }}/>
              <Legend content={<ChartLegendContent />} />
              <Bar dataKey="actual" fill="var(--color-actual)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="predicted" fill="var(--color-predicted)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
      </CardContent>
    </Card>
  );
}
