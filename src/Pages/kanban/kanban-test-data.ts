import { kanbanOrderDetail, kanbanColumn } from './kanban.types';

const columns: kanbanColumn[] = [
  {
    columnId: 231,
    columnName: 'Start',
    wip: null,
    columnLock: true,
    columnPosition: 1,
    startColumn: true,
    endColumn: false,
    orderIds: [1, 2, 3],
  },
  {
    columnId: 321,
    columnName: 'Paint',
    wip: 2,
    columnLock: false,
    columnPosition: 2,
    startColumn: true,
    endColumn: false,
    orderIds: [],
  },
  {
    columnId: 653,
    columnName: 'Assemble',
    wip: 2,
    columnLock: false,
    columnPosition: 3,
    startColumn: true,
    endColumn: false,
    orderIds: [],
  },
  {
    columnId: 83,
    columnName: 'Complete',
    wip: null,
    columnLock: true,
    columnPosition: 4,
    startColumn: false,
    endColumn: true,
    orderIds: [],
  },
];

const orders: kanbanOrderDetail[] = [
  {
    orderId: 1,
    customerName: 'Geovanny Quitzon',
    dueOn: '2020-05-17T21:03:13.713Z',
    orderStatus: 'Paid',
    kanbanColumnId: 231,
    priority: 2,
  },
  {
    orderId: 2,
    customerName: 'Cassidy Nolan',
    dueOn: null,
    orderStatus: 'Paid',
    kanbanColumnId: 231,
    priority: 2,
  },
  {
    orderId: 3,
    customerName: 'Jada McClure',
    dueOn: '2020-05-17T14:11:53.111Z',
    orderStatus: 'Paid',
    kanbanColumnId: 231,
    priority: 2,
  },
];

export { orders, columns };
