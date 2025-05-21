import React, { useState } from 'react';
import { useTodos } from '../../api';
import { TodoList, CreateTodo, TodosFilter } from '../../components';
import { TODO_FILTERS } from '../../constants';
import type { Todo_Filter } from '../../types';
import './todos.scss';

export const Todos: React.FC = () => {
  const todos = useTodos();
  const [filter, setFilter] = useState<Todo_Filter>(TODO_FILTERS.ALL);

  return (
    <div className="todos">
      <div className="todos__header">
        <h2 className="todos__title">Todo List</h2>
        <CreateTodo />
      </div>
      <TodosFilter filter={filter} setFilter={setFilter} />
      {todos.error instanceof Error && <div>{todos.error.message}</div>}
      {todos.isLoading && <div>Loading...</div>}
      {todos.isSuccess && <TodoList todos={todos.data ?? []} filter={filter} />}
    </div>
  );
};
