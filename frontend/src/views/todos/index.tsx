import { useTodos } from '../../api';
import { TodoList } from '../../components';

export const Todos = () => {
  const todos = useTodos();

  return (
    <div>
      <h2>Todo List</h2>
      <TodoList todos={todos.data ?? []} />
    </div>
  );
};
