import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Column from './Column';
import columnData from './kanban-test-data';
import { kanbanOrderDetail, kanbanColumn } from './kanban.types';

export default function Kanban() {
  const [data, setData] = React.useState(columnData);

  function onDragEnd(result: DropResult) {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    )
      return;

    const column = data.columns.find(
      (col) => col.columnId.toString() === source.droppableId
    );
    if (!column) return;
    const newOrder = [...column.orderIds];
    newOrder.splice(source.index, 1);
    newOrder.splice(destination.index, 0, `order-${draggableId}`);

    const newColumn = {
      ...column,
      orderIds: newOrder,
    };

    const newColumns = data.columns.filter(
      (col) => col.columnId !== column.columnId
    );
    // console.log({ column, newOrder, newColumn, newColumns, result });

    setData((prev) => ({
      ...prev,
      columns: [...newColumns, newColumn],
    }));
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {data.columns.map((col) => {
        // @ts-ignore
        const orders: kanbanOrderDetail[] = col.orderIds?.map(
          // @ts-ignore
          (id) => data.orders[id]
        );

        return <Column key={col.columnId} column={col} orders={orders} />;
      })}
    </DragDropContext>
  );
}
