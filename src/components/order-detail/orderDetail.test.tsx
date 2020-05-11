import React from 'react';
import OrderDetail from './';
import OrderStatus from './Status';
import { render, screen, cleanup } from '@testing-library/react';
import { Order } from '../../types';
import {
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/dom';
import { act } from 'react-dom/test-utils';

const order1: Order = {
  id: 1,
  total: 600,
  orderedOn: new Date(),
  orderStatus: 'New',
  meta: {},
  customer: {
    id: 2,
    name: 'Someone Name',
    email: 'someone@gmail.com',
    phone: '214-333-333',
  },
  vanity: {
    color: 'Black',
    mirror: {
      size: 'Large',
      price: 200,
    },
    table: {
      size: 'Large',
      price: 200,
    },
    baseMaterial: {
      size: 'Large',
      price: 200,
    },
  },
};

afterEach(cleanup);

it('should have a disabled button', () => {
  render(
    <OrderStatus orderMetaData={order1.meta} orderStatus={order1.orderStatus} />
  );

  expect(screen.getByTestId('setDueDate')).toBeDisabled();
});

it("update order status from 'new' to 'pending'", async () => {
  render(<OrderDetail />);
  const markAsPaidButton = await screen.findByText(/mark as paid/i);
  fireEvent.click(markAsPaidButton);
  const button = screen.getByTestId('orderStatus');
  expect(button).toHaveTextContent(/pending/i);
  expect(button).not.toBeDisabled();
  await waitFor(() => screen.queryByText(/pending/i));
});
