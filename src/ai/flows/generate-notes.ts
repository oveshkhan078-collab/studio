'use server';
/**
 * @fileOverview An AI agent that generates detailed study notes on a given topic.
 *
 * - generateNotes - A function that takes a topic and returns detailed notes.
 * - GenerateNotesInput - The input type for the generateNotes function.
 * - GenerateNotesOutput - The return type for the generateNotes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateNotesInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate notes.'),
});
export type GenerateNotesInput = z.infer<typeof GenerateNotesInputSchema>;

const GenerateNotesOutputSchema = z.object({
  notes: z.string().describe('Detailed and well-structured study notes on the given topic.'),
});
export type GenerateNotesOutput = z.infer<typeof GenerateNotesOutputSchema>;

export async function generateNotes(input: GenerateNotesInput): Promise<GenerateNotesOutput> {
  return generateNotesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateNotesPrompt',
  input: {schema: GenerateNotesInputSchema},
  output: {schema: GenerateNotesOutputSchema},
  prompt: `You are an expert educator and note-taker. A student has asked for your help to create study notes on a specific topic.

Topic: {{{topic}}}

Please generate detailed, well-structured, and easy-to-understand study notes on this topic. The notes should be comprehensive enough for a B.Tech student. Use markdown for formatting, including headings, bullet points, and bold text to organize the information clearly.`,
});

const generateNotesFlow = ai.defineFlow(
  {
    name: 'generateNotesFlow',
    inputSchema: GenerateNotesInputSchema,
    outputSchema: GenerateNotesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
