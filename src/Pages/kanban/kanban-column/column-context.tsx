import React from 'react';
import { kanbanColumn } from '../../../types';

type state = {
  column: kanbanColumn;
  columnIndex: number;
};

const ColumnContext = React.createContext<state | undefined>(undefined);

type ColumnProviderProps = {
  state: state;
  children: React.ReactNode;
};
const ColumnProvider = ({ state, children }: ColumnProviderProps) => (
  <ColumnContext.Provider value={state}>{children}</ColumnContext.Provider>
);

function useColumnContext() {
  const context = React.useContext(ColumnContext);
  if (context === undefined) {
    throw new Error('useColumnContext must be used within a ColumnProvider');
  }
  return context;
}

export { ColumnProvider, useColumnContext };
