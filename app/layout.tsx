import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import 'fiboui/style.css'
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
