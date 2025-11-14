# GitHub Pages Deployment Guide

This project is configured to automatically deploy to GitHub Pages using GitHub Actions. Every time you push to the `main` branch, your site is automatically built and deployed.

---

## ✅ Current Configuration Status

Your project is **fully configured** for GitHub Pages deployment:

- ✅ **GitHub Actions workflow** (`.github/workflows/deploy.yml`)
- ✅ **Static export enabled** (`next.config.js`)
- ✅ **Base path configured** for GitHub Pages URL structure
- ✅ **All 5 locales generated** (en, zh, ja, es, fr)
- ✅ **Default redirect** to English version
- ✅ **Jekyll disabled** (`.nojekyll` file)

---

## 🚀 Complete Deployment Steps

### Step 1: Enable GitHub Pages (One-Time Setup)

1. Go to your repository on GitHub
2. Click **Settings** (top navigation bar)
3. Click **Pages** (left sidebar, under "Code and automation")
4. Under **"Build and deployment"** section:
   - **Source**: Click the dropdown
   - Select **"GitHub Actions"** (NOT "Deploy from a branch")
5. Click **Save** (if there's a save button)

**What this does:** Tells GitHub to use your `.github/workflows/deploy.yml` file to build and deploy your site.

---

### Step 2: Push Your Code

Every time you push to the `main` branch, deployment happens automatically:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

**What happens next:**
1. GitHub detects the push to `main`
2. Triggers the "Deploy to GitHub Pages" workflow
3. Builds your Next.js app as static HTML
4. Deploys to GitHub Pages
5. Your site updates in 2-3 minutes

---

### Step 3: Monitor Deployment

1. Go to your repository on GitHub
2. Click the **Actions** tab (top navigation)
3. You'll see the workflow run: **"Deploy to GitHub Pages"**
4. Click on it to see detailed logs
5. Wait for the green checkmark ✅ (usually 2-3 minutes)

**Status indicators:**
- 🟡 **Yellow dot** = Running
- ✅ **Green checkmark** = Success (your site is live!)
- ❌ **Red X** = Failed (check the logs for errors)

---

### Step 4: Access Your Live Site

Once deployment succeeds, your site is available at:

**Main URL:**
```
https://<your-github-username>.github.io/advisor-calculator/
```

**Direct language URLs:**
- English: `https://<your-github-username>.github.io/advisor-calculator/en.html`
- Chinese: `https://<your-github-username>.github.io/advisor-calculator/zh.html`
- Japanese: `https://<your-github-username>.github.io/advisor-calculator/ja.html`
- Spanish: `https://<your-github-username>.github.io/advisor-calculator/es.html`
- French: `https://<your-github-username>.github.io/advisor-calculator/fr.html`

**Note:** The root URL (`/advisor-calculator/`) automatically redirects to the English version.

---

## 🔧 How It Works (Technical Details)

### GitHub Actions Workflow

The `.github/workflows/deploy.yml` file contains the automated deployment process:

1. **Trigger:** Runs on every push to `main` branch (or manual trigger)
2. **Build Process:**
   - Checks out your code
   - Sets up Node.js 20
   - Installs dependencies with `npm ci`
   - Builds the static site with `npm run build`
   - Generates the `out/` directory with all HTML/CSS/JS
3. **Deploy Process:**
   - Uploads the `out/` directory as an artifact
   - Deploys to GitHub Pages
   - Makes your site live

### Next.js Configuration

The `next.config.js` file is configured for static export:

```js
output: 'export',              // Enables static HTML generation
basePath: '/advisor-calculator', // Matches your GitHub repo name
images: { unoptimized: true }, // Required for static export
```

### Locale Generation

The `src/app/[locale]/layout.tsx` includes:

```js
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
```

This generates separate HTML files for all 5 languages during build time.

---

## 📂 Build Output Structure

After running `npm run build`, the `out/` directory contains:

```
out/
├── index.html           # Redirects to en.html
├── en.html             # English version
├── zh.html             # Chinese version
├── ja.html             # Japanese version
├── es.html             # Spanish version
├── fr.html             # French version
├── _next/              # JavaScript, CSS, fonts
│   └── static/
│       ├── css/
│       ├── chunks/
│       └── media/
├── .nojekyll           # Disables Jekyll processing
├── favicon.ico
├── manifest.json
├── robots.txt
└── sitemap.xml
```

GitHub Pages serves these files directly from the `out/` directory.

---

## 🎯 Automatic Deployment Features

### What Triggers Deployment

✅ **Push to main branch** - Automatic
✅ **Manual trigger** - Go to Actions > Deploy to GitHub Pages > Run workflow
❌ **Pull requests** - Does NOT deploy (only builds for testing)
❌ **Other branches** - Does NOT deploy

### Deployment Permissions

The workflow has these permissions (configured in `deploy.yml`):
- `contents: read` - Read your repository code
- `pages: write` - Deploy to GitHub Pages
- `id-token: write` - Required for Pages authentication

These are automatically granted by GitHub, no manual setup needed.

---

## 🐛 Troubleshooting

### Deployment Fails

1. **Check Actions logs:**
   - Go to Actions tab
   - Click on the failed workflow run
   - Expand the failed step to see error messages

2. **Common issues:**
   - **Build errors:** Fix TypeScript/lint errors in your code
   - **Permission denied:** Make sure GitHub Pages is enabled in Settings
   - **404 on deployment:** Verify `basePath` matches your repo name

### Site Shows 404 Error

1. **Verify GitHub Pages is enabled:**
   - Settings > Pages > Source = "GitHub Actions"

2. **Check deployment status:**
   - Actions tab should show successful deployment

3. **Verify URL structure:**
   - Correct: `https://username.github.io/advisor-calculator/en.html`
   - Wrong: `https://username.github.io/en.html` (missing repo name)

### CSS/JavaScript Not Loading

This should not happen if built correctly, but if it does:

1. **Check browser console** for 404 errors
2. **Verify basePath** in `next.config.js` matches repo name exactly
3. **Clear browser cache** and hard refresh (Cmd/Ctrl + Shift + R)
4. **Check build output:** Run `npm run build` locally to ensure no errors

### Changes Not Appearing

1. **Wait 2-3 minutes** after deployment succeeds
2. **Hard refresh** your browser (Cmd/Ctrl + Shift + R)
3. **Check Actions tab** to confirm latest deployment succeeded
4. **Verify you pushed to `main` branch:** `git branch` should show `* main`

---

## 🔄 Making Updates

### Standard Workflow

1. Make your code changes locally
2. Test locally: `npm run build` then `./test-github-pages.sh`
3. Commit: `git add . && git commit -m "Your message"`
4. Push: `git push origin main`
5. Wait 2-3 minutes for automatic deployment
6. Verify changes on live site

### Testing Before Deployment

**Test the build locally:**
```bash
npm run build
./test-github-pages.sh
```

Then visit: http://localhost:8080/advisor-calculator/en.html

This simulates exactly how GitHub Pages will serve your site.

---

## 📊 Monitoring Deployments

### Check Recent Deployments

1. Go to **Actions** tab
2. See history of all workflow runs
3. Each run shows:
   - Commit message that triggered it
   - Time it ran
   - Duration
   - Status (success/failure)

### View Live Site Status

After deployment succeeds:
1. Go to **Settings > Pages**
2. You'll see: "Your site is live at [URL]"
3. Click "Visit site" to open in new tab

### Environments

GitHub creates a "github-pages" environment automatically:
1. Go to your repository home page
2. Look in the right sidebar under "Environments"
3. Click "github-pages" to see deployment history
4. Shows timestamps of each deployment

---

## 🌐 Custom Domain (Optional)

If you want to use your own domain instead of `github.io`:

### Add Custom Domain

1. Go to **Settings > Pages**
2. Under **"Custom domain"**, enter your domain (e.g., `advisor.example.com`)
3. Click **Save**
4. Add DNS records at your domain registrar:
   - **For apex domain (example.com):**
     - Add A records pointing to GitHub's IPs (see GitHub docs)
   - **For subdomain (www.example.com or advisor.example.com):**
     - Add CNAME record pointing to `<username>.github.io`

5. Wait for DNS propagation (up to 24 hours)
6. GitHub will automatically issue an SSL certificate

### Update Configuration

After adding custom domain, update `next.config.js`:

```js
// Remove or comment out basePath for custom domain
// basePath: '/advisor-calculator',

// Or keep it if you want subdirectory on custom domain
basePath: '/calculator',  // Would be: example.com/calculator
```

Then rebuild and push.

---

## 💡 Best Practices

### Commit Messages

Use clear, descriptive commit messages:
```bash
# Good
git commit -m "Add Japanese translations for calculator tooltips"
git commit -m "Fix: CSS alignment issue on mobile devices"
git commit -m "Update: Improve scoring algorithm for advisor evaluation"

# Avoid
git commit -m "fix"
git commit -m "updates"
git commit -m "changes"
```

### Testing Before Deployment

Always test locally before pushing:
```bash
npm run build           # Ensure build succeeds
npm run lint            # Check for TypeScript/lint errors
./test-github-pages.sh  # Test the actual output
```

### Branch Protection (Optional)

For team projects, protect the main branch:
1. Settings > Branches > Add rule
2. Branch name pattern: `main`
3. Enable "Require status checks to pass before merging"
4. Enable "Require branches to be up to date before merging"

---

## 📈 Performance & Optimization

Your static site is already optimized for GitHub Pages:

✅ **Static HTML** - No server processing, instant loading
✅ **Global CDN** - GitHub serves from edge locations worldwide
✅ **Compressed assets** - CSS and JS are minified
✅ **Client-side only** - All processing happens in the browser
✅ **localStorage persistence** - Data saved locally, no database needed

### Loading Times

Expected performance:
- **First load:** < 2 seconds (includes downloading JS/CSS)
- **Subsequent visits:** < 0.5 seconds (browser cache)
- **Page interactions:** Instant (client-side React)

---

## 🔐 Security

### HTTPS

GitHub Pages enforces HTTPS automatically:
- ✅ All traffic encrypted
- ✅ Free SSL certificate
- ✅ Automatic renewal
- ✅ Cannot be disabled for `github.io` domains

### Data Privacy

Your app stores data in browser localStorage:
- ✅ Data never leaves user's device
- ✅ No server-side storage
- ✅ No tracking or analytics (unless you add them)
- ✅ GDPR-friendly by design

---

## 📝 Summary

**Your deployment workflow is:**

1. Make code changes locally
2. Push to `main` branch
3. GitHub Actions automatically builds and deploys
4. Site updates in 2-3 minutes
5. Users access at: `https://<username>.github.io/advisor-calculator/`

**Key files:**
- `.github/workflows/deploy.yml` - Deployment automation
- `next.config.js` - Static export configuration
- `public/index.html` - Default page redirect
- `public/.nojekyll` - GitHub Pages configuration

**No manual steps required after initial setup!**

---

## 🆘 Getting Help

If you encounter issues:

1. **Check Actions logs** for error messages
2. **Review this guide** for configuration steps
3. **Test locally** with `./test-github-pages.sh`
4. **Check GitHub Status:** https://www.githubstatus.com/
5. **GitHub Pages docs:** https://docs.github.com/en/pages

---

**Last Updated:** 2025-01-13
**Build Status:** ✅ Configured and Ready
**Deployment Method:** GitHub Actions (Automatic)
