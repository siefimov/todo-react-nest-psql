import { useDeleteTodo, useEditTodo } from '../../api/todos';
import { TODO_STATUSES } from '../../constants';
import type { Todo } from '../../types';
import { DeleteIcon } from '../icons';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const deleteTodoMutation = useDeleteTodo();
  const editTodoMutation = useEditTodo();

  const hadnleDeleteTodo = async (id: string) => {
    deleteTodoMutation.mutateAsync(id);
  };

  const handleToggleStatus = (todo: Todo) => {
    editTodoMutation.mutate({
      ...todo,
      status:
        todo.status === TODO_STATUSES.ACTIVE
          ? TODO_STATUSES.DONE
          : TODO_STATUSES.ACTIVE,
    });
  };

  return (
    <ul>
      {todos &&
        todos.map((todo: Todo) => (
          <li>
            <input
              type="checkbox"
              checked={todo.status === TODO_STATUSES.DONE}
              onChange={() => handleToggleStatus(todo)}
            />
            <span>{todo.title}</span>
            <button onClick={() => hadnleDeleteTodo(todo.id)}>
              <DeleteIcon />
            </button>
          </li>
        ))}
    </ul>
  );
};
