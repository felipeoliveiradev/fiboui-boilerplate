export interface TripData {
  id: string
  origin: string
  destination: string
  duration: string
  distance: string
  earnings: number
  lat: number
  lng: number
  color: string
  photo: string
  note: string
}

/** Pin the map builder reads. Built once from a trip. */
export interface TripMarker {
  id: string
  lat: number
  lng: number
  label: string
  color: string
  popup: string
}

export interface PerformanceStats {
  rating: number;
  status: 'Platinum' | 'Gold' | 'Silver';
  totalEarnings: number;
  tripsToday: number;
}
