import { useQuery } from 'react-query';

import { getTodos } from '../remote/todo';

export default function useTodos() {
  return useQuery([`todos`], () =>
    getTodos().then((res) => res.json(), {
      suspense: true,
    })
  );
}

const getKey = () => ['todos'];

useTodos.getKey = getKey;

// suspense: true
// 리트라이가 걸려있다
