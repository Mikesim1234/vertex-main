import type { MetadataRoute } from "next"

import { serviceLandingPages, siteConfig } from "@/lib/data/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const staticRoutes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/careers", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/locations/nairobi", priority: 0.7, changeFrequency: "monthly" as const },
  ]
  const serviceRoutes = serviceLandingPages.map((page) => ({
    path: `/services/${page.slug}`,
    priority: 0.85 as const,
    changeFrequency: "monthly" as const,
  }))

  return [...staticRoutes, ...serviceRoutes].map((route) => ({
    url: new URL(route.path, siteConfig.url).toString(),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
