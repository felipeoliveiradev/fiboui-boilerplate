import { BottomBar, Text, useRouter } from 'fiboui'
import { MenuButton, PageDrawer, type Here } from './Menu'
import { ink, lime, muted } from './tokens'

export type { Here }
export { MenuButton, PageDrawer }

/** Flutter bottomNavigationBar. */
export function bottomNav(here: Here | null) {
  const router = useRouter()
  return BottomBar()
    .width('100%')
    .bg(ink)
    .paddingHorizontal(24)
    .paddingVertical(16)
    .gap(28)
    .value(here ?? 'status')
    .items([
      {
        value: 'todo',
        label: Text('List')
          .fontSize(11)
          .fontWeight('800')
          .color(here === 'todo' ? lime : muted)
          .textCase('uppercase')
          .letterSpacing('0.12em'),
        onPress: () => router.navigate('/todo'),
      },
      {
        value: 'performance',
        label: Text('Board')
          .fontSize(11)
          .fontWeight('800')
          .color(here === 'performance' ? lime : muted)
          .textCase('uppercase')
          .letterSpacing('0.12em'),
        onPress: () => router.navigate('/performance'),
      },
      {
        value: 'color',
        label: Text('Ink')
          .fontSize(11)
          .fontWeight('800')
          .color(here === 'color' ? lime : muted)
          .textCase('uppercase')
          .letterSpacing('0.12em'),
        onPress: () => router.navigate('/color'),
      },
    ])
}
