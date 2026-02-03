import type React from "react"
import type { Metadata } from "next"
import { Fraunces, Sora } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const sora = Sora({ subsets: ["latin"], variable: "--font-sora" })
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" })

export const metadata: Metadata = {
  title: "Vertex Global Ltd - HR Solutions & Training",
  description:
    "Recruitment, HR outsourcing, and training programs that elevate growth-focused organizations.",
  generator: "v0.app",
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
        {children}
        <Analytics />
      </body>
    </html>
  )
}
