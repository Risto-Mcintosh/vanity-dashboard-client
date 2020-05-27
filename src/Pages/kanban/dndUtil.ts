/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { DropResult, DraggableLocation } from 'react-beautiful-dnd';
import { kanbanDataMap, kanbanColumn } from '../../types';
import { MutationFunction } from 'react-query';

type updateFunction = {
  updateDataFn: MutationFunction<kanbanDataMap, kanbanDataMap>;
};

export default class DragNDrop {
  source: DraggableLocation;
  destination: DraggableLocation;
  draggableId: string;
  data: kanbanDataMap;
  startColumn: kanbanColumn;
  finishColumn: kanbanColumn;
  updateDataFn: MutationFunction<kanbanDataMap, kanbanDataMap>;
  constructor({
    source,
    destination,
    draggableId,
    updateDataFn,
    ...kanbanData
  }: DropResult & kanbanDataMap & updateFunction) {
    this.source = source;
    this.destination = destination!;
    this.draggableId = draggableId;
    this.data = kanbanData;
    this.startColumn = kanbanData.columns[source.droppableId];
    this.finishColumn = kanbanData.columns[destination!.droppableId];
    this.updateDataFn = updateDataFn;
  }

  inSamePosition() {
    return (
      this.source.index === this.destination.index &&
      this.source.droppableId === this.destination.droppableId
    );
  }

  updateColumnOrder() {
    const columnId = this.data.columnOrder[this.destination.index];
    const destinationColumn = this.data.columns[columnId];

    if (destinationColumn.isStartColumn || destinationColumn.isCompleteColumn)
      return this.data.columnOrder;

    const newColumnOrder = [...this.data.columnOrder];
    newColumnOrder.splice(this.source.index, 1);
    newColumnOrder.splice(this.destination.index, 0, this.draggableId);

    this.updateDataFn({
      ...this.data,
      columnOrder: newColumnOrder,
    });
  }

  inSameColumn() {
    return this.startColumn === this.finishColumn;
  }

  reorderWithinColumn() {
    const newOrder = [...this.startColumn.orderIds];
    newOrder.splice(this.source.index, 1);
    newOrder.splice(this.destination.index, 0, this.draggableId);

    this.updateDataFn({
      ...this.data,
      columns: {
        ...this.data.columns,
        [this.startColumn.columnId]: {
          ...this.startColumn,
          orderIds: newOrder,
        },
      },
    });
  }

  moveToNewColumn() {
    const movedItem = this.data.orders[this.draggableId];
    movedItem.kanbanColumnId = this.destination.droppableId;

    const newStart = [...this.startColumn.orderIds];
    newStart.splice(this.source.index, 1);

    const newStartColumn = {
      ...this.startColumn,
      orderIds: newStart,
    };

    const newFinish = [...this.finishColumn.orderIds];
    newFinish.splice(this.destination.index, 0, this.draggableId);

    const newFinishColumn = {
      ...this.finishColumn,
      orderIds: newFinish,
    };

    this.updateDataFn({
      ...this.data,
      orders: { ...this.data.orders, [movedItem.orderId]: movedItem },
      columns: {
        ...this.data.columns,
        [newStartColumn.columnId]: newStartColumn,
        [newFinishColumn.columnId]: newFinishColumn,
      },
    });
  }
}

// function isSamePosition({ source, destination }: DropResult) {
//   return (
//     source.index === destination!.index &&
//     source.droppableId === destination!.droppableId
//   );
// }

// function updateColumnOrder({
//   source,
//   destination,
//   draggableId,
//   ...kanbanData
// }: DropResult & kanbanDataMap) {
//   const columnId = kanbanData.columnOrder[destination!.index];
//   const destinationColumn = kanbanData.columns[columnId];

//   if (destinationColumn.isStartColumn || destinationColumn.isCompleteColumn)
//     return kanbanData.columnOrder;

//   const newColumnOrder = [...kanbanData.columnOrder];
//   newColumnOrder.splice(source.index, 1);
//   newColumnOrder.splice(destination!.index, 0, draggableId);

//   return newColumnOrder;
// }

// function reorderWithinColumn({
//   source,
//   destination,
//   draggableId,
//   ...kanbanData
// }: DropResult & kanbanDataMap) {
//   const column = kanbanData.columns[source.droppableId];
//   const newOrder = [...column.orderIds];
//   newOrder.splice(source.index, 1);
//   newOrder.splice(destination!.index, 0, draggableId);

//   return {
//     ...column,
//     orderIds: newOrder,
//   };
// }

// function moveToNewColumn({
//   source,
//   destination,
//   draggableId,
//   ...kanbanData
// }: DropResult & kanbanDataMap) {
//   const startColumn = kanbanData.columns[source.droppableId];
//   const finishColumn = kanbanData.columns[destination!.droppableId];

//   const movedItem = kanbanData.orders[draggableId];
//   movedItem.kanbanColumnId = destination!.droppableId;

//   const newStart = [...startColumn.orderIds];
//   newStart.splice(source.index, 1);

//   const newFinish = [...finishColumn.orderIds];
//   newFinish.splice(destination!.index, 0, draggableId);

//   return {
//     movedItem,
//     newStartColumn: {
//       ...startColumn,
//       orderIds: newStart,
//     },
//     newFinishColumn: {
//       ...finishColumn,
//       orderIds: newFinish,
//     },
//   };
// }

//export { isSamePosition, updateColumnOrder, moveToNewColumn,reorderWithinColumn };
