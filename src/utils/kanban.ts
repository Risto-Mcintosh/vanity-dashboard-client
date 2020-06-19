import * as kanbanClient from './kanban-client';
import { useQuery, useMutation, queryCache } from 'react-query';
import { kanbanDataMap, kanbanColumn } from '../types';

function getKanbanData() {
  return kanbanClient.read().then((data) => data);
}

function useKanbanData() {
  return useQuery('kanbanData', getKanbanData);
}

function updateKanbanColumn(column: kanbanColumn) {
  const inCache = queryCache.getQueryData('kanbanData') as kanbanDataMap;

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
      queryCache.setQueryData('kanbanData', data);
    },
    onMutate: (column) => {
      queryCache.cancelQueries('kanbanData');
      const previousData = queryCache.getQueryData<kanbanDataMap>('kanbanData');

      if (previousData) {
        queryCache.setQueryData<kanbanDataMap>('kanbanData', {
          ...previousData,
          columns: {
            ...previousData.columns,
            [column.columnId]: column
          }
        });
      }
    },
    onError: (error, column, snapshotValue) =>
      queryCache.setQueryData('kanbanData', snapshotValue),
    onSettled: () => queryCache.refetchQueries('kanbanData')
  });
}

function updateKanban(kanbanData: kanbanDataMap) {
  return kanbanClient.update(kanbanData).then((data) => data);
}

function useKanbanUpdate() {
  return useMutation(updateKanban, {
    onMutate: (data) => {
      queryCache.setQueryData('kanbanData', data);
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
      const previousData = queryCache.getQueryData<kanbanDataMap>('kanbanData');

      if (previousData) {
        queryCache.setQueryData<kanbanDataMap>('kanbanData', {
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
      queryCache.cancelQueries('kanbanData');
      const previousData = queryCache.getQueryData<kanbanDataMap>('kanbanData');
      if (previousData) {
        queryCache.setQueryData('kanbanData', {
          ...previousData,
          columnOrder: previousData.columnOrder.filter(
            (col) => col !== columnId
          )
        });
      }
      return previousData;
    },
    onError: (error, columnId, snapshotValue) =>
      queryCache.setQueryData('kanbanData', snapshotValue),
    onSettled: () => queryCache.refetchQueries('kanbanData')
  });
}

export {
  useKanbanData,
  useKanbanUpdate,
  useKanbanColumnUpdate,
  useKanbanColumnCreate,
  useKanbanColumnDelete
};
