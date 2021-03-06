import React from 'react';
import { Menu, MenuItem, IconButton, styled } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import LockIcon from '@material-ui/icons/Lock';
import { useColumnContext } from './column-context';
import {
  useKanbanColumnUpdate,
  useKanbanColumnDelete
} from '../../../utils/kanban';
import ColorMenu from './color-menu';
import useContrastText from '../../../utils/useContrastText';

const Container = styled('div')({
  position: 'absolute',
  right: 0
});

type props = {
  setNameEditor: React.Dispatch<React.SetStateAction<boolean>>;
};

function ColumnMenu({ setNameEditor }: props) {
  const { column } = useColumnContext();
  const [update] = useKanbanColumnUpdate();
  const [deleteColumn] = useKanbanColumnDelete();
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

  function handleEditColumnName() {
    setNameEditor(true);
    handleClose();
  }

  function handleColumnLock() {
    update({
      ...column,
      columnLock: !column.columnLock
    });
    handleClose();
  }

  function handleColumnDelete() {
    //TODO Add notification "can't delete if column has orders"
    if (column.orderIds.length > 0) return;

    deleteColumn(column.columnId, {
      onSuccess: () => handleClose()
    });
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
        <MenuItem onClick={handleEditColumnName}>Edit Name</MenuItem>
        <MenuItem
          onClick={handleColumnLock}
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          Lock <LockIcon color={column.columnLock ? 'secondary' : 'disabled'} />
        </MenuItem>
        <MenuItem onClick={() => setColorMenu(true)}>
          <ColorMenu isOpen={isColorMenuOpen} closeMenu={handleClose} />
        </MenuItem>
        <MenuItem onClick={handleColumnDelete}>Delete Column</MenuItem>
      </Menu>
    </Container>
  );
}

export default ColumnMenu;
