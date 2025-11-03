'use client';

import Link from "next/link";
import {
  LayoutGrid,
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
  Youtube,
  GraduationCap,
  BookCopy
} from "lucide-react";
import { usePathname } from 'next/navigation';
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
    title: "AI Calculator",
    icon: <Calculator />,
    href: "/calculator",
  },
  {
    title: "AI Doubt Solver",
    icon: <BrainCircuit />,
    href: "/doubt-solver",
  },
  {
    title: "AI Note Taker",
    icon: <BookCopy />,
    href: "/ai-note-taker",
  },
  {
    title: "AI Resume Assistant",
    icon: <FileText />,
    href: "/resume-assistant",
  },
  {
    title: "AI Study Plan",
    icon: <CalendarCheck />,
    href: "/study-plan-generator",
  },
  {
    title: "AR/VR Visualizer",
    icon: <View />,
    href: "/ar-vr-visualizer",
  },
  {
    title: "Campus Connect",
    icon: <Building2 />,
    href: "/campus-connect",
  },
  {
    title: "Career Counselor",
    icon: <MessageCircle />,
    href: "/career-counseling",
  },
  {
    title: "Coding Challenges",
    icon: <Code />,
    href: "/coding-challenges",
  },
  {
    title: "Internship Finder",
    icon: <Briefcase />,
    href: "/internships",
  },
  {
    title: "Notes Marketplace",
    icon: <Store />,
    href: "/notes-marketplace",
  },
  {
    title: "Study Companion",
    icon: <Timer />,
    href: "/study-companion",
  },
  {
    title: "Tech Hub",
    icon: <Rss />,
    href: "/tech-hub",
  },
  {
    title: "Video Suggester",
    icon: <Youtube />,
    href: "/youtube-video-suggester",
  },
  {
    title: "Virtual Labs",
    icon: <FlaskConical />,
    href: "/virtual-labs",
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
      <SidebarContent className="p-2">
        <SidebarMenu>
          {features.sort((a, b) => a.href === '/' ? -1 : b.href === '/' ? 1 : a.title.localeCompare(b.title)).map((feature) => (
            <SidebarMenuItem key={feature.href} className="py-1">
              <Link href={feature.href}>
                <SidebarMenuButton
                  tooltip={feature.title}
                  isActive={pathname === feature.href}
                >
                  <div>
                    {feature.icon}
                    <span>{feature.title}</span>
                  </div>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
