import { Column, Text, getStore, page, useRouter } from 'fiboui'
import { chalk, muted } from '@/src/main/tokens'
import { StatusViewModel } from '../ViewModels/StatusViewModel'
import { statusScaffold } from './components/statusScaffold'

export const MissingPage = page(() => {
  const vm = getStore(StatusViewModel)
  const router = useRouter()
  const copy = vm.board.missing

  return statusScaffold(
    copy.kicker,
    copy.title,
    copy.home,
    Column()
      .width('100%')
      .padding(24)
      .gap(12)
      .children([
        Text(router.currentPath)
          .fontSize(14)
          .fontWeight('800')
          .color(chalk)
          .letterSpacing('-0.02em'),
        Text(copy.note).fontSize(14).color(muted),
      ]),
  )
})
