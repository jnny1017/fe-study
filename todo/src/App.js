import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import TodoForm from './TodoForm';
import TodoList from './TodoList';
import widthAsyncBoundary from './components/widthAsyncBoundary';
import useAddTodo from './hooks/useAddTodo';
import useTodos from './hooks/useTodos';
import { deleteTodo, updateTodo } from './remote/todo';

function App() {
  const { data = [], isLoading, refetch } = useTodos();

  const queryClient = useQueryClient();

  const { addTodo } = useAddTodo({
    onSuccess: () => {
      return queryClient.invalidateQueries(useTodos.getKey());
    },
  });

  const { mutate: onDeleteTodo } = useMutation(deleteTodo, {
    onSuccess: () => {
      return queryClient.invalidateQueries(useTodos.getKey());
    },
    onError: (err) => {
      console.log(err.response);
    },
  });

  const { mutate: onEditTodo } = useMutation(updateTodo, {
    onSuccess: () => {
      return queryClient.invalidateQueries(useTodos.getKey());
    },
    onError: (err) => {
      console.log(err.response);
    },
  });

  const handleAddTodo = useCallback(
    (todo) => {
      addTodo({
        id: Date.now(),
        todo,
      });
    },
    [addTodo]
  );

  return (
    <div>
      <TodoForm onSubmit={handleAddTodo} />
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

export default widthAsyncBoundary(App, {
  rejectFallback: <div>todo 에러발생</div>,
  pendingFallback: (
    <>
      <div style={{ width: `100%`, height: 20, background: `green` }}></div>
      <div style={{ width: `100%`, height: 20, background: `green` }}></div>
      <div style={{ width: `100%`, height: 120, background: `orange` }}></div>
    </>
  ),
});
