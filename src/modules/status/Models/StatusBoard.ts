export interface StatusCopy {
  kicker: string
  title: string
  note: string
  home: string
}

export interface StatusBoard {
  missing: StatusCopy
  fault: StatusCopy
  wait: StatusCopy
}
