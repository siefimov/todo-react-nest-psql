import type { TodoStatus } from './todo-status.type';

export type Todo = {
  id: string;
  title: string;
  status: TodoStatus;
  createdAt: string;
  updatedAt: string;
};
