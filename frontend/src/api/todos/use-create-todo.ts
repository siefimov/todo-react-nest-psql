import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Todo } from '../../types';
import { http } from '../http';
import { todoQueryKeys } from './todo-query-keys';
import { TODO_STATUSES } from '../../constants';

const createTodoFn = async (title: { title: string }) => {
  const respone = await http.post<Todo>('/todos', title);
  return respone;
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodoFn,
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: todoQueryKeys.all });

      const previousTodo = queryClient.getQueriesData<Todo>({
        queryKey: todoQueryKeys.all,
      });

      queryClient.setQueriesData(
        { queryKey: todoQueryKeys.all },
        (old: Todo[] = []) => [
          ...old,
          {
            id: Date.now(),
            newTodo,
            status: TODO_STATUSES.ACTIVE,
            createdAt: Date.now(),
            updatedAt: Date.now(),
          },
        ],
      );

      return { previousTodo };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousTodo) {
        queryClient.setQueryData(todoQueryKeys.all, context.previousTodo);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: todoQueryKeys.all });
    },
  });
};
