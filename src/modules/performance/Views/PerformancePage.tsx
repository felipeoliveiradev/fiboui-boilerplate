import {
  Box,
  Column,
  getStore,
  List,
  MapView,
  page,
  Row,
  Switch,
  Text,
} from 'fiboui'
import { shell } from '@/src/main/Shell'
import { chalk, lime, line, muted, pink } from '@/src/main/tokens'
import { PerformanceViewModel } from '../ViewModels/PerformanceViewModel'

export const PerformancePage = page(() => {
  const vm = getStore(PerformanceViewModel)

  return shell(
    '02 · Board',
    'Board',
    'performance',
    Column()
      .width('100%')
      .padding(24)
      .gap(24)
      .children([
        Box()
          .observer()
          .width('100%')
          .children(() => [
            Row()
              .width('100%')
              .justifyContent('between')
              .alignItems('center')
              .children([
                Column()
                  .gap(6)
                  .children([
                    Text(vm.isOnline.value ? 'Live' : 'Idle')
                      .fontSize(9)
                      .fontWeight('800')
                      .color(vm.isOnline.value ? lime : muted)
                      .textCase('uppercase')
                      .style({ letterSpacing: '0.16em' }),
                    Text()
                      .bindSignal(vm.earnings, (value) => `€ ${value.toFixed(2)}`)
                      .fontSize(48)
                      .fontWeight('800')
                      .color(chalk)
                      .style({ letterSpacing: '-0.04em', lineHeight: 0.95 }),
                  ]),
                Switch()
                  .checked(vm.isOnline.value)
                  .onChange((checked) => {
                    if (checked !== vm.isOnline.value) vm.toggleOnlineStatus()
                  }),
              ]),
          ]),
        MapView()
          .theme('noir')
          .basemap('dark')
          .width(720)
          .height(240)
          .center(41.39, 2.17)
          .span(6)
          .markers([{ lat: 41.39, lng: 2.17, label: 'Barcelona', color: pink }]),
        List()
          .width('100%')
          .items(vm.trips)
          .variant('default')
          .renderItem((trip) =>
            Row()
              .width('100%')
              .justifyContent('between')
              .alignItems('center')
              .paddingVertical(14)
              .style({ borderBottom: `1px solid ${line}` })
              .children([
                Column()
                  .gap(4)
                  .children([
                    Text(`${trip.origin} → ${trip.destination}`)
                      .fontSize(15)
                      .fontWeight('700')
                      .color(chalk),
                    Text(`${trip.duration} · ${trip.distance}`)
                      .fontSize(12)
                      .color(muted),
                  ]),
                Text(`€ ${trip.earnings.toFixed(2)}`)
                  .fontSize(15)
                  .fontWeight('800')
                  .color(lime),
              ])
          ),
      ])
  )
})
