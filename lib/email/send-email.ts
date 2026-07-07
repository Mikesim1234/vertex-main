import nodemailer from "nodemailer"

import { siteConfig } from "@/lib/data/site"

export type ContactEmailPayload = {
  fullName: string
  email: string
  phone?: string
  company?: string
  serviceInterest?: string
  message: string
}

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
  const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.email
  const from = process.env.SMTP_FROM_EMAIL ?? config.auth.user
  const subject = `New website inquiry from ${payload.fullName}`

  const text = [
    `Name: ${payload.fullName}`,
    `Email: ${payload.email}`,
    formatOptional("Phone", payload.phone),
    formatOptional("Company", payload.company),
    formatOptional("Service interest", payload.serviceInterest),
    "",
    "Message:",
    payload.message,
  ].join("\n")

  const html = `
    <h2>New website inquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(payload.fullName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(payload.phone || "Not provided")}</p>
    <p><strong>Company:</strong> ${escapeHtml(payload.company || "Not provided")}</p>
    <p><strong>Service interest:</strong> ${escapeHtml(payload.serviceInterest || "Not provided")}</p>
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
