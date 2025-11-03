'use server';
/**
 * @fileOverview AI-Powered Doubt Solver for providing explanations.
 *
 * - aiDoubtSolverExplanations - A function that provides explanations for questions, with optional diagrams or video links.
 * - AiDoubtSolverExplanationsInput - The input type for the aiDoubtSolverExplanations function.
 * - AiDoubtSolverExplanationsOutput - The return type for the aiDoubtSolverExplanations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiDoubtSolverExplanationsInputSchema = z.object({
  question: z.string().describe('The question to be answered.'),
});
export type AiDoubtSolverExplanationsInput = z.infer<typeof AiDoubtSolverExplanationsInputSchema>;

const AiDoubtSolverExplanationsOutputSchema = z.object({
  explanation: z.string().describe('The explanation for the question, including diagrams or video links if appropriate.'),
});
export type AiDoubtSolverExplanationsOutput = z.infer<typeof AiDoubtSolverExplanationsOutputSchema>;

export async function aiDoubtSolverExplanations(input: AiDoubtSolverExplanationsInput): Promise<AiDoubtSolverExplanationsOutput> {
  return aiDoubtSolverExplanationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiDoubtSolverExplanationsPrompt',
  input: {schema: AiDoubtSolverExplanationsInputSchema},
  output: {schema: AiDoubtSolverExplanationsOutputSchema},
  prompt: `You are an AI-powered doubt solver. Provide a clear and concise explanation for the following question. If appropriate, include diagrams or video links to aid understanding.\n\nQuestion: {{{question}}}`,
});

const aiDoubtSolverExplanationsFlow = ai.defineFlow(
  {
    name: 'aiDoubtSolverExplanationsFlow',
    inputSchema: AiDoubtSolverExplanationsInputSchema,
    outputSchema: AiDoubtSolverExplanationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
