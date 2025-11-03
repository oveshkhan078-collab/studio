"use server";

import {
  suggestCodingVideos,
  type SuggestCodingVideosInput,
} from "@/ai/flows/youtube-coding-video-suggestion";
import { z } from "zod";

const SuggestCodingVideosInputSchema = z.object({
  language: z.string().min(1, "Language is required."),
});

export async function getYouTubeSuggestions(input: SuggestCodingVideosInput) {
  const parsedInput = SuggestCodingVideosInputSchema.safeParse(input);
  if (!parsedInput.success) {
    throw new Error("Invalid input.");
  }

  const result = await suggestCodingVideos(parsedInput.data);
  return result;
}
