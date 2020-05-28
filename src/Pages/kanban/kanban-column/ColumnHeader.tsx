import React from 'react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { Box, Typography } from '@material-ui/core';

type props = {
  dragHandleProps: DraggableProvidedDragHandleProps | undefined;
  columnName: string;
}

const ColumnHeader = ({columnName, dragHandleProps}: props) => (
        <Box
            {...dragHandleProps}
            p={1}
            fontSize="h5.fontSize"
            textAlign="center"
          >
            <Typography variant="inherit">{columnName}</Typography>
          </Box>
)


export default ColumnHeader