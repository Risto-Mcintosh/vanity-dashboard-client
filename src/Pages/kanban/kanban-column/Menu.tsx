import React from "react";
import { Menu, MenuItem, IconButton, styled } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import LockIcon from "@material-ui/icons/Lock";
import { useColumnContext } from "./column-context";
import { useKanbanColumnUpdate } from "../../../utils/kanban";
import ColorMenu from "./color-menu/";
import useContrastText from "../../../utils/useContrastText";

const Container = styled("div")({
  position: "absolute",
  right: 0,
});

type props = {
  title: string;
  handleFunction: () => void;
  component: React.ReactNode;
};

export default function ColumnMenu() {
  const { column } = useColumnContext();
  const [update] = useKanbanColumnUpdate();
  const [anchorRef, setAnchorRef] = React.useState<HTMLDivElement | null>(null);
  const [isColorMenuOpen, setColorMenu] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  const handleClick = () => {
    setAnchorRef(ref.current);
  };

  const handleClose = () => {
    setAnchorRef(null);
    setColorMenu(false);
  };

  function handleColumnLock() {
    update({
      ...column,
      columnLock: !column.columnLock,
    });
    handleClose();
  }

  return (
    <Container ref={ref}>
      <IconButton
        aria-haspopup="true"
        onClick={handleClick}
        style={{ color: useContrastText(column.color) }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorRef}
        keepMounted
        open={Boolean(anchorRef)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Edit Name</MenuItem>
        <MenuItem
          onClick={handleColumnLock}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          Lock <LockIcon color={column.columnLock ? "secondary" : "disabled"} />
        </MenuItem>
        <MenuItem onClick={() => setColorMenu(true)}>
          <ColorMenu isOpen={isColorMenuOpen} setColorMenu={setColorMenu} />
        </MenuItem>
      </Menu>
    </Container>
  );
}
