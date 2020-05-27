import React from 'react';
import { kanbanOrderDetail, kanbanColumn } from '../../types';
import Task from './Task';
import TaskContainer from './containers/Task';
import ColumnContainer from './containers/Column';

type props = {
  column: kanbanColumn;
  orders?: kanbanOrderDetail[];
  index: number;
};

const Column = ({ column, orders, index }: props) => (
  <ColumnContainer column={column} index={index}>
    <TaskContainer columnId={column.columnId}>
      {orders?.map((order, index) => (
        <Task key={order.orderId} order={order} index={index} />
      ))}
    </TaskContainer>
  </ColumnContainer>
);

export default Column;
