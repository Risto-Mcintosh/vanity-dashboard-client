/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { DropResult, DraggableLocation } from 'react-beautiful-dnd';
import {
  kanbanDataMap,
  kanbanColumn,
  kanbanOrderDetail,
  Order
} from '../../types';
import { MutationFunction, queryCache } from 'react-query';
import * as queryKey from '../../utils/queryKeys';
import { KanbanOrderUpdateFn } from '../../utils/kanban';

type updateFunctions = {
  columnOrder: MutationFunction<string[], string[]>;
  orderPosition: MutationFunction<kanbanOrderDetail, KanbanOrderUpdateFn>;
};

export default class DragNDrop {
  source: DraggableLocation;
  destination: DraggableLocation;
  draggableId: string;
  data: kanbanDataMap;
  startColumn: kanbanColumn;
  finishColumn: kanbanColumn;
  updateFn: updateFunctions;
  constructor({
    source,
    destination,
    draggableId,
    updateFn,
    ...kanbanData
  }: DropResult & kanbanDataMap & { updateFn: updateFunctions }) {
    this.source = source;
    this.destination = destination!;
    this.draggableId = draggableId;
    this.data = kanbanData;
    this.startColumn = kanbanData.columns[source.droppableId];
    this.finishColumn = kanbanData.columns[destination!.droppableId];
    this.updateFn = updateFn;
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

    queryCache.setQueryData(queryKey.KANBAN_DATA, {
      ...this.data,
      columnOrder: newColumnOrder
    });

    this.updateFn.columnOrder(newColumnOrder);
  }

  inSameColumn() {
    return this.startColumn === this.finishColumn;
  }

  reorderWithinColumn() {
    const newOrder = [...this.startColumn.orderIds];
    newOrder.splice(this.source.index, 1);
    newOrder.splice(this.destination.index, 0, this.draggableId);

    queryCache.setQueryData(queryKey.KANBAN_DATA, {
      ...this.data,
      columns: {
        ...this.data.columns,
        [this.startColumn.columnId]: {
          ...this.startColumn,
          orderIds: newOrder
        }
      }
    });
  }

  moveToNewColumn() {
    const movedOrder = this.data.orders[this.draggableId];
    movedOrder.kanbanColumnId = this.destination.droppableId;

    const newStart = [...this.startColumn.orderIds];
    newStart.splice(this.source.index, 1);

    const newStartColumn = {
      ...this.startColumn,
      orderIds: newStart
    };

    const newFinish = [...this.finishColumn.orderIds];
    newFinish.splice(this.destination.index, 0, this.draggableId);

    const newFinishColumn = {
      ...this.finishColumn,
      orderIds: newFinish
    };

    queryCache.setQueryData(queryKey.KANBAN_DATA, {
      ...this.data,
      orders: {
        ...this.data.orders,
        [movedOrder.orderId]: {
          ...movedOrder,
          orderStatus: newFinishColumn.isCompleteColumn
            ? 'Complete'
            : movedOrder.orderStatus
        }
      },
      columns: {
        ...this.data.columns,
        [newStartColumn.columnId]: newStartColumn,
        [newFinishColumn.columnId]: newFinishColumn
      }
    });

    if (newFinishColumn.isCompleteColumn) {
      this.updateFn.orderPosition({
        order: movedOrder,
        queryAction: 'markAsComplete'
      });
    } else {
      this.updateFn.orderPosition({
        order: movedOrder,
        queryAction: 'position'
      });
    }
  }
}
