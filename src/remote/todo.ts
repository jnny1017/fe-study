import api from '../utils/api'

/*
"todos": [
    {
      "id": 1690795283797,
      "todo": "dd"
    }
  ]
*/

type Todo = {
  (): any
}

export function getTodos() {
  return api.get(`todos`)
}

// TODO
export function postTodo(todo: Todo) {
  return api.post(`todos`, { json: todo }.json())
}

export function updateTodo(todo: any) {
  return api.put(`todos/${todo.id}`, { json: todo }.json())
}

export function deleteTodo(id: number) {
  return api.delete(`todos/${id}`)
}
