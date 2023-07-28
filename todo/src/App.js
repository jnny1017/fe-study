import { useMutation, useQueryClient } from 'react-query';

import TodoForm from './TodoForm';
import TodoList from './TodoList';
import useTodos from './hooks/useTodos';
import { deleteTodo, postTodo, updateTodo } from './remote/todo';

function App() {
  const { data = [], isLoading, refetch } = useTodos();

  const queryClient = useQueryClient();

  // queryClient.setQueryData
  const { mutate: onAdd } = useMutation(postTodo, {
    onSuccess: () => {
      return queryClient.invalidateQueries(['todos']);
    },
    onError: (err) => {
      console.log(err.respose);
    },
  });

  const { mutate: onDeleteTodo } = useMutation(deleteTodo, {
    onSuccess: () => {
      return queryClient.invalidateQueries(['todos']);
    },
    onError: (err) => {
      console.log(err.respose);
    },
  });

  const { mutate: onEditTodo } = useMutation(updateTodo, {
    onSuccess: () => {
      return queryClient.invalidateQueries(['todos']);
    },
    onError: (err) => {
      console.log(err.respose);
    },
  });

  if (isLoading === false) {
    <>
      <TodoForm
        onSubmit={(todo) =>
          onAdd({
            id: Date.now(),
            todo,
          })
        }
      />
      <div style={{ wdith: `100%`, height: 20, background: `green` }}></div>
      <div style={{ wdith: `100%`, height: 20, background: `green` }}></div>
      <div style={{ wdith: `100%`, height: 120, background: `orange` }}></div>
    </>;
  }

  return (
    <div>
      <TodoForm
        onSubmit={(todo) =>
          onAdd({
            id: Date.now(),
            todo,
          })
        }
      />
      <TodoList
        todos={data}
        onEdit={(id, todo) =>
          onEditTodo({
            id,
            todo,
          })
        }
        onDelete={(id) => onDeleteTodo(id)}
      />
    </div>
  );
}

export default App;
