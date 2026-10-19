import { Box, Text, tone } from 'fiboui'

export function InkTile(name: string, color: string) {
  return Box()
    .padding(16)
    .bg(color)
    .minHeight(104)
    .children(
      Text(name)
        .fontSize(12)
        .fontWeight('800')
        .color(tone.on(color))
        .textCase('uppercase')
        .letterSpacing('0.14em')
    )
}
