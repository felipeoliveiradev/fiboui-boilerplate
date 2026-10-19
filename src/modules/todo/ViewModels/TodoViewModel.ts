import { listSignal, ListSignal, Store, signal } from 'fiboui'
import { ITodoRepository } from '../Services/ITodoRepository'
import { InMemoryTodoRepository } from '../Services/InMemoryTodoRepository'
import { TODO_SEED } from '../Services/todo.seed'
import { Todo } from '../Models/Todo'

export type TodoFilter = 'all' | 'active' | 'completed'

@Store()
export class TodoViewModel {
  /** Seeded sync so SSR HTML matches the first client paint. */
  todos: ListSignal<Todo> = listSignal<Todo>(TODO_SEED.map((todo) => ({ ...todo })))
  error = signal<string | null>(null)

  /** Which viewWhere is applied. The list itself is the filter. */
  private shown: TodoFilter = 'all'
  private repo: ITodoRepository

  constructor() {
    this.repo = new InMemoryTodoRepository()
  }

  get shownFilter(): TodoFilter {
    return this.shown
  }

  /** Active rows in the full list, ignoring the current view. */
  get left(): number {
    return this.todos.filter((todo) => !todo.isCompleted).length
  }

  async addTodo(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return
    this.todos.add({ text: trimmed, isCompleted: false })
    const created = this.todos.filter(() => true).at(-1)
    if (!created) return
    try {
      await this.repo.add(created)
    } catch {
      this.todos.remove(created._id)
    }
  }

  async toggleTodo(id: string) {
    const current = this.todos.find(id)
    if (!current) return
    this.todos.update(id, { isCompleted: !current.isCompleted })
    const next = this.todos.find(id)
    if (next) await this.repo.update(next)
  }

  show(filter: TodoFilter) {
    this.shown = filter
    this.applyView()
  }

  private applyView() {
    if (this.shown === 'active') {
      this.todos.viewWhere((todo) => !todo.isCompleted)
      return
    }
    if (this.shown === 'completed') {
      this.todos.viewWhere((todo) => todo.isCompleted)
      return
    }
    this.todos.viewWhere(null)
  }
}
