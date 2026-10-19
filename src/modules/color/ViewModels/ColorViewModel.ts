import { Store } from 'fiboui'
import type { InkBoard } from '../Models/InkBoard'
import type { IInkRepository } from '../Services/IInkRepository'
import { InkService } from '../Services/InkService'

@Store()
export class ColorViewModel {
  readonly board: InkBoard
  private repo: IInkRepository

  constructor() {
    this.repo = new InkService()
    this.board = this.repo.board()
  }
}
