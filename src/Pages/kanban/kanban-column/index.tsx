import React from 'react';
import { kanbanColumn } from '../../../types';
import ColumnContainer from './ColumnContainer';
import { ColumnProvider } from './column-context';

type props = {
  column: kanbanColumn;
  columnIndex: number;
  children: React.ReactNode;
};

const Column = ({ column, columnIndex, children }: props) => {
  return (
    <ColumnProvider state={{ column, columnIndex }}>
      <ColumnContainer>{children}</ColumnContainer>
    </ColumnProvider>
  );
};

export default Column;
