import kanbanData from '../test/kanban-data.json';
import { kanbanDataMap, kanbanColumn } from '../types';

async function read() {
  return kanbanData as kanbanDataMap;
}

async function update(newData: kanbanDataMap): Promise<kanbanDataMap> {
  return { ...kanbanData, ...newData };
}

async function add(newColumn: kanbanColumn): Promise<kanbanDataMap> {
  const col = {
    ...newColumn,
    columnLock: false,
    isStartColumn: false,
    isCompleteColumn: false,
    orderIds: [],
    color: null
  };
  return {
    ...kanbanData,
    columns: {
      ...kanbanData.columns,
      [newColumn.columnId]: col
    }
  };
}

export { read, update, add };
