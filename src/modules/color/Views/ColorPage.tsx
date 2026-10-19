import { AppBar, Box, Column, Row, Scaffold, Text, ToolbarItem, getStore, page, useRouter } from 'fiboui'
import { bottomNav, PageDrawer } from '@/src/main/Shell'
import { chalk, ink, lime } from '@/src/main/tokens'
import { ColorViewModel } from '../ViewModels/ColorViewModel'
import { InkFab, StepSheet } from './components/InkChrome'
import { InkTile } from './components/InkTile'

export const ColorPage = page(() => {
  const vm = getStore(ColorViewModel)
  const router = useRouter()
  const board = vm.board

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
                  Text('03 · Ink')
                    .fontSize(9)
                    .fontWeight('800')
                    .color(lime)
                    .textCase('uppercase')
                    .letterSpacing('0.16em')
                    .lineHeight(1),
                  Text('Ink')
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
            .onPress(() => router.navigate('/todo'))
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
    .footerBar(bottomNav('color'))
    .drawer(<PageDrawer here="color" />)
    .drawerWidth(260)
    .fab(<InkFab />)
    .fabAt('endDock')
    .bottomSheet(<StepSheet steps={board.steps} />)
    .children(
      Column()
        .width('100%')
        .padding(20)
        .gap(20)
        .children([
          Box()
            .width('100%')
            .padding(24)
            .bg(board.color)
            .minHeight(180)
            .children(
              Column()
                .gap(8)
                .children([
                  Text('Lime')
                    .fontSize(42)
                    .fontWeight('800')
                    .color(board.on)
                    .textCase('uppercase')
                    .letterSpacing('-0.04em')
                    .lineHeight(0.9),
                  Text('tone.on')
                    .fontSize(11)
                    .fontWeight('800')
                    .color(board.on)
                    .textCase('uppercase')
                    .letterSpacing('0.16em'),
                ])
            ),
          Row()
            .width('100%')
            .gap(6)
            .children(
              board.steps.map((step) =>
                Box()
                  .height(44)
                  .bg(step.color)
                  .flex(1)
              )
            ),
          Box()
            .width('100%')
            .grid()
            .gridTemplateColumns('1fr 1fr')
            .gap(8)
            .children([
              InkTile('Color', board.color),
              InkTile('Container', board.container),
              InkTile('Secondary', board.secondary),
              InkTile('Tertiary', board.tertiary),
              InkTile('Opposite', board.opposite),
              InkTile('Mute', board.mute),
            ]),
        ])
    )
})
