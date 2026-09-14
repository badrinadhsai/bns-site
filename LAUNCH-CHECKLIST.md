# BNS Website — Launch Checklist

## Pre-Launch Verification

### Files & Structure
- [x] `index.html` — Home page
- [x] `solutions.html` — Solutions/Services page
- [x] `about.html` — About page
- [x] `work.html` — Legacy redirect to solutions.html (kept, not in nav)
- [x] `process.html` — Process page
- [x] `contact.html` — Contact page with form
- [x] `sitemap.xml` — XML sitemap
- [x] `robots.txt` — Robots file
- [x] `assets/css/tokens.css` — Design tokens
- [x] `assets/css/main.css` — Main stylesheet
- [x] `assets/js/main.js` — JavaScript interactions
- [x] `assets/logo/favicon.svg` — Favicon
- [x] `assets/logo/logo-primary.svg` — Primary logo
- [x] `assets/logo/logo-wordmark.svg` — Wordmark logo
- [x] `assets/logo/logo-mono-dark.svg` — Monochrome dark
- [x] `assets/logo/logo-mono-light.svg` — Monochrome light
- [x] `assets/logo/logo-monogram.svg` — Monogram

### Design System
- [x] Color tokens: Deep Blue `#1A365D`, Teal `#0D9488`, Amber `#F59E0B`
- [x] Typography: Inter (primary), Georgia (secondary)
- [x] Button styles: primary, secondary, outline, ghost
- [x] Card components
- [x] Form components
- [x] Responsive breakpoints: 1024px, 768px, 480px

### Pages
- [x] Home: Hero, services overview, why BNS, process, stats, CTA
- [x] Solutions: Web, Growth, AI, Automation sections
- [x] About: Story, services, values, responsible AI, founder-led
- [x] Work: Project examples, quality standards
- [x] Process: Discovery, Strategy, Build, Launch & Grow
- [x] Contact: Enquiry form, contact info, next steps

### SEO
- [x] Meta descriptions on all pages
- [x] Open Graph tags on all pages
- [x] Twitter Card tags on all pages
- [x] Semantic HTML structure
- [x] sitemap.xml with all pages
- [x] robots.txt
- [x] Canonical URLs
- [x] Image alt text (SVGs use aria-label where needed)

### Contact System
- [x] Enquiry form with fields: name, email, company, phone, service, budget, message
- [x] Form validation (client-side)
- [x] Success/error notifications
- [x] Privacy consent checkbox
- [x] Typical response wording ("I typically respond within 24 hours", non-guaranteed)

### Responsive Design
- [x] Mobile navigation with hamburger menu
- [x] Responsive grid layouts
- [x] Touch-friendly buttons and forms
- [x] Readable text on all screen sizes

### JavaScript
- [x] Mobile menu toggle
- [x] Navbar scroll effect
- [x] Active page highlighting
- [x] Smooth scroll for anchor links
- [x] Contact form handling
- [x] Notification system
- [x] Intersection Observer animations
- [x] Counter animations

## Post-Launch Tasks

### Domain & Hosting
- [ ] Purchase domain: `buildnavigatescale.com`
- [ ] Configure DNS
- [ ] Set up SSL certificate (HTTPS)
- [ ] Configure hosting (Netlify, Vercel, or traditional)
- [ ] Point domain to hosting

### Email
- [ ] Set up `buildnavigatescale@gmail.com`
- [ ] Configure email forwarding or mailbox
- [ ] Test contact form delivery

### Analytics & Monitoring
- [ ] Install Google Analytics 4
- [ ] Set up Google Search Console
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Set up uptime monitoring

### Content
- [x] Removed from nav: portfolio-first work.html is now a legacy redirect (V1.1 polish)
- [ ] Add team photo or founder photo to about.html
- [ ] Create OG image (1200x630px) for social sharing
- [ ] Replace placeholder images with real photos

### Testing
- [ ] Test all pages on mobile devices
- [ ] Test all pages on desktop browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test contact form submission
- [ ] Test all internal links
- [ ] Run Lighthouse audit (target: 90+ on all categories)
- [ ] Test page load speed (target: <3 seconds)
- [ ] Validate HTML
- [ ] Check color contrast accessibility

### Performance
- [ ] Optimize SVG files (minify)
- [ ] Enable gzip/brotli compression
- [ ] Set cache headers
- [ ] Minify CSS and JS for production

### Security
- [ ] Add Content Security Policy headers
- [ ] Configure CORS
- [ ] Add X-Frame-Options
- [ ] Add X-Content-Type-Options

## Optional Enhancements
- [ ] Add structured data (JSON-LD) for Organization
- [ ] Add structured data for LocalBusiness (if applicable)
- [ ] Create 404 error page
- [ ] Add dark mode support
- [ ] Implement form backend (Formspree, Netlify Forms, or custom)
- [ ] Set up automated backups
- [ ] Create blog section (future)

## Domain Notes
- Domain chosen: `buildnavigatescale.com`
- BNS acronym is heavily used globally — bare `bns.*` domains are all taken
- `buildnavigatescale.com` is unique, aligns with BNS meaning (Build · Navigate · Scale)
- Alternative domains to consider in future: `bns.build`, `bns.digital` (if they become available)