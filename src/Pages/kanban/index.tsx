import React from 'react';
import Column from './Column';
import { useKanbanData } from '../../utils/kanban';
import KanbanContainer from './containers/Kanban';

export default function Kanban() {
  const { data } = useKanbanData();

  if (!data) return <h1>Loading...</h1>;
  return (
    <KanbanContainer kanbanData={data}>
      {data.columnOrder.map((columnId, index) => {
        const column = data.columns[columnId];
        const orders = column.orderIds.map((id) => data.orders[id]);
        return (
          <Column
            key={columnId}
            column={column}
            orders={orders}
            index={index}
          />
        );
      })}
    </KanbanContainer>
  );
}
