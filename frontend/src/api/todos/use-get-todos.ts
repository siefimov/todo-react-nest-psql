import { useQuery } from '@tanstack/react-query';
import type { Todo } from '../../types';
import { http } from '../http';
import { todoQueryKeys } from './todo-query-keys';

const getTodosFn = async () => {
  return http.get<Todo[]>('/todos');
};

export const useTodos = () => {
  return useQuery({
    queryKey: todoQueryKeys.all,
    queryFn: getTodosFn,
  });
};
