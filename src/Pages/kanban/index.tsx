import React from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import Column from './Column';
import { columns, orders, columnOrder } from './kanban-test-data';
import { kanbanOrderDetail } from './kanban.types';
import { Box, RootRef } from '@material-ui/core';

export default function Kanban() {
  const [data, setData] = React.useState({ columns, orders, columnOrder });

  function onDragEnd(result: DropResult) {
    const { source, destination, draggableId, type } = result;
    if (!destination) return;
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    )
      return;

    if (type === 'column') {
      const destinationColumn =
        data.columns[data.columnOrder[destination.index]];
      const isStartOrEndColumn =
        destinationColumn.endColumn || destinationColumn.startColumn;
      if (isStartOrEndColumn) return;
      const newColumnOrder = [...data.columnOrder];
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setData((prev) => ({
        ...prev,
        columnOrder: newColumnOrder,
      }));

      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newOrder = [...start.orderIds];
      newOrder.splice(source.index, 1);
      newOrder.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        orderIds: newOrder,
      };

      setData((prev) => ({
        ...prev,
        columns: { ...prev.columns, [newColumn.columnId]: newColumn },
      }));
      return;
    }

    const movedOrder = data.orders[draggableId];
    movedOrder.kanbanColumnId = destination.droppableId;

    const newStart = [...start.orderIds];
    newStart.splice(source.index, 1);
    const newStartColumn = {
      ...start,
      orderIds: newStart,
    };

    const newFinish = [...finish.orderIds];
    newFinish.splice(destination.index, 0, draggableId);
    const newFinishColumn = {
      ...finish,
      orderIds: newFinish,
    };

    setData((prev) => ({
      ...prev,
      orders: { ...prev.orders, [movedOrder.orderId]: movedOrder },
      columns: {
        ...prev.columns,
        [newStartColumn.columnId]: newStartColumn,
        [newFinishColumn.columnId]: newFinishColumn,
      },
    }));
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <RootRef rootRef={provided.innerRef}>
            <Box {...provided.droppableProps} display="flex">
              {data.columnOrder.map((columnId, index) => {
                const column = data.columns[columnId];
                const orders = column.orderIds.map((id) => data.orders[id]);
                return (
                  <Column
                    key={columnId}
                    column={column}
                    orders={orders}
                    index={index}
                  />
                );
              })}
              {provided.placeholder}
            </Box>
          </RootRef>
        )}
      </Droppable>
    </DragDropContext>
  );
}
