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
      columns: { ...inCache.columns, [columnToUpdate.columnId]: newColumn },
    })
    .then((data) => data);
}

function useKanbanColumnUpdate() {
  return useMutation(updateKanbanColumn, {
    onSuccess: (data) => {
      queryCache.setQueryData('kanbanData', data);
    },
  });
}

function updateKanban(kanbanData: kanbanDataMap) {
  return kanbanClient.update(kanbanData).then((data) => data);
}

function useKanbanUpdate() {
  return useMutation(updateKanban, {
    onMutate: (data) => {
      queryCache.setQueryData('kanbanData', data);
    },
  });
}

export { useKanbanData, useKanbanUpdate, useKanbanColumnUpdate };
