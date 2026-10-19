import { Box, Column, Row, Text } from 'fiboui'
import { chalk, lime, line, muted } from '@/src/main/tokens'
import type { TripData } from '../../Models/PerformanceData'

export function statFigure(value: string, label: string) {
  return Column()
    .gap(6)
    .children([
      Text(value).fontSize(18).fontWeight('800').color(chalk).letterSpacing('-0.03em').lineHeight(1),
      Text(label)
        .fontSize(10)
        .fontWeight('800')
        .color(lime)
        .textCase('uppercase')
        .letterSpacing('0.14em'),
    ])
}

export function TripRow(trip: TripData, open: (id: string) => void) {
  return Row()
    .width('100%')
    .alignItems('center')
    .justifyContent('space-between')
    .gap(16)
    .paddingVertical(18)
    .borderTop(`1px solid ${line}`)
    .cursor('pointer')
    .onClick(() => open(trip.id))
    .children([
      Row()
        .alignItems('center')
        .gap(12)
        .flex(1)
        .minWidth(0)
        .children([
          Box().width(10).height(10).bg(trip.color).flexShrink(0),
          Column()
            .gap(6)
            .minWidth(0)
            .children([
              Text(trip.origin).fontSize(16).fontWeight('800').color(chalk).letterSpacing('-0.03em').lineHeight(1),
              Text(`${trip.destination}  ·  ${trip.duration}`)
                .fontSize(12)
                .color(muted)
                .lineHeight(1.3),
            ]),
        ]),
      Text(`€ ${trip.earnings.toFixed(2)}`)
        .fontSize(14)
        .fontWeight('800')
        .color(lime)
        .letterSpacing('-0.03em')
        .lineHeight(1)
        .whiteSpace('nowrap')
        .flexShrink(0),
    ])
}
