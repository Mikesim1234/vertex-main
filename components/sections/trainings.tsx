"use client"

import { useState } from "react"

import { trainingAreas } from "@/lib/data/site"

export function Trainings() {
  const [activeAreaId, setActiveAreaId] = useState(trainingAreas[0]?.id ?? "")
  const activeArea = trainingAreas.find((area) => area.id === activeAreaId) ?? trainingAreas[0]

  return (
    <section
      id="training"
      className="bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.12),_transparent_55%)] py-20 lg:py-28"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Training Areas</p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-foreground sm:text-4xl">
            Six focused learning tracks for every industry.
          </h2>
          <p className="mt-4 text-base text-foreground/70">
            From hospitality excellence to HR analytics, our programs equip teams with practical skills that strengthen
            performance and service delivery.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {trainingAreas.map((area) => (
            <button
              key={area.id}
              type="button"
              onClick={() => setActiveAreaId(area.id)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                activeAreaId === area.id
                  ? "border-primary/40 bg-white text-foreground shadow-sm"
                  : "border-border/60 bg-white/70 text-foreground/70 hover:border-primary/30 hover:text-foreground"
              }`}
              aria-pressed={activeAreaId === area.id}
            >
              {area.title}
            </button>
          ))}
        </div>

        {activeArea && (
          <div className="mx-auto mt-8 max-w-4xl rounded-3xl border border-border/60 bg-white/85 p-6 shadow-sm sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <activeArea.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">{activeArea.title}</h3>
                <p className="mt-1 text-sm text-foreground/70">{activeArea.description}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {activeArea.programs.map((program) => (
                <div key={program.id} className="rounded-2xl border border-border/60 bg-white/90 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <program.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{program.title}</p>
                      <p className="text-xs text-foreground/60">{program.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
