import { HTTPError } from 'ky'
import { useCallback } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import Error from '@/components/Error'
import Loading from '@/components/Loading'
import TodoForm from '@/components/todo/TodoForm'
import TodoList from '@/components/todo/TodoList'
import widthAsyncBoundary from '@/components/widthAsyncBoundary'
import useAddTodo from '@/hooks/useAddTodo'
import useTodos from '@/hooks/useTodos'
import { deleteTodo, updateTodo } from '@/remote/todo'

function App() {
  const { data = [], isLoading, refetch } = useTodos()

  const queryClient = useQueryClient()

  const { addTodo } = useAddTodo({
    onSuccess: () => {
      return queryClient.invalidateQueries(useTodos.getKey())
    },
  })

  const { mutate: onDeleteTodo } = useMutation(deleteTodo, {
    onSuccess: () => {
      return queryClient.invalidateQueries(useTodos.getKey())
    },
    onError: (err: HTTPError) => {
      console.log(err.response)
    },
  })

  const { mutate: onEditTodo } = useMutation(updateTodo, {
    onSuccess: () => {
      return queryClient.invalidateQueries(useTodos.getKey())
    },
    onError: (err: HTTPError) => {
      console.log(err.response)
    },
  })

  const handleAddTodo = useCallback(
    (todo: string) => {
      addTodo({
        id: number,
        todo,
      })
    },
    [addTodo],
  )
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
  )
}

export default widthAsyncBoundary(App, {
  rejectFallback: <Error />,
  pendingFallback: <Loading />,
})
