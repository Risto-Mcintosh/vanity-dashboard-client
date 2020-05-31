import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Paper, Divider, styled, Theme } from '@material-ui/core';
import ColumnHeader from './ColumnHeader';
import DroppableArea from './DroppableArea';
import { useColumnContext } from './column-context';

type props = {
  children: React.ReactNode;
};

type ContainerProps = {
  bgColor: string;
  theme: Theme;
};

const Container = styled(Paper)(({ theme, bgColor }: ContainerProps) => ({
  width: '200px',
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '5px',
  backgroundColor: bgColor,
}));

export default function ColumnContainer({ children }: props) {
  const { column, columnIndex } = useColumnContext();
  const isStartOrEnd = column.isCompleteColumn || column.isStartColumn;
  const isDragDisabled = column.columnLock || isStartOrEnd;
  return (
    <Draggable
      draggableId={column.columnId}
      index={columnIndex}
      isDragDisabled={isDragDisabled}
    >
      {(provided) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
          variant="outlined"
          bgColor={column.color ?? 'initial'}
          style={{
            ...provided.draggableProps.style,
          }}
        >
          <ColumnHeader dragHandleProps={provided.dragHandleProps} />
          <Divider />
          <DroppableArea columnId={column.columnId}>{children}</DroppableArea>
        </Container>
      )}
    </Draggable>
  );
}
