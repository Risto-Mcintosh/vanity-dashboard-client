import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { kanbanOrderDetail } from '../../types';
import { Box, styled, makeStyles } from '@material-ui/core';

type props = {
  order: kanbanOrderDetail;
  index: number;
};

type color = {
  border: string;
  background: string;
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
    border: `1px solid black`,
  },
  dragging: {
    border: `1px solid ${theme.palette.secondary.main}`,
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function Task({ order, index }: props) {
  const classes = useStyles();
  return (
    <Draggable draggableId={order.orderId} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            className={`${classes.root} ${
              snapshot.isDragging && classes.dragging
            }`}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {order.customerName}
          </div>
        );
      }}
    </Draggable>
  );
}
