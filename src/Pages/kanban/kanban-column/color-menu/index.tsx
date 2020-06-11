import React from 'react';
import {
  styled,
  ClickAwayListener,
  Popover,
  MenuList,
  Box,
  MenuItem
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useColumnContext } from '../column-context';
import { useKanbanColumnUpdate } from '../../../../utils/kanban';
import colors from './colors';

const Container = styled('div')({
  width: '100%'
});

type ColorSqProps = {
  color: string;
  margin?: string;
  small?: string;
};

const ColorSq = styled('span')({
  backgroundColor: (props: ColorSqProps) => props.color,
  border: 'rgba(0, 0, 0, 0.26) solid 1px',
  height: ({ small }: ColorSqProps) => (small ? '20px' : '30px'),
  width: ({ small }: ColorSqProps) => (small ? '20px' : '30px'),
  display: 'inline-block',
  cursor: 'pointer',
  margin: ({ margin }: ColorSqProps) => (margin ? '.5rem' : 0)
});

type props = {
  isOpen: boolean;
  closeMenu: () => void;
};

export default function ColorMenu({ isOpen, closeMenu }: props) {
  const { column } = useColumnContext();
  const [update] = useKanbanColumnUpdate();
  const ref = React.useRef<HTMLDivElement | null>(null);

  function handleColorChange(color: string | null) {
    update(
      {
        ...column,
        color
      },
      {
        onSettled: () => closeMenu()
      }
    );
  }

  return (
    <Container ref={ref}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        Color
        <ColorSq
          color={!column.color ? '#fafafa' : column.color}
          small="true"
        />
      </Box>
      <Popover
        open={isOpen}
        anchorEl={ref.current}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <ClickAwayListener onClickAway={() => closeMenu()}>
          <MenuList autoFocus={isOpen} id="color-menu">
            <MenuItem
              onClick={() => handleColorChange(null)}
              style={{ justifyContent: 'center' }}
            >
              None
            </MenuItem>
            {colors.map(({ dark, light }) => (
              <Box key={dark} display="flex" justifyContent="space-between">
                <ColorSq
                  color={dark}
                  margin="true"
                  onClick={() => handleColorChange(dark)}
                />

                <ColorSq
                  color={light}
                  margin="true"
                  onClick={() => handleColorChange(light)}
                />
              </Box>
            ))}
          </MenuList>
        </ClickAwayListener>
      </Popover>
    </Container>
  );
}
