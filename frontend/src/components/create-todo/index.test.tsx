import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '../../utils/test-utils';
import { CreateTodo } from './index';

test('renders input and button', () => {
  render(<CreateTodo />);
  expect(screen.getByPlaceholderText(/add new todo/i)).toBeInTheDocument();
  expect(screen.getByText(/\+ New/i)).toBeInTheDocument();
});
