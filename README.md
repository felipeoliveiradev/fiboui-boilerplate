# FiboUI Boilerplate

Next.js App Router starter for building apps with [FiboUI](https://fiboui.vercel.app).

Clean-architecture modules live under `src/modules/`. Routes live under `app/`. Pages are client islands that paint FiboUI builders; the shell uses Next for routing and SSR layout.

## Stack

- Next.js 16 (App Router)
- React 19
- FiboUI `^2.7.1` (npm)
- Lucide icons

## Modules

| Path | Role |
|------|------|
| `src/modules/todo` | Todo list (Form, List, Store ViewModel) |
| `src/modules/performance` | Map / sheet demo |

## Routes

| URL | Page |
|-----|------|
| `/` | Todo |
| `/todo` | Todo |
| `/performance` | Performance |

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run typecheck
```

## Local FiboUI (optional)

To develop against the monorepo instead of npm:

```bash
npm install ../fiboui --install-links
```

`transpilePackages: ['fiboui']` is already set in `next.config.ts`.

## Notes

- Prefer `next/navigation` (`useRouter`) over FiboUI `Router` / `useNavigate`.
- Interactive FiboUI trees stay in `'use client'` pages. The root layout stays a server component and only wraps `FiboThemeProvider`.
- This project replaced the Vite boilerplate that used to live inside the `fiboui` repo.
