import kanbanData from '../test/kanban-data.json';
import { kanbanDataMap } from '../types';

async function read() {
  return kanbanData as kanbanDataMap;
}

async function update(newData: kanbanDataMap): Promise<kanbanDataMap> {
  return { ...kanbanData, ...newData };
}

export { read, update };
