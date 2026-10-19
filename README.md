# FiboUI Boilerplate

Next.js is only the host. Screens, state, and navigation are FiboUI.

## Stack

- Next.js 16 (one catch-all route)
- FiboUI `^2.8.1`
- `noir` theme, same ink / chalk / lime / pink as the product site

## Navigation

The lime **GO** button, the bottom bar, and the top-left menu call `useRouter().navigate()`. The app does not touch `window` or the DOM. Do not use `next/navigation`.

```ts
const router = useRouter()
router.navigate('/performance')
```

## Screens

| URL | Screen |
|-----|--------|
| `/`, `/todo` | Todo list |
| `/performance` | Board (map, live earnings) |
| `/color` | Ink |
| anything else | 404, same scaffold (menu, bar, GO) |

State lives in `@Store()` classes. A list is a `listSignal`: `add`, `update`, `remove`, and `viewWhere` for the active filter. Pages use `getStore()` and `.observer()`. No `useState` or `useEffect`.

Each screen is a module: `Models`, `Services`, `ViewModels`, `Views`. List is `todo`, the map is `performance`, the color sheet is `color`, and unknown routes, faults, and the waiting screen are `status`.

`npm install` copies `fiboui/dist/style.css` to `app/fiboui.css`. The map screen also depends on `leaflet`.

## Commands

```bash
npm install
npm run dev
npm run build
npm run typecheck
```
