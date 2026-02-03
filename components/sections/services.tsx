"use client"

import { useState } from "react"
import { ArrowUpRight, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { services } from "@/lib/data/site"
import { cn } from "@/lib/utils"

export function Services() {
  const [activeId, setActiveId] = useState(services[0].id)
  const activeService = services.find((service) => service.id === activeId) ?? services[0]

  return (
    <section
      id="services"
      className="bg-[linear-gradient(180deg,_rgba(251,146,60,0.08),_rgba(255,255,255,0.7))] py-20 lg:py-28"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Core Services</p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-foreground sm:text-4xl">
            End-to-end HR support for growth-driven teams.
          </h2>
          <p className="mt-4 text-base text-foreground/70">
            From talent acquisition to compliance, we deliver scalable HR solutions built for modern organizations
            across industries.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="flex flex-col gap-3">
            {services.map((service) => (
              <button
                key={service.id}
                type="button"
                onClick={() => setActiveId(service.id)}
                className={cn(
                  "rounded-2xl border px-5 py-4 text-left transition",
                  activeId === service.id
                    ? "border-primary/40 bg-white/90 shadow-sm"
                    : "border-border/60 bg-white/70 hover:border-primary/30"
                )}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      "mt-1 flex h-10 w-10 items-center justify-center rounded-xl",
                      activeId === service.id ? "bg-primary text-white" : "bg-primary/10 text-primary"
                    )}
                  >
                    <service.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">{service.title}</h3>
                    <p className="mt-1 text-sm text-foreground/70">{service.summary}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="rounded-3xl border border-border/60 bg-white/90 p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
                <activeService.icon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-2xl font-semibold text-foreground">{activeService.title}</h3>
              <p className="text-sm text-foreground/60">Tailored delivery for growth-focused teams</p>
              </div>
            </div>

            <p className="mt-5 text-base text-foreground/70">{activeService.description}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm font-semibold text-foreground">Key Focus Areas</p>
                <ul className="mt-3 space-y-2 text-sm text-foreground/70">
                  {activeService.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Outcomes You Can Expect</p>
                <ul className="mt-3 space-y-2 text-sm text-foreground/70">
                  {activeService.outcomes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="rounded-full px-6">
                <a href="#contact">Request a Consultation</a>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-6">
                <a href="#training">Explore Training Areas</a>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 text-sm text-foreground/70">
          <span>Need a tailored HR roadmap?</span>
          <a href="#contact" className="inline-flex items-center gap-2 font-medium text-primary">
            Let's build it together <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
