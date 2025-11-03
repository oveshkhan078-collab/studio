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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useState, useTransition } from "react";
import { createStudyPlan } from "./actions";
import { CalendarCheck, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FormSchema = z.object({
  courseLoad: z.string().min(10, {
    message: "Course load must be at least 10 characters.",
  }),
  examDates: z.string().min(10, {
    message: "Exam dates must be at least 10 characters.",
  }),
  studyPreferences: z.string().min(10, {
    message: "Study preferences must be at least 10 characters.",
  }),
});

type StudyPlanOutput = {
  studyPlan: string;
}

export default function StudyPlanGeneratorPage() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<StudyPlanOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      courseLoad: "",
      examDates: "",
      studyPreferences: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setResult(null);
    startTransition(async () => {
      try {
        const res = await createStudyPlan(data);
        setResult(res);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to generate study plan. Please try again.",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">AI Study Plan Generator</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Create Your Study Plan</CardTitle>
            <CardDescription>
              Let our AI generate a personalized study schedule based on your courses and exams.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="courseLoad"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Load</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List your courses, e.g., CS101 - Intro to Programming, MA203 - Linear Algebra"
                          className="resize-y"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="examDates"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Exam Dates</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., CS101 Mid-term: 2024-10-25, MA203 Final: 2024-12-15"
                          className="resize-y"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="studyPreferences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Study Preferences</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., I prefer studying in the morning, 2 hours per session. I like using flashcards."
                          className="resize-y"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isPending}>
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Generate Plan
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Personalized Plan</h2>
          {isPending && (
            <Card className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin" />
                <p>Crafting your schedule...</p>
              </div>
            </Card>
          )}
          {!isPending && !result && (
             <Card className="flex items-center justify-center h-64">
               <div className="flex flex-col items-center gap-2 text-muted-foreground">
                 <CalendarCheck className="h-8 w-8" />
                 <p>Your study plan will appear here.</p>
               </div>
             </Card>
          )}
          {result && (
            <Card>
              <CardHeader>
                <CardTitle>Your Roadmap to Success</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">
                {result.studyPlan}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
