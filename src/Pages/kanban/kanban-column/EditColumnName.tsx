import React from "react";
import { TextField } from "@material-ui/core";
import { useColumnContext } from "./column-context";

export function EditColumnName() {
  const { column } = useColumnContext();
  const [colName, setColName] = React.useState(column.columnName);
  function handleSubmit() {
    console.log("submitted!");
  }
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="column-name"
        value={colName}
        onChange={(e) => setColName(e.target.value)}
        autoFocus
      />
    </form>
  );
}
