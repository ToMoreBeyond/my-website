# Repository Guidelines

## Project Structure & Module Organization
- `src/app/`: Next.js App Router (pages, routes, layout, global CSS).
- `src/components/`: Reusable UI, sections, effects, and layout components.
- `src/lib/`: Animation and interaction helpers (GSAP, scroll, premium effects).
- `src/data/`: Local data sources (e.g., `products.ts`, `team.ts`).
- `public/`: Static assets (images, icons, favicon).
- Config: `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `tsconfig.json`.
- Deployment: `netlify.toml` (publishes from `out/`).

## Build, Test, and Development Commands
- `npm run dev`: Start dev server on `http://localhost:3000` with Turbopack.
- `npm run build`: Production build (`.next/`). For static export: `npm run build && npx next export -o out`.
- `npm start`: Run the production server from `.next/`.
- `npm run lint`: Lint code with Next/ESLint. Add `--fix` to auto-fix.

## Coding Style & Naming Conventions
- Language: TypeScript + React function components; App Router conventions.
- Indentation: 2 spaces; prefer named exports; components in `PascalCase.tsx`.
- Styling: Tailwind CSS utilities; co-locate minor module CSS (e.g., `*.module.css`) when necessary.
- Imports: Use `@/` alias from `tsconfig` for absolute paths.
- Keep components focused; split UI into `components/{ui|sections|effects|common}/`.

## UI Components — shadcn/ui (REQUIRED)
- **All UI must be built with [shadcn/ui](https://ui.shadcn.com) components.** Before writing a custom styled `div`, check for an existing shadcn component.
- Config: `components.json` (style `radix-nova`, baseColor `neutral`, icons `lucide`). Installed components live in `src/components/ui/`.
- Add components with `npx shadcn@latest add <name>`; never re-add an installed one.
- Use **semantic color tokens** only (`bg-primary`, `text-muted-foreground`, `bg-card`) — no raw colors (`bg-blue-500`) or inline hex.
- Prefer built-in variants (`variant`, `size`) over custom classes; `className` is for layout, not color/typography overrides.
- Spacing via `gap-*` (not `space-x/y-*`); equal w/h via `size-*`; conditional classes via `cn()` from `@/lib/utils`.
- Tone: warm cream paper (inspired by teracy.io), deep warm-brown ink for text, and a single sky-blue accent `brand` (the logo's center dot). Buttons and dark blocks (footer, CTA) are ink with cream text. Headings: Noto Sans JP, bold, tight (-0.03em); one-line phrases in BIZ UDPMincho (`font-mincho`); Latin display in Bricolage Grotesque (`font-display`); playful digits in DSEG7 (`font-seg`). Generous whitespace, one message per block. Restrained framer-motion / gsap motion that respects `prefers-reduced-motion`. Don't introduce additional accent colors.
- Skill reference: `.agents/skills/shadcn/` (`SKILL.md`, `rules/`). Use `npx shadcn@latest docs <component>` for current APIs.

## Testing Guidelines
- No test suite yet. Prefer: Jest + React Testing Library for units; Playwright for e2e.
- Place tests under `__tests__/` or alongside files: `ComponentName.test.tsx`.
- Run locally: `npx jest` (once configured) and `npx playwright test` for e2e.
- Aim for critical-path coverage (routing, data rendering, interactions).

## Commit & Pull Request Guidelines
- Commits: Clear, imperative messages (optionally Conventional Commits, e.g., `feat: add Team section`).
- PRs: Include summary, rationale, screenshots for UI changes, and steps to test.
- Link related issues; keep PRs scoped and reviewable (< ~300 lines when possible).

## Security & Configuration Tips
- Secrets: Use `.env.local` (gitignored). Never commit credentials.
- If adding public env vars, surface via `next.config.ts` as needed.
- Netlify: `publish = "out"` expects static export; ensure `next export` runs in CI.
