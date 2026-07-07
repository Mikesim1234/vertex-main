import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle2, MapPin } from "lucide-react"

import { Header } from "@/components/layout/header"
import { ScrollProgress } from "@/components/layout/scroll-progress"
import { Footer } from "@/components/layout/footer"
import { JsonLd } from "@/components/seo/json-ld"
import { Button } from "@/components/ui/button"
import { homepageFaqs, serviceLandingPages, trustSignals } from "@/lib/data/site"
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo/schema"

export const metadata: Metadata = {
  title: "HR Consultants Nairobi | Recruitment & Staffing Kenya",
  description:
    "Nairobi HR consultants for recruitment, staffing, HR outsourcing, corporate training, and talent acquisition support across Kenya.",
  alternates: {
    canonical: "/locations/nairobi",
  },
  openGraph: {
    title: "HR Consultants Nairobi | Recruitment & Staffing Kenya",
    description:
      "Vertex Edge Consultants supports Nairobi employers with recruitment, staffing, HR outsourcing, corporate training, and HR consulting.",
    url: "/locations/nairobi",
  },
  twitter: {
    title: "HR Consultants Nairobi | Recruitment & Staffing Kenya",
    description:
      "Nairobi HR consultants for recruitment, staffing, HR outsourcing, corporate training, and talent acquisition support.",
  },
}

export default function NairobiPage() {
  return (
    <main className="min-h-screen bg-background bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.12),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(251,146,60,0.08),_transparent_60%)] text-foreground">
      <JsonLd
        data={[
          buildFaqSchema(homepageFaqs, "/locations/nairobi"),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Locations", path: "/locations/nairobi" },
            { name: "Nairobi", path: "/locations/nairobi" },
          ]),
        ]}
      />
      <ScrollProgress />
      <Header />

      <section className="pt-28 lg:pt-36">
        <div className="container mx-auto px-4 pb-16 lg:px-8">
          <div className="max-w-4xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary shadow-sm">
              <MapPin className="h-4 w-4" />
              Nairobi, Kenya
            </p>
            <h1 className="mt-6 text-balance font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              HR consultants in Nairobi for recruitment, staffing, outsourcing, and training.
            </h1>
            <p className="mt-5 max-w-3xl text-pretty text-base leading-8 text-foreground/70 sm:text-lg">
              Vertex Edge Consultants supports Nairobi employers with practical HR consulting, talent acquisition,
              staffing solutions, HR outsourcing, and corporate training designed for Kenyan workplaces.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="rounded-full px-7">
                <Link href="/#contact">Talk to a Nairobi HR Consultant</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-7">
                <Link href="/#services">View Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="android-safe-section-bg bg-white/[0.92] py-16 lg:py-24">
        <div className="container mx-auto grid gap-8 px-4 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {serviceLandingPages.map((page) => (
            <Link
              key={page.slug}
              href={`/services/${page.slug}`}
              className="android-safe-card rounded-3xl border border-border/60 bg-white/90 p-5 shadow-sm lg:transition lg:hover:-translate-y-1 lg:hover:shadow-lg"
            >
              <h2 className="text-base font-semibold text-foreground">{page.shortTitle}</h2>
              <p className="mt-3 text-sm leading-6 text-foreground/70">{page.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Local SEO Focus</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-foreground">
              Built around the needs of Nairobi employers.
            </h2>
            <p className="mt-4 text-base leading-8 text-foreground/70">
              Nairobi organizations compete for talent, reliable workforce support, compliant HR operations, and
              practical training that improves daily performance. Our local HR consulting support is designed around
              those needs.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {trustSignals.map((signal) => (
              <div key={signal} className="android-safe-card rounded-3xl border border-border/60 bg-white/85 p-5 shadow-sm">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <p className="mt-3 text-sm leading-6 text-foreground/70">{signal}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
