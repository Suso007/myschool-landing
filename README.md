# NEXTORG — School Management ERP Landing Page

This is the official landing and marketing page for NextOrg, a cloud-based School Management ERP targeted at Indian schools (CBSE, ICSE, State Board).

The site features a unique "Analog / Scrapbook" aesthetic designed to simulate a physical school desk, utilizing notebook paper backgrounds, hand-drawn elements, and stationery-styled components.

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **3D Components:** Aceternity UI Globe (Three.js / React Three Fiber)
- **UI Primitives:** shadcn/ui
- **Fonts:** `Permanent_Marker` (headings) and `Kalam` (body) from Google Fonts
- **Package Manager:** `pnpm`

## Getting Started

This project uses `pnpm` as its package manager. Please ensure you have it installed.

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Run the development server:**
   ```bash
   pnpm dev
   ```

3. **Open the application:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

The project is structured using the Next.js App Router:

- `app/page.tsx` — The main landing page orchestrator that assembles all sections.
- `app/components/` — The live, active components that make up the page sections (Hero, Features, Contact, etc.).
- `components/ui/` — Reusable UI primitives (shadcn/ui) and the 3D globe component.
- `app/api/` — API routes, including the `/api/demoSchedule` endpoint for form submissions.
- `public/` — Static assets like images and fonts.

> **Note:** The `app/sections/` directory contains legacy draft components and should not be used.

## Design & Contribution Guidelines

**CRITICAL:** Before making any additions or updates to the components or design, please read the [claude.md](./claude.md) file located in the root directory.

It serves as the single source of truth for the project's design system, including:
- The analog/scrapbook design rules.
- Component anatomy and section header patterns.
- Responsive design conventions and breakpoints.
- A strict "What NOT To Do" list to maintain visual consistency.
- Pre-commit checklists.

Following these guidelines ensures the landing page maintains its cohesive, hand-drawn aesthetic.

## API Integration

The landing page captures demo requests through forms in the Hero and Why Us sections. These forms `POST` data to the `/api/demoSchedule` route.

Payload shape:
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "preferredtimeslot": "string"
}
```
