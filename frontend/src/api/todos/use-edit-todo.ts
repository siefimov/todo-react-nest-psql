import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import type { Todo } from '../../types';
import { http } from '../http';
import { todoQueryKeys } from './todo-query-keys';

export const useEditTodo = () => {
  //   const { id } = useParams();
  const queryClient = useQueryClient();

  //   if (!id) {
  //     throw new Error('No todo ID found in route parameters.');
  //   }

  const editTodoFn = async (updatedTodo: Todo) => {
    const response = await http.put<Todo>(
      `/todos/${updatedTodo.id}`,
      updatedTodo,
    );
    return response;
  };

  return useMutation({
    mutationFn: editTodoFn,
    onMutate: async (updatedTodo) => {
      await queryClient.cancelQueries({
        queryKey: todoQueryKeys.detail(updatedTodo.id),
      });

      const previousTodo = queryClient.getQueryData<Todo>(
        todoQueryKeys.detail(updatedTodo.id),
      );

      queryClient.setQueryData<Todo>(todoQueryKeys.detail(updatedTodo.id), {
        ...previousTodo,
        ...updatedTodo,
      });

      return { previousTodo };
    },
    onError: (_error, updatedTodo, context) => {
      queryClient.setQueryData(
        todoQueryKeys.detail(updatedTodo.id),
        context?.previousTodo,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: todoQueryKeys.all });
    },
  });
};
