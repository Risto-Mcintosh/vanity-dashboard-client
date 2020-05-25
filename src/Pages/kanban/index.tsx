import React from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import Column from './Column';
import { columns, orders, columnOrder } from './kanban-test-data';
import DragNDrop from './dndUtil';
import { Box, RootRef } from '@material-ui/core';

export default function Kanban() {
  const [data, setData] = React.useState({ columns, orders, columnOrder });

  function onDragEnd(result: DropResult) {
    if (!result.destination) return;
    const _DragNDrop = new DragNDrop({ ...result, ...data });
    if (_DragNDrop.isSamePosition()) return;

    if (result.type === 'column') {
      const newColumnOrder = _DragNDrop.updateColumnOrder();
      setData((prev) => ({
        ...prev,
        columnOrder: newColumnOrder,
      }));
      return;
    }

    if (_DragNDrop.isSameColumn()) {
      const newColumn = _DragNDrop.reorderWithinColumn();
      setData((prev) => ({
        ...prev,
        columns: { ...prev.columns, [newColumn.columnId]: newColumn },
      }));
      return;
    }

    const {
      movedItem,
      newStartColumn,
      newFinishColumn,
    } = _DragNDrop.moveToNewColumn();
    setData((prev) => ({
      ...prev,
      orders: { ...prev.orders, [movedItem.orderId]: movedItem },
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
