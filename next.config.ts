import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['fiboui'],
  // `leafletEngine()` imports `leaflet` from inside the fiboui package.
  // Point that specifier at this app's copy.
  turbopack: {
    resolveAlias: {
      leaflet: './node_modules/leaflet/dist/leaflet-src.js',
    },
  },
}

export default nextConfig
