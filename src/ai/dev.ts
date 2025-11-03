'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/resume-assistant-feedback.ts';
import '@/ai/flows/career-guidance-chatbot.ts';
import '@/ai/flows/ai-doubt-solver-explanations.ts';
import '@/ai/flows/personalized-study-plan.ts';
import '@/ai/flows/solve-math-problem.ts';
import '@/ai/flows/youtube-coding-video-suggestion.ts';
import '@/ai/flows/generate-notes.ts';
