"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const hindiNumerals = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
const operations = ["/", "*", "-", "+"];
const buttons = [
  "C", "±", "%", "/",
  "७", "८", "९", "*",
  "४", "५", "६", "-",
  "१", "२", "३", "+",
  "०", ".", "=",
];
const numeralsMap: { [key: string]: string } = {
  "०": "0", "१": "1", "२": "2", "३": "3", "४": "4",
  "५": "5", "६": "6", "७": "7", "८": "8", "९": "9",
};

export default function CalculatorPage() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");

  const handleButtonClick = (btn: string) => {
    if (btn in numeralsMap) {
      if(display === "0") {
        setDisplay(btn);
        setExpression(numeralsMap[btn]);
      } else {
        setDisplay(display + btn);
        setExpression(expression + numeralsMap[btn]);
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
        const result = eval(expression.replace(/--/g, '+'));
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
        <h1 className="text-3xl font-bold mb-6">हिंदी कैलकुलेटर (Hindi Calculator)</h1>
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
                  className={`text-2xl p-6 h-auto ${btn === "०" ? "col-span-2" : ""}`}
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
