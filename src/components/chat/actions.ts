"use server";

import {
  generateChatResponse,
  GenerateChatResponseInput,
  GenerateChatResponseOutput,
} from "@/ai/flows/chat";

export async function handleChat(
  input: GenerateChatResponseInput
): Promise<GenerateChatResponseOutput | { error: string }> {
  try {
    const output = await generateChatResponse(input);
    return output;
  } catch (e: any) {
    console.error(e);
    return { error: e.message || "An unknown error occurred." };
  }
}
