# Contact Form Email Integration - Setup Guide

## 📋 Overview

This guide explains how to set up email notifications for your contact form using **Nodemailer with SMTP**. All email credentials are stored securely in environment variables on your server—never exposed in frontend code.

---

## 🚀 Installation

### Step 1: Install Dependencies

Run one of the following commands based on your package manager:

**Using npm:**
```bash
npm install nodemailer @types/nodemailer
```

**Using pnpm:**
```bash
pnpm add nodemailer @types/nodemailer
```

**Using yarn:**
```bash
yarn add nodemailer @types/nodemailer
```

### Step 2: Create `.env.local` File

Create a `.env.local` file in the root of your project (at the same level as `package.json`):

```env
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=michaelmaguke@gmail.co.ke
SMTP_PASS=YOUR_GMAIL_APP_PASSWORD_HERE
CONTACT_RECEIVER_EMAIL=michaelmaguke@gmail.co.ke
```

**⚠️ IMPORTANT:** 
- Never commit `.env.local` to Git (already covered by `.env*` in `.gitignore`)
- Keep your SMTP password secure
- Use an App Password for Gmail (see instructions below)

---

## 🔑 Gmail Setup (Recommended)

### For Gmail Users:

1. **Enable 2-Factor Authentication** (required for App Passwords)
   - Go to [https://myaccount.google.com/security](https://myaccount.google.com/security)
   - Click "2-Step Verification" and complete the setup

2. **Create an App Password**
   - Go to [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Select **Mail** and your device type (Windows Computer, etc.)
   - Google generates a 16-character password like: `abcd efgh ijkl mnop`
   - Copy this password (remove spaces if present)

3. **Add to `.env.local`**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=michaelmaguke@gmail.co.ke
   SMTP_PASS=abcdefghijklmnop
   CONTACT_RECEIVER_EMAIL=michaelmaguke@gmail.co.ke
   ```

4. **Test the connection**
   - After setup, the first submission will verify the connection
   - Check your server logs for any SMTP errors

---

## 📨 Alternative Email Providers

### SendGrid
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=SG.YOUR_SENDGRID_API_KEY
```

### Mailgun
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@yourdomain.com
SMTP_PASS=YOUR_MAILGUN_PASSWORD
```

### AWS SES (Simple Email Service)
```env
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_USER=YOUR_AWS_SMTP_USER
SMTP_PASS=YOUR_AWS_SMTP_PASSWORD
```

### Brevo (formerly Sendinblue)
```env
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=YOUR_BREVO_SMTP_KEY
```

### Office 365
```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=your-email@company.com
SMTP_PASS=YOUR_OFFICE_PASSWORD
```

---

## 📁 Files Created/Modified

### Created:
- **`lib/email/send-email.ts`** — Nodemailer email sending utility with HTML templates
- **`.env.local.example`** — Example environment variables (reference only, not used)

### Modified:
- **`app/api/contact/route.ts`** — Updated to use Nodemailer instead of EmailJS

### Unchanged:
- **`components/sections/contact.tsx`** — No changes needed ✓

---

## 🧪 Testing Locally

### 1. Start the development server
```bash
npm run dev
# or
pnpm dev
```

### 2. Navigate to the contact form
- Open [http://localhost:3000/#contact](http://localhost:3000/#contact)

### 3. Fill out the form
- Full Name: `Test User`
- Email: `test@example.com`
- Phone: `+254 123 456 789` (optional)
- Company: `Test Company` (optional)
- Service Interest: Select a service
- Message: `This is a test message.`

### 4. Submit the form
- You should see a success message
- Check your inbox at `michaelmaguke@gmail.co.ke`
- Look for an email with subject: "New Contact Form Submission from Test User"

### 5. Check server logs
```
✓ Email sent successfully. Message ID: <message-id>
```

---

## 🚀 Deployment to Production

### For Vercel:

1. **Add environment variables to Vercel**
   - Go to your Vercel project settings
   - Navigate to "Environment Variables"
   - Add the following:
     ```
     SMTP_HOST=smtp.gmail.com
     SMTP_PORT=587
     SMTP_USER=michaelmaguke@gmail.co.ke
     SMTP_PASS=<your_app_password>
     CONTACT_RECEIVER_EMAIL=michaelmaguke@gmail.co.ke
     ```

2. **Deploy**
   ```bash
   git push origin main
   # Vercel automatically redeploys
   ```

3. **Test in production**
   - Fill out the contact form on your live site
   - Verify the email arrives at `michaelmaguke@gmail.co.ke`

### For Other Platforms (Netlify, AWS, DigitalOcean, etc.):
- Add the same environment variables in your platform's environment settings
- Redeploy your application

---

## 🛡️ Security Features

Your implementation includes:

✅ **Secure Email Credentials** — Stored in environment variables, never exposed to frontend
✅ **Rate Limiting** — Max 5 requests per IP per minute
✅ **Honeypot Protection** — Hidden "website" field catches bots
✅ **Input Validation** — All fields validated with Zod
✅ **Error Handling** — Graceful errors without exposing internals
✅ **HTML Email Templates** — Professional-looking emails with formatting
✅ **Reply-To Header** — Emails contain visitor's reply-to address

---

## 📧 Email Format

Visitors will receive a professional HTML email with:
- **Sender Name** — From the visitor's name
- **Email Address** — Visitor's email (with reply-to link)
- **Phone** — If provided
- **Company** — If provided
- **Service Interest** — Selected service
- **Message** — Full contact message
- **Timestamp** — Automatic footer

---

## 🔧 Troubleshooting

### Email not arriving?
1. Check that `.env.local` is in the project root
2. Verify SMTP credentials are correct
3. Check server logs: `npm run dev` shows errors
4. For Gmail: Ensure App Password is used (not regular password)

### "SMTP configuration is incomplete" error?
- One or more environment variables are missing
- Verify all four SMTP variables are set: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
- Also verify `CONTACT_RECEIVER_EMAIL` is set

### Rate limiting message?
- User exceeded 5 submissions per minute from same IP
- They'll see: "Too many requests. Please wait a minute and try again."

### "Too many requests" in production?
- Consider using a database for persistent rate limiting instead of in-memory storage
- Current solution works for small to medium sites

---

## 📊 How It Works

### Flow Diagram

```
User fills form
        ↓
Frontend validates (React Hook Form + Zod)
        ↓
POST to /api/contact
        ↓
Backend validates again (Zod)
        ↓
Check rate limiting (client IP)
        ↓
Check honeypot (website field empty?)
        ↓
Send email via Nodemailer + SMTP
        ↓
Return success/error JSON
        ↓
Frontend shows success/error toast
```

### File Structure

```
project-root/
├── app/
│   └── api/
│       └── contact/
│           └── route.ts              ← API endpoint (updated)
├── components/
│   └── sections/
│       └── contact.tsx               ← Contact form (unchanged)
├── lib/
│   └── email/
│       └── send-email.ts             ← New: Email sending utility
├── .env.local                        ← Create: Environment variables
├── .env.local.example                ← New: Example variables
└── package.json                      ← Updated dependencies
```

---

## 💡 Advanced Customization

### Change email subject
Edit [lib/email/send-email.ts](lib/email/send-email.ts#L51):
```typescript
const emailSubject = `New Contact from ${data.fullName}`
```

### Change email body formatting
Edit the HTML template in [lib/email/send-email.ts](lib/email/send-email.ts#L56)

### Add more form fields
1. Update schema in [app/api/contact/route.ts](app/api/contact/route.ts#L3)
2. Update email template in [lib/email/send-email.ts](lib/email/send-email.ts#L56)
3. Add field to contact form component

### Use a different receiver email per form field
```typescript
const receiverEmail = result.data.serviceInterest === "Recruitment"
  ? "recruitment@company.com"
  : "general@company.com"
```

---

## 📞 Support

For issues with:
- **Nodemailer**: [https://nodemailer.com/](https://nodemailer.com/)
- **Gmail App Passwords**: [https://support.google.com/accounts/answer/185833](https://support.google.com/accounts/answer/185833)
- **Next.js API Routes**: [https://nextjs.org/docs/api-routes/introduction](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

## ✅ Checklist

- [ ] Run `npm install nodemailer @types/nodemailer`
- [ ] Create `.env.local` with SMTP credentials
- [ ] Test locally and verify email arrives
- [ ] Deploy to production
- [ ] Add environment variables to your hosting platform
- [ ] Test production contact form
- [ ] Remove old EmailJS configuration from environment
