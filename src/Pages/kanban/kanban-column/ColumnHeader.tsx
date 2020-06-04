import React from 'react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { Box, Typography } from '@material-ui/core';
import { useColumnContext } from './column-context';
import ColumnMenu from './Menu';
import useContrastText from '../../../utils/useContrastText';

type props = {
  dragHandleProps?: DraggableProvidedDragHandleProps | undefined;
};

const ColumnHeader = ({ dragHandleProps }: props) => {
  const { column } = useColumnContext();
  return (
    <Box
      {...dragHandleProps}
      p={1}
      fontSize="h5.fontSize"
      textAlign="center"
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Typography
        variant="inherit"
        style={{ color: useContrastText(column.color) }}
      >
        {column.columnName}
      </Typography>
      <ColumnMenu />
    </Box>
  );
};

export default ColumnHeader;
