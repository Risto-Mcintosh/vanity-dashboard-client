import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Column from './Column';
import { columns, orders } from './kanban-test-data';
import { kanbanOrderDetail } from './kanban.types';
import { Box } from '@material-ui/core';

type filteredOrders = {
  [key: number]: kanbanOrderDetail;
};

export default function Kanban() {
  const [data, setData] = React.useState({ columns, orders });

  function onDragEnd(result: DropResult) {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    )
      return;

    const start = data.columns.find(
      (col) => col.columnId.toString() === source.droppableId
    );

    if (!start) return;

    const finish = data.columns.find(
      (col) => col.columnId.toString() === destination.droppableId
    );

    if (start === finish) {
      const newOrder = [...start.orderIds];
      newOrder.splice(source.index, 1);
      newOrder.splice(destination.index, 0, parseInt(draggableId));

      const newColumn = {
        ...start,
        orderIds: newOrder,
      };

      const newColumns = data.columns.filter(
        (col) => col.columnId !== start.columnId
      );
      setData((prev) => ({
        ...prev,
        columns: [newColumn, ...newColumns],
      }));
      return;
    }
    if (!finish) return;

    const movedOrder = data.orders.find(
      (order) => order.orderId === parseInt(draggableId)
    );
    if (!movedOrder) return;
    movedOrder.kanbanColumnId = parseInt(destination.droppableId);
    const unChangedOrders = data.orders.filter(
      (order) => order.orderId !== parseInt(draggableId)
    );

    const newStart = [...start.orderIds];
    newStart.splice(source.index, 1);
    const newStartColumn = {
      ...start,
      orderIds: newStart,
    };

    const newFinish = [...finish.orderIds];
    newFinish.splice(destination.index, 0, parseInt(draggableId));
    const newFinishColumn = {
      ...finish,
      orderIds: newFinish,
    };

    const unChangedColumns = data.columns
      .filter((col) => col.columnId !== start.columnId)
      .filter((col) => col.columnId !== finish.columnId);
    //console.log({ newStart, newFinish, newFinishColumn, unChangedColumns });
    setData({
      orders: [movedOrder, ...unChangedOrders],
      columns: [newStartColumn, newFinishColumn, ...unChangedColumns],
    });
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box display="flex">
        {data.columns.map((col) => {
          const orders: filteredOrders = data.orders
            .filter((order) => order.kanbanColumnId === col.columnId)
            .reduce((prev, cur) => ({ ...prev, [cur.orderId]: cur }), {});

          const sortedOrder = col.orderIds?.map((id) => orders[id]);
          console.log({ [col.columnName]: { sortedOrder } });
          return (
            <Column key={col.columnId} column={col} orders={sortedOrder} />
          );
        })}
      </Box>
    </DragDropContext>
  );
}
