import * as kanbanClient from './kanban-client';
import * as queryKey from './queryKeys';
import { useQuery, useMutation, queryCache } from 'react-query';
import { kanbanDataMap, kanbanColumn } from '../types';

function useKanbanData() {
  return useQuery({
    queryKey: queryKey.KANBAN_DATA,
    queryFn: () => kanbanClient.read().then((data) => data)
  });
}

function updateKanbanColumn(column: kanbanColumn) {
  const inCache = queryCache.getQueryData(
    queryKey.KANBAN_DATA
  ) as kanbanDataMap;

  return kanbanClient
    .update({
      ...inCache,
      columns: { ...inCache.columns, [column.columnId]: column }
    })
    .then((data) => data);
}

function useKanbanColumnUpdate() {
  return useMutation(updateKanbanColumn, {
    onMutate: (column) => {
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
    },
    onError: (error, column, snapshotValue) =>
      queryCache.setQueryData(queryKey.KANBAN_DATA, snapshotValue),
    onSettled: () => queryCache.refetchQueries(queryKey.KANBAN_DATA)
  });
}

function useKanbanUpdate() {
  return useMutation(
    (kanbanData: kanbanDataMap) =>
      kanbanClient.update(kanbanData).then((data) => data),
    {
      onMutate: (data) => {
        queryCache.setQueryData(queryKey.KANBAN_DATA, data);
      }
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
      kanbanClient.create(columnName).then((data) => data),
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
  return useMutation((columnId: string) => kanbanClient.remove(columnId), {
    onMutate: onDeleteColumn,
    onError: (error, columnId, snapshotValue) =>
      queryCache.setQueryData(queryKey.KANBAN_DATA, snapshotValue),
    onSettled: () => queryCache.refetchQueries(queryKey.KANBAN_DATA)
  });
}

export {
  useKanbanData,
  useKanbanUpdate,
  useKanbanColumnUpdate,
  useKanbanColumnCreate,
  useKanbanColumnDelete
};
