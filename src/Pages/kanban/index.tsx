import React from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import Column from './Column';
import DragNDrop from './dndUtil';
import { Box, RootRef } from '@material-ui/core';
import { useKanbanData, useKanbanUpdate } from '../../utils/kanban';

export default function Kanban() {
  const { data } = useKanbanData();
  const [mutate] = useKanbanUpdate();

  if (!data) return <h1>Loading...</h1>;

  function onDragEnd(result: DropResult) {
    if (!result.destination || !data) return;

    const _DragNDrop = new DragNDrop({ ...result, ...data });

    if (_DragNDrop.inSamePosition()) return;

    if (result.type === 'column') {
      const newColumnOrder = _DragNDrop.updateColumnOrder();
      mutate({
        ...data,
        columnOrder: newColumnOrder,
      });
      return;
    }

    if (_DragNDrop.inSameColumn()) {
      const newColumn = _DragNDrop.reorderWithinColumn();
      mutate({
        ...data,
        columns: { ...data.columns, [newColumn.columnId]: newColumn },
      });
      return;
    }

    const {
      movedItem,
      newStartColumn,
      newFinishColumn,
    } = _DragNDrop.moveToNewColumn();
    mutate({
      ...data,
      orders: { ...data.orders, [movedItem.orderId]: movedItem },
      columns: {
        ...data.columns,
        [newStartColumn.columnId]: newStartColumn,
        [newFinishColumn.columnId]: newFinishColumn,
      },
    });
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
