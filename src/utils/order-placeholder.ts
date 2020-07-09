import { Order, OrderStatus, VanityComponent } from '../types';
import { PaginationData } from './api-client';

const loadingOrder: Order = {
  id: 0,
  total: 0,
  orderedOn: new Date(),
  orderStatus: 'Loading...' as OrderStatus,
  meta: {
    buildStatus: {
      color: '#777',
      name: 'Loading'
    },
    completedOn: null,
    dueOn: new Date(),
    paidOn: null
  },
  customer: {
    id: 0,
    name: 'Loading...',
    email: 'Loading...',
    phone: 'Loading...'
  },
  vanity: {
    color: 'White',
    mirror: {
      type: 'Loading...',
      size: 'Loading...',
      price: 0
    },
    table: {
      type: 'Loading...',
      size: 'Loading...',
      price: 0
    },
    baseMaterial: {
      type: 'Loading...',
      size: 'Loading...',
      price: 0
    }
  }
};

const loadingProduct: VanityComponent = {
  type: 'Loading...',
  size: 'Loading ...',
  price: 0
};

const loadingPageData: PaginationData = {
  Count: 2,
  CurrentPage: 1,
  HasNext: false,
  HasPrevious: false,
  TotalCount: 2,
  TotalPages: 1
};

export { loadingOrder, loadingProduct, loadingPageData };
