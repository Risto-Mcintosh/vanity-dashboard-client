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
  // if (!inCache) return
  const columnToUpdate = inCache.columns[column.columnId];
  const newColumn = { ...columnToUpdate, ...column };
  return kanbanClient
    .update({
      ...inCache,
      columns: { ...inCache.columns, [columnToUpdate.columnId]: newColumn }
    })
    .then((data) => data);
}

function useKanbanColumnUpdate() {
  return useMutation(updateKanbanColumn, {
    onSuccess: (data) => {
      queryCache.setQueryData('kanbanData', data);
    }
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
      const inCache = queryCache.getQueryData('kanbanData') as kanbanDataMap;
      queryCache.setQueryData('kanbanData', {
        ...inCache,
        columnOrder: updateColumnOrder(inCache.columnOrder, data.columnId),
        columns: {
          ...inCache.columns,
          [data.columnId]: data
        }
      });
    }
  });
}

function deleteColumn(columnId: string) {
  return kanbanClient.remove(columnId);
}
//TODO this should trigger a refetch for kanbadData
function useKanbanColumnDelete() {
  return useMutation(deleteColumn, {
    onSuccess: (data) => {
      const inCache = queryCache.getQueryData('kanbanData') as kanbanDataMap;
      queryCache.setQueryData('kanbanData', {
        ...inCache,
        columnOrder: inCache.columnOrder.filter((col) => col !== data)
      });
    }
  });
}

export {
  useKanbanData,
  useKanbanUpdate,
  useKanbanColumnUpdate,
  useKanbanColumnCreate,
  useKanbanColumnDelete
};
