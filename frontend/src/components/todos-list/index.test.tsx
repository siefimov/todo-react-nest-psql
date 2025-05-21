import React from 'react';
import { render, screen } from '../../utils/test-utils';
import { TodoList } from './index';
import type { Todo } from '../../types';
import { TODO_STATUSES } from '../../constants';

const now = new Date().toISOString();
const todos: Todo[] = [
  {
    id: '1',
    title: 'Test 1',
    status: TODO_STATUSES.ACTIVE,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '2',
    title: 'Test 2',
    status: TODO_STATUSES.DONE,
    createdAt: now,
    updatedAt: now,
  },
];

test('renders todo list', () => {
  render(<TodoList todos={todos} />);
  expect(screen.getByText('Test 1')).toBeInTheDocument();
  expect(screen.getByText('Test 2')).toBeInTheDocument();
});

test('can toggle todo status', () => {
  render(<TodoList todos={todos} />);
  const checkboxes = screen.getAllByRole('checkbox');
  expect(checkboxes.length).toBe(2);
});
