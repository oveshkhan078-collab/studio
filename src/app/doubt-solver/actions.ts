"use server";

import {
  aiDoubtSolverExplanations,
  type AiDoubtSolverExplanationsInput,
} from "@/ai/flows/ai-doubt-solver-explanations";
import { z } from "zod";

const AiDoubtSolverExplanationsInputSchema = z.object({
  question: z.string().min(5, "Question must be at least 5 characters long."),
});

export async function getExplanation(input: AiDoubtSolverExplanationsInput) {
  const parsedInput = AiDoubtSolverExplanationsInputSchema.safeParse(input);
  if (!parsedInput.success) {
    throw new Error("Invalid input.");
  }
  
  const result = await aiDoubtSolverExplanations(parsedInput.data);
  return result;
}
