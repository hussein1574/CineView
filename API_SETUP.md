# 🔐 API Keys Setup Guide

## Overview
CineView requires two API keys to function properly:
1. **TMDB API Key** - For movie data and images
2. **Google Gemini API Key** - For AI-powered movie search

## ⚠️ Security Best Practices

### DO ✅
- Keep your API keys in the local `environment.ts` file only
- Use `environment.example.ts` as a template for new setups
- Add `environment.ts` to `.gitignore` (already configured)
- Use different API keys for development and production
- Rotate API keys if accidentally exposed

### DON'T ❌
- Never commit `environment.ts` with real API keys to git
- Never share your API keys publicly
- Never hardcode API keys in component files
- Never post API keys in issues or pull requests

## 📝 Step-by-Step Setup

### 1. Get TMDB API Key

1. Go to [The Movie Database](https://www.themoviedb.org/)
2. Create a free account if you don't have one
3. Navigate to [API Settings](https://www.themoviedb.org/settings/api)
4. Click "Request an API Key"
5. Choose "Developer" option
6. Fill in the required information:
   - Application Name: `CineView Development`
   - Application URL: `http://localhost:4200`
   - Application Summary: `Personal movie discovery app for learning Angular`
7. Accept the terms and submit
8. Copy your **API Key (v3 auth)** (NOT the "API Read Access Token")

**Expected format:** `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`

### 2. Get Google Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key" button
4. Select your Google Cloud project (or create a new one)
5. Copy the generated API key

**Expected format:** `AIzaSyA1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q`

### 3. Configure Environment File

1. **Create your environment file** from the example:
   ```bash
   # Windows PowerShell
   copy src\app\environments\environment.example.ts src\app\environments\environment.ts
   
   # Linux/Mac
   cp src/app/environments/environment.example.ts src/app/environments/environment.ts
   ```

2. **Edit the file** `src/app/environments/environment.ts`:
   ```typescript
   export const environment = {
     production: false,
     tmdbAPIKey: 'YOUR_ACTUAL_TMDB_KEY_HERE',
     tmdbAPIUrl: 'https://api.themoviedb.org/3',
     tmdbImageBaseUrl: 'https://image.tmdb.org/t/p/w500',
     geminiAPIKey: 'YOUR_ACTUAL_GEMINI_KEY_HERE',
     geminiAPIUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
   };
   ```

3. **Replace the placeholders:**
   - Replace `YOUR_ACTUAL_TMDB_KEY_HERE` with your TMDB API key
   - Replace `YOUR_ACTUAL_GEMINI_KEY_HERE` with your Gemini API key

4. **Save the file**

### 4. Verify Configuration

1. Start the development server:
   ```bash
   npm start
   ```

2. Open `http://localhost:4200` in your browser

3. Check if movies are loading on the home page:
   - ✅ If you see trending movies → TMDB API is working
   - ❌ If you see "Failed to load movies" → Check your TMDB key

4. Test AI search:
   - Navigate to the Search page
   - Try a "Vibe Search" query like "feel-good movies"
   - ✅ If you get results → Gemini API is working
   - ❌ If you see errors → Check your Gemini key

### 5. Troubleshooting

#### Problem: "Failed to load movies"
**Solutions:**
- Verify your TMDB API key is correct
- Check you're using the API Key (v3), not the Read Access Token
- Ensure there are no extra spaces in the key
- Check browser console for specific error messages

#### Problem: "AI search not working"
**Solutions:**
- Verify your Gemini API key is correct
- Ensure the API is enabled in Google Cloud Console
- Check you have API quota available
- Check browser console for specific error messages

#### Problem: "environment.ts not found"
**Solutions:**
- Make sure you created the file from the example
- Check the file path: `src/app/environments/environment.ts`
- Verify file permissions allow reading

#### Problem: API key accidentally committed to git
**Solutions:**
1. **Immediately revoke the exposed keys** (generate new ones)
2. Remove from git history:
   ```bash
   git rm --cached src/app/environments/environment.ts
   git commit -m "Remove sensitive environment file"
   ```
3. Generate new API keys
4. Update your local `environment.ts` with new keys

## 🚀 Production Setup

For production deployment, create a separate environment file:

1. Create `src/app/environments/environment.prod.ts`:
   ```typescript
   export const environment = {
     production: true,
     tmdbAPIKey: 'YOUR_PRODUCTION_TMDB_KEY',
     tmdbAPIUrl: 'https://api.themoviedb.org/3',
     tmdbImageBaseUrl: 'https://image.tmdb.org/t/p/w500',
     geminiAPIKey: 'YOUR_PRODUCTION_GEMINI_KEY',
     geminiAPIUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
   };
   ```

2. Use environment-specific builds:
   ```bash
   # Development build
   ng build
   
   # Production build
   ng build --configuration production
   ```

3. For hosting platforms (Netlify, Vercel, etc.):
   - Store API keys as **environment variables** in the platform's dashboard
   - Configure build commands to inject keys during build time
   - Never commit production keys to git

## 📊 API Usage Limits

### TMDB API
- **Free Tier:** 30-40 requests per 10 seconds
- **Daily Limit:** No official limit for personal use
- **Rate Limiting:** Respect the 40 req/10sec guideline

### Google Gemini API
- **Free Tier:** 60 requests per minute
- **Daily Limit:** Check your Google Cloud quotas
- **Rate Limiting:** Automatically throttled by Google

## 🔄 Rotating API Keys

If you need to change your API keys:

1. Generate new keys from respective platforms
2. Update `src/app/environments/environment.ts`
3. Restart your development server
4. Test to ensure everything works

## 📞 Getting Help

If you encounter issues:
1. Check the browser console for errors
2. Verify API keys are correctly formatted
3. Check API provider status pages
4. Review the main README.md for additional help
5. Open an issue on GitHub with error details (never include your actual API keys)

## ✅ Checklist

Before starting development:
- [ ] Created `environment.ts` from example
- [ ] Obtained TMDB API key
- [ ] Obtained Gemini API key
- [ ] Configured both keys in `environment.ts`
- [ ] Verified `environment.ts` is in `.gitignore`
- [ ] Tested app loads movies successfully
- [ ] Tested AI search functionality works

---

**Remember:** Your API keys are like passwords. Keep them secret and secure! 🔐
