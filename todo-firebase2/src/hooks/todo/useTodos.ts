import { getTodos } from '@/remote/todo'
import { useQuery } from 'react-query'

export default function useTodos() {
  return useQuery([`todos`], getTodos, {
    suspense: true,
  })
}

const getKey = () => ['todos']

useTodos.getKey = getKey
