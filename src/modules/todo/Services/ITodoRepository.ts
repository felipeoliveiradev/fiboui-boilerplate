import type { ListEntity } from 'fiboui'
import { Todo } from '../Models/Todo'

export interface ITodoRepository {
  getAll(): Promise<ListEntity<Todo>[]>
  add(todo: ListEntity<Todo>): Promise<void>
  update(todo: ListEntity<Todo>): Promise<void>
  delete(id: string): Promise<void>
}
