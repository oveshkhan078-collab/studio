'use server';
/**
 * @fileOverview An AI agent that generates 3D models from text prompts.
 *
 * - generate3dModel - A function that takes a text prompt and returns a 3D model URL.
 * - Generate3dModelInput - The input type for the generate3dModel function.
 * - Generate3dModelOutput - The return type for the generate3dModel function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const Generate3dModelInputSchema = z.object({
  prompt: z.string().describe('A text description of the 3D model to generate.'),
});
export type Generate3dModelInput = z.infer<typeof Generate3dModelInputSchema>;

const Generate3dModelOutputSchema = z.object({
  modelUrl: z.string().describe('The URL of the generated 3D model in GLB format.'),
});
export type Generate3dModelOutput = z.infer<typeof Generate3dModelOutputSchema>;

export async function generate3dModel(input: Generate3dModelInput): Promise<Generate3dModelOutput> {
  return generate3dModelFlow(input);
}

const prompt = ai.definePrompt(
  {
    name: 'generate3dModelPrompt',
    input: { schema: Generate3dModelInputSchema },
    output: { schema: Generate3dModelOutputSchema },
    prompt: `Generate a 3D model based on the following description. The model should be suitable for use in a simple game.

Description: {{{prompt}}}

Return the public URL of the generated model in GLB format.`,
    
    // Using a placeholder for model generation as the actual model is not available.
    // In a real scenario, this would call a text-to-3D model API.
    // For now, we use a known public model and just reflect the prompt.
    // This simulates the AI understanding the prompt and "generating" a relevant model.
    async execute(input) {
      // Use a service like TripoSR or other model APIs here.
      // We will use a placeholder URL for demonstration.
      // The prompt is used to make the placeholder unique to the request.
      const encodedPrompt = encodeURIComponent(input.prompt);
      const modelUrl = `https://storage.googleapis.com/decc5029-a1b7-448a-a4a3-4813c9597a7d/f56221de-b565-4f39-81b4-b04044957f87.glb?prompt=${encodedPrompt}`;
      return {
        output: {
          modelUrl,
        }
      };
    },
  },
);

const generate3dModelFlow = ai.defineFlow(
  {
    name: 'generate3dModelFlow',
    inputSchema: Generate3dModelInputSchema,
    outputSchema: Generate3dModelOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
