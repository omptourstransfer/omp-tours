# OMP Tours & Transfer — Website Setup Guide

## What Was Built

A complete, production-ready Next.js 14 tour booking website with:
- **33 source files** across app pages, components, and data
- **31 tours** with full descriptions, pricing, and booking logic
- **5 pages**: Home, Book Online, Individual Tour, About, Contact
- **PayPal 15% deposit** booking system (exact MS Excursion flow)
- **AI Chatbot** using Pollinations.ai (100% free, no API key)
- **WhatsApp floating button** → +1 (809) 431-2542
- Glassmorphic navbar, neomorphic cards, parallax hero
- SEO sitemap, robots.txt, meta tags
- Cookie consent banner, 404 page

---

## Step 1 — Install Dependencies

You need **Node.js 18+** installed. Download from https://nodejs.org

Open Terminal, navigate to this folder, then run:

```bash
cd website
npm install
```

This installs all packages (~2–3 minutes).

---

## Step 2 — Set Up Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Then fill in your values in `.env.local`:

```env
# 1. PayPal — get from https://developer.paypal.com
#    Create an app → copy "Client ID" (use LIVE for real payments)
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_live_paypal_client_id

# 2. EmailJS — get from https://www.emailjs.com (free plan works)
#    Create account → Add Email Service → Create Template → Copy IDs
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

# 3. Google Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### PayPal Setup (Important)
1. Go to https://developer.paypal.com → Log in → Apps & Credentials
2. Switch from "Sandbox" to **"Live"**
3. Create an app → copy the **Client ID**
4. Paste it in `NEXT_PUBLIC_PAYPAL_CLIENT_ID`

### EmailJS Setup (So booking emails reach Orlando)
1. Go to https://www.emailjs.com → Sign up free
2. **Add Email Service** → Connect your Gmail (info@omptours-travel.com)
3. **Create Email Template** with these variables:
   - `{{booking_ref}}` — booking reference
   - `{{tour_name}}` — tour name
   - `{{tour_date}}` — selected date
   - `{{pickup_time}}` — 9:00AM or 2:00PM
   - `{{guest_name}}` — customer name
   - `{{adults}}` — number of adults
   - `{{deposit_paid}}` — amount charged via PayPal
   - `{{cash_balance}}` — amount due in cash
4. Copy Service ID, Template ID, and Public Key into `.env.local`

---

## Step 3 — Run Locally (Test)

```bash
npm run dev
```

Open http://localhost:3000 in your browser. You should see the full website!

---

## Step 4 — Deploy to Vercel (Free Hosting)

Vercel is the easiest way to deploy a Next.js website. It's **free** for this use case.

### 4a. Push to GitHub
1. Create a free account at https://github.com
2. Create a new repository called `omp-tours-website`
3. Upload this `website/` folder to the repository

### 4b. Deploy on Vercel
1. Go to https://vercel.com → Sign up with GitHub
2. Click **"New Project"** → Import your GitHub repo
3. In **Environment Variables**, add all your `.env.local` values
4. Click **Deploy** — done! (~2 minutes)

You'll get a URL like `omp-tours-website.vercel.app`

### 4c. Connect Your Domain (omptoursandtransfers.com)
1. In Vercel project → **Settings → Domains**
2. Add `omptoursandtransfers.com` and `www.omptoursandtransfers.com`
3. Vercel shows DNS records → Go to your domain registrar
4. Update the DNS records as shown → Domain goes live in ~1 hour

---

## Step 5 — Replace Placeholder Content

### Logo
1. Add your logo file to `public/logo.png`
2. Update `src/components/layout/Navbar.tsx` — replace the `OMP` text block with:
   ```jsx
   <Image src="/logo.png" alt="OMP Tours" width={120} height={50} />
   ```

### Hero Video/Image
1. Add your hero image/video to `public/hero.jpg` or `public/hero.mp4`
2. Update `src/components/home/HeroSection.tsx` — change `HERO_BG` constant at the top

### Tour Images (optional — MS Excursion images used as placeholders)
- Each tour's image URL is in `src/data/tours.ts`
- Replace the `image:` field for any tour with your own photo URL
- Recommended: upload to Cloudinary (free) and use their CDN URL

### Tour Descriptions
- All descriptions are in `src/data/tours.ts`
- Each tour has `description`, `shortDescription`, `included`, `whatToBring`, `highlights`
- Update any of these with Orlando's own words

### About Page Photo
- Update the image URL in `src/app/about/page.tsx`
- The current URL pulls from your Wix site

---

## File Structure

```
website/
├── package.json                    # Dependencies
├── next.config.js                  # Image domains config
├── tailwind.config.ts              # Brand colors & animations
├── tsconfig.json                   # TypeScript config
├── .env.example                    # Environment variables template
├── SETUP.md                        # This guide
└── src/
    ├── app/
    │   ├── layout.tsx              # Root layout (fonts, meta, providers)
    │   ├── page.tsx                # Homepage
    │   ├── globals.css             # Global styles + Tailwind
    │   ├── not-found.tsx           # 404 page
    │   ├── sitemap.ts              # Auto-generated sitemap
    │   ├── robots.ts               # robots.txt
    │   ├── book-online/page.tsx    # All 31 tours with filter/search
    │   ├── tours/[slug]/page.tsx   # Individual tour + booking widget
    │   ├── about/page.tsx          # About Orlando & OMP
    │   └── contact/page.tsx        # Contact form + map
    ├── components/
    │   ├── Providers.tsx           # Client-side providers wrapper
    │   ├── layout/
    │   │   ├── Navbar.tsx          # Sticky glassmorphic navbar
    │   │   └── Footer.tsx          # Footer with links + contact
    │   ├── home/
    │   │   ├── HeroSection.tsx     # Parallax hero with animated text
    │   │   ├── WhyChooseUs.tsx     # 4 neomorphic feature cards
    │   │   ├── PopularTours.tsx    # 8 popular tour cards
    │   │   ├── HowItWorks.tsx      # 3-step booking process
    │   │   ├── Testimonials.tsx    # 6 guest reviews
    │   │   ├── Gallery.tsx         # Masonry gallery + lightbox
    │   │   └── ContactSection.tsx  # Map + contact info
    │   ├── tours/
    │   │   ├── TourCard.tsx        # Reusable tour card component
    │   │   └── BookingWidget.tsx   # Full MS Excursion booking widget
    │   └── ui/
    │       ├── LoadingScreen.tsx   # Animated OMP preloader
    │       ├── WhatsAppButton.tsx  # Floating WhatsApp button
    │       ├── ChatBot.tsx         # AI chatbot (Pollinations.ai)
    │       └── CookieBanner.tsx    # GDPR cookie banner
    ├── data/
    │   └── tours.ts                # All 31 tours data
    └── types/
        └── index.ts                # TypeScript interfaces
```

---

## Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Navy (Primary) | `#0A2342` | Background, dark sections |
| Turquoise (Accent) | `#00C9A7` | CTAs, highlights, icons |
| Gold | `#F0A500` | Prices, secondary CTAs |
| Dark Navy | `#071A33` | Footer, darker sections |

---

## AI Chatbot

The chatbot uses **Pollinations.ai** — completely free, no API key needed.
It's pre-trained with all 31 tours, prices, pickup times, and contact info.
When asked something out of scope, it directs users to WhatsApp +1 (809) 431-2542.

To update the chatbot's knowledge, edit the `SYSTEM_CONTEXT` variable in:
`src/components/ui/ChatBot.tsx`

---

## Booking Flow Summary

1. Customer visits `/tours/[slug]`
2. Selects date, 9:00AM or 2:00PM pickup, enters name, selects adults
3. System calculates: **Deposit = price × 15% × adults**
4. Customer pays deposit via PayPal
5. Booking confirmation shown + email sent via EmailJS
6. Balance paid in cash to Orlando on tour day

---

## Support

WhatsApp: +1 (809) 431-2542
Email: info@omptours-travel.com
