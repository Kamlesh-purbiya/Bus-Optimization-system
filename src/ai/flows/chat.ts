'use server';

/**
 * @fileOverview A simple conversational AI flow.
 *
 * - generateChatResponse - A function that generates a response to a user's message.
 * - GenerateChatResponseInput - The input type for the generateChatResponse function.
 * - GenerateChatResponseOutput - The return type for the generateChatResponse function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateChatResponseInputSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.array(z.object({
      text: z.string(),
    })),
  })).describe('The conversation history.'),
  message: z.string().describe('The user\'s message.'),
});
export type GenerateChatResponseInput = z.infer<typeof GenerateChatResponseInputSchema>;

const GenerateChatResponseOutputSchema = z.object({
  response: z.string().describe('The AI\'s response.'),
});
export type GenerateChatResponseOutput = z.infer<typeof GenerateChatResponseOutputSchema>;

export async function generateChatResponse(
  input: GenerateChatResponseInput
): Promise<GenerateChatResponseOutput> {
  return generateChatResponseFlow(input);
}

const chatPrompt = ai.definePrompt(
    {
      name: 'chatPrompt',
      input: { schema: GenerateChatResponseInputSchema },
      output: { schema: GenerateChatResponseOutputSchema },
      prompt: `You are a helpful AI assistant for the TransitSage bus management app. Your name is Sage.
      
      You can answer questions about the app, bus routes, and provide general assistance to users.
      
      Keep your responses concise and friendly.
      `,
    },
  );
  

const generateChatResponseFlow = ai.defineFlow(
  {
    name: 'generateChatResponseFlow',
    inputSchema: GenerateChatResponseInputSchema,
    outputSchema: GenerateChatResponseOutputSchema,
  },
  async (input) => {
    const { history, message } = input;
    const { output } = await chatPrompt({
        history,
        message,
    });
    return output!;
  }
);
