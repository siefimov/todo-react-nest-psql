import { useMemo } from 'react';
import type { Todo } from '../../types';

export function useSortedTodos(filteredTodos: Todo[]) {
  return useMemo(() => {
    return filteredTodos
      .slice()
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
  }, [filteredTodos]);
}
