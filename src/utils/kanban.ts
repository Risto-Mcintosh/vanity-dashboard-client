import * as kanbanClient from './kanban-client';
import * as queryKey from './queryKeys';
import { useQuery, useMutation, queryCache } from 'react-query';
import { kanbanDataMap, kanbanColumn } from '../types';

function getKanbanData() {
  return kanbanClient.read().then((data) => data);
}

function useKanbanData() {
  return useQuery(queryKey.KANBAN_DATA, getKanbanData);
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
    onSuccess: (data) => {
      queryCache.setQueryData(queryKey.KANBAN_DATA, data);
    },
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
    },
    onError: (error, column, snapshotValue) =>
      queryCache.setQueryData(queryKey.KANBAN_DATA, snapshotValue),
    onSettled: () => queryCache.refetchQueries(queryKey.KANBAN_DATA)
  });
}

function updateKanban(kanbanData: kanbanDataMap) {
  return kanbanClient.update(kanbanData).then((data) => data);
}

function useKanbanUpdate() {
  return useMutation(updateKanban, {
    onMutate: (data) => {
      queryCache.setQueryData(queryKey.KANBAN_DATA, data);
    }
  });
}

function createNewColumn(columnName: string) {
  return kanbanClient.create(columnName).then((data) => data);
}

function updateColumnOrder(columnOrder: string[], columnId: string) {
  const order = [...columnOrder];
  const secondToLast = order.length - 1;
  order.splice(secondToLast, 0, columnId);
  return order;
}
function useKanbanColumnCreate() {
  return useMutation(createNewColumn, {
    onSuccess: (data) => {
      const previousData = queryCache.getQueryData<kanbanDataMap>(
        queryKey.KANBAN_DATA
      );

      if (previousData) {
        queryCache.setQueryData<kanbanDataMap>(queryKey.KANBAN_DATA, {
          ...previousData,
          columnOrder: updateColumnOrder(
            previousData.columnOrder,
            data.columnId
          ),
          columns: {
            ...previousData.columns,
            [data.columnId]: data
          }
        });
      }
    }
  });
}

function deleteColumn(columnId: string) {
  return kanbanClient.remove(columnId);
}

function useKanbanColumnDelete() {
  return useMutation(deleteColumn, {
    onMutate: (columnId) => {
      queryCache.cancelQueries(queryKey.KANBAN_DATA);
      const previousData = queryCache.getQueryData<kanbanDataMap>(
        queryKey.KANBAN_DATA
      );
      if (previousData) {
        queryCache.setQueryData(queryKey.KANBAN_DATA, {
          ...previousData,
          columnOrder: previousData.columnOrder.filter(
            (col) => col !== columnId
          )
        });
      }
      return previousData;
    },
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
