import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

type props = {
  columnId: string;
  children: React.ReactNode;
};

export default function DroppableArea({ columnId, children }: props) {
  return (
    <Droppable droppableId={columnId} type="task">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{ minHeight: '100px', flexGrow: 1 }}
        >
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
