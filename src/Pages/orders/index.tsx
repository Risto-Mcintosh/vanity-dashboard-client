import React from 'react';
import OrdersTable from '../../Components/order-table';
import { useOrderList } from '../../utils/orders';

function Orders() {
  const { orders } = useOrderList();

  return (
    <div>
      <OrdersTable orders={orders} />
    </div>
  );
}

export default Orders;
