import Image from "next/image"
import { CheckCircle2 } from "lucide-react"

import { AnimatedCounter } from "@/components/animated-counter"
import { companyStats, companyValues } from "@/lib/data/site"

export function About() {
  return (
    <section id="about" className="py-20 lg:py-28">
      <div className="container mx-auto grid items-center gap-12 px-4 lg:grid-cols-[1fr_1.05fr] lg:px-8">
        <div className="relative">
          <div className="absolute -left-6 top-10 hidden h-24 w-24 rounded-3xl bg-primary/20 blur-2xl lg:block" />
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-white/90 shadow-xl">
            <Image
              src="/professional-business-team-collaboration-in-modern.jpg"
              alt="Vertex Edge Consultants team consulting"
              width={640}
              height={720}
              className="h-[420px] w-full object-cover sm:h-[520px]"
            />
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4 rounded-2xl border border-border/60 bg-white/90 p-5 shadow-sm">
            {companyStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-semibold text-foreground">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2000} />
                </div>
                <p className="mt-1 text-xs uppercase tracking-wider text-foreground/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">About Vertex Edge Consultants</p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-foreground sm:text-4xl">
            Your strategic partner for people-first growth.
          </h2>
          <p className="mt-4 text-base text-foreground/70">
            We help organizations across industries align talent, operations, and culture to deliver exceptional
            experiences and sustainable growth.
          </p>
          <p className="mt-4 text-base text-foreground/70">
            Our consultants combine HR expertise with hands-on industry insight, providing clear roadmaps, measurable
            outcomes, and high-touch delivery.
          </p>

          <div className="mt-6 space-y-3">
            {companyValues.map((value) => (
              <div key={value} className="flex items-start gap-3 text-sm text-foreground/70">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
