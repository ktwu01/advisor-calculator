# Deployment Guide

This Next.js 15 application can be deployed automatically using several methods. Choose based on your needs.

## ✅ CONFIGURED: GitHub Pages (Current Setup)

**Status**: GitHub Actions workflow is configured and ready to deploy!

### What's Already Set Up
- ✅ `.github/workflows/deploy.yml` - Automatic deployment workflow
- ✅ `next.config.js` - Static export enabled with correct basePath
- ✅ `generateStaticParams()` - All locales (en, zh, ja, es, fr) will be generated
- ✅ `.nojekyll` - Disables Jekyll processing
- ✅ Local build tested successfully

### Final Setup Steps (One-Time)

1. **Enable GitHub Pages in your repository**:
   - Go to your GitHub repository
   - Click **Settings** > **Pages**
   - Under "Build and deployment":
     - **Source**: Select "GitHub Actions"
   - Click **Save**

2. **Push your changes**:
   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment with GitHub Actions"
   git push origin main
   ```

3. **Watch the deployment**:
   - Go to the **Actions** tab in your GitHub repository
   - You'll see the "Deploy to GitHub Pages" workflow running
   - Wait for it to complete (usually 2-3 minutes)

4. **Access your site**:
   - Your site will be available at: `https://<your-username>.github.io/advisor-calculator/`
   - You can find the exact URL in:
     - Repository **Settings** > **Pages** (after first deployment)
     - The **Environments** section in your repo sidebar

### Automatic Deployments
Every time you push to the `main` branch, GitHub Actions will:
1. Build your Next.js app as static HTML
2. Generate all language versions (en, zh, ja, es, fr)
3. Deploy to GitHub Pages automatically
4. Your site updates in 2-3 minutes

### Manual Deployment
You can also trigger deployments manually:
- Go to **Actions** > **Deploy to GitHub Pages** > **Run workflow**

---

## Option 1: Vercel (Recommended - Easiest)

**Best for**: Production Next.js apps with SSR/ISR

### Setup Steps
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Import Project"
4. Select this repository
5. Click "Deploy"

**That's it!** Vercel auto-detects Next.js and configures everything.

### Auto-deployment
- Automatically deploys on every push to `main`
- Preview deployments for pull requests
- No GitHub Actions needed

### Pros
- Zero configuration
- Best Next.js performance (SSR/ISR optimized)
- Automatic HTTPS
- Global CDN
- Free tier: 100GB bandwidth/month

---

## Option 2: Netlify (You have existing config)

**Best for**: Static sites and Jamstack

### Setup Steps
1. Go to [netlify.com](https://netlify.com)
2. Sign in with GitHub
3. Click "Add new site" > "Import an existing project"
4. Select this repository
5. Netlify detects your `netlify.toml` config
6. Click "Deploy"

### Configuration
Your existing `deploy/netlify.toml` is configured for this.

### Auto-deployment
- Automatically deploys on every push to `main`
- No GitHub Actions needed

### Pros
- Good for static sites
- Free tier: 100GB bandwidth/month
- Built-in forms, identity management

### Cons
- Requires conversion for Next.js SSR features
- Slightly less optimized for Next.js than Vercel

---

## Option 3: GitHub Pages with GitHub Actions

**Best for**: Static exports only (loses SSR/ISR)

### Requirements
1. Enable static export in `next.config.js`:
   ```js
   output: 'export',
   basePath: '/advisor-calculator', // Replace with your repo name
   images: {
     unoptimized: true,
   },
   ```

2. Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [main]
     workflow_dispatch:

   permissions:
     contents: read
     pages: write
     id-token: write

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4

         - name: Setup Node.js
           uses: actions/setup-node@v4
           with:
             node-version: '20'
             cache: 'npm'

         - name: Install dependencies
           run: npm ci

         - name: Build
           run: npm run build

         - name: Setup Pages
           uses: actions/configure-pages@v4

         - name: Upload artifact
           uses: actions/upload-pages-artifact@v3
           with:
             path: ./out

         - name: Deploy to GitHub Pages
           uses: actions/deploy-pages@v4
   ```

3. Add `.nojekyll` file to `/public/`

4. Enable GitHub Pages in repo settings:
   - Settings > Pages > Source: GitHub Actions

### Auto-deployment
- Deploys automatically on push to `main`
- Uses GitHub Actions

### Pros
- Free hosting
- Custom domain support
- Version controlled

### Cons
- **Loses SSR/ISR capabilities** (static only)
- Requires code changes
- More setup complexity

---

## Option 4: Render.com with GitHub Actions (Current Host)

**Best for**: Keeping current hosting with automation

### Setup Steps

1. Keep your Render.com service
2. Create `.github/workflows/deploy-render.yml`:
   ```yaml
   name: Deploy to Render

   on:
     push:
       branches: [main]

   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - name: Trigger Render Deploy
           run: |
             curl -X POST "${{ secrets.RENDER_DEPLOY_HOOK }}"
   ```

3. Add Render deploy hook to GitHub secrets:
   - Go to Render dashboard > your service > Settings
   - Copy "Deploy Hook" URL
   - Add to GitHub: Settings > Secrets > Actions > New secret
   - Name: `RENDER_DEPLOY_HOOK`
   - Value: (paste the hook URL)

### Auto-deployment
- GitHub Actions triggers Render deployment on push
- Render handles the actual build and deploy

### Pros
- Maintains current hosting
- Automated pipeline
- Supports SSR/ISR

### Cons
- More moving parts
- Free tier has limitations

---

## Comparison Table

| Platform | Setup Complexity | SSR/ISR Support | Cost (Free Tier) | Best For |
|----------|------------------|-----------------|------------------|----------|
| **Vercel** | Easiest | ✅ Full | 100GB/month | Next.js production apps |
| **Netlify** | Easy | ⚠️ Limited | 100GB/month | Static sites, Jamstack |
| **GitHub Pages** | Medium | ❌ None | Unlimited | Static portfolios |
| **Render.com** | Medium | ✅ Full | 750 hrs/month | Full-stack apps |

---

## Recommended Choice

**For this project**: Use **Vercel**

Reasons:
1. Your app uses dynamic features (internationalization, SSR-capable)
2. Zero configuration required
3. Best Next.js performance
4. Automatic preview deployments
5. Free tier is generous

Simply connect your GitHub repo to Vercel, and it handles everything automatically - no workflow files needed.

---

## Migration from Render.com to Vercel

If you want to switch from Render.com to Vercel:

1. Sign up at [vercel.com](https://vercel.com) with GitHub
2. Import this repository
3. Vercel auto-detects configuration
4. Update your DNS/custom domain (if any)
5. Optionally delete Render.com service

**No code changes required!** Your current setup works perfectly with Vercel.
