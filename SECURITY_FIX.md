# Security Fix: Exposed Resend API Key

## Issue
GitGuardian detected an exposed Resend API key in the repository on January 12th, 2026.

## Actions Taken (January 14th, 2026)

### 1. ✅ Removed Hardcoded API Keys
- Removed hardcoded API key from `server.js` (line 15)
- Removed hardcoded API key from `DEPLOYMENT.md` (line 16)
- Added environment variable validation in `server.js` to prevent missing keys

### 2. ✅ Created `.env.example`
- Template file for environment variables
- Safe to commit to repository

### 3. 🔴 **CRITICAL: Next Steps Required**

You must complete these steps immediately:

#### A. Rotate the Exposed API Key
1. Go to [Resend Dashboard](https://resend.com/api-keys)
2. **Delete the exposed key**: `re_FQzMdGHx_Fp3ohnGy8ny3i9V7VAuEdbxZ`
3. Generate a new API key
4. Save the new key securely

#### B. Update Local Environment
1. Create a `.env` file in the project root:
   ```bash
   cp .env.example .env
   ```
2. Edit `.env` and add your **new** Resend API key:
   ```
   RESEND_API_KEY=re_your_new_key_here
   ```

#### C. Update Deployment
1. Go to your hosting platform (Vercel/etc.)
2. Update the `RESEND_API_KEY` environment variable with the new key
3. Redeploy the application

#### D. Clean Git History (Optional but Recommended)
The exposed key is still in Git history. Consider:
- Using [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/) to remove it
- Or creating a new repository and pushing clean code

## Prevention
- ✅ `.gitignore` already configured to ignore `.env` files
- ✅ Code now requires environment variables (no fallback values)
- ✅ `.env.example` provides template without sensitive data

## Verification
After updating the environment variable:
```bash
node server.js
```
Should start without errors. If `RESEND_API_KEY` is missing, the app will exit with an error.

---
**Date Fixed**: January 14th, 2026
**Fixed By**: GitHub Copilot
