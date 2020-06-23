import kanbanData from '../test/kanban-data.json';
import { kanbanDataMap, kanbanColumn } from '../types';

//TODO add single api-client
// see https://github.com/kentcdodds/bookshelf/blob/master/src/utils/api-client.js
async function read() {
  return kanbanData as kanbanDataMap;
}

async function update(newData: kanbanDataMap): Promise<kanbanDataMap> {
  return { ...kanbanData, ...newData };
}

async function create(columnName: string): Promise<kanbanColumn> {
  return {
    columnName,
    columnId: Math.floor(Math.random() * 10).toString(),
    columnLock: false,
    isStartColumn: false,
    isCompleteColumn: false,
    orderIds: [],
    color: null
  };
}

async function remove(columnId: string) {
  return columnId;
}

export { read, update, create, remove };
