import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { ScrollProgress } from "@/components/layout/scroll-progress"
import { Footer } from "@/components/layout/footer"
import { About } from "@/components/sections/about"
import { Clients } from "@/components/sections/clients"
import { Contact } from "@/components/sections/contact"
import { Faqs } from "@/components/sections/faqs"
import { Hero } from "@/components/sections/hero"
import { Services } from "@/components/sections/services"
import { Trainings } from "@/components/sections/trainings"
import { JsonLd } from "@/components/seo/json-ld"
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildServiceCatalogSchema,
} from "@/lib/seo/schema"

export const metadata: Metadata = {
  title: "Recruitment Agency Kenya | Staffing, HR Outsourcing & Training",
  description:
    "Vertex Edge Consultants provides recruitment, staffing, HR outsourcing, HR consulting, and corporate training services for employers in Nairobi and across Kenya.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Recruitment Agency Kenya | Staffing, HR Outsourcing & Training",
    description:
      "Nairobi HR consultants for recruitment, staffing, HR outsourcing, corporate training, and talent acquisition across Kenya.",
    url: "/",
  },
  twitter: {
    title: "Recruitment Agency Kenya | Staffing, HR Outsourcing & Training",
    description:
      "Nairobi HR consultants for recruitment, staffing, HR outsourcing, corporate training, and talent acquisition across Kenya.",
  },
}

export default function Page() {
  return (
    <main className="min-h-screen bg-background bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.12),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(251,146,60,0.08),_transparent_60%)] text-foreground">
      <JsonLd
        data={[
          buildServiceCatalogSchema(),
          buildFaqSchema(),
          buildBreadcrumbSchema([{ name: "Home", path: "/" }]),
        ]}
      />
      <ScrollProgress />
      <Header />
      <Hero />
      <Services />
      <Trainings />
      <Clients />
      <About />
      <Faqs />
      <Contact />
      <Footer />
    </main>
  )
}
