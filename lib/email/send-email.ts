import nodemailer from "nodemailer"

export type ContactEmailPayload = {
  fullName: string
  email: string
  phone?: string
  company?: string
  subject: string
  message: string
}

const DEFAULT_RECEIVER_EMAIL = "michaelmaguke@gmail.co.ke"

function getSmtpConfig() {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT ?? 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass) {
    throw new Error("Contact email service is not configured.")
  }

  return {
    host,
    port,
    auth: {
      user,
      pass,
    },
    secure: port === 465,
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

function formatOptional(label: string, value?: string) {
  return value?.trim() ? `${label}: ${value.trim()}` : `${label}: Not provided`
}

export async function sendContactEmail(payload: ContactEmailPayload) {
  const config = getSmtpConfig()
  const transporter = nodemailer.createTransport(config)
  const to = process.env.CONTACT_RECEIVER_EMAIL ?? DEFAULT_RECEIVER_EMAIL
  const from = process.env.SMTP_FROM_EMAIL ?? config.auth.user
  const subject = `New Contact Form Submission: ${payload.subject}`

  const text = [
    "New Contact Form Submission",
    "",
    `Name: ${payload.fullName}`,
    `Email: ${payload.email}`,
    formatOptional("Phone", payload.phone),
    `Subject: ${payload.subject}`,
    "",
    "Message:",
    payload.message,
  ].join("\n")

  const html = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(payload.fullName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(payload.phone || "Not provided")}</p>
    <p><strong>Subject:</strong> ${escapeHtml(payload.subject)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(payload.message).replace(/\n/g, "<br />")}</p>
  `

  await transporter.sendMail({
    from,
    to,
    replyTo: payload.email,
    subject,
    text,
    html,
  })
}

export async function testSmtpConnection() {
  const transporter = nodemailer.createTransport(getSmtpConfig())
  await transporter.verify()

  return { message: "SMTP connection verified." }
}
