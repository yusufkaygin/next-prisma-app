import { useState, useEffect } from 'react'
import useTodoStore from '../store/todoStore'

export default function Home() {
  const { todos, fetchTodos, addTodo, updateTodo, deleteTodo } = useTodoStore()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('pending')
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editStatus, setEditStatus] = useState('pending')

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!title) return
    await addTodo({ title, description, status })
    setTitle('')
    setDescription('')
    setStatus('pending')
  }

  const startEdit = (todo) => {
    setEditingId(todo.id)
    setEditTitle(todo.title)
    setEditDescription(todo.description || '')
    setEditStatus(todo.status)
  }

  const handleUpdate = async (id) => {
    await updateTodo(id, { title: editTitle, description: editDescription, status: editStatus })
    setEditingId(null)
    setEditTitle('')
    setEditDescription('')
    setEditStatus('pending')
  }

  const cancelEdit = () => {
    setEditingId(null)
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Todo Listesi</h1>
        <form onSubmit={handleAdd} className="mb-6">
          <div className="mb-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Başlık"
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Açıklama"
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="mb-2">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="pending">Beklemede</option>
              <option value="in-progress">Devam ediyor</option>
              <option value="completed">Tamamlandı</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            Ekle
          </button>
        </form>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="border-b py-2">
              {editingId === todo.id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full border p-2 rounded"
                  />
                  <input
                    type="text"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full border p-2 rounded"
                  />
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full border p-2 rounded"
                  >
                    <option value="pending">Beklemede</option>
                    <option value="in-progress">Devam ediyor</option>
                    <option value="completed">Tamamlandı</option>
                  </select>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleUpdate(todo.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Kaydet
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-400 text-white px-3 py-1 rounded"
                    >
                      İptal
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{todo.title}</p>
                    <p className="text-sm text-gray-600">{todo.description}</p>
                    <p className="text-xs text-gray-500">Durum: {todo.status}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => startEdit(todo)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}