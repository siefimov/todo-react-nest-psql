import React, { useMemo, useState } from 'react';
import clsx from 'clsx';
import { useDeleteTodo, useEditTodo } from '../../api';
import { TODO_STATUSES } from '../../constants';
import type { Todo } from '../../types';
import { DeleteIcon } from '../icons';
import './todos-list.scss';

type Props = {
  todos: Todo[];
  filter?: string;
};

export const TodoList: React.FC<Props> = ({ todos, filter }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>('');
  const deleteTodoMutation = useDeleteTodo();
  const editTodoMutation = useEditTodo();

  const filteredTodos = useMemo(() => {
    if (!filter) return todos;
    if (filter === 'active')
      return todos.filter((todo) => todo.status === TODO_STATUSES.ACTIVE);
    if (filter === 'done')
      return todos.filter((todo) => todo.status === TODO_STATUSES.DONE);
    return todos;
  }, [todos, filter]);

  const sortedTodos = useMemo(() => {
    return filteredTodos
      .slice()
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
  }, [filteredTodos]);

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
            <label className="custom-checkbox" aria-label="Toggle status">
              <input
                type="checkbox"
                checked={todo.status === TODO_STATUSES.DONE}
                onChange={() => handleToggleStatus(todo)}
                tabIndex={0}
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
