import { useQuery } from 'react-query';

import { getTodos } from '../remote/todo';

export default function useTodos() {
  return useQuery([`todos`], () => getTodos().then((res) => res.json()));
}
