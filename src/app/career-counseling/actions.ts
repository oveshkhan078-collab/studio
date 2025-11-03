"use server";

import {
  careerGuidanceChatbot,
  type CareerGuidanceChatbotInput,
} from "@/ai/flows/career-guidance-chatbot";
import { z } from "zod";

const CareerGuidanceChatbotInputSchema = z.object({
  fieldOfStudy: z.string().min(3, "Field of study is required."),
  interests: z.string().min(3, "Please describe your interests."),
});

export async function getCareerAdvice(input: CareerGuidanceChatbotInput) {
  const parsedInput = CareerGuidanceChatbotInputSchema.safeParse(input);
  if (!parsedInput.success) {
    throw new Error("Invalid input.");
  }

  const result = await careerGuidanceChatbot(parsedInput.data);
  return result;
}
