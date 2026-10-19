import type { ListEntity } from 'fiboui'
import type { Todo } from '../Models/Todo'

/** Same rows on server and client — avoids hydration mismatch from async load. */
export const TODO_SEED: ListEntity<Todo>[] = [
  { _id: '1', text: 'Learn FiboUI Architecture', isCompleted: true },
  { _id: '2', text: 'Build a Clean Architecture app', isCompleted: false },
  { _id: '3', text: 'Master Reactivity', isCompleted: false },
]
