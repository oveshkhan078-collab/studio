"use server";

import {
  generate3dModel,
  type Generate3dModelInput,
} from "@/ai/flows/generate-3d-model";
import { z } from "zod";

const GenerateModelSchema = z.object({
  prompt: z.string().min(3, "Prompt must be at least 3 characters long."),
});

export async function generateModel(input: Generate3dModelInput) {
  const parsedInput = GenerateModelSchema.safeParse(input);
  if (!parsedInput.success) {
    throw new Error("Invalid input: " + parsedInput.error.message);
  }

  const result = await generate3dModel(parsedInput.data);
  return result;
}
