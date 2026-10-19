import { Column, Spinner, Text, getStore, page } from 'fiboui'
import { lime, muted } from '@/src/main/tokens'
import { StatusViewModel } from '../ViewModels/StatusViewModel'
import { statusScaffold } from './components/statusScaffold'

export const WaitPage = page(() => {
  const vm = getStore(StatusViewModel)
  const copy = vm.board.wait

  return statusScaffold(
    copy.kicker,
    copy.title,
    copy.home,
    Column()
      .width('100%')
      .padding(24)
      .gap(16)
      .children([
        Spinner().size(32).color(lime),
        Text(copy.note).fontSize(14).color(muted),
      ]),
  )
})
