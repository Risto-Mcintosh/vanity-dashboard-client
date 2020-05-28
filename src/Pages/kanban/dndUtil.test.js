import DragNDrop from './dndUtil';

const kanbanData = {
  columnOrder: ['c1', 'c2'],
  columns: {
    c1: {
      columnId: 'c1',
      columnName: 'Start',
      wip: null,
      columnLock: true,
      isStartColumn: true,
      isCompleteColumn: false,
      orderIds: ['1', '2', '3'],
    },
    c2: {
      columnId: 'c2',
      columnName: 'Assemble',
      wip: 2,
      columnLock: false,
      isStartColumn: false,
      isCompleteColumn: false,
      orderIds: [],
    },
  },
  orders: {
    '1': {
      orderId: '1',
      customerName: 'Geovanny Quitzon',
      dueOn: '2020-05-17T21:03:13.713Z',
      orderStatus: 'Paid',
      kanbanColumnId: 'c1',
      priority: 2,
    },
    '2': {
      orderId: '2',
      customerName: 'Cassidy Nolan',
      dueOn: null,
      orderStatus: 'Paid',
      kanbanColumnId: 'c1',
      priority: 2,
    },
  },
};
const updateDataFn = jest.fn();

it('moves c1 to 2nd position', () => {
  const DropResult = {
    source: {
      droppableId: '',
      index: 0,
    },
    destination: {
      droppableId: '',
      index: 1,
    },
    draggableId: 'c1',
  };

  const dnd = new DragNDrop({ ...kanbanData, ...DropResult, updateDataFn });
  dnd.updateColumnOrder();

  expect(updateDataFn).toBeCalledTimes(1);
  expect(updateDataFn).toBeCalledWith({
    ...kanbanData,
    columnOrder: ['c2', 'c1'],
  });
});

it('should move order1 to column2(c2)', () => {
  const DropResult = {
    source: {
      droppableId: 'c1',
      index: 0,
    },
    destination: {
      droppableId: 'c2',
      index: 0,
    },
    draggableId: '1',
  };

  const dnd = new DragNDrop({ ...kanbanData, ...DropResult, updateDataFn });
  dnd.moveToNewColumn();
  expect(updateDataFn).toBeCalled();
  expect(kanbanData.orders['1'].kanbanColumnId).toBe('c2');
});
