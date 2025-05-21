import { useTodos } from '../../api';
import { TodoList } from '../../components';
import { CreateTodo } from './create-todo';
import './todos.scss';

export const Todos = () => {
  const todos = useTodos();

  return (
    <div className="todos">
      <div className="todos__header">
        <h2 className="todos__title">Todo List</h2>
        <CreateTodo />
      </div>
      {todos.error instanceof Error && <div>{todos.error.message}</div>}
      {todos.isLoading && <div>Loading...</div>}
      {todos.isSuccess && <TodoList todos={todos.data ?? []} />}
    </div>
  );
};
