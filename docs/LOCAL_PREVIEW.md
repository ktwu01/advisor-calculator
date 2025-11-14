# Local Preview Guide

## How to Preview Your Built Site Locally

Since the site is configured with `basePath: '/advisor-calculator'` for GitHub Pages, you need to handle this for local preview.

---

## Option 1: Use Python HTTP Server (Simplest)

This serves the files and lets you access at the correct path:

```bash
# From the project root
cd out
python3 -m http.server 8000
```

Then open in your browser:
```
http://localhost:8000/en.html
```

Or directly access any language:
- English: http://localhost:8000/en.html
- Chinese: http://localhost:8000/zh.html
- Japanese: http://localhost:8000/ja.html
- Spanish: http://localhost:8000/es.html
- French: http://localhost:8000/fr.html

**To stop**: Press `Ctrl+C` in the terminal

---

## Option 2: Use npx serve with Base Path Simulation

```bash
# Serve with simulated subdirectory structure
npx serve out
```

Then open:
```
http://localhost:3000/en.html
```

---

## Option 3: Temporarily Remove basePath for Testing

If you want to test at root path (http://localhost:3000/):

### 1. Edit `next.config.js`:
```js
const nextConfig = {
  output: 'export',
  // basePath: '/advisor-calculator', // Comment this out temporarily
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
  // ...
};
```

### 2. Rebuild:
```bash
npm run build
```

### 3. Serve:
```bash
npx serve out
```

### 4. Open:
```
http://localhost:3000/
```

**⚠️ IMPORTANT**: Don't forget to uncomment `basePath` before deploying to GitHub Pages!

---

## Quick Command Summary

**Fastest way (recommended):**
```bash
cd out
python3 -m http.server 8000
```

Then visit: http://localhost:8000/en.html

---

## Why basePath is needed for GitHub Pages

GitHub Pages serves your site at:
```
https://username.github.io/repo-name/
```

The `basePath: '/advisor-calculator'` tells Next.js to generate all links/assets with this prefix, so:
- CSS: `/advisor-calculator/_next/static/...`
- JS: `/advisor-calculator/_next/static/...`
- Links: `/advisor-calculator/en.html`

Without it, GitHub Pages would look for files at the root and get 404 errors.
