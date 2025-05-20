import type { TODO_STATUSES } from '../../constants';

export type TodoStatus = (typeof TODO_STATUSES)[keyof typeof TODO_STATUSES];
