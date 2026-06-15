import type React from "react"
import type { Metadata } from "next"
import { Fraunces, Sora } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { JsonLd } from "@/components/seo/json-ld"
import { seoKeywords, siteConfig } from "@/lib/data/site"
import {
  buildLocalBusinessSchema,
  buildOrganizationSchema,
  buildWebsiteSchema,
} from "@/lib/seo/schema"
import "./globals.css"

const sora = Sora({ subsets: ["latin"], variable: "--font-sora" })
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" })
const ogImage = "/vertex-logo-final.png"

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Recruitment Agency Kenya | HR Outsourcing & Training",
    template: "%s | Vertex Edge Consultants",
  },
  description:
    "Vertex Edge Consultants is a Nairobi HR consulting firm offering recruitment, staffing, HR outsourcing, corporate training, and talent acquisition across Kenya.",
  keywords: seoKeywords,
  generator: "v0.app",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: siteConfig.name,
    locale: "en_KE",
    title: "Recruitment Agency Kenya | HR Outsourcing & Training",
    description:
      "Nairobi-based recruitment, staffing, HR outsourcing, HR consulting, and corporate training services for organizations across Kenya.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Recruitment Agency Kenya | HR Outsourcing & Training",
    description:
      "Recruitment, staffing, HR outsourcing, HR consulting, and corporate training services in Kenya.",
    images: [ogImage],
  },
  icons: {
    icon: "/vertex-logo-final.png",
    apple: "/vertex-logo-final.png",
  },
}

<<<<<<< HEAD
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Vertex Edge Consultants",
  url: siteUrl,
  logo: `${siteUrl}${ogImage}`,
  email: "info@vertexedgeconsultants.co.ke",
  telephone: "+254 734 933297",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  description:
    "Recruitment, HR outsourcing, compliance support, and training programs for growth-focused organizations.",
}

=======
>>>>>>> ec98e07 (Updated contact details and footer)
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${fraunces.variable} font-sans antialiased`}>
        <JsonLd data={[buildOrganizationSchema(), buildLocalBusinessSchema(), buildWebsiteSchema()]} />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
