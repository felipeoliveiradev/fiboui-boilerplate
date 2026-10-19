export interface InkStep {
  level: number
  color: string
}

export interface InkBoard {
  color: string
  on: string
  container: string
  secondary: string
  tertiary: string
  opposite: string
  mute: string
  steps: InkStep[]
}
