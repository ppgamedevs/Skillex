import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  try {
    const { name, email, company, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email address'
      });
    }

    // Create email HTML content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(120deg, #7cf2c6 0%, #4ad2ff 50%, #f6c64f 100%); color: #0a0f18; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
            .content { background: #f5f5f5; padding: 20px; border-radius: 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #333; }
            .value { color: #666; margin-top: 5px; word-wrap: break-word; }
            .footer { margin-top: 20px; font-size: 12px; color: #999; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              ${company ? `
              <div class="field">
                <div class="label">Company:</div>
                <div class="value">${company}</div>
              </div>
              ` : ''}
              <div class="field">
                <div class="label">Subject:</div>
                <div class="value">${subject}</div>
              </div>
              <div class="field">
                <div class="label">Message:</div>
                <div class="value" style="white-space: pre-wrap;">${message}</div>
              </div>
            </div>
            <div class="footer">
              <p>This message was sent via the Skillex Games contact form.</p>
              <p><a href="https://skillexgames.com">Visit our website</a></p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email via Resend
    const data = await resend.emails.send({
      from: 'Skillex Games <onboarding@resend.dev>',
      to: 'contact@skillexgames.com',
      replyTo: email,
      subject: `New Contact Form: ${subject}`,
      html: htmlContent
    });

    console.log('Resend response:', data);

    if (data.error) {
      console.error('Resend error:', data.error);
      return res.status(500).json({
        success: false,
        error: 'Failed to send email. Please try again later.'
      });
    }

    // Send confirmation email to user
    const confirmationHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(120deg, #7cf2c6 0%, #4ad2ff 50%, #f6c64f 100%); color: #0a0f18; padding: 20px; border-radius: 8px; margin-bottom: 20px; text-align: center; }
            .content { background: #f5f5f5; padding: 20px; border-radius: 8px; }
            .footer { margin-top: 20px; font-size: 12px; color: #999; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">Message Received</h1>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>Thank you for contacting Skillex Games! We've received your message and will get back to you as soon as possible.</p>
              <p><strong>Your message:</strong></p>
              <p style="background: white; padding: 15px; border-radius: 4px; white-space: pre-wrap;">${message}</p>
              <p>Our team typically responds within 24-48 hours.</p>
              <p>Best regards,<br>The Skillex Games Team</p>
            </div>
            <div class="footer">
              <p>&copy; 2026 Skillex Games. All rights reserved.</p>
              <p><a href="https://skillexgames.com">Visit our website</a></p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send confirmation to user (fire and forget)
    resend.emails.send({
      from: 'Skillex Games <onboarding@resend.dev>',
      to: email,
      subject: 'We received your message - Skillex Games',
      html: confirmationHtml
    }).catch(err => console.error('Failed to send confirmation email:', err));

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully!',
      id: data.id
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred. Please try again later.'
    });
  }
}
