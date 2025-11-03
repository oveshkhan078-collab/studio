'use server';
/**
 * @fileOverview An AI agent that solves complex mathematical problems.
 *
 * - solveMathProblem - A function that takes a mathematical problem and returns the solution.
 * - SolveMathProblemInput - The input type for the solveMathProblem function.
 * - SolveMathProblemOutput - The return type for the solveMathProblem function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SolveMathProblemInputSchema = z.object({
  problem: z.string().describe('The mathematical problem to solve.'),
});
export type SolveMathProblemInput = z.infer<typeof SolveMathProblemInputSchema>;

const SolveMathProblemOutputSchema = z.object({
  solution: z.string().describe('The solution to the mathematical problem.'),
  explanation: z.string().describe('A step-by-step explanation of how the solution was reached.'),
});
export type SolveMathProblemOutput = z.infer<typeof SolveMathProblemOutputSchema>;

export async function solveMathProblem(input: SolveMathProblemInput): Promise<SolveMathProblemOutput> {
  return solveMathProblemFlow(input);
}

const prompt = ai.definePrompt({
  name: 'solveMathProblemPrompt',
  input: {schema: SolveMathProblemInputSchema},
  output: {schema: SolveMathProblemOutputSchema},
  prompt: `You are a highly advanced AI mathematician. Solve the following problem and provide a step-by-step explanation.

Problem: {{{problem}}}

Provide the final answer in the 'solution' field and the detailed steps in the 'explanation' field.`,
});

const solveMathProblemFlow = ai.defineFlow(
  {
    name: 'solveMathProblemFlow',
    inputSchema: SolveMathProblemInputSchema,
    outputSchema: SolveMathProblemOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
