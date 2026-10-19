import type { StatusBoard } from '../Models/StatusBoard'

export interface IStatusRepository {
  board(): StatusBoard
}
