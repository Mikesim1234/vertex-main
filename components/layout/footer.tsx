import Image from "next/image"
import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"

import { navLinks, services, siteConfig, trainingAreas } from "@/lib/data/site"

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="container mx-auto px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/vertex-logo-final.png"
                alt={`${siteConfig.name} logo`}
                width={120}
                height={80}
                className="h-12 w-auto"
              />
              <span className="text-lg font-semibold text-foreground">{siteConfig.name}</span>
            </div>
            <p className="mt-4 text-sm text-foreground/70">
              Recruitment, training, and HR solutions that keep organizations operating at their best.
            </p>
            <div className="mt-6 space-y-3 text-sm text-foreground/70">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>{siteConfig.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>{siteConfig.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{siteConfig.location}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">Navigation</h3>
            <ul className="mt-4 space-y-2 text-sm text-foreground/70">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">Services</h3>
            <ul className="mt-4 space-y-2 text-sm text-foreground/70">
              {services.slice(0, 4).map((service) => (
                <li key={service.id}>{service.title}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">Training</h3>
            <ul className="mt-4 space-y-2 text-sm text-foreground/70">
              {trainingAreas.slice(0, 4).map((area) => (
                <li key={area.id}>{area.title}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 text-xs text-foreground/60 md:flex-row">
          <span>(c) {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</span>
          <span>Crafted for growth-driven teams.</span>
        </div>
      </div>
    </footer>
  )
}
