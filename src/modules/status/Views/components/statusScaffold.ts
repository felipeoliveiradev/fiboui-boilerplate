import { createElement } from 'react'
import { AppBar, Box, Column, Scaffold, Text, ToolbarItem, useRouter, type FiboChild } from 'fiboui'
import { bottomNav, PageDrawer } from '@/src/main/Shell'
import { chalk, ink, lime } from '@/src/main/tokens'

export function statusScaffold(
  kicker: string,
  title: string,
  goTo: string,
  body: FiboChild,
  onReset?: () => void,
) {
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
                  Text(kicker)
                    .fontSize(9)
                    .fontWeight('800')
                    .color(lime)
                    .textCase('uppercase')
                    .letterSpacing('0.16em')
                    .lineHeight(1),
                  Text(title)
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
            .onPress(() => {
              onReset?.()
              router.navigate(goTo)
            })
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
    .footerBar(bottomNav(null))
    .drawer(createElement(PageDrawer, { here: null }))
    .drawerWidth(260)
    .children(body)
}
