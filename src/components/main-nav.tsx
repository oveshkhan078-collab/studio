'use client';

import Link from "next/link";
import {
  LayoutGrid,
  Puzzle,
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
  GraduationCap
} from "lucide-react";
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";

const features = [
  {
    title: "Dashboard",
    icon: <LayoutGrid />,
    href: "/",
  },
  {
    title: "3D Game Sandbox",
    icon: <Puzzle />,
    href: "/game-design-sandbox",
  },
  {
    title: "AR/VR Visualizer",
    icon: <View />,
    href: "/ar-vr-visualizer",
  },
  {
    title: "Tech Hub",
    icon: <Rss />,
    href: "/tech-hub",
  },
  {
    title: "AI Resume Assistant",
    icon: <FileText />,
    href: "/resume-assistant",
  },
  {
    title: "Study Companion",
    icon: <Timer />,
    href: "/study-companion",
  },
  {
    title: "Notes Marketplace",
    icon: <Store />,
    href: "/notes-marketplace",
  },
  {
    title: "AI Doubt Solver",
    icon: <BrainCircuit />,
    href: "/doubt-solver",
  },
  {
    title: "Internship Finder",
    icon: <Briefcase />,
    href: "/internships",
  },
  {
    title: "Campus Connect",
    icon: <Building2 />,
    href: "/campus-connect",
  },
  {
    title: "Calculator",
    icon: <Calculator />,
    href: "/calculator",
  },
  {
    title: "AI Study Plan",
    icon: <CalendarCheck />,
    href: "/study-plan-generator",
  },
  {
    title: "Coding Challenges",
    icon: <Code />,
    href: "/coding-challenges",
  },
  {
    title: "Virtual Labs",
    icon: <FlaskConical />,
    href: "/virtual-labs",
  },
  {
    title: "Career Counselor",
    icon: <MessageCircle />,
    href: "/career-counseling",
  }
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
            <GraduationCap className="w-8 h-8 text-primary" />
            <span className="text-lg font-semibold">CampusCraft</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {features.map((feature) => (
            <SidebarMenuItem key={feature.href}>
              <Link href={feature.href} legacyBehavior passHref>
                <SidebarMenuButton
                  tooltip={feature.title}
                  isActive={pathname === feature.href}
                >
                  {feature.icon}
                  <span>{feature.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
