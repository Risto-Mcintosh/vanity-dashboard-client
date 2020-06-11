import React from 'react';
import ItemContainer from './ItemContainer';
import { kanbanOrderDetail } from '../../../types';
import KanbanItem from './KanbanItem';

type props = {
  order: kanbanOrderDetail;
  index: number;
};

const KanbanItems = ({ order, index }: props) => (
  <ItemContainer
    orderId={order.orderId}
    index={index}
    render={(provided, isDragging) => (
      <KanbanItem order={order} isDragging={isDragging} provided={provided} />
    )}
  />
);

export default React.memo(KanbanItems);
