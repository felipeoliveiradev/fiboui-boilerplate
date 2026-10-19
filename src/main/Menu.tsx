import { Button, Column, Text, useRouter, useScaffold, type FiboChild } from 'fiboui'
import { chalk, ink, lime } from './tokens'

export type Here = 'todo' | 'performance' | 'color'

const pages: { here: Here; label: string; to: string }[] = [
  { here: 'todo', label: 'List', to: '/todo' },
  { here: 'performance', label: 'Board', to: '/performance' },
  { here: 'color', label: 'Ink', to: '/color' },
]

/** Top-left control. `face` is the icon or the text. The press still opens the drawer. */
export function MenuButton({ face }: { face?: FiboChild }) {
  const api = useScaffold()
  return Button()
    .clean()
    .onPress(() => api.openDrawer())
    .props({ 'aria-label': 'Menu' })
    .children(
      face ??
        Text('Menu')
          .fontSize(11)
          .fontWeight('800')
          .color(lime)
          .textCase('uppercase')
          .letterSpacing('0.14em')
    )
    .build()
}

/** Drawer listing the three pages. Navigation stays on the FiboUI router. */
export function PageDrawer({ here }: { here: Here | null }) {
  const api = useScaffold()
  const router = useRouter()
  return Column()
    .width('100%')
    .height('100%')
    .bg(ink)
    .padding(24)
    .gap(20)
    .children(
      pages.map((item) =>
        Button()
          .clean()
          .onPress(() => {
            api.closeDrawer()
            if (item.here !== here) router.navigate(item.to)
          })
          .children(
            Text(item.label)
              .fontSize(22)
              .fontWeight('800')
              .color(item.here === here ? lime : chalk)
              .textCase('uppercase')
              .letterSpacing('-0.03em')
          )
      )
    )
    .build()
}
