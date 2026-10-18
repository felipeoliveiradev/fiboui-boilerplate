import { listSignal, ListSignal, Store, signal } from 'fiboui'
import { ITodoRepository } from '../Services/ITodoRepository'
import { InMemoryTodoRepository } from '../Services/InMemoryTodoRepository'
import { Todo } from '../Models/Todo'

export type TodoFilter = 'all' | 'active' | 'completed'

@Store()
export class TodoViewModel {
  todos: ListSignal<Todo> = listSignal<Todo>([])
  isLoading = signal(true)
  error = signal<string | null>(null)

  /** Which viewWhere is applied. The list itself is the filter. */
  private shown: TodoFilter = 'all'
  private repo: ITodoRepository

  constructor() {
    this.repo = new InMemoryTodoRepository()
    void this.loadTodos()
  }

  get shownFilter(): TodoFilter {
    return this.shown
  }

  /** Active rows in the full list, ignoring the current view. */
  get left(): number {
    return this.todos.filter((todo) => !todo.isCompleted).length
  }

  async loadTodos() {
    this.isLoading.value = true
    this.error.value = null
    try {
      const data = await this.repo.getAll()
      this.todos.set(data)
      this.applyView()
      this.isLoading.value = false
    } catch (e: unknown) {
      this.isLoading.value = false
      this.error.value = e instanceof Error ? e.message : 'Failed to load'
    }
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
