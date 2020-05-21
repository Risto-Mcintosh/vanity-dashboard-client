import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';
import columnData from './kanban-test-data';
import { kanbanOrderDetail } from './kanban.types';

export default function Kanban() {
  function onDragEnd() {
    return;
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {columnData.columns.map((col) => {
        // @ts-ignore
        const orders: kanbanOrderDetail[] = col.orderIds?.map(
          // @ts-ignore
          (id) => columnData.orders[id]
        );

        return <Column key={col.columnId} column={col} orders={orders} />;
      })}
    </DragDropContext>
  );
}
