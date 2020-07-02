import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { styled } from '@material-ui/core';

type props = {
  columnId: string;
  children: React.ReactNode;
};
const Container = styled('div')(({ theme }) => ({
  minHeight: '100px',
  maxHeight: '400px',
  overflowY: 'auto',
  flexGrow: 1,
  padding: theme.spacing(1)
}));

export default function DroppableArea({ columnId, children }: props) {
  return (
    <Droppable droppableId={columnId} type="task">
      {(provided) => (
        <Container {...provided.droppableProps} ref={provided.innerRef}>
          {children}
          {provided.placeholder}
        </Container>
      )}
    </Droppable>
  );
}
