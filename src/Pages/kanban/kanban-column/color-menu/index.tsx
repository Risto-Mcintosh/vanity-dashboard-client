import React from 'react';
import {
  styled,
  ClickAwayListener,
  Popover,
  MenuList,
  Box,
} from '@material-ui/core';
import { useColumnContext } from '../column-context';
import { useKanbanColumnUpdate } from '../../../../utils/kanban';
import colors from './colors';

const Container = styled('div')({
  width: '100%',
});

type ColorSqProps = {
  color: string;
  margin?: boolean;
  small?: boolean;
};

const ColorSq = styled('span')({
  backgroundColor: (props: ColorSqProps) => props.color,
  border: 'rgba(0, 0, 0, 0.26) solid 1px',
  height: ({ small }: ColorSqProps) => (small ? '20px' : '30px'),
  width: ({ small }: ColorSqProps) => (small ? '20px' : '30px'),
  display: 'inline-block',
  cursor: 'pointer',
  margin: ({ margin }: ColorSqProps) => (margin ? '.5rem' : 0),
});

type props = {
  isOpen: boolean;
  setColorMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ColorMenu({ isOpen, setColorMenu }: props) {
  const { column } = useColumnContext();
  const [update] = useKanbanColumnUpdate();
  const ref = React.useRef<HTMLDivElement | null>(null);

  function handleColorChange(color: string) {
    update(
      {
        ...column,
        color,
      },
      {
        onSettled: () => setColorMenu(false),
      }
    );
  }

  return (
    <Container ref={ref}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        Color <ColorSq color={!column.color ? '#fafafa' : column.color} small />
      </Box>
      <Popover
        open={isOpen}
        anchorEl={ref.current}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <ClickAwayListener onClickAway={() => setColorMenu(false)}>
          <MenuList id="simple-menu">
            {colors.map(({ dark, light }) => (
              <Box
                key={dark}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <ColorSq
                  color={dark}
                  onClick={() => handleColorChange(dark)}
                  margin
                />
                <ColorSq
                  color={light}
                  onClick={() => handleColorChange(light)}
                  margin
                />
              </Box>
            ))}
          </MenuList>
        </ClickAwayListener>
      </Popover>
    </Container>
  );
}
