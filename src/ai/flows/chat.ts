'use server';

/**
 * @fileOverview A simple conversational AI flow.
 *
 * - generateChatResponse - A function that generates a response to a user's message.
 * - GenerateChatResponseInput - The input type for the generateChatResponseInput function.
 * - GenerateChatResponseOutput - The return type for the generateChatResponse function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.array(z.object({
    text: z.string(),
  })),
});

const GenerateChatResponseInputSchema = z.object({
  history: z.array(ChatMessageSchema).describe('The conversation history.'),
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
  
const generateChatResponseFlow = ai.defineFlow(
  {
    name: 'generateChatResponseFlow',
    inputSchema: GenerateChatResponseInputSchema,
    outputSchema: GenerateChatResponseOutputSchema,
  },
  async (input) => {
    const { history, message } = input;

    const { output } = await ai.generate({
      model: 'gemini-2.5-flash',
      history: history,
      prompt: `You are a helpful AI assistant for the Bus For You bus management app. Your name is Sage.
      
You can answer questions about the app, bus routes, and provide general assistance to users.

You must be able to understand and respond in the following languages: English, Hindi, Gujarati, and Hinglish. Detect the user's language from their message and respond in the same language.

Keep your responses concise and friendly.

User message: ${message}`,
      output: {
        format: 'text'
      }
    });

    return { response: output! };
  }
);
