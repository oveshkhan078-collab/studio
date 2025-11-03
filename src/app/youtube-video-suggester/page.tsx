
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useState, useTransition } from "react";
import { getYouTubeSuggestions } from "./actions";
import { Youtube, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FormSchema = z.object({
  language: z.string().min(1, {
    message: "Please enter a programming language.",
  }),
});

type Suggestion = {
  title: string;
  channel: string;
  youtubeId: string;
};

type SuggestionsOutput = {
  suggestions: Suggestion[];
}

export default function YouTubeVideoSuggesterPage() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<SuggestionsOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      language: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setResult(null);
    startTransition(async () => {
      try {
        const res = await getYouTubeSuggestions(data);
        setResult(res);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to get video suggestions. Please try again.",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Coding Video Suggester</h1>
        <p className="text-muted-foreground">Enter a programming language to get AI-powered YouTube video recommendations.</p>
      </div>
      
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Find Coding Videos</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Programming Language</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Python, JavaScript, Rust" {...field} />
                    </FormControl>
                    <FormDescription>
                      What language do you want to learn?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Get Suggestions
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div>
          <h2 className="text-xl font-semibold mb-4">AI Recommendations</h2>
          {isPending && (
            <Card className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin" />
                <p>Searching for the best videos...</p>
              </div>
            </Card>
          )}
          {!isPending && !result && (
             <Card className="flex items-center justify-center h-64 text-center p-4">
               <div className="flex flex-col items-center gap-2 text-muted-foreground">
                 <Youtube className="h-12 w-12" />
                 <p>Your video suggestions for learning to code will appear here.</p>
               </div>
             </Card>
          )}
          {result && (
            <div className="flex space-x-4 pb-4 overflow-x-auto">
                {result.suggestions.map((video, index) => (
                    <div key={index} className="w-80 flex-shrink-0">
                      <Card className="flex flex-col h-full overflow-hidden">
                          <div className="aspect-video w-full">
                              <iframe
                                  className="w-full h-full"
                                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                                  title={video.title}
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                              ></iframe>
                          </div>
                          <CardHeader className="flex-grow">
                              <CardTitle className="text-base leading-tight line-clamp-2">{video.title}</CardTitle>
                              <CardDescription>{video.channel}</CardDescription>
                          </CardHeader>
                      </Card>
                    </div>
                ))}
            </div>
          )}
        </div>
    </div>
  );
}
