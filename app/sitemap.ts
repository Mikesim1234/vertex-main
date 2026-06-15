import type { MetadataRoute } from "next"

import { serviceLandingPages, siteConfig } from "@/lib/data/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const staticRoutes = ["/", "/careers", "/locations/nairobi"]
  const serviceRoutes = serviceLandingPages.map((page) => `/services/${page.slug}`)

  return [...staticRoutes, ...serviceRoutes].map((route) => ({
    url: new URL(route, siteConfig.url).toString(),
    lastModified,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.startsWith("/services") ? 0.9 : 0.6,
  }))
}
