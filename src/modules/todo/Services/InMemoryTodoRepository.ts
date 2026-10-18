import type { ListEntity } from 'fiboui'
import { Todo } from '../Models/Todo'
import { ITodoRepository } from './ITodoRepository'

export class InMemoryTodoRepository implements ITodoRepository {
  private _db: ListEntity<Todo>[] = [
    { _id: '1', text: 'Learn FiboUI Architecture', isCompleted: true },
    { _id: '2', text: 'Build a Clean Architecture app', isCompleted: false },
    { _id: '3', text: 'Master Reactivity', isCompleted: false },
  ]

  async getAll(): Promise<ListEntity<Todo>[]> {
    return new Promise((resolve) => setTimeout(() => resolve(this._db.map((todo) => ({ ...todo }))), 500))
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
