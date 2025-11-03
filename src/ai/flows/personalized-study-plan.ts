'use server';

/**
 * @fileOverview An AI agent that generates personalized study plans based on course load and exam dates.
 *
 * - generateStudyPlan - A function that generates a personalized study plan.
 * - StudyPlanInput - The input type for the generateStudyPlan function.
 * - StudyPlanOutput - The return type for the generateStudyPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StudyPlanInputSchema = z.object({
  courseLoad: z
    .string()
    .describe("A list of courses the student is taking, including course names and brief descriptions."),
  examDates: z
    .string()
    .describe("A list of exam dates for each course, in 'YYYY-MM-DD' format.  Specify the name of the course along with the exam date."),
  studyPreferences: z
    .string()
    .describe("The student's study preferences, including preferred study times, study methods, and any other relevant information."),
});
export type StudyPlanInput = z.infer<typeof StudyPlanInputSchema>;

const StudyPlanOutputSchema = z.object({
  studyPlan: z.string().describe('A detailed study plan, including topics to study each day, practice problems to solve, and review sessions.'),
});
export type StudyPlanOutput = z.infer<typeof StudyPlanOutputSchema>;

export async function generateStudyPlan(input: StudyPlanInput): Promise<StudyPlanOutput> {
  return generateStudyPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStudyPlanPrompt',
  input: {schema: StudyPlanInputSchema},
  output: {schema: StudyPlanOutputSchema},
  prompt: `You are an AI study plan generator. Your goal is to create a personalized study plan for the student based on their course load, exam dates, and study preferences.

Course Load: {{{courseLoad}}}
Exam Dates: {{{examDates}}}
Study Preferences: {{{studyPreferences}}}

Create a detailed study plan that includes topics to study each day, practice problems to solve, and review sessions. Be specific and actionable.`,
});

const generateStudyPlanFlow = ai.defineFlow(
  {
    name: 'generateStudyPlanFlow',
    inputSchema: StudyPlanInputSchema,
    outputSchema: StudyPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
