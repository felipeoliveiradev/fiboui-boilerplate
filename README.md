# FiboUI Boilerplate

Next.js is only the host. Screens, state, and navigation are FiboUI.

## Stack

- Next.js 16 (one catch-all route)
- FiboUI `^2.7.1`
- `noir` theme, same ink / chalk / lime / pink as the product site

## Navigation

`go()` in `src/main/go.ts` pushes the URL and notifies the FiboUI `Router`. The lime **GO** button and the bottom bar both call it. Do not use `next/navigation`.

```ts
import { go } from '@/src/main/go'

go('/performance')
go('/todo')
```

## Screens

| URL | Screen |
|-----|--------|
| `/`, `/todo` | Todo list |
| `/performance` | Board (map, live earnings) |

State lives in `@Store()` classes. A list is a `listSignal`: `add`, `update`, `remove`, and `viewWhere` for the active filter. Pages use `getStore()` and `.observer()`. No `useState` or `useEffect`.

## Commands

```bash
npm install
npm run dev
npm run build
npm run typecheck
```

Local library instead of npm:

```bash
npm install ../fiboui --install-links
```
