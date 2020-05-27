import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Paper, Box, Divider, Typography } from '@material-ui/core';
import { kanbanColumn } from '../../../types';

type props = {
  column: kanbanColumn;
  index: number;
  children: React.ReactNode;
};

export default function ColumnContainer({ column, index, children }: props) {
  const isStartOrEnd = column.isCompleteColumn || column.isStartColumn;
  const isDragDisabled = column.columnLock || isStartOrEnd;
  return (
    <Draggable
      draggableId={column.columnId}
      index={index}
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
          <Box
            {...provided.dragHandleProps}
            p={1}
            fontSize="h5.fontSize"
            textAlign="center"
          >
            <Typography variant="inherit">{column.columnName}</Typography>
          </Box>
          <Divider />
          {children}
        </Paper>
      )}
    </Draggable>
  );
}
