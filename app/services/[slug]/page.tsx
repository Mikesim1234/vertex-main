import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react"

import { Header } from "@/components/layout/header"
import { ScrollProgress } from "@/components/layout/scroll-progress"
import { Footer } from "@/components/layout/footer"
import { JsonLd } from "@/components/seo/json-ld"
import { Button } from "@/components/ui/button"
import { serviceLandingPages, siteConfig } from "@/lib/data/site"
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildServiceSchema,
} from "@/lib/seo/schema"

type ServicePageProps = {
  params: Promise<{
    slug: string
  }>
}

function getServicePage(slug: string) {
  return serviceLandingPages.find((page) => page.slug === slug)
}

export function generateStaticParams() {
  return serviceLandingPages.map((page) => ({
    slug: page.slug,
  }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const page = getServicePage(slug)

  if (!page) {
    return {}
  }

  const path = `/services/${page.slug}`

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: path,
      type: "website",
      images: [
        {
          url: page.image,
          width: 1200,
          height: 630,
          alt: `${page.title} by ${siteConfig.name}`,
        },
      ],
    },
    twitter: {
      title: page.metaTitle,
      description: page.metaDescription,
      images: [page.image],
    },
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const page = getServicePage(slug)

  if (!page) {
    notFound()
  }

  const pagePath = `/services/${page.slug}`
  const relatedPages = serviceLandingPages.filter((servicePage) => servicePage.slug !== page.slug)

  return (
    <main className="min-h-screen bg-background bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.12),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(251,146,60,0.08),_transparent_60%)] text-foreground">
      <JsonLd
        data={[
          buildServiceSchema(page),
          buildFaqSchema(page.faqs, pagePath),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/#services" },
            { name: page.shortTitle, path: pagePath },
          ]),
        ]}
      />
      <ScrollProgress />
      <Header />

      <section className="pt-28 lg:pt-36">
        <div className="container mx-auto grid items-center gap-10 px-4 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-foreground/60">
              <Link href="/" className="transition hover:text-primary">
                Home
              </Link>
              <span>/</span>
              <Link href="/#services" className="transition hover:text-primary">
                Services
              </Link>
              <span>/</span>
              <span className="text-foreground">{page.shortTitle}</span>
            </div>

            <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary shadow-sm">
              <MapPin className="h-4 w-4" />
              Nairobi and Kenya
            </p>

            <h1 className="mt-6 text-balance font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {page.title}
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-8 text-foreground/70 sm:text-lg">
              {page.hero}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="rounded-full px-7">
                <Link href="/#contact">
                  Request a Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-7">
                <Link href="/#services">Compare Services</Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {page.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full border border-border/60 bg-white/70 px-3 py-1 text-xs font-medium text-foreground/70"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/70 shadow-2xl">
              <Image
                src={page.image}
                alt={`${page.title} consulting session`}
                width={720}
                height={640}
                className="h-[380px] w-full object-cover sm:h-[500px]"
                priority
              />
            </div>
            <div className="absolute -bottom-6 left-6 right-6 rounded-2xl border border-border/60 bg-white/95 p-5 shadow-xl">
              <p className="text-sm font-semibold text-foreground">{page.summary}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">How We Help</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-foreground">
              Built for employers that need practical HR outcomes.
            </h2>
            <p className="mt-4 text-base leading-8 text-foreground/70">{page.intro}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {page.benefits.map((benefit) => (
              <article key={benefit} className="rounded-3xl border border-border/60 bg-white/85 p-5 shadow-sm">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <p className="mt-3 text-sm leading-6 text-foreground/70">{benefit}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,_rgba(251,146,60,0.08),_rgba(255,255,255,0.72))] py-16 lg:py-24">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-2 lg:px-8">
          <div className="rounded-3xl border border-border/60 bg-white/90 p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-foreground">What You Get</h2>
            <ul className="mt-5 space-y-3">
              {page.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-6 text-foreground/70">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-border/60 bg-white/90 p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-foreground">Delivery Process</h2>
            <ol className="mt-5 space-y-3">
              {page.process.map((item, index) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-6 text-foreground/70">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">FAQs</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-foreground">
              Common questions about {page.shortTitle.toLowerCase()} in Kenya.
            </h2>
          </div>

          <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
            {page.faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-3xl border border-border/60 bg-white/85 p-5 shadow-sm"
              >
                <h3 className="text-sm font-semibold leading-6 text-foreground">{faq.question}</h3>
                <p className="mt-3 text-sm leading-6 text-foreground/70">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,_rgba(251,146,60,0.08),_rgba(255,255,255,0.72))] py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-border/60 bg-white/90 p-6 shadow-sm sm:p-8 lg:flex-row lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Related Services</p>
              <h2 className="mt-3 font-display text-2xl font-semibold text-foreground">
                Build a complete people operations plan.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {relatedPages.slice(0, 3).map((relatedPage) => (
                <Button key={relatedPage.slug} asChild variant="outline" className="rounded-full">
                  <Link href={`/services/${relatedPage.slug}`}>{relatedPage.shortTitle}</Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
