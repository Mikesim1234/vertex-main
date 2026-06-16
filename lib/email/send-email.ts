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
