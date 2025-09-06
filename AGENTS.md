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
