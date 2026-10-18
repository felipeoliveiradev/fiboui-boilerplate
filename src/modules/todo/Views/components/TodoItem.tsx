import type { ListEntity } from 'fiboui'
import { Checkbox, Row, Text } from 'fiboui'
import { chalk, line, muted } from '@/src/main/tokens'
import { Todo } from '../../Models/Todo'

export function TodoItem(todo: ListEntity<Todo>, onToggle: () => void) {
  const title = Text(todo.text).fontSize(16).fontWeight('600').color(todo.isCompleted ? muted : chalk)
  return Row()
    .width('100%')
    .alignItems('center')
    .gap(12)
    .paddingVertical(14)
    .style({ borderBottom: `1px solid ${line}` })
    .children([
      Checkbox().checked(todo.isCompleted).controlled(true).onChange(onToggle),
      todo.isCompleted ? title.strikethrough() : title,
    ])
}
