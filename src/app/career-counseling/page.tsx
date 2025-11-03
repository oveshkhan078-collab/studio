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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useState, useTransition } from "react";
import { getCareerAdvice } from "./actions";
import { Lightbulb, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FormSchema = z.object({
  fieldOfStudy: z.string().min(3, {
    message: "Field of study must be at least 3 characters.",
  }),
  interests: z.string().min(10, {
    message: "Please describe your interests in at least 10 characters.",
  }),
});

type CareerAdviceOutput = {
  advice: string;
}

export default function CareerCounselingPage() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<CareerAdviceOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fieldOfStudy: "",
      interests: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setResult(null);
    startTransition(async () => {
      try {
        const res = await getCareerAdvice(data);
        setResult(res);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to get career advice. Please try again.",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Career Counseling Chatbot</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Get Career Advice</CardTitle>
            <CardDescription>
              Tell us about your studies and interests, and our AI will provide personalized career guidance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="fieldOfStudy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Field of Study</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Computer Science, Mechanical Engineering" {...field} />
                      </FormControl>
                      <FormDescription>
                        What is your primary academic discipline?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="interests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Interests</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., I love building mobile apps, learning about AI, and participating in hackathons."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Describe your hobbies, passions, and what you enjoy doing.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isPending}>
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Get Advice
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Personalized Guidance</h2>
          {isPending && (
            <Card className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin" />
                <p>Generating your career path...</p>
              </div>
            </Card>
          )}
          {!isPending && !result && (
             <Card className="flex items-center justify-center h-64">
               <div className="flex flex-col items-center gap-2 text-muted-foreground">
                 <Lightbulb className="h-8 w-8" />
                 <p>Your AI-powered career advice will appear here.</p>
               </div>
             </Card>
          )}
          {result && (
            <Card>
              <CardHeader>
                <CardTitle>Recommended Path</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">
                {result.advice}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
