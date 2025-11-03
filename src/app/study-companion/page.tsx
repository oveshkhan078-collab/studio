"use client";

import { useState } from 'react';
import PomodoroTimer from '@/components/pomodoro-timer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { X, Plus } from 'lucide-react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function StudyCompanionPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [goals, setGoals] = useState<string[]>(['Master React Hooks', 'Complete DSA course']);
  const [newGoal, setNewGoal] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleAddGoal = () => {
    if (newGoal.trim() !== '') {
      setGoals([...goals, newGoal]);
      setNewGoal('');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Smart Work/Study Companion</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <PomodoroTimer />
        </div>
        <div className="lg:col-span-2 grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Task Tracker</CardTitle>
              <CardDescription>Manage your to-do list for the day.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Input
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Add a new task..."
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                />
                <Button onClick={handleAddTask}><Plus className="w-4 h-4 mr-2" /> Add</Button>
              </div>
              <div className="space-y-2">
                {tasks.map(task => (
                  <div key={task.id} className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
                    <Checkbox
                      id={`task-${task.id}`}
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                    />
                    <label
                      htmlFor={`task-${task.id}`}
                      className={`flex-grow ${task.completed ? 'line-through text-muted-foreground' : ''}`}
                    >
                      {task.text}
                    </label>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => deleteTask(task.id)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                {tasks.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No tasks yet. Add one to get started!</p>}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Goal Setting</CardTitle>
              <CardDescription>Define and track your long-term goals.</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="flex gap-2 mb-4">
                <Input
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  placeholder="Add a new goal..."
                  onKeyPress={(e) => e.key === 'Enter' && handleAddGoal()}
                />
                <Button onClick={handleAddGoal}><Plus className="w-4 h-4 mr-2" /> Set Goal</Button>
              </div>
              <ul className="space-y-2 list-disc list-inside">
                {goals.map((goal, index) => <li key={index} className="text-foreground">{goal}</li>)}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
