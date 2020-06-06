import React from "react";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { Box, Typography } from "@material-ui/core";
import { useColumnContext } from "./column-context";
import ColumnMenu from "./Menu";
import useContrastText from "../../../utils/useContrastText";
import { EditColumnName } from "./EditColumnName";

type props = {
  dragHandleProps?: DraggableProvidedDragHandleProps | undefined;
};

const ColumnHeader = ({ dragHandleProps }: props) => {
  const { column } = useColumnContext();
  const [isEditing, setNameEditor] = React.useState(false);
  const ColumnName = (
    <Typography
      variant="inherit"
      style={{ color: useContrastText(column.color) }}
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
