"use server";

import {
  generateStudyPlan,
  type StudyPlanInput,
} from "@/ai/flows/personalized-study-plan";
import { z } from "zod";

const StudyPlanInputSchema = z.object({
  courseLoad: z.string().min(10, "Course load description is too short."),
  examDates: z.string().min(10, "Please provide exam dates."),
  studyPreferences: z.string().min(10, "Study preferences description is too short."),
});

export async function createStudyPlan(input: StudyPlanInput) {
  const parsedInput = StudyPlanInputSchema.safeParse(input);
  if (!parsedInput.success) {
    throw new Error("Invalid input.");
  }
  
  const result = await generateStudyPlan(parsedInput.data);
  return result;
}
