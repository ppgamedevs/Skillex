# Resend Email Setup Guide

## Current Issue

Resend's free tier only allows sending emails to your verified email address (fakriddin@gmail.com). To send to `contact@skillexgames.com`, you need to verify your domain.

## Solution Options

### Option 1: Verify Domain (Recommended for Production)

1. **Go to Resend Dashboard**
   - Visit https://resend.com/domains
   - Click "Add Domain"
   - Enter: `skillexgames.com`

2. **Add DNS Records**
   - Resend will provide DNS records to add to your domain
   - Add them to your domain's DNS settings (wherever you manage DNS)
   - Wait for verification (usually a few minutes)

3. **Update Environment Variables**
   - Once verified, update your `from` email to use your domain:
   ```bash
   RESEND_FROM_EMAIL=noreply@skillexgames.com
   ```
   - Or update in `server.js` / `api/contact.js` directly

4. **Redeploy**
   - After domain verification, you can send to any email address

### Option 2: Temporary Testing Workaround

For testing purposes, you can temporarily send emails to your verified email:

1. **Create/Update `.env` file** in your project root:
   ```bash
   RESEND_API_KEY=your_api_key_here
   RESEND_TEST_EMAIL=fakriddin@gmail.com
   ```

2. **Restart your server**:
   ```bash
   npm start
   ```

3. **Test the form** - emails will go to fakriddin@gmail.com instead

4. **Remove the test email** once domain is verified for production

### Option 3: Use Different Email Service

If you prefer not to verify a domain, consider:
- **SendGrid** (free tier: 100 emails/day)
- **Mailgun** (free tier: 5,000 emails/month)
- **AWS SES** (very cheap, requires AWS account)

## Current Configuration

The code now supports:
- `RESEND_TEST_EMAIL` - Override recipient for testing
- `RESEND_FROM_EMAIL` - Override sender email
- Better error messages for domain verification issues

## Quick Fix for Testing

Add to your `.env` file:
```
RESEND_TEST_EMAIL=fakriddin@gmail.com
```

Then restart the server. All contact form submissions will go to your email for testing.
