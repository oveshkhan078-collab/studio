'use server';
/**
 * @fileOverview An AI agent that suggests YouTube coding videos based on a programming language.
 *
 * - suggestCodingVideos - A function that suggests YouTube videos.
 * - SuggestCodingVideosInput - The input type for the suggestCodingVideos function.
 * - SuggestCodingVideosOutput - The return type for the suggestCodingVideos function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const SuggestCodingVideosInputSchema = z.object({
  language: z.string().describe('The programming language for which to suggest videos.'),
});
export type SuggestCodingVideosInput = z.infer<typeof SuggestCodingVideosInputSchema>;

const SuggestionSchema = z.object({
  title: z.string().describe('The title of the YouTube video.'),
  channel: z.string().describe('The name of the YouTube channel.'),
  youtubeId: z.string().describe('The YouTube video ID.'),
});

const SuggestCodingVideosOutputSchema = z.object({
  suggestions: z.array(SuggestionSchema).describe('A list of YouTube video suggestions.'),
});
export type SuggestCodingVideosOutput = z.infer<typeof SuggestCodingVideosOutputSchema>;

export async function suggestCodingVideos(input: SuggestCodingVideosInput): Promise<SuggestCodingVideosOutput> {
  return suggestCodingVideosFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestCodingVideosPrompt',
  input: { schema: SuggestCodingVideosInputSchema },
  output: { schema: SuggestCodingVideosOutputSchema },
  prompt: `You are an expert tech educator. Suggest 3 helpful YouTube videos for someone learning the '{{{language}}}' programming language. Provide the video title, channel name, and the YouTube video ID.`,
});

const suggestCodingVideosFlow = ai.defineFlow(
  {
    name: 'suggestCodingVideosFlow',
    inputSchema: SuggestCodingVideosInputSchema,
    outputSchema: SuggestCodingVideosOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
