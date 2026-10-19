import type { ListEntity } from 'fiboui'
import { Checkbox, Row, Text, When } from 'fiboui'
import { chalk, lime, line, muted } from '@/src/main/tokens'
import { Todo } from '../../Models/Todo'

type Paint = {
  bg(value: string): Paint
  color(value: string): Paint
  borderColor(value: string): Paint
}

export function TodoItem(todo: ListEntity<Todo>) {
  const title = Text(todo.text).fontSize(16).fontWeight('600').color(todo.isCompleted ? muted : chalk)
  return Row()
    .width('100%')
    .alignY('center')
    .gap(12)
    .paddingVertical(14)
    .paddingHorizontal(12)
    .borderBottom(`1px solid ${line}`)
    .when(When.hover, (s: Paint) => s.bg(lime).color('#000').borderColor('transparent'))
    .children([
      Checkbox()
        .checked(todo.isCompleted)
        .controlled(true)
        .when(When.on, (s: Paint) => s.bg(lime).borderColor('transparent'))
        .when(When.off, (s: Paint) => s.bg('transparent').borderColor(line)),
      todo.isCompleted ? title.strikethrough() : title,
    ])
}
