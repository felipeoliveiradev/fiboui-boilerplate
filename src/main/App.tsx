'use client'

import { createElement, type ComponentType } from 'react'
import { FiboThemeProvider, Router } from 'fiboui'
import { TodoPage } from '@/src/modules/todo/Views/TodoPage'
import { PerformancePage } from '@/src/modules/performance/Views/PerformancePage'
import { ColorPage } from '@/src/modules/color/Views/ColorPage'
import { MissingPage } from '@/src/modules/status/Views/MissingPage'
import { FaultPage } from '@/src/modules/status/Views/FaultPage'
import { WaitPage } from '@/src/modules/status/Views/WaitPage'

const routes = [
  { path: '/', component: TodoPage as ComponentType },
  { path: '/todo', component: TodoPage as ComponentType },
  { path: '/performance', component: PerformancePage as ComponentType },
  { path: '/color', component: ColorPage as ComponentType },
]

export function App({ initialPath }: { initialPath: string }) {
  return createElement(FiboThemeProvider, {
    theme: 'noir',
    children: createElement(Router, {
      routes,
      initialPath,
      fallback: MissingPage as ComponentType,
      loading: createElement(WaitPage),
      errorBoundary: createElement(FaultPage),
    }),
  })
}
