import React from 'react';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import { kanbanOrderDetail } from '../../../types';

type props = {
  order: kanbanOrderDetail;
  index: number;
  render: (
    provided: DraggableProvided,
    isDragging: boolean
  ) => React.ReactElement;
};

export default function ItemContainer({ order, index, render }: props) {
  console.log('isDragDisabled:', order.orderStatus === 'Complete', { order });
  return (
    <Draggable
      draggableId={order.orderId}
      index={index}
      isDragDisabled={order.orderStatus === 'Complete'}
    >
      {(provided, snapshot) => render(provided, snapshot.isDragging)}
    </Draggable>
  );
}
