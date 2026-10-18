'use client'

import type { ReactNode } from 'react'
import { FiboThemeProvider } from 'fiboui'

export function Providers({ children }: { children: ReactNode }) {
  return <FiboThemeProvider>{children}</FiboThemeProvider>
}
