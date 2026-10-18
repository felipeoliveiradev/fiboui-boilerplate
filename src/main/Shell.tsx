import { BottomBar, Box, Button, Column, Row, Text, type FiboChild } from 'fiboui'
import { go } from './go'
import { chalk, ink, lime, line, muted } from './tokens'

export function shell(
  kicker: string,
  title: string,
  here: 'todo' | 'performance',
  body: FiboChild
) {
  const other = here === 'todo' ? '/performance' : '/todo'

  return Column()
    .theme('noir')
    .width('100%')
    .minHeight('100vh')
    .bg(ink)
    .children([
      Row()
        .width('100%')
        .alignItems('end')
        .justifyContent('space-between')
        .paddingHorizontal(24)
        .paddingVertical(20)
        .style({ borderBottom: `1px solid ${line}` })
        .children([
          Column()
            .gap(8)
            .children([
              Text(kicker)
                .fontSize(9)
                .fontWeight('800')
                .color(lime)
                .textCase('uppercase')
                .style({ letterSpacing: '0.16em', lineHeight: 1 }),
              Text(title)
                .fontSize(40)
                .fontWeight('800')
                .color(chalk)
                .textCase('uppercase')
                .style({ letterSpacing: '-0.04em', lineHeight: 0.9 }),
            ]),
          Button()
            .clean()
            .onPress(() => go(other))
            .props({ 'aria-label': 'Go' })
            .children(
              Box()
                .bg(lime)
                .paddingHorizontal(22)
                .paddingVertical(14)
                .children(
                  Text('GO')
                    .fontSize(13)
                    .fontWeight('800')
                    .color(ink)
                    .textCase('uppercase')
                    .style({ letterSpacing: '0.14em' })
                )
            ),
        ]),
      Box().width('100%').flex(1).children(body),
      BottomBar()
        .width('100%')
        .bg(ink)
        .paddingHorizontal(24)
        .paddingVertical(16)
        .style({ borderTop: `1px solid ${line}`, gap: 28 })
        .value(here)
        .items([
          {
            value: 'todo',
            label: Text('List')
              .fontSize(11)
              .fontWeight('800')
              .color(here === 'todo' ? lime : muted)
              .textCase('uppercase')
              .style({ letterSpacing: '0.12em' }),
            onPress: () => go('/todo'),
          },
          {
            value: 'performance',
            label: Text('Board')
              .fontSize(11)
              .fontWeight('800')
              .color(here === 'performance' ? lime : muted)
              .textCase('uppercase')
              .style({ letterSpacing: '0.12em' }),
            onPress: () => go('/performance'),
          },
        ]),
    ])
}
