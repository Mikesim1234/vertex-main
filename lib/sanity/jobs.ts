import { sanityClient, isSanityConfigured } from "@/lib/sanity/client"
import { jobsQuery } from "@/lib/sanity/queries"
import type { Job } from "@/lib/sanity/types"

export async function getJobs(): Promise<{ jobs: Job[]; configured: boolean }> {
  if (!isSanityConfigured || !sanityClient) {
    return { jobs: [], configured: false }
  }

  try {
    const jobs = await sanityClient.fetch<Job[]>(jobsQuery, {}, { next: { revalidate: 60 } })
    return { jobs, configured: true }
  } catch (error) {
    console.error("Failed to fetch jobs from Sanity", error)
    return { jobs: [], configured: true }
  }
}
