import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, company, stage, challenge } = body

    if (!name || !email || !company || !challenge) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { data, error } = await resend.emails.send({
      from: 'AsleepTurtle Contact <noreply@asleepturtle.com>',
      to: ['hello@asleepturtle.com'],
      replyTo: email,
      subject: `New enquiry from ${name} — ${company}`,
      html: `
        <div style="font-family: monospace; max-width: 600px; margin: 0 auto; padding: 2rem; background: #08080E; color: #F2EEE6; border-radius: 8px;">
          <h2 style="font-family: sans-serif; color: #B8FF3C; margin-bottom: 1.5rem;">New enquiry via asleepturtle.com</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #252530; color: #7A7A8E; font-size: 13px; width: 120px;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #252530; font-size: 14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #252530; color: #7A7A8E; font-size: 13px;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #252530; font-size: 14px;"><a href="mailto:${email}" style="color: #B8FF3C;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #252530; color: #7A7A8E; font-size: 13px;">Company</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #252530; font-size: 14px;">${company}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #252530; color: #7A7A8E; font-size: 13px;">Stage</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #252530; font-size: 14px;">${stage || '—'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px 12px 0; color: #7A7A8E; font-size: 13px; vertical-align: top;">Challenge</td>
              <td style="padding: 12px 0; font-size: 14px; line-height: 1.6; color: #F2EEE6;">${challenge.replace(/\n/g, '<br>')}</td>
            </tr>
          </table>
          <p style="margin-top: 2rem; font-size: 12px; color: #3E3E50;">Sent from asleepturtle.com contact form</p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
