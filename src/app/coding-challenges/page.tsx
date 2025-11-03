import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, ArrowRight } from "lucide-react";

const challenges = [
  {
    title: "Two Sum",
    description: "Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
    difficulty: "Easy",
    tags: ["Array", "Hash Table"]
  },
  {
    title: "Palindrome Checker",
    description: "Write a function to check if a given string is a palindrome (reads the same forwards and backward).",
    difficulty: "Easy",
    tags: ["String", "Two Pointers"]
  },
  {
    title: "Longest Substring Without Repeating Characters",
    description: "Find the length of the longest substring without repeating characters.",
    difficulty: "Medium",
    tags: ["String", "Sliding Window"]
  },
  {
    title: "Binary Tree Level Order Traversal",
    description: "Given the root of a binary tree, return the level order traversal of its nodes' values.",
    difficulty: "Medium",
    tags: ["Tree", "BFS"]
  },
  {
    title: "Median of Two Sorted Arrays",
    description: "Given two sorted arrays, find the median of the two sorted arrays. The overall run time complexity should be O(log(m+n)).",
    difficulty: "Hard",
    tags: ["Array", "Binary Search", "Divide and Conquer"]
  },
];

export default function CodingChallengesPage() {
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Easy': return 'bg-green-500 hover:bg-green-600';
      case 'Medium': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'Hard': return 'bg-red-500 hover:bg-red-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Coding Challenge Platform</h1>
        <p className="text-muted-foreground">Sharpen your skills with our collection of coding challenges.</p>
      </div>
      <div className="space-y-4">
        {challenges.map((challenge, index) => (
          <Card key={index} className="transition-all hover:shadow-md">
            <CardHeader>
              <div className="flex justify-between items-start">
                  <CardTitle>{challenge.title}</CardTitle>
                  <Badge className={`${getDifficultyColor(challenge.difficulty)} text-white`}>{challenge.difficulty}</Badge>
              </div>
              <CardDescription>{challenge.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  {challenge.tags.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
                <Button>
                  Start Challenge <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
