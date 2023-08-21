import { Todo } from '@/model/todo'
import { postTodo } from '@/remote/todo'
import { HTTPError } from 'ky'
import { useMutation, useQueryClient } from 'react-query'
import useTodos from './useTodos'

interface Props {
  onSuccess: () => void
}

function useAddTodo({ onSuccess }: Props) {
  const queryClient = useQueryClient()

  const { mutate } = useMutation(postTodo, {
    onSuccess: () => {
      console.log('onSuccess')

      onSuccess()
    },
    onMutate: (newTodo) => {
      queryClient.cancelQueries(useTodos.getKey())

      const prev = queryClient.getQueryData<Todo[]>(useTodos.getKey())

      if (prev) {
        queryClient.setQueryData(useTodos.getKey(), [...prev, newTodo])
      }

      return { prev }
    },
    onError: (err: HTTPError, _, context) => {
      console.log(err.response)

      if (context?.prev) {
        queryClient.setQueryData(useTodos.getKey(), context?.prev)
      }
    },
  })

  return { addTodo: mutate }
}

export default useAddTodo
