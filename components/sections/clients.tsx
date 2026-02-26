import Image from "next/image"

import { clients } from "@/lib/data/site"

function getInitials(name: string) {
  const parts = name.split(" ").filter(Boolean)
  const initials = parts.slice(0, 2).map((part) => part[0]).join("")
  return initials.toUpperCase()
}

export function Clients() {
  return (
    <section
      id="clients"
      className="bg-[linear-gradient(180deg,_rgba(251,146,60,0.06),_rgba(255,255,255,0.75))] py-20 lg:py-28"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Our Clients</p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-foreground sm:text-4xl">
            Trusted by hospitality leaders and organizations across industries.
          </h2>
          <p className="mt-4 text-base text-foreground/70">
            We partner with hotels, academies, and companies across industries to deliver talent, training, and HR
            transformation.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((client) => (
            <div
              key={client.name}
              className="flex items-center gap-4 rounded-3xl border border-border/60 bg-white/85 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                {client.logo ? (
                  <Image
                    src={client.logo}
                    alt={`${client.name} logo`}
                    width={64}
                    height={64}
                    className="h-12 w-auto max-w-full object-contain p-1"
                  />
                ) : (
                  <span className="text-sm font-semibold">{getInitials(client.name)}</span>
                )}
              </div>
              <div>
                <p className="text-base font-semibold text-foreground">{client.name}</p>
                <p className="text-sm text-foreground/60">{client.industry}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
