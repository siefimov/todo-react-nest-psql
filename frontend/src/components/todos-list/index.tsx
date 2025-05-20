import type { Todo } from '../../types';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul>
      {todos &&
        todos.map((todo: Todo) => (
          <li>
            <span>{todo.title}</span>
          </li>
        ))}
    </ul>
  );
};
