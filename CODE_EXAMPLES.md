# Code Examples - Contact Form Email Integration

Complete code for reference. Copy-paste ready!

---

## 📁 File 1: `lib/email/send-email.ts` (NEW)

```typescript
import nodemailer from "nodemailer"

export interface ContactEmailData {
  fullName: string
  email: string
  phone?: string
  company?: string
  serviceInterest?: string
  message: string
}

// Initialize transporter - cached for production performance
let transporter: nodemailer.Transporter | null = null

function getTransporter() {
  if (transporter) {
    return transporter
  }

  const smtpHost = process.env.SMTP_HOST
  const smtpPort = process.env.SMTP_PORT
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
    throw new Error("SMTP configuration is incomplete. Check your environment variables.")
  }

  transporter = nodemailer.createTransport({
    host: smtpHost,
    port: parseInt(smtpPort),
    secure: parseInt(smtpPort) === 465, // Use TLS for port 587, SSL for port 465
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  })

  return transporter
}

export async function sendContactEmail(data: ContactEmailData) {
  const transporter = getTransporter()
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL

  if (!receiverEmail) {
    throw new Error("CONTACT_RECEIVER_EMAIL is not configured.")
  }

  const emailSubject = `New Contact Form Submission from ${data.fullName}`

  // Format email body
  const emailBody = `
New Contact Form Submission

Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone || "Not provided"}
Company: ${data.company || "Not provided"}
Service Interest: ${data.serviceInterest || "Not specified"}

Message:
${data.message}

---
This is an automated message from your website contact form.
  `.trim()

  // HTML version for better formatting
  const emailBodyHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { background-color: #f9f9f9; padding: 20px; border-radius: 8px; }
    .header { border-bottom: 2px solid #f97316; padding-bottom: 10px; margin-bottom: 20px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #f97316; }
    .message-box { background-color: #fff; padding: 15px; border-left: 4px solid #f97316; margin-top: 20px; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0; color: #f97316;">New Contact Form Submission</h2>
    </div>
    
    <div class="field">
      <span class="label">Name:</span> ${data.fullName}
    </div>
    
    <div class="field">
      <span class="label">Email:</span> <a href="mailto:${data.email}">${data.email}</a>
    </div>
    
    <div class="field">
      <span class="label">Phone:</span> ${data.phone || "Not provided"}
    </div>
    
    <div class="field">
      <span class="label">Company:</span> ${data.company || "Not provided"}
    </div>
    
    <div class="field">
      <span class="label">Service Interest:</span> ${data.serviceInterest || "Not specified"}
    </div>
    
    <div class="message-box">
      <span class="label">Message:</span>
      <p>${data.message.replace(/\n/g, "<br>")}</p>
    </div>
    
    <div class="footer">
      <p>This is an automated message from your website contact form.</p>
    </div>
  </div>
</body>
</html>
  `.trim()

  try {
    const info = await transporter.sendMail({
      from: `"${data.fullName}" <${process.env.SMTP_USER}>`,
      replyTo: data.email,
      to: receiverEmail,
      subject: emailSubject,
      text: emailBody,
      html: emailBodyHtml,
    })

    console.log(`Email sent successfully. Message ID: ${info.messageId}`)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("Failed to send email:", error)
    throw error
  }
}

// Optional: Test the connection
export async function testSmtpConnection() {
  const transporter = getTransporter()

  try {
    await transporter.verify()
    return { success: true, message: "SMTP connection verified successfully." }
  } catch (error) {
    console.error("SMTP connection failed:", error)
    throw error
  }
}
```

---

## 📁 File 2: `app/api/contact/route.ts` (MODIFIED)

```typescript
import { NextResponse } from "next/server"
import { z } from "zod"
import { sendContactEmail } from "@/lib/email/send-email"

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

  // Honeypot: if website field is filled, silently reject (bot protection)
  if (result.data.website) {
    return NextResponse.json({ message: "Message received." }, { status: 200 })
  }

  try {
    await sendContactEmail({
      fullName: result.data.fullName,
      email: result.data.email,
      phone: result.data.phone,
      company: result.data.company,
      serviceInterest: result.data.serviceInterest,
      message: result.data.message,
    })

    return NextResponse.json(
      { message: "Thanks for reaching out. We'll respond within one business day." },
      { status: 200 }
    )
  } catch (error) {
    console.error("Failed to send contact email:", error)
    return NextResponse.json(
      { message: "Something went wrong. Please try again or email us directly." },
      { status: 500 }
    )
  }
}
```

---

## 📁 File 3: `.env.local` (CREATE THIS)

```env
# SMTP Configuration for Gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=michaelmaguke@gmail.co.ke
SMTP_PASS=YOUR_GMAIL_APP_PASSWORD_HERE
CONTACT_RECEIVER_EMAIL=michaelmaguke@gmail.co.ke
```

**Never commit `.env.local` to Git!**

---

## 📁 File 4: `.env.local.example` (Reference Only)

```env
# SMTP Configuration
# For Gmail: Use App Passwords (not your regular Gmail password)
# 1. Enable 2-Factor Authentication in Google Account settings
# 2. Go to https://myaccount.google.com/apppasswords
# 3. Select "Mail" and "Windows Computer" (or your device)
# 4. Google will generate a 16-character password
# 5. Use that password below (without spaces)

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=michaelmaguke@gmail.co.ke
SMTP_PASS=YOUR_GMAIL_APP_PASSWORD_HERE

# Email Recipient
CONTACT_RECEIVER_EMAIL=michaelmaguke@gmail.co.ke

# ============================================
# Alternative Email Providers
# ============================================

# For SendGrid:
# SMTP_HOST=smtp.sendgrid.net
# SMTP_PORT=587
# SMTP_USER=apikey
# SMTP_PASS=SG.YOUR_SENDGRID_API_KEY

# For Mailgun:
# SMTP_HOST=smtp.mailgun.org
# SMTP_PORT=587
# SMTP_USER=postmaster@YOUR_DOMAIN.com
# SMTP_PASS=YOUR_MAILGUN_PASSWORD

# For AWS SES:
# SMTP_HOST=email-smtp.REGION.amazonaws.com
# SMTP_PORT=587
# SMTP_USER=YOUR_AWS_SMTP_USER
# SMTP_PASS=YOUR_AWS_SMTP_PASSWORD

# For Brevo (Sendinblue):
# SMTP_HOST=smtp-relay.brevo.com
# SMTP_PORT=587
# SMTP_USER=YOUR_BREVO_EMAIL
# SMTP_PASS=YOUR_BREVO_SMTP_KEY

# For Office 365:
# SMTP_HOST=smtp.office365.com
# SMTP_PORT=587
# SMTP_USER=your-email@company.com
# SMTP_PASS=YOUR_OFFICE_PASSWORD
```

---

## 🚀 Installation Commands

```bash
# Install Nodemailer
npm install nodemailer @types/nodemailer

# For PNPM
pnpm add nodemailer @types/nodemailer

# For Yarn
yarn add nodemailer @types/nodemailer
```

---

## 🧪 Test Request (curl example)

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+254 123 456 789",
    "company": "Acme Corp",
    "serviceInterest": "Recruitment & Talent Acquisition",
    "message": "We need to hire 10 developers for our team."
  }'
```

**Expected Response:**
```json
{
  "message": "Thanks for reaching out. We'll respond within one business day."
}
```

---

## 📱 Test Request (JavaScript/Frontend)

```typescript
// This is what the contact form sends
const response = await fetch("/api/contact", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    fullName: "Jane Doe",
    email: "jane@company.com",
    phone: "+254 123 456 789",
    company: "Tech Inc",
    serviceInterest: "Training Programs",
    message: "We need HR training for our team of 50 people."
  })
})

const data = await response.json()

if (response.ok) {
  console.log("Success:", data.message)
  // Show success toast to user
} else {
  console.error("Error:", data.message)
  // Show error toast to user
}
```

---

## 📊 Response Examples

### Success Response (200)
```json
{
  "message": "Thanks for reaching out. We'll respond within one business day."
}
```

### Validation Error (400)
```json
{
  "message": "Please enter your full name."
}
```

### Rate Limit Error (429)
```json
{
  "message": "Too many requests. Please wait a minute and try again."
}
```

### Server Error (500)
```json
{
  "message": "Something went wrong. Please try again or email us directly."
}
```

---

## 🔧 How to Customize

### Change Email Subject Line

In `lib/email/send-email.ts`, line ~51:

```typescript
// Before:
const emailSubject = `New Contact Form Submission from ${data.fullName}`

// After:
const emailSubject = `Contact Form: ${data.serviceInterest} - ${data.fullName}`
```

### Change Email Template Styling

In `lib/email/send-email.ts`, line ~56 in the `<style>` section:

```typescript
const emailBodyHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', sans-serif; line-height: 1.8; }
    .container { background: linear-gradient(...); }
    .header { background-color: #your-color; }
    /* Change colors, fonts, spacing here */
  </style>
</head>
...
```

### Add a New Form Field

1. Update schema in `app/api/contact/route.ts`:
```typescript
const contactRequestSchema = z.object({
  // ... existing fields
  budget: z.string().optional(), // NEW
})
```

2. Update interface in `lib/email/send-email.ts`:
```typescript
export interface ContactEmailData {
  // ... existing fields
  budget?: string // NEW
}
```

3. Update email template in `lib/email/send-email.ts`:
```typescript
const emailBodyHtml = `
...
<div class="field">
  <span class="label">Budget:</span> ${data.budget || "Not specified"}
</div>
...
`
```

4. Update form component in `components/sections/contact.tsx`:
```typescript
<FormField
  control={form.control}
  name="budget"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Budget</FormLabel>
      <FormControl>
        <Input placeholder="e.g., $10,000 - $50,000" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

### Route Emails to Different Recipients

In `lib/email/send-email.ts`:

```typescript
export async function sendContactEmail(data: ContactEmailData) {
  // Route based on service interest
  let receiverEmail = process.env.CONTACT_RECEIVER_EMAIL
  
  if (data.serviceInterest === "Recruitment & Talent Acquisition") {
    receiverEmail = "recruitment@company.com"
  } else if (data.serviceInterest === "Training Programs") {
    receiverEmail = "training@company.com"
  }
  
  // ... rest of code
}
```

---

## 🔐 Testing Gmail Configuration

Add this to `app/api/contact/route.ts` for testing:

```typescript
// Test endpoint: GET /api/contact
export async function GET() {
  try {
    const { testSmtpConnection } = await import("@/lib/email/send-email")
    const result = await testSmtpConnection()
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}
```

Then test: `curl http://localhost:3000/api/contact`

---

## 📋 Package.json Update

After running `npm install nodemailer @types/nodemailer`, your `package.json` will include:

```json
{
  "dependencies": {
    "nodemailer": "^6.9.x",
    // ... other dependencies
  },
  "devDependencies": {
    "@types/nodemailer": "^6.4.x",
    // ... other dev dependencies
  }
}
```

---

## 🚀 Environment Variables by Platform

### Vercel
```
Project Settings → Environment Variables

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=michaelmaguke@gmail.co.ke
SMTP_PASS=***
CONTACT_RECEIVER_EMAIL=michaelmaguke@gmail.co.ke
```

### Netlify
```
Site Settings → Build & Deploy → Environment

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=michaelmaguke@gmail.co.ke
SMTP_PASS=***
CONTACT_RECEIVER_EMAIL=michaelmaguke@gmail.co.ke
```

### AWS Lambda / Amplify
```
Via AWS Parameter Store or AppConfig

/contact-form/SMTP_HOST = smtp.gmail.com
/contact-form/SMTP_PORT = 587
/contact-form/SMTP_USER = michaelmaguke@gmail.co.ke
/contact-form/SMTP_PASS = ***
/contact-form/CONTACT_RECEIVER_EMAIL = michaelmaguke@gmail.co.ke
```

---

## ✅ Implementation Checklist

- [ ] Copy code from `lib/email/send-email.ts` (File 1)
- [ ] Replace `app/api/contact/route.ts` with File 2
- [ ] Create `.env.local` with File 3
- [ ] Run `npm install nodemailer @types/nodemailer`
- [ ] Get Gmail App Password from [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
- [ ] Add App Password to `.env.local` SMTP_PASS field
- [ ] Start dev server: `npm run dev`
- [ ] Test contact form: http://localhost:3000/#contact
- [ ] Check email inbox
- [ ] Deploy to production
- [ ] Add environment variables to hosting platform
- [ ] Test on live site
