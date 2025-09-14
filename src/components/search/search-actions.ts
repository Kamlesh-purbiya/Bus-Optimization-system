'use server';
import {
  getRoutesForDestination,
  GetRoutesForDestinationOutput,
} from '@/ai/flows/get-routes-for-destination';

export async function handleSearch(
  destination: string
): Promise<GetRoutesForDestinationOutput | { error: string }> {
  try {
    if (!destination) {
      return { routes: [], analysis: 'Please enter a destination.' };
    }
    const output = await getRoutesForDestination({ destination });
    return output;
  } catch (e: any) {
    console.error(e);
    return { error: e.message || 'An unknown error occurred during search.' };
  }
}
