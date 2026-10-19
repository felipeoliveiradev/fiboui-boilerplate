import type { Metadata } from 'next'
import type { ReactNode } from 'react'
// Copied from node_modules/fiboui/dist/style.css on install.
// Importing the package CSS directly loads fiboui's Tailwind config and breaks Turbopack.
import './fiboui.css'
import './globals.css'

export const metadata: Metadata = {
  title: 'FiboUI Boilerplate',
  description: 'Next.js host for a FiboUI app',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
