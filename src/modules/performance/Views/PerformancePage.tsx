import {
  AppBar,
  Box,
  Column,
  getStore,
  page,
  Row,
  Scaffold,
  Switch,
  Text,
  ToolbarItem,
  useRouter,
  When,
} from 'fiboui'
import { bottomNav, PageDrawer } from '@/src/main/Shell'
import { chalk, ink, lime, line, muted } from '@/src/main/tokens'
import { PerformanceViewModel } from '../ViewModels/PerformanceViewModel'
import { statFigure, TripRow } from './components/TripRow'
import { boardMap } from './components/boardMap'

export const PerformancePage = page(() => {
  const vm = getStore(PerformanceViewModel)
  const router = useRouter()
  const stats = vm.stats
  const trips = vm.trips

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
                  Text('02 · Board')
                    .fontSize(9)
                    .fontWeight('800')
                    .color(lime)
                    .textCase('uppercase')
                    .letterSpacing('0.16em')
                    .lineHeight(1),
                  Text('Board')
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
            .onPress(() => router.navigate('/color'))
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
    .footerBar(bottomNav('performance'))
    .drawer(<PageDrawer here="performance" />)
    .drawerWidth(260)
    .children(
      Row()
        .width('100%')
        .flex(1)
        .minHeight(0)
        .alignItems('stretch')
        .children([
          Box()
            .flex(1)
            .minWidth(0)
            .height('100%')
            .children(boardMap(vm.markers, vm.opened)),
          Box()
            .observer()
            .width(360)
            .height('100%')
            .bg(ink)
            .padding(28)
            .borderLeft(`1px solid ${line}`)
            .overflowY('auto')
            .children(() => {
              const live = vm.isOnline.value
              return [
                Column()
                  .width('100%')
                  .gap(32)
                  .children([
                    Row()
                      .width('100%')
                      .alignItems('center')
                      .justifyContent('space-between')
                      .children([
                        Column()
                          .gap(10)
                          .children([
                            Text()
                              .bindSignal(vm.earnings, (value) => `€ ${value.toFixed(2)}`)
                              .fontSize(42)
                              .fontWeight('800')
                              .color(chalk)
                              .letterSpacing('-0.05em')
                              .lineHeight(0.9),
                            Text(live ? 'Live' : 'Idle')
                              .fontSize(11)
                              .fontWeight('800')
                              .color(live ? lime : muted)
                              .textCase('uppercase')
                              .letterSpacing('0.16em'),
                          ]),
                        Switch()
                          .checked(live)
                          .controlled(true)
                          .onChange((checked) => {
                            if (checked !== live) vm.toggleOnlineStatus()
                          })
                          .when(When.on, (s) => s.bg(lime))
                          .when(When.off, (s) => s.bg(line)),
                      ]),
                    Row()
                      .width('100%')
                      .justifyContent('space-between')
                      .children([
                        statFigure(String(trips.length), 'Trips'),
                        statFigure(stats.rating.toFixed(2), 'Rating'),
                        statFigure(stats.status, 'Rank'),
                      ]),
                    Column()
                      .width('100%')
                      .children(trips.map((trip) => TripRow(trip, (id) => { vm.opened.value = id }))),
                  ]),
              ]
            }),
        ])
    )
})
