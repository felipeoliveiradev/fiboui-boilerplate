import type { TripData, TripMarker } from '../Models/PerformanceData'

/** One pin per trip. The popup is the card Leaflet opens. */
export function tripMarkers(trips: TripData[]): TripMarker[] {
  return trips.map((trip) => ({
    id: trip.id,
    lat: trip.lat,
    lng: trip.lng,
    label: trip.origin,
    color: trip.color,
    popup: `<div style="width:240px;color:#111;font-family:inherit">
      <img src="${trip.photo}" alt="" style="width:100%;height:128px;object-fit:cover;display:block" />
      <div style="padding:10px 2px 0;font-size:16px;font-weight:800;letter-spacing:-0.03em">${trip.origin}</div>
      <div style="padding:4px 2px 0;font-size:12px;color:#666">${trip.destination} · ${trip.duration} · ${trip.distance}</div>
      <div style="padding:6px 2px 0;font-size:12px;color:#444">${trip.note}</div>
      <div style="padding:8px 2px 2px;font-size:18px;font-weight:800">€ ${trip.earnings.toFixed(2)}</div>
    </div>`,
  }))
}
