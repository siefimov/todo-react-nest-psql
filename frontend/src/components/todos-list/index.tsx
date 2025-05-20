import { useState } from 'react';
import { useDeleteTodo, useEditTodo } from '../../api/todos';
import { TODO_STATUSES } from '../../constants';
import type { Todo } from '../../types';
import { DeleteIcon } from '../icons';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>('');
  const deleteTodoMutation = useDeleteTodo();
  const editTodoMutation = useEditTodo();
  console.log(editingTitle);

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

  const handleEditClick = (todo: Todo) => {
    setEditingId(todo.id);
    setEditingTitle(todo.title);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingTitle(e.target.value);
  };

  const handleEditSubmit = (todo: Todo) => {
    if (editingTitle.trim() && editingTitle !== todo.title) {
      editTodoMutation.mutate({ ...todo, title: editingTitle });
    }
    setEditingId(null);
  };

  return (
    <ul>
      {todos &&
        todos.map((todo: Todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.status === TODO_STATUSES.DONE}
              onChange={() => handleToggleStatus(todo)}
            />
            {editingId === todo.id ? (
              <input
                type="text"
                value={editingTitle}
                onChange={handleEditChange}
                onBlur={() => handleEditSubmit(todo)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleEditSubmit(todo);
                  if (e.key === 'Escape') setEditingId(null);
                }}
                autoFocus
              />
            ) : (
              <span
                onClick={() => handleEditClick(todo)}
                style={{ cursor: 'pointer' }}
              >
                {todo.title}
              </span>
            )}
            <button onClick={() => hadnleDeleteTodo(todo.id)}>
              <DeleteIcon />
            </button>
          </li>
        ))}
    </ul>
  );
};
