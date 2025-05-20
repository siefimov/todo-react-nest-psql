import { useTodos } from '../../api';
import { TodoList } from '../../components';
import { CreateTodo } from './create-todo';

export const Todos = () => {
  const todos = useTodos();

  return (
    <div>
      <h2>Todo List</h2>
      <CreateTodo />
      <TodoList todos={todos.data ?? []} />
    </div>
  );
};
