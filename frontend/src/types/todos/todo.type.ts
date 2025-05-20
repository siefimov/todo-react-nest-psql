export const TODO_STATUS = {
  ACTIVE: 'active',
  DONE: 'done',
} as const;

export type TodoStatus = (typeof TODO_STATUS)[keyof typeof TODO_STATUS];

export type Todo = {
  id: string;
  title: string;
  status: TodoStatus;
  createdAt: string;
  updatedAt: string;
};
