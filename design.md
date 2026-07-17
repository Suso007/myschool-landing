# NextOrg Landing — Design System

> Companion to `claude.md` (project/logic reference). This file is the **visual design system spec** — tokens, components, motion, and rules. `claude.md` tells you *where things live*; this file tells you *how things should look and feel*. Read both before touching UI.

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [Design Tokens](#2-design-tokens)
3. [The `custom-wiggle-border` Utility](#3-the-custom-wiggle-border-utility)
4. [Component Pattern Catalog](#4-component-pattern-catalog)
5. [Data-Driven Card Convention](#5-data-driven-card-convention)
6. [Section Anatomy](#6-section-anatomy)
7. [Motion & Interaction Library](#7-motion--interaction-library)
8. [Iconography](#8-iconography)
9. [Responsive Rules](#9-responsive-rules)
10. [Accessibility](#10-accessibility)
11. [Do / Don't Reference](#11-do--dont-reference)
12. [Contact Section — Design Rationale](#12-contact-section--design-rationale)

---

## 1. Design Philosophy

**The site simulates a physical school desk, not a SaaS dashboard.** Every surface is paper, cardboard, chalk, or corkboard — never glass, gradient, or floating-shadow "modern SaaS" chrome.

Three ideas govern every design decision here:

1. **Analog stationery metaphors.** A card is always *something physical first* — a sticky note, an index card, a graph-paper sheet, a manila folder tab, a clipboard — and a UI card second. If you can't name the physical object a component is impersonating, redesign it.
2. **Intentional imperfection.** Nothing is perfectly aligned, perfectly rounded, or perfectly straight. Slight rotation, hand-drawn borders, wobbly circles, and folded corners are load-bearing, not decorative garnish — remove them and the design reads as generic.
3. **Restraint in the imperfection.** "Hand-drawn" means *subtle* — a degree of rotation, a few pixels of corner irregularity, low-opacity second strokes. It should read as "sketched by a careful hand," not "clip-art crayon." If a reviewer would describe it as "wonky" rather than "charming," pull it back.

---

## 2. Design Tokens

### Color

| Token | Hex | Role |
|---|---|---|
| Brand Magenta | `#d81b60` | The one accent. Primary CTAs, logo, active/hover states, key numerals. Never diluted into a gradient. |
| Notebook Background | `#f9faf8` | Page background, header background. |
| Ink / Slate 800–900 | `slate-800` / `slate-900` | All primary text, all card borders. |
| Body Blue | `blue-700` / `blue-800` | Handwritten-font descriptive body copy (used to differentiate prose from ink-black headings). |
| Sticky Yellow | `#fce96a` / `#fef08a` | "Step 1" notes, onboarding sticky, email card. |
| Sticky Green | `#a7f3d0` | "Step 2" notes, fee-related cards. |
| Sticky Pink | `#fbcfe8` | "Step 3" notes, attendance-related cards, globe callouts. |
| Graph Paper | `#f8fafc` | Wide analytical / location cards. |
| Chalkboard | `#1e293b` | Attendance left panel only. |
| Manila Folder | `#fef3c7` / `#fde68a` | Attendance tabs / folder panel only. |
| Clipboard Paper | `#fffdf0` | Modal / form backgrounds only. |

**Rule:** one accent color (`#d81b60`) does all the "primary action" work across the whole site. Secondary colors (green, blue, pink, yellow) are *identity* colors for specific card types, not alternate CTA colors — never put a second CTA button in green or blue just because it's nearby a green or blue card.

### Typography — exactly two fonts

| Font | Variable name | Use |
|---|---|---|
| `Permanent_Marker` | `markerFont` | Headings, nav, labels, stamps, buttons — always short, always emphatic. |
| `Kalam` | `handwrittenFont` | Body copy, descriptions, form values — anything meant to be *read*, not glanced at. |

Never mix in a third font (no Inter/Roboto/Geist) inside marketing sections. `Geist`/`Geist_Mono` exist only for shadcn primitives, not page content.

### Spacing & Radius

- Container: `max-w-7xl mx-auto`, section padding `py-20 px-4 md:py-24 md:px-6 lg:px-12`.
- Card gaps: `gap-6` (tight stacks) to `gap-8` / `gap-12` (grid sections).
- **No `rounded-full`/`rounded-xl`/`rounded-2xl` on content card borders.** Corners are either sharp (`border-2 border-slate-800`) or *irregularly* rounded via `custom-wiggle-border` (see §3) — never uniformly rounded. Icon badges (small circular avatars) are the one exception where `rounded-full` is allowed, since they represent physical buttons/stamps, not paper.

### Elevation

Shadows are used sparingly and only to suggest a card lifted off the desk, not to fake glassmorphism depth:

- `shadow-md` — resting state for most cards.
- `shadow-lg` / `shadow-xl` — CTA buttons, modals, hover-lifted states.
- Never combine shadow with `backdrop-blur` on a content card (that's glassmorphism — banned, see §11).

---

## 3. The `custom-wiggle-border` Utility

This is the single class every analog card applies alongside `border-2 border-slate-800`. It is defined in `app/globals.css`:

```css
.custom-wiggle-border {
  position: relative;
  isolation: isolate;
  border-radius: 3px 9px 5px 8px / 8px 4px 9px 3px;
}

.custom-wiggle-border::before {
  content: "";
  position: absolute;
  inset: -3px;
  border: inherit;
  border-radius: 9px 3px 8px 4px / 3px 8px 4px 9px;
  opacity: 0.35;
  transform: rotate(-0.75deg);
  pointer-events: none;
  z-index: -1;
}
```

**How it works:** the host element gets slightly irregular corner radii (each corner a different value — the classic CSS "hand-drawn rectangle" trick), and a `::before` pseudo-element duplicates the element's own border, offset by 3px and rotated a fraction of a degree at 35% opacity. The result reads as a second, fainter pen stroke behind the first — like someone traced the rectangle twice by hand. `isolation: isolate` keeps the pseudo-element's negative `z-index` scoped to the card itself so it never leaks behind sibling cards or the page background.

**Rules for using it:**
- Always pair with an explicit `border-2` (or `border-4`) + `border-{color}` utility — the class has no border of its own, it only echoes whatever border the host already declares.
- Never stack it with `rounded-full`, `rounded-xl`, etc. — the irregular radii it sets are already the "roundness" this design allows.
- It's subtle by design. If you need more visual noise, add a second decorative element (pushpin, tape strip, doodle) rather than cranking the class's opacity/rotation.

---

## 4. Component Pattern Catalog

Every new card must be one of these. Do not invent a ninth style without discussing it first.

| Style | Signature | Where used |
|---|---|---|
| **Sticky Note** | Solid color fill, folded-corner `clipPath`, matching darker-shade shadow triangle behind the fold | Onboarding steps, Features (yellow/green/pink), Contact email card |
| **Graph Paper** | `#f8fafc` + repeating 20px grid-line background, red/white pushpin dot top-center, inner `bg-white/90` content panel | Features analytics card, Contact location card, WhyUs "cloud access" |
| **Index / Flashcard** | White bg, faint repeating horizontal rule lines (`#3b82f6` at low opacity), red vertical "margin" line at `left-6`, `custom-wiggle-border` | Contact phone/WhatsApp cards, WhyUs "Built for Indian Schools" |
| **Chalkboard** | `#1e293b` fill, SVG fractal-noise "chalk dust" texture overlay, white/faded-icon watermark | Attendance left panel only |
| **Manila Folder** | Amber tabs (`#fef3c7`/`#fde68a`), brown borders (`#b45309`), raised active-tab state, silver clip decoration | Attendance right panel only |
| **Torn Paper Scrap** | Light fill (`#eff6ff`) with a jagged/torn bottom edge, dark top border only | WhyUs "Fast Implementation" |
| **Corkboard / Pushpin** | Any card topped with a small `rounded-full` pin (`bg-red-500` + tiny white highlight dot), simulating something tacked to a board | Graph paper cards, floating annotation pills in Apps |
| **Clipboard Modal** | `#fffdf0` fill, gray "clip" bar top-center, dashed-underline form inputs, full-screen on mobile / floating panel on desktop | Demo request dialog (Hero, WhyUs) |

---

## 5. Data-Driven Card Convention

Sections with 3+ repeated cards (Features, Apps, WhyUs) define a typed data array with a `style` discriminant and render via a `.map()` + switch, rather than hand-duplicating JSX per card. Example shape:

```tsx
const items = [
  { id: "phone", style: "index", rotate: -1, /* ...content */ },
  { id: "email", style: "sticky", color: "bg-[#fef08a]", rotate: 1 },
];

items.map((item) => {
  switch (item.style) {
    case "index": return <IndexCard {...item} />;
    case "sticky": return <StickyCard {...item} />;
  }
});
```

**Apply this whenever a section has 3 or more visually-similar cards** — it keeps rotation/color/copy edits to one array instead of hunting through repeated markup, and matches how Features/Apps/WhyUs are already built. Contact's four contact-method cards now follow this pattern (see §12).

---

## 6. Section Anatomy

Every section (except Header/Footer, which have their own layout) opens with the same three-tier header, centered, above its content:

```tsx
<motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, type: "spring" }}
    viewport={{ once: true }}
    className="text-center mb-20 relative"
>
    {/* 1. Label tag */}
    <div className="relative inline-flex items-center gap-2 mb-6">
        <SomeIcon className="w-6 h-6 text-[#d81b60]" />
        <span className={`${markerFont.className} text-[#d81b60] text-xl tracking-widest uppercase`}>
            Short Label Text
        </span>
        <svg className="absolute w-full h-3 -bottom-2 left-0 text-[#d81b60]" viewBox="0 0 100 10" preserveAspectRatio="none">
            <path d="M0 5 Q 50 10 100 2" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
    </div>

    {/* 2. Heading */}
    <h2 className={`${markerFont.className} text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-slate-900`}>
        MAIN HEADING IN ALL CAPS
    </h2>

    {/* 3. Sub-heading */}
    <p className={`${handwrittenFont.className} text-xl md:text-2xl text-slate-700 max-w-2xl mx-auto leading-relaxed`}>
        Descriptive sentence in mixed case.
    </p>
</motion.div>
```

Variants (a taped-label box in Features, a highlight block in WhyUs) are allowed for the label tier only — the label → h2 → p, three-tier, centered structure itself is not optional. **Contact previously broke this rule** (left-aligned header embedded inside the two-column grid) — it has been brought into line as part of this redesign; see §12.

---

## 7. Motion & Interaction Library

All motion is **Framer Motion** (`framer-motion` import only — never `motion/react`).

**Entrance (scroll-triggered), the default for any section content:**
```tsx
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
viewport={{ once: true, margin: "-100px" }}
```

**Rotated card entrance** (cards that rest at a tilt spring in from double that tilt):
```tsx
initial={{ opacity: 0, scale: 0.8, rotate: item.rotate * 2 }}
whileInView={{ opacity: 1, scale: 1, rotate: item.rotate }}
```

**Hover** — every interactive card straightens and lifts:
```tsx
whileHover={{ scale: 1.03, rotate: 0, zIndex: 20, transition: { duration: 0.2 } }}
```

**Stagger** (nav items, icon rows, card grids):
```tsx
transition={{ delay: 0.2 + (i * 0.1), type: "spring", stiffness: 120 }}
```

**Ambient float** (sticky notes, floating callouts):
```tsx
animate={{ y: [0, -10, 0] }}
transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
```

**Hard rule:** `viewport={{ once: true }}` is mandatory on every scroll animation. Animations play once on first view and never repeat — a user scrolling back up should never see the entrance replay.

---

## 8. Iconography

- **Lucide React** for everything except WhatsApp.
- **`@tabler/icons-react`** `IconBrandWhatsapp` for WhatsApp — the only reason this second icon package exists in the project. Don't reach for it for anything else.
- Stroke weight: `stroke-[2]` default, `stroke-[1.5]` for large decorative icons, `stroke-[2.5]` for small/dense icons (nav bar).
- Icons sit inside a bordered circle/square badge (`rounded-full border-2 border-slate-800`) when representing a contact method or feature, or float free as background doodles at `opacity-15` to `opacity-50` when purely decorative.

---

## 9. Responsive Rules

Mobile-first. These are fixed, not per-component judgment calls:

| Pattern | Mobile | `md` | `lg` |
|---|---|---|---|
| Section padding | `py-20 px-4` | `py-24 px-6` | `px-12` |
| Container | `w-full` | — | `max-w-7xl mx-auto` |
| Two-column sections (Hero, Contact, Attendance) | stacked | — | `lg:grid-cols-2` (or `12`-col split) |
| Grid sections (Features, WhyUs, Footer) | `grid-cols-1` | `md:grid-cols-2` | `lg:grid-cols-3` / `4` / `6` |
| Device sketches (Apps) | hidden | — | `hidden lg:flex` |

Text scaling is always three-tier and responsive — never a bare fixed size on headings:
```
text-4xl md:text-5xl lg:text-6xl   → section h2
text-3xl md:text-4xl               → card headings
text-xl md:text-2xl                → body / sub-headings
```

---

## 10. Accessibility

The scrapbook aesthetic must never come at the cost of usability:

- **Contrast:** body text on any sticky/colored background must be `slate-800`/`slate-900`, never a light tint — check new sticky colors against WCAG AA before adding them to the palette in §2.
- **Motion:** every `whileHover`/ambient-float animation is purely additive polish; nothing conveys information through motion alone.
- **Links vs. static content:** if a card is clickable (`tel:`, `mailto:`, `wa.me`), it must be an `<a>`/`motion.a` with a real `href`, not a `<div>` with an `onClick`. Static info-only cards (e.g. an address with no map link) stay as `<div>`/`motion.div` — don't fake affordance either direction.
- **Icon-only controls** (e.g. header contact icons) should carry `aria-label` describing the destination ("Call us", "Chat on WhatsApp", "Email us") since the icon alone isn't a discoverable link for screen readers.
- **Reduced motion:** decorative infinite-loop animations (floating sticky notes, chalk dust) are cosmetic only and safe to leave running, but avoid introducing anything that loops indefinitely *and* is large/distracting near body copy.

---

## 11. Do / Don't Reference

| ❌ Don't | ✅ Do |
|---|---|
| `rounded-full` / `rounded-xl` on content cards | Sharp corners + `custom-wiggle-border` |
| Gradients on CTA buttons | Solid `bg-[#d81b60]` |
| `backdrop-blur` glassmorphism cards | Paper/stationery styles from §4 |
| Inter/Roboto/Geist for content copy | `Permanent_Marker` (headings) + `Kalam` (body) only |
| `text-gray-*` / `text-neutral-*` body text | `text-slate-700` / `text-slate-800` |
| `dark:` variants in landing components | Light-only landing page |
| `motion/react` import | `framer-motion` only |
| A left-aligned or off-pattern section header | The 3-tier label → h2 → p pattern (§6), centered |
| Repeating near-identical card JSX 3+ times | Data array + style switch (§5) |
| Skipping `viewport={{ once: true }}` | Always include it |
| A second CTA color "because it's near a green/blue card" | One accent (`#d81b60`) for all primary actions |

---

## 12. Contact Section — Design Rationale

The Contact section (`app/components/Contact.tsx`) was redesigned to actually conform to the rules above, since it had drifted from them:

1. **Header pattern compliance.** It previously ran its "GET IN TOUCH" heading left-aligned inside the cards column, skipping the label tag and not matching any other section. It now uses the standard centered label → h2 → p header (§6) above the two-column layout, with a `MessageCircle` label icon and wavy underline.
2. **Data-driven cards.** Phone, WhatsApp, and Email were three near-identical `motion.a` blocks with only color/icon/copy differing — now a single `contactMethods` array rendered through a style switch (`index` / `sticky`), per §5, matching the convention already used in Features/Apps/WhyUs.
3. **Bento-style card grid.** Phone and WhatsApp sit side-by-side (`grid-cols-2`) as Index cards; Email spans the full width as a wide Sticky card; Location spans full width as a Graph Paper card below — mirroring the asymmetric grid logic from Features.tsx instead of one long single-column stack.
4. **Fixed a content bug.** The email card linked `mailto:support@nextorg.in` but displayed `info@nextorg.in` — a mismatch between the link target and its visible label. It now displays the address it actually links to.
5. **`custom-wiggle-border` now renders.** Since this section leans on it more than any other (four separate cards), implementing the utility (§3) benefits Contact most visibly, while remaining a site-wide, purely additive fix.
6. **Globe column preserved.** The interactive globe and floating "We are here!" note are the section's signature visual and were kept, with copy/positioning tightened to sit under the new centered header rather than beside a left-aligned one.
