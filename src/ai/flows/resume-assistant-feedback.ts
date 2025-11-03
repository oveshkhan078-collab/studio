'use server';

/**
 * @fileOverview An AI-powered resume assistant that provides personalized feedback on resume improvement.
 *
 * - getResumeFeedback - A function that takes a user profile and target internship roles to suggest resume improvements.
 * - ResumeFeedbackInput - The input type for the getResumeFeedback function.
 * - ResumeFeedbackOutput - The return type for the getResumeFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ResumeFeedbackInputSchema = z.object({
  userProfile: z
    .string()
    .describe('A detailed description of the user profile, including skills, education, and experiences.'),
  targetRoles: z
    .string()
    .describe('A description of the internship roles the user is targeting.'),
});
export type ResumeFeedbackInput = z.infer<typeof ResumeFeedbackInputSchema>;

const ResumeFeedbackOutputSchema = z.object({
  feedback: z
    .string()
    .describe('Personalized tips on how to improve the resume based on the user profile and targeted internship roles.'),
});
export type ResumeFeedbackOutput = z.infer<typeof ResumeFeedbackOutputSchema>;

export async function getResumeFeedback(input: ResumeFeedbackInput): Promise<ResumeFeedbackOutput> {
  return resumeFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'resumeFeedbackPrompt',
  input: {schema: ResumeFeedbackInputSchema},
  output: {schema: ResumeFeedbackOutputSchema},
  prompt: `You are an expert resume consultant. A student will provide their profile, along with the internship roles they are targeting. Provide personalized and actionable feedback on how they can improve their resume to increase their chances of getting shortlisted.

User Profile: {{{userProfile}}}
Target Internship Roles: {{{targetRoles}}}

Give specific suggestions, and explain why each suggestion will make the resume better.
`,
});

const resumeFeedbackFlow = ai.defineFlow(
  {
    name: 'resumeFeedbackFlow',
    inputSchema: ResumeFeedbackInputSchema,
    outputSchema: ResumeFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
