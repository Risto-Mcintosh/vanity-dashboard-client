import { client } from './api-client';
import * as queryKey from './queryKeys';
import { useQuery, useMutation, queryCache } from 'react-query';
import { kanbanDataMap, kanbanColumn, kanbanOrderDetail } from '../types';

function useKanbanData() {
  return useQuery({
    queryKey: queryKey.KANBAN_DATA,
    queryFn: () => client<kanbanDataMap>('/kanban-board'),
    config: { refetchOnWindowFocus: false }
  });
}

function onColumnUpdate(column: kanbanColumn) {
  queryCache.cancelQueries(queryKey.KANBAN_DATA);
  const previousData = queryCache.getQueryData<kanbanDataMap>(
    queryKey.KANBAN_DATA
  );

  if (previousData) {
    queryCache.setQueryData<kanbanDataMap>(queryKey.KANBAN_DATA, {
      ...previousData,
      columns: {
        ...previousData.columns,
        [column.columnId]: column
      }
    });
  }

  return previousData;
}

function useKanbanColumnUpdate() {
  return useMutation(
    (column: kanbanColumn) =>
      client<kanbanColumn>(`/kanban-board/column/${column.columnId}`, {
        data: column,
        method: 'PUT'
      }),
    {
      onMutate: onColumnUpdate,
      onError: (error, column, snapshotValue) =>
        queryCache.setQueryData(queryKey.KANBAN_DATA, snapshotValue),
      onSettled: () => queryCache.refetchQueries(queryKey.KANBAN_DATA)
    }
  );
}

function useKanbanColumnOrderUpdate() {
  return useMutation(
    (columnOrder: string[]) =>
      client<string[]>('/kanban-board', {
        data: columnOrder,
        method: 'PUT'
      }),
    {
      onError: (error) => console.log(error),
      onSettled: (columnOrder) => console.log(columnOrder)
    }
  );
}

function onColumnCreate(newColumn: kanbanColumn) {
  const updateColumnOrder = (columnOrder: string[], columnId: string) => {
    const order = [...columnOrder];
    const secondToLast = order.length - 1;
    order.splice(secondToLast, 0, columnId);
    return order;
  };

  const previousData = queryCache.getQueryData<kanbanDataMap>(
    queryKey.KANBAN_DATA
  );

  if (previousData) {
    queryCache.setQueryData<kanbanDataMap>(queryKey.KANBAN_DATA, {
      ...previousData,
      columnOrder: updateColumnOrder(
        previousData.columnOrder,
        newColumn.columnId
      ),
      columns: {
        ...previousData.columns,
        [newColumn.columnId]: newColumn
      }
    });
  }
}

function useKanbanColumnCreate() {
  return useMutation(
    (columnName: string) =>
      client<kanbanColumn>('/kanban-board/column', {
        data: columnName
      }),
    {
      onSuccess: onColumnCreate
    }
  );
}

function onDeleteColumn(columnId: string) {
  queryCache.cancelQueries(queryKey.KANBAN_DATA);
  const previousData = queryCache.getQueryData<kanbanDataMap>(
    queryKey.KANBAN_DATA
  );
  if (previousData) {
    queryCache.setQueryData(queryKey.KANBAN_DATA, {
      ...previousData,
      columnOrder: previousData.columnOrder.filter((col) => col !== columnId)
    });
  }
  return previousData;
}

function useKanbanColumnDelete() {
  return useMutation(
    (columnId: string) =>
      client(`/kanban-board/column/${columnId}`, { method: 'DELETE' }),
    {
      onMutate: onDeleteColumn,
      onError: (error, columnId, snapshotValue) =>
        queryCache.setQueryData(queryKey.KANBAN_DATA, snapshotValue),
      onSettled: () => queryCache.refetchQueries(queryKey.KANBAN_DATA)
    }
  );
}

function useKanbanPositionUpdate() {
  return useMutation(
    (order: kanbanOrderDetail) =>
      client<kanbanOrderDetail>(`/kanban-board/order/${order.orderId}`, {
        method: 'PUT',
        data: order
      }),
    {
      onError: (error) => console.log(error),
      onSettled: (order) => console.log(order)
    }
  );
}

export {
  useKanbanData,
  useKanbanColumnOrderUpdate,
  useKanbanColumnUpdate,
  useKanbanColumnCreate,
  useKanbanColumnDelete,
  useKanbanPositionUpdate
};
