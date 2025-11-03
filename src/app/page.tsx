'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import {
  View,
  Rss,
  FileText,
  Timer,
  Store,
  BrainCircuit,
  Briefcase,
  Building2,
  Calculator,
  CalendarCheck,
  Code,
  FlaskConical,
  MessageCircle,
  ArrowRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    title: "AR/VR Engineering Visualizer",
    description: "Visualize complex machines and circuits.",
    icon: <View className="w-8 h-8 text-primary" />,
    href: "/ar-vr-visualizer",
    tag: "Visualization"
  },
  {
    title: "Tech News & Hackathons",
    description: "Stay updated with tech news and events.",
    icon: <Rss className="w-8 h-8 text-primary" />,
    href: "/tech-hub",
    tag: "Community"
  },
  {
    title: "AI Resume Assistant",
    description: "Get personalized resume feedback.",
    icon: <FileText className="w-8 h-8 text-primary" />,
    href: "/resume-assistant",
    tag: "GenAI"
  },
  {
    title: "Smart Study Companion",
    description: "Pomodoro timer, tasks, and goals.",
    icon: <Timer className="w-8 h-8 text-primary" />,
    href: "/study-companion",
    tag: "Productivity"
  },
  {
    title: "Notes Marketplace",
    description: "Buy and sell peer-reviewed notes.",
    icon: <Store className="w-8 h-8 text-primary" />,
    href: "/notes-marketplace",
    tag: "Marketplace"
  },
  {
    title: "AI-Powered Doubt Solver",
    description: "Instant explanations for your questions.",
    icon: <BrainCircuit className="w-8 h-8 text-primary" />,
    href: "/doubt-solver",
    tag: "GenAI"
  },
  {
    title: "Internship Finder",
    description: "Connect with internship opportunities.",
    icon: <Briefcase className="w-8 h-8 text-primary" />,
    href: "/internships",
    tag: "Careers"
  },
  {
    title: "DY Patil Campus Connect",
    description: "Schedules, forums, and announcements.",
    icon: <Building2 className="w-8 h-8 text-primary" />,
    href: "/campus-connect",
    tag: "Campus"
  },
  {
    title: "AI Calculator",
    description: "A calculator with standard and AI functions.",
    icon: <Calculator className="w-8 h-8 text-primary" />,
    href: "/calculator",
    tag: "GenAI"
  },
  {
    title: "AI Study Plan Generator",
    description: "Personalized plans based on your courses.",
    icon: <CalendarCheck className="w-8 h-8 text-primary" />,
    href: "/study-plan-generator",
    tag: "GenAI"
  },
  {
    title: "Coding Challenge Platform",
    description: "Enhance your coding skills with challenges.",
    icon: <Code className="w-8 h-8 text-primary" />,
    href: "/coding-challenges",
    tag: "Skills"
  },
  {
    title: "Virtual Labs",
    description: "Simulations of laboratory experiments.",
    icon: <FlaskConical className="w-8 h-8 text-primary" />,
    href: "/virtual-labs",
    tag: "Practical"
  },
  {
    title: "Career Counseling Chatbot",
    description: "Get career advice based on your studies.",
    icon: <MessageCircle className="w-8 h-8 text-primary" />,
    href: "/career-counseling",
    tag: "GenAI"
  }
];

export default function Home() {
  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Welcome to CampusCraft</h1>
        <p className="text-muted-foreground mt-2">Your all-in-one B.Tech study and career companion. Explore the tools below.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {features.map((feature) => (
          <Link href={feature.href} key={feature.title} className="group">
            <Card className="h-full flex flex-col hover:border-primary transition-colors duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-start">
                  {feature.icon}
                  <Badge variant={feature.tag === "GenAI" ? "default" : "secondary"}>{feature.tag}</Badge>
                </div>
                <CardTitle className="mt-4">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <CardDescription>{feature.description}</CardDescription>
                <div className="mt-4 flex items-center text-sm font-semibold text-primary group-hover:underline">
                  Explore <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
