import React, { useState } from 'react';
import { useCreateTodo } from '../../api/todos';
import './create-todo.scss';

export const CreateTodo: React.FC = () => {
  const [title, setTitle] = useState('');
  const createTodoMutation = useCreateTodo();

  const handleCreateTodo = () => {
    if (!title.trim()) return;
    createTodoMutation.mutate({ title });
    setTitle('');
  };

  return (
    <div className="todos__new">
      <input
        className="todos__new-input"
        type="text"
        placeholder="add new todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleCreateTodo();
        }}
      />
      <button className="todos__new-button" onClick={handleCreateTodo}>
        + New
      </button>
    </div>
  );
};
