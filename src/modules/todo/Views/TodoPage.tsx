import { AppBar, Box, Button, Column, Form, getStore, List, minLength, page, required, Row, Scaffold, Text, TextField, ToolbarItem, useRouter } from 'fiboui'
import { bottomNav, PageDrawer } from '@/src/main/Shell'
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
        .border(`1px solid ${on ? lime : line}`)
        .children(
          Text(label)
            .fontSize(11)
            .fontWeight('800')
            .color(on ? ink : muted)
            .textCase('uppercase')
            .letterSpacing('0.12em')
        )
    )
}

export const TodoPage = page(() => {
  const vm = getStore(TodoViewModel)
  const router = useRouter()

  return Scaffold()
    .theme('noir')
    .bg(ink)
    .width('100%')
    .appBar(
      AppBar()
        .width('100%')
        .alignItems('end')
        .bg(ink)
        .paddingHorizontal(24)
        .paddingVertical(20)
        .items([
          ToolbarItem()
            .leading()
            .size({ width: 44, height: 44 })
            .tooltip('Menu')
            .openDrawer()
            .children(
              Column()
                .width(22)
                .height(16)
                .justifyContent('space-between')
                .children([
                  Box().width(22).height(2).bg(lime),
                  Box().width(22).height(2).bg(lime),
                  Box().width(22).height(2).bg(lime),
                ]),
            ),
          ToolbarItem()
            .principal()
            .children(
              Column()
                .gap(8)
                .children([
                  Text('01 · List')
                    .fontSize(9)
                    .fontWeight('800')
                    .color(lime)
                    .textCase('uppercase')
                    .letterSpacing('0.16em')
                    .lineHeight(1),
                  Text('Todo')
                    .fontSize(40)
                    .fontWeight('800')
                    .color(chalk)
                    .textCase('uppercase')
                    .letterSpacing('-0.04em')
                    .lineHeight(0.9),
                ]),
            ),
          ToolbarItem()
            .trailing()
            .size({ width: 84, height: 44 })
            .bg(lime)
            .tooltip('Go')
            .onPress(() => router.navigate('/performance'))
            .children(
              Text('GO')
                .fontSize(13)
                .fontWeight('800')
                .color(ink)
                .textCase('uppercase')
                .letterSpacing('0.14em'),
            ),
        ]),
    )
    .footerBar(bottomNav('todo'))
    .drawer(<PageDrawer here="todo" />)
    .drawerWidth(260)
    .children(
    Column()
      .width('100%')
      .marginX("auto")
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
              .alignY('stretch')
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
                      .borderRadius(0)
                      .border(`1px solid ${line}`)
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
                          .letterSpacing('0.12em')
                      )
                  ),
              ]),
          ]),
        Box()
          .observer()
          .width('100%')
          .children(() => {
            void vm.todos.value
            return [
              Row()
                .width('100%')
                .alignX('start')
                .alignY('center')
                .children([
                  Text(`${vm.left} left`)
                    .fontSize(11)
                    .width(80)
                    .fontWeight('800')
                    .color(muted)
                    .textCase('uppercase')
                    .letterSpacing('0.12em'),
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
            if (vm.error.value) {
              return [Text(vm.error.value).fontSize(14).color(pink)]
            }
            return [
              List()
                .width('100%')
                .reset()
                .items(vm.todos)
                .variant('default')
                .empty(Text('Nothing here').fontSize(14).color(muted))
                .onPress((todo) => vm.toggleTodo(todo._id))
                .renderItem((todo) => TodoItem(todo)),
            ]
          }),
      ])
    )
})
