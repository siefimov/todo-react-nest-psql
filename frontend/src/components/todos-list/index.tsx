import React, { useState } from 'react';
import clsx from 'clsx';
import { useDeleteTodo, useEditTodo } from '../../api';
import { useFilteredTodos, useSortedTodos } from '../../hooks';
import { TODO_STATUSES } from '../../constants';
import type { Todo } from '../../types';
import { DeleteIcon } from '../icons';
import './todos-list.scss';

type Props = {
  todos: Todo[];
  filter?: string;
};

type EditingState = {
  id: string | null;
  title: string;
};

export const TodoList: React.FC<Props> = ({ todos, filter }) => {
  const [editing, setEditing] = useState<EditingState>({ id: null, title: '' });
  const deleteTodoMutation = useDeleteTodo();
  const editTodoMutation = useEditTodo();

  const filteredTodos = useFilteredTodos(todos, filter);
  const sortedTodos = useSortedTodos(filteredTodos);

  const handleDeleteTodo = async (id: string) => {
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
    setEditing({ id: todo.id, title: todo.title });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditing((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleEditSubmit = (todo: Todo) => {
    if (editing.title.trim() && editing.title !== todo.title) {
      editTodoMutation.mutate({ ...todo, title: editing.title });
    }
    setEditing({ id: null, title: '' });
  };

  return (
    <ul className="todos__list">
      {todos &&
        sortedTodos.map((todo: Todo) => (
          <li
            key={todo.id}
            className={clsx('todos__item', {
              edit: editing.id === todo.id,
            })}
          >
            <label className="custom-checkbox" aria-label="Toggle status">
              <input
                type="checkbox"
                checked={todo.status === TODO_STATUSES.DONE}
                onChange={() => handleToggleStatus(todo)}
                tabIndex={0}
              />
              <span className="checkmark"></span>
            </label>
            {editing.id === todo.id ? (
              <input
                className={clsx('todos__todo-title')}
                type="text"
                value={editing.title}
                onChange={handleEditChange}
                onBlur={() => handleEditSubmit(todo)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleEditSubmit(todo);
                  if (e.key === 'Escape') setEditing({ id: null, title: '' });
                }}
                autoFocus
                aria-label="Edit todo"
              />
            ) : (
              <span
                className={clsx('todos__todo-title', {
                  checked: todo.status === TODO_STATUSES.DONE,
                })}
                onClick={() => handleEditClick(todo)}
                tabIndex={0}
                role="button"
                aria-label="Edit todo"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleEditClick(todo);
                }}
                style={{ cursor: 'pointer' }}
              >
                {todo.title}
              </span>
            )}
            <button
              className="todos__button-delete"
              onClick={() => handleDeleteTodo(todo.id)}
              aria-label="Delete todo"
              tabIndex={0}
            >
              <DeleteIcon />
            </button>
          </li>
        ))}
    </ul>
  );
};
