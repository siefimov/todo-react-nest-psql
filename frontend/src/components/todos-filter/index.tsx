import React from 'react';
import { TODO_FILTERS } from '../../constants';
import type { Todo_Filter } from '../../types';

type Props = {
  filter: Todo_Filter;
  setFilter: (filter: Todo_Filter) => void;
};

export const TodosFilter: React.FC<Props> = ({ filter, setFilter }) => (
  <div className="todos__filters">
    <label htmlFor="todos-filter">Filter:</label>
    <select
      id="todos-filter"
      value={filter}
      onChange={(e) => setFilter(e.target.value as Todo_Filter)}
    >
      <option value={TODO_FILTERS.ALL}>All</option>
      <option value={TODO_FILTERS.ACTIVE}>Active</option>
      <option value={TODO_FILTERS.DONE}>Done</option>
    </select>
  </div>
);
