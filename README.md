# BNS — Build · Navigate · Scale

Founder-built studio site for my independent digital solutions practice.

Services include websites, search/growth, practical AI, and automation.

Static HTML/CSS/JS site.

Live: https://bns-site-nu.vercel.app/

Business/studio work — separate from my personal engineering projects.

**Digital Solutions for Modern Businesses**

---

## Project Structure

```
bns-site/
├── index.html          # Homepage
├── solutions.html      # Solutions page
├── about.html          # About page
├── work.html           # Legacy redirect → solutions.html (kept, not in nav)
├── process.html        # Process page
├── contact.html        # Contact page
├── 404.html            # Error page
├── robots.txt          # Search engine directives
├── sitemap.xml         # XML sitemap
├── assets/
│   ├── css/
│   │   └── style.css   # Production stylesheet
│   ├── js/
│   │   └── main.js     # JavaScript
│   └── logo/
│       ├── favicon.svg
│       ├── logo-primary.svg
│       ├── logo-wordmark.svg
│       ├── logo-mono-dark.svg
│       ├── logo-mono-light.svg
│       └── logo-monogram.svg
├── README.md
└── LAUNCH-CHECKLIST.md
```

## Local Development

### Option 1: Python

```bash
cd bns-site
python -m http.server 3000
# Open http://localhost:3000
```

### Option 2: Node.js

```bash
cd bns-site
npx serve .
# Open http://localhost:3000
```

### Option 3: PHP

```bash
cd bns-site
php -S localhost:3000
# Open http://localhost:3000
```

Or with Node (uses the included dev-only `server.js`):

```bash
cd bns-site
node server.js
# Open http://localhost:3001
```

## Deployment Workflow

GitHub → Vercel automatic deployment. No manual uploads.

1. Edit the website locally.
2. Test locally (see above).
3. Run:
   ```bash
   git add .
   git commit -m "Describe change"
   git push
   ```
4. Vercel automatically detects the push, creates a deployment, and updates production.

Vercel settings for this project (static site, zero build):

- Framework Preset: Other
- Build Command: none
- Output Directory: project root (`.`)
- Install Command: none
- Production Branch: `main`

### Emergency rollback

If a bad deployment goes live:

1. Open Vercel → project `bns-site` → Deployments.
2. Find the previous successful (Ready) deployment.
3. Open its menu → Promote to Production (Instant Rollback).

## Deployment

### Netlify

1. Push to GitHub/GitLab/Bitbucket
2. Connect repository in Netlify dashboard
3. Build command: (leave empty — static site)
4. Publish directory: `.` (or `bns-site` if repo root)
5. (Optional) Set a custom domain. Current production URL: `https://bns-site-nu.vercel.app/`
6. Enable HTTPS

### Vercel

1. Push to GitHub
2. Import project in Vercel
3. Framework: Other
4. Build command: (leave empty)
5. Output directory: `.`
6. Add custom domain in project settings

### Cloudflare Pages

1. Push to GitHub
2. Connect repository in Cloudflare Pages
3. Build command: (leave empty)
4. Build output directory: `.`
5. Add custom domain

### Traditional Hosting (cPanel, etc.)

1. Upload all files via FTP/SFTP
2. Ensure `index.html` is in the web root
3. Configure HTTPS via hosting panel
4. Set up redirect from `http://` to `https://`

## Domain Configuration

### DNS Records (only if a custom domain is added; current production is `https://bns-site-nu.vercel.app/`)

```
Type    Name    Value
A       @       <hosting-ip>
CNAME   www     <custom-domain>
```

### HTTPS

- Netlify/Vercel/Cloudflare: Automatic SSL
- Traditional hosting: Use Let's Encrypt or hosting provider SSL

### Redirects

The canonical production URL is `https://bns-site-nu.vercel.app/`. If a custom domain is added later, redirect all non-canonical variants (http, www) to the canonical domain.

## Form Setup

The contact form (`contact.html`) requires a backend to process submissions.

### Option 1: Netlify Forms

1. Add `netlify` attribute to the `<form>` tag
2. Deploy to Netlify
3. Form submissions appear in Netlify dashboard

### Option 2: Formspree

1. Create account at https://formspree.io
2. Create a new form
3. Set form action to `https://formspree.io/f/YOUR_FORM_ID`
4. Set method to `POST`

### Option 3: Custom Backend

Connect the form to your own API endpoint.

## Google Search Console

1. Deploy the website
2. Go to https://search.google.com/search-console
3. Add property: `https://bns-site-nu.vercel.app/`
4. Verify ownership (DNS, HTML file, or meta tag)
5. Submit sitemap: `https://bns-site-nu.vercel.app/sitemap.xml`
6. Request indexing for important pages
7. Monitor indexing status

## Analytics

### Privacy-Conscious Analytics Options

- **Plausible Analytics**: https://plausible.io (lightweight, privacy-focused)
- **Umami**: https://umami.is (self-hosted, open source)
- **Google Analytics 4**: If you need GA, add tracking code before `</head>`

## Performance

The website is built for performance:

- Static HTML (no server-side rendering needed)
- Single CSS file (minify for production)
- Single JS file (minify for production)
- Inter font only (no heavy font stacks)
- No heavy frameworks or libraries
- Lazy scroll animations via IntersectionObserver

### Minification

For production, minify CSS and JS:

```bash
# Using terser for JS
npx terser assets/js/main.js -o assets/js/main.min.js -c -m

# Using csso for CSS
npx csso assets/css/style.css -o assets/css/style.min.css
```

Then update the HTML files to reference `.min.css` and `.min.js`.

## SEO Checklist

- [x] Unique title tags on all pages
- [x] Unique meta descriptions on all pages
- [x] Canonical URLs
- [x] Open Graph tags
- [x] Twitter Card tags
- [x] JSON-LD structured data (Organization, WebSite, BreadcrumbList)
- [x] Semantic HTML5
- [x] Proper heading hierarchy (one H1 per page)
- [x] robots.txt
- [x] sitemap.xml
- [x] Mobile-responsive design
- [x] Fast loading (static site)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

## License

Copyright © 2026 BNS. All rights reserved.