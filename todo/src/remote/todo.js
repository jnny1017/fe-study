export function getTodos() {
  return fetch(`http://localhost:8000/todos`);
}

export function postTodo(todo) {
  return fetch(`http://localhost:8000/todos`, {
    method: 'post',
    body: JSON.stringify(todo),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function updateTodo(todo) {
  return fetch(`http://localhost:8000/todos/${todo.id}`, {
    method: 'PUT',
    body: JSON.stringify(todo),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function deleteTodo(id) {
  return fetch(`http://localhost:8000/todos/${id}`, {
    method: 'DELETE',
  });
}
