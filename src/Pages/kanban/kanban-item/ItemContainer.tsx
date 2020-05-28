import React from 'react';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';

type props = {
  orderId: string;
  index: number;
  render: (
    provided: DraggableProvided,
    isDragging: boolean
  ) => React.ReactElement;
};

export default function ItemContainer({ orderId, index, render }: props) {
  return (
    <Draggable draggableId={orderId} index={index}>
      {(provided, snapshot) => render(provided, snapshot.isDragging)}
    </Draggable>
  );
}
