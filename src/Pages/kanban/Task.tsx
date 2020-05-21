import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { kanbanOrderDetail } from './kanban.types';
import { Box, styled, makeStyles } from '@material-ui/core';

type props = {
  order: kanbanOrderDetail;
  index: number;
};

type contProps = {
  testProp= ""
}

const Container = styled('div')((props) => ({
  padding: props.theme.spacing(1),
  marginBottom: props.theme.spacing(2),
}));

export default function Task({ order, index }: props) {
  return (
    <Draggable draggableId={order.orderId.toString()} index={index}>
      {(provided) => (
        <Container
          testProp="something"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {order.customerName}
        </Container>
      )}
    </Draggable>
  );
}
