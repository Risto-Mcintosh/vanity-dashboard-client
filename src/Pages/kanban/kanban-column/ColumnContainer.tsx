import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Paper, Divider } from '@material-ui/core';
import ColumnHeader from './ColumnHeader';
import DroppableArea from './DroppableArea';
import { useColumnContext } from './column-context';

type props = {
  children: React.ReactNode;
};

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
        <Paper
          {...provided.draggableProps}
          ref={provided.innerRef}
          variant="outlined"
          style={{
            width: '200px',
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '5px',
            ...provided.draggableProps.style,
          }}
        >
          <ColumnHeader dragHandleProps={provided.dragHandleProps} />
          <Divider />
          <DroppableArea columnId={column.columnId}>{children}</DroppableArea>
        </Paper>
      )}
    </Draggable>
  );
}
