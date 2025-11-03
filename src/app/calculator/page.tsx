"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const operations = ["/", "*", "-", "+"];
const buttons = [
  "C", "±", "%", "/",
  "7", "8", "9", "*",
  "4", "5", "6", "-",
  "1", "2", "3", "+",
  "0", ".", "=",
];

export default function CalculatorPage() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");

  const handleButtonClick = (btn: string) => {
    if (!isNaN(parseInt(btn))) { // It's a number
      if(display === "0") {
        setDisplay(btn);
        setExpression(btn);
      } else {
        setDisplay(display + btn);
        setExpression(expression + btn);
      }
    } else if (btn === ".") {
      if (!display.includes(".")) {
        setDisplay(display + ".");
        setExpression(expression + ".");
      }
    } else if (btn === "C") {
      setDisplay("0");
      setExpression("");
    } else if (btn === "=") {
      try {
        // Using a safer evaluation method than eval()
        const result = new Function('return ' + expression.replace(/--/g, '+'))();
        setDisplay(String(result));
        setExpression(String(result));
      } catch (error) {
        setDisplay("Error");
        setExpression("");
      }
    } else if (operations.includes(btn)) {
      if(expression !== "" && !operations.some(op => expression.endsWith(op))) {
        setDisplay(display + btn);
        setExpression(expression + btn);
      }
    } else if (btn === "±") {
      if (display !== "0") {
        const newValue = parseFloat(display) * -1;
        setDisplay(String(newValue));
        // This is a simplified expression handling for toggle sign
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
  
  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="flex-grow">
        <h1 className="text-3xl font-bold mb-6">Calculator</h1>
        <Card className="max-w-sm mx-auto shadow-lg">
          <CardHeader>
            <div className="bg-muted p-4 rounded-lg text-right text-4xl font-mono break-all">
              {display}
            </div>
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
          </CardContent>
        </Card>
      </div>

      <div className="w-full lg:w-64 flex-shrink-0">
         <h2 className="text-xl font-bold mb-4">Advertisement</h2>
         <Card className="h-96 flex items-center justify-center bg-muted">
             <CardContent>
                 <p className="text-muted-foreground">Ad Space</p>
             </CardContent>
         </Card>
      </div>
    </div>
  );
}
