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
    default: "HR Recruitment Agency in Nairobi, Kenya | Vertex Edge Consultants",
    template: "%s | Vertex Edge Consultants",
  },
  description:
    "Award-winning HR recruitment agency in Nairobi, Kenya. We provide recruitment, staffing, HR outsourcing, corporate training, talent acquisition, and HR consulting services across Kenya. Expert HR solutions for growing businesses.",
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
    title: "HR Recruitment Agency in Nairobi, Kenya | Vertex Edge Consultants",
    description:
      "Award-winning HR recruitment agency in Nairobi, Kenya. Professional recruitment, staffing, HR outsourcing, corporate training, and talent acquisition services across Kenya.",
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
    title: "HR Recruitment Agency Nairobi | Staffing & Training Services",
    description:
      "Professional HR recruitment agency in Nairobi, Kenya. Recruitment, staffing, HR outsourcing, corporate training, and talent acquisition for growing businesses.",
    images: [ogImage],
  },
  icons: {
    icon: "/vertex-logo-final.png",
    apple: "/vertex-logo-final.png",
  },
}

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
