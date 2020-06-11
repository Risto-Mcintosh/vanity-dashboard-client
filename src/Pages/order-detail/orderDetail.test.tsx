import React from 'react';
import OrderStatus from './Status';
import OrderDetail from '.';
import { render, screen, cleanup, userEvent } from '../../test/app-test-setup';
//import { render, screen, cleanup } from '@testing-library/react';
import { Order } from '../../types';

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
    phone: '214-333-333'
  },
  vanity: {
    color: 'Black',
    mirror: {
      type: 'mirror',
      size: 'Large',
      price: 200
    },
    table: {
      type: 'table',
      size: 'Large',
      price: 200
    },
    baseMaterial: {
      type: 'baseMaterial',
      size: 'Large',
      price: 200
    }
  }
};

jest.mock('../../utils/orders.ts', () => {
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
      phone: '214-333-333'
    },
    vanity: {
      color: 'Black',
      mirror: {
        type: 'mirror',
        size: 'Large',
        price: 200
      },
      table: {
        type: 'table',
        size: 'Large',
        price: 200
      },
      baseMaterial: {
        type: 'baseMaterial',
        size: 'Large',
        price: 200
      }
    }
  };
  const mutate = jest.fn();
  return {
    getOrder: jest.fn(() => order1),
    useOrder: jest.fn(() => ({ order: order1, error: '' })),
    useUpdateOrder: jest.fn(() => [mutate])
  };
});

afterEach(cleanup);

// it('should have a disabled button', () => {
//   render(
//     <OrderStatus orderStatus={order1.orderStatus} />
//   );

//   expect(screen.getByTestId('setDueDate')).toBeDisabled();
// });

// it('should do some stuff', async () => {
//   render(<OrderDetail />, { route: '/orders/1' });

//   const markPaid = await screen.findByRole('button', { name: /mark as/i });
//   expect(markPaid).toHaveTextContent(/mark/i);
//   userEvent.click(markPaid);

//   const setDue = await screen.findByRole('button', { name: /Set Due Date/i });
//   const status = await screen.findByText(/pending/i);
//   console.log(status);
// });
