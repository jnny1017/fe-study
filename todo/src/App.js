import { useState } from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

function App() {
  const [state, setState] = useState({
    value: '',
    todos: [],
  });

  const { value, todos } = state;

  const handleChange = (event) => {
    setState({
      ...state,
      value: event.target.value,
    });
  };

  const handleAddTodo = () => {
    if (value === '') {
      alert('할 일을 입력해주세요');

      return;
    }

    setState({
      ...state,
      value: '',
      todos: [...todos, { value, status: false }],
    });
  };

  const handleDelete = (id) => {
    setState({
      ...state,
      todos: todos.filter((_, index) => index !== id),
    });
  };

  const handleStatus = (id) => {
    setState((prevState) => ({
      ...prevState,
      todos: todos.map((item, index) =>
        index === id ? { ...item, status: !item.status } : item
      ),
    }));
  };

  return (
    <div>
      <TodoInput
        value={value}
        onChange={handleChange}
        onAddTodo={handleAddTodo}
      />
      <TodoList todos={todos} onDelete={handleDelete} onStatus={handleStatus} />
    </div>
  );
}

export default App;
