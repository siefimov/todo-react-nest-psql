import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { useDeleteTodo, useEditTodo } from '../../api/todos';
import { TODO_STATUSES } from '../../constants';
import type { Todo } from '../../types';
import { DeleteIcon } from '../icons';
import './todos-list.scss';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>('');
  const deleteTodoMutation = useDeleteTodo();
  const editTodoMutation = useEditTodo();

  const sortedTodos = useMemo(() => {
    return todos
      .slice()
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
  }, [todos]);

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
    <ul className="todos__list">
      {todos &&
        sortedTodos.map((todo: Todo) => (
          <li
            key={todo.id}
            className={clsx('todos__item', {
              edit: editingId === todo.id,
            })}
          >
            <label className="custom-checkbox">
              <input
                type="checkbox"
                checked={todo.status === TODO_STATUSES.DONE}
                onChange={() => handleToggleStatus(todo)}
              />
              <span className="checkmark"></span>
            </label>
            {editingId === todo.id ? (
              <input
                className={clsx('todos__todo-title')}
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
                className={clsx('todos__todo-title', {
                  checked: todo.status === TODO_STATUSES.DONE,
                })}
                onClick={() => handleEditClick(todo)}
                style={{ cursor: 'pointer' }}
              >
                {todo.title}
              </span>
            )}
            <button
              className="todos__button-delete"
              onClick={() => hadnleDeleteTodo(todo.id)}
            >
              <DeleteIcon />
            </button>
          </li>
        ))}
    </ul>
  );
};
