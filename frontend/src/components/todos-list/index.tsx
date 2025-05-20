import { useDeleteTodo } from '../../api/todos/use-delete-todo';
import type { Todo } from '../../types';
import { DeleteIcon } from '../icons';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const deleteTodoMutation = useDeleteTodo();

  const hadnleDeleteTodo = async (id: string) => {
    deleteTodoMutation.mutateAsync(id);
  };

  return (
    <ul>
      {todos &&
        todos.map((todo: Todo) => (
          <li>
            <span>{todo.title}</span>
            <button onClick={() => hadnleDeleteTodo(todo.id)}>
              <DeleteIcon />
            </button>
          </li>
        ))}
    </ul>
  );
};
