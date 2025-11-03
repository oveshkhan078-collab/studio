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
import { getFeedback } from "./actions";
import { FileText, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FormSchema = z.object({
  userProfile: z.string().min(50, {
    message: "Your profile description must be at least 50 characters.",
  }),
  targetRoles: z.string().min(10, {
    message: "Target roles must be at least 10 characters.",
  }),
});

type FeedbackOutput = {
  feedback: string;
}

export default function ResumeAssistantPage() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<FeedbackOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userProfile: "",
      targetRoles: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setResult(null);
    startTransition(async () => {
      try {
        const res = await getFeedback(data);
        setResult(res);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to get feedback. Please try again.",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">AI Resume Assistant</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Improve Your Resume</CardTitle>
            <CardDescription>
              Provide your profile details and target roles to get personalized, AI-powered feedback.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="userProfile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Profile</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Paste your skills, education, and experience here..."
                          className="resize-y"
                          rows={10}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Provide a detailed summary of your current resume.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="targetRoles"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Internship Roles</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Software Development Engineer Intern, Data Analyst Intern"
                          className="resize-none"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        List the types of internships you are applying for.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isPending}>
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Get Feedback
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">AI Feedback</h2>
          {isPending && (
            <Card className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin" />
                <p>Analyzing your resume...</p>
              </div>
            </Card>
          )}
          {!isPending && !result && (
             <Card className="flex items-center justify-center h-64">
               <div className="flex flex-col items-center gap-2 text-muted-foreground">
                 <FileText className="h-8 w-8" />
                 <p>Your personalized feedback will appear here.</p>
               </div>
             </Card>
          )}
          {result && (
            <Card>
              <CardHeader>
                <CardTitle>Suggestions for Improvement</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">
                {result.feedback}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
