import { Todo } from '@/interface/todo'
import api from '@/utils/api'

export function getTodos() {
  return api.get(`todos`).json<Todo[]>()
}

export function postTodo(todo: Todo) {
  return api.post(`todos`, { json: todo }).json()
}

export function updateTodo(todo: Todo) {
  return api.put(`todos/${todo.id}`, { json: todo }).json()
}

export function deleteTodo(id: number) {
  return api.delete(`todos/${id}`)
}
