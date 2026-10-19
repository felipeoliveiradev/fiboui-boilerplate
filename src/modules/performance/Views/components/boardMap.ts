import { MapView, leafletEngine, type BindableSignal } from 'fiboui'
import 'leaflet/dist/leaflet.css'
import type { TripMarker } from '../../Models/PerformanceData'

const streets = leafletEngine()

/** Barcelona board. One engine for the life of the page, so the map is not remounted. */
export function boardMap(markers: TripMarker[], opened: BindableSignal<string | null>) {
  return MapView()
    .engine(streets)
    .basemap('dark')
    .width(4000)
    .height(640)
    .paint('height', '100%')
    .paint('max-width', 'none')
    .center(41.39, 2.17)
    .span(0.05)
    .opened(opened)
    .markers(markers)
}
