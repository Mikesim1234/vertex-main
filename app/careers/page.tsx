import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { ScrollProgress } from "@/components/layout/scroll-progress"
import { Footer } from "@/components/layout/footer"
import { Jobs } from "@/components/sections/jobs"

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Explore current job openings curated by Vertex Edge Consultants across recruitment, hospitality, and growth-focused organizations.",
  alternates: {
    canonical: "/careers",
  },
  openGraph: {
    title: "Careers | Vertex Edge Consultants",
    description:
      "Browse current Vertex Edge Consultants job openings and apply to roles across recruitment, hospitality, and other industries.",
    url: "/careers",
  },
  twitter: {
    title: "Careers | Vertex Edge Consultants",
    description:
      "Browse current Vertex Edge Consultants job openings and apply to roles across recruitment, hospitality, and other industries.",
  },
}

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-background bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.12),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(251,146,60,0.08),_transparent_60%)] text-foreground">
      <ScrollProgress />
      <Header />
      <div className="pt-28 lg:pt-32">
        <Jobs />
      </div>
      <Footer />
    </main>
  )
}
