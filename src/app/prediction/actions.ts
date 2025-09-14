"use server";

import {
  predictPassengerDemand,
  PredictPassengerDemandOutput,
} from "@/ai/flows/predict-passenger-demand";
import { historicalDataString } from "@/lib/data";
import type { FormValues } from "@/components/prediction/demand-prediction";

export async function handlePrediction(
  data: FormValues
): Promise<PredictPassengerDemandOutput | { error: string }> {
  try {
    const output = await predictPassengerDemand({
      routeId: data.routeId,
      timestamp: new Date().toISOString(),
      historicalData: historicalDataString,
    });
    return output;
  } catch (e: any) {
    console.error(e);
    return { error: e.message || "An unknown error occurred." };
  }
}
