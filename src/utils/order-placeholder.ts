import { Order, OrderStatus } from '../types';

const loadingOrder: Order = {
  id: 0,
  total: 0,
  orderedOn: new Date(),
  orderStatus: 'Loading...' as OrderStatus,
  meta: {},
  customer: {
    id: 0,
    name: 'Loading...',
    email: 'Loading...',
    phone: 'Loading...',
  },
  vanity: {
    color: 'White',
    mirror: {
      size: 'Loading...',
      price: 0,
    },
    table: {
      size: 'Loading...',
      price: 0,
    },
    baseMaterial: {
      size: 'Loading...',
      price: 0,
    },
  },
};

export { loadingOrder };
