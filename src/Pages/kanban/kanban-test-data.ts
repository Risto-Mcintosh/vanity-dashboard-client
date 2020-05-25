import { kanbanOrderDetail, kanbanColumn } from './kanban.types';

// const columns: kanbanColumn[] = [
//   {
//     columnId: '231',
//     columnName: 'Start',
//     wip: null,
//     columnLock: true,
//     startColumn: true,
//     endColumn: false,
//     orderIds: ['1', '2', '3'],
//   },
//   {
//     columnId: '653',
//     columnName: 'Assemble',
//     wip: 2,
//     columnLock: false,
//     startColumn: true,
//     endColumn: false,
//     orderIds: [],
//   },
//   {
//     columnId: '321',
//     columnName: 'Paint',
//     wip: 2,
//     columnLock: false,
//     startColumn: true,
//     endColumn: false,
//     orderIds: [],
//   },
//   {
//     columnId: '83',
//     columnName: 'Complete',
//     wip: null,
//     columnLock: true,
//     startColumn: false,
//     endColumn: true,
//     orderIds: [],
//   },
// ];

type columnHashMap = {
  [key: string]: kanbanColumn;
};

const columns: columnHashMap = {
  '231': {
    columnId: '231',
    columnName: 'Start',
    wip: null,
    columnLock: true,
    isStartColumn: true,
    isCompleteColumn: false,
    orderIds: ['1', '2', '3'],
  },
  '653': {
    columnId: '653',
    columnName: 'Assemble',
    wip: 2,
    columnLock: false,
    isStartColumn: false,
    isCompleteColumn: false,
    orderIds: [],
  },
  '321': {
    columnId: '321',
    columnName: 'Paint',
    wip: 2,
    columnLock: false,
    isStartColumn: false,
    isCompleteColumn: false,
    orderIds: [],
  },
  '83': {
    columnId: '83',
    columnName: 'Complete',
    wip: null,
    columnLock: true,
    isStartColumn: false,
    isCompleteColumn: true,
    orderIds: [],
  },
};

const columnOrder = ['231', '653', '321', '83'];

type orderHashMap = {
  [key: string]: kanbanOrderDetail;
};

const orders: orderHashMap = {
  '1': {
    orderId: '1',
    customerName: 'Geovanny Quitzon',
    dueOn: '2020-05-17T21:03:13.713Z',
    orderStatus: 'Paid',
    kanbanColumnId: '231',
    priority: 2,
  },
  '2': {
    orderId: '2',
    customerName: 'Cassidy Nolan',
    dueOn: null,
    orderStatus: 'Paid',
    kanbanColumnId: '231',
    priority: 2,
  },
  '3': {
    orderId: '3',
    customerName: 'Jada McClure',
    dueOn: '2020-05-17T14:11:53.111Z',
    orderStatus: 'Paid',
    kanbanColumnId: '231',
    priority: 2,
  },
};

export { orders, columns, columnOrder };
