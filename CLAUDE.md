# CLAUDE.md — "Dev Room" one-page portfolio

You are helping build a **one-page portfolio site** for a full-stack engineer.
Concept: a cosy 3D developer room (modelled in Blender, rendered with Three.js) is the hero;
the rest of the page is a dark, terminal-flavoured, developer-native site.
Everything lives on **one page** — there are NO project detail pages. Each project tells its
whole story inside its own section block (tabs: Overview / Architecture / Code / Results).

Read this file fully before writing code. When in doubt, prefer: simple, fast, accessible.

---

## 1. Tech stack (do not swap without asking)

| Layer | Choice |
|---|---|
| Framework | **Next.js (App Router, latest stable) + React 19 + TypeScript (strict)** |
| Package manager | **pnpm** |
| Styling | **Tailwind CSS v4** (CSS-first config with `@theme` tokens) |
| Fonts | **Geist + Geist Mono** via the `geist` package (`next/font`) |
| 3D | **three** + **@react-three/fiber** + **@react-three/drei** |
| 3D post-processing | **@react-three/postprocessing** (Bloom only, subtle) |
| Scroll / timeline animation | **gsap** + **ScrollTrigger** via **@gsap/react** (`useGSAP`) |
| Smooth scroll | **lenis** (synced to GSAP ticker) |
| UI micro-animation | **motion** (Framer Motion) — tabs, hovers, mount transitions |
| Command palette | **cmdk** (⌘K / Ctrl+K) |
| Code highlighting | **shiki** (server-side, at build time) |
| Client state | **zustand** (only for cross-component 3D/UI state, e.g. `isLiteMode`, `activeSection`) |
| Validation | **zod** |
| Backend (inside Next.js) | Route Handlers under `app/api/v1/*` |
| Database | **PostgreSQL** (Neon or Supabase) + **drizzle-orm** |
| Rate limit / cache | **@upstash/ratelimit** + **@upstash/redis** |
| Email | **resend** (contact form notifications) |
| Analytics | `@vercel/analytics` |
| Lint / format | ESLint (next config) + Prettier + `prettier-plugin-tailwindcss` |
| Deploy | **Vercel** |

3D asset tooling (dev only): **Blender** → glTF export → `@gltf-transform/cli` (Draco + KTX2/WebP)
→ optionally `gltfjsx` to generate a typed `<Room />` component.

---

## 2. Project structure

```
app/
  layout.tsx            # fonts, metadata, <LenisProvider>, analytics
  page.tsx              # the ONE page: composes all sections in order
  not-found.tsx         # terminal-style 404
  opengraph-image.tsx   # OG image (render of the room)
  sitemap.ts, robots.ts
  api/v1/
    me/route.ts         # GET  → JSON about me (used by API playground)
    contact/route.ts    # POST → validate (zod) → rate-limit → save (drizzle) → email (resend)
components/
  layout/  Nav.tsx, CommandPalette.tsx, Footer.tsx, SkipToContent.tsx
  sections/ Hero.tsx, About.tsx, Skills.tsx, Projects.tsx, ProjectBlock.tsx,
            Experience.tsx, ApiPlayground.tsx, OpenSource.tsx, Contact.tsx
  three/   Scene.tsx (Canvas), Room.tsx (gltfjsx output), MonitorScreen.tsx (drei <Html>),
           FloatingBadges.tsx, CameraRig.tsx, Effects.tsx, Loader.tsx
  ui/      Button.tsx, Chip.tsx, Tabs.tsx, Terminal.tsx, SectionHeading.tsx, CodeBlock.tsx
content/   # ALL copy lives here as typed data — components never hard-code personal text
  profile.ts, skills.ts, projects.ts, experience.ts, testimonials.ts, links.ts
lib/       db.ts, schema.ts, ratelimit.ts, email.ts, shiki.ts, gsap.ts, utils.ts
store/     ui.ts (zustand)
public/
  models/room.glb       # compressed, target < 2.5 MB
  textures/             # baked lightmaps (KTX2 / WebP)
  cv.pdf
  fallback/room.webp    # pre-rendered still for lite mode / no-WebGL
```

---

## 3. Page sections (in this exact order, all on `/`)

Section ids are used by nav, ⌘K and anchors. Labels are styled as code comments: `// 01 — about`.

0. **Nav** (`header`) — left: `~/[name] $` in mono, accent-coloured path. Center: `./about ./skills ./projects ./experience ./contact`. Right: "Search or run a command ⌘K" button opening cmdk. Sticky, blurred background after scroll.
1. **Hero** (`#top`) — left: status pill (`● status: open to full-time & freelance`), H1 *"I build the **whole stack** — and make it feel fast."* (accent on "whole stack"), one-line intro, buttons: **View projects** (primary), `$ npx hire-[name]` (outline, scrolls to contact), **Download CV**. Hint: "drag the room to orbit · click the monitor to enter the terminal". Right: the **3D room** + a floating terminal window (`whoami`, `cat stack.json`, blinking cursor).
2. **About** (`#about`, `// 01`) — photo or low-poly Blender avatar with two floating chips (years shipping, city/timezone), headline, 2–3 sentence bio, 3 fact cards (Focus / Looking for / Languages), **Download CV (PDF)** + **Book a call**.
3. **Skills** (`#skills`, `// 02`, title `ls ~/stack`) — 5 cards: Frontend `/web`, Backend `/api`, Data `/db`, DevOps & Cloud `/infra`, Tools `/bin`, each with mono chips. Footer line: `$ currently learning: …`.
4. **Projects** (`#projects`, `// 03`, title `git log --featured`) — 3 `ProjectBlock`s, alternating left/right. Each block contains EVERYTHING about the project:
   - Visual: 3D-tilted laptop + phone mockup showing a screenshot/video (CSS 3D is fine; optional R3F device models later). Label `01 / 03 · a1f3c9e`.
   - Title + one-liner, meta grid (Role / Timeline / Team), stack chips.
   - **Tabs** (accessible `role="tablist"`, keyboard arrows):
     - **Overview** — `problem →`, `built →`, `hard part →` paragraphs.
     - **Architecture** — horizontal node flow (Web app → CDN → API → Postgres+Redis → Workers), API node highlighted with accent, animated packet dots on the arrows; short trade-off paragraph.
     - **Code** — one real snippet, highlighted with Shiki, filename header.
     - **Results** — 3 metric tiles + `learned →` line.
   - Buttons: **Live demo ↗** (primary), **Source on GitHub ↗**.
   - No links to other pages. No "read more".
5. **Experience** (`#experience`, `// 04`, title `git log --author=me`) — vertical commit timeline: dot (current role glows in accent + `HEAD` badge), short hash, dates, `Role @ Company`, impact line, tech chips. Below: Education & certifications card (dashed border). Left column has "Full CV (PDF) ↓".
6. **API playground** (`#api`, `// 05`, "Query me like a backend.") — method pill `GET`, input prefilled `/api/v1/me`, **Send ⏎** → real `fetch` to our route, render status line + pretty JSON. Handle loading and error states.
7. **Open source & kind words** (`#oss`, `// 06`, "Shipping in public") — GitHub contribution grid (fetch at build/ISR from GitHub GraphQL API with a token in env; fall back to hiding the grid), 3 pinned repos, 2 testimonial cards (`figure/blockquote/figcaption`). Hide testimonials if `content/testimonials.ts` is empty.
8. **Contact** (`#contact`, `// 07`, H2 `$ ./say-hello.sh`) — terminal-style form: labels `--name`, `--email`, `--message`, button **Execute ⏎**. POST to `/api/v1/contact`; show inline terminal-style success/error output. Honeypot field + rate limit.
9. **Footer** — `© {year} [Name] · built with Next.js, R3F & Blender`, social links, `last deploy: <git sha / date>` injected at build.

Also:
- **Loader**: full-screen terminal boot log driven by drei `useProgress` (`[ ok ] loading room.glb …` + progress bar + "press S to skip 3D"). Fades out as the camera dollies in. Never block text content: the HTML page renders immediately, only the canvas area waits.
- **404** (`app/not-found.tsx`): `$ cd /this-page` → red `no such file or directory`, huge faint "404", buttons back home and to `#projects`.

---

## 4. Design tokens

Dark theme only. Define in `app/globals.css` with Tailwind v4 `@theme`:

```css
@theme {
  --color-bg: #0A0E1A;          /* page */
  --color-bg-alt: #0C1120;      /* alternating section bands */
  --color-surface: #0E1426;     /* cards */
  --color-surface-sunk: #0A0F1E;/* code blocks, inputs */
  --color-border: #1F2640;
  --color-border-strong: #252C40;
  --color-text: #E6EAF5;
  --color-text-muted: #AEB5C8;
  --color-text-subtle: #8B93A8; /* min for small text — keep ≥ 4.5:1 */
  --color-accent: #38BDF8;      /* sky — primary accent (single source of truth) */
  --color-ok: #4ADE80;          /* prompts, success, status */
  --color-err: #F87171;
  --color-code-kw: #C084FC;
  --color-code-fn: #7DD3FC;
  --color-code-str: #FCD34D;
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --radius-card: 16px;
  --radius-control: 12px;
}
```

Rules:
- Typography: headings Geist 600, tight tracking (`-0.035em` to `-0.045em`); H1 `clamp(48px, 6.4vw, 92px)`, H2 `clamp(36px, 4.4vw, 60px)`. Labels, chips, nav, terminal = Geist Mono 11–14px.
- Layout: `max-w-[1320px] mx-auto px-10` (px-5 on mobile), section padding ~120px desktop / 32–56px mobile.
- Cards: `bg-surface border border-border rounded-[16px]`. No gradient washes, no left-border cards, no emoji icons — use inline stroke SVG or `lucide-react`.
- Buttons: primary = accent bg + `#06101F` text; secondary = outline `border-strong`. Min touch target 44px.
- Accent colour must come from one token so it can be changed in one place.

---

## 5. 3D room spec

- **Model (Blender)**: isometric-friendly room corner — two walls + floor, desk, monitor, keyboard, mug, server rack with LED strip, window, shelf with poster, plant. Low poly, ~50–80k tris total.
- **Lighting**: bake lighting/AO into textures in Blender (Cycles bake). In Three.js use `MeshBasicMaterial` with baked maps; only LEDs, monitor glow and window use emissive/bloom.
- **Export**: glTF binary, then `gltf-transform optimize room.glb public/models/room.glb --compress draco --texture-compress webp` (or KTX2). Target ≤ 2.5 MB total. Run `npx gltfjsx public/models/room.glb -t -o components/three/Room.tsx`.
- **Monitor**: drei `<Html transform occlude>` on the screen mesh rendering a real `<Terminal />` component (log lines: `pnpm dev`, `GET /api/projects 200`, blinking cursor).
- **Interaction**:
  - Gentle parallax on pointer move (CameraRig lerps camera position, max ±0.3 units).
  - Drag to orbit with drei `PresentationControls` (limited polar/azimuth, snap back).
  - Click monitor → GSAP tween camera into the screen, then smooth-scroll to `#about`.
  - LEDs blink via a tiny uniform/emissive animation in `useFrame`.
  - Floating tech badges (TS, Go, PG, `{ }`) with drei `<Float>`.
- **Scroll**: as the hero leaves the viewport, ScrollTrigger dollies the camera back slightly and fades the canvas; pause rendering when off-screen (`frameloop="demand"` + invalidate, or IntersectionObserver toggling `frameloop`).
- **Effects**: Bloom only (`luminanceThreshold` high, intensity low). No heavy post on mobile.

---

## 6. Performance & accessibility (definition of done)

- Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, SEO 100.
- Hero text + nav are server-rendered and visible before any JS/3D. `Scene` is loaded with `next/dynamic({ ssr: false })` and only after `requestIdleCallback` / first interaction.
- **Lite mode** (zustand `isLiteMode`): auto-on when `prefers-reduced-motion`, no WebGL2, `navigator.hardwareConcurrency <= 4`, or `saveData`. Lite mode shows `public/fallback/room.webp` instead of the canvas and disables Lenis + GSAP scroll effects. Provide a visible toggle in ⌘K ("Toggle 3D").
- Mobile (< 768px): lower DPR (`dpr={[1, 1.5]}`), no bloom, no PresentationControls (tap-to-rotate only), simplified layout per section (projects stay as blocks with tabs).
- Respect `prefers-reduced-motion` everywhere (CSS + GSAP `matchMedia`).
- Semantic HTML: one `h1`; sections with `aria-labelledby`; real `<button>`/`<a>`; labelled form fields; tabs follow WAI-ARIA Tabs pattern; visible focus rings (accent outline). Text contrast ≥ 4.5:1.
- Images via `next/image`; fonts via `next/font` (no layout shift).

---

## 7. Backend details

- `GET /api/v1/me` → returns `profile` from `content/profile.ts` (name, role, available, location, links). Cache: `revalidate = 3600`. CORS open for GET.
- `POST /api/v1/contact` → zod schema `{ name: string(1..80), email: email, message: string(10..4000), company?: '' (honeypot) }` → Upstash rate limit (5 / 10 min per IP) → insert into `messages` table (drizzle) → send email via Resend → `201 { ok: true }`. Errors return `{ ok: false, error }` with proper status codes.
- Drizzle schema: `messages(id uuid pk, name text, email text, message text, created_at timestamptz default now())`.
- Env vars (document in `.env.example`, never commit secrets): `DATABASE_URL`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `GITHUB_TOKEN`, `NEXT_PUBLIC_SITE_URL`.

---

## 8. SEO / meta

- `metadata` in `layout.tsx`: title `[Name] — Full-stack engineer`, description, canonical, Open Graph + Twitter card using `opengraph-image.tsx`.
- JSON-LD `Person` schema (name, jobTitle, url, sameAs: GitHub/LinkedIn).
- `sitemap.ts` (only `/`), `robots.ts`, favicon + apple icon.

---

## 9. Commands

```bash
pnpm dev          # local dev
pnpm build        # production build (must pass with zero TS/ESLint errors)
pnpm lint
pnpm typecheck    # tsc --noEmit
pnpm db:generate  # drizzle-kit generate
pnpm db:migrate   # drizzle-kit migrate
pnpm optimize:glb # gltf-transform optimize on /assets/room-raw.glb → /public/models/room.glb
```

---

## 10. Coding conventions

- TypeScript strict; no `any`. Server Components by default; add `"use client"` only where needed (3D, tabs, forms, cmdk, Lenis).
- All personal copy and data in `content/*.ts` with exported types (`Project`, `Job`, `Skill`, …). Placeholders look like `[Project name]` until the owner fills them in — never invent facts, metrics, employers or testimonials.
- One component per file, PascalCase; hooks `useX`; keep components < ~200 lines.
- Tailwind classes only (no CSS modules), sorted by the Prettier plugin. Shared patterns go into `components/ui/*`.
- GSAP: register plugins once in `lib/gsap.ts`; always use `useGSAP` with a scope and let it clean up.
- R3F: never `setState` inside `useFrame`; mutate refs. Dispose nothing manually that drei manages.
- Commit style: Conventional Commits (`feat:`, `fix:`, `perf:`, `chore:`).

### Commits — the owner commits, not Claude

- **Never run `git commit`, `git push` or stage files.** The owner makes every commit themselves.
- After each component (or other self-contained change) is created and checks pass, end the reply with a
  ready-to-paste commit message in a fenced block, Conventional Commits style:

  ```
  feat(sections): add Skills section with stack cards
  ```

  Subject ≤ 72 chars, imperative mood; add a short body only when the change needs context.
  List the files the commit should include if they aren't obvious from `git status`.

---

## 11. Build order (work in this sequence, one PR-sized step at a time)

1. Scaffold Next.js + Tailwind v4 + fonts + tokens + ESLint/Prettier. Static `page.tsx` with all section shells and ids.
2. `content/*` typed data with placeholders; build all sections as static HTML/CSS (no 3D yet) — desktop + mobile.
3. Nav, ⌘K palette (jump to sections, copy email, toggle 3D, open CV), Lenis + GSAP reveal animations (headings slide up from a mask, cards fade/translate 24px, stagger 0.06s, `expo.out`, 0.9s).
4. Projects tabs (Motion `layoutId` underline), architecture node flow with animated packets, Shiki code blocks.
5. API routes (`/me`, `/contact`), DB, rate limit, email; wire API playground + contact form.
6. 3D: placeholder primitives room in R3F first → then swap in the Blender GLB, baked textures, monitor `<Html>`, CameraRig, badges, bloom, loader.
7. Lite mode, reduced motion, mobile tuning, offscreen pausing.
8. SEO, OG image, 404, analytics, Lighthouse pass, deploy to Vercel.

Before finishing any step: run `pnpm typecheck && pnpm lint && pnpm build`.
