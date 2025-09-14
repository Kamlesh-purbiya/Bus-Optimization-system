"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  PredictPassengerDemandOutput,
} from "@/ai/flows/predict-passenger-demand";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { routes } from "@/lib/data";
import { Loader2, Wand2 } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { handlePrediction } from "@/app/prediction/actions";

const formSchema = z.object({
  routeId: z.string().min(1, "Please select a route."),
});

export type FormValues = z.infer<typeof formSchema>;

const chartConfig = {
  demand: {
    label: "Passengers",
    color: "hsl(var(--chart-1))",
  },
};

export function DemandPrediction() {
  const [prediction, setPrediction] =
    useState<PredictPassengerDemandOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { routeId: "" },
  });

  async function onSubmit(data: FormValues) {
    setIsLoading(true);
    setError(null);
    setPrediction(null);
    const result = await handlePrediction(data);
    if ("error" in result) {
      setError(result.error);
    } else {
      setPrediction(result);
    }
    setIsLoading(false);
  }
  
  const chartData = prediction ? prediction.demandForecast : [];


  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="routeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bus Route</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a route to forecast" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {routes.map((route) => (
                        <SelectItem key={route.id} value={route.id}>
                          {route.number} - {route.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              Predict Demand
            </Button>
          </form>
        </Form>
      </div>
      <div className="min-h-[20rem] rounded-lg border border-dashed flex items-center justify-center p-6 bg-muted/50">
        {isLoading && <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />}
        {error && <p className="text-destructive text-center">{error}</p>}
        {prediction && (
            <div className="w-full space-y-4">
                <div>
                    <h3 className="font-semibold text-lg">Demand Forecast</h3>
                    <div className="h-[200px] mt-2">
                      <ChartContainer config={chartConfig} className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <XAxis dataKey="hour" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip content={<ChartTooltipContent />} cursor={{ fill: 'hsl(var(--muted))' }} />
                                <Bar dataKey="demand" fill="var(--color-demand)" radius={[4, 4, 0, 0]} name="Passengers" />
                            </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold text-lg">AI Analysis</h3>
                    <p className="text-sm text-muted-foreground mt-1">{prediction.analysis}</p>
                </div>
            </div>
        )}
         {!isLoading && !prediction && !error && (
            <div className="text-center text-muted-foreground">
                <Wand2 className="mx-auto h-10 w-10 mb-2"/>
                <p>Prediction results will appear here.</p>
            </div>
        )}
      </div>
    </div>
  );
}
