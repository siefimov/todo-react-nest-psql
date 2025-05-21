import type { TODO_FILTERS } from '../../constants/todo-filters.const';

export type Todo_Filter = (typeof TODO_FILTERS)[keyof typeof TODO_FILTERS];
