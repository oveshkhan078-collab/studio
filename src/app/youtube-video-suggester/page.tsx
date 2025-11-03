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
    <div>
      <h1 className="text-3xl font-bold mb-6">Coding Video Suggester</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Find Coding Videos</CardTitle>
              <CardDescription>
                Enter a programming language to get AI-powered YouTube video recommendations.
              </CardDescription>
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
                  <Button type="submit" disabled={isPending} className="w-full">
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Get Suggestions
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold">AI Recommendations</h2>
          {isPending && (
            <Card className="flex items-center justify-center h-96">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin" />
                <p>Searching for the best videos...</p>
              </div>
            </Card>
          )}
          {!isPending && !result && (
             <Card className="flex items-center justify-center h-96 text-center p-4">
               <div className="flex flex-col items-center gap-2 text-muted-foreground">
                 <Youtube className="h-12 w-12" />
                 <p>Your video suggestions for learning to code will appear here.</p>
               </div>
             </Card>
          )}
          {result && (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {result.suggestions.map((video, index) => (
                    <Card key={index} className="flex flex-col overflow-hidden">
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
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
