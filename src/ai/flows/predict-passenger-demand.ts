'use server';

/**
 * @fileOverview Passenger demand prediction flow.
 *
 * - predictPassengerDemand - A function that predicts passenger demand for the next few hours.
 * - PredictPassengerDemandInput - The input type for the predictPassengerDemand function.
 * - PredictPassengerDemandOutput - The return type for the predictPassengerDemand function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictPassengerDemandInputSchema = z.object({
  routeId: z.string().describe('The ID of the bus route.'),
  timestamp: z.string().describe('The current timestamp in ISO format.'),
  historicalData: z.string().describe('Historical passenger data for the route.'),
  recentData: z.string().optional().describe('Recent passenger data for the route, if available.'),
});
export type PredictPassengerDemandInput = z.infer<typeof PredictPassengerDemandInputSchema>;

const PredictPassengerDemandOutputSchema = z.object({
  demandForecast: z.record(z.string(), z.number()).describe('A map of hour to predicted passenger count for the next few hours.'),
  analysis: z.string().describe('An analysis of the factors affecting the demand forecast.'),
});
export type PredictPassengerDemandOutput = z.infer<typeof PredictPassengerDemandOutputSchema>;

export async function predictPassengerDemand(input: PredictPassengerDemandInput): Promise<PredictPassengerDemandOutput> {
  return predictPassengerDemandFlow(input);
}

const predictPassengerDemandPrompt = ai.definePrompt({
  name: 'predictPassengerDemandPrompt',
  input: {schema: PredictPassengerDemandInputSchema},
  output: {schema: PredictPassengerDemandOutputSchema},
  prompt: `You are a transit data analyst tasked with predicting passenger demand for a bus route.

  Analyze the provided historical data and any recent data to forecast passenger demand for the next few hours.
  Consider factors such as time of day, day of week, and any trends in the data.

  Historical Data: {{{historicalData}}}
  Recent Data (if available): {{{recentData}}}
  Current Timestamp: {{{timestamp}}}
  Route ID: {{{routeId}}}

  Provide a demand forecast as a JSON object mapping each of the next few hours to the predicted passenger count.
  Also, provide a brief analysis of the factors influencing the demand forecast.

  Ensure that the demandForecast contains data for each of the next few hours.
`,
});

const predictPassengerDemandFlow = ai.defineFlow(
  {
    name: 'predictPassengerDemandFlow',
    inputSchema: PredictPassengerDemandInputSchema,
    outputSchema: PredictPassengerDemandOutputSchema,
  },
  async input => {
    const {output} = await predictPassengerDemandPrompt(input);
    return output!;
  }
);
