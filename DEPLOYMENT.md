# Skillex Games - Contact Form Setup

## Production Deployment (Vercel)

### Setup Instructions:

1. **Push code to GitHub repository**

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect the configuration

3. **Add Environment Variable:**
   - In Vercel dashboard, go to: Settings → Environment Variables
   - Add: `RESEND_API_KEY` = `re_FQzMdGHx_Fp3ohnGy8ny3i9V7VAuEdbxZ`
   - Save and redeploy

4. **Verify Email Domain (Optional but Recommended):**
   - Go to [resend.com](https://resend.com/domains)
   - Add and verify `skillex.games` domain
   - Update `api/contact.js` line 118: Change `from: 'onboarding@resend.dev'` to `from: 'noreply@skillex.games'`
   - Do the same for line 153

### Production URL:
Once deployed, your API endpoint will be:
- `https://yoursite.vercel.app/api/contact`
- Or with custom domain: `https://skillexgames.com/api/contact`

The frontend is already configured to use `/api/contact` which will work automatically.

---

## Local Development

### Setup:
```bash
npm install
npm start
```

### Access:
- Website: http://localhost:3000
- Contact form: http://localhost:3000/contact
- API endpoint: http://localhost:3000/api/contact

---

## How It Works

**Frontend (contact.html):**
- Form validates input
- Sends POST request to `/api/contact`
- Shows success/error message

**Backend (api/contact.js):**
- Vercel serverless function
- Validates form data
- Sends email via Resend API
- Sends confirmation email to user
- Returns JSON response

---

## File Structure

```
Skillex/
├── api/
│   └── contact.js          # Serverless function for contact form
├── assets/
│   └── images/
├── index.html              # Homepage
├── contact.html            # Contact page
├── styles.css              # All styles
├── server.js               # Local dev server (not deployed)
├── package.json            # Dependencies
├── vercel.json             # Vercel configuration
└── .env                    # Local environment variables (not committed)
```

---

## Notes

- The API key is securely stored in Vercel environment variables
- CORS is enabled for production domains
- Form data is never exposed in URLs
- Confirmation emails are sent to users automatically
- All emails are professionally formatted with HTML templates
