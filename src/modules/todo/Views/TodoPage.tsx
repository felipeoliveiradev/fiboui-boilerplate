import { Box, Button, Column, Form, getStore, List, minLength, page, required, Row, Text, TextField } from 'fiboui'
import { shell } from '@/src/main/Shell'
import { chalk, ink, lime, line, muted, pink } from '@/src/main/tokens'
import { TodoFilter, TodoViewModel } from '../ViewModels/TodoViewModel'
import { TodoItem } from './components/TodoItem'

function filterButton(vm: TodoViewModel, key: TodoFilter, label: string) {
  const on = vm.shownFilter === key
  return Button()
    .clean()
    .onPress(() => vm.show(key))
    .children(
      Box()
        .paddingHorizontal(12)
        .paddingVertical(8)
        .bg(on ? lime : 'transparent')
        .style({ border: `1px solid ${on ? lime : line}` })
        .children(
          Text(label)
            .fontSize(11)
            .fontWeight('800')
            .color(on ? ink : muted)
            .textCase('uppercase')
            .style({ letterSpacing: '0.12em' })
        )
    )
}

export const TodoPage = page(() => {
  const vm = getStore(TodoViewModel)

  return shell(
    '01 · List',
    'Todo',
    'todo',
    Column()
      .width('100%')
      .maxWidth(720)
      .padding(24)
      .gap(20)
      .children([
        Form()
          .validation({
            text: [required('Write a task'), minLength(2, 'At least 2 characters')],
          })
          .onSubmit((values) => {
            vm.addTodo(String(values.text ?? ''))
          })
          .afterSubmit((_values, form) => form.reset())
          .children([
            Row()
              .width('100%')
              .gap(8)
              .alignItems('stretch')
              .children([
                Box()
                  .flex(1)
                  .children(
                    TextField()
                      .name('text')
                      .placeholder('What needs to be done?')
                      .variant('outlined')
                      .bg(ink)
                      .color(chalk)
                      .style({ borderRadius: 0, border: `1px solid ${line}` })
                  ),
                Button()
                  .clean()
                  .submit()
                  .children(
                    Box()
                      .bg(pink)
                      .paddingHorizontal(18)
                      .center()
                      .children(
                        Text('Add')
                          .fontSize(11)
                          .fontWeight('800')
                          .color(chalk)
                          .textCase('uppercase')
                          .style({ letterSpacing: '0.12em' })
                      )
                  ),
              ]),
          ]),
        Box()
          .observer()
          .children(() => {
            void vm.todos.value
            return [
              Row()
                .width('100%')
                .justifyContent('between')
                .alignItems('center')
                .children([
                  Text(`${vm.left} left`)
                    .fontSize(11)
                    .fontWeight('800')
                    .color(muted)
                    .textCase('uppercase')
                    .style({ letterSpacing: '0.12em' }),
                  Row()
                    .gap(8)
                    .children([
                      filterButton(vm, 'all', 'All'),
                      filterButton(vm, 'active', 'Active'),
                      filterButton(vm, 'completed', 'Done'),
                    ]),
                ]),
            ]
          }),
        Box()
          .observer()
          .width('100%')
          .children(() => {
            if (vm.isLoading.value) {
              return [Text('Loading').fontSize(12).fontWeight('800').color(lime).textCase('uppercase')]
            }
            if (vm.error.value) {
              return [Text(vm.error.value).fontSize(14).color(pink)]
            }
            return [
              List()
                .width('100%')
                .items(vm.todos)
                .variant('default')
                .empty(Text('Nothing here').fontSize(14).color(muted))
                .renderItem((todo) => TodoItem(todo, () => vm.toggleTodo(todo._id))),
            ]
          }),
      ])
  )
})
