import * as kanbanClient from './kanban-client';
import { useQuery, useMutation, queryCache } from 'react-query';
import { kanbanDataMap } from '../types';

function getKanbanData() {
  return kanbanClient.read().then((data) => data);
}

function useKanbanData() {
  return useQuery('kanbanData', getKanbanData);
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

export { useKanbanData, useKanbanUpdate };
