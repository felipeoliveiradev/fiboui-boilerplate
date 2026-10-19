import { TripData, PerformanceStats } from '../Models/PerformanceData'
import type { IPerformanceRepository } from './IPerformanceRepository'

const lime = '#c8ff00'
const pink = '#ff2d8a'
const chalk = '#ffffff'

export class PerformanceService implements IPerformanceRepository {
  getRecentTrips(): TripData[] {
    return [
      {
        id: '1',
        origin: 'Eixample',
        destination: 'El Prat',
        duration: '28 min',
        distance: '14 km',
        earnings: 42.5,
        lat: 41.388,
        lng: 2.164,
        color: pink,
        photo: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=640&q=70',
        note: 'Pickup on Carrer de Mallorca',
      },
      {
        id: '2',
        origin: 'Gràcia',
        destination: 'Poblenou',
        duration: '18 min',
        distance: '6.4 km',
        earnings: 28.75,
        lat: 41.403,
        lng: 2.158,
        color: lime,
        photo: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=640&q=70',
        note: 'Pickup in front of Plaça del Sol',
      },
      {
        id: '3',
        origin: 'Barceloneta',
        destination: 'Port',
        duration: '12 min',
        distance: '3.1 km',
        earnings: 18.2,
        lat: 41.379,
        lng: 2.189,
        color: chalk,
        photo: 'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&w=640&q=70',
        note: 'Pickup at the beach promenade',
      },
    ]
  }

  getCurrentStats(): PerformanceStats {
    return {
      rating: 4.98,
      status: 'Platinum',
      totalEarnings: 0,
      tripsToday: 0
    };
  }

  nextEarnings(currentEarnings: number): number {
    return currentEarnings + Math.random() * 5
  }
}
