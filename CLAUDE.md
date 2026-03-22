# Proplisty — Real Estate Marketplace

## Project Overview
A hyperlocal real estate marketplace for brokers, builders, and buyers in India.
Think Facebook Marketplace but for properties — not a generic listings site.
Target cities: Pune, PCMC, and surrounding Tier 2 areas first.

## Tech Stack
- Frontend: Next.js 14 (App Router) + Tailwind CSS
- Backend: Supabase (Postgres + Auth + Storage)
- Deployment: Vercel

## Core Features
1. Marketplace Feed — scrollable property cards with photo, price, location, type
2. Listing Creation — broker form to post properties quickly
3. Search & Filters — locality, budget, property type, sale/rent
4. Broker/Builder Profiles — public storefront with listings + trust signals
5. Direct Connect — in-app inquiry system (NO WhatsApp redirect, messaging stays inside app)
6. Upcoming Projects — new launches with brochures and floor plans

## User Roles
- **Buyer/Renter** — browses feed, saves listings, sends inquiries
- **Broker** — creates listings, manages profile, responds to inquiries
- **Builder** — posts upcoming projects, uploads brochures/floor plans

## Database Tables (Supabase)
- `users` — auth + role (buyer / broker / builder)
- `listings` — property details, photos, price, location, type, status
- `profiles` — broker/builder public storefront info
- `inquiries` — in-app messages between buyers and brokers
- `projects` — upcoming launches with brochure PDFs and floor plans
- `saved_listings` — buyer wishlist/shortlist

## Design Rules
- Mobile-first — must work great on cheap Android phones
- Simple UI — target users are local brokers, not tech savvy
- Indian number formatting (₹ with lakhs/crores e.g. ₹45L, ₹1.2Cr)
- Default locality list: Wakad, Hinjewadi, Baner, Kothrud, Viman Nagar, Aundh, Pimple Saudagar, Nigdi, Chinchwad
- Warm, trustworthy color palette — not cold SaaS blue

## Commands
- `npm run dev` — start dev server on localhost:3000
- `npm run build` — production build
- `npx supabase start` — start local Supabase instance
- `npx supabase db push` — push schema changes

## Coding Preferences
- TypeScript throughout — no plain JS files
- Functional components only, no class components
- Supabase client via @supabase/ssr (not legacy @supabase/auth-helpers)
- Keep components small and single-purpose
- Server components by default, client components only when needed
- All API calls go through Supabase — no separate Express/Node backend
- Image uploads go to Supabase Storage bucket named `listing-photos`

## Key UX Decisions
- Direct messaging is in-app only (no WhatsApp redirect)
- Brokers must verify phone number before posting listings
- Listings show broker response rate to build trust
- Buyers can shortlist/save properties
- Search should work without account (public browsing)
- Account required only to contact a broker or post a listing
