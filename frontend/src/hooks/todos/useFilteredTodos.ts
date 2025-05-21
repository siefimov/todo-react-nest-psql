import { useMemo } from 'react';
import type { Todo } from '../../types';
import { TODO_STATUSES } from '../../constants';

export function useFilteredTodos(todos: Todo[], filter?: string): Todo[] {
  return useMemo(() => {
    if (!filter) return todos;
    if (filter === TODO_STATUSES.ACTIVE)
      return todos.filter((todo) => todo.status === TODO_STATUSES.ACTIVE);
    if (filter === TODO_STATUSES.DONE)
      return todos.filter((todo) => todo.status === TODO_STATUSES.DONE);
    return todos;
  }, [todos, filter]);
}
