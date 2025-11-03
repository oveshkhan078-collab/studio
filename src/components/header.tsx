"use client"

import { GraduationCap } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="flex items-center gap-2">
        <GraduationCap className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-semibold">CampusCraft</h1>
      </div>
    </header>
  )
}
