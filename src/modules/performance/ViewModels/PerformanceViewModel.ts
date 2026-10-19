import { Store, signal } from 'fiboui'
import type { PerformanceStats, TripData, TripMarker } from '../Models/PerformanceData'
import type { IPerformanceRepository } from '../Services/IPerformanceRepository'
import { PerformanceService } from '../Services/PerformanceService'
import { tripMarkers } from '../Services/tripMarkers'

@Store()
export class PerformanceViewModel {
  isOnline = signal(false)
  earnings = signal(0)
  opened = signal<string | null>(null)
  readonly trips: TripData[]
  readonly markers: TripMarker[]
  readonly stats: PerformanceStats

  private repo: IPerformanceRepository
  private updateInterval: ReturnType<typeof setInterval> | null = null

  constructor() {
    this.repo = new PerformanceService()
    this.trips = this.repo.getRecentTrips()
    this.markers = tripMarkers(this.trips)
    this.stats = this.repo.getCurrentStats()
  }

  toggleOnlineStatus(): void {
    this.isOnline.value = !this.isOnline.value
    if (this.isOnline.value) {
      this.startEarningsSimulation()
      return
    }
    this.stopEarningsSimulation()
  }

  private startEarningsSimulation(): void {
    this.stopEarningsSimulation()
    this.updateInterval = setInterval(() => {
      this.earnings.value = this.repo.nextEarnings(this.earnings.value)
    }, 2000)
  }

  private stopEarningsSimulation(): void {
    if (this.updateInterval === null) return
    clearInterval(this.updateInterval)
    this.updateInterval = null
  }

  dispose(): void {
    this.stopEarningsSimulation()
    this.isOnline.value = false
  }
}
