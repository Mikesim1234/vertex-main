import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { companyStats } from "@/lib/data/site"

const highlightPoints = [
  "Industry-ready talent strategies",
  "Compliance-ready HR operations",
  "Training programs that lift team performance",
]

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 lg:pt-36">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.18),_transparent_55%)]" />
      <div className="absolute inset-y-0 right-0 -z-10 w-1/2 bg-[linear-gradient(120deg,_rgba(251,146,60,0.16),_transparent_60%)]" />

      <div className="container mx-auto grid items-center gap-10 px-4 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/70 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-foreground/70 shadow-sm">
            People & HR Excellence
          </div>
          <h1 className="mt-6 text-balance font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            <span className="sm:hidden">HR that scales teams.</span>
            <span className="hidden sm:inline">Build a workforce people remember.</span>
            <span className="block text-primary">People strategy that performs.</span>
          </h1>
          <p className="mt-5 text-pretty text-base text-foreground/70 sm:text-lg">
            <span className="sm:hidden">
              Recruitment, HR operations, and training that help teams scale with confidence.
            </span>
            <span className="hidden sm:inline">
              Vertex Edge Consultants delivers recruitment, HR operations, and training programs that help organizations
              across industries scale with confidence.
            </span>
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="rounded-full px-7">
              <Link href="#contact">
                Book a Consultation
                <ArrowUpRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-7">
              <Link href="#services">Explore Services</Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-3 text-sm text-foreground/70">
            {highlightPoints.map((point) => (
              <div key={point} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>{point}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-foreground/70">
            {companyStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-border/60 bg-white/70 px-4 py-3 shadow-sm">
                <div className="text-lg font-semibold text-foreground">
                  {stat.value}
                  {stat.suffix}
                </div>
                <div className="text-xs uppercase tracking-wider text-foreground/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-6 top-6 hidden h-24 w-24 rounded-3xl bg-primary/20 blur-2xl lg:block" />
          <div className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/60 shadow-2xl">
            <Image
              src="/corporate-office-business-team-collaboration-moder.jpg"
              alt="HR team collaboration"
              width={620}
              height={720}
              className="h-[420px] w-full object-cover sm:h-[520px]"
              priority
            />
          </div>
          <div className="absolute -bottom-6 left-6 right-6 rounded-2xl border border-border/60 bg-white/95 p-5 shadow-xl">
            <p className="text-sm font-semibold text-foreground">Operational clarity meets team performance.</p>
            <p className="mt-1 text-sm text-foreground/70">
              We align HR strategy, compliance, and training so your teams deliver consistently exceptional results.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
