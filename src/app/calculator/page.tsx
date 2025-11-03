
"use client";

import { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BrainCircuit, Loader2, Wand2 } from "lucide-react";
import { getAiSolution } from "./actions";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

const operations = ["/", "*", "-", "+"];
const buttons = [
  "C", "±", "%", "/",
  "7", "8", "9", "*",
  "4", "5", "6", "-",
  "1", "2", "3", "+",
  "0", ".", "=",
];

type AiSolutionOutput = {
  solution: string;
  explanation: string;
}

export default function CalculatorPage() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [isPending, startTransition] = useTransition();
  const [aiSolution, setAiSolution] = useState<AiSolutionOutput | null>(null);
  const { toast } = useToast();

  const handleButtonClick = (btn: string) => {
    setAiSolution(null);
    if (!isNaN(parseInt(btn)) || btn === ".") {
      if (display === "0" && btn !== ".") {
        setDisplay(btn);
        setExpression(btn);
      } else if (btn === "." && display.includes(".")) {
        return;
      } else {
        setDisplay(display + btn);
        setExpression(expression + btn);
      }
    } else if (btn === "C") {
      setDisplay("0");
      setExpression("");
    } else if (btn === "=") {
      try {
        const result = new Function('return ' + expression.replace(/--/g, '+'))();
        setDisplay(String(result));
        setExpression(String(result));
      } catch (error) {
        setDisplay("Error");
        setExpression("");
      }
    } else if (operations.includes(btn)) {
      if (expression !== "" && !operations.some(op => expression.endsWith(op))) {
        setDisplay(display + btn);
        setExpression(expression + btn);
      }
    } else if (btn === "±") {
      if (display !== "0") {
        const newValue = parseFloat(display) * -1;
        setDisplay(String(newValue));
        setExpression(String(newValue));
      }
    } else if (btn === "%") {
      if (display !== "0") {
        const newValue = parseFloat(display) / 100;
        setDisplay(String(newValue));
        setExpression(String(newValue));
      }
    }
  };

  const handleAiSolve = () => {
    setAiSolution(null);
    startTransition(async () => {
      try {
        const res = await getAiSolution({ problem: expression });
        setAiSolution(res);
        setDisplay(res.solution);
      } catch (error) {
        toast({
          title: "AI Error",
          description: "The AI solver failed. Please check the expression or try again.",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-grow">
        <h1 className="text-3xl font-bold mb-6">AI Calculator</h1>
        <Card className="max-w-md mx-auto shadow-lg">
          <CardHeader>
            <Textarea
              className="bg-muted p-4 rounded-lg text-right text-4xl font-mono break-all min-h-[6rem] resize-none"
              value={display}
              onChange={(e) => {
                setDisplay(e.target.value);
                setExpression(e.target.value);
              }}
              placeholder="Enter your expression"
            />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-2">
              {buttons.map((btn) => (
                <Button
                  key={btn}
                  onClick={() => handleButtonClick(btn)}
                  variant={
                    ["C", "±", "%"].includes(btn) ? "secondary" : 
                    operations.includes(btn) || btn === "=" ? "default" : "outline"
                  }
                  className={`text-2xl p-6 h-auto ${btn === "0" ? "col-span-2" : ""}`}
                  style={{
                     backgroundColor: operations.includes(btn) || btn === "=" ? 'hsl(var(--primary))' : '',
                     color: operations.includes(btn) || btn === "=" ? 'hsl(var(--primary-foreground))' : ''
                  }}
                >
                  {btn}
                </Button>
              ))}
            </div>
            <Button onClick={handleAiSolve} className="w-full mt-4" disabled={isPending}>
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              AI Solve
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="w-full lg:w-96 flex-shrink-0 mt-8 lg:mt-0">
         <h2 className="text-xl font-bold mb-4">AI Explanation</h2>
         {isPending && (
            <Card className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin" />
                <p>AI is solving the problem...</p>
              </div>
            </Card>
          )}
          {!isPending && !aiSolution && (
             <Card className="flex items-center justify-center h-64 text-center p-4">
               <div className="flex flex-col items-center gap-2 text-muted-foreground">
                 <BrainCircuit className="h-8 w-8" />
                 <p>Enter a complex problem and click "AI Solve".<br/>The step-by-step solution will appear here.</p>
               </div>
             </Card>
          )}
          {aiSolution && (
            <Card>
              <CardHeader>
                <CardTitle>Step-by-step Solution</CardTitle>
                <CardDescription>Final Answer: <span className="font-bold text-primary">{aiSolution.solution}</span></CardDescription>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">
                {aiSolution.explanation}
              </CardContent>
            </Card>
          )}
      </div>
    </div>
  );
}
