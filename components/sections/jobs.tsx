import Link from "next/link"
import { Briefcase, Clock, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getJobs } from "@/lib/sanity/jobs"

export async function Jobs() {
  const { jobs, configured } = await getJobs()

  return (
    <section
      id="careers"
      className="bg-[linear-gradient(180deg,_rgba(251,146,60,0.08),_rgba(255,255,255,0.75))] py-20 lg:py-28"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Careers / Jobs</p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-foreground sm:text-4xl">
            Join teams shaping exceptional experiences.
          </h2>
          <p className="mt-4 text-base text-foreground/70">
            Browse current openings curated by Vertex Global and apply to roles across industries that match your
            talent.
          </p>
        </div>

        {!configured && (
          <div className="mx-auto max-w-2xl rounded-3xl border border-dashed border-border/80 bg-muted/40 px-6 py-10 text-center">
            <p className="text-sm text-foreground/70">
              Sanity CMS is not configured yet. Connect your project ID and dataset to start publishing job listings.
            </p>
            <Button asChild variant="outline" className="mt-4 rounded-full">
              <Link href="/#contact">Contact us to set this up</Link>
            </Button>
          </div>
        )}

        {configured && jobs.length === 0 && (
          <div className="mx-auto max-w-2xl rounded-3xl border border-border/60 bg-white/85 px-6 py-10 text-center">
            <p className="text-sm text-foreground/70">No open roles right now. Please check back soon.</p>
          </div>
        )}

        {jobs.length > 0 && (
          <div className="grid gap-6 lg:grid-cols-2">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="rounded-3xl border border-border/60 bg-white/85 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
                    {job.summary && <p className="mt-2 text-sm text-foreground/70">{job.summary}</p>}
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    Open
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-4 text-sm text-foreground/60">
                  {job.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{job.location}</span>
                    </div>
                  )}
                  {job.type && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{job.type}</span>
                    </div>
                  )}
                  {job.department && (
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-primary" />
                      <span>{job.department}</span>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {job.applyUrl ? (
                    <Button asChild className="rounded-full">
                      <a href={job.applyUrl} target="_blank" rel="noreferrer">
                        Apply Now
                      </a>
                    </Button>
                  ) : (
                    <Button asChild className="rounded-full">
                      <Link href="/#contact">Apply via Vertex</Link>
                    </Button>
                  )}
                  <Button asChild variant="outline" className="rounded-full">
                    <Link href="/#contact">Refer a candidate</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
