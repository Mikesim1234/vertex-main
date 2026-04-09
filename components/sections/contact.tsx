"use client"

import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { siteConfig } from "@/lib/data/site"

const contactSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional(),
  company: z.string().optional(),
  serviceInterest: z.string().optional(),
  message: z.string().min(10, "Please share a few more details about your needs."),
  website: z.string().optional(),
})

type ContactFormValues = z.infer<typeof contactSchema>

type FormStatus = "idle" | "loading" | "success" | "error"

const serviceOptions = [
  "Recruitment & Talent Acquisition",
  "HR Outsourcing & Managed Services",
  "Training Programs",
  "Compliance & Labour Advisory",
  "HR Systems & Digital Transformation",
  "Other",
]

export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle")
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      serviceInterest: "",
      message: "",
      website: "",
    },
  })

  const onSubmit = async (data: ContactFormValues) => {
    setStatusMessage(null)

    try {
      setStatus("loading")

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const payload = (await response.json()) as { message?: string }

      if (!response.ok) {
        throw new Error(payload.message || "Something went wrong. Please try again or email us directly.")
      }

      setStatus("success")
      setStatusMessage(payload.message || "Thanks for reaching out! We'll respond within one business day.")
      form.reset()
    } catch (error) {
      setStatus("error")
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again or email us directly."
      )
    }
  }

  return (
    <section
      id="contact"
      className="bg-[linear-gradient(180deg,_rgba(251,146,60,0.08),_rgba(255,255,255,0.7))] py-20 lg:py-28"
    >
      <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Contact</p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-foreground sm:text-4xl">
            Let's design your next HR move.
          </h2>
          <p className="mt-4 text-base text-foreground/70">
            Tell us about your goals and we'll tailor a recruitment, training, or HR operations plan that fits your
            team across any industry.
          </p>

          <div className="mt-8 space-y-4 text-sm text-foreground/70">
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-primary" />
              <span>{siteConfig.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-primary" />
              <span>{siteConfig.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{siteConfig.location}</span>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-border/60 bg-white/90 p-6 shadow-sm">
            <p className="text-sm font-semibold text-foreground">What happens next?</p>
            <ul className="mt-3 space-y-2 text-sm text-foreground/70">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                <span>We review your request within 24 hours.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                <span>We align on scope, timelines, and success metrics.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                <span>You receive a tailored HR roadmap and proposal.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="rounded-3xl border border-border/60 bg-white/90 p-6 shadow-sm sm:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="jane@company.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="+254" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Company name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="serviceInterest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Interest</FormLabel>
                    <FormControl>
                      <Input list="service-options" placeholder="Select or type a service" {...field} />
                    </FormControl>
                    <datalist id="service-options">
                      {serviceOptions.map((option) => (
                        <option key={option} value={option} />
                      ))}
                    </datalist>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem className="hidden" aria-hidden="true">
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        tabIndex={-1}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea rows={5} placeholder="Tell us about your hiring or training needs." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {statusMessage && (
                <div
                  role="status"
                  aria-live="polite"
                  className={
                    status === "success"
                      ? "rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
                      : "rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
                  }
                >
                  {statusMessage}
                </div>
              )}

              <Button type="submit" className="w-full rounded-full" disabled={status === "loading"}>
                {status === "loading" ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  )
}
