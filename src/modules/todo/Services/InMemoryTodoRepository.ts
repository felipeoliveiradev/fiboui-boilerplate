import type { ListEntity } from 'fiboui'
import { Todo } from '../Models/Todo'
import { ITodoRepository } from './ITodoRepository'
import { TODO_SEED } from './todo.seed'

export class InMemoryTodoRepository implements ITodoRepository {
  private _db: ListEntity<Todo>[] = TODO_SEED.map((todo) => ({ ...todo }))

  async getAll(): Promise<ListEntity<Todo>[]> {
    return this._db.map((todo) => ({ ...todo }))
  }

  async add(todo: ListEntity<Todo>): Promise<void> {
    this._db.push(todo)
  }

  async update(todo: ListEntity<Todo>): Promise<void> {
    this._db = this._db.map((item) => (item._id === todo._id ? todo : item))
  }

  async delete(id: string): Promise<void> {
    this._db = this._db.filter((item) => item._id !== id)
  }
}
