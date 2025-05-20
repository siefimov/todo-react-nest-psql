import { useState } from 'react';
import { useCreateTodo } from '../../api/todos/use-create-todo';

export const CreateTodo: React.FC = () => {
  const [title, setTitle] = useState('');
  const createTodoMutation = useCreateTodo();

  const handleCreateTodo = () => {
    if (!title.trim()) return;
    createTodoMutation.mutate({ title });
    setTitle('');
  };

  return (
    <>
      <input
        type="text"
        placeholder="+ new todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleCreateTodo();
        }}
      />
      <button onClick={handleCreateTodo}>+ New</button>
    </>
  );
};
