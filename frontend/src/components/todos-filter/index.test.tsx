import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render, screen } from '../../utils/test-utils';
import { TodosFilter } from './index';

test('renders filter select', () => {
  const setFilter = jest.fn();
  render(<TodosFilter filter="all" setFilter={setFilter} />);
  expect(screen.getByLabelText(/filter/i)).toBeInTheDocument();
});

test('calls setFilter on change', () => {
  const setFilter = jest.fn();
  render(<TodosFilter filter="all" setFilter={setFilter} />);
  fireEvent.change(screen.getByLabelText(/filter/i), {
    target: { value: 'done' },
  });
  expect(setFilter).toHaveBeenCalledWith('done');
});
