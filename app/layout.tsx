import type React from "react"
import type { Metadata } from "next"
import { Fraunces, Sora } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const sora = Sora({ subsets: ["latin"], variable: "--font-sora" })
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" })
const siteUrl = "https://vertexglobal.co.ke"
const ogImage = "/vertex-logo-final.png"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Vertex Edge Consultants | HR Solutions, Recruitment & Training",
    template: "%s | Vertex Edge Consultants",
  },
  description:
    "Vertex Edge Consultants delivers recruitment, HR outsourcing, compliance support, and training programs for growth-focused organizations.",
  generator: "v0.app",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Vertex Edge Consultants",
    title: "Vertex Edge Consultants | HR Solutions, Recruitment & Training",
    description:
      "Recruitment, HR outsourcing, compliance support, and practical training programs for growth-focused organizations.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Vertex Edge Consultants",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vertex Edge Consultants | HR Solutions, Recruitment & Training",
    description:
      "Recruitment, HR outsourcing, compliance support, and practical training programs for growth-focused organizations.",
    images: [ogImage],
  },
  icons: {
    icon: "/vertex-logo-final.png",
    apple: "/vertex-logo-final.png",
  },
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Vertex Edge Consultants",
  url: siteUrl,
  logo: `${siteUrl}${ogImage}`,
  email: "vertexrecruimentglobal@gmail.com",
  telephone: "+254 790 669 385",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  description:
    "Recruitment, HR outsourcing, compliance support, and training programs for growth-focused organizations.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${fraunces.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
