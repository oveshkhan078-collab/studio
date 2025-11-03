"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Pause, RefreshCw } from "lucide-react";
import type { FC } from "react";

const WORK_MINUTES = 25;
const BREAK_MINUTES = 5;

const PomodoroTimer: FC = () => {
  const [minutes, setMinutes] = useState(WORK_MINUTES);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((seconds) => seconds - 1);
        } else if (minutes > 0) {
          setMinutes((minutes) => minutes - 1);
          setSeconds(59);
        } else {
          // Timer finished
          if (isBreak) {
            // Break finished, start new work session
            setMinutes(WORK_MINUTES);
            setSeconds(0);
            setIsBreak(false);
          } else {
            // Work finished, start break
            setMinutes(BREAK_MINUTES);
            setSeconds(0);
            setIsBreak(true);
          }
          setIsActive(false);
          // Simple audio notification
          new Audio('https://www.soundjay.com/buttons/sounds/button-16.mp3').play().catch(e => console.error("Audio playback failed", e));
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds, minutes, isBreak]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setMinutes(WORK_MINUTES);
    setSeconds(0);
  };

  const formatTime = (time: number) => time.toString().padStart(2, "0");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pomodoro Timer</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-6">
        <div
          className={`w-48 h-48 rounded-full flex items-center justify-center border-8 ${
            isBreak ? "border-accent" : "border-primary"
          }`}
        >
          <p className="text-5xl font-bold">
            {formatTime(minutes)}:{formatTime(seconds)}
          </p>
        </div>
        <div className="text-lg font-medium text-muted-foreground">
          {isBreak ? "Break Time" : "Focus Time"}
        </div>
        <div className="flex space-x-4">
          <Button onClick={toggleTimer} size="lg" variant={isActive ? "secondary" : "default"}>
            {isActive ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
            {isActive ? "Pause" : "Start"}
          </Button>
          <Button onClick={resetTimer} size="lg" variant="outline">
            <RefreshCw className="mr-2 h-5 w-5" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PomodoroTimer;
