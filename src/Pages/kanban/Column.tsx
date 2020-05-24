import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Paper, Box, Divider, Typography } from '@material-ui/core';
import { kanbanOrderDetail, kanbanColumn } from './kanban.types';
import Task from './Task';

type props = {
  column: kanbanColumn;
  orders?: kanbanOrderDetail[];
};

export default function Column({ column, orders }: props) {
  return (
    <Paper
      variant="outlined"
      style={{
        flexGrow: 1,
        width: '140px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box p={1} fontSize="h5.fontSize" textAlign="center">
        <Typography variant="inherit">{column.columnName}</Typography>
      </Box>
      <Divider />
      <Droppable droppableId={column.columnId.toString()}>
        {(provided) => {
          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ minHeight: '100px' }}
            >
              {orders?.map((order, index) => (
                <Task key={order.orderId} order={order} index={index} />
              ))}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </Paper>
  );
}
