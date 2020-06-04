import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Paper, Divider, styled,PaperProps, RootRef } from '@material-ui/core';
import ColumnHeader from './ColumnHeader';
import DroppableArea from './DroppableArea';
import { useColumnContext } from './column-context';

type props = {
  children: React.ReactNode;
};

type ContainerProps = {
  bgColor: string;
};

const Container = styled(({ bgColor, ...other }: ContainerProps & Omit<PaperProps, keyof ContainerProps>) => (
  <Paper {...other} />
))({
  flex: '0 0 225px',
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '10px',
  marginRight: '10px',
  backgroundColor: ({bgColor}: ContainerProps) => bgColor,
});

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
        <RootRef rootRef={provided.innerRef}>
          <Container
            {...provided.draggableProps}
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
        </RootRef>
      )}
    </Draggable>
  );
}
