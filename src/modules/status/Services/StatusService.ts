import type { StatusBoard } from '../Models/StatusBoard'
import type { IStatusRepository } from './IStatusRepository'

const board: StatusBoard = {
  missing: {
    kicker: '00 · Missing',
    title: '404',
    note: 'This route is not on the board.',
    home: '/todo',
  },
  fault: {
    kicker: '00 · Fault',
    title: 'Error',
    note: 'The screen stopped. Go back to the list.',
    home: '/todo',
  },
  wait: {
    kicker: '00 · Wait',
    title: 'Loading',
    note: 'The next screen is on its way.',
    home: '/todo',
  },
}

export class StatusService implements IStatusRepository {
  board(): StatusBoard {
    return board
  }
}
