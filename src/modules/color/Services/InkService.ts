import { tone } from 'fiboui'
import type { InkBoard } from '../Models/InkBoard'
import type { IInkRepository } from './IInkRepository'

const lime = '#c8ff00'
const levels = [-4, -2, 0, 2, 4] as const

/** Built once. `tone.sheet` is pure, so the page never recomputes it. */
const board: InkBoard = (() => {
  const sheet = tone.sheet(lime)
  return {
    color: sheet.color,
    on: sheet.on,
    container: sheet.container,
    secondary: sheet.secondary,
    tertiary: sheet.tertiary,
    opposite: sheet.opposite,
    mute: sheet.mute,
    steps: levels.map((level) => ({ level, color: tone(lime, level) })),
  }
})()

export class InkService implements IInkRepository {
  board(): InkBoard {
    return board
  }
}
