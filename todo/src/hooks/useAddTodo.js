import { useMutation, useQueryClient } from 'react-query';

import { postTodo } from '../remote/todo';
import useTodos from './useTodos';

function useAddTodo({ onSuccess }) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(postTodo, {
    onSuccess: () => {
      // before ....
      console.log('onSuccess');

      onSuccess();
    },
    onMutate: (newTodo) => {
      queryClient.cancelQueries(useTodos.getKey());

      const prev = queryClient.getQueryData(useTodos.getKey());

      if (prev) {
        queryClient.setQueryData(useTodos.getKey(), [...prev, newTodo]);
      }

      return { prev };
    },
    onError: (err, _, context) => {
      console.log(err.response);

      if (context.prev) {
        queryClient.setQueryData(useTodos.getKey(), context.prev);
      }
    },
  });

  return { addTodo: mutate };
}

export default useAddTodo;
