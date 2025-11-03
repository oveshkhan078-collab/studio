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
import { getExplanation } from "./actions";
import { BrainCircuit, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FormSchema = z.object({
  question: z.string().min(5, {
    message: "Question must be at least 5 characters.",
  }),
});

type ExplanationOutput = {
  explanation: string;
}

export default function DoubtSolverPage() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ExplanationOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      question: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setResult(null);
    startTransition(async () => {
      try {
        const res = await getExplanation(data);
        setResult(res);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to get an explanation. Please try again.",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">AI-Powered Doubt Solver</h1>
      <Card>
        <CardHeader>
          <CardTitle>Ask a Question</CardTitle>
          <CardDescription>
            Have a doubt? Ask our AI for a clear and concise explanation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Question</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., How does a blockchain work? Explain the concept of recursion."
                        className="resize-y"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Be as specific as possible for the best results.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Get Explanation
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Explanation</h2>
        {isPending && (
          <Card className="flex items-center justify-center min-h-[200px]">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin" />
              <p>Our AI is thinking...</p>
            </div>
          </Card>
        )}
        {!isPending && !result && (
            <Card className="flex items-center justify-center min-h-[200px]">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <BrainCircuit className="h-8 w-8" />
                <p>Your explanation will appear here.</p>
              </div>
            </Card>
        )}
        {result && (
          <Card>
            <CardContent className="p-6 prose prose-sm max-w-none text-foreground whitespace-pre-wrap">
              {result.explanation}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
