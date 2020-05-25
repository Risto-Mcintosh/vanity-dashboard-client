import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Paper, Box, Divider, Typography } from '@material-ui/core';
import { kanbanOrderDetail, kanbanColumn } from './kanban.types';
import Task from './Task';

type props = {
  column: kanbanColumn;
  orders?: kanbanOrderDetail[];
  index: number;
};

export default function Column({ column, orders, index }: props) {
  const isStartOrEnd = column.isCompleteColumn || column.isStartColumn;
  const isDragDisabled = column.columnLock || isStartOrEnd;
  return (
    <Draggable
      draggableId={column.columnId}
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {(provided) => (
        <Paper
          {...provided.draggableProps}
          ref={provided.innerRef}
          variant="outlined"
          style={{
            width: '200px',
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '5px',
            ...provided.draggableProps.style,
          }}
        >
          <Box
            {...provided.dragHandleProps}
            p={1}
            fontSize="h5.fontSize"
            textAlign="center"
          >
            <Typography variant="inherit">{column.columnName}</Typography>
          </Box>
          <Divider />
          <Droppable droppableId={column.columnId} type="task">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ minHeight: '100px', flexGrow: 1 }}
              >
                {orders?.map((order, index) => (
                  <Task key={order.orderId} order={order} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Paper>
      )}
    </Draggable>
  );
}
