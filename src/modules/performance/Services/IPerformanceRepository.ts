import type { PerformanceStats, TripData } from '../Models/PerformanceData'

export interface IPerformanceRepository {
  getRecentTrips(): TripData[]
  getCurrentStats(): PerformanceStats
  nextEarnings(current: number): number
}
