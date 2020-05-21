import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Paper, Box, Divider, Typography } from '@material-ui/core';
import { kanbanOrderDetail } from './kanban.types';
import Task from './Task';

type props = {
  column: {
    columnId: number;
    columnName: string;
    wip: number | null;
    columnLock: boolean;
    columnPosition: number;
    startColumn: boolean;
    endColumn: boolean;
    orderIds: string[] | null;
  };
  orders: kanbanOrderDetail[];
};

export default function Column({ column, orders }: props) {
  return (
    <Paper variant="outlined">
      <Box p={1} fontSize="h5.fontSize" textAlign="center">
        <Typography variant="inherit">{column.columnName}</Typography>
      </Box>
      <Divider />
      <Droppable droppableId={column.columnId.toString()}>
        {(provided) => {
          return (
            <div {...provided.droppableProps} ref={provided.innerRef}>
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
