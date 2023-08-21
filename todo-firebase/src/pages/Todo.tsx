import SignInInfo from '@/components/SignIn/SignInInfo'
import TodoForm from '@/components/Todo/TodoForm'
import TodoList from '@/components/Todo/TodoList'
import useUser from '@/hooks/auth/useUser'
import useAddTodo from '@/hooks/todo/useAddTodo'
import useTodos from '@/hooks/todo/useTodos'
import { auth } from '@/remote/firebase'
import { deleteTodo, updateTodo } from '@/remote/todo'
import { signOut } from 'firebase/auth'
import { HTTPError } from 'ky'
import { useCallback } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import uuid from 'react-uuid'
function Todo() {
  const { data = [], isLoading, refetch } = useTodos()

  const queryClient = useQueryClient()

  const navigate = useNavigate()

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
        id: uuid(),
        todo,
      })
    },
    [addTodo],
  )

  const user = useUser()

  return (
    <>
      {user !== null && (
        <SignInInfo
          user={user?.email}
          onClick={() => {
            signOut(auth)
            navigate('/')
          }}
        />
      )}

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
    </>
  )
}

export default Todo
