import React from 'react';
import { render, screen } from '../../utils/test-utils';
import { Todos } from './index';

test('renders Todos page', () => {
  render(<Todos />);
  expect(screen.getByText(/Todo List/i)).toBeInTheDocument();
});
