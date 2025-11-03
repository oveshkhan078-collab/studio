'use server';

import {
  generateNotes,
  type GenerateNotesInput,
} from '@/ai/flows/generate-notes';
import {z} from 'zod';

const GenerateNotesInputSchema = z.object({
  topic: z.string().min(3, 'Topic must be at least 3 characters long.'),
});

export async function getAiNotes(
  input: GenerateNotesInput
): Promise<{notes: string}> {
  const parsedInput = GenerateNotesInputSchema.safeParse(input);
  if (!parsedInput.success) {
    throw new Error('Invalid input.');
  }

  const result = await generateNotes(parsedInput.data);
  return result;
}
