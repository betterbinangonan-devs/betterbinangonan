// server\api\contact.post.ts
import { z } from 'zod'
import siteConfig from '~~/app/config/site.json'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(150),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
  website: z.string().max(0).optional(),
})

function getTimestamp() {
  return new Date().toLocaleString('en-PH', {
    timeZone: 'Asia/Manila',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

function getSignature(fromName: string) {
  const domain = siteConfig.domain
  const facebook = siteConfig.project.social.facebook
  const github = siteConfig.project.social.github

  const links = [
    domain ? `<a href="https://${domain}" style="color: #190090; text-decoration: none;">${domain}</a>` : null,
    facebook ? `<a href="${facebook}" style="color: #190090; text-decoration: none;">Facebook</a>` : null,
    github ? `<a href="${github}" style="color: #190090; text-decoration: none;">GitHub</a>` : null,
  ].filter(Boolean).join(' &nbsp;&middot;&nbsp; ')

  return `
    <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e5e5; font-family: sans-serif;">
      <p style="margin: 0; font-weight: 600; font-size: 14px; color: #111111;">${fromName}</p>
      <p style="margin: 2px 0 6px; font-size: 13px; color: #666666;">${siteConfig.tagline}</p>
      <p style="margin: 0 0 10px; font-size: 12px;">${links}</p>
      <p style="margin: 0; font-size: 11px; color: #999999; line-height: 1.5;">
        <a href="https://betterbinangonan.org" style="color: #999999;">BetterBinangonan.ORG</a> is an independent civic website under
        <a href="https://bettergov.ph" style="color: #999999;">BetterGov.PH</a>.
        We help you find official gov't services easily. Not affiliated with or representing the Binangonan LGU.
        100% volunteer-run &amp; community-based.
      </p>
    </div>
  `
}

// ? MARK: Direct Resend REST API call
async function sendResendEmail(apiKey: string, payload: {
  from: string
  to: string
  replyTo?: string
  subject: string
  html: string
}) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: payload.from,
      to: payload.to,
      reply_to: payload.replyTo,
      subject: payload.subject,
      html: payload.html,
    }),
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`Resend API error (${response.status}): ${errorBody}`)
  }

  return response.json()
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  if (!config.resendApiKey) {
    console.error('Missing RESEND_API_KEY env var')
    throw createError({ statusCode: 500, statusMessage: 'Server configuration error' })
  }

  const toEmail = siteConfig.project.email
  const fromEmail = siteConfig.project.systemFromEmail
  const fromName = siteConfig.project.name

  if (!toEmail || !fromEmail || !fromName) {
    console.error('Missing contact config in site.json (project.email, project.systemFromEmail, project.name)')
    throw createError({ statusCode: 500, statusMessage: 'Server configuration error' })
  }

  const body = await readBody(event)

  const result = contactSchema.safeParse(body)
  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid form data',
      data: result.error.flatten(),
    })
  }

  if (result.data.website) {
    return { success: true }
  }

  const { name, email, subject, message } = result.data
  const timestamp = getTimestamp()
  const signature = getSignature(fromName)

  try {
    await sendResendEmail(config.resendApiKey as string, {
      from: `${fromName} Contact <${fromEmail}>`,
      to: toEmail,
      replyTo: email,
      subject: `[Contact Form] ${subject} (${timestamp})`,
      html: `
        <div style="font-family: sans-serif; color: #333333; max-width: 560px;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Received:</strong> ${timestamp}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          ${signature}
        </div>
      `,
    })

    if (config.contactAutoReplyEnabled) {
      try {
        await sendResendEmail(config.resendApiKey as string, {
          from: `${fromName} <${fromEmail}>`,
          to: email,
          subject: `We've received your message - ${fromName} - (${timestamp})`,
          html: `
            <div style="font-family: sans-serif; color: #333333; max-width: 560px;">
              <p>Hi ${name},</p>
              <p>Thank you for reaching out to ${fromName}! We've received your message and will get back to you as soon as we can.</p>
              <p><strong>Here's a copy of what you sent:</strong></p>
              <blockquote style="border-left: 3px solid #ccc; margin: 12px 0; padding-left: 12px; color: #555;">
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Sent:</strong> ${timestamp}</p>
                <p>${message.replace(/\n/g, '<br>')}</p>
              </blockquote>
              <p style="color: #888; font-size: 13px;">This is an automated confirmation - no need to reply to this email directly.</p>
              ${signature}
            </div>
          `,
        })
      }
      catch (autoReplyErr) {
        console.error('Auto-reply send error (non-fatal):', autoReplyErr)
      }
    }

    return { success: true }
  }
  catch (err) {
    console.error('Resend send error:', err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to send message',
    })
  }
})
