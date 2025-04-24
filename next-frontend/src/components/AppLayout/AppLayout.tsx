"use client"

import type { ReactNode } from "react"
import Navbar from "../Navbar"
import { ResourcesProvider } from "@/context/ResourcesContext"

interface AppLayoutProps {
  children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <ResourcesProvider>
      <Navbar />
      {children}
    </ResourcesProvider>
  )
}
