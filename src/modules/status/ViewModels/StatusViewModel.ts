import { Store } from 'fiboui'
import type { StatusBoard } from '../Models/StatusBoard'
import type { IStatusRepository } from '../Services/IStatusRepository'
import { StatusService } from '../Services/StatusService'

@Store()
export class StatusViewModel {
  readonly board: StatusBoard
  private repo: IStatusRepository

  constructor() {
    this.repo = new StatusService()
    this.board = this.repo.board()
  }
}
