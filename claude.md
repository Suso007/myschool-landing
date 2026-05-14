# MySchool Landing Page — Design & Logic Reference

> **RULE:** Before adding, editing, or updating anything in this project, read the relevant section(s) of this document first and design/code accordingly to maintain consistency.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack & Architecture](#2-tech-stack--architecture)
3. [Core Design System](#3-core-design-system)
4. [Global Background & Layout](#4-global-background--layout)
5. [Page Sections — Order & Purpose](#5-page-sections--order--purpose)
6. [Section Deep-Dives](#6-section-deep-dives)
   - [Header](#61-header)
   - [Hero](#62-hero)
   - [Features](#63-features)
   - [Apps (Mobile Showcase)](#64-apps-mobile-showcase)
   - [Attendance](#65-attendance)
   - [WhyUs](#66-whyus)
   - [Contact](#67-contact)
   - [Footer](#68-footer)
7. [Animation System](#7-animation-system)
8. [API Routes](#8-api-routes)
9. [Reusable UI Components](#9-reusable-ui-components)
10. [Content & Contacts](#10-content--contacts)
11. [Rules for Adding New Sections or Features](#11-rules-for-adding-new-sections-or-features)

---

## 1. Project Overview

**Product:** NextOrg — a cloud-based School Management ERP targeted at Indian schools (CBSE, ICSE, State Board).

**Landing Page Goal:** Marketing page to convert school administrators/principals into demo bookings.

**Primary CTA:** "Schedule Demo" → Opens a clipboard-style modal form that POSTs to `/api/demoSchedule`.

**Brand Identity:**
- Company name: **NEXTORG**
- Signature accent color: **`#d81b60`** (deep magenta/rose-red)
- Secondary accent: **`#1d4ed8` / blue-700** (for descriptive text)
- Background: **`#f9faf8`** (off-white, notebook paper feel)

---

## 2. Tech Stack & Architecture

| Concern | Technology |
|---|---|
| Framework | **Next.js 15** (App Router) |
| Language | **TypeScript** |
| Styling | **Tailwind CSS v4** (`@import "tailwindcss"`) |
| Animation | **Framer Motion** (all scroll and entrance animations) |
| HTTP Client | **Axios** (for form submissions) |
| Icons | **Lucide React** + **@tabler/icons-react** (WhatsApp only) |
| 3D Globe | **Aceternity UI Globe** (`components/ui/globe.tsx`) — loaded via `next/dynamic` with `ssr: false` |
| UI Primitives | **shadcn/ui** (Dialog, Button, Separator, etc. in `components/ui/`) |
| Fonts | **Google Fonts** loaded via `next/font/google` (see below) |
| Package Manager | **pnpm** |

### File Structure

```
app/
├── layout.tsx          # Root layout: fonts, metadata, Providers wrapper
├── page.tsx            # Assembles all sections in order + global background
├── globals.css         # Tailwind imports + CSS custom properties + view-transition animation
├── api/
│   └── demoSchedule/   # POST handler: saves demo requests
└── components/         # Page-level section components (each is a standalone "use client" component)
    ├── Header.tsx
    ├── Hero.tsx
    ├── Features.tsx
    ├── Apps.tsx
    ├── Attendance.tsx
    ├── WhyUs.tsx
    ├── Contact.tsx
    └── Footer.tsx

components/             # Shared / reusable components
├── ui/                 # shadcn/ui primitives + Aceternity globe
│   ├── globe.tsx
│   ├── globe.json      # Geographic data for the 3D globe
│   ├── button.tsx
│   ├── dialog.tsx
│   ├── typewriter-effect.tsx
│   ├── hero-highlight.tsx
│   ├── card-stack.tsx
│   ├── comet-card.tsx
│   └── ...
├── layout/             # Layout helpers
├── providers.tsx       # Global context providers (Sonner, etc.)
└── lazy-section.tsx    # IntersectionObserver lazy loader wrapper (used for perf)
```

---

## 3. Core Design System

### The "Analog / Scrapbook" Aesthetic

This is the **single most important design principle.** The entire site simulates a physical school desk:

- **Notebook paper background** with horizontal ruled blue lines.
- **Faint school supply doodles** (pencil, ruler, compass, etc.) scattered in the background layer.
- **Hand-drawn math symbols** (∑, π, E=mc², √x) as background art.
- All card components use **analog stationery metaphors**: sticky notes, index cards, graph paper sheets, manila folders, chalkboards, clipboards.
- **Intentional imperfection:** slight rotations on cards, sketchy/wobbly borders (`custom-wiggle-border` CSS class), clip-path folded corners, pushpins, tape strips.

> **Rule:** Never add clean, modern "glassmorphism" or floating card designs. Every new card/section should use one of the established analog styles (see below).

### Typography — Two Fonts ONLY

| Font | Variable | Use Case |
|---|---|---|
| `Permanent_Marker` | `markerFont` | ALL headings, labels, nav items, section titles, CTA buttons |
| `Kalam` | `handwrittenFont` | ALL body text, descriptions, form labels, sub-headings |

Both fonts are loaded locally in each component file that uses them:
```tsx
const markerFont = Permanent_Marker({ weight: '400', subsets: ['latin'] });
const handwrittenFont = Kalam({ weight: ['400', '700'], subsets: ['latin'] });
```

The root layout uses `Geist` and `Geist_Mono` as CSS variables (`--font-geist-sans`, `--font-geist-mono`) but these are NOT used in the marketing components — only in the shadcn/ui primitive components.

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| Brand Magenta | `#d81b60` | Primary CTA, logo, hover states, key highlights |
| Notebook Background | `#f9faf8` | Page background, header background |
| Slate Text | `slate-800` / `slate-900` | Primary text, borders, card outlines |
| Blue Accent | `blue-700` / `blue-800` | Descriptive body text (handwritten font) |
| Sticky Yellow | `#fce96a` | Step 1 sticky note, Student Onboard feature card |
| Sticky Green | `#a7f3d0` | Step 2 sticky note, Fees Collection card |
| Sticky Pink | `#fbcfe8` | Step 3 sticky note, Attendance card |
| Graph Paper BG | `#f8fafc` | Wide "graph paper" feature cards |
| Chalkboard | `#1e293b` | Attendance section left panel |
| Manila Folder | `#fef3c7` / `#fde68a` | Attendance section right panel/tabs |
| Clipboard Yellow | `#fffdf0` | Demo request modal background |

### `custom-wiggle-border` CSS Class

A critical utility that gives borders a hand-drawn, slightly irregular look. It is defined in `globals.css` or applied via SVG outlines. When adding any card that uses a rectangular border with the "notebook paper" aesthetic, apply this class.

---

## 4. Global Background & Layout

**File:** `app/page.tsx`

The global background is a **fixed full-screen layer** (`z-0`, `pointer-events-none`, `overflow-hidden`) that renders:

1. **Edge vignette:** Slight dark gradient on left/right edges to simulate paper edges.
2. **Paper texture:** SVG fractalNoise filter at 2% opacity.
3. **Ruled lines:** `repeating-linear-gradient` at 40px intervals, starting at Y=10px — simulates lined notebook paper.
4. **School supply icons:** Lucide icons (Pencil, Scissors, Backpack, Ruler, BookOpen, Compass, Eraser, Coffee, Calculator) scattered with `opacity-15` to `opacity-20` at various absolute positions.
5. **Math doodles:** Unicode chars (∑, π, E=mc², √x) at various rotations and positions.

All page section content sits in `<div className="relative z-10">` above this background.

The **Header** is `fixed top-0 z-50` and sits above everything.

---

## 5. Page Sections — Order & Purpose

The sections render in this exact order in `page.tsx`:

```
Header          → Fixed navigation (always visible)
HeroSection     → Above-the-fold: headline, CTA, product image, onboarding steps
FeaturesSection → "The Ecosystem" — the full feature bento grid  (id="features")
MobileAppsShowcase → Cross-platform apps overview
AttendanceManagement → Smart Attendance deep-dive  (id="solutions")
WhyChooseSection → Trust signals + CTA to schedule demo
ContactSection  → Contact cards + interactive globe  (id="contact")
Footer          → Links, social, company info
```

Each section has a clear **scroll anchor `id`** used by the header navigation links.

---

## 6. Section Deep-Dives

### 6.1 Header

**File:** `app/components/Header.tsx`

**Layout:** Fixed at top, `z-50`. Contains logo + desktop nav + contact icons + mobile hamburger.

**Logo:** `NEXTORG` text in a `bg-[#d81b60]` banner, rotated `-6deg`, spring entrance animation.

**Nav Links:** `['Features', 'Solutions', 'Contact']` — link to `#features`, `#solutions`, `#contact`. Each uses `Permanent_Marker` font with animated sliding underline on hover.

**Contact Icons (Desktop):** Phone (`tel:`), WhatsApp (`wa.me/`), Mail (`mailto:`) — each has a stagger entrance animation and bounce-wiggle on hover.

**Smart Hide/Show:** Uses `useScroll` + `useMotionValueEvent` from Framer Motion. Hides when scrolling down past 100px, shows when scrolling up. Mobile menu auto-closes on hide.

**Bottom Border:** Two animated lines in `#d81b60` that draw from left to right on page load (sequential delay).

**Mobile Menu:** `AnimatePresence` dropdown with the same nav links + simple contact icons. `border-b-2 border-[#d81b60]`.

**Contact Details (to update):**
- Phone: `+91 7063139083` → `tel:+917063139083`
- WhatsApp: `https://wa.me/917063139083`
- Email: `mailto:info@nextorg.in`

---

### 6.2 Hero

**File:** `app/components/Hero.tsx`

**Layout:** 2-column grid (`lg:grid-cols-2`), `pt-28` to clear the fixed header.

**Left Column:**
- H1 headline: `EMPOWER YOUR INSTITUTE WITH NEXTORG` — `Permanent_Marker`, large (4xl–6xl).
- Sub-headline: descriptive paragraph in `Kalam` font, `text-blue-800`.
- CTA Button: `Explore Platform` — `bg-[#d81b60]`, rounded shadow, hover lift effect.

**Right Column:** `<Image src="/image.png">` — the product screenshot. Entrance: scale + slight rotation spring animation.

**Bottom "Onboarding Flow" Sub-section:**
- Header: "Get Started in Days" + "Schedule Demo" button (opens the Demo Dialog).
- Three sticky note steps: `SCHEDULE DEMO` (yellow), `CUSTOM SETUP` (green), `GO LIVE` (pink). Each uses `clipPath` polygon for the folded corner effect + matching shadow `div`.
- A small browser mockup "Dashboard" card.

**Demo Dialog (Clipboard Modal):**
- `Dialog` from shadcn/ui, styled to look like a clipboard/form sheet.
- Full-screen on mobile, floating panel (`md:w-[420px]`) on desktop, positioned to the right side.
- A gray "clip" element at the top-center (`absolute top-0 left-1/2`).
- Form fields: Name, Email, Phone, Preferred Time Slot — all styled with dashed underline inputs on a `#fffdf0` background.
- On submit → POSTs to `/api/demoSchedule` via axios.
- The same Dialog component is also used in `WhyUs.tsx` for the second CTA.

---

### 6.3 Features

**File:** `app/components/Features.tsx`

**Section ID:** `id="features"`

**Concept:** "Scrapbook Bento Grid" — an asymmetric masonry-style grid where each feature card uses a different analog stationery style.

**Grid:** `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`, `auto-rows-auto`.

**Three Card Styles:**

| Style Name | `feature.style` | Appearance |
|---|---|---|
| Sticky Note | `"sticky"` | Colored background (`#fce96a`, `#a7f3d0`, `#fbcfe8`), folded corner `clipPath`, shadow triangle `div` |
| Graph Paper | `"graph"` | `#f8fafc` with CSS grid background pattern, pushpin dot at top-center, inner `bg-white/90` content panel |
| Index Flashcard | `"flashcard"` | White bg, blue ruled lines overlay, red margin line on left, "UPCOMING" stamp for future features |

**Feature Data Array (`allFeatures`)** — 10 items:

| Feature | Style | Width | Upcoming? |
|---|---|---|---|
| Student Onboard | sticky (yellow) | 1 col | No — has interactive search input |
| Real-time Analytics | graph | 2 cols | No |
| Fees Collection | sticky (green) | 1 col | No |
| Attendance & Leave | sticky (pink) | 1 col | No |
| Academic & Exam | flashcard | 1 col | No |
| HR & Payroll | flashcard | 1 col | **Yes** |
| Transport & Hostel | flashcard | 1 col | **Yes** |
| Library Management | flashcard | 1 col | **Yes** |
| Learning & Course | flashcard | 1 col | **Yes** |
| Mobile Applications | graph | 2 cols | No |

**Scroll Animation:** Each card starts at `y: 100` + double its `rotate` value. Springs to `y: 0` + normal rotation when in view. Hover: `scale: 1.03`, `rotate: 0`, `zIndex: 20`.

---

### 6.4 Apps (Mobile Showcase)

**File:** `app/components/Apps.tsx`

**Concept:** Alternating left-right rows. Each app has a text column (notebook paper snippet with red margin line) and a visual column (hand-drawn device sketch).

**Apps Data (`appsData`)** — 4 items:

| App | Type | Theme Color | Pills |
|---|---|---|---|
| Admin Web Dashboard | `web` | `text-rose-600` | Analytics, Manage Staff, Schedules |
| Student & Parent App | `mobile` | `text-blue-600` | Fee Paid, Present, A+ Grade |
| Faculty App | `mobile` | `text-emerald-600` | Attendance Done, Notes Uploaded, Class X-B |
| White-Label Solution | `mobile` | `text-purple-600` | App Store Live, Secure, Auto-Updated |

**Device Sketches:**
- `web` type → Browser window sketch (browser bar + red/yellow/green circles + sidebar + bar chart placeholders).
- `mobile` type → Phone sketch (notch/speaker + screen + home button).

**Floating Pills:** 3 "sticky note" pills per app, positioned absolutely around the device sketch with pushpin dots at top. Staggered entrance animation.

**Layout:** Even-index rows → `lg:flex-row` (text left, device right). Odd-index → `lg:flex-row-reverse`. Device sketches hidden on mobile (`hidden lg:flex`).

---

### 6.5 Attendance

**File:** `app/components/Attendance.tsx`

**Section ID:** `id="solutions"`

**Concept:** Two main columns — a Chalkboard (left, dark) and a Manila Folder (right, amber).

**Left — Chalkboard:** Dark slate background (`#1e293b`) with chalk dust texture (SVG noise filter), faded `Fingerprint` icon watermark, white text. Contains "What is it?" explanation + key features checklist.

**Right — Manila Folder:** Tabbed interface (Biometric / RFID System). Tab styling uses amber/yellow (`#fef3c7`, `#fde68a`) with brown borders (`#b45309`). Active tab appears raised. A silver clipboard clip sits at the top-center. Content: a numbered timeline using `before:` pseudo-element gradient line. Tabs animated with `AnimatePresence` mode `"wait"`.

**Bottom — Benefits Grid:** 6 benefit items. Each uses a hand-drawn wobbly SVG circle (two imperfect paths) as the icon wrapper. On hover: circle rotates 45deg and becomes fully opaque. Icon inside scales up.

---

### 6.6 WhyUs

**File:** `app/components/WhyUs.tsx`

**Concept:** Scrapbook collage of 6 "reason" cards, each with a different analog style.

**Section Header:** The title "WHY SCHOOLS TRUST US" sits on a yellow highlight block (`bg-[#fef08a]`) that is skewed/rotated for a highlighted-text effect.

**Reason Cards (`reasons`)** — 6 items using 4 styles:

| Reason | Style | Color |
|---|---|---|
| Built for Indian Schools | `index-card` | White + ruled lines + red margin |
| Cloud-Based Access | `graph-paper` | Graph paper + red pushpin |
| Data Security & Privacy | `pink-sticky` | `#fbcfe8` sticky |
| Fully Customizable | `yellow-sticky` | `#fce96a` sticky |
| Fast Implementation | `blue-scrap` | `#eff6ff` torn-paper look with dark top border |
| Ongoing Support | `green-sticky` | `#a7f3d0` sticky |

**CTA Box:** "READY TO TRANSFORM YOUR SCHOOL?" — two overlapping border frames (one dark, one magenta, slightly rotated in opposite directions), white/blur background. "SCHEDULE DEMO" button opens the same Demo Dialog clone.

---

### 6.7 Contact

**File:** `app/components/Contact.tsx`

**Section ID:** `id="contact"`

**Layout:** 2-column grid (`lg:grid-cols-2`).

**Left — Directory Cards (3 stacked):**

| Card | Style | Linking To |
|---|---|---|
| Phone | White + red margin line, green icon circle | `tel:+917063139083` |
| Email | Yellow sticky (`#fef08a`) + paperclip decoration | `mailto:support@nextorg.in` |
| Location | Graph paper bg + white content box | Static text (Bengaluru address) |

Below the cards: "CHAT ON WHATSAPP" button → `https://wa.me/917063139083`, full-width on mobile.

**Right — Interactive Globe:**
- Uses `Aceternity UI World` component (`components/ui/globe.tsx`), loaded with `next/dynamic` and `ssr: false` to avoid SSR issues with Three.js.
- Configured to show arcs between **Kolkata** (22.5726°N, 88.3639°E) and **Bengaluru** (12.9716°N, 77.5946°E).
- Initial camera position: between both cities.
- Pink arc (`#d81b60`) from Kolkata → Bengaluru; Green arc (`#10b981`) from Bengaluru → Kolkata.
- Floating sticky note "We are here!" floats above the globe with a `y` bob animation (4s loop).
- A paper airplane `Send` icon decorates the bottom-left.

**Current Address (Headquarters):**
```
Hari Hara Nivas, 6th A Cross, Kondappa Layout, Vignan Nagar
Bengaluru, Karnataka 560037, India
```

---

### 6.8 Footer

**File:** `app/components/Footer.tsx`

**Top Border:** Animated SVG wavy line (hand-drawn marker look) spanning full width.

**Grid:** `lg:grid-cols-6` — Company info takes `col-span-2`, then 4 link columns (1 col each).

**Company Column:** Logo stamp (same style as header logo) + tagline + contact info (email, phone, address) each with small circular icon badges.

**Link Columns:** Product, Company, Resources, Legal — each with a `Permanent_Marker` heading + wavy red underline SVG + list of `Kalam` links.

**Bottom Bar:** Copyright text + social media links as "hand-drawn stamps" (rotated, wiggle-border, per-platform hover colors).

**Social Links (order):** Facebook, Twitter, LinkedIn, Instagram, YouTube.

**Current Contact Info in Footer:**
- Email: `info@nextorg.in`
- Phone: `+91 7063139083`
- Address: `Hari Hara Nivas, 6th A Cross, Kondappa Layout, Vignan Nagar, Bengaluru, Karnataka 560037, India`

---

## 7. Animation System

All animations use **Framer Motion**. The patterns are consistent across all sections:

### Entrance Animations (Scroll-triggered)

```tsx
// Standard pattern used everywhere:
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
viewport={{ once: true, margin: "-100px" }}
```

`viewport={{ once: true }}` — animations only play once on first scroll-into-view, never repeat.

### Card Entrance with Rotation

Feature/Why cards start rotated (at 2x their final `rotate` value) and spring to their resting rotation:

```tsx
initial={{ opacity: 0, scale: 0.8, rotate: reason.rotate * 3 }}
whileInView={{ opacity: 1, scale: 1, rotate: reason.rotate }}
```

### Hover Effects

All interactive cards use:

```tsx
whileHover={{ scale: 1.03–1.05, rotate: 0, zIndex: 20–30, transition: { duration: 0.2 } }}
```

Hovering "straightens" any rotated card and lifts it above neighbors via `zIndex`.

### Staggered Sequences

Used for the header nav links and contact icons:
```tsx
transition={{ delay: 0.2 + (i * 0.1) }}
```

### Header Smart-Hide

```tsx
useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > previous && latest > 100) setIsHidden(true);
    else setIsHidden(false);
});
```

### Globe Floating Sticky Note

```tsx
animate={{ y: [0, -10, 0] }}
transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
```

---

## 8. API Routes

### `POST /api/demoSchedule`

**File:** `app/api/demoSchedule/route.ts` (or similar)

**Triggered by:** Demo request forms in `Hero.tsx` and `WhyUs.tsx`.

**Payload shape sent from frontend:**
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "preferredtimeslot": "string"
}
```

> Note: The frontend maps `preferredTimeSlot` (camelCase state) to `preferredtimeslot` (lowercase) in the payload object.

---

## 9. Reusable UI Components

### `components/ui/globe.tsx` — Aceternity Globe
- Three.js-based interactive 3D globe.
- Takes `data` (arc array) and `globeConfig` props.
- Must be loaded with `next/dynamic` and `ssr: false`.
- `globe.json` contains geographic polygon data (~1.5MB) — do NOT delete.

### `components/ui/dialog.tsx` — Demo Modal
Used in `Hero.tsx` and `WhyUs.tsx`. The clipboard-style modal styling (full-screen mobile, floating desktop) is applied via long className strings directly on `<DialogContent>` — the classes are identical in both components.

### `components/ui/button.tsx` — shadcn Button
Only used in `Hero.tsx` for the "Explore Platform" and "Schedule Demo" buttons.

### `custom-wiggle-border`
A CSS class that should be applied to all cards with rectangular borders to give the hand-drawn feel. Check `globals.css` for its definition or SVG equivalent usage.

---

## 10. Content & Contacts

All contact information is **hardcoded** in multiple places. When updating, check ALL of these files:

| Data | Files to Update |
|---|---|
| Phone number | `Header.tsx`, `Contact.tsx`, `Footer.tsx` |
| WhatsApp link | `Header.tsx`, `Contact.tsx` |
| Email (info) | `Header.tsx`, `Footer.tsx` |
| Email (support) | `Contact.tsx` |
| Address | `Contact.tsx`, `Footer.tsx` |
| Globe arc locations | `Contact.tsx` → `sampleArcs` + `globeConfig.markers` + `globeConfig.initialPosition` |

**Current values:**
- **Phone:** `+91 7063139083`
- **WhatsApp:** `https://wa.me/917063139083`
- **Email (general):** `info@nextorg.in`
- **Email (support):** `support@nextorg.in`
- **Headquarters:** Hari Hara Nivas, 6th A Cross, Kondappa Layout, Vignan Nagar, Bengaluru, Karnataka 560037, India

---

## 11. Rules for Adding New Sections or Features

### Adding a New Page Section

1. Create a new file in `app/components/`.
2. Start with `"use client"` and import both fonts (`Permanent_Marker`, `Kalam`).
3. Choose an **analog card style** from the established vocabulary:
   - Sticky note (yellow, green, or pink) with `clipPath` folded corner
   - Graph paper card (`#f8fafc` + CSS grid background)
   - Index/flashcard (white + blue ruled lines + red margin)
   - Chalkboard (dark slate `#1e293b`)
   - Manila folder (amber `#fef3c7`)
   - Torn paper scrap (`#eff6ff` with jagged bottom)
   - Do **NOT** create clean modern floating cards.
4. Use `whileInView` scroll animation with `viewport={{ once: true }}`.
5. Give the `<section>` an `id` if it needs to be linked from the header.
6. Import and add the new section in `app/page.tsx` in the correct position order.
7. Add the nav link in `Header.tsx` if it needs to appear in navigation.

### Adding a New Feature Card

Add to the `allFeatures` array in `Features.tsx`. Decide:
- `style`: `"sticky"` | `"graph"` | `"flashcard"`
- `color` & `shadow` (for sticky style only)
- `colSpan`: `"md:col-span-1 lg:col-span-1"` (normal) or `"md:col-span-2 lg:col-span-2"` (wide)
- `isUpcoming`: `true` shows the "UPCOMING" stamp on flashcard style
- `rotate`: small integer (-3 to 3) for the natural tilt

### Adding a New "Why Us" Reason

Add to the `reasons` array in `WhyUs.tsx`. Choose from the available styles: `"index-card"`, `"graph-paper"`, `"pink-sticky"`, `"yellow-sticky"`, `"blue-scrap"`, `"green-sticky"`.

### Adding a New App/Platform

Add to the `appsData` array in `Apps.tsx`. Set `type` to `"mobile"` or `"web"` — this controls whether a phone sketch or browser sketch is rendered. Provide 3 `visualPills` for the floating annotations.

### Updating Contact Info

See the table in Section 10 — update all files that contain the specific piece of info.

### Adding a New CTA Button

Use the existing pattern from `WhyUs.tsx` CTA section:
```tsx
<button className={`${markerFont.className} group relative px-10 py-4 bg-[#d81b60] text-white text-xl shadow-lg transition-transform hover:scale-105 hover:-rotate-2 custom-wiggle-border flex items-center gap-3`}>
```

### Form Submissions

Both demo forms (`Hero.tsx` and `WhyUs.tsx`) POST to `/api/demoSchedule`. If you add a third form, reuse the same endpoint or create a new route under `app/api/`. Use axios and the same payload shape. Form inputs should use `bg-transparent border-b-2 border-dashed` style to maintain the clipboard aesthetic.

### Globe Pins/Arcs

To add a new location pin to the globe in `Contact.tsx`:
1. Add to `globeConfig.markers`: `{ location: [lat, lng], size: 0.07 }`
2. Add arcs to `sampleArcs` pointing to/from the new location.
3. Update `globeConfig.initialPosition` if needed to reframe the view.

---

## 12. Standard Section Header Pattern

Every section (except Header and Footer) follows an identical header structure. **Always match this pattern** when adding a new section:

```tsx
<motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, type: "spring" }}
    viewport={{ once: true }}
    className="text-center mb-20 relative"
>
    {/* 1. Small "label tag" above the title */}
    <div className="relative inline-flex items-center gap-2 mb-6">
        <SomeIcon className="w-6 h-6 text-[#d81b60]" />
        <span className={`${markerFont.className} text-[#d81b60] text-xl tracking-widest uppercase`}>
            Short Label Text
        </span>
        {/* Optional: wavy underline SVG below label */}
        <svg className="absolute w-full h-3 -bottom-2 left-0 text-[#d81b60]" viewBox="0 0 100 10" preserveAspectRatio="none">
            <path d="M0 5 Q 50 10 100 2" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
    </div>

    {/* 2. Big bold h2 — Permanent_Marker font */}
    <h2 className={`${markerFont.className} text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-slate-900`}>
        MAIN HEADING IN ALL CAPS
    </h2>

    {/* 3. Handwritten sub-heading — Kalam font */}
    <p className={`${handwrittenFont.className} text-xl md:text-2xl text-slate-700 max-w-2xl mx-auto leading-relaxed`}>
        Descriptive sentence in mixed case.
    </p>
</motion.div>
```

**Variations in use:**
- Features section uses a "taped label" box (border + tape strip) instead of an icon+text label.
- WhyUs uses a highlighted background block behind the h2 instead of a label tag.
- But the 3-tier structure (label → h2 → p) is consistent everywhere.

**h2 text is always:**
- `ALL CAPS`
- `Permanent_Marker` font
- `text-4xl md:text-5xl lg:text-6xl`
- `text-slate-900`

**p text (sub-heading) is always:**
- `Kalam` font
- `text-xl md:text-2xl`
- `text-slate-700`
- `max-w-2xl mx-auto` (centered)

---

## 13. Responsive Design Conventions

The site is **mobile-first**. These breakpoints and patterns are used consistently:

### Layout Breakpoints

| Pattern | Mobile | Tablet (`md`) | Desktop (`lg`) |
|---|---|---|---|
| Section padding | `py-20 px-4` | `py-24 px-6` | — |
| Max width container | `w-full` | — | `max-w-7xl mx-auto` |
| Hero grid | single col | — | `lg:grid-cols-2` |
| Features grid | `grid-cols-1` | `md:grid-cols-2` | `lg:grid-cols-4` |
| Apps alternating rows | stacked (`flex-col`) | — | `lg:flex-row` / `lg:flex-row-reverse` |
| WhyUs grid | `grid-cols-1` | `md:grid-cols-2` | `lg:grid-cols-3` |
| Footer grid | `grid-cols-1` | `md:grid-cols-2` | `lg:grid-cols-6` |
| Contact grid | `grid-cols-1` | — | `lg:grid-cols-2` |
| Attendance grid | `grid-cols-1` | — | `lg:grid-cols-12` (7+5) |

### Hiding/Showing Elements

- Device mockup sketches in Apps section: **hidden on mobile** → `hidden lg:flex`
- Mobile hamburger menu: `md:hidden`
- Desktop nav: `hidden md:flex`

### Text Size Scaling

Always use responsive text sizes:
```
text-4xl md:text-5xl lg:text-6xl   → section h2 headings
text-3xl md:text-4xl               → card headings
text-xl md:text-2xl                → body / sub-headings
text-lg                            → list items, descriptions
```

### Demo Modal

- Mobile: full-screen (`!w-screen !h-[100dvh] !rounded-none`)
- Desktop: floating right panel (`md:!w-[420px] md:!right-[8%] lg:!right-[12%]`)

---

## 14. What NOT To Do (Hard Rules)

These are the things that break the design language. **Never do any of these:**

| ❌ Don't | ✅ Do instead |
|---|---|
| Use `rounded-full` or `rounded-xl` on content cards | Use `custom-wiggle-border` or sharp corners |
| Use gradients (`from-indigo-500 to-purple-600`) on CTA buttons | Use solid `bg-[#d81b60]` |
| Use `backdrop-blur` glassmorphism cards | Use paper/stationery analog styles |
| Use Inter, Roboto, or any sans-serif font for content | Use only `Permanent_Marker` (headings) + `Kalam` (body) |
| Use `text-gray-*` or `text-neutral-*` for body text | Use `text-slate-700` / `text-slate-800` |
| Use `dark:` variants in landing page components | This is a light-only landing page |
| Import from `components/ui/hero-highlight.tsx` for new sections | That's a legacy draft in `app/sections/` — not used |
| Add new sections in `app/sections/` | All active sections live in `app/components/` |
| Use `motion/react` import | Import from `framer-motion` only |
| Use `rounded-lg` / `rounded-2xl` on interactive card borders | Use `border-2 border-slate-800 custom-wiggle-border` |
| Add drop shadows with Tailwind shadow classes on sketchy cards | Use `shadow-md` or `shadow-xl` conservatively |
| Place content sections at `z-0` | All content must be `relative z-10` to sit above the background layer |
| Skip `viewport={{ once: true }}` on animations | Always include — animations should only run once |

---

## 15. The `app/sections/` Directory — Important Note

> ⚠️ **This directory contains OLD DRAFT components. They are NOT used on the live page.**

The files in `app/sections/` (e.g., `hero.tsx`, `features.tsx`, `contact.tsx`, etc.) are earlier design iterations that use:
- `motion/react` instead of `framer-motion`
- Glassmorphism / gradient styles
- Standard rounded cards
- Different font choices

**Do not modify or import from `app/sections/`.** All active, live components are in `app/components/`.

---

## 16. Public Assets

**Location:** `/public/`

| File | Usage |
|---|---|
| `image.png` | Hero section right column — the product screenshot/mockup. 748 KB. |
| `logo.png` | Favicon (referenced in `layout.tsx` metadata). 34 KB. |

**Rules for new images:**
- Place all images in `/public/`.
- Use `next/image` (`<Image>`) with `fill` + `object-contain` for full-area images, or explicit `width`/`height` for fixed-size images.
- The hero image uses `priority` prop (above the fold).
- Never use `<img>` tags — always `<Image>` from `next/image`.

---

## 17. Full Dependency Reference

Key packages relevant to the landing page:

| Package | Version | Purpose in Landing Page |
|---|---|---|
| `next` | 16.2.1 | Framework |
| `react` | 19.2.0 | UI |
| `framer-motion` | ^12.x | ALL animations — use this only, not `motion` |
| `lucide-react` | ^0.555.0 | All icons except WhatsApp |
| `@tabler/icons-react` | ^3.36.0 | WhatsApp icon (`IconBrandWhatsapp`) only |
| `axios` | ^1.13.x | Form submissions |
| `@react-three/fiber` | 10.0.0-alpha.2 | Globe 3D rendering |
| `@react-three/drei` | ^10.x | Globe helpers |
| `three` | ^0.183.2 | Globe 3D engine |
| `three-globe` | ^2.45.x | Globe component base |
| `cobe` | ^0.6.5 | Globe animation |
| `next-themes` | ^0.4.6 | Theme provider (wraps app in `Providers`) |
| `sonner` | ^2.0.7 | Toast notifications (via `<Toaster>` in providers) |
| `tailwindcss` | ^4 | Styling |
| `tw-animate-css` | ^1.4.0 | Extra CSS animations (imported in `globals.css`) |

**Installing new packages:** Always use `pnpm add <package>` — never `npm` or `yarn`.

---

## 18. Dev Workflow

```bash
# Start dev server
pnpm dev           # Runs on http://localhost:3000

# Build for production
pnpm build

# Lint
pnpm lint
```

**Providers wrapping:** Every component that uses Framer Motion, shadcn/ui, or theme variables is wrapped by `<Providers>` in `layout.tsx` which provides `ThemeProvider` (next-themes) and `<Toaster>` (sonner).

**`lazy-section.tsx`:** An `IntersectionObserver`-based wrapper at `components/lazy-section.tsx`. Renders a `400px` placeholder until the section enters the viewport, then renders children. Use this to wrap heavy sections (like the globe, attendance chalkboard, or any section with lots of animations) to improve initial page load time:

```tsx
import { LazySection } from '@/components/lazy-section';

<LazySection>
    <HeavyComponent />
</LazySection>
```

---

## 19. Pre-Commit Checklist

Before finalising any change, verify:

- [ ] Using `Permanent_Marker` for all headings/labels, `Kalam` for all body text — no other fonts
- [ ] CTA buttons are `bg-[#d81b60]` (never gradient, never blue)
- [ ] New cards use one of the 6 established analog stationery styles
- [ ] Borders on content cards use `border-2 border-slate-800 custom-wiggle-border` (not `rounded-xl`)
- [ ] All scroll animations have `viewport={{ once: true }}` and use `whileInView`
- [ ] Hover effects use `scale: 1.03–1.05` + `rotate: 0` + `zIndex: 20+`
- [ ] New section is in `app/components/`, NOT `app/sections/`
- [ ] Page section is added to `app/page.tsx` inside `<div className="relative z-10">`
- [ ] If contact info changed → updated in ALL relevant files (see Section 10 table)
- [ ] Images placed in `/public/` and referenced via `next/image`
- [ ] Any heavy/3D component loaded with `next/dynamic` + `ssr: false`
- [ ] No `dark:` classes added (landing page is light-only)
- [ ] Section container uses `max-w-7xl mx-auto` with `py-24 px-4` padding
