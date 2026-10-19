import { Column, Text, getStore } from 'fiboui'
import { muted, pink } from '@/src/main/tokens'
import { StatusViewModel } from '../ViewModels/StatusViewModel'
import { statusScaffold } from './components/statusScaffold'

export function FaultPage({ error, onReset }: { error?: Error; onReset?: () => void }) {
  const vm = getStore(StatusViewModel)
  const copy = vm.board.fault
  const detail = error?.message?.trim()

  return statusScaffold(
    copy.kicker,
    copy.title,
    copy.home,
    Column()
      .width('100%')
      .padding(24)
      .gap(12)
      .children(
        detail
          ? [
              Text(detail).fontSize(14).fontWeight('800').color(pink),
              Text(copy.note).fontSize(14).color(muted),
            ]
          : [Text(copy.note).fontSize(14).color(muted)],
      ),
    onReset,
  ).build()
}
