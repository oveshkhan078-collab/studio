"use server";

import {
  solveMathProblem,
  type SolveMathProblemInput,
} from "@/ai/flows/solve-math-problem";
import { z } from "zod";

const SolveMathProblemInputSchema = z.object({
  problem: z.string().min(1, "Problem statement cannot be empty."),
});

export async function getAiSolution(input: SolveMathProblemInput) {
  const parsedInput = SolveMathProblemInputSchema.safeParse(input);
  if (!parsedInput.success) {
    throw new Error("Invalid input.");
  }
  
  const result = await solveMathProblem(parsedInput.data);
  return result;
}
