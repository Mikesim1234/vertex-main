import { NextResponse } from "next/server"
import { z } from "zod"

const contactRequestSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name.").max(120),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().max(40).optional().or(z.literal("")),
  company: z.string().max(120).optional().or(z.literal("")),
  serviceInterest: z.string().max(120).optional().or(z.literal("")),
  message: z.string().min(10, "Please share a few more details about your needs.").max(5000),
  website: z.string().optional().or(z.literal("")),
})

const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX_REQUESTS = 5
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown"
  }

  return request.headers.get("x-real-ip") ?? "unknown"
}

function isRateLimited(identifier: string) {
  const now = Date.now()
  const current = rateLimitStore.get(identifier)

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(identifier, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true
  }

  current.count += 1
  return false
}

async function sendContactEmail(payload: z.infer<typeof contactRequestSchema>) {
  const serviceId = process.env.EMAILJS_SERVICE_ID
  const templateId = process.env.EMAILJS_TEMPLATE_ID
  const publicKey = process.env.EMAILJS_PUBLIC_KEY
  const privateKey = process.env.EMAILJS_PRIVATE_KEY

  if (!serviceId || !templateId || !publicKey || !privateKey) {
    throw new Error("Contact email service is not configured.")
  }

  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      accessToken: privateKey,
      template_params: {
        fullName: payload.fullName,
        email: payload.email,
        phone: payload.phone || "Not provided",
        company: payload.company || "Not provided",
        serviceInterest: payload.serviceInterest || "Not provided",
        message: payload.message,
      },
    }),
  })

  if (!response.ok) {
    throw new Error(`Email provider returned ${response.status}`)
  }
}

export async function POST(request: Request) {
  const clientIp = getClientIp(request)

  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      { message: "Too many requests. Please wait a minute and try again." },
      { status: 429 }
    )
  }

  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 })
  }

  const result = contactRequestSchema.safeParse(body)

  if (!result.success) {
    const firstIssue = result.error.issues[0]
    return NextResponse.json({ message: firstIssue?.message ?? "Invalid form submission." }, { status: 400 })
  }

  if (result.data.website) {
    return NextResponse.json({ message: "Message received." }, { status: 200 })
  }

  try {
    await sendContactEmail(result.data)
    return NextResponse.json(
      { message: "Thanks for reaching out. We'll respond within one business day." },
      { status: 200 }
    )
  } catch (error) {
    console.error("Failed to send contact email", error)
    return NextResponse.json(
      { message: "Something went wrong. Please try again or email us directly." },
      { status: 500 }
    )
  }
}
