'use server';
/**
 * @fileOverview Provides career advice and guidance based on the student's field of study.
 *
 * - careerGuidanceChatbot - A function that provides career advice.
 * - CareerGuidanceChatbotInput - The input type for the careerGuidanceChatbot function.
 * - CareerGuidanceChatbotOutput - The return type for the careerGuidanceChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CareerGuidanceChatbotInputSchema = z.object({
  fieldOfStudy: z.string().describe('The student\'s field of study.'),
  interests: z.string().describe('The student\'s interests.'),
});
export type CareerGuidanceChatbotInput = z.infer<typeof CareerGuidanceChatbotInputSchema>;

const CareerGuidanceChatbotOutputSchema = z.object({
  advice: z.string().describe('Career advice and guidance based on the student\'s field of study.'),
});
export type CareerGuidanceChatbotOutput = z.infer<typeof CareerGuidanceChatbotOutputSchema>;

export async function careerGuidanceChatbot(input: CareerGuidanceChatbotInput): Promise<CareerGuidanceChatbotOutput> {
  return careerGuidanceChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'careerGuidanceChatbotPrompt',
  input: {schema: CareerGuidanceChatbotInputSchema},
  output: {schema: CareerGuidanceChatbotOutputSchema},
  prompt: `You are a career counselor providing advice to students based on their field of study and interests.

  Field of Study: {{{fieldOfStudy}}}
  Interests: {{{interests}}}

  Provide detailed career advice and guidance, including potential career paths, relevant skills to develop, and resources for further exploration.`,
});

const careerGuidanceChatbotFlow = ai.defineFlow(
  {
    name: 'careerGuidanceChatbotFlow',
    inputSchema: CareerGuidanceChatbotInputSchema,
    outputSchema: CareerGuidanceChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
