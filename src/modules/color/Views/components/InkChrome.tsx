import { Box, Button, Column, Row, Text, useScaffold } from 'fiboui'
import type { InkStep } from '../../Models/InkBoard'
import { chalk, ink, lime, muted } from '@/src/main/tokens'

export function InkFab() {
  const api = useScaffold()
  return Button()
    .clean()
    .onPress(() => api.showSheet())
    .props({ 'aria-label': 'Steps' })
    .children(
      Box()
        .width(52)
        .height(52)
        .bg(lime)
        .alignX('center')
        .alignY('center')
        .children(Text('+').fontSize(26).fontWeight('800').color(ink))
    )
    .build()
}

export function StepSheet({ steps }: { steps: InkStep[] }) {
  const api = useScaffold()
  return Column()
    .width('100%')
    .bg(ink)
    .children([
      Row()
        .width('100%')
        .children(
          steps.map((step) =>
            Box()
              .height(72)
              .bg(step.color)
              .flex(1)
          )
        ),
      Row()
        .width('100%')
        .justifyContent('space-between')
        .padding(16)
        .children([
          Text('Dark').fontSize(11).fontWeight('800').color(muted).textCase('uppercase'),
          Button()
            .clean()
            .onPress(() => api.hideSheet())
            .children(Text('Close').fontSize(11).fontWeight('800').color(chalk).textCase('uppercase')),
          Text('Light').fontSize(11).fontWeight('800').color(muted).textCase('uppercase'),
        ]),
    ])
    .build()
}
