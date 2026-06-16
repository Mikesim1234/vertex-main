# Quick Reference - Contact Form Email System

## 📋 Quick Setup (2 minutes)

```bash
# 1. Install dependencies
npm install nodemailer @types/nodemailer

# 2. Create .env.local in project root with:
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=michaelmaguke@gmail.co.ke
SMTP_PASS=YOUR_GMAIL_APP_PASSWORD_HERE
CONTACT_RECEIVER_EMAIL=michaelmaguke@gmail.co.ke

# 3. Restart dev server
npm run dev

# 4. Test at http://localhost:3000/#contact
```

---

## 📂 File Reference

| File | Purpose | Status |
|------|---------|--------|
| `lib/email/send-email.ts` | Nodemailer configuration & email sending | ✅ Created |
| `app/api/contact/route.ts` | API endpoint handling form submissions | ✅ Modified |
| `components/sections/contact.tsx` | Contact form UI | ⚫ Unchanged |
| `.env.local` | Your SMTP credentials | ℹ️ You create |
| `.env.local.example` | Example configuration | ✅ Created |
| `.gitignore` | Protects secrets | ⚫ Already has `.*env` |

---

## 🔌 Connection Flow

```
User fills form in browser
    ↓
useForm.onSubmit() → POST /api/contact
    ↓
[Frontend Validation - React Hook Form]
    ↓
POST body received at app/api/contact/route.ts
    ↓
[Backend Validation - Zod]
    ↓
[Rate Limiting Check]
    ↓
[Honeypot Check]
    ↓
sendContactEmail() from lib/email/send-email.ts
    ↓
Nodemailer.transporter.sendMail()
    ↓
SMTP connection to smtp.gmail.com:587
    ↓
Email delivered to michaelmaguke@gmail.co.ke
    ↓
Return JSON response → Frontend toast notification
```

---

## 🔑 Environment Variables

**All variables must be in `.env.local` in your project root:**

| Variable | Required | Example | Purpose |
|----------|----------|---------|---------|
| `SMTP_HOST` | ✅ Yes | `smtp.gmail.com` | Mail server address |
| `SMTP_PORT` | ✅ Yes | `587` | Mail server port (587 or 465) |
| `SMTP_USER` | ✅ Yes | `michaelmaguke@gmail.co.ke` | SMTP username/email |
| `SMTP_PASS` | ✅ Yes | `abcd efgh ijkl mnop` | SMTP password or app password |
| `CONTACT_RECEIVER_EMAIL` | ✅ Yes | `michaelmaguke@gmail.co.ke` | Where to send form submissions |

---

## 💻 Code Examples

### Example 1: Send Email (Backend)

```typescript
// app/api/contact/route.ts
import { sendContactEmail } from "@/lib/email/send-email"

// Inside POST handler:
await sendContactEmail({
  fullName: "John Doe",
  email: "john@example.com",
  phone: "+254 123 456 789",
  company: "Acme Corp",
  serviceInterest: "Recruitment",
  message: "We need to hire 10 developers"
})
```

### Example 2: Form Submission (Frontend)

```typescript
// components/sections/contact.tsx
const response = await fetch("/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    fullName: "Jane Doe",
    email: "jane@company.com",
    phone: "+254",
    company: "Tech Inc",
    serviceInterest: "Training Programs",
    message: "We need HR training for our team"
  })
})

const payload = await response.json()
if (response.ok) {
  console.log("Success:", payload.message)
} else {
  console.error("Error:", payload.message)
}
```

### Example 3: Email Response

```typescript
// What the visitor receives:
{
  from: "Jane Doe <michaelmaguke@gmail.co.ke>",
  replyTo: "jane@company.com",
  to: "michaelmaguke@gmail.co.ke",
  subject: "New Contact Form Submission from Jane Doe",
  html: "<professional HTML email with formatting>"
}
```

---

## 🧪 Testing Checklist

- [ ] Install dependencies: `npm install nodemailer @types/nodemailer`
- [ ] Create `.env.local` with SMTP credentials
- [ ] Start dev server: `npm run dev`
- [ ] Navigate to contact form: `http://localhost:3000/#contact`
- [ ] Fill all required fields
- [ ] Click Submit
- [ ] See success toast message
- [ ] Check email inbox for new email from visitor
- [ ] Email contains all form data formatted nicely
- [ ] Sender name shows as visitor's name
- [ ] Reply-To is visitor's email address

---

## 🚀 Production Deployment

### Vercel
```
Project Settings → Environment Variables
├─ SMTP_HOST = smtp.gmail.com
├─ SMTP_PORT = 587
├─ SMTP_USER = michaelmaguke@gmail.co.ke
├─ SMTP_PASS = [app password]
└─ CONTACT_RECEIVER_EMAIL = michaelmaguke@gmail.co.ke
```

### Other Platforms
Follow your platform's environment variable setup (same variables as above)

---

## 🔒 Security Checklist

- ✅ SMTP credentials in `.env.local` (not in code)
- ✅ `.env.local` protected by `.gitignore`
- ✅ All form inputs validated server-side (Zod)
- ✅ Rate limiting active (5 requests/minute)
- ✅ Honeypot protection (hidden field catches bots)
- ✅ SMTP uses TLS encryption (port 587)
- ✅ No credentials logged in console
- ✅ Error messages don't expose internals

---

## 🐛 Troubleshooting

### Error: "Cannot find module 'nodemailer'"
**Solution:** Run `npm install nodemailer @types/nodemailer` and restart dev server

### Error: "SMTP configuration is incomplete"
**Solution:** Check `.env.local` has all 4 variables: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_RECEIVER_EMAIL

### Email not arriving
**Solution:** 
1. For Gmail: Use App Password, not regular password
2. Check email spam/promotions folder
3. Check server logs: `npm run dev` shows errors
4. Verify SMTP credentials are correct

### "Too many requests" error
**Solution:** User exceeded 5 submissions/minute. Wait 60 seconds and try again.

### Form not submitting at all
**Solution:** 
1. Check browser console for JavaScript errors
2. Check network tab to see if POST request was sent
3. Verify API endpoint returns valid JSON response

---

## 📞 Support

**Nodemailer Issues:** https://nodemailer.com/
**Gmail App Passwords:** https://support.google.com/accounts/answer/185833
**Next.js API Routes:** https://nextjs.org/docs/app/building-your-application/routing/route-handlers

---

## 📖 Full Documentation

See:
- **`CONTACT_FORM_SETUP.md`** — Detailed setup guide with all email providers
- **`IMPLEMENTATION_SUMMARY.md`** — Complete implementation details

---

## ⚡ Performance Tips

1. **Nodemailer caches the transporter** → First email takes ~200ms, rest are faster
2. **Use persistent database for rate limiting in production** → Current in-memory solution works for small sites
3. **Consider email queuing** → For high-traffic sites, use Bull or RabbitMQ to queue emails

---

## 🎯 What's Included

✅ Secure SMTP email sending
✅ Professional HTML email templates
✅ Rate limiting (5 requests/minute)
✅ Honeypot spam protection
✅ Zod validation (both client & server)
✅ TypeScript support
✅ Error handling & logging
✅ Production-ready configuration
✅ Environment variable examples
✅ Deployment instructions
