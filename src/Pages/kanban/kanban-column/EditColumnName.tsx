import React from "react";
import { TextField, Box, makeStyles } from "@material-ui/core";
import { useColumnContext } from "./column-context";
import { useKanbanColumnUpdate } from "../../../utils/kanban";
import useContrastText from "../../../utils/useContrastText";

type styleProps = {
  textColor: string;
};

const useStyles = makeStyles({
  input: {
    color: (props: styleProps) => props.textColor
  }
});

type props = {
  setNameEditor: React.Dispatch<React.SetStateAction<boolean>>;
};
export function EditColumnName({ setNameEditor }: props) {
  const { column } = useColumnContext();
  const [columnName, setColName] = React.useState(column.columnName);
  const [update] = useKanbanColumnUpdate();
  const [helperText, setHelperText] = React.useState("");
  const classes = useStyles({ textColor: useContrastText(column.color) });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!columnName) {
      setHelperText("Column name is required");
      return;
    }
    update(
      { ...column, columnName },
      {
        onSuccess: () => setNameEditor(false)
      }
    );
  }
  return (
    <Box component="form" onSubmit={handleSubmit} maxWidth="75%" mx="auto">
      <TextField
        id="column-name"
        required
        autoFocus
        error={!!helperText}
        helperText={helperText}
        value={columnName}
        onChange={(e) => setColName(e.target.value)}
        onBlur={() => setNameEditor(false)}
        color="secondary"
        InputProps={{
          className: classes.input
        }}
      />
    </Box>
  );
}
