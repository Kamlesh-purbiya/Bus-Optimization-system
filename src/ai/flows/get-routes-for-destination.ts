'use server';

/**
 * @fileOverview A flow for finding bus routes for a given destination.
 *
 * - getRoutesForDestination - A function that returns bus routes for a destination.
 * - GetRoutesForDestinationInput - The input type for the getRoutesForDestination function.
 * - GetRoutesForDestinationOutput - The return type for the getRoutesForDestination function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { routes } from '@/lib/data';

const RouteInfoSchema = z.object({
  id: z.string().describe('The ID of the route.'),
  number: z.string().describe('The bus number for the route.'),
  name: z.string().describe('The name of the route (e.g., start to end).'),
  status: z.string().describe("The current status of the route (e.g., 'On Time', 'Delayed')."),
});

const GetRoutesForDestinationInputSchema = z.object({
  destination: z.string().describe('The destination the user wants to go to.'),
});
export type GetRoutesForDestinationInput = z.infer<typeof GetRoutesForDestinationInputSchema>;

const GetRoutesForDestinationOutputSchema = z.object({
  routes: z.array(RouteInfoSchema).describe('An array of bus routes that go to the given destination.'),
  analysis: z.string().describe('A brief analysis or summary of the found routes.'),
});
export type GetRoutesForDestinationOutput = z.infer<typeof GetRoutesForDestinationOutputSchema>;

export async function getRoutesForDestination(
  input: GetRoutesForDestinationInput
): Promise<GetRoutesForDestinationOutput> {
  return getRoutesForDestinationFlow(input);
}

// Create a string representation of all available routes to pass to the model.
const allRoutesAsString = routes.map(r => `${r.number} (${r.name})`).join(', ');

const getRoutesForDestinationPrompt = ai.definePrompt({
  name: 'getRoutesForDestinationPrompt',
  input: { schema: GetRoutesForDestinationInputSchema },
  output: { schema: GetRoutesForDestinationOutputSchema },
  prompt: `You are a helpful assistant for a bus transit system. Your task is to find the correct bus routes for a user's desired destination based on the available routes.

  The user wants to go to: {{{destination}}}

  Here are all the available routes: ${allRoutesAsString}

  Analyze the user's destination and determine which of the available routes can take them there. The route name contains the start and end points. The destination might be one of the end points or a major location along the route.

  Return a list of matching routes and a short analysis. If no routes are found, return an empty array and state that in the analysis.

  Here is the full route data, use this to populate the 'routes' output array with all required fields for each matching route:
  ${JSON.stringify(routes)}
  `,
});

const getRoutesForDestinationFlow = ai.defineFlow(
  {
    name: 'getRoutesForDestinationFlow',
    inputSchema: GetRoutesForDestinationInputSchema,
    outputSchema: GetRoutesForDestinationOutputSchema,
  },
  async (input) => {
    const { output } = await getRoutesForDestinationPrompt(input);
    return output!;
  }
);
