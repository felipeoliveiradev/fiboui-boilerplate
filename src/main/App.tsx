'use client'

import { createElement, type ComponentType } from 'react'
import { Box, FiboThemeProvider, Router, Text } from 'fiboui'
import { TodoPage } from '@/src/modules/todo/Views/TodoPage'
import { PerformancePage } from '@/src/modules/performance/Views/PerformancePage'
import { chalk, ink } from './tokens'

const routes = [
  { path: '/', component: TodoPage as ComponentType },
  { path: '/todo', component: TodoPage as ComponentType },
  { path: '/performance', component: PerformancePage as ComponentType },
]

function Missing() {
  return Box()
    .width('100%')
    .height('100vh')
    .bg(ink)
    .center()
    .children(Text('404').fontSize(32).fontWeight('800').color(chalk).textCase('uppercase'))
}

export function App({ initialPath }: { initialPath: string }) {
  return createElement(FiboThemeProvider, {
    theme: 'noir',
    children: createElement(Router, {
      routes,
      initialPath,
      fallback: Missing,
    }),
  })
}
