import React from 'react';
import { kanbanColumn } from '../../../types';
import ColumnContainer from './ColumnContainer';

type props = {
  column: kanbanColumn;
  index: number;
  children: React.ReactNode;
};

const Column = ({ column, index, children }: props) => (
  <ColumnContainer column={column} index={index}>
    {children}
  </ColumnContainer>
);

export default Column;
