import React from 'react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { Box, Typography, useTheme } from '@material-ui/core';
import { useColumnContext } from './column-context';
import ColumnMenu from './Menu';
import useContrastText from '../../../utils/useContrastText';
import { EditColumnName } from './EditColumnName';

type props = {
  dragHandleProps?: DraggableProvidedDragHandleProps | undefined;
};

const ColumnHeader = ({ dragHandleProps }: props) => {
  const { column } = useColumnContext();
  const theme = useTheme();
  const [isEditing, setNameEditor] = React.useState(false);
  const ColumnName = (
    <Typography
      variant="inherit"
      style={{
        color: useContrastText(column.color),
        paddingRight: theme.spacing(2.2),
        paddingLeft: theme.spacing(2.2)
      }}
    >
      {column.columnName}
    </Typography>
  );
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
      {isEditing ? (
        <EditColumnName setNameEditor={setNameEditor} />
      ) : (
        <>
          {ColumnName}
          <ColumnMenu setNameEditor={setNameEditor} />
        </>
      )}
    </Box>
  );
};

export default ColumnHeader;
