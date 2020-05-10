import React from 'react';
import OrderInfo from './Info';
import OrderStatus from './Status';
import { render, screen } from '@testing-library/react';
import { Order, OrderStatus as OrderStatusType } from '../../types';
import { fireEvent, waitFor } from '@testing-library/dom';

it('should have a disabled button', () => {
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

  render(
    <OrderStatus orderMetaData={order1.meta} orderStatus={order1.orderStatus} />
  );

  expect(screen.getByTestId('setDueDate')).toBeDisabled();
});
