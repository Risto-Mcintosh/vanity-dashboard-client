import React from 'react';
import Column from './kanban-column';
import { useKanbanData } from '../../utils/kanban';
import KanbanContainer from './KanbanContainer';
import KanbanItems from './kanban-item';

export default function Kanban() {
  const { data } = useKanbanData();
  if (!data) return <h1>Loading...</h1>;
  return (
    <KanbanContainer kanbanData={data}>
      {data.columnOrder.map((columnId, index) => {
        const column = data.columns[columnId];
        const orders = column.orderIds.map((id) => data.orders[id]);
        return (
          <Column key={columnId} column={column} columnIndex={index}>
            {orders.map((order, index) => (
              <KanbanItems key={order.orderId} order={order} index={index} />
            ))}
          </Column>
        );
      })}
    </KanbanContainer>
  );
}
