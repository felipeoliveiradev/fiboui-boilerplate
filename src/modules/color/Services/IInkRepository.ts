import type { InkBoard } from '../Models/InkBoard'

export interface IInkRepository {
  board(): InkBoard
}
