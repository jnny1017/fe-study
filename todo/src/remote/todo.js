import api from '../utils/api';

export function getTodos() {
  return api.get(`todos`);
}

export function postTodo(todo) {
  return api.post(`todos`, { json: todo }.json());
}

export function updateTodo(todo) {
  return api.put(`todos/${todo.id}`, { json: todo }.json());
}

export function deleteTodo(id) {
  return api.delete(`todos/${id}`);
}
