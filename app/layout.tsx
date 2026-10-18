import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import 'fiboui/style.css'
import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'FiboUI Boilerplate',
  description: 'Next.js + FiboUI clean-architecture starter',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
