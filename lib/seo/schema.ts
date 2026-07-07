import {
  type Faq,
  type ServiceLandingPage,
  homepageFaqs,
  seoKeywords,
  serviceLandingPages,
  siteConfig,
} from "@/lib/data/site"

type JsonLdObject = Record<string, unknown>

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString()
}

export function buildOrganizationSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/vertex-logo-final.png"),
    email: siteConfig.email,
    telephone: siteConfig.phone,
    description: "Award-winning HR recruitment agency in Nairobi, Kenya providing recruitment, staffing, HR outsourcing, corporate training, talent acquisition, and HR consulting services.",
    foundingDate: "2022",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: siteConfig.phone,
        email: siteConfig.email,
        areaServed: "KE",
        availableLanguage: ["English", "Swahili"],
      },
      {
        "@type": "ContactPoint",
        contactType: "hr department",
        telephone: siteConfig.phone,
        email: siteConfig.email,
      },
    ],\n    knowsAbout: seoKeywords,\n    sameAs: [\n      \"https://www.linkedin.com/company/vertex-edge-consultants\",\n    ],\n  }\n}

export function buildLocalBusinessSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${siteConfig.url}/#localbusiness`,
    name: siteConfig.name,
    image: absoluteUrl("/vertex-logo-final.png"),
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "95",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressCountry: "KE",
      addressRegion: "Nairobi County",
    },
    areaServed: [
      {
        "@type": "Country",
        name: "Kenya",
      },
      {
        "@type": "City",
        name: "Nairobi",
      },
      {
        "@type": "City",
        name: "Mombasa",
      },
      {
        "@type": "City",
        name: "Kisumu",
      },
      {
        "@type": "City",
        name: "Nakuru",
      },
    ],
    sameAs: [
      `${siteConfig.url}/#organization`,
    ],
    serviceArea: {
      "@type": "Country",
      name: "Kenya",
    },
    parentOrganization: {
      "@id": `${siteConfig.url}/#organization`,
    },
  }
}

export function buildWebsiteSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: "Award-winning HR recruitment agency in Nairobi, Kenya providing recruitment, staffing, HR outsourcing, corporate training, talent acquisition, and HR consulting services across Kenya.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    inLanguage: "en-KE",
  }
}

export function buildServiceSchema(page: ServiceLandingPage): JsonLdObject {
  const pageUrl = absoluteUrl(`/services/${page.slug}`)

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: page.title,
    serviceType: page.shortTitle,
    description: page.summary,
    url: pageUrl,
    provider: {
      "@id": `${siteConfig.url}/#organization`,
    },
    areaServed: {
      "@type": "Country",
      name: "Kenya",
    },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Employers and growth-focused organizations in Kenya",
    },
    keywords: page.keywords,
  }
}

export function buildServiceCatalogSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteConfig.url}/#services`,
    name: "HR services in Kenya",
    itemListElement: serviceLandingPages.map((page, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: buildServiceSchema(page),
    })),
  }
}

export function buildFaqSchema(faqs: Faq[] = homepageFaqs, pagePath = "/"): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${absoluteUrl(pagePath)}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

export function buildBreadcrumbSchema(
  items: Array<{ name: string; path: string }>
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
