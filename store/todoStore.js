import { create } from 'zustand'
import { getApi, postApi, putApi, deleteApi } from '../services/api'

const useTodoStore = create((set, get) => ({
  todos: [],
  fetchTodos: async () => {
    const data = await getApi('/api/todos')
    set({ todos: data })
  },
  addTodo: async (todo) => {
    const created = await postApi('/api/todos', todo)
    set({ todos: [...get().todos, created] })
  },
  updateTodo: async (id, updates) => {
    const updated = await putApi(`/api/todos/${id}`, updates)
    set({
      todos: get().todos.map((t) => (t.id === id ? updated : t))
    })
  },
  deleteTodo: async (id) => {
    await deleteApi(`/api/todos/${id}`)
    set({ todos: get().todos.filter((t) => t.id !== id) })
  }
}))

export default useTodoStore