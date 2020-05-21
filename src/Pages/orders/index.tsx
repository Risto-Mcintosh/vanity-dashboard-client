import React from 'react';
import OrdersTable from '../../Components/order-table';
import { useListOrders } from '../../utils/orders';

function Orders() {
  const { orders, status, error } = useListOrders();

  return (
    <div>
      <OrdersTable orders={orders} />
    </div>
  );
}

export default Orders;
