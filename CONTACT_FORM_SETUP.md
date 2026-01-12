# Contact Form Setup Instructions

The contact form uses EmailJS to send emails directly from the browser to `contact@skillexgames.com`.

## Setup Steps

1. **Sign up for EmailJS**
   - Go to https://www.emailjs.com/
   - Create a free account (supports 200 emails/month on free tier)

2. **Create an Email Service**
   - In EmailJS dashboard, go to "Email Services"
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the connection steps to link your email account
   - Note your **Service ID**

3. **Create an Email Template**
   - Go to "Email Templates" in the dashboard
   - Click "Create New Template"
   - Use this template structure:
     ```
     From: {{from_name}} <{{from_email}}>
     Company: {{company}}
     Subject: {{subject}}
     
     Message:
     {{message}}
     ```
   - Set "To Email" to: `contact@skillexgames.com`
   - Set "From Name" to: `Skillex Contact Form`
   - Note your **Template ID**

4. **Get Your Public Key**
   - Go to "Account" → "General"
   - Copy your **Public Key**

5. **Update contact.html**
   - Open `contact.html`
   - Find the line: `emailjs.init('YOUR_PUBLIC_KEY');`
   - Replace `YOUR_PUBLIC_KEY` with your actual public key
   - Find the line: `'YOUR_SERVICE_ID'`
   - Replace `YOUR_SERVICE_ID` with your service ID
   - Find the line: `'YOUR_TEMPLATE_ID'`
   - Replace `YOUR_TEMPLATE_ID` with your template ID

## Alternative: Using Formspree

If you prefer Formspree instead:

1. Sign up at https://formspree.io/
2. Create a new form
3. Set the recipient email to `contact@skillexgames.com`
4. Get your form endpoint URL
5. In `contact.html`, change the form to:
   ```html
   <form id="contact-form" class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" novalidate>
   ```
6. Update the JavaScript to use FormData and fetch instead of EmailJS

## Testing

After setup, test the form by:
1. Filling out all required fields
2. Submitting the form
3. Checking that you receive the email at `contact@skillexgames.com`
