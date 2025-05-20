import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http } from '../http';
import { todoQueryKeys } from './todo-query-keys';

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  const deteleFn = async (id: string) => {
    const response = await http.delete<void>(`/todos/${id}`);
    return response;
  };

  return useMutation({
    mutationFn: deteleFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: todoQueryKeys.all });
    },
    onSuccess: () => {
      console.log('Delete user successfuly');
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: todoQueryKeys.all });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: todoQueryKeys.all });
    },
  });
};
