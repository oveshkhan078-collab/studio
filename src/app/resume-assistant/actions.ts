"use server";

import {
  getResumeFeedback,
  type ResumeFeedbackInput,
} from "@/ai/flows/resume-assistant-feedback";
import { z } from "zod";

const ResumeFeedbackInputSchema = z.object({
  userProfile: z.string().min(50, "Profile must be at least 50 characters long."),
  targetRoles: z.string().min(10, "Target roles must be at least 10 characters long."),
});

export async function getFeedback(input: ResumeFeedbackInput) {
  const parsedInput = ResumeFeedbackInputSchema.safeParse(input);
  if (!parsedInput.success) {
    throw new Error("Invalid input.");
  }
  
  const result = await getResumeFeedback(parsedInput.data);
  return result;
}
